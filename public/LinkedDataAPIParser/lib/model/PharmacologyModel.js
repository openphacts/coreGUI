/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 25/06/2012
 * Time: 14:00
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LDA.model.PharmacologyModel', {
    extend:'Ext.data.Model',
    fields:[
        //these fields are the union of the fields from compound and target pharmacology results
        //Most fields are present in both results

        'cs_compound_uri',
        'cw_compound_uri',
        'chembl_compound_uri',
        'drugbank_compound_uri',

        'cw_target_uri',
        'chembl_target_uri',
        'drugbank_target_uri',

        'chembl_assay_uri',

        'chembl_activity_uri',

        //specific to target pharma
        'target_preflabel',
        'target_preflabel_src',

        'target_title',
        'target_title_src',

        'target_organism',
        'target_organism_src',

        //specific to compound pharma (is CW UUID)
        'compound_uuid',
        'compound_uuid_src',

        'compound_drug_type',
        'compound_drug_type_src',

        'compound_generic_name',
        'compound_generic_name_src',

        'compound_full_mwt',
        'compound_full_mwt_src',

        'compound_num_ro5_violations',
        'compound_num_ro5_violations_src',

        'compound_inchi',
        'compound_inchi_src',

        'compound_inchi_key',
        'compound_inchi_key_src',

        'compound_smiles',
        'compound_smiles_src',

        'compound_preflabel',
        'compound_preflabel_src',

        'assay_organism',
        'assay_organism_src',

        'activity_relation',
        'activity_relation_src',

        'activity_standard_units',
        'activity_standard_units_src',

        'activity_standard_value',
        'activity_standard_value_src',

        'activity_activity_type',
        'activity_activity_type_src'
    ]
});
