// The data store containing the list of states
//var compound_activity_type = Ext.create('LDA.store.FilterActivityStore', {});
var compound_condition = Ext.create('Ext.data.Store', {
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
	}
	// TODO this part of the ui is conflating ideas I think. all is for the relation part of the results not the activity type
	//, {
	//	"symbol": "all",
	//	"name": "all"
	//}
	]
});
Ext.define('LSP.view.pharm_by_cmpd_name2.PharmByCmpdNameForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.PharmByCmpdNameForm',
    closable: true,
    requires: ['LSP.view.filter.ActivityFilterForm', 'LSP.view.filter.OrganismFilterForm'],
    header: false,
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
            html: '<span style="font-family: verdana; color: grey; ">Hint: Type in compound name. E.g. \"Aspirin\" and select a result</span>',
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
            },
            Ext.create('CW.view.ConceptWikiLookup', {
                           xtype: 'conceptWikiLookup',
                           fieldLabel: 'Compound name',
                           itemId: 'pharmByCompoundCWLookup',
                           store: Ext.create('CW.store.ConceptWikiLookup', {
                               proxy: {
                                   type: 'jsonp',
                                   timeout: 5000,
                                   url: CW.config.Settings.searchByTagUrl,
                                   reader: Ext.create('CW.helper.ConceptWikiJSONReader'),
                                   noCache: false,
                                   limitParam: undefined,
                                   startParam: undefined,
                                   pageParam: undefined,
		                   callbackKey: '_callback',
                                   extraParams: {
	                                   '_format': 'json', 
                                   // TODO add branch back in when ops dev api can handle the parameter 
                                   //    'branch': 4, // Only show species results from swissprot
                                       'app_id': app_id,
                                       'app_key': app_key
                                   }
                               }
                           }),
                           name: 'compound_uri',
                           cwTagUuid: '07a84994-e464-4bbf-812a-a4b96fa3d197' // This is the ConceptWiki tag uuid for proteins. Must be set to use method!
                       }), {
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
        },  {
            xtype: 'container',
            margin: '0 5 5 5',
            name: 'filter_selector_container',
	    itemId: 'filterSelectorContainer_id',
	    hidden: true,
            layout: {
                type: 'vbox'
            },
            style: 'background-color: #fff;',
            items: [

{xtype: 'container',
            margin: '0 5 5 5',
            name: 'activity_selector_container',
	    itemId: 'activitySelectorContainer_id',
	    hidden: false,
            layout: {
                type: 'hbox'
            },
            style: 'background-color: #fff;',
            items: [
{
		xtype: 'combobox',
		itemId: 'activity_combobox_id',
		fieldLabel: 'Activity Type',
		store: Ext.create('LDA.store.FilterActivityStore', {}),
		queryMode: 'remote',
		queryParam: false,
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
		store: compound_condition,
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
	}]},{
            xtype: 'OrganismFilterForm',
            itemId: 'organismFilterContainer_id',
            margin: '0 5 5 5',
            name: 'organism_filter_fields',
            hidden: false
}]}, {
            xtype: 'container',
            itemId: 'completedFilterContainer_id',
            margin: '0 5 5 5',
            name: 'completed_filter_container',
            hidden: true
        }, {
            xtype: 'PharmByCmpdNameScrollingGrid',
            itemId: 'pharmByCmpdNameGrid',
            title: 'Pharmacology by Compound name search results',
            gridBaseTitle: 'Pharmacology by Compound name search results',
            flex: 1
        }];
        this.callParent(arguments);
    }

});
