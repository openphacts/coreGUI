//  Not supported yet!!!

Ext.ns('CS.applet');

CS.applet.JDraw = Ext.extend(Ext.Panel, {
    width: 680,
    height: 450,
    constructor: function () {
        CS.applet.JDraw.superclass.constructor.apply(this, arguments);
    },
    onRender: function () {
        this.add({
            xtype: 'box',
            autoEl: {
                tag: 'applet',
                code: 'com.symyx.draw.JDrawEditor',
                codebase: 'jdraw',
                name: this.getAppletId(),
                id: this.getAppletId(),
                width: this.width,
                height: this.height,
                hspace: 0,
                vspace: 0,
                align: 'middle',
                archive: 'CsInline.jar,jdrawcore.jar,jdrawapplet.jar',
                children: [
                    {
                        tag: 'param',
                        name: 'java_arguments',
                        value: '-Xmx256m -Dsun.java2d.noddraw=true'
                    }
                ]
            }
        });

        CS.applet.JDraw.superclass.onRender.apply(this, arguments);
    },
    getAppletId: function () {
        return this.id + 'JDrawApplet';
    },
    load: function (csid) {
        this.store.load({
            params: { 'csids[0]': csid },
            scope: this,
            callback: function (records, options, success) {
                this.setMol(records[0].json.Mol);
            }
        });
    },
    setMol: function (mol) {
        var jDraw = Ext.get(this.getAppletId());
        return jDraw.dom.setMolString(mol);
    },
    getMol: function () {
        var jDraw = Ext.get(this.getAppletId());
        return jDraw.dom.getMolString();
    }
});
