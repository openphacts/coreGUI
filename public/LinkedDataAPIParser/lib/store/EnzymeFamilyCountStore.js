Ext.define('LDA.store.EnzymeFamilyCountStore', {
    extend:'LDA.store.basestores.FilteringStore',
    model:'LDA.model.PharmacologyCountModel',
    storeId:'CompoundPharmacologyCountStore',
    BASE_URL:'http://ops.few.vu.nl/target/enzyme/pharmacology/count?',
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
        this.proxy.reader = Ext.create('LDA.helper.EnzymeFamilyCountReader');
        this.callParent(arguments);
    }


});