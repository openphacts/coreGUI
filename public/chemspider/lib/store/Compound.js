Ext.define('CS.store.Compound', {
    extend: 'Ext.data.Store',
    requires: ['CS.model.Compound', 'CS.config.Settings'],
    model: 'CS.model.Compound',
    constructor: function () {
        this.callParent(arguments);

        this.setProxy({
            type: 'jsonp',
            timeout: 60000,
            url: CS.config.Settings.baseUrl + '/JSON.ashx?op=GetRecordsAsCompounds'
        });
    }
});
