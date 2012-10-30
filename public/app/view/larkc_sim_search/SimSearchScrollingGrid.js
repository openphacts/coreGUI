Ext.define('LSP.view.larkc_sim_search.SimSearchScrollingGrid', {
        extend:'LSP.view.dynamicgrid.DynamicGrid',
        alias:'widget.SimSearchScrollingGrid',
        layout:'fit',
		//         verticalScroller: Ext.create('LDA.helper.DynamicPagingToolbar', {
		// 					itemId: 'pager_id',
		// 					store: 'CompoundPharmacologyPaginatedStore'
		// }),
		verticalScrollerType: Ext.create('LDA.helper.DynamicPagingToolbar',{itemId: 'pager_id'}),
        disableSelection: true,
        invalidateScrollerOnRefresh: false,
        requires:[
        ],
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
        store:Ext.create('LDA.store.SimSearchStore', {}),
	exportStore: null,
	getExportStore: function() {
		if (this.exportStore == null) {
			this.exportStore = Ext.create('LDA.store.SimSearchStore', {});
		}
		return this.exportStore;		
	},
		// dockedItems: [{
		//         xtype: 'dynamicpagingtoolbar',
		// 		itemId: 'pager_id',
		//         dock: 'bottom',
		// 		store: 'CompoundPharmacologyPaginatedStore',
		//         displayInfo: true
		//     }],
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
                    header:'Smiles',
                    dataIndex:'smiles'
                },
                {
                    header:'hba',
                    dataIndex:'hba'
                },
                {
                    header:'hbd',
                    dataIndex:'hbd'
                },
                {
                    header:'mw freebase',
                    dataIndex:'mw_freebase'
                },
                {
                    header:'Melting Point',
                    dataIndex:'melting_point'
                },
                {
                    header:'alogp',
                    dataIndex:'alogp'
                },
                {
                    header:'rtb',
                    dataIndex:'rtb'
                },
                {
                    header:'molform',
                    dataIndex:'molform'
                },
                {
                    header:'Molweight',
                    dataIndex:'full_mwt'
                },
                {
                    header:'Inchi',
                    dataIndex:'inchi'
                },
                {
                    header:'Inchi Key',
                    dataIndex:'inchi_key'
                },
                {
                    header:'Compound name',
                    dataIndex:'prefLabel'
                }
            ]
	}
);
