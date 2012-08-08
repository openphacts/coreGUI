Ext.define('LSP.view.pharm_by_enzyme_family.PharmEnzymeForm', {
    extend:'Ext.form.Panel',
    alias:'widget.PharmEnzymeForm',
    closable:true,
    requires:[
        'LSP.view.tree_selector_forms.EnzymeTreeForm',
	        'LSP.view.dynamicgrid.DynamicGrid3'
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
				},
		        {
		            xtype:'PharmByEnzymeFamilyGrid',
		            itemId:'pharmByEnzymeFamilyGrid',
		            title:'Pharmacology by Enzyme Family search results',
		            gridBaseTitle:'Pharmacology by Enzyme Family search results',
		            flex:1
		        }
		    ];
        this.callParent(arguments);
    }
});