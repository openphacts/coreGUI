Ext.define('LSP.view.larkc_sim_search.SimSearchForm', {
    extend:'Ext.form.Panel',
    alias:'widget.SimSearchForm',
    requires:[
        'LSP.view.mol_editor_forms.KetcherForm'
    ],
    closable:true,
    layout:{
        type:'vbox',
        align:'stretch'
    },
    initComponent:function () {
        console.log('LSP.view.larkc_sim_search.SimSearchForm: initComponent()');

        this.items = [
            {
                xtype:'form',
                padding:'5 5 5 5',
                border:false,
//                height:'100%',
                style:'background-color: #fff;',
                items:[
                    {
                        name:'molfile',
                        xtype:'hidden',
                        value:''
                    },
                    {
                        xtype:'fieldcontainer',
                        layout:'column',
                        collapsible:false,
                        defaults:{anchor:'100%'},
                        items:[
                            {
                                xtype:'textfield',
                                name:'smiles',
                                itemId:'smilesField',
                                emptyText:'Enter SMILES here or use the molecular editor to draw structure - click button ->',
                                fieldLabel:'Search for compounds similar to SMILES',
                                labelWidth:230,
                                width:650
                            },
                            {
                                xtype:'button',
                                action:'ketcher_editor',
                                text:'Draw structure'
                            }
                        ]
                    },
                    {
                        xtype:'radiogroup',
                        fieldLabel:'Search type',
                        itemId:'searchTypeRadio',
                        items:[
                            {boxLabel:'Exact structure search', name:'search_type', inputValue:1, checked:true},
                            {boxLabel:'Substructure search', name:'search_type', inputValue:2},
                            {boxLabel:'Structural similarity search', name:'search_type', inputValue:3}
                        ]
                    },
                    {
                        xtype:'button',
                        action:'query',
                        itemId:'sim_sss_start_search_button_id',
                        text:'Start search...'
                    }

                ]},
            {
                xtype:'SimSearchScrollingGrid',
                itemId:'simSearchGrid',
                title:'Structure search results',
                gridBaseTitle:'Structure search results',
                flex:1
            }
        ];

        this.callParent(arguments);
    },


    setFormData:function (historyTokenObject) {
        console.log('SimSearchForm setFormData()');
        //formdata comes directly from form via history
        //load data
        //this needs to be the function that does everything after clicking the button

//        s = smiles string
//        st = search type ['exact','substructure','structural']

        if (historyTokenObject.sm) {
            var smilesField = this.down('#smilesField');
            smilesField.setValue(historyTokenObject.sm);
            var searchTypeRadio = this.down('#searchTypeRadio');
            if (historyTokenObject.st) {
                if (historyTokenObject.st == 'exact') {
                    searchTypeRadio.setValue({search_type:1});
                } else if (historyTokenObject.st == 'sub') {
                    searchTypeRadio.setValue({search_type:2});
                } else if (historyTokenObject.st == 'sim') {
                    searchTypeRadio.setValue({search_type:3});
                }
            } else {
                searchTypeRadio.setValue({search_type:1});
            }
            this.fireEvent('historyToken', historyTokenObject);
        }


//        if (historyTokenObject.u) {
//            //gets ref to
//            var dg = this.down('#simSearchGrid');
//            var store = dg.store;
//            if (historyTokenObject.u != store.proxy.extraParams.compound_uri) {
//                store.proxy.extraParams.compound_uri = historyTokenObject.u;
//                store.load({params:{ offset:0, limit:100}});
//            }
//        } else if (historyTokenObject.s) {
//            var lookup = this.down('conceptWikiCompoundLookup');
//            lookup.setRawValue(historyTokenObject.s);
//            lookup.doQuery(historyTokenObject.s);
//        }


    }
});
