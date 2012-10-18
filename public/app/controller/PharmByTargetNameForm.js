Ext.define('LSP.controller.PharmByTargetNameForm', {
    extend: 'LSP.controller.grids.DynamicGrid',

    views: ['pharm_by_target_name2.PharmByTargetNameForm', 'pharm_by_target_name2.PharmByTargetNameScrollingGrid'],
    // views:['pharm_by_target_name2.PharmByTargetNameForm', 'pharm_by_target_name2.PharmByTargetNameGrid'],
    stores: ['LDA.store.TargetPharmacologyPaginatedStore'],
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
                select: this.enableSubmit
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
            'PharmByTargetNameForm #provId': {
                change: this.onProvChange
            }
        });
    },


    handleHistoryToken: function(historyTokenObject) {
        if (historyTokenObject.u) {
            var dg = this.getGridView();
            var store = dg.store;
            if (historyTokenObject.u != store.proxy.extraParams.uri) {
                this.current_uri = historyTokenObject.u;
                store.proxy.extraParams.uri = historyTokenObject.u;
                store.proxy.reader.uri = historyTokenObject.u;
                store.setURI(historyTokenObject.u);
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
        var form = button.up('form');
        button.disable();
        var values = form.getValues();
        if (this.current_uri == values.protein_uri) {
            var dg = this.getGridView();
            var store = dg.store;
            store.proxy.extraParams.uri = this.current_uri;
            store.proxy.reader.uri = this.current_uri;
            store.setURI(this.current_uri);
            dg.setLoading(true);
            //loading the store is done after the total results are fetched
            this.fetchTotalResults();
        } else {
            Ext.History.add('!p=PharmByTargetNameForm&u=' + values.protein_uri);
        }
    }

});
