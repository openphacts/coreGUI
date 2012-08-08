/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 12/07/2012
 * Time: 14:10
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LSP.view.pharm_by_target_name2.PharmByTargetNameGrid', {
        extend:'LSP.view.dynamicgrid.DynamicGrid3',
        alias:'widget.PharmByTargetNameGrid',
        layout:'fit',
        verticalScroller:{
            xtype:'paginggridscroller'
        },
        requires:[
        ],
        store:'TargetPharmacologyPaginatedStore',
        columns:{
			//TODO: removed this rendering because it stops the download as csv from working (this.geCell(record,index) fails with undefined error)
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

            items:[
				{xtype: 'rownumberer'},
                {
                    header:'Compound Label',
                    dataIndex:'compound_pref_label'
                },
                {
                    header:'ChemSpider Compound URI',
                    dataIndex:'cs_compound_uri'
                },
                {
                    header:'Activity Type',
                    dataIndex:'activity_activity_type'
                },
                {
                    header:'Activity Relation',
                    dataIndex:'activity_relation'
                },
                {
                    header:'Activity Value',
                    dataIndex:'activity_standard_value'
                },
                {
                    header:'Activity Units',
                    dataIndex:'activity_standard_units'
                },
                {
                    header:'Target Label',
                    dataIndex:'target_pref_label'
                },
                {
                    header:'Target Organism',
                    dataIndex:'target_organism'
                }
            ]
        }
    }
);