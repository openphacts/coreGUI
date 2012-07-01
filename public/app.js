Ext.Loader.setConfig({enabled:true, paths:{ 'LDA':'LinkedDataAPIParser/lib' } });
Ext.create('Ext.app.Application', {
    name:'LSP',

    appFolder:'app',

    // Define all the controllers that should initialize at boot up of your application
    controllers:[
        'LDAParserController',
        'Users',
        'grids.DynamicGrid',
        'Grid',
        'NavigationTree',
        'Queryform',
        'SimSearchForm',
        'CmpdByNameForm',
        'TargetByNameForm',
        'PharmByTargetNameForm',
        'PharmByCmpdNameForm',
        'PharmEnzymeForm',
        'SummeryForm',
        'Settings',
        'pmidTextMiningHitsForm',
        'pathwayByCompoundForm',
        'pathwayByProteinForm'
    ],

    autoCreateViewport:true,

    launch:function () {
        Ext.Loader.setConfig({enabled:true, paths:{ 'CS':'chemspider/lib' } });

//        Ext.Loader.setPath('LDA', 'LinkedDataAPIParser/lib');
    }
});
