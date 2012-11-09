describe('Retrieve the available filters and units for queries using the OPS Linked Data API', function() {
    var store_records, store_operation, store_success, current_activity_type;
beforeEach(function() {
    this.application = Ext.create('Ext.app.Application', {
    name:'LSP',
    appFolder:'./app',
    requires:['LDA.helper.LDAConstants'],

    // Define all the controllers that should initialize at boot up of your application
    controllers:[
        'grids.DynamicGrid',
        'NavigationTree',
        'SimSearchForm',
        'CmpdByNameForm',
        'TargetByNameForm',
        'PharmByTargetNameForm',
        'PharmByCmpdNameForm',
        'PharmByEnzymeFamily',
        'Settings',
        'CW.controller.ConceptWikiLookup'
    ],
	
    launch:function () {
    }
});
});
    it('retrieve the types of activities which can be filtered', function() {
	var store = Ext.create('LDA.store.FilterActivityStore',{});

        store.load(function(records, operation, success) {
		store_records = records;
		store_operation = operation;
		store_success = operation.success;
        });
        waitsFor(
            function(){ return !store.isLoading(); },
            "load never completed",
            4000
        );
        runs(function() {
      	    expect(store_success).toEqual(true);
            expect(store_records.length).toBeGreaterThan(0);
        });
    });
    it('retrieve the units for different types of activities', function() {
	var store = Ext.create('LDA.store.FilterUnitsStore',{activity_type: store_records[0].data.activity_type});
	current_activity_type = store_records[0].data.activity_type;
        store.load(function(records, operation, success) {
		store_records = records;
		store_operation = operation;
		store_success = operation.success;
        });
        waitsFor(
            function(){ return !store.isLoading(); },
            "load never completed",
            4000
        );
        runs(function() {
      	    expect(store_success).toEqual(true);
            expect(store_records.length).toBeGreaterThan(0);
            expect(store_records[0].data.activity_type).toEqual(current_activity_type);
        });
    });
});
