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
                        items:[
                            {boxLabel:'Exact structure search', name:'search_type', inputValue:1, checked:true},
                            {boxLabel:'Substructure seach', name:'search_type', inputValue:2},
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
                xtype:'dynamicgrid3',
                readUrl:'/core_api_calls/get_chem_info4known_csids.json',
                title:'Structure search results',
                gridBaseTitle:'Structure search results',
                flex:1
            }
        ];

        this.callParent(arguments);
    }
});
