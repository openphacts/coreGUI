Ext.define('LDA.store.CompoundPharmacologyPaginatedStore', {
    extend:'LDA.store.basestores.PaginatedFilteringStore',
    model:'LDA.model.PharmacologyPaginatedModel',
    storeId:'CompoundPharmacologyPaginatedStore',	
    BASE_URL: ldaBaseUrl + '/compound/pharmacology/pages?',
    REQUEST_TYPE : 'compound',

    constructor:function (config, arguments) {
	console.log('CompoundPharmacologyPaginatedStore: constructor()');
        this.proxy.reader = Ext.create('LDA.helper.CompoundPharmacologyPaginatedReader');
        this.callParent(arguments);
    }

});
