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
        var pt = data[LDA_RESULT][LDA_PRIMARY_TOPIC];
        var em = pt[LDA_EXACT_MATCH];
        // var chemblData = em[0];
        // var drugBankData = em[1];
        var chemblData;
        var drugBankData;
        Ext.each(em, function (match, index, matches) {
                var src = match[LDA_IN_DATASET];
                if (LDA_SRC_CLS_MAPPINGS[src] == 'chemblValue') {
                    chemblData = match;
                } else if (LDA_SRC_CLS_MAPPINGS[src] == 'drugbankValue') {
                   drugBankData = match;
                }
            }
        );
		var chembl_src;
		if (chemblData != null) {			
        	chembl_src = chemblData[LDA_IN_DATASET];
		}
		if (drugBankData != null) {
        	var drugBank_src = drugBankData[LDA_IN_DATASET];			
		}
        var record = Ext.create('LDA.model.TargetModel', {
            cw_target_uri:pt[LDA_ABOUT],
            chembl_target_uri:chemblData[LDA_ABOUT],
            drugbank_target_uri:drugBankData[LDA_ABOUT],

            label:chemblData['label'],
            label_src:chembl_src,

            keywords:chemblData['keyword'],
            keywords_src:chembl_src,

            description:chemblData['description'],
            description_src:chembl_src,

            target_type:chemblData['target_type'],
            target_type_src:chembl_src,

            organism:chemblData['organism'],
            organism_src:chembl_src,

            synonyms:chemblData['synonyms'],
            synonyms_src:chembl_src,

            cellular_location:drugBankData['cellularLocation'],
            cellular_location_src:drugBank_src,

            molecular_weight:drugBankData['molecularWeight'],
            molecular_weight_src:drugBank_src,

            number_of_residues:drugBankData['numberOfResidues'],
            number_of_residues_src:drugBank_src,

            pdb_id_page:drugBankData['pdbIdPage'],
            pdb_id_page_src:drugBank_src,

            specific_function:drugBankData['specificFunction'],
            specific_function_src:drugBank_src,

            theoretical_pi:drugBankData['theoreticalPi'],
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
