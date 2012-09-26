Ext.define('LDA.store.TargetPharmacologyStore', {
    extend:'LDA.store.basestores.FilteringStore',
    model:'LDA.model.PharmacologyModel',
    storeId:'TargetPharmacologyStore',
    BASE_URL: LDA.helper.LDAConstants.LDA_BASE_URL + '/target/pharmacology?',

    constructor:function (config, arguments) {
        this.proxy.reader = Ext.create('LDA.helper.TargetPharmacologyReader');
        this.callParent(arguments);
    }
});