Ext.define('LSP.view.pharm_by_cmpd_name2.PharmByCmpdNameGrid', {
        extend:'LSP.view.dynamicgrid.DynamicGrid',
        alias:'widget.PharmByCmpdNameGrid',
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
		refs:[
			// {
			// 	ref:'pager',
			//         		selector:'#pager_id'
			// }
		],
        store:'CompoundPharmacologyPaginatedStore',
		// dockedItems: [{
		//         xtype: 'dynamicpagingtoolbar',
		// 		itemId: 'pager_id',
		//         dock: 'bottom',
		// 		store: 'CompoundPharmacologyPaginatedStore',
		//         displayInfo: true
		//     }],
        columns:{
            defaults:{
            },

            items:[
				{
					xtype: 'rownumberer',
					width: 40
				},
                {
					//TODO: renderer for chemical structure image (from chemspider?)
                    header:'Structure',
                    dataIndex:'cs_compound_uri'
                },
                {
                    header:'Smiles',
                    dataIndex:'compound_smiles'
                },
                {
                    header:'Std Value',
                    dataIndex:'activity_standard_value'
                },
                {
                    header:'Chemspider ID',
                    dataIndex:'cs_compound_uri'
                },
                {
                    header:'Inchi key',
                    dataIndex:'compound_inchikey'
                },
                {
                    header:'Std Type',
                    dataIndex:'activity_activity_type'
                },
                {
                    header:'Target Organism',
                    dataIndex:'target_organism'
                },
                {
                    header:'Std Unit',
                    dataIndex:'activity_standard_units'
                },
                {
                    header:'Target Name',
                    dataIndex:'target_title'
                },
                {
                    header:'Relation',
                    dataIndex:'activity_relation'
                },
                {
                    header:'Molweight',
                    dataIndex:'compound_full_mwt'
                },
                {
                    header:'Inchi',
                    dataIndex:'compound_inchi'
                },
                {
                    header:'Compound name',
                    dataIndex:'compound_pref_label'
                }
            ]
        }
	}
);
