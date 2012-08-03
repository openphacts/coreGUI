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
        'prefLabel', 'prefLabel_src'
//        '', '_src',
    ]
});