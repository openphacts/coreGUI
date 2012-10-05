Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'CS':'../chemspider/lib','CW':'../conceptwiki/lib','LDA':'../LinkedDataAPIParser/lib'
    }
});
Ext.require('Ext.app.Application');

var Application = null;

Ext.onReady(function() {
    Application = Ext.create('Ext.app.Application', {
    name:'LSP',
    appFolder:'app',
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
            jasmine.getEnv().addReporter(new jasmine.TrivialReporter());
            jasmine.getEnv().execute();
    }
});
});
