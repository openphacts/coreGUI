Ext.define('LDA.store.EnzymeFamilyCountStore', {
    extend:'LDA.store.basestores.FilteringStore',
    model:'LDA.model.PharmacologyCountModel',
    storeId:'EnzymeFamilyCountStore',
    countNode: 'enzymePharmacologyTotalResults',
    BASE_URL: ldaBaseUrl + '/target/enzyme/pharmacology/count?',

    constructor:function (config, arguments) {
        this.proxy.reader = Ext.create('LDA.helper.EnzymeFamilyCountReader');
        this.callParent(arguments);
    }


});
