Ext.define('LDA.store.EnzymePaginatedStore', {
    extend:'LDA.store.basestores.PaginatedFilteringStore',
    model:'LDA.model.EnzymePaginatedModel',
    storeId:'EnzymePaginatedStore',
    BASE_URL:'http://ops.few.vu.nl/enzyme/pharmacology/pages?',

    constructor:function (config, arguments) {
        this.proxy.reader = Ext.create('LDA.helper.EnzymePaginatedReader');
        this.callParent(arguments);
    }
});