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

        'keywords',
        'keywords_src',

        'description',
        'description_src',

        'target_type',
        'target_type_src',

        'organism',
        'organism_src',

        'synonyms',
        'synonyms_src',

        'cellular_location',
        'cellular_location_src',

        'molecular_weight',
        'molecular_weight_src',

        'number_of_residues',
        'number_of_residues_src',

        'pdb_id_page',
        'pdb_id_page_src',

        'specific_function',
        'specific_function_src',

        'theoretical_pi',
        'theoretical_pi_src'

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
