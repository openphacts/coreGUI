/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 26/06/2012
 * Time: 21:45
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LDA.model.CompoundModel', {
    extend:'Ext.data.Model',
    fields:['csid', 'cw_uri', 'cs_uri', 'chembl_uri', 'drugbank_uri',
        'inchi', 'inchi_src',
        'inchi_key', 'inchi_key_src',
        'compound_smiles', 'compound_smiles_src',
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
        'compound_pref_label', 'compound_pref_label_src',
        'meltingPoint', 'meltingPoint_src',

         'compound_pref_label_item',
         'description_item',
         'biotransformation_item',
         'molform_item',
         'compound_smiles_item',
         'inchi_item',
         'inchi_key_item',
         'proteinBinding_item',
         'toxicity_item',
         'meltingPoint_item',
         'alogp_item',
         'hba_item',
         'hbd_item',
         'full_mwt_item',
         'mw_freebase_item',
         'num_ro5_violations_item',
         'psa_item',
         'rtb_item'

//        '', '_src',
    ]
});
