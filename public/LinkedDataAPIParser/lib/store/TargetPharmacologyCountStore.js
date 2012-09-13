/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 29/06/2012
 * Time: 11:23
 * To change this template use File | Settings | File Templates.
 */

Ext.define('LDA.store.TargetPharmacologyCountStore', {
    extend:'LDA.store.basestores.FilteringStore',
    model:'LDA.model.PharmacologyCountModel',
    storeId:'TargetPharmacologyCountStore',
    countNode: 'targetPharmacologyTotalResults',
    BASE_URL:'http://ops.few.vu.nl/target/pharmacology/count?',
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
        this.proxy.reader = Ext.create('LDA.helper.TargetPharmacologyCountReader');
        this.callParent(arguments);
    }
});
