Ext.define('LSP.view.dropdowns.compoundLookup', {
    extend:'Ext.form.ComboBox',
    alias:'widget.compoundLookup',

    store:Ext.create('Ext.data.Store', {
        fields:[
            {type:'string', name:'compound_name'},
            {type:'string', name:'compound_uri'}
        ],
        proxy:{
            type:'ajax',
            api:{
                read:'core_api_calls/cmpd_name_lookup.json'
            },
            reader:{
                type:'json',
                root:'objects',
                totalProperty:'totalCount'
            }
        }
    }),
    queryMode:'remote',
    valueField:'compound_uri',
    displayField:'compound_name',
    name:'compound_uri',
    minChars:4,
    hideTrigger:true,
    forceSelection:true,
    typeAhead:true,
    emptyText:'Start typing...',
    margin:'5 5 5 5',
    width:600,
    queryDelay:700,
    fieldLabel:'Compound name',
    labelWidth:120,
    listConfig:{
        loadingText:'Searching...',
        emptyText:'No matching compounds found.'
    }
});
