Ext.define('CS.view.Molecule2D', {
    extend: 'Ext.Component',
    alias: 'widget.cs.molecule2D',
    autoEl: {
        tag: 'img',
        src: Ext.BLANK_IMAGE_URL
    },
    width: 200,
    height: 200,
    csid: 0,
    onRender: function () {
        this.autoEl = Ext.apply({}, this.initialConfig, this.autoEl);
        this.callParent(arguments);
    },
    setSrc: function (src) {
        if (this.rendered)
            this.el.dom.src = src;
        else
            this.src = src;
    },
    getSrc: function (src) {
        return this.el.dom.src || this.src;
    },
    load: function (csid) {
        this.setSrc(CS.config.Settings.baseUrl + '/ImagesHandler.ashx?id=' + csid + '&w=' + this.width + '&h=' + this.height);
    }
});
