Ext.define('LDA.store.CompoundPharmacologyStore', {
    extend:'LDA.store.basestores.FilteringStore',
    model:'LDA.model.PharmacologyModel',
    storeId:'CompoundPharmacologyStore',
    BASE_URL:ldaBaseUrl + '/compound/pharmacology?',

    constructor:function (config, arguments) {
        this.proxy.reader = Ext.create('LDA.helper.CompoundPharmacologyReader');
        this.callParent(arguments);
    }
});
