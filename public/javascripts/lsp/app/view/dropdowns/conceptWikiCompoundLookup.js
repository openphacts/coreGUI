Ext.define('LSP.view.dropdowns.conceptWikiCompoundLookup', {
    extend: 'Ext.form.ComboBox',  
    alias: 'widget.conceptWikiCompoundLookup',

    store:  Ext.create('Ext.data.Store',{
            fields: [
              {type: 'string', name: 'concept_label'},
              {type: 'string', name: 'concept_url'},
              {type: 'string', name: 'concept_uuid'},
              {type: 'string', name: 'concept_alt_label'},
              {type: 'string', name: 'tag_label'},
              {type: 'string', name: 'tag_uuid'},
              
              
            ],
            proxy: {
                type: 'ajax',
                api: {
                    read: '/concept_wiki_api_calls/compound_lookup.json'
                },
                reader: {
                    type: 'json'
                    }
            }
        }),
    	queryMode: 'remote',
      valueField:'concept_url',
    	displayField: 'concept_label',
      name: 'compound_uri',
    	minChars:4,
    	hideTrigger:true,
    	forceSelection:true,
    	typeAhead:true,
      emptyText: 'Start typing...',
      margin: '5 5 5 5',
      width: 600,
      queryDelay: 700,
      fieldLabel: 'Compound name',
      labelWidth: 120,
      listConfig: {
        loadingText: 'Searching...',
        emptyText: 'No matching compounds found.',
      }
});
