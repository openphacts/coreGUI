/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 25/06/2012
 * Time: 15:05
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LDA.helper.CompoundPharmacologyPaginatedReader', {
    extend:'Ext.data.reader.Json',
    requires:['LDA.helper.LDAConstants'],
//    alias:'reader.ldajson',

    readRecords:function (data) {
	    console.log('LDA.helper.CompoundPharmacologyPaginatedReader: readRecords');
        var me = this;
        var records = new Array();

        //big chunk of data
        var result = data[LDA_RESULT];
        var page_uri = result[LDA_ABOUT];
        var next_page = result[LDA_PAGINATED_NEXT];
        var previous_page = result[LDA_PAGINATED_PREVIOUS];
        var page_size = result[LDA_PAGINATED_PAGE_SIZE];
        var start_index = result[LDA_PAGINATED_START_INDEX];

        var items = result[LDA_ITEMS];

        Ext.each(items, function (item, index, items) {
            var chembl_activity_uri = item[LDA_ABOUT];
            var chembl_src = item[LDA_IN_DATASET];

            //big bits
            var forMolecule = item[LDA_FOR_MOLECULE];
			if (forMolecule != null) {
            	var chembl_compound_uri = forMolecule[LDA_ABOUT];
            	var compound_full_mwt = forMolecule['full_mwt'];
            	var em = forMolecule[LDA_EXACT_MATCH];
			}

            var cw_compound_uri, compound_pref_label, cw_src,
                cs_compound_uri, compound_inchi , compound_inchikey, compound_smiles, cs_src,
                drugbank_compound_uri, compound_drug_type, compound_generic_name, drugbank_src;

            Ext.each(em, function (match, index, matches) {
                    var src = match[LDA_IN_DATASET];
                    if (LDA_SRC_CLS_MAPPINGS[src] == 'conceptWikiValue') {
                        cw_compound_uri = match[LDA_ABOUT];
                        compound_pref_label = match['prefLabel'];
                        cw_src = match[LDA_IN_DATASET];
                    } else if (LDA_SRC_CLS_MAPPINGS[src] == 'chemspiderValue') {
                        cs_compound_uri = match[LDA_ABOUT];
                        compound_inchi = match['inchi'];
                        compound_inchikey = match['inchikey'];
                        compound_smiles = match['smiles'];
                        cs_src = match[LDA_IN_DATASET];
                    } else if (LDA_SRC_CLS_MAPPINGS[src] == 'drugbankValue') {
                        drugbank_compound_uri = match[LDA_ABOUT];
                        compound_drug_type = match['drugType'];
                        compound_generic_name = match['genericName'];
                        drugbank_src = match[LDA_ABOUT];
                    }
                }
            );

            var onAssay = item[LDA_ON_ASSAY];
			if (onAssay != null) {
            	var chembl_assay_uri = onAssay[LDA_ABOUT];
            	var target = onAssay['target'];
			}
			if (target != null) {
            	var target_title = target['title'];
            	var target_organism = target['assay_organism'];
            	var target_concatenated_uris = target['concatenatedURIs'];
			}


            var activity_activity_type = item['activity_type'];
            var activity_standard_value = item['standardValue'];
            var activity_standard_units = item['standardUnits'];
            var activity_relation = item['relation'];


            var record = Ext.create('LDA.model.PharmacologyPaginatedModel', {
                //for page
                page_uri:page_uri,
                next_page:next_page,
                previous_page:previous_page,
                page_size:page_size,
                start_index:start_index,

                //for compound
                compound_inchikey:compound_inchikey,
                compound_drug_type:compound_drug_type,
                compound_generic_name:compound_generic_name,
                target_title:target_title,
                target_concatenated_uris:target_concatenated_uris,

                compound_inchikey_src:cs_src,
                compound_drug_type_src:drugbank_src,
                compound_generic_name_src:drugbank_src,
                target_title_src:chembl_src,
                target_concatenated_uris_src:chembl_src,


                //for target
                chembl_activity_uri:chembl_activity_uri,
                chembl_compound_uri:chembl_compound_uri,
                compound_full_mwt:compound_full_mwt,
                cw_compound_uri:cw_compound_uri,
                compound_pref_label:compound_pref_label,
                cs_compound_uri:cs_compound_uri,
                compound_inchi:compound_inchi,
                compound_smiles:compound_smiles,
                chembl_assay_uri:chembl_assay_uri,
                chembl_target_uri:undefined,
                //this is labelled assay_organism
                target_organism:target_organism,
                target_pref_label:undefined,
                //this value is missing totally from compound pharmacology paginated
                assay_organism:undefined,
                activity_relation:activity_relation,
                activity_standard_units:activity_standard_units,
                activity_standard_value:activity_standard_value,
                activity_activity_type:activity_activity_type,

                compound_full_mwt_src:chembl_src,
                compound_pref_label_src:cw_src,
                compound_inchi_src:cs_src,
                compound_smiles_src:cs_src,
                target_organism_src:chembl_src,
                target_pref_label_src:undefined,
                assay_organism_src:chembl_src,
                activity_relation_src:chembl_src,
                activity_standard_units_src:chembl_src,
                activity_standard_value_src:chembl_src,
                activity_activity_type_src:chembl_src
            });


            records.push(record);

//            console.log('LDA.model.PharmacologyPaginatedModel: CompoundPharmacologyPaginated');
//            console.log(JSON.stringify(record));
        });
		total_count = this.total_count;
		if (total_count == null) {
			total_count = 50; //default number of records to retrieve. Pagination details will be fetched separately be the controller
		}
        return new Ext.data.ResultSet(
            {
                total:total_count,
                count:records.length,
                records:records,
                success:true,
                message:'loaded'
            });
    }

});