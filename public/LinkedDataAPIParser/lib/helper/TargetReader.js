/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 29/06/2012
 * Time: 07:40
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LDA.helper.TargetReader', {
    extend:'Ext.data.reader.Json',
    requires:['LDA.helper.LDAConstants'],

    readRecords:function (data) {
        var pt = data['result']['primaryTopic'];
        var em = pt['exactMatch'];

        var record = Ext.create('LDA.model.TargetModel', {
            cw_uri:pt[LDA_ABOUT],
            cs_uri:em[1][LDA_ABOUT],
            chembl_uri:em[2][LDA_ABOUT],
            drugbank_uri:em[3][LDA_ABOUT],
            inchi:em[1]['inchi'],
            inchi_src:em[1][LDA_IN_DATASET],
            inchi_key:em[1]['inchikey'],
            inchi_key_src:em[1][LDA_IN_DATASET],
            smiles:em[1]['smiles'],
            smiles_src:em[1][LDA_IN_DATASET],
            alogp:em[2]['alogp'],
            alogp_src:em[2][LDA_IN_DATASET],
            full_mwt:em[2]['full_mwt'],
            full_mwt_src:em[2][LDA_IN_DATASET],
            hba:em[2]['hba'],
            hba_src:em[2][LDA_IN_DATASET],
            hbd:em[2]['hbd'],
            hbd_src:em[2][LDA_IN_DATASET],
            molform:em[2]['molform'],
            molform_src:em[2][LDA_IN_DATASET],
            mw_freebase:em[2]['mw_freebase'],
            mw_freebase_src:em[2][LDA_IN_DATASET],
            psa:em[2]['psa'],
            psa_src:em[2][LDA_IN_DATASET],
            rtb:em[2]['rtb'],
            rtb_src:em[2][LDA_IN_DATASET],
            biotransformation:em[3]['biotransformation'],
            biotransformation_src:em[3][LDA_IN_DATASET],
            description:em[3]['description'],
            description_src:em[3][LDA_IN_DATASET],
            proteinBinding:em[3]['proteinBinding'],
            proteinBinding_src:em[3][LDA_IN_DATASET],
            toxicity:em[3]['toxicity'],
            toxicity_src:em[3][LDA_IN_DATASET],
            prefLabel:pt['prefLabel'],
            prefLabel_src:pt[LDA_IN_DATASET]
        });

        console.log('LDA.model.TargetModel: Target');
        console.log(JSON.stringify(record));

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
