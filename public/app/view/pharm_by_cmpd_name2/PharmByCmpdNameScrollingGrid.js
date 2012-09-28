Ext.define('LSP.view.pharm_by_cmpd_name2.PharmByCmpdNameScrollingGrid', {
        extend:'LSP.view.dynamicgrid.DynamicGrid',
        alias:'widget.PharmByCmpdNameScrollingGrid',
        layout:'fit',
		//         verticalScroller: Ext.create('LDA.helper.DynamicPagingToolbar', {
		// 					itemId: 'pager_id',
		// 					store: 'CompoundPharmacologyPaginatedStore'
		// }),
		verticalScrollerType: Ext.create('LDA.helper.DynamicPagingToolbar',{itemId: 'pager_id'}),
        disableSelection: true,
        invalidateScrollerOnRefresh: false,
        requires:[],
		listeners: {
		    'sortchange': function(ct, column, direction, eOpts ) {
				console.log('PharmByCmpdNameScrollingGrid: sortchange()');
				this.setLoading(true);
		    }
		},
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

        columns:[
				{
					xtype: 'rownumberer',
					width: 40
				},
                {
					//TODO: renderer for chemical structure image (from chemspider?)
                    header:'Structure',
                    dataIndex:'cs_compound_uri',
					xtype: 'templatecolumn',
                    width: 135,
					tpl:'<img width="128" height="128" src="http://www.chemspider.com/ImagesHandler.ashx?id={csid}&w=128&h=128" alt="CSID:{csid}"/>',
					sortable:false
                },
                {
                    header:'Smiles',
                    dataIndex:'compound_smiles',
                    align: 'center'

                },
                {
                    header:'Std Value',
                    dataIndex:'activity_standard_value',
                    renderer: provenanceRenderer,
                    align: 'center'

                },
                {
                    header:'Chemspider ID',
                    dataIndex:'cs_compound_uri',
                    sortable:false,
                    renderer: provenanceRenderer,
                    align: 'center'

                },
                {
                    header:'Inchi key',
                    dataIndex:'compound_inchikey',
                    renderer: provenanceRenderer,
                    align: 'center'

                },
                {
                    header:'Std Type',
                    dataIndex:'activity_activity_type',
                    renderer: provenanceRenderer,
                    align: 'center'
                },
                {
                    header:'Target Organism',
                    dataIndex:'target_organism',
                    renderer: provenanceRenderer,
                    align: 'center'

                },
                {
                    header:'Std Unit',
                    dataIndex:'activity_standard_units',
                    renderer: provenanceRenderer,
                    align: 'center'

                },
                {
                    header:'Target Name',
                    dataIndex:'target_title',
                    renderer: provenanceRenderer,
                    align: 'center'

                },
                {
                    header:'Relation',
                    dataIndex:'activity_relation',
                    renderer: provenanceRenderer,
                    align: 'center'

                },
                {
                    header:'Molweight',
                    dataIndex:'compound_full_mwt',
                    renderer: provenanceRenderer,
                    align: 'center'

                },
                {
                    header:'Inchi',
                    dataIndex:'compound_inchi',
                    renderer: provenanceRenderer,
                    align: 'center'

                },
                {
                    header:'Compound name',
                    dataIndex:'compound_pref_label',
                    renderer: provenanceRenderer,
                    align: 'center'

                }

            ],
        toggleProv:function (val) {
            prov = val;
            console.log(" Show provenance : " + prov );
            this.doLayout();
        }
	}
);

var prov = false;

function provenanceRenderer (data, cell, record, rowIndex, columnIndex, store) {


    //if (LDAProvenanceMode != LDA.helper.LDAConstants.LDA_PROVENANCE_OFF) {
    if (prov) {

        var recdata = this.columns[columnIndex].dataIndex;
        recdata += '_src';
        var source = record.data[recdata];
        var cls = LDA.helper.LDAConstants.LDA_SRC_CLS_MAPPINGS[source];
        if (!cls) {
            cls = 'defaultValue';
        }
        var iconCls = cls + 'Icon';
        console.log(iconCls);
        cls += LDAProvenanceMode;
        if (LDAProvenanceMode == LDA.helper.LDAConstants.LDA_PROVENANCE_COLOUR) {

            if (record.data[recdata] && data){

                // return '<div class="' + cls + '">' + data + '</div>' + '<br>' + record.data[recdata];
                return '<div class="' + cls + '">' + data + '</div>' + '<br>' + '<a href="' + record.data[recdata] +'">' +'<img class="' + iconCls + '" height="15" width="15"/>' + '</a>'                    ;

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
};


