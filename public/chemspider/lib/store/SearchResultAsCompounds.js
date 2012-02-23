/*
Use this store if you need to get search results as list of Compound structures (CSIS, Formula, Name etc.)
*/

Ext.define('CS.store.SearchResultAsCompounds', {
    extend: 'Ext.data.Store',
    requires: ['CS.model.SearchResultAsCompounds', 'CS.config.Settings'],
    model: 'CS.model.SearchResultAsCompounds',
    constructor: function () {
        this.callParent(arguments);

        this.setProxy({
            type: 'jsonp',
            url: CS.config.Settings.baseUrl + '/JSON.ashx?op=GetSearchResultAsCompounds'
        });
    }
});
