Ext.define('LDA.store.CompoundPharmacologyPaginatedStore', {
    extend:'LDA.store.basestores.PaginatedFilteringStore',
    model:'LDA.model.PharmacologyPaginatedModel',
    storeId:'CompoundPharmacologyPaginatedStore',
    BASE_URL:'http://ops.few.vu.nl/compound/pharmacology/pages?',

    constructor:function (config, arguments) {
		console.log('CompoundPharmacologyPaginatedStore: constructor()');
        this.proxy.reader = Ext.create('LDA.helper.CompoundPharmacologyPaginatedReader');
		// this.proxy.limitParam = '_pageSize';
		// this.proxy.pageParam = '_page';
        this.callParent(arguments);
    },

});
