Ext.define('CS.store.SearchStatus', {
    extend: 'Ext.data.Store',
    requires: ['CS.model.SearchStatus', 'CS.config.Settings'],
    model: 'CS.model.SearchStatus',
    constructor: function () {
        this.callParent(arguments);

        this.setProxy({
            type: 'jsonp',
            url: CS.config.Settings.baseUrl + '/JSON.ashx?op=GetSearchStatus'
        });
    }
});
