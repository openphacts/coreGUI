Ext.define('LSP.view.cmpd_by_name.CmpdByNameForm', {
    extend:'Ext.form.Panel',
    alias:'widget.CmpdByNameForm',
    closable:true,
    requires:[
        'LSP.view.dropdowns.conceptWikiCompoundLookup',
        'LSP.view.dynamicgrid.DynamicGrid3',
        'LSP.view.cmpd_by_name.CmpdByNameSingleDisplayForm'
    ],
    layout:{
        type:'vbox',
        align:'stretch'
    },

    initComponent:function () {
        var me = this;

        Ext.applyIf(me, {
            items:[
                {
                    xtype:'label',
                    html:'<span style="font-family: verdana; color: grey; ">Hint: Type in compound name. E.g. \"Aspirin\"</span>',
                    labelWidth:400,
                    padding:'5 0 0 140'
                },
                {
                    xtype:'container',
                    margin:'0 5 5 5',
                    name:'form_fields',
                    layout:{
                        type:'column'
                    },
                    style:'background-color: #fff;',
                    items:[
                        {
                            xtype:'conceptWikiCompoundLookup'
                        },
                        {
                            xtype:'button',
                            padding:'5 5 5 5',
                            text:'Search...',
                            itemId:'CmpdByNameSubmit_id',
                            disabled:true,
                            action:'query_cmpd_by_name'
                        }
                    ]},
                {
                    xtype:'CmpdByNameSingleDisplayForm',
                    flex:1

                }
            ]
        });
        this.callParent(arguments);
    },

    setFormData:function (historyTokenObject) {
        //load data
        //this needs to be the function that does everything after clicking the button

        if (historyTokenObject.u) {
            var store = Ext.data.StoreManager.lookup('Compounds');
            if (historyTokenObject.u != store.proxy.extraParams.compound_uri) {
                store.proxy.extraParams.compound_uri = historyTokenObject.u;
                store.load();
            }
        } else if (historyTokenObject.s) {
            var lookup = this.down('conceptWikiCompoundLookup');
            lookup.setRawValue(historyTokenObject.s);
            lookup.doQuery(historyTokenObject.s);
        }
    }
});
