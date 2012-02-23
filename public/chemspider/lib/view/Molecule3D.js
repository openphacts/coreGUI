Ext.define('CS.view.Molecule3D', {
    extend: 'Ext.Component',
    alias: 'widget.cs.molecule3D',
    width: 200,
    height: 200,
    mol: '',
    autoEl: {
        tag: 'applet',
        code: 'JmolApplet',
        codebase: 'lib/third/jmol',
        archive: 'JmolApplet0.jar',
        mayscript: 'true',
        hspace: 0,
        vspace: 0,
        align: 'middle',
        children: [
            {
                tag: 'param',
                name: 'progressbar',
                value: 'true'
            },
            {
                tag: 'param',
                name: 'bgcolor',
                value: 'white'
            }
        ]
    },
    onRender: function () {
        this.autoEl = Ext.apply({ name: this.id }, this.initialConfig, this.autoEl);
        this.callParent(arguments);

        if (this.mol != '') {
            Ext.defer(function (mol) { this.setMol(mol); }, 200, this, [this.mol]);
        }
    },
    setMol: function (mol) {
        this.getEl().dom.loadInlineString(mol, "", false);
    }
});
