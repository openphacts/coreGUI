Ext.Loader.setConfig({enabled:true, paths:{ 'LDA':'LinkedDataAPIParser/lib' } });
Ext.Loader.setConfig({enabled:true, paths:{ 'CW':'conceptwiki/lib' } });

Ext.create('Ext.app.Application', {
    name:'LSP',

    appFolder:'app',

    // Define all the controllers that should initialize at boot up of your application
    controllers:[
        'LDAParserController',
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

    autoCreateViewport:true,

    launch:function () {
        Ext.Loader.setConfig({enabled:true, paths:{ 'CS':'chemspider/lib','CW':'conceptwiki/lib' } });
        
   

//        Ext.Loader.setPath('LDA', 'LinkedDataAPIParser/lib');
    }
});
