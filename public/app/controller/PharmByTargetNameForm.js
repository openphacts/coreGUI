Ext.define('LSP.controller.PharmByTargetNameForm', {
    extend: 'LSP.controller.grids.DynamicGrid',

    views: ['pharm_by_target_name2.PharmByTargetNameForm', 'pharm_by_target_name2.PharmByTargetNameScrollingGrid'],
    // views:['pharm_by_target_name2.PharmByTargetNameForm', 'pharm_by_target_name2.PharmByTargetNameGrid'],
    // stores: ['LDA.store.TargetPharmacologyPaginatedStore'],
    refs: [{
        ref: 'gridView', // reference to the view
        selector: '#pharmByTargetNameGrid'
    }, {
        ref: 'formView',
        selector: 'PharmByTargetNameForm'
    }, {
        ref: 'lookup',
        selector: 'conceptWikiProteinLookup'
    }, {
        ref: 'submitButton',
        selector: '#pharmByTargetSubmit_id'

    }, {
        ref: 'filterContainer',
        selector: 'PharmByTargetNameForm #filterSelectorContainer_id'
    }, {
		ref: 'unitsCombo',
		selector: 'PharmByTargetNameForm #unit_combobox_id'
    }, {
          ref: 'tsvDownloadButton',
          selector: 'PharmByTargetNameForm #tsvDownloadProxy_id'
        }],
    filters: undefined,
    current_uri: undefined,

    init: function() {
        console.log('PharmByTargetNameForm: init()');
        this.control({
            'PharmByTargetNameForm button[action=query_pharm_by_target_name]': {
                click: this.submitQuery
            },
            'PharmByTargetNameForm conceptWikiLookup': {
                select: this.enableSubmit,
                matchingconcept: this.enableSubmit
            },
            'PharmByTargetNameForm': {
                afterrender: this.prepGrid,
                historyToken: this.handleHistoryToken
            },
            'PharmByTargetNameForm button[action=add_filter_form]': {
                click: this.addFilterForm
            },
            'PharmByTargetNameForm button[action=add_completed_organism_filter]': {
                click: this.addCompletedOrganismFilter
            },
            'PharmByTargetNameForm button[action=add_completed_activity_filter]': {
                click: this.addCompletedActivityFilter
            },
            'PharmByTargetNameForm button[action=add_completed_target_organism_filter]': {
		click: this.addCompletedTargetOrganismFilter
            },
            'PharmByTargetNameForm #provId': {
                change: this.onProvChange
            },
            'PharmByTargetNameForm #activity_combobox_id': {
                select: this.comboSelect,
                scope: this
            },
'PharmByTargetNameForm #tsvDownloadProxy_id': {
                click: this.prepareTSVDownload
            },
            'PharmByTargetNameForm #lensComboId': {
                change: this.lensComboChange
            }
        });
    },

    lensComboChange: function(combo, value) {
       this.currentLens = value;
       this.getGridView().store.setLens(this.currentLens);
    },

   comboSelect: function(combo, records, eOpts) {
	var activity = records[0].get('about');
	var me = this;
	// only fetch new units if the selected activity is different than before
	if (this.current_activity_combo_select != activity) {
		var units_store = this.getUnitsCombo().getStore();
		this.getUnitsCombo().clearValue();
		units_store.removeAll();
		this.current_activity_combo_select = activity;
		this.getUnitsCombo().setLoading('Fetching units...');
		var filter_units_store = Ext.create('LDA.store.FilterUnitsStore',{activity_type: activity});
        	filter_units_store.load(function(records, operation, success) {
				store_records = records;
				store_operation = operation;
				store_success = operation.success;
				if (store_success) {
				    Ext.each(records, function (record, index) {
						unit_abbr = LDA.helper.LDAConstants.LDAUnits[record.data.unit];
						unit_abbr == null ? unit_abbr = 'unknown abbreviation' : ''
                        unit = Ext.create('LSP.model.Unit', {unit: record.data.unit+ ' (' + unit_abbr + ')', name: record.data.unit});
                        units_store.add(unit);	
				    });
				}
				me.getUnitsCombo().setLoading(false);
        	});
	}
   },

    handleHistoryToken: function(historyTokenObject) {
        if (historyTokenObject.u) {
            var dg = this.getGridView();
            var store = dg.store;
            if (historyTokenObject.u != store.proxy.extraParams.uri) {
                // Setting the value in the Concept Wiki dropdown to the one defined by the uuid
                var cw_controller = this.getController("CW.controller.ConceptWikiLookup"); 
                var cw_dropdown = this.getFormView().down('conceptWikiLookup');
                cw_controller.setConcept(historyTokenObject.u,cw_dropdown, store);
                // Setting the uri for the LDA search
                this.current_uri = historyTokenObject.u;
                store.proxy.extraParams.uri = historyTokenObject.u;
                store.proxy.reader.uri = historyTokenObject.u;
                //store.setURI(historyTokenObject.u);
                dg.setLoading(true);
                this.fetchTotalResults();
                // store.load();
            }
        } else if (historyTokenObject.s) {
            var lookup = this.getLookup();
            lookup.setRawValue(historyTokenObject.s);
            lookup.doQuery(historyTokenObject.s);
        }
    },

    getCountStore: function() {
        return Ext.create('LDA.store.TargetPharmacologyCountStore');
    },

    submitQuery: function(button) {
		var dg = this.getGridView();
		var store = dg.store;
		// remove the sort column if there was any
        store.sort_column = undefined;
        var form = button.up('form');
        button.disable();
        var values = form.getValues();
        if (this.current_uri == values.protein_uri) {
            store.proxy.extraParams.uri = this.current_uri;
            store.proxy.reader.uri = this.current_uri;
            //store.setURI(this.current_uri);
            dg.setLoading(true);
            //loading the store is done after the total results are fetched
            this.fetchTotalResults();
        } else {
            Ext.History.add('!p=PharmByTargetNameForm&u=' + values.protein_uri);
        }
    }

});
