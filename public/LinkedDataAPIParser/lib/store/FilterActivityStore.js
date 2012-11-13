Ext.define('LDA.store.FilterActivityStore', {
    extend:'LDA.store.basestores.BaseStore',
    model:'LDA.model.FilterActivityModel',
    storeId:'FilterActivityStore',
    BASE_URL: ldaBaseUrl + '/pharmacology/filters/activities?',

    constructor:function (config, arguments) {
		console.log('LDA.store.FilterActivityStore: constructor()');
        this.proxy.reader = Ext.create('LDA.helper.FilterActivityReader');
        this.callParent(arguments);
    }
});
