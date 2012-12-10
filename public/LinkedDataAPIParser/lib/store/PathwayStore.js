Ext.define('LDA.store.PathwayStore', {
    extend:'LDA.store.basestores.BaseStore',
    model:'LDA.model.PathwayModel',
    storeId:'PathwayStore',
    BASE_URL: ldaBaseUrl + '/pathway?',
    proxy: {
	type: 'jsonp',
	noCache: false,
	startParam: undefined,
	limitParam: undefined,
	pageParam: undefined,
	callbackKey: '_callback',
        timeout: 180000
    },

    constructor:function (config, arguments) {
		console.log('LDA.store.PathwayStore: constructor()');
        this.proxy.reader = Ext.create('LDA.helper.PathwayReader');
        this.callParent(arguments);
    }
});
