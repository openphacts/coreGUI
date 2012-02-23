/*
    Use this store if you need to get search results as list of CSIDs.
*/

Ext.define('CS.store.SearchResult', {
    extend: 'Ext.data.ArrayStore',
    requires: ['CS.model.SearchResult', 'CS.config.Settings'],
    model: 'CS.model.SearchResult',
    constructor: function () {
        this.callParent(arguments);

        this.setProxy({
            type: 'jsonp',
            url: CS.config.Settings.baseUrl + '/JSON.ashx?op=GetSearchResult'
        });
    },
    getCSIDs: function () {
        if (this.CSIDs == null) {
            var oThis = this;
            this.CSIDs = new Array();
            this.each(function (item) {
                oThis.CSIDs.push(item.get('CSID'));
            })
        }

        return this.CSIDs;
    }
});
