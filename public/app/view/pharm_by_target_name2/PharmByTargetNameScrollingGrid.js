/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 12/07/2012
 * Time: 14:10
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LSP.view.pharm_by_target_name2.PharmByTargetNameScrollingGrid', {
        extend:'LSP.view.dynamicgrid.DynamicGrid',
        alias:'widget.PharmByTargetNameScrollingGrid',
        layout:'fit',
        verticalScrollerType:Ext.create('LDA.helper.DynamicPagingToolbar', {itemId:'pager_id'}),
        disableSelection:true,
        invalidateScrollerOnRefresh:false,
        requires:[
        ],
        listeners:{
            'sortchange':function (ct, column, direction, eOpts) {
                console.log('PharmByTargetNameGrid: sortchange()');
                this.setLoading(true);
            }
        },
        store:'TargetPharmacologyPaginatedStore',
        exportStore:null,
        getExportStore:function () {
            if (this.exportStore == null) {
                this.exportStore = Ext.create('LDA.store.TargetPharmacologyPaginatedStore', {});
            }
            return this.exportStore;
        },
        columns://TODO: removed this rendering because it stops the download as csv from working (this.geCell(record,index) fails with undefined error)
        // defaults:{
        //                 renderer:function (value, metaData, record, rowIndex, colIndex, store, view) {
        //                     if (LDAProvenanceMode != LDA_PROVENANCE_OFF) {
        //                         var data = this.columns[colIndex].dataIndex;
        //                         data += '_src';
        //                         var source = record.data[data];
        //                         var cls = LDA_SRC_CLS_MAPPINGS[source];
        //                         if (!cls) {
        //                             cls = 'defaultValue';
        //                         }
        //                         //                    console.log(data + ' : ' + source + ' : ' + cls);
        //                         cls += LDAProvenanceMode;
        //                         if (LDAProvenanceMode == LDA_PROVENANCE_COLOUR) {
        //                             return '<div class="' + cls + '">' + value + '</div>';
        //                         } else if (LDAProvenanceMode == LDA_PROVENANCE_ICON) {
        //                             //this needs an img adding in
        //                             return '<div class="' + cls + '">' + value + '</div>';
        //                         } else if (LDAProvenanceMode == LDA_PROVENANCE_TEXT) {
        //                             return '<div class="' + cls + '">' + value + ' (' + source + ')</div>';
        //                         }
        //                     } else {
        //                         return value;
        //                     }
        //                 }
        //             },

            [
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
                    header:'Compound name',
                    dataIndex:'compound_pref_label',
                    width: 180,
                    renderer:provenanceRenderer,
                    align:'center'
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
                    dataIndex:'activity_relation',
                    width: 52,
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
                    header:'Target Name',
                    dataIndex:'target_pref_label',
                    width: 180,
                    renderer:provenanceRenderer,
                    align:'center'
                },
                {
                    header:'Target Organism',
                    dataIndex:'target_organism',
                    width: 130,
                    renderer:provenanceRenderer,
                    align:'center'
                },
                {
                    header:'Assay Organism',
                    dataIndex:'assay_organism',
                    tooltip: 'Name of the organism for the assay system (e.g., the organism, tissue or cell line in ' +
                        'which an assay was performed). May differ from the target organism (e.g., for a human protein' +
                        ' expressed in non-human cells, or pathogen-infected human cells)',
                    renderer:provenanceRenderer,
                    align:'center'

                },
                {
                    header:'Assay Description',
                    dataIndex:'assay_description',
                    width: 150,
                    tdCls: 'wrap',
                    renderer:provenanceRenderer
                    //align:'center'
                },
                {
                    header:'Compound Concept',
                    dataIndex:'cw_compound_uri',
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
//	sortable:false,
//    renderer:provenanceRenderer,
//    align: 'center'
//},