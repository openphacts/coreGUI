describe('Enzymes can be searched', function() {
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
});
    it('and results can be paginated', function() {
	var store = Ext.create('LDA.store.EnzymeFamilyPaginatedStore',{});
        store.uri = 'http://purl.uniprot.org/enzyme/6.1.1-';
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
    it('and results can be filtered for activities', function() {
	var store = Ext.create('LDA.store.EnzymeFamilyPaginatedStore',{});
        store.uri = 'http://purl.uniprot.org/enzyme/6.1.1-';
		store.setActivityType('IC50');
		store.setActivityValue('1000');
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
    it('and results can be filtered for organisms', function() {
	var store = Ext.create('LDA.store.EnzymeFamilyPaginatedStore',{});
        store.uri = 'http://purl.uniprot.org/enzyme/6.1.1-';
		store.setAssayOrganism('Staphylococcus aureus');
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
    it('and results can be filtered for both activities and organisms', function() {
	var store = Ext.create('LDA.store.EnzymeFamilyPaginatedStore',{});
        store.uri = 'http://purl.uniprot.org/enzyme/6.1.1-';
		store.setAssayOrganism('Staphylococcus aureus');
		store.setActivityType('IC50');
		store.setActivityValue('1000');
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
    it('and specific pages can be requested while filtering', function() {
	var store = Ext.create('LDA.store.EnzymeFamilyPaginatedStore',{});
        store.uri = 'http://purl.uniprot.org/enzyme/6.1.1-';
		store.page = 10;
		store.setActivityType('IC50');
		store.setActivityValue('1000');
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
