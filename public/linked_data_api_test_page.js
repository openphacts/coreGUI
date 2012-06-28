/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 27/06/2012
 * Time: 10:41
 * To change this template use File | Settings | File Templates.
 */
Ext.Loader.setConfig({enabled:true});
Ext.Loader.setConfig({paths:{ 'LDA':'LinkedDataAPIParser/lib' } });
Ext.data.JsonP.disableCaching = false;
Ext.application({
    requires:['LDA.controller.LDAParserController',
        'LDA.view.LDAParserView'],
    appFolder:'/LinkedDataAPIParser/lib',
    name:'LDA',
    controllers:[
        'LDAParserController'
    ],

    launch:function () {
        Ext.create('Ext.container.Viewport', {
            layout:'border',
            items:[
                {
                    xtype:'label',
                    region:'north',
                    text:'Linked Data API Test Page'
                },
                {
                    xtype:'textarea',
                    fieldLabel:'log',
                    labelAlign:'top',
                    region:'south',
                    width:'100%',
                    height:200,
                    itemId:'logarea',
                    autoScroll:true
                },
                {
                    region:'center',
                    xtype:'LDAParserView',
                    autoScroll:true
                }
            ]
        });
    }
});