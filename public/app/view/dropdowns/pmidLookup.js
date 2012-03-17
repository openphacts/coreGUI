Ext.define('LSP.view.dropdowns.pmidLookup', {
    extend:'Ext.form.ComboBox',
    alias:'widget.pmidLookup',

    store:Ext.create('Ext.data.Store', {
        fields:[
            {type:'string', name:'pmid'},
            {type:'string', name:'pmid_uri'}
        ],
        proxy:{
            type:'ajax',
            api:{
                read:'core_api_calls/pmid_lookup.json'
            },
            reader:{
                type:'json'
            }
        }
    }),
    queryMode:'remote',
    valueField:'pmid_uri',
    displayField:'pmid',
    name:'pmid_uri',
    minChars:2,
    hideTrigger:true,
    forceSelection:true,
    typeAhead:true,
    emptyText:'Start typing Pubmed id...',
    margin:'5 5 5 5',
    width:600,
    queryDelay:700,
    fieldLabel:'Pubmed id',
    labelWidth:120,
    listConfig:{
        loadingText:'Searching...',
        emptyText:'No matching pubmed ids found.'
    }
});
