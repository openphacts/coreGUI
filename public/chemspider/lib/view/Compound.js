Ext.define('CS.view.Compound', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.cs.compound',
    requires: [
        'CS.view.BaseProperties',
        'CS.view.Molecule2D',
        'CS.view.Molecule3D'
    ],
    autoScroll: true,
    border: 0,
    layout: 'hbox',
    bodyStyle: 'background-color: #fff;',
    constructor: function () {
        this.callParent(arguments);

        this.molTabs = Ext.create('Ext.tab.Panel', {
            activeTab: 0,
            width: 210,
            height: 235,
            tabPosition: 'bottom',
            items: [
                    {
                        id: 'tab-mol-2D',
                        title: '2D',
                        items: {
                            xtype: 'cs.molecule2D',
                            id: this.getMol2DId()
                        }
                    },
                    {
                        id: 'tab-mol-3D',
                        title: '3D',
                        items: {
                            xtype: 'cs.molecule3D',
                            id: this.getMol3DId()
                        }
                    }
                ]
        });

        this.molTabs.on('tabchange', function (tab, panel) {
            //  If Jmol tab active...
            if (this.is3DTabActive()) {
                Ext.Function.defer(function (id) {
                    var mol3D = Ext.getCmp(id);
                    mol3D.setMol(this.mol);
                }, 200, this, [this.getMol3DId()]);
            }
        }, this);

        this.add(this.molTabs);

        this.add(
            {
                flex: 1,
                items: {
                    xtype: 'cs.baseproperties',
                    id: this.getBasePropsId(),
                    height: 233
                }
            }
        );
    },
    is3DTabActive: function () {
        return this.molTabs.getActiveTab().id == 'tab-mol-3D';
    },
    getMol2DId: function () {
        return this.id + '_Mol2D';
    },
    getMol3DId: function () {
        return this.id + '_Mol3D';
    },
    getBasePropsId: function () {
        return this.id + '_BaseProps';
    },
    loadData: function (compound) {
        Ext.getCmp(this.getMol2DId()).load(compound.data.CSID);
        if (this.is3DTabActive()) Ext.getCmp(this.getMol3DId()).setMol(compound.data.Mol);
        Ext.getCmp(this.getBasePropsId()).loadData(compound.data);

        this.mol = compound.data.Mol;
    }
});
