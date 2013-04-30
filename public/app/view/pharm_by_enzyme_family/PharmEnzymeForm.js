var enzyme_condition = Ext.create('Ext.data.Store', {
	fields: ['symbol', 'name'],
	data: [{
		"symbol": "=",
		"name": "="
	}, {
		"symbol": ">",
		"name": ">"
	}, {
		"symbol": "<",
		"name": "<"
	}, {
		"symbol": "<=",
		"name": "<="
	}, {
		"symbol": ">=",
		"name": ">="
	}]
});
Ext.define('LSP.view.pharm_by_enzyme_family.PharmEnzymeForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.PharmEnzymeForm',
    closable: true,
    header: false,
    requires: ['LSP.view.tree_selector_forms.EnzymeTreeForm', 'LSP.view.dynamicgrid.DynamicGrid'],
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    initComponent: function() {
        console.log('PharmEnzymeForm: initComponent()');
        this.items = [{
            xtype: 'container',
            height: 34,
            name: 'form_fields',
            //      width: 600,
            layout: {
                type: 'column'
            },
            items: [{
                xtype: 'displayfield',
                name: 'enzyme_family',
                margin: '5 5 5 5',
                width: 400,
                value: 'No enzyme class selected - press button ->',
                fieldLabel: 'Enzyme family class',
                labelWidth: 130
            }, {
                xtype: 'button',
                padding: '5 5 5 5',
                margin: '5 5 5 5',
                text: 'Browse EC codes',
                action: 'enz_tree'
            }, {
                name: 'enz_name',
                xtype: 'hidden',
                value: ''
            }, {
                name: 'ec_number',
                xtype: 'hidden',
                value: ''
            }]
        }, {
            xtype: 'button',
            action: 'query',
            margin: '5 0 0 320',
            maxWidth: 300,
            itemId: 'submitEnzymePharm_id',
            text: 'Start search...',
            disabled: true

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
                tooltip: 'Provenance Datasources <br><br><p style="text-align:right;">ConceptWiki <img src="/assets/conceptWikiValueIcon.png" height="15" width="15"/></p> ' + '<br><p style="text-align:right;">ChemSpider <img src="/assets/chemspiderValueIcon.png" height="15" width="15"/></p>' + '<br><p style="text-align:right;">Drugbank <img src="/assets/drugbankValueIcon.png" height="15" width="15"/></p>' + '<br><p style="text-align:right;">Chembl <img src="/assets/chemblValueIcon.png" height="15" width="15"/></p>'
            }]
        }, {
            xtype: 'container',
            margin: '0 5 5 5',
            name: 'filter_selector_container',
            itemId: 'filterSelectorContainer_id',
            hidden: true,
            layout: {
                type: 'vbox'
            },
            style: 'background-color: #fff;',
            items: [{xtype: 'container',
            margin: '0 5 5 5',
            name: 'activity_selector_container',
	    itemId: 'activitySelectorContainer_id',
	    hidden: false,
            layout: {
                type: 'hbox'
            },
            style: 'background-color: #fff;',
            items: [{
		xtype: 'combobox',
		itemId: 'activity_combobox_id',
		fieldLabel: 'Activity Type',
		store: Ext.create('LDA.store.FilterActivityStore', {}),
		queryMode: 'remote',
		displayField: 'activity_type',
		valueField: 'about',
		labelWidth: 100,
		labelPad: 2,
		padding: '0 2 0 0',
		emptyText: 'Use drop down...',
		editable: false
	}, {
		xtype: 'combobox',
		itemId: 'conditions_combobox_id',
		fieldLabel: 'Conditions',
		store: enzyme_condition,
		queryMode: 'local',
		displayField: 'symbol',
		valueField: 'name',
		labelWidth: 70,
		labelPad: 2,
		padding: '0 2 0 0',
		emptyText: 'Use drop down...',
		editable: false
	}, {
		xtype: 'textfield',
		itemId: 'value_textfield_id',
		name: 'value',
		fieldLabel: 'Value',
		allowBlank: false,
		labelWidth: 50,
		labelPad: 2,
		padding: '0 2 0 0',
		emptyText: 'Enter a value...'
		// requires a non-empty value
	}, {
		xtype: 'combobox',
		itemId: 'unit_combobox_id',
		fieldLabel: 'Unit',
		store: Ext.create('Ext.data.Store', {
			model: 'LSP.model.unit',
			fields: ['unit', 'name']
		}),
		queryMode: 'local',
		displayField: 'unit',
		valueField: 'name',
		labelWidth: 50,
		labelPad: 2,
		padding: '0 10 0 0',
		emptyText: 'Use drop down...',
		editable: false
	}, {
		xtype: 'button',
		itemId: 'addCompletedActivityFilter_id',
		iconCls: 'icon-new',
		padding: '5 5 5 5',
		tooltip: 'Add this activity filter',
		action: 'add_completed_activity_filter'
	}]}, {
                xtype: 'OrganismFilterForm',
                itemId: 'organismFilterContainer_id',
                margin: '0 5 5 5',
                name: 'organism_filter_fields',
                hidden: false
            }, {
            xtype: 'TargetOrganismFilterForm',
            itemId: 'targetOrganismFilterContainer_id',
            margin: '0 5 5 5',
            name: 'target_organism_filter_fields',
            hidden: false
        }]
        }, {
            xtype: 'container',
            itemId: 'completedFilterContainer_id',
            margin: '0 5 5 5',
            name: 'completed_filter_container',
            hidden: true
        }, {
            // xtype:'PharmByEnzymeFamilyGrid',
            xtype: 'PharmByEnzymeFamilyScrollingGrid',
            itemId: 'pharmByEnzymeFamilyGrid',
            title: 'Pharmacology by Enzyme Family search results',
            gridBaseTitle: 'Pharmacology by Enzyme Family search results',
            flex: 1
        }];
        this.callParent(arguments);
    }
});
