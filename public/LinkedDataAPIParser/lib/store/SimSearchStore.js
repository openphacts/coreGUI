Ext.define('LDA.store.SimSearchStore', {
    extend:'LDA.store.basestores.BaseStore',
    model:'LDA.model.SimModel',
    storeId:'SimSearchStore',
    BASE_URL:simSearchUrl,
    proxy:{
        type:'ajax',
        noCache:false,
        startParam:undefined,
		limitParam:undefined,
		pageParam:undefined,
        //this is the only query param handled natively by the proxy, all others are handled in store config below.
        callbackKey:'_callback'
    },

    constructor:function (config, arguments) {
        this.proxy.reader = Ext.create('LDA.helper.SimReader');
        this.callParent(arguments);
    }
});
