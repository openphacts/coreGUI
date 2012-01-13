Ext.define('LSP.view.dropdowns.proteinLookup', {
    extend: 'Ext.form.ComboBox',  
    alias: 'widget.proteinLookup',

    store:  Ext.create('Ext.data.Store',{
            fields: [
              {type: 'string', name: 'protein_name'},
              {type: 'string', name: 'protein_uri'}
            ],
            proxy: {
                type: 'ajax',
                api: {
                    read: '/core_api_calls/protein_lookup.json'
                },
                reader: {
                    type: 'json',
                    root: 'objects',
                    totalProperty: 'totalCount'
                }
            }
        }),
    	queryMode: 'remote',
      valueField:'protein_uri',
    	displayField: 'protein_name',
      name: 'protein_uri',
    	minChars:4,
    	hideTrigger:true,
    	forceSelection:true,
    	typeAhead:true,
      emptyText: 'Start typing...',
      margin: '5 5 5 5',
      width: 600,
      queryDelay: 700,
      fieldLabel: 'Protein name',
      labelWidth: 120,
      listConfig: {
        loadingText: 'Searching...',
        emptyText: 'No matching proteins found.',
      }
});
