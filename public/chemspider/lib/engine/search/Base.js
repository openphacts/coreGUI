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
    setLimit: function(limit) {
	    this.limit = limit;
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

//                if (this.searchProgress() == 1) {
//                    this.stopProgress();
//                }
            }
        });
    },
    stopProgress: function () {
        searchingMask.hide();
    },
    runSearch: function (params) {
	// no need for 2 loading masks
        //this.startProgress();
        params['resultOptions.Limit'] = this.limit;

        //  clear previous search results
        this.csids = null;

        this.store.load({
            params: params,
            scope: this,
            callback: function (records, operation, success) {
                if (success) {
                    var csids = [];
                    var result = operation.response.result.primaryTopic.result;
                    if (result == null) {
                        result = operation.response.result.primaryTopic[0].result;
                    }
                    Ext.each(result, function(csid, index) {
                        csids.push(csid);
                    });
                    //this.updateProgress();
                    this.fireEvent('finished', this, csids);
                }
                else {
                    this.err = operation.error;
                    this.fireEvent('failed', this, this.err);
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
                    this.err = operation.error;
                    oThis.fireEvent('failed', this, this.err);
                }
            }
        });
    }
});
