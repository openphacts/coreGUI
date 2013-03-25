/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 25/06/2012
 * Time: 15:06
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LDA.helper.CompoundReader', {
    extend:'Ext.data.reader.Json',
    requires:['LDA.helper.LDAConstants'],

    readRecords:function (data) {
        var pt = data['result']['primaryTopic'];
        var em = pt['exactMatch'];
        var chemspiderValue;
        var drugBankData;
	    var chemblValue;
        Ext.each(em, function (match, index, matches) {
                var src = match[LDA.helper.LDAConstants.LDA_IN_DATASET];
                if (LDA.helper.LDAConstants.LDA_SRC_CLS_MAPPINGS[src] == 'chemspiderValue') {
                    chemspiderValue = match;
                } else if (LDA.helper.LDAConstants.LDA_SRC_CLS_MAPPINGS[src] == 'drugbankValue') {
                   drugBankData = match;
                } else if (LDA.helper.LDAConstants.LDA_SRC_CLS_MAPPINGS[src] == 'chemblValue') {
                   chemblValue = match;
                }
            }
        );
        var chemSpiderUri;
        var chemblUri;
        var drugbankUrl;
        var chemspiderLinkOut;
        var chemblLinkOut;
        var drugbankLinkOut;

        var conceptWikiUri = pt[LDA.helper.LDAConstants.LDA_ABOUT];
        chemspiderValue != null ? chemSpiderUri =  chemspiderValue[LDA.helper.LDAConstants.LDA_ABOUT] : chemSpiderUri = null;
        chemblValue != null ? chemblUri = chemblValue[LDA.helper.LDAConstants.LDA_ABOUT] : chemblUri = null;
        drugBankData != null ? drugbankUrl = drugBankData[LDA.helper.LDAConstants.LDA_ABOUT] : drugbankUrl = null;

        chemspiderValue != null ? chemspiderLinkOut = 'http://www.chemspider.com/' + chemSpiderUri.split('/').pop() : chemspiderLinkOut = null ;
        chemblValue != null ? chemblLinkOut = 'https://www.ebi.ac.uk/chembldb/compound/inspect/' + chemblUri.split('/').pop() : chemblLinkOut = null;
        drugBankData != null ? drugbankLinkOut = 'http://www.drugbank.ca/drugs/' + drugbankUrl.split('/').pop()  : drugbankLinkOut = null;

        var record = Ext.create('LDA.model.CompoundModel', {
            cw_uri:pt[LDA.helper.LDAConstants.LDA_ABOUT],
            cs_uri: chemspiderValue != null ? chemspiderValue[LDA.helper.LDAConstants.LDA_ABOUT] : null,
            chembl_uri: chemblValue != null ? chemblValue[LDA.helper.LDAConstants.LDA_ABOUT] : null,
            drugbank_uri: drugBankData != null ? drugBankData[LDA.helper.LDAConstants.LDA_ABOUT] : null,
            inchi: chemspiderValue != null ? chemspiderValue['inchi'] : null,
            inchi_src: chemspiderValue != null ? chemspiderValue[LDA.helper.LDAConstants.LDA_IN_DATASET] : null,
            inchi_item: chemspiderLinkOut,
            inchi_key: chemspiderValue != null ? chemspiderValue['inchikey'] : null,
            inchi_key_item: chemspiderLinkOut,
            inchi_key_src: chemspiderValue != null ? chemspiderValue[LDA.helper.LDAConstants.LDA_IN_DATASET] : null,
            compound_smiles: chemspiderValue != null ? chemspiderValue['smiles'] : null,
            compound_smiles_src: chemspiderValue != null ? chemspiderValue[LDA.helper.LDAConstants.LDA_IN_DATASET] : null,
            compound_smiles_item: chemspiderLinkOut,
            alogp: chemspiderValue != null ? chemspiderValue['logp'] : null,
            alogp_src: chemspiderValue != null ? chemspiderValue[LDA.helper.LDAConstants.LDA_IN_DATASET] : null,
            alogp_item: chemspiderLinkOut,
            full_mwt: chemblValue != null ? chemblValue['full_mwt'] : null,
            full_mwt_src: chemblValue != null ? chemblValue[LDA.helper.LDAConstants.LDA_IN_DATASET] : null,
            full_mwt_item: chemblLinkOut,
            hba: chemspiderValue != null ? chemspiderValue['hba'] : null,
            hba_src: chemspiderValue != null ? chemspiderValue[LDA.helper.LDAConstants.LDA_IN_DATASET] : null,
            hba_item: chemspiderLinkOut,
            hbd: chemspiderValue != null ? chemspiderValue['hbd'] : null,
            hbd_src: chemspiderValue != null ? chemspiderValue[LDA.helper.LDAConstants.LDA_IN_DATASET] : null,
            hbd_item: chemspiderLinkOut,
            molform: chemblValue != null ? chemblValue['molform'] : null,
            molform_src: chemblValue != null ? chemblValue[LDA.helper.LDAConstants.LDA_IN_DATASET] : null,
            molform_item: chemblLinkOut,
            mw_freebase: chemblValue != null ? chemblValue['mw_freebase'] : null,
            mw_freebase_src: chemblValue != null ? chemblValue[LDA.helper.LDAConstants.LDA_IN_DATASET] : null,
            mw_freebase_item: chemblLinkOut,
            psa: chemspiderValue != null ? chemspiderValue['psa'] : null,
            psa_src: chemspiderValue != null ? chemspiderValue[LDA.helper.LDAConstants.LDA_IN_DATASET] : null,
            psa_item: chemspiderLinkOut,
            rtb: chemblValue != null ? chemblValue['rtb'] : null,
            rtb_src: chemblValue != null ? chemblValue[LDA.helper.LDAConstants.LDA_IN_DATASET] : null,
            rtb_item: chemblLinkOut,
            biotransformation: drugBankData != null ? drugBankData['biotransformation'] : null,
            biotransformation_src: drugBankData != null ? drugBankData[LDA.helper.LDAConstants.LDA_IN_DATASET] : null,
            biotransformation_item: drugbankLinkOut,
            description: drugBankData != null ? drugBankData['description'] : null,
            description_src: drugBankData != null ? drugBankData[LDA.helper.LDAConstants.LDA_IN_DATASET] : null,
            description_item: drugbankLinkOut,
            proteinBinding: drugBankData != null ? drugBankData['proteinBinding'] : null,
            proteinBinding_src: drugBankData != null ? drugBankData[LDA.helper.LDAConstants.LDA_IN_DATASET] : null,
            proteinBinding_item: drugbankLinkOut,
            toxicity: drugBankData != null ? drugBankData['toxicity'] : null,
            toxicity_src: drugBankData != null ? drugBankData[LDA.helper.LDAConstants.LDA_IN_DATASET] : null,
            toxicity_item: drugbankLinkOut,
            compound_pref_label:pt['prefLabel'],
            compound_pref_label_src:pt[LDA.helper.LDAConstants.LDA_IN_DATASET],
            compound_pref_label_item: conceptWikiUri,
            meltingPoint: drugBankData != null ? drugBankData['meltingPoint'] : null,
            meltingPoint_src: drugBankData != null ? drugBankData[LDA.helper.LDAConstants.LDA_IN_DATASET] : null,
            meltingPoint_item: drugbankLinkOut

        });

//        console.log('LDA.model.CompoundModel: Compound');
//        console.log(JSON.stringify(record));

        return new Ext.data.ResultSet(
            {
                total:1,
                count:1,
                records:[record],
                success:true,
                message:'loaded'
            });
    }
})
;
