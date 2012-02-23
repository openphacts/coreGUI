Ext.define('CS.engine.search.Simple', {
    extend: 'CS.engine.search.Base',
    alias: 'widget.engine.simplesearch',
    constructor: function (config) {
        this.store = Ext.create('CS.store.Search', { operation: 'SimpleSearch' });
        this.callParent(arguments)
    },
    doSearch: function (params) {
        this.runSearch(params);
    }
});
