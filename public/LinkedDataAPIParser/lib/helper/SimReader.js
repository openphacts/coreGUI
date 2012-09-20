/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 25/06/2012
 * Time: 15:06
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LDA.helper.SimReader', {
    extend:'Ext.data.reader.Json',
    requires:['LDA.helper.LDAConstants'],
// TODO check the format of the result and change this reader and the SimModel accordingly
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
        var record = Ext.create('LDA.model.SimModel', {
            cw_uri:pt[LDA.helper.LDAConstants.LDA_ABOUT],
            cs_uri:chemspiderValue[LDA.helper.LDAConstants.LDA_ABOUT],
            chembl_uri:chemblValue[LDA.helper.LDAConstants.LDA_ABOUT],
            drugbank_uri:drugBankData[LDA.helper.LDAConstants.LDA_ABOUT],
            inchi:chemspiderValue['inchi'],
            inchi_src:chemspiderValue[LDA.helper.LDAConstants.LDA_IN_DATASET],
            inchi_key:chemspiderValue['inchikey'],
            inchi_key_src:chemspiderValue[LDA.helper.LDAConstants.LDA_IN_DATASET],
            smiles:chemspiderValue['smiles'],
            smiles_src:chemspiderValue[LDA.helper.LDAConstants.LDA_IN_DATASET],
            alogp:chemblValue['alogp'],
            alogp_src:chemblValue[LDA.helper.LDAConstants.LDA_IN_DATASET],
            full_mwt:chemblValue['full_mwt'],
            full_mwt_src:chemblValue[LDA.helper.LDAConstants.LDA_IN_DATASET],
            hba:chemblValue['hba'],
            hba_src:chemblValue[LDA.helper.LDAConstants.LDA_IN_DATASET],
            hbd:chemblValue['hbd'],
            hbd_src:chemblValue[LDA.helper.LDAConstants.LDA_IN_DATASET],
            molform:chemblValue['molform'],
            molform_src:chemblValue[LDA.helper.LDAConstants.LDA_IN_DATASET],
            mw_freebase:chemblValue['mw_freebase'],
            mw_freebase_src:chemblValue[LDA.helper.LDAConstants.LDA_IN_DATASET],
            psa:chemblValue['psa'],
            psa_src:chemblValue[LDA.helper.LDAConstants.LDA_IN_DATASET],
            rtb:chemblValue['rtb'],
            rtb_src:chemblValue[LDA.helper.LDAConstants.LDA_IN_DATASET],
            biotransformation:drugBankData['biotransformation'],
            biotransformation_src:drugBankData[LDA.helper.LDAConstants.LDA_IN_DATASET],
            description:drugBankData['description'],
            description_src:drugBankData[LDA.helper.LDAConstants.LDA_IN_DATASET],
            proteinBinding:drugBankData['proteinBinding'],
            proteinBinding_src:drugBankData[LDA.helper.LDAConstants.LDA_IN_DATASET],
            toxicity:drugBankData['toxicity'],
            toxicity_src:drugBankData[LDA.helper.LDAConstants.LDA_IN_DATASET],
            prefLabel:pt['prefLabel'],
            prefLabel_src:pt[LDA.helper.LDAConstants.LDA_IN_DATASET]
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
