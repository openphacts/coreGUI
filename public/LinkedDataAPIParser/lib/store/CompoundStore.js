Ext.define('LDA.store.CompoundStore', {
    extend:'LDA.store.basestores.BaseStore',
    model:'LDA.model.CompoundModel',
    storeId:'CompoundStore',
    BASE_URL: ldaBaseUrl + '/compound?',

    constructor:function (config, arguments) {
		console.log('LDA.store.CompoundStore: constructor()');
        this.proxy.reader = Ext.create('LDA.helper.CompoundReader');
        this.callParent(arguments);
    }
});
