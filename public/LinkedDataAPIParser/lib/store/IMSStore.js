Ext.define('LDA.store.IMSStore', {
    extend:'Ext.data.Store',
    model:'LDA.model.IMSModel',
    storeId:'IMSStore',
    proxy: {
	type: 'ajax',
        timeout: 180000,
        url: ims_status_url
    },

    constructor:function (config, arguments) {
	console.log('LDA.store.IMSStore: constructor()');
        this.proxy.reader = Ext.create('LDA.helper.IMSReader', {});
        this.callParent(arguments);
    }
});
