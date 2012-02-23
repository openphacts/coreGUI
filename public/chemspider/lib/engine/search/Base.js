Ext.define('CS.engine.search.Base', {
    extend: 'Ext.util.Observable',
    limit: 100,
    rid: '',
    constructor: function (config) {
        this.addEvents({ finished: true });

        this.listeners = config.listeners;

        //  create store for checking search result status
        this.statusStore = Ext.create('CS.store.SearchStatus', {});

        //  create search result store that returns list of found CSIDs
        this.resultStore = Ext.create('CS.store.SearchResult', {});

        //  create 'Searching...' mask for displaying during the search
        searchingMask = new Ext.LoadMask(Ext.getBody(), { msg: "Searching..." });

        this.callParent(arguments)
    },
    searchProgress: function () {
        return this.searchStatus.Progress;
    },
    searchCount: function () {
        return this.searchStatus.Count;
    },
    searchMessage: function () {
        return this.searchStatus.Message;
    },
    searchStatus: function () {
        return this.searchStatus.Status;
    },
    startProgress: function () {
        searchingMask.show();
    },
    updateProgress: function () {
        this.statusStore.load({
            params: { rid: this.rid },
            scope: this,
            callback: function (records, options, success) {
                this.searchStatus = records[0].data;

                if (this.searchProgress() == 1) {
                    this.stopProgress();
                }
            }
        });
    },
    stopProgress: function () {
        searchingMask.hide();
    },
    runSearch: function (params) {
        this.startProgress();

        params.limit = this.limit;

        //  clear previous rearch results
        this.csids = null;

        this.store.load({
            params: params,
            scope: this,
            callback: function (records, operation, success) {
                if (success) {
                    this.rid = operation.response;
                    this.updateProgress();
                    this.fireEvent('finished', this, this.rid);
                }
                else {
                    this.stopProgress();

                    Ext.MessageBox.show({
                        title: 'Error',
                        msg: 'Search structure engine: ' + operation.error,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                }
            }
        });
    },
    loadCSIDs: function (callback) {
        var oThis = this;
        this.resultStore.load({
            params: { rid: this.rid },
            callback: function (records, operation, success) {
                if (success) {
                    oThis.csids = oThis.resultStore.getCSIDs();
                    if (callback != null)
                        callback(oThis.csids);
                }
                else {
                    Ext.MessageBox.show({
                        title: 'Error',
                        msg: 'Cannot get list of found CSIDs: ' + operation.error,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                }
            }
        });
    }
});
