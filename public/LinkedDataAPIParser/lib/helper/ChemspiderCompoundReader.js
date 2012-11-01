Ext.define('LDA.helper.ChemspiderCompoundReader', {
    extend: 'Ext.data.reader.Json',
    requires: ['LDA.helper.LDAConstants'],

    readRecords: function(data) {
        var pt = data['result']['primaryTopic'];
        var em = pt['exactMatch'];
        var chemspiderValue;
        var drugBankData;
        var chemblValue;
        var conceptWikiData;
        Ext.each(em, function(match, index, matches) {
            var src = match[LDA.helper.LDAConstants.LDA_IN_DATASET];
            if (LDA.helper.LDAConstants.LDA_SRC_CLS_MAPPINGS[src] == 'chemspiderValue') {
                chemspiderValue = match;
            } else if (LDA.helper.LDAConstants.LDA_SRC_CLS_MAPPINGS[src] == 'drugbankValue') {
                drugBankData = match;
            } else if (LDA.helper.LDAConstants.LDA_SRC_CLS_MAPPINGS[src] == 'chemblValue') {
                chemblValue = match;
            } else if (LDA.helper.LDAConstants.LDA_SRC_CLS_MAPPINGS[src] == 'conceptWikiValue') {
                conceptWikiData = match;
            }
        });
	var csid;
	var cw_uri;
	conceptWikiData != null ? cw_uri= conceptWikiData[LDA.helper.LDAConstants.LDA_ABOUT] : '';
        var record = Ext.create('LDA.model.CompoundModel', {
	    csid: pt[LDA.helper.LDAConstants.LDA_ABOUT].substring(pt[LDA.helper.LDAConstants.LDA_ABOUT].lastIndexOf('/') + 1),
            cw_uri: cw_uri,
            cs_uri: pt[LDA.helper.LDAConstants.LDA_ABOUT] != null ? pt[LDA.helper.LDAConstants.LDA_ABOUT] : null,
            chembl_uri: chemblValue != null ? chemblValue[LDA.helper.LDAConstants.LDA_ABOUT] : null,
            drugbank_uri: drugBankData != null ? drugBankData[LDA.helper.LDAConstants.LDA_ABOUT] : null,
            inchi: pt.inchi != null ? pt.inchi : null,
            inchi_src: pt[LDA.helper.LDAConstants.LDA_IN_DATASET] != null ? pt[LDA.helper.LDAConstants.LDA_IN_DATASET] : null,
            inchi_key: pt.inchikey != null ? pt.inchikey : null,
            inchi_key_src: pt[LDA.helper.LDAConstants.LDA_IN_DATASET] != null ? pt[LDA.helper.LDAConstants.LDA_IN_DATASET] : null,
            compound_smiles: pt.smiles != null ? pt.smiles : null,
            smiles_src: pt[LDA.helper.LDAConstants.LDA_IN_DATASET] != null ? pt[LDA.helper.LDAConstants.LDA_IN_DATASET] : null,
            alogp: pt.logp != null ? pt.logp : null,
            alogp_src: pt[LDA.helper.LDAConstants.LDA_IN_DATASET] != null ? pt[LDA.helper.LDAConstants.LDA_IN_DATASET] : null,
            full_mwt: chemblValue != null ? chemblValue['full_mwt'] : null,
            full_mwt_src: chemblValue != null ? chemblValue[LDA.helper.LDAConstants.LDA_IN_DATASET] : null,
            hba: pt.hba != null ? pt.hba : null,
            hba_src: pt[LDA.helper.LDAConstants.LDA_IN_DATASET] != null ? pt[LDA.helper.LDAConstants.LDA_IN_DATASET] : null,
            hbd: pt.hbd != null ? pt.hbd : null,
            hbd_src: pt[LDA.helper.LDAConstants.LDA_IN_DATASET] != null ? pt[LDA.helper.LDAConstants.LDA_IN_DATASET] : null,
            molform: chemblValue != null ? chemblValue['molform'] : null,
            molform_src: chemblValue != null ? chemblValue[LDA.helper.LDAConstants.LDA_IN_DATASET] : null,
            mw_freebase: chemblValue != null ? chemblValue['mw_freebase'] : null,
            mw_freebase_src: chemblValue != null ? chemblValue[LDA.helper.LDAConstants.LDA_IN_DATASET] : null,
            psa: pt.psa != null ? pt.psa : null,
            psa_src: pt[LDA.helper.LDAConstants.LDA_IN_DATASET] != null ? pt[LDA.helper.LDAConstants.LDA_IN_DATASET] : null,
            rtb: chemblValue != null ? chemblValue['rtb'] : null,
            rtb_src: chemblValue != null ? chemblValue[LDA.helper.LDAConstants.LDA_IN_DATASET] : null,
            biotransformation: drugBankData != null ? drugBankData['biotransformation'] : null,
            biotransformation_src: drugBankData != null ? drugBankData[LDA.helper.LDAConstants.LDA_IN_DATASET] : null,
            description: drugBankData != null ? drugBankData['description'] : null,
            description_src: drugBankData != null ? drugBankData[LDA.helper.LDAConstants.LDA_IN_DATASET] : null,
            proteinBinding: drugBankData != null ? drugBankData['proteinBinding'] : null,
            proteinBinding_src: drugBankData != null ? drugBankData[LDA.helper.LDAConstants.LDA_IN_DATASET] : null,
            toxicity: drugBankData != null ? drugBankData['toxicity'] : null,
            toxicity_src: drugBankData != null ? drugBankData[LDA.helper.LDAConstants.LDA_IN_DATASET] : null,
            compound_pref_label: conceptWikiData != null ? conceptWikiData['prefLabel'] : null,
            prefLabel_src: conceptWikiData != null ? conceptWikiData[LDA.helper.LDAConstants.LDA_IN_DATASET] : null,
            meltingPoint: drugBankData != null ? drugBankData['meltingPoint'] : null,
            meltingPoint_src: drugBankData != null ? drugBankData[LDA.helper.LDAConstants.LDA_IN_DATASET] : null,

        });

        return new Ext.data.ResultSet({
            total: 1,
            count: 1,
            records: [record],
            success: true,
            message: 'loaded'
        });
    }
});
