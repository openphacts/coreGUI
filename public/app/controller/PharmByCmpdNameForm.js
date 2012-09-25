/*
// Filter model holds the values that the user selected in the filter form view
// as well as references to the controller and view used when removing the filter
*/
Ext.define('LSP.model.Filter', {
	extend: 'Ext.data.Model',
	fields: ['activity', 'condition', 'value', 'unit', 'filterView', 'controller'],
});
Ext.define('LSP.controller.PharmByCmpdNameForm', {
	extend: 'LSP.controller.grids.DynamicGrid',
	views: ['pharm_by_cmpd_name2.PharmByCmpdNameForm', 'pharm_by_cmpd_name2.PharmByCmpdNameScrollingGrid'],
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
		selector: 'PharmByCmpdNameForm #filterContainer_id'
	}],
	//filters: [],

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
			'PharmByCmpdNameForm button[action=add_completed_filter]': {
				click: this.addCompletedFilter
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
				store.proxy.extraParams.uri = historyTokenObject.u;
				store.proxy.reader.uri = historyTokenObject.u;
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
		Ext.History.add('!p=PharmByCmpdNameForm&u=' + values.compound_uri);
	},

    onProvChange :function(field, newVal, oldVal) {
        var dg = this.getGridView();
        dg.toggleProv(newVal['prov']);
    }



});


