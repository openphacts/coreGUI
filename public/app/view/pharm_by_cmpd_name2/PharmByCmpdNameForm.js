Ext.define('LSP.view.pharm_by_cmpd_name2.PharmByCmpdNameForm', {
	extend: 'Ext.form.Panel',
	alias: 'widget.PharmByCmpdNameForm',
	closable: true,
	requires: ['LSP.view.dropdowns.conceptWikiCompoundLookup', 'LDA.helper.DynamicPagingToolbar', 'LSP.view.filter.FilterForm', 'LDA.helper.LDAConstants'],
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	// Use a PagingGridScroller (this is interchangeable with a PagingToolbar)
	// verticalScrollerType: 'dynamicpagingtoolbar',
	// do not reset the scrollbar when the view refreshs
	invalidateScrollerOnRefresh: false,
	// infinite scrolling does not support selection
	disableSelection: true,
	initComponent: function() {
		console.log('PharmByCmpdNameForm: initComponent()');
		this.items = [{
			xtype: 'label',
			html: '<span style="font-family: verdana; color: grey; ">Hint: Type in compound name. E.g. \"Aspirin\"</span>',
			labelWidth: 400,
			padding: '5 0 0 140'
		}, {
			xtype: 'container',
			margin: '0 5 5 5',
			name: 'form_fields',
			layout: {
				type: 'column'
			},
			style: 'background-color: #fff;',
			items: [{
				name: 'cmpd_uuid',
				xtype: 'hidden',
				value: ''
			}, Ext.create('CW.view.ConceptWikiLookup', {
	                        xtype:'conceptWikiLookup',
	                        fieldLabel:'Compound name',
	                        itemId: 'compoundByNameLookup',
	                        name: 'compound_uri',
	                        cwTagUuid: '07a84994-e464-4bbf-812a-a4b96fa3d197'   // This is the ConceptWiki tag uuid for proteins. Must be set to use method!
	                }),
{
				xtype: 'button',
				itemId: 'pharmByCmpdSubmit_id',
				padding: '5 5 5 5',
				text: 'Search...',
				disabled: true,
				action: 'query_pharm_by_cmpd_name'
			}]
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
			},{
                xtype: 'radiogroup',
                width: 200,
                fieldLabel: 'Provenance',
                itemId: 'provId',
                margin: '5 5 5 65',

                items: [
                    { boxLabel: 'On', name: 'prov', inputValue: true },
                    { boxLabel: 'Off', name: 'prov', inputValue: false, checked: true}]
            },{
               xtype: 'button',
               name: 'provHelp',
               iconCls:'provenanceHelpIcon',
               tooltip: 'Provenance Datasources <br><br><p class="conceptWikiValueColour"> - ConceptWiki </p> ' +
                   '<br><p class="chemspiderValueColour"> - ChemSpider </p>' +
                   '<br><p class="drugbankValueColour"> - Drugbank </p>' +
                   '<br><p class="chemblValueColour"> - Chembl</p>'
            }
            ]
		},{
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
		},{
			xtype: 'PharmByCmpdNameScrollingGrid',
			itemId: 'pharmByCmpdNameGrid',
			title: 'Pharmacology by Compound name search results',
			gridBaseTitle: 'Pharmacology by Compound name search results',
			flex: 1
		}];
		this.callParent(arguments);
	}

});
