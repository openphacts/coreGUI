Ext.define('LSP.view.pharm_by_enzyme_family.PharmEnzymeForm', {
    extend:'Ext.form.Panel',
    alias:'widget.PharmEnzymeForm',
    closable:true,
    requires:[
        'LSP.view.tree_selector_forms.EnzymeTreeForm',
	        'LSP.view.dynamicgrid.DynamicGrid'
    ],
    layout:{
        type:'vbox',
        align:'stretch'
    },
    initComponent:function () {
		console.log('PharmEnzymeForm: initComponent()');
        this.items = [
            {
                xtype:'container',
                height:34,
                name:'form_fields',
                //      width: 600,
                layout:{
                    type:'column'
                },
	                items:[
	                    {
	                        xtype:'displayfield',
	                        name:'enzyme_family',
	                        margin:'5 5 5 5',
	                        width:688,
	                        value:'No enzyme class selected - press button ->',
	                        fieldLabel:'Enzyme family class',
	                        labelWidth:130
	                    },
	                    {
	                        xtype:'button',
	                        padding:'5 5 5 5',
	                        text:'Browse EC codes',
	                        action:'enz_tree'
	                    },
	                    {
	                        name:'enz_name',
	                        xtype:'hidden',
	                        value:''
	                    },
	                    {
	                        name:'ec_number',
	                        xtype:'hidden',
	                        value:''
	                    }
	                ]
	            },
				{
				    xtype:'button',
					action:'query',
					itemId:'submitEnzymePharm_id',
					text:'Start search...'
				}, {
			xtype: 'container',
			margin: '0 5 5 5',
			name: 'filter_fields',
			layout: {
				type: 'column'
			},
			style: 'background-color: #fff;',
			items: [{
				xtype: 'button',
				itemId: 'addFilterButton_id',
				iconCls: 'icon-new',
				padding: '5 5 5 5',
				tooltip: 'Show or hide filter selector',
				action: 'add_filter_form'
			}, {
				xtype: 'label',
				forId: 'addFilterButton_id',
				text: 'Filter',
				margin: '5 5 5 5'
			}]
		}, {
			xtype: 'FilterPanel',
			itemId: 'filterContainer_id',
			margin: '0 5 5 5',
			name: 'filter_fields',
			hidden: true
		}, 
		 {
			xtype: 'container',
			itemId: 'completedFilterContainer_id',
			margin: '0 5 5 5',
			name: 'completed_filter_container',
			hidden: true
		},
		        {
		            // xtype:'PharmByEnzymeFamilyGrid',
				    xtype:'PharmByEnzymeFamilyScrollingGrid',
		            itemId:'pharmByEnzymeFamilyGrid',
		            title:'Pharmacology by Enzyme Family search results',
		            gridBaseTitle:'Pharmacology by Enzyme Family search results',
		            flex:1
		        }
		    ];
        this.callParent(arguments);
    }
});
