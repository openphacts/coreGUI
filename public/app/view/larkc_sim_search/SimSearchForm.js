var sim_search_type = Ext.create('Ext.data.Store', {
	fields: ['sim_type', 'name'],
	data: [{
		"sim_type": "Tanimoto",
		"name": "Tanimoto"
	}, {
		"sim_type": "Tversky",
		"name": "Tversky"
	}, {
		"sim_type": "Euclidian",
		"name": "Euclidian"
	}]
});

Ext.define('LSP.view.larkc_sim_search.SimSearchForm', {
	extend: 'Ext.form.Panel',
	alias: 'widget.SimSearchForm',
	header: false,
	requires: ['LSP.view.mol_editor_forms.KetcherForm', 'LSP.view.larkc_sim_search.SimSearchScrollingGrid'],
	closable: true,
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	initComponent: function() {
		console.log('LSP.view.larkc_sim_search.SimSearchForm: initComponent()');

		this.items = [{
			xtype: 'form',
			padding: '5 5 5 5',
			border: false,
			//                height:'100%',
			style: 'background-color: #fff;',
			items: [{
				name: 'molfile',
				xtype: 'hidden',
				value: ''
			}, {
				xtype: 'fieldcontainer',
				layout: 'column',
				collapsible: false,
				defaults: {
					anchor: '100%'
				},
				items: [{
					xtype: 'textfield',
					name: 'smiles',
					itemId: 'smilesField',
					emptyText: 'Enter SMILES here or use the molecular editor to draw structure - click button ->',
					fieldLabel: 'Search for compounds similar to SMILES',
					labelWidth: 230,
					width: 650
				}, {
					xtype: 'button',
					action: 'ketcher_editor',
					text: 'Draw structure'
				}, {
					xtype: 'radiogroup',
					width: 160,
					labelWidth: 65,
					fieldLabel: 'Provenance',
					itemId: 'provId',
					margin: '5 5 5 80',

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
				xtype: 'radiogroup',
				fieldLabel: 'Search type',
				itemId: 'searchTypeRadio',
				items: [{
					boxLabel: 'Exact structure search',
					name: 'search_type',
					inputValue: 1,
					checked: true
				}, {
					boxLabel: 'Substructure search',
					name: 'search_type',
					inputValue: 2
				}, {
					boxLabel: 'Structural similarity search',
					name: 'search_type',
					inputValue: 3
				}]
			}, {
				xtype: 'container',
				layout: 'column',
				//fieldLabel:'Search type',
				//itemId:'searchTypeRadioa',
				items: [{
					xtype: 'combobox',
					itemId: 'sim_search_type_id',
					fieldLabel: 'Similarity Threshold Type',
                    labelWidth: 150,
					store: sim_search_type,
					queryMode: 'local',
					displayField: 'sim_type',
					valueField: 'sim_type',
					// labelWidth: 100,
					labelPad: 2,
					padding: '0 2 0 0',
					value: 'Tanimoto'
				}, {
					xtype: 'numberfield',
					itemId: 'tanimoto_threshold_id',
					anchor: '100%',
					name: 'tanimoto_threshold',
					fieldLabel: 'Similarity threshold',
                    labelWidth: 115,
                    // step: 5,
					value: 90,
                    width: 175,
					allowDecimals: false,
					maxValue: 100,
					minValue: 1,
					padding: '0 2 0 25'
				}, {
					xtype: 'numberfield',
					itemId: 'max_records_id',
					anchor: '100%',
					name: 'max_records',
					fieldLabel: 'Maximum records to retrieve',
                    labelWidth: 160,
                    width: 260,
                    step: 20,
					value: 100,
					allowDecimals: false,
					minValue: 20,
					padding: '0 2 0 25'
				}]
			}, {
				xtype: 'button',
				action: 'query',
				itemId: 'sim_sss_start_search_button_id',
				text: 'Start search...'
			}

			]
		}, {
			xtype: 'SimSearchScrollingGrid',
			itemId: 'simSearchGrid',
			title: 'Structure search results',
			gridBaseTitle: 'Structure search results',
			flex: 1
		}];

		this.callParent(arguments);
	},


	setFormData: function(historyTokenObject) {
		//        console.log('SimSearchForm setFormData()');
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
					searchTypeRadio.setValue({
						search_type: 1
					});
				} else if (historyTokenObject.st == 'sub') {
					searchTypeRadio.setValue({
						search_type: 2
					});
				} else if (historyTokenObject.st == 'sim') {
					searchTypeRadio.setValue({
						search_type: 3
					});
				}
			} else {
				searchTypeRadio.setValue({
					search_type: 1
				});
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
