Ext.define('CS.applet.Ketcher', {
    extend: 'Ext.Component',
    alias: 'widget.ketcher',
    layout: 'fit',
    height: 520,
    width: 680,
    autoEl: {
        tag: 'iframe',
        src: 'lib/third/ketcher/ketcher.html'
    },
    getSmiles: function () {
        var ketcher_window = document.getElementById(this.id);
        smiles = ketcher_window.contentWindow.ketcher.getSmiles();
        return smiles;
    }
});
