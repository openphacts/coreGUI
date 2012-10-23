Ext.define('LSP.view.pharm_by_cmpd_name2.PharmByCmpdNameScrollingGrid', {
        extend:'LSP.view.dynamicgrid.DynamicGrid',
        alias:'widget.PharmByCmpdNameScrollingGrid',
        layout:'fit',
        //         verticalScroller: Ext.create('LDA.helper.DynamicPagingToolbar', {
        // 					itemId: 'pager_id',
        // 					store: 'CompoundPharmacologyPaginatedStore'
        // }),
        // verticalScrollerType:Ext.create('LDA.helper.DynamicPagingToolbar', {itemId:'pager_id'}),
        disableSelection:true,
        invalidateScrollerOnRefresh:false,
        requires:[],
        listeners:{
            'sortchange':function (ct, column, direction, eOpts) {
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
        exportStore:null,
        getExportStore:function () {
            if (this.exportStore == null) {
                this.exportStore = Ext.create('LDA.store.CompoundPharmacologyPaginatedStore', {});
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
                xtype:'rownumberer',
                width:40
            },
            {
                //TODO: renderer for chemical structure image (from chemspider?)
                header:'Structure',
                dataIndex:'cs_compound_uri',
                xtype:'templatecolumn',
                width:135,
                tpl:'<img width="128" height="128" src="http://www.chemspider.com/ImagesHandler.ashx?id={csid}&w=128&h=128" alt="CSID:{csid}"/>',
                sortable:false
            },
            {
                header:'Target Name',
                width: 180,
                dataIndex:'target_title',
                renderer:provenanceRenderer,
                align:'center'
            },
            {
                header:'Target Organism',
                dataIndex:'target_organism',
                renderer:provenanceRenderer,
                align:'center'

            },
            {
                header:'Assay Description',
                dataIndex:'assay_description',
                width: 200,
                tdCls: 'wrap',
                renderer:provenanceRenderer
                //align:'center'
            },
            {
                header:'Assay Type',
                dataIndex:'activity_activity_type',
                width: 70,
                renderer:provenanceRenderer,
                align:'center'
            },
            {
                header:'Relation',
                width: 52,
                dataIndex:'activity_relation',
                renderer:provenanceRenderer,
                align:'center'

            },
            {
                header:'Value',
                dataIndex:'activity_standard_value',
                width: 60,
                renderer:provenanceRenderer,
                align:'center'

            },
            {
                header:'Units',
                dataIndex:'activity_standard_units',
                width: 60,
                renderer:provenanceRenderer,
                align:'center'

            },
            {
                header:'Molweight',
                dataIndex:'compound_full_mwt',
                width: 80,
                renderer:provenanceRenderer,
                align:'center'

            },
            {
                header:'SMILES',
                dataIndex:'compound_smiles',
                renderer:provenanceRenderer,
                align:'center'

            },
            {
                header:'InChi',
                dataIndex:'compound_inchi',
                renderer:provenanceRenderer,
                align:'center'

            },

            {
                header:'InChi Key',
                dataIndex:'compound_inchikey',
                renderer:provenanceRenderer,
                align:'center'

            },

            {
                header:'Compound Name',
                dataIndex:'compound_pref_label',
                renderer:provenanceRenderer,
                align:'center'

            }

        ],
        toggleProv:function (val) {
            prov = val;
            console.log(" Show provenance : " + prov);
            this.doLayout();
        }
    }
);

var prov = false;

function provenanceRenderer(data, cell, record, rowIndex, columnIndex, store) {


    //if (LDAProvenanceMode != LDA.helper.LDAConstants.LDA_PROVENANCE_OFF) {
    if (prov) {

        var recdata = this.columns[columnIndex].dataIndex;
        var itemdata = recdata + '_item';
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

            if (record.data[recdata] && data) {

                // return '<div class="' + cls + '">' + data + '</div>' + '<br>' + record.data[recdata];
                return '<div class="' + cls + '">' + data + '</div>' + '<br>' + '<a href="' + record.data[itemdata] + '">' + '<img class="' + iconCls + '" height="15" width="15"/>' + '</a>';

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


//{
//    header:'Chemspider ID',
//    dataIndex:'cs_compound_uri',
//    sortable:false,
//    renderer: provenanceRenderer,
//    align: 'center'
//},
