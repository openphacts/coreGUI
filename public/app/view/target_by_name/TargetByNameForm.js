Ext.define('LSP.view.target_by_name.TargetByNameForm', {
    extend:'Ext.form.Panel',
    alias:'widget.TargetByNameForm',
    closable:true,
    requires:[
        'LSP.view.dropdowns.conceptWikiProteinLookup',
        'LSP.view.dynamicgrid.DynamicGrid3',
        'LSP.view.target_by_name.TargetPanel'
    ],
    layout:{
        type:'vbox',
        align:'stretch'
    },
    initComponent:function () {

        this.items = [
            {
                xtype:'label',
                html:'<span style="font-family: verdana; color: grey; ">Hint: Start typing in protein name and species. E.g. \"Adenosine receptor A2a (Homo sapiens)\"</span>',
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
                        xtype:'conceptWikiProteinLookup'
                    },
                    {
                        xtype:'button',
                        padding:'5 5 5 5',
                        text:'Search',
                        itemId:'TargetByNameSubmit_id',
                        disabled:true,
                        action:'query_target_by_name'
                    }
                ]
            },
            {
                xtype:'TargetPanel',
                flex:1
            }
//                       {
//                        xtype: 'dynamicgrid3',
//                        itemId: 'TargetByNameGrid_id',
//                        readUrl: '/core_api_calls/protein_info.json',
//                        title: 'Target by name search results',
//                        gridBaseTitle: 'Target by name search results',
//                        flex: 1
//                        }
        ];
        this.callParent(arguments);
    },

    setFormData:function (formData) {
        //formdata comes directly from form via history
        //load data
        //this needs to be the function that does everything after clicking the button
        var store = Ext.data.StoreManager.lookup('Targets');
        store.proxy.extraParams.protein_uri = formData;
        store.load();
    }
});
