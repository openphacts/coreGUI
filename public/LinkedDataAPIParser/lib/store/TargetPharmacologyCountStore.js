Ext.define('LDA.store.TargetPharmacologyCountStore', {
    extend:'LDA.store.basestores.FilteringStore',
    model:'LDA.model.PharmacologyCountModel',
    storeId:'TargetPharmacologyCountStore',
    countNode: 'targetPharmacologyTotalResults',
    BASE_URL: LDA.helper.LDAConstants.LDA_BASE_URL + '/target/pharmacology/count?',

    constructor:function (config, arguments) {
        this.proxy.reader = Ext.create('LDA.helper.TargetPharmacologyCountReader');
        this.callParent(arguments);
    }
});
