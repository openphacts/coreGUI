Ext.define('LSP.view.dropdowns.conceptWikiProteinLookup', {
    extend: 'Ext.form.ComboBox',  
    alias: 'widget.conceptWikiProteinLookup',

    store:  Ext.create('Ext.data.Store',{
            fields: [
              {type: 'string', name: 'concept_label'},
              {type: 'string', name: 'concept_url'},
              {type: 'string', name: 'concept_uuid'},
              {type: 'string', name: 'concept_alt_labels'},
              {type: 'string', name: 'tag_label'},
              {type: 'string', name: 'tag_uuid'},
              
              
            ],
            proxy: {
                type: 'ajax',
                api: {
                    read: '/concept_wiki_api_calls/protein_lookup.json'
                },
                reader: {
                    type: 'json'
                    }
            }
        }),
    	queryMode: 'remote',
      valueField:'concept_url',
    	displayField: 'concept_label',
      name: 'protein_uri',
    	minChars:4,
    	hideTrigger:true,
    	forceSelection:true,
    	typeAhead:true,
      emptyText: 'Start typing...',
      margin: '5 5 5 5',
      width: 700,
      queryDelay: 700,
      fieldLabel: 'Protein name',
      labelWidth: 120,
      listConfig: {
        loadingText: 'Searching...',
        emptyText: 'No matching proteins found.',
        getInnerTpl: function() {
                    return '<p><b>{concept_label}</b> <a href="{concept_url}" target="_blank">(definition)</a><br/ ><small><i>{concept_alt_labels}</i></small></p>';
                }
      }
});
                              