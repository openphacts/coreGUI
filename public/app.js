Ext.Loader.setConfig({enabled:true, paths:{ 'LDA':'LinkedDataAPIParser/lib' } });
Ext.Loader.setConfig({enabled:true, paths:{ 'CW':'conceptwiki/lib' } });
// loader mask for all grids backed by store, avoids having to call setLoading(true) and then
// setLoading(false)
// Ext.define("Ext.view.AbstractView.LoadMask", {
//     override: "Ext.view.AbstractView",
//     onRender: function() { 
//         this.callParent(); 
//         if (this.loadMask && Ext.isObject(this.store)) { 
//             this.setMaskBind(this.store); 
//         } 
//     } 
// });

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

    // autoCreateViewport:true,

    launch:function () {
		console.log('Application: launch()');
        Ext.Loader.setConfig({enabled:true, paths:{ 'CS':'chemspider/lib','CW':'conceptwiki/lib' } });
		// firefox seems to have some issues with autocreateviewport so create the view after launch is called.
		// no idea why this is not working, maybe some asynch classloader issue in ff with the new lda views? Chrome has no problems with it.
		Ext.create('LSP.view.Viewport');
    }
});
