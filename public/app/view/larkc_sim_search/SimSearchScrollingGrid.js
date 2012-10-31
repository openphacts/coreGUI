Ext.define('LSP.view.larkc_sim_search.SimSearchScrollingGrid', {
        extend:'LSP.view.dynamicgrid.DynamicGrid',
        alias:'widget.SimSearchScrollingGrid',
        layout:'fit',
		//         verticalScroller: Ext.create('LDA.helper.DynamicPagingToolbar', {
		// 					itemId: 'pager_id',
		// 					store: 'CompoundPharmacologyPaginatedStore'
		// }),
		//verticalScrollerType: Ext.create('LDA.helper.DynamicPagingToolbar',{itemId: 'pager_id'}),
        disableSelection: true,
        invalidateScrollerOnRefresh: false,
        requires:['LDA.model.SimModel'],
		listeners: {
		    'sortchange': function(ct, column, direction, eOpts ) {
				console.log('SimSearchScrollingGrid: sortchange()');
				this.setLoading(true);
		    }
		},
		refs:[
			// {
			// 	ref:'pager',
			//         		selector:'#pager_id'
			// }
		],
        store: null,
	exportStore: null,
	getExportStore: function() {
		if (this.exportStore == null) {
			this.exportStore = Ext.create('LDA.store.SimSearchStore', {});
		}
		return this.exportStore;		
	},
	initComponent: function() {
		this.store = Ext.create('Ext.data.Store', {
		model: 'LDA.model.SimModel'
	});
	this.callParent(arguments);
	},
        columns:[
				{
					xtype: 'rownumberer',
					width: 40
				},
                {
					//TODO: renderer for chemical structure image (from chemspider?)
                    header:'Structure',
                    dataIndex:'cs_uri',
					xtype: 'templatecolumn',
					tpl:'<img width="128" height="128" src="http://www.chemspider.com/ImagesHandler.ashx?id={csid}&w=128&h=128" alt="CSID:{csid}"/>',
                    width:135,
                    sortable:false
                },
                {
                    header:'Compound name',
                    dataIndex:'prefLabel',
                    width: 180,
                    tdCls: 'wrap gridDescriptiveRowPadding'
                },
                {
                    header:'Molecular Formula',
                    dataIndex:'molform',
                    align:'center',
                    tdCls: 'gridRowPadding'
                },
                {
                    header:'SMILES',
                    dataIndex:'smiles',
                    width:135,
                    align:'center',
                    tdCls: 'gridRowPadding'
                },
                {
                    header:'InChi',
                    dataIndex:'inchi',
                    width:135,
                    align:'center',
                    tdCls: 'gridRowPadding'
                },
                {
                    header:'InChi Key',
                    dataIndex:'inchi_key',
                    width:135,
                    align:'center',
                    tdCls: 'gridRowPadding'
                },
                {
                    header:'ALogP',
                    dataIndex:'alogp',
                    width: 60,
                    align:'center',
                    tdCls: 'gridRowPadding'
                },
                {
                    header:'# HBA',
                    dataIndex:'hba',
                    width: 60,
                    align:'center',
                    tdCls: 'gridRowPadding'
                },
                {
                    header:'# HBD',
                    dataIndex:'hbd',
                    width: 60,
                    align:'center',
                    tdCls: 'gridRowPadding'
                },
                {
                    header:'Mol Weight',
                    dataIndex:'full_mwt',
                    width: 70,
                    align:'center',
                    tdCls: 'gridRowPadding'
                },
                {
                    header:'# RTB',
                    dataIndex:'rtb',
                    width: 60,
                    align:'center',
                    tdCls: 'gridRowPadding'
                },
                {
                    header:'MW Freebase',
                    dataIndex:'mw_freebase',
                    align:'center',
                    tdCls: 'gridRowPadding'
                },
                {
                    header:'Melting Point',
                    dataIndex:'meltingPoint',
                    width:140,
                    tdCls: 'wrap gridDescriptiveRowPadding'
                }
            ]
	}
);
