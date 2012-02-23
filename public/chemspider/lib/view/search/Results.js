Ext.define('CS.view.search.Results', {
    extend: 'Ext.view.View',
    requires: ['CS.store.SearchResultAsCompounds', 'CS.config.Settings'],
    alias: 'widget.cs.searchresults',
    autoScroll: true,
    store: Ext.create('CS.store.SearchResultAsCompounds', {}),
    loadingText: 'Loading...',
    itemSelector: 'div.resWrap',
    overItemCls: 'resOver',
    emptyText: '<i>No records found</i>',
    trackOver: true,
    tpl: new Ext.XTemplate(
        '<tpl for=".">',
            '<div class="resWrap">',
                '<img src="' + CS.config.Settings.baseUrl + '/ImagesHandler.ashx?id={CSID}&w=75&h=75" width="75" height="75" />',
                '<p>',
                    '<span class="name">{Name}</span><br/>',
                    '<span class="mf">{MF:this.formatFormula}</span>',
                '</p>',
            '</div>',
        '</tpl>',
        {
            formatFormula: function (mf) {
                return mf.replace(/_{/g, '<sub>').replace(/}/g, '</sub>');
            }
        }
    ),
    listeners: {
        beforeitemclick: function (view, record, item, index, e, opts) {
            this.CSID = record.data.CSID;
        },
        itemclick: function (view, record, item, index, e, opts) {
            this.click(record.data.CSID);
        }
    },
    click: function (csid) {
    },
    loadResults: function (rid) {
        if (this.store.getCount() > 0) {
            this.store.removeAll();
            this.refresh();
        }

        this.store.load({ params: { start: 0, count: 10, rid: rid} });
    }
});
