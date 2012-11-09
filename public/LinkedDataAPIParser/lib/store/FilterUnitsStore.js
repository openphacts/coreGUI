Ext.define('LDA.store.FilterUnitsStore', {
    extend: 'LDA.store.basestores.BaseStore',
    model: 'LDA.model.FilterUnitsModel',
    storeId: 'FilterUnitsStore',
    BASE_URL: ldaBaseUrl + '/pharmacology/filters/units/',
    activity_type: undefined,

    constructor: function(config, arguments) {
        console.log('LDA.store.FilterUnitsStore: constructor()');
        this.proxy.reader = Ext.create('LDA.helper.FilterUnitsReader');
        this.BASE_URL += config.activity_type + '?';
        this.callParent(arguments);
    }
});
