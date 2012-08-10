/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 26/06/2012
 * Time: 21:45
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LDA.store.CompoundStore', {
    extend:'LDA.store.basestores.BaseStore',
    model:'LDA.model.CompoundModel',
    storeId:'CompoundStore',
    BASE_URL:'http://ops.few.vu.nl/compound?',
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
        this.proxy.reader = Ext.create('LDA.helper.CompoundReader');
        this.callParent(arguments);
    }
});
