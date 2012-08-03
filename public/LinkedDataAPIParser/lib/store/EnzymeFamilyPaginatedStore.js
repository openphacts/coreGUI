Ext.define('LDA.store.EnzymeFamilyPaginatedStore', {
    extend:'LDA.store.basestores.PaginatedFilteringStore',
    model:'LDA.model.PharmacologyPaginatedModel',
    storeId:'EnzymeFamilyPaginatedStore',
    BASE_URL:'http://ops.few.vu.nl/enzyme/pharmacology/pages?',

    constructor:function (config, arguments) {
		console.log('EnzymeFamilyPaginatedStore: constructor()');
        this.proxy.reader = Ext.create('LDA.helper.EnzymeFamilyPaginatedReader');
        this.callParent(arguments);
    }
});