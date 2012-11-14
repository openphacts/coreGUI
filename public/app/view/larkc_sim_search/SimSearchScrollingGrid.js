Ext.define('LSP.view.larkc_sim_search.SimSearchScrollingGrid', {
    extend: 'LSP.view.dynamicgrid.DynamicGrid',
    alias: 'widget.SimSearchScrollingGrid',
    layout: 'fit',
    //         verticalScroller: Ext.create('LDA.helper.DynamicPagingToolbar', {
    // 					itemId: 'pager_id',
    // 					store: 'CompoundPharmacologyPaginatedStore'
    // }),
    //verticalScrollerType: Ext.create('LDA.helper.DynamicPagingToolbar',{itemId: 'pager_id'}),
    disableSelection: true,
    invalidateScrollerOnRefresh: false,
    requires: ['LDA.model.SimModel'],
    //listeners: {
    //    'sortchange': function(ct, column, direction, eOpts ) {
    //		console.log('SimSearchScrollingGrid: sortchange()');
    //		//this.setLoading(true);
    //    }
    //},
    refs: [
    // {
    // 	ref:'pager',
    //         		selector:'#pager_id'
    // }
    ],
    store: Ext.create('LDA.store.SimSearchLocalStore', {}),
    exportStore: null,
    getExportStore: function() {
        if (this.exportStore == null) {
            this.exportStore = Ext.create('LDA.store.SimSearchStore', {});
        }
        return this.exportStore;
    },
    //initComponent: function() {
    //    this.store = Ext.create('Ext.data.Store', {
    //        model: 'LDA.model.SimModel'
    //    });
    //    this.callParent(arguments);
    //},
    columns: [{
        xtype: 'rownumberer',
        width: 40
    }, {
        //TODO: renderer for chemical structure image (from chemspider?)
        header: 'Structure',
        dataIndex: 'cs_uri',
        xtype: 'templatecolumn',
        tpl: '<img width="128" height="128" src="http://www.chemspider.com/ImagesHandler.ashx?id={csid}&w=128&h=128" alt="CSID:{csid}"/>',
        width: 135,
        sortable: false
    }, {
        header: 'Compound Name',
        dataIndex: 'compound_pref_label',
        renderer:structureProvenanceRenderer,
        width: 180,
        tdCls: 'wrap gridDescriptiveRowPadding'
    }, {
        header: 'Molecular Formula',
        dataIndex: 'molform',
        renderer:structureProvenanceRenderer,
        align: 'center',
        tdCls: 'gridRowPadding'
    }, {
        header: 'ALogP',
        dataIndex: 'alogp',
        renderer:structureProvenanceRenderer,
        width: 60,
        align: 'center',
        tdCls: 'gridRowPadding'
    }, {
        header: '# HBA',
        dataIndex: 'hba',
        renderer:structureProvenanceRenderer,
        tooltip: 'Number of Hydrogen Bond Acceptors',
        width: 60,
        align: 'center',
        tdCls: 'gridRowPadding'
    }, {
        header: '# HBD',
        dataIndex: 'hbd',
        renderer:structureProvenanceRenderer,
        tooltip: 'Number of Hydrogen Bond Donors',
        width: 60,
        align: 'center',
        tdCls: 'gridRowPadding'
    }, {
        header: 'Mol Weight',
        dataIndex: 'full_mwt',
        renderer:structureProvenanceRenderer,
        tooltip: 'Molecular Weight',
        width: 70,
        align: 'center',
        tdCls: 'gridRowPadding'
    }, {
        header: 'MW Freebase',
        dataIndex: 'mw_freebase',
        renderer:structureProvenanceRenderer,
        tooltip: 'Molecular Weight (Free Base)',
        align: 'center',
        tdCls: 'gridRowPadding'
    }, {
        header: '# RTB',
        dataIndex: 'rtb',
        renderer:structureProvenanceRenderer,
        tooltip: 'Number of Rotatable Bonds',
        width: 60,
        align: 'center',
        tdCls: 'gridRowPadding'
    }, {
        header: 'Melting Point',
        dataIndex: 'meltingPoint',
        renderer:structureProvenanceRenderer,
        width: 140,
        tdCls: 'wrap gridDescriptiveRowPadding'
    }, {
        header: 'SMILES',
        dataIndex: 'compound_smiles',
        renderer:structureProvenanceRenderer,
        width: 135,
        align: 'center',
        tdCls: 'gridRowPadding'
    }, {
        header: 'InChi',
        dataIndex: 'inchi',
        renderer:structureProvenanceRenderer,
        width: 135,
        align: 'center',
        tdCls: 'gridRowPadding'
    }, {
        header: 'InChi Key',
        dataIndex: 'inchi_key',
        renderer:structureProvenanceRenderer,
        width: 135,
        align: 'center',
        tdCls: 'gridRowPadding'
    }]
    ,

    simSearchProv: false,

    toggleProv:function (val) {
        this.simSearchProv = val;
        console.log(" Show provenance : " + this.simSearchProv);
        this.doLayout();
    },
	showMenu: function(x, y, record) {
		var cmp = record.data.compound_pref_label;
		var tar = record.data.target_title;
		var smi = record.data.compound_smiles;

		if (tar) {
			var cmpValueMenu = new Ext.menu.Menu({
				items: [{
					xtype: 'textfield',
					value: cmp
				}, {
					xtype: 'textfield',
					value: tar
				}, {
					xtype: 'textfield',
					value: smi
				}]
			});

			var contextMenu = new Ext.menu.Menu({
				items: [{
					text: 'Search for a compound by name',
					itemId: 'searchForCompoundByName',
					iconCls: 'menu-search-compound',
					handler: function() {
						//                        console.log('Search for compound by name');
						//                        console.log(cmp);
						Ext.History.add('!p=CmpdByNameForm&s=' + cmp);
					}
				}, {
					text: 'Search for a compound by SMILES',
					itemId: 'searchForCompoundBySMILES',
					iconCls: 'menu-search-compound',
					handler: function() {
						//                        console.log('Search for compound by SMILES');
						//                        console.log(cmp);
						Ext.History.add('!p=SimSearchForm&sm=' + smi + '&st=exact');
					}
				}, {
					text: 'Search for a target by name',
					itemId: 'searchForTarget',
					iconCls: 'menu-search-target',
					handler: function() {
						//                        console.log('Search for target by name');
						//                        console.log(tar);
						Ext.History.add('!p=TargetByNameForm&s=' + tar);
					}
				}, {
					text: 'Copy Data',
					menu: cmpValueMenu
				}]
			});
			contextMenu.showAt(x, y);
		} else {
			var cmpValueMenu = new Ext.menu.Menu({
				items: [{
					xtype: 'textfield',
					value: cmp
				}, {
					xtype: 'textfield',
					value: smi
				}]
			});

			var contextMenu = new Ext.menu.Menu({
				items: [{
					text: 'Search for a compound by name',
					itemId: 'searchForCompoundByName',
					iconCls: 'menu-search-compound',
					handler: function() {
						//                        console.log('Search for compound by name');
						//                        console.log(cmp);
						Ext.History.add('!p=CmpdByNameForm&s=' + cmp);
					}
				}, {
					text: 'Search for a compound by SMILES',
					itemId: 'searchForCompoundBySMILES',
					iconCls: 'menu-search-compound',
					handler: function() {
						//                        console.log('Search for compound by SMILES');
						//                        console.log(cmp);
						Ext.History.add('!p=SimSearchForm&sm=' + smi + '&st=exact');
					}
				}, {
					text: 'Search for Pharmacology by Compound',
					itemId: 'searchForPharmacologyByCompound',
					iconCls: 'menu-search-pharma-by-compound',
					handler: function() {
						//                        console.log('Search for compound by name');
						//                        console.log(cmp);
						Ext.History.add('!p=PharmByCmpdNameForm&s=' + cmp);
					}
				},{
					text: 'Copy Data',
					menu: cmpValueMenu
				}]
			});
			contextMenu.showAt(x, y);
		}

	},
});

function structureProvenanceRenderer(data, cell, record, rowIndex, columnIndex, store) {
	//console.log("Structure provenance renderer");

    //if (LDAProvenanceMode != LDA.helper.LDAConstants.LDA_PROVENANCE_OFF) {
    if (this.simSearchProv) {

        var recdata = this.columns[columnIndex].dataIndex;
        var itemdata = recdata + '_item';
        recdata += '_src';
        var source = record.data[recdata];
        var cls = LDA.helper.LDAConstants.LDA_SRC_CLS_MAPPINGS[source];
        if (!cls) {
            cls = 'defaultValue';
        }
        var iconCls = cls + 'Icon';
        iconCls = '/assets/' + iconCls + '.png';
        //console.log(iconCls);
        cls += LDAProvenanceMode;
        if (LDAProvenanceMode == LDA.helper.LDAConstants.LDA_PROVENANCE_COLOUR) {

            if (record.data[recdata] && data) {

                // return '<div class="' + cls + '">' + data + '</div>' + '<br>' + record.data[recdata];
                return '<div class="' + cls + '">' + data + '</div>' + '<br>' + '<a href="' + record.data[itemdata] + '" target="_blank">' + '<img src="' + iconCls + '" height="15" width="15"/>' + '</a>';

            } else {

                return '<div class="' + cls + '">' + data + '</div>'

            }

        }
        //else if (LDAProvenanceMode == LDA.helper.LDAConstants.LDA_PROVENANCE_ICON) {
        //this needs an img adding in
        //    return '<div class="' + cls + '">' + data + '</div>';
        //} else if (LDAProvenanceMode == LDA.helper.LDAConstants.LDA_PROVENANCE_TEXT) {
        //    return '<div class="' + cls + '">' + data + ' (' + source + ')</div>';
        //}
    } else {
        return data;
    }
    return data;
}
;
