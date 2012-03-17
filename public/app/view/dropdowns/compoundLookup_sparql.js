Ext.define('LSP.view.dropdowns.compoundLookup_sparql', {
    extend:'Ext.form.ComboBox',
    alias:'widget.compoundLookup_sparql',

    valueField:'cmpdurl',
    store:Ext.create('Ext.data.Store', {
        fields:[
            {type:'string', name:'cmpd_name'},
            {type:'string', name:'cmpdurl'}
        ],
        proxy:{
            type:'ajax',
            api:{
                read:'sparql_endpoint/cmpd_name_lookup.json'
            },
            reader:{
                type:'json',
                root:'objects',
                totalProperty:'totalCount'
            }
        }
    }),
    queryMode:'remote',
    displayField:'cmpd_name',
    minChars:4,
    hideTrigger:true,
    forceSelection:true,
    typeAhead:true,
    emptyText:'Start typing...',
    name:'cmpd_uuid',
    margin:'5 5 5 5',
    width:800,
    fieldLabel:'Compound name',
    labelWidth:120,
    listConfig:{
        loadingText:'Searching...',
        emptyText:'No matching compounds found.'
    },
    listeners:{
        select:function (combo, selection) {
            var post = selection[0];
            if (post) {
                var fields = this.up().items.items;
                fields.forEach(function (item) {
                    if (item.name == 'cmpd_uuid') {
                        item.setValue(post.data.cmpdurl);
                    }
                });
            }
        }
    }
});
