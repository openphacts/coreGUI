/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 29/06/2012
 * Time: 07:39
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LDA.model.TargetModel', {
    extend:'Ext.data.Model',
    fields:[
        //this msay need to change (target information endpiint is down)

        'cw_target_uri',
        'chembl_target_uri',
        'drugbank_target_uri',

        //chembl
        'label',
        'label_src',
        'label_item',

        'prefLabel',
        'prefLabel_src',
        'prefLabel_item',

        'keywords',
        'keywords_src',
        'keywords_item',

        'description',
        'description_src',
        'description_item',

        'target_type',
        'target_type_src',
        'target_type_item',

        'organism',
        'organism_src',
        'organism_item',

        'synonyms',
        'synonyms_src',
        'synonyms_item',

        'cellular_location',
        'cellular_location_src',
        'cellular_location_item',

        'molecular_weight',
        'molecular_weight_src',
        'molecular_weight_item',

        'number_of_residues',
        'number_of_residues_src',
        'number_of_residues_item',

        'pdb_id_page',
        'pdb_id_page_src',
        'pdb_id_page_item',

        'specific_function',
        'specific_function_src',
        'specific_function_item',

        'theoretical_pi',
        'theoretical_pi_src',
        'theoretical_pi_item'

//        'cw_uri', 'cs_uri', 'chembl_uri', 'drugbank_uri',
//        'inchi', 'inchi_src',
//        'inchi_key', 'inchi_key_src',
//        'smiles', 'smiles_src',
//        'alogp', 'alogp_src',
//        'full_mwt', 'full_mwt_src',
//        'hba', 'hba_src',
//        'hbd', 'hbd_src',
//        'molform', 'molform_src',
//        'mw_freebase', 'mw_freebase_src',
//        'psa', 'psa_src',
//        'rtb', 'rtb_src',
//        'biotransformation', 'biotransformation_src',
//        'description', 'description_src',
//        'proteinBinding', 'proteinBinding_src',
//        'toxicity', 'toxicity_src',
//        'prefLabel', 'prefLabel_src'
    ]
});
