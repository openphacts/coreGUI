Ext.define('CS.view.Spectra', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.cs.spectra',
    requires: ['CS.applet.JSpecView'],
    height: 350,
    cls: 'text-class',
    frame: false,
    border: '0 0 0 0',
    autoScroll: false,
    collapsible: false,
    closable: false,
    bodyStyle: 'background-color: #fff; padding-left: .5em;',
    listeners: {
        resize: function (cmp, width, height, opts) {
            if (this.data != null) {
                for (var i = 0; i < this.data.Blobs.length; i++) {
                    var blob = this.data.Blobs[i];
                    if (blob.BlobType == 0) {
                        //  Spectrum
                        Ext.getCmp('jSpecViewApplet' + blob.ID).resize(width, height);
                    }
                }
            }
        }
    },
    onResize: function () {
        this.callParent(arguments);
    },
    loadData: function (compound) {
        var box = this.getBox();

        this.removeAll();

        var spectra = compound.getSpectra();

        for (var i = 0; i < spectra.length; i++) {
            var spec = spectra[i];
            this.add({
                title: spec.SubType,
                iconCls: 'tabs',
                padding: 0,
                items: {
                    xtype: 'jspecview',
                    border: 0,
                    width: box.width - 20,
                    height: box.height - 40,
                    id: 'jSpecViewApplet' + spec.ID,
                    specId: spec.ID
                }
            });
        }
    }
});
