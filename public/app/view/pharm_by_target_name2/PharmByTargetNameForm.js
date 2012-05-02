Ext.define('LSP.view.pharm_by_target_name2.PharmByTargetNameForm', {
    extend:'Ext.form.Panel',
    alias:'widget.PharmByTargetNameForm',
    closable:true,
    requires:[
        'LSP.view.dropdowns.conceptWikiProteinLookup',
        'LSP.view.dynamicgrid.DynamicGrid3'
    ],
    layout:{
        type:'vbox',
        align:'stretch'
    },
    initComponent:function () {
//         var dymgridwidget = Ext.widget('dynamicgrid3',{
//                           itemId: 'pharmByTargetGrid_id',                                
//                           title: 'Pharmacology by Target name search results',
//                           gridBaseTitle: 'Pharmacology by Target name search results',
//                           flex: 1
//                         }
//                       );
        this.items = [
            {
                xtype:'label',
                html:'<span style="font-family: verdana; color: grey; ">Hint: Type in protein name and species. E.g. \"ADA protein human\"</span>',
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
                        xtype:'conceptWikiProteinLookup',
                        fieldLabel:'Protein name',
                        forceSelection:true,
                        allowBlank:false,
                        typeAhead:true,
                        typeAheadDelay:250,
                        queryDelay:70
                    },
                    {
                        xtype:'button',
                        itemId:'pharmByTargetSubmit_id',
                        padding:'5 5 5 5',
                        text:'Search...',
                        disabled:true,
                        name:'query_summit_button',
                        action:'query_pharm_by_target_name'
                    }
                ]
            },
//                        dymgridwidget
            {
                xtype:'dynamicgrid3',
                itemId:'pharmByTargetGrid_id',
                title:'Pharmacology by Target name search results',
                gridBaseTitle:'Pharmacology by Target name search results',
                flex:1,
                readUrl:'/core_api_calls/pharm_by_protein_name.json'
            }
        ];
        this.callParent(arguments);
    },

    setFormData:function (historyTokenObject) {
        //formdata comes directly from form via history
        //load data
        //this needs to be the function that does everything after clicking the button

        if (historyTokenObject.u) {
            //gets ref to
            var dg = this.down('#pharmByTargetGrid_id');
            var store = dg.store;
            if (historyTokenObject.u != store.proxy.extraParams.protein_uri) {
                store.proxy.extraParams.protein_uri = historyTokenObject.u;
                store.load({params:{ offset:0, limit:100}});
            }
        } else if (historyTokenObject.s) {
            var lookup = this.down('conceptWikiProteinLookup');
            lookup.setRawValue(historyTokenObject.s);
            lookup.doQuery(historyTokenObject.s);
        }


    }


});
