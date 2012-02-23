Ext.define('CS.view.search.Base', {
    extend: 'Ext.form.Panel',
    initComponent: function () {
        this.callParent(arguments);

        this.statusStore = Ext.create('CS.store.SearchStatus', {});
    },
//    searchProgress: function () {
//        return this.searchStatus.Progress;
//    },
//    searchCount: function () {
//        return this.searchStatus.Count;
//    },
//    searchMessage: function () {
//        return this.searchStatus.Message;
//    },
//    searchStatus: function () {
//        return this.searchStatus.Status;
//    },
    updateSearchStatus: function () {
//        this.statusStore.load({
//            params: { rid: this.rid },
//            scope: this,
//            callback: function (records, options, success) {
//                this.searchStatus = records[0].data;

//                if (this.searchProgress() == 1) {
//                    Ext.MessageBox.updateProgress(100, this.searchCount() + ' record(s) found');
//                    Ext.defer(Ext.MessageBox.hide, 1000, Ext.MessageBox);
//                    Ext.defer(this.showSearchResults, 1000, this);
//                }
//                else {
//                    Ext.MessageBox.updateProgress(Math.round(100 * this.searchProgress()));
//                    Ext.defer(this.updateSearchStatus, 1000, this);
//                }
//            }
//        });
    },
    getResultsWindow: function () {
        if (this.resultsWnd == null) {
            this.searchResults = new CSSearchResults({});

            this.resultsWnd = new Ext.Window({
                width: 500,
                height: 500,
                closeAction: 'hide',
                title: 'Search results',
                border: true,
                shadow: true,
                layout: 'fit',
                items: this.searchResults,
                bbar: [
                    '->',
                    {
                        text: 'Close',
                        scope: this,
                        handler: function () {
                            this.getResultsWindow().hide();
                        }
                    }
                ]
            });
        }

        return this.resultsWnd;
    },
    showSearchResults: function () {
        if (this.results != null) {
            if (typeof this.results == 'string') {
                Ext.getCmp(this.results).loadResults(this.rid);
            }
            else if (this.results instanceof CSSearchResults) {
                this.results.loadResults(this.rid);
            }
            else {
                Ext.MessageBox.alert('Error', 'Unsupported results type');
            }
        }
        else {
            var wnd = this.getResultsWindow();
            wnd.show();
            this.searchResults.loadResults(this.rid);
        }
    }
});
