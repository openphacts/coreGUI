Ext.define('LDA.store.EnzymeFamilyPaginatedStore', {
    extend:'LDA.store.basestores.PaginatedFilteringStore',
    model:'LDA.model.PharmacologyPaginatedModel',
    storeId:'EnzymeFamilyPaginatedStore',
    BASE_URL: ldaBaseUrl + '/target/enzyme/pharmacology/pages?',
    REQUEST_TYPE: 'enzyme',

    constructor:function (config, arguments) {
		console.log('EnzymeFamilyPaginatedStore: constructor()');
        this.proxy.reader = Ext.create('LDA.helper.EnzymeFamilyPaginatedReader');
        this.callParent(arguments);
    }
});
