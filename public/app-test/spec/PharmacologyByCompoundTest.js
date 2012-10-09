describe('Compounds can be searched', function() {
    var store_records, store_operation, store_success;
beforeEach(function() {
    this.application = Ext.create('Ext.app.Application', {
    name:'LSP',
    appFolder:'./app',
    requires:['LDA.helper.LDAConstants'],

    // Define all the controllers that should initialize at boot up of your application
    controllers:[
//        'LDAParserController',
//        'Users',
        'grids.DynamicGrid',
   //     'grids.PharmaGridInf',
//        'Grid',
        'NavigationTree',
//        'Queryform',
        'SimSearchForm',
        'CmpdByNameForm',
        'TargetByNameForm',
        'PharmByTargetNameForm',
        'PharmByCmpdNameForm',
        'PharmByEnzymeFamily',
//        'SummeryForm',
        'Settings',
//        'pmidTextMiningHitsForm',
//        'pathwayByCompoundForm',
//        'pathwayByProteinForm',
//        'PharmByTargetNameFormInf',
        'CW.controller.ConceptWikiLookup'
    ],

    // autoCreateViewport:true,
	
    launch:function () {
            //include the tests in the test.html head
            //jasmine.getEnv().addReporter(new jasmine.TrivialReporter());
            //jasmine.getEnv().execute();
    }
});
    //this.controller = Ext.create('PharmByCmpdNameForm', { application: this.application });
    //spyOn(this.controller,'onLoginButtonTap').andReturn(true);
    //spyOn(this.controller,'onLogout').andReturn(true);
    //this.controller.init();
});
    it('and results can be paginated', function() {
        //var compound_pharmacology_paginated_store = Ext.create("LDA.store.CompoundPharmacologyPaginatedStore", {});
	//var ctlr = Application.getController('PharmByCmpdNameform');
	var store = this.application.getController('PharmByCmpdNameForm').getLDAStoreCompoundPharmacologyPaginatedStoreStore();
        store.uri = 'http://www.conceptwiki.org/concept/dd758846-1dac-4f0d-a329-06af9a7fa413';
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
    });
    });
    it('and results can be filtered', function() {
        //var compound_pharmacology_paginated_store = Ext.create("LDA.store.CompoundPharmacologyPaginatedStore", {});
	//var ctlr = Application.getController('PharmByCmpdNameform');
	var store = this.application.getController('PharmByCmpdNameForm').getLDAStoreCompoundPharmacologyPaginatedStoreStore();
        store.uri = 'http://www.conceptwiki.org/concept/dd758846-1dac-4f0d-a329-06af9a7fa413';
		store.setActivityType('Potency');
		store.setActivityValue('1.6');
		store.setActivityCondition('<');
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
    });
    });
    it('and specific pages can be requested', function() {
        //var compound_pharmacology_paginated_store = Ext.create("LDA.store.CompoundPharmacologyPaginatedStore", {});
	//var ctlr = Application.getController('PharmByCmpdNameform');
	var store = this.application.getController('PharmByCmpdNameForm').getLDAStoreCompoundPharmacologyPaginatedStoreStore();
        store.uri = 'http://www.conceptwiki.org/concept/dd758846-1dac-4f0d-a329-06af9a7fa413';
		store.page = 10;
		store.setActivityType('Potency');
		store.setActivityValue('1.6');
		store.setActivityCondition('<');
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
    });
    });

});