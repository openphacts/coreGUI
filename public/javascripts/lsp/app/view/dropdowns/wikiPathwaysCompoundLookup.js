Ext.define('LSP.view.dropdowns.wikiPathwaysCompoundLookup', {
    extend: 'Ext.form.ComboBox',  
    alias: 'widget.wikiPathwaysCompoundLookup',

    store:  Ext.create('Ext.data.Store',{
            fields: [
              {type: 'string', name: 'cmpd_label'},
              {type: 'string', name: 'cmpd_uri'},              
            ],
            proxy: {
                type: 'ajax',
                api: {
                    read: '/core_api_calls/wiki_pathway_compound_lookup.json'
                },
                reader: {
                    type: 'json'
                    }
            }
        }),
    	queryMode: 'remote',
//      valueField:'cmpd_uri',
      valueField:'cmpd_label',
    	displayField: 'cmpd_label',
      name: 'compound_uri',
    	minChars:4,
    	hideTrigger:true,
    	forceSelection:true,
    	typeAhead:true,
      emptyText: 'Start typing...',
      margin: '5 5 5 5',
      width: 700,
      queryDelay: 700,
      fieldLabel: 'Compound name',
      labelWidth: 120,
      listConfig: {
        loadingText: 'Searching...',
      }
});
