/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 04/07/2012
 * Time: 16:44
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LDA.view.grids.TargetPharmacologyGrid', {
    extend:'Ext.grid.Panel',
    alias:'widget.TargetPharmacologyGrid',
    store:Ext.create('LDA.store.TargetPharmacologyStore'),
    loadMask:true,
    columns:{
        defaults:{
            renderer:function (value, metaData, record, rowIndex, colIndex, store, view) {
                if (LDAProvenanceMode != LDA_PROVENANCE_OFF) {
                    var data = this.columns[colIndex].dataIndex;
                    data += '_src';
                    var source = record.data[data];
                    var cls = LDA_SRC_CLS_MAPPINGS[source];
                    if (!cls) {
                        cls = 'defaultValue';
                    }
//                    console.log(data + ' : ' + source + ' : ' + cls);
                    cls += LDAProvenanceMode;
                    if (LDAProvenanceMode == LDA_PROVENANCE_COLOUR) {
                        return '<div class="' + cls + '">' + value + '</div>';
                    } else if (LDAProvenanceMode == LDA_PROVENANCE_ICON) {
                        //this needs an img adding in
                        return '<div class="' + cls + '">' + value + '</div>';
                    } else if (LDAProvenanceMode == LDA_PROVENANCE_TEXT) {
                        return '<div class="' + cls + '">' + value + ' (' + source + ')</div>';
                    }
                } else {
                    return value;
                }
            }
        },

        items:[
            //            'cw_target_uri',
            //            'chembl_target_uri',
            //            'drugbank_target_uri',
            {
                header:'ConceptWiki Target URI',
                dataIndex:'cw_target_uri'
            },
            {
                header:'ChEMBL Target URI',
                dataIndex:'chembl_target_uri'
            },
            {
                header:'DrugBank Target URI',
                dataIndex:'drugbank_target_uri'
            },
            //            'cs_compound_uri',
            //            'cw_compound_uri',
            //            'chembl_compound_uri',
            //            'drugbank_compound_uri',
            {
                header:'ConceptWiki Compound URI',
                dataIndex:'cw_compound_uri'
            },
            {
                header:'Chemspider Compound URI',
                dataIndex:'cs_compound_uri'
            },
            {
                header:'ChEMBL Compound URI',
                dataIndex:'chembl_compound_uri'
            },
            {
                header:'DrugBank Compound URI',
                dataIndex:'drugbank_compound_uri'
            },
            //            'chembl_assay_uri',
            //            'chembl_activity_uri',
            {
                header:'ChEMBL Assay URI',
                dataIndex:'chembl_assay_uri'
            },
            {
                header:'ChEMBL Activity URI',
                dataIndex:'chembl_activity_uri'
            },
            //            'target_preflabel',
            //            'target_title',
            //            'target_organism',
            {
                header:'Target Preferred Label',
                dataIndex:'target_preflabel'
            },
            {
                header:'Target Label',
                dataIndex:'target_title'
            },
            {
                header:'Target Organism',
                dataIndex:'target_organism'
            },
            //            'compound_preflabel',
            //            'compound_drug_type',
            //            'compound_generic_name',
            //            'compound_full_mwt',
            //            'compound_num_ro5_violations',
            //            'compound_inchi',
            //            'compound_inchi_key',
            //            'compound_smiles',
            {
                header:'Compound Label',
                dataIndex:'compound_preflabel'
            },
            {
                header:'Compound Drug Type',
                dataIndex:'compound_drug_type'
            },
            {
                header:'Compound Generic Name',
                dataIndex:'compound_generic_name'
            },
            {
                header:'Compound Full Molecular Weight',
                dataIndex:'compound_full_mwt'
            },
            {
                header:'Compound Rule of 5 violations',
                dataIndex:'compound_num_ro5_violations'
            },
            {
                header:'Compound Inchi',
                dataIndex:'compound_inchi'
            },
            {
                header:'Compound Inchi Key',
                dataIndex:'compound_inchi_key'
            },
            {
                header:'Compound SMILES',
                dataIndex:'compound_smiles'
            },
            //this is the good stuff (notice units and values are standardised by LDC)
            //            'assay_organism',
            //            'activity_activity_type',
            //            'activity_relation',
            //            'activity_standard_value',
            //            'activity_standard_units',
            {
                header:'Assay Organism',
                dataIndex:'assay_organism'
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
            }

        ]
    }
})
;