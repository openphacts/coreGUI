Ext.define('CS.applet.JChemPaint', {
    extend: 'Ext.Component',
    width: 680,
    height: 450,
    autoEl: {
        tag: 'applet',
        code: 'org.openscience.jchempaint.applet.JChemPaintEditorApplet',
        codebase: 'lib/third/jchempaint',
        hspace: 0,
        vspace: 0,
        align: 'middle',
        archive: 'jchempaint-applet-core.jar',
        children: [
            {
                tag: 'param',
                name: 'implicitHs',
                value: 'true'
            },
            {
                tag: 'param',
                name: 'codebase_lookup',
                value: 'false'
            },
            {
                tag: 'param',
                name: 'image',
                value: 'hourglass.gif'
            },
            {
                tag: 'param',
                name: 'centerImage',
                value: 'true'
            },
            {
                tag: 'param',
                name: 'boxBorder',
                value: 'false'
            },
            {
                tag: 'param',
                name: 'language',
                value: 'en'
            }
        ]
    },
    onRender: function () {
        this.autoEl = Ext.apply({ name: this.id }, this.initialConfig, this.autoEl);
        this.callParent(arguments);
    },
    setMol: function (mol) {
        this.getEl().dom.setMolFile(mol);
    },
    getMol: function () {
        return this.getEl().dom.getMolFile();
    },
    getSmiles: function () {
        return this.getEl().dom.getSmiles();
    }
});
