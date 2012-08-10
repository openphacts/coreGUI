/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 29/06/2012
 * Time: 07:41
 * To change this template use File | Settings | File Templates.
 */

Ext.define('LDA.store.TargetStore', {
    extend:'LDA.store.basestores.BaseStore',
    model:'LDA.model.TargetModel',
    storeId:'TargetStore',
    BASE_URL:'http://ops.few.vu.nl/target?',
    proxy:{
        type:'jsonp',
        noCache:false,
        startParam:undefined,
		limitParam:undefined,
		pageParam:undefined,
        //this is the only query param handled natively by the proxy, all others are handled in store config below.
        callbackKey:'_callback'
    },

    constructor:function (config, arguments) {
        this.proxy.reader = Ext.create('LDA.helper.TargetReader');
        this.callParent(arguments);
    }
});
