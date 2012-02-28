Ext.define('LSP.view.dropdowns.wikiPathwaysProteinLookup', {
    extend: 'Ext.form.ComboBox',  
    alias: 'widget.wikiPathwaysProteinLookup',

    store:  Ext.create('Ext.data.Store',{
            fields: [
              {type: 'string', name: 'wp_protein_name'},
              {type: 'string', name: 'wp_protein_uri'},              
            ],
            proxy: {
                type: 'ajax',
                api: {
                    read: '/core_api_calls/wiki_pathway_protein_lookup.json'
                },
                reader: {
                    type: 'json'
                    }
            }
        }),
    	queryMode: 'remote',
//      valueField:'wp_protein_uri',
      valueField:'wp_protein_uri',
    	displayField: 'wp_protein_name',
      name: 'wp_protein_uri',
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
        loadingText: 'Searching...'
      }
});
