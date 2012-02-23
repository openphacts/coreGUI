Ext.define('CS.view.search.Simple', {
    extend: 'CS.view.search.Base',
    bodyStyle: 'padding: 5px;',
    alias: 'widget.simplesearch',
    height: 34,
    width: 250,
    layout: 'column',
    initComponent: function () {
        Ext.apply(this, {
            items: [
                {
                    xtype: 'textfield',
                    id: 'searchField',
                    emptyText: 'eg. Aspirin',
                    columnWidth: 1
                },
                {
                    xtype: 'button',
                    id: 'searchBtn',
                    text: 'Search',
                    width: 80,
                    scope: this,
                    handler: function (btn, evn) {
                        this.doSearch();
                    }
                }
            ]
        });

        var oThis = this;
        this.searchEngine = Ext.create('CS.engine.search.Simple', {
            listeners: {
                finished: function (sender, rid) {
                    oThis.rid = rid;
                    oThis.showSearchResults();
                }
            }
        });

        this.callParent(arguments);
    },
    doSearch: function () {
        var query = Ext.getCmp('searchField').getValue();
        if (query != '') {
            this.searchEngine.doSearch({ 'searchOptions.QueryText': query });
        }
        else {
            Ext.Msg.show({
                title: 'Nothing to search',
                msg: 'Please enter some text for searching',
                buttons: Ext.Msg.OK,
                scope: this,
                icon: Ext.MessageBox.INFO
            });
        }
    }
});
