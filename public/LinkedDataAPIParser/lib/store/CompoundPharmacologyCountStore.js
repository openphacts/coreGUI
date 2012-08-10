/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 25/06/2012
 * Time: 15:32
 * To change this template use File | Settings | File Templates.
 */

Ext.define('LDA.store.CompoundPharmacologyCountStore', {
    extend:'LDA.store.basestores.FilteringStore',
    model:'LDA.model.PharmacologyCountModel',
    storeId:'CompoundPharmacologyCountStore',
    BASE_URL:'http://ops.few.vu.nl/compound/pharmacology/count?',
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
        this.proxy.reader = Ext.create('LDA.helper.CompoundPharmacologyCountReader');
        this.callParent(arguments);
    }


});