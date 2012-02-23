//  Not supported yet!!!

Ext.ns('CS.applet');

CS.applet.SDA = Ext.extend(Ext.Panel, {
    width: 680,
    height: 450,
    constructor: function () {
        CS.applet.SDA.superclass.constructor.apply(this, arguments);
    },
    onRender: function () {
        CS.applet.SDA.superclass.onRender.apply(this, arguments);

        this.add({
            xtype: 'box',
            autoEl: {
                tag: 'applet',
                code: 'acd.StructureEditorApplet.class',
                codebase: 'sda2',
                name: this.getAppletId(),
                id: this.getAppletId(),
                width: this.width,
                height: this.height,
                hspace: 0,
                vspace: 0,
                align: 'middle',
                archive: 'archive/combo.jar',
                allowReaction: 'no',
			    addILabLink: 'no'
//			    cleanPath = 'Clean.ashx',
            }
        });
    },
    getAppletId: function () {
        return this.id + 'SDAApplet';
    },
    setMol: function (mol) {
        var jDraw = Ext.get(this.getAppletId());
        return jDraw.dom.setMolContent(mol);
    },
    getMol: function () {
        var jDraw = Ext.get(this.getAppletId());
        return jDraw.dom.getMolDescription();
    }
});
