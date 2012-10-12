Ext.define('LDA.store.TargetPharmacologyPaginatedStore', {
    extend:'LDA.store.basestores.PaginatedFilteringStore',
    model:'LDA.model.PharmacologyPaginatedModel',
    storeId:'TargetPharmacologyPaginatedStore',
    BASE_URL: LDA.helper.LDAConstants.LDA_BASE_URL + '/target/pharmacology/pages?',
    REQUEST_TYPE: 'target',

    constructor:function (config, arguments) {
		console.log('TargetPharmacologyPaginatedStore: constructor()');
        this.proxy.reader = Ext.create('LDA.helper.TargetPharmacologyPaginatedReader');
        this.callParent(arguments);
    }
	
});
