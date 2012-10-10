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
        var pt = data[LDA.helper.LDAConstants.LDA_RESULT][LDA.helper.LDAConstants.LDA_PRIMARY_TOPIC];
        var em = pt[LDA.helper.LDAConstants.LDA_EXACT_MATCH];
        // var chemblData = em[0];
        // var drugBankData = em[1];
        var chemblData;
        var drugBankData;
        var uniprotData;
        Ext.each(em, function (match, index, matches) {
                var src = match[LDA.helper.LDAConstants.LDA_IN_DATASET];
                if (LDA.helper.LDAConstants.LDA_SRC_CLS_MAPPINGS[src] == 'chemblValue') {
                    chemblData = match;
                } else if (LDA.helper.LDAConstants.LDA_SRC_CLS_MAPPINGS[src] == 'drugbankValue') {
                   drugBankData = match;
                } else if (LDA.helper.LDAConstants.LDA_SRC_CLS_MAPPINGS[src] == 'uniprotValue') {
                    console.log( " HIT ");
                    uniprotData = match;
                }

            }
        );
		var chembl_src;
		if (chemblData != null) {			
        	chembl_src = chemblData[LDA.helper.LDAConstants.LDA_IN_DATASET];
		}
        var drugBank_src;
		if (drugBankData != null) {
        	drugBank_src = drugBankData[LDA.helper.LDAConstants.LDA_IN_DATASET];
		}
        var uniprot_src;
        if (uniprotData != null) {
            uniprot_src = uniprotData[LDA.helper.LDAConstants.LDA_IN_DATASET];
        }
        console.log(' RECORD ' + pt['Function_Annotation']);
        var record = Ext.create('LDA.model.TargetModel', {
            cw_target_uri:pt[LDA.helper.LDAConstants.LDA_ABOUT],
            chembl_target_uri: chemblData != null ? chemblData[LDA.helper.LDAConstants.LDA_ABOUT] : null,
            drugbank_target_uri: drugBankData != null ? drugBankData[LDA.helper.LDAConstants.LDA_ABOUT] : null,

            prefLabel: pt['prefLabel'],

            label: chemblData != null ? chemblData['label'] : null,
            label_src:chembl_src,

            keywords: chemblData != null ? chemblData['keyword'] : null,
            keywords_src:chembl_src,

            description: chemblData != null ? chemblData['description'] : null,
            description_src:chembl_src,

            target_type: chemblData != null ? chemblData['target_type'] : null,
            target_type_src:chembl_src,

            organism: chemblData != null ? chemblData['organism'] : null,
            organism_src:chembl_src,

            synonyms: chemblData != null ? chemblData['label'] : null,
            synonyms_src:chembl_src,

            cellular_location: drugBankData != null ? drugBankData['cellularLocation'] : null,
            cellular_location_src:drugBank_src,

            molecular_weight: drugBankData != null ? drugBankData['molecularWeight'] : null,
            molecular_weight_src:drugBank_src,

            number_of_residues: drugBankData != null ? drugBankData['numberOfResidues'] : null,
            number_of_residues_src:drugBank_src,

            pdb_id_page: drugBankData != null ? drugBankData['pdbIdPage'] : null,
            pdb_id_page_src:drugBank_src,

            specific_function: uniprotData != null ? uniprotData['Function_Annotation'] : null,
            specific_function_src:uniprot_src,

            theoretical_pi: drugBankData != null ? drugBankData['theoreticalPi'] : null,
            theoretical_pi_src:drugBank_src
        });

//        console.log('LDA.model.TargetModel: Target');
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
