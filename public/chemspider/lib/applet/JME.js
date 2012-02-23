Ext.define('CS.applet.JME', {
    extend: 'Ext.Component',
    width: 680,
    height: 450,
    autoEl: {
        tag: 'applet',
        code: 'JME.class',
        codebase: 'lib/third/jme',
        hspace: 0,
        vspace: 0,
        align: 'middle',
        archive: 'JME.jar'
    },
    onRender: function () {
        this.autoEl = Ext.apply({ name: this.id }, this.initialConfig, this.autoEl);
        this.callParent(arguments);
    },
    setMol: function (mol) {
        this.getEl().dom.readMolFile(mol);
    },
    getMol: function () {
        return this.getEl().dom.molFile();
    },
    getSmiles: function () {
        return this.getEl().dom.smiles();
    }
});
