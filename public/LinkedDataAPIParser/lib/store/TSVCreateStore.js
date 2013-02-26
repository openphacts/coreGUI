Ext.define('LDA.store.TSVCreateStore', {
    extend:'Ext.data.Store',
    model:'LDA.model.TSVCreateModel',
    storeId:'TSVCreateStore',
    pageParam: undefined,
    startParam: undefined,
    limitParam: undefined,    
    proxy: {
	type: 'ajax',
        timeout: 180000,
        url: tsv_create_url
    },

    constructor:function (config, arguments) {
	console.log('LDA.store.TSVCreateStore: constructor()');
        this.proxy.reader = Ext.create('LDA.helper.TSVCreateReader', {});
        this.callParent(arguments);
    }
});
