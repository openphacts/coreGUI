/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 27/06/2012
 * Time: 20:32
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LDA.model.PharmacologyPaginatedModel', {
    extend:'Ext.data.Model',
    fields:[

        //for page
        'page_uri',
        'next_page',
        'previous_page',
        'page_size',
        'start_index',

        //for compound
        'compound_inchikey',
        'compound_drug_type',
        'compound_generic_name',
        'target_title',
        'target_concatenated_uris',

        'compound_inchikey_src',
        'compound_drug_type_src',
        'compound_generic_name_src',
        'target_title_src',
        'target_concatenated_uris_src',


        //for target
        'chembl_activity_uri',
        'chembl_compound_uri',
        'compound_full_mwt',
        'cw_compound_uri',
        'compound_pref_label',
        'cs_compound_uri',
	'csid',
        'compound_inchi',
        'compound_smiles',
        'chembl_assay_uri',
        'chembl_target_uri',
        //this is labelled assay_organism
        'target_organism',
        'target_pref_label',
        //this value is missing totally from compound pharmacology paginated
        'assay_organism',
        'assay_description',
        'activity_relation',
        'activity_standard_units',
        'activity_standard_value',
        'activity_activity_type',

        'compound_full_mwt_src',
        'compound_pref_label_src',
        'compound_inchi_src',
        'compound_smiles_src',
        'target_organism_src',
        'target_pref_label_src',
        'assay_organism_src',
        'assay_description_src',
        'activity_relation_src',
        'activity_standard_units_src',
        'activity_standard_value_src',
        'activity_activity_type_src',

        // provenance items
        'target_title_item',
        'target_organism_item',
        'activity_activity_type_item',
        'activity_relation_item',
        'activity_standard_value_item',
        'activity_standard_units_item',
        'compound_full_mwt_item',
        'compound_smiles_item',
        'compound_inchi_item',
        'compound_inchikey_item',
        'compound_pref_label_item',
        'target_pref_label_item',
        'assay_organism_item',
        'assay_description_item'

    ]
});
