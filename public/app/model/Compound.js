Ext.define('LSP.model.Compound', {
    extend:'Ext.data.Model',
    fields:['compound_name', 'csid_uri', 'molformula', 'molweight', 'inchi', 'inchiKey', 'smiles', 'alogp', 'hha', 'hhd',
        'mw_freebase', 'num_ro5_violations', 'psa', 'rtb', 'meltingPoint', 'affectedOrganism', 'biotransformation',
        'biotransformation', 'description', 'indication', 'proteinBinding', 'toxicity']
});