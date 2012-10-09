Ext.define('LSP.view.pharm_by_target_name2.PharmByTargetNameForm', {
	extend: 'Ext.form.Panel',
	alias: 'widget.PharmByTargetNameForm',
	closable: true,
	requires: ['LSP.view.dynamicgrid.DynamicGrid'],
    header: false,
    layout: {
		type: 'vbox',
		align: 'stretch'
	},
	// Use a PagingGridScroller (this is interchangeable with a PagingToolbar)
	verticalScrollerType: 'paginggridscroller',
	// do not reset the scrollbar when the view refreshs
	invalidateScrollerOnRefresh: false,
	// infinite scrolling does not support selection
	disableSelection: true,
	initComponent: function() {
		console.log('PharmByTargetNameForm: constructor()');
		this.items = [{
			xtype: 'label',
			html: '<span style="font-family: verdana; color: grey; ">Hint: Type in protein name and species. E.g. \"ADA protein human\"</span>',
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
			items: [
			Ext.create('CW.view.ConceptWikiLookup', {
				xtype: 'conceptWikiLookup',
				fieldLabel: 'Protein name',
				itemId: 'pharmByProteinCWLookup',
				store: Ext.create('CW.store.ConceptWikiLookup', {
					proxy: {
						type: 'jsonp',
				        timeout: 5000,
				        url: CW.config.Settings.searchByTagUrl,
				        reader: Ext.create('CW.helper.ConceptWikiJSONReader'),
						extraParams: {
							'branch': 3 // Only show species results from swissprot
						}
					}
				}),
				name: 'protein_uri',
				cwTagUuid: 'eeaec894-d856-4106-9fa1-662b1dc6c6f1' // This is the ConceptWiki tag uuid for proteins. Must be set to use method!
			}),
			{
				xtype: 'button',
				itemId: 'pharmByTargetSubmit_id',
				padding: '5 5 5 5',
				text: 'Search...',
				disabled: true,
				name: 'query_summit_button',
				action: 'query_pharm_by_target_name'
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
            }, {
				xtype: 'radiogroup',
				width: 200,
				fieldLabel: 'Provenance',
				itemId: 'provId',
				margin: '5 5 5 65',

				items: [{
					boxLabel: 'On',
					name: 'prov',
					inputValue: true
				}, {
					boxLabel: 'Off',
					name: 'prov',
					inputValue: false,
					checked: true
				}]
			}, {
				xtype: 'button',
				name: 'provHelp',
                margin: '5 0 0 0',
                iconCls: 'provenanceHelpIcon',
				tooltip: 'Provenance Datasources <br><br><p class="conceptWikiValueColour"> - ConceptWiki </p> ' + '<br><p class="chemspiderValueColour"> - ChemSpider </p>' + '<br><p class="drugbankValueColour"> - Drugbank </p>' + '<br><p class="chemblValueColour"> - Chembl</p>'
			}]
		}, {
			xtype: 'FilterPanel',
			itemId: 'filterContainer_id',
			margin: '0 5 5 5',
			name: 'filter_fields',
			hidden: true
		}, {
			xtype: 'container',
			itemId: 'completedFilterContainer_id',
			margin: '0 5 5 5',
			name: 'completed_filter_container',
			hidden: true
		}, {
			xtype: 'PharmByTargetNameScrollingGrid',
			itemId: 'pharmByTargetNameGrid',
			title: 'Pharmacology by Target name search results',
			gridBaseTitle: 'Pharmacology by Target name search results',
			flex: 1
		}];
		this.callParent(arguments);
	}
});
