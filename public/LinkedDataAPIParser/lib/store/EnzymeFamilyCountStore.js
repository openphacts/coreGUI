Ext.define('LDA.store.EnzymeFamilyCountStore', {
    extend:'LDA.store.basestores.FilteringStore',
    model:'LDA.model.PharmacologyCountModel',
    storeId:'EnzymeFamilyCountStore',
    countNode: LDA.helper.LDAConstants.LDA_ENZYME_FAMILY_COUNT,
    BASE_URL: ldaBaseUrl + '/target/tree/pharmacology/count?',

    constructor:function (config, arguments) {
        this.proxy.reader = Ext.create('LDA.helper.EnzymeFamilyCountReader');
        this.callParent(arguments);
    }


});
