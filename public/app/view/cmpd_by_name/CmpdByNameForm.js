Ext.define('LSP.view.cmpd_by_name.CmpdByNameForm', {
    extend:'Ext.form.Panel',
    alias:'widget.CmpdByNameForm',
    closable:true,
    header: false,
    requires:[
        'LSP.view.dropdowns.conceptWikiCompoundLookup',
        'LSP.view.dynamicgrid.DynamicGrid',
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
                          Ext.create('CW.view.ConceptWikiLookup', {
	                        xtype:'conceptWikiLookup',
	                        fieldLabel:'Compound name',
	                        itemId: 'compoundByNameLookup',
				store: Ext.create('CW.store.ConceptWikiLookup', {}),
	                        name: 'compound_uri',
	                        cwTagUuid: '07a84994-e464-4bbf-812a-a4b96fa3d197'   // This is the ConceptWiki tag uuid for proteins. Must be set to use method!
	                    }),
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
    }
});
