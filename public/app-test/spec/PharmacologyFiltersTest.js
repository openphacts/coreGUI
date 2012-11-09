describe('Retrieve the available filters and units available for queries using the OPS Linked Data API', function() {
    var store_records, store_operation, store_success;
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
    it('retrieve the list of filter activities', function() {
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
});
