Ext.define('LDA.store.TargetStore', {
    extend:'LDA.store.basestores.BaseStore',
    model:'LDA.model.TargetModel',
    storeId:'TargetStore',
    BASE_URL: ldaBaseUrl + '/target?',

    constructor:function (config, arguments) {
		console.log('LDA.store.TargetStore: constructor()');
        this.proxy.reader = Ext.create('LDA.helper.TargetReader');
        this.callParent(arguments);
    }
});
