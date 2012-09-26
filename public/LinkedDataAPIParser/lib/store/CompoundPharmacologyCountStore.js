Ext.define('LDA.store.CompoundPharmacologyCountStore', {
    extend:'LDA.store.basestores.FilteringStore',
    model:'LDA.model.PharmacologyCountModel',
    storeId:'CompoundPharmacologyCountStore',
    countNode: 'compoundPharmacologyTotalResults',
    BASE_URL: LDA.helper.LDAConstants.LDA_BASE_URL + '/compound/pharmacology/count?',

    constructor:function (config, arguments) {
        this.proxy.reader = Ext.create('LDA.helper.CompoundPharmacologyCountReader');
        this.callParent(arguments);
    }


});
