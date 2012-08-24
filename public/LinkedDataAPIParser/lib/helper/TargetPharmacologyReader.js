/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 29/06/2012
 * Time: 11:32
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LDA.helper.TargetPharmacologyReader', {
    extend:'Ext.data.reader.Json',
    requires:['LDA.helper.LDAConstants'],
    readRecords:function (data) {
        var me = this;
        var records = new Array();

        //big chunks of data
        var pt = data[LDA.helper.LDAConstants.LDA_RESULT][LDA.helper.LDAConstants.LDA_PRIMARY_TOPIC];
        var em = pt[LDA.helper.LDAConstants.LDA_EXACT_MATCH];
        var chemblData = em[1];

        var cw_target_uri = pt[LDA.helper.LDAConstants.LDA_ABOUT];
        var chembl_target_uri = chemblData[LDA.helper.LDAConstants.LDA_ABOUT];

        var chembl_src = chemblData[LDA.helper.LDAConstants.LDA_IN_DATASET];

        var targetTitle = chemblData['title'];
        //this is labelled assay_organism in lda but is actually target organism
        var targetOrganism = chemblData['assay_organism'];

        var targetPrefLabel = pt['prefLabel'];


        var targetOfAssay = chemblData[LDA.helper.LDAConstants.LDA_TARGET_OF_ASSAY];

        Ext.each(targetOfAssay, function (assay, index, assays) {
            var chembl_assay_uri = assay[LDA.helper.LDAConstants.LDA_ABOUT];
            var assayOrganism = assay['assay_organism'];

            var assayOfActivity = assay[LDA.helper.LDAConstants.LDA_ASSAY_OF_ACTIVITY];

            Ext.each(assayOfActivity, function (activity, index, activities) {
                var chembl_activity_uri = activity[LDA.helper.LDAConstants.LDA_ABOUT];
                var activity_type = activity['activity_type'];
                var relation = activity['relation'];
                var standardValue = activity['standardValue'];
                var standardUnits = activity['standardUnits'];

                var forMolecule = activity[LDA.helper.LDAConstants.LDA_FOR_MOLECULE];
                var forMoleculeExactMatch = forMolecule[LDA.helper.LDAConstants.LDA_EXACT_MATCH];

                var chembl_compound_uri = forMolecule[LDA.helper.LDAConstants.LDA_ABOUT];

                var chemspiderData = undefined;
                var conceptWikiData = undefined;

                if (forMoleculeExactMatch.length == 2) {
                    var src = forMoleculeExactMatch[0][LDA.helper.LDAConstants.LDA_IN_DATASET];
                    if (LDA.helper.LDAConstants.LDA_SRC_CLS_MAPPINGS[src] == 'chemspiderValue') {
                        chemspiderData = forMoleculeExactMatch[0];
                        conceptWikiData = forMoleculeExactMatch[1];
                    } else {
                        chemspiderData = forMoleculeExactMatch[1];
                        conceptWikiData = forMoleculeExactMatch[0];
                    }
                }

                //chembl bit of compound data
                var full_mwt = forMolecule['full_mwt'];
                var num_ro5_violations = forMolecule['num_ro5_violations'];

                //chemspider bit
                if (chemspiderData) {
                    var cs_compound_uri = chemspiderData[LDA.helper.LDAConstants.LDA_ABOUT];
                    var chemspider_src = chemspiderData[LDA.helper.LDAConstants.LDA_IN_DATASET];
                    var inchi = chemspiderData['inchi'];
                    var smiles = chemspiderData['smiles'];
                }

                //conceptwiki bit
                if (conceptWikiData) {
                    var cw_compound_uri = conceptWikiData[LDA.helper.LDAConstants.LDA_ABOUT];
                    var conceptwiki_src = conceptWikiData[LDA.helper.LDAConstants.LDA_IN_DATASET];
                    var compoundPrefLabel = conceptWikiData['prefLabel'];
                }


                var record = new LDA.model.PharmacologyModel({
                        cs_compound_uri:cs_compound_uri,
                        cw_compound_uri:cw_compound_uri,
                        chembl_compound_uri:chembl_compound_uri,
                        drugbank_compound_uri:undefined,

                        cw_target_uri:cw_target_uri,
                        chembl_target_uri:chembl_target_uri,
                        drugbank_target_uri:undefined,

                        chembl_assay_uri:chembl_assay_uri,

                        chembl_activity_uri:chembl_activity_uri,

                        //for target pharma
                        target_preflabel:targetPrefLabel,
                        target_preflabel_src:conceptwiki_src,

                        target_title:targetTitle,
                        target_title_src:chembl_src,

                        target_organism:targetOrganism,
                        target_organism_src:chembl_src,
                        //
                        //                        //for compound pharma (is CW UUID) (this seems to be missing in latest LDA 3/7/12)
                        compound_uuid:undefined,
                        compound_uuid_src:undefined,

                        compound_drug_type:undefined,
                        compound_drug_type_src:undefined,

                        compound_generic_name:undefined,
                        compound_generic_name_src:undefined,

                        compound_full_mwt:full_mwt,
                        compound_full_mwt_src:chembl_src,

                        compound_num_ro5_violations:num_ro5_violations,
                        compound_num_ro5_violations_src:chembl_src,

                        compound_inchi:inchi,
                        compound_inchi_src:chemspider_src,

                        compound_inchi_key:undefined,
                        compound_inchi_key_src:undefined,

                        compound_smiles:smiles,
                        compound_smiles_src:chemspider_src,

                        compound_preflabel:compoundPrefLabel,
                        compound_preflabel_src:conceptwiki_src,

                        assay_organism:assayOrganism,
                        assay_organism_src:chembl_src,

                        activity_relation:relation,
                        activity_relation_src:chembl_src,

                        activity_standard_units:standardUnits,
                        activity_standard_units_src:chembl_src,

                        activity_standard_value:standardValue,
                        activity_standard_value_src:chembl_src,

                        activity_activity_type:activity_type,
                        activity_activity_type_src:chembl_src

                    }
                );
                records.push(record);
            });
        });

        return new Ext.data.ResultSet(
            {
                total:records.length,
                count:records.length,
                records:records,
                success:true,
                message:'loaded'
            });
    }
})
;
