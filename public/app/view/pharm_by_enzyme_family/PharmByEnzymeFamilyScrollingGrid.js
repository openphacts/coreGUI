Ext.define('LSP.view.pharm_by_enzyme_family.PharmByEnzymeFamilyScrollingGrid', {
    extend:'LSP.view.dynamicgrid.DynamicGrid',
        alias:'widget.PharmByEnzymeFamilyScrollingGrid',
        layout:'fit',
 		verticalScrollerType: Ext.create('LDA.helper.DynamicPagingToolbar',{itemId: 'pager_id'}),
        disableSelection: true,
        invalidateScrollerOnRefresh: false,
        requires:[

        ],
		listeners: {
		    'sortchange': function(ct, column, direction, eOpts ) {
				console.log('PharmByEnzymeFamilyScrollingGrid: sortchange()');
				this.setLoading(true);
		    }
		},
        store:'EnzymeFamilyPaginatedStore',
	exportStore: null,
	getExportStore: function() {
		if (this.exportStore == null) {
			this.exportStore = Ext.create('LDA.store.EnzymeFamilyPaginatedStore', {});
		}
		return this.exportStore;		
	},
        columns:{
            defaults:{
            },

            items:[
				{
					xtype: 'rownumberer',
					width: 40
				},
                {
                    header:'Structure',
                    dataIndex:'cs_compound_uri',
					xtype: 'templatecolumn',
					tpl:'<img width="128" height="128" src="http://www.chemspider.com/ImagesHandler.ashx?id={csid}&w=128&h=128" alt="CSID:{csid}"/>',
                    width:135,
                    sortable:false
                },
                {
                    header:'Compound Name',
                    dataIndex:'compound_pref_label',
                    width: 180,
                    align:'center'
                },
                {
                    header:'Target Name',
                    dataIndex:'target_title',
                    width: 180,
                    align:'center'
                },
                {
                    header:'Target Organism',
                    dataIndex:'target_organism',
                    align:'center'
                },
                {
                    header:'Assay Organism',
                    dataIndex:'assay_organism',
                    align:'center'
                },
                {
                    header:'SMILES',
                    dataIndex:'compound_smiles',
                    align:'center'
                },
                {
                    header:'InChi',
                    dataIndex:'compound_inchi',
                    align:'center'
                },
                {
                    header:'InChi Key',
                    dataIndex:'compound_inchikey',
                    align:'center'
                },
                {
                    header:'Assay Type',
                    dataIndex:'activity_activity_type',
                    width: 70,
                    align:'center'
                },
                {
                    header:'Relation',
                    dataIndex:'activity_relation',
                    width: 52,
                    align:'center'
                },
                {
                    header:'Value',
                    dataIndex:'activity_standard_value',
                    width: 60,
                    align:'center'
                },
                {
                    header:'Units',
                    dataIndex:'activity_standard_units',
                    width: 60,
                    align:'center'
                },
                {
                    header:'Molweight',
                    dataIndex:'compound_full_mwt',
                    align:'center',
                    width: 80
                }
            ],
            toggleProv:function (val) {
                prov = val;
                console.log(" Show provenance : " + prov );
                this.doLayout();
            }
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
        //console.log(iconCls);
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


//{
//    header:'Chemspider ID',
//    dataIndex:'cs_compound_uri',
//	sortable:false
//},