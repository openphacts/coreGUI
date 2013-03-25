/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 26/06/2012
 * Time: 21:45
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LDA.model.EnzymeFamilyModel', {
    extend:'Ext.data.Model',
    fields:['cw_uri', 'cs_uri', 'chembl_uri', 'drugbank_uri',
        'inchi', 'inchi_src',
        'inchi_key', 'inchi_key_src',
        'smiles', 'smiles_src',
        'alogp', 'alogp_src',
        'full_mwt', 'full_mwt_src',
        'hba', 'hba_src',
        'hbd', 'hbd_src',
        'molform', 'molform_src',
        'mw_freebase', 'mw_freebase_src',
        'psa', 'psa_src',
        'rtb', 'rtb_src',
        'biotransformation', 'biotransformation_src',
        'description', 'description_src',
        'proteinBinding', 'proteinBinding_src',
        'toxicity', 'toxicity_src',
        'prefLabel', 'prefLabel_src',
	'target_title', 'target_organism',

        'compound_pref_label_item',
        'target_title_item',
        'target_organism_item',
        'assay_organism_item',
        'compound_smiles_item',
        'compound_inchi_item',
        'compound_inchikey_item',
        'activity_activity_type_item',
        'activity_relation_item',
        'activity_standard_value_item',
        'activity_standard_units_item',
        'compound_full_mwt_item'

//        '', '_src',
    ]
});
