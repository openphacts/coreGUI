Ext.define('LSP.view.pharm_by_target_name2.PharmByTargetNameForm', {
    extend:'Ext.form.Panel',
    alias:'widget.PharmByTargetNameForm',
    closable:true,
    requires:[
        'LSP.view.dynamicgrid.DynamicGrid'
    ],
    layout:{
        type:'vbox',
        align:'stretch'
    },
	// Use a PagingGridScroller (this is interchangeable with a PagingToolbar)
	    verticalScrollerType: 'paginggridscroller',
	    // do not reset the scrollbar when the view refreshs
	    invalidateScrollerOnRefresh: false,
	    // infinite scrolling does not support selection
	    disableSelection: true,
    initComponent:function () {
		console.log('PharmByTargetNameForm: constructor()');
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
                      Ext.create('CW.view.ConceptWikiLookup', {
                        xtype:'conceptWikiLookup',
                        fieldLabel:'Protein name',
                        itemId: 'pharmByProteinCWLookup',
                        name: 'protein_uri',
                        cwTagUuid: 'eeaec894-d856-4106-9fa1-662b1dc6c6f1'   // This is the ConceptWiki tag uuid for proteins. Must be set to use method!
                    }),
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
//            {
//                xtype:'dynamicgrid3',
//                itemId:'pharmByTargetGrid_id',
//                title:'Pharmacology by Target name search results',
//                gridBaseTitle:'Pharmacology by Target name search results',
//                flex:1,
//                readUrl:'/core_api_calls/pharm_by_protein_name.json'
//    }
            {
	            // xtype:'PharmByTargetNameGrid',
                xtype:'PharmByTargetNameScrollingGrid',
                itemId:'pharmByTargetNameGrid',
                title:'Pharmacology by Target name search results',
                gridBaseTitle:'Pharmacology by Target name search results',
                flex:1
            }
        ];
        this.callParent(arguments);
    }
});
