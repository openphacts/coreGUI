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
		verticalScrollerType: Ext.create('LDA.helper.DynamicPagingToolbar',{itemId: 'pager_id'}),
        disableSelection: true,
        invalidateScrollerOnRefresh: false,
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
			{
				xtype: 'rownumberer',
				width: 40
			},
            {
				//TODO: renderer for chemical structure image (from chemspider?)
                header:'Structure',
                dataIndex:'cs_compound_uri',
				sortable:false
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
                dataIndex:'cs_compound_uri',
				sortable:false
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
                header:'Std Unit',
                dataIndex:'activity_standard_units'
            },
            {
                header:'Target Name',
                dataIndex:'target_pref_label'
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
            },
			{
				header: 'Compound cw',
				dataIndex: 'cw_compound_uri'
			}
            ]
        }
    }
);