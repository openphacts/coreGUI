Ext.define('LSP.controller.PharmByCmpdNameForm', {
	extend: 'LSP.controller.grids.DynamicGrid',
	views: ['pharm_by_cmpd_name2.PharmByCmpdNameForm', 'pharm_by_cmpd_name2.PharmByCmpdNameScrollingGrid'],
	stores: ['LDA.store.CompoundPharmacologyPaginatedStore', 'LDA.store.CompoundPharmacologyStore'],
	// views:['pharm_by_cmpd_name2.PharmByCmpdNameForm', 'pharm_by_cmpd_name2.PharmByCmpdNameGrid'],
	refs: [{
		ref: 'gridView',
		// reference to the view
		selector: '#pharmByCmpdNameGrid'
	}, {
		ref: 'formView',
		selector: 'PharmByCmpdNameForm'
	}, {
		ref: 'submitButton',
		selector: '#pharmByCmpdSubmit_id'
	}, {
		ref: 'nextRecordsButton',
		selector: 'PharmByCmpdNameForm dynamicgrid3 #nextRecords'
	}, {
		ref: 'lookup',
		selector: '#pharmByCmpdLookup'
	}, {
		ref: 'filterContainer',
		selector: 'PharmByCmpdNameForm #filterSelectorContainer_id'
	}],
	filters: undefined,
	current_uri: undefined,

	init: function() {
		console.log('PharmByCmpdNameForm: init()');
		this.control({
			'PharmByCmpdNameForm button[action=query_pharm_by_cmpd_name]': {
				click: this.submitQuery
			},
			'PharmByCmpdNameForm conceptWikiLookup': {
				select: this.enableSubmit
			},
			'PharmByCmpdNameForm': {
				historyToken: this.handleHistoryToken,
				afterrender: this.prepGrid
			},
			'PharmByCmpdNameForm button[action=add_filter_form]': {
				click: this.addFilterForm
			},
			'PharmByCmpdNameForm button[action=add_completed_organism_filter]': {
				click: this.addCompletedOrganismFilter
			},
			'PharmByCmpdNameForm button[action=add_completed_activity_filter]': {
				click: this.addCompletedActivityFilter
			},
            'PharmByCmpdNameForm #provId' : {
                change: this.onProvChange
            }
		});
	},

	handleHistoryToken: function(historyTokenObject) {
		console.log('PharmByCmpdNameForm: handleHistoryToken()');
		if (historyTokenObject.u) {
			var dg = this.getGridView();
			var store = dg.store;
			if (historyTokenObject.u != store.proxy.extraParams.uri) {
				this.current_uri = historyTokenObject.u;
				store.proxy.extraParams.uri = historyTokenObject.u;
				store.proxy.reader.uri = historyTokenObject.u;
				// This was originally set so that the TSV download could retrieve the uri
				// However, it causes the store to send 2 uri params, no idea why. Possibly
				// the store sends any configs that are not defaults as params?. The uri is stored in the
				// proxy extraParams so use that.
				//store.setURI(historyTokenObject.u);
				dg.setLoading(true);
				//loading the store is done after the total results are fetched
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
		return Ext.create('LDA.store.CompoundPharmacologyCountStore');
	},

	submitQuery: function(button) {
		console.log('PharmByCmpdNameForm: submitQuery()');
		var form = button.up('form');
		button.disable();
		var values = form.getValues();
		if (this.current_uri == values.compound_uri) {
			var dg = this.getGridView();
			var store = dg.store;
			store.proxy.extraParams.uri = this.current_uri;
			store.proxy.reader.uri = this.current_uri;
			//store.setURI(this.current_uri);
			dg.setLoading(true);
			//loading the store is done after the total results are fetched
			this.fetchTotalResults();
		} else {
			Ext.History.add('!p=PharmByCmpdNameForm&u=' + values.compound_uri);
		}
	}

});


