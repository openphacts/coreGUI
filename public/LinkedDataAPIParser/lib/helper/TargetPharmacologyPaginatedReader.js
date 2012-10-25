/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 29/06/2012
 * Time: 11:32
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LDA.helper.TargetPharmacologyPaginatedReader', {
    extend:'Ext.data.reader.Json',
    requires:['LDA.helper.LDAConstants'],
    readRecords:function (data) {

        var me = this;
        var records = new Array();

        //big chunk of data
        var result = data[LDA.helper.LDAConstants.LDA_RESULT];
        var page_uri = result[LDA.helper.LDAConstants.LDA_ABOUT];
        var next_page = result[LDA.helper.LDAConstants.LDA_PAGINATED_NEXT];
        var previous_page = result[LDA.helper.LDAConstants.LDA_PAGINATED_PREVIOUS];
        var page_size = result[LDA.helper.LDAConstants.LDA_PAGINATED_PAGE_SIZE];
        var start_index = result[LDA.helper.LDAConstants.LDA_PAGINATED_START_INDEX];

        var items = result[LDA.helper.LDAConstants.LDA_ITEMS];
	if (items == null) {
		Ext.Error.raise({
                	msg: 'There are no items in the response'
            	});
	}
        Ext.each(items, function (item, index, items) {
            var chembl_activity_uri = item[LDA.helper.LDAConstants.LDA_ABOUT];
            var chembl_src = item[LDA.helper.LDAConstants.LDA_IN_DATASET];

            //big bits
            var forMolecule = item[LDA.helper.LDAConstants.LDA_FOR_MOLECULE];
	    var chembl_compound_uri;
	    var compound_full_mwt;
        var compound_full_mwt_item;

        var em;
        var chembleMolecultLink = 'https://www.ebi.ac.uk/chembldb/compound/inspect/';

        if (forMolecule != null) {
		chembl_compound_uri = forMolecule[LDA.helper.LDAConstants.LDA_ABOUT];
		compound_full_mwt = forMolecule['full_mwt'];
        chembleMolecultLink += chembl_compound_uri.split('/').pop();
        compound_full_mwt_item = chembleMolecultLink;
		em = forMolecule[LDA.helper.LDAConstants.LDA_EXACT_MATCH];
	    }

            var cw_compound_uri, compound_pref_label, cw_src,
                cs_compound_uri, compound_inchi , compound_inchikey, compound_smiles, cs_src,
                drugbank_compound_uri, compound_drug_type, compound_generic_name, drugbank_src, csid,
                compound_pref_label_item, compound_inchi_item, compound_inchikey_item, compound_smiles_item,
                assay_description, assay_description_item;

            Ext.each(em, function (match, index, matches) {
                    var src = match[LDA.helper.LDAConstants.LDA_IN_DATASET];
                    if (LDA.helper.LDAConstants.LDA_SRC_CLS_MAPPINGS[src] == 'conceptWikiValue') {
                        cw_compound_uri = match[LDA.helper.LDAConstants.LDA_ABOUT];
                        compound_pref_label = match['prefLabel'];
                        cw_src = match[LDA.helper.LDAConstants.LDA_IN_DATASET];
                        compound_pref_label_item = cw_compound_uri;
                    } else if (LDA.helper.LDAConstants.LDA_SRC_CLS_MAPPINGS[src] == 'chemspiderValue') {
                        cs_compound_uri = match[LDA.helper.LDAConstants.LDA_ABOUT];
			            csid = cs_compound_uri.split('/').pop();
                        compound_inchi = match['inchi'];
                        compound_inchikey = match['inchikey'];
                        compound_smiles = match['smiles'];
                        cs_src = match[LDA.helper.LDAConstants.LDA_IN_DATASET];
                        var chemSpiderLink = 'http://www.chemspider.com/' + csid;
                        compound_inchi_item = chemSpiderLink;
                        compound_inchikey_item = chemSpiderLink;
                        compound_smiles_item = chemSpiderLink;
                    } else if (LDA.helper.LDAConstants.LDA_SRC_CLS_MAPPINGS[src] == 'drugbankValue') {
                        drugbank_compound_uri = match[LDA.helper.LDAConstants.LDA_ABOUT];
                        compound_drug_type = match['drugType'];
                        compound_generic_name = match['genericName'];
                        drugbank_src = match[LDA.helper.LDAConstants.LDA_ABOUT];
                    }
                }
            );

        var onAssay = item[LDA.helper.LDAConstants.LDA_ON_ASSAY];
	    var chembl_assay_uri;
	    var assay_organism;
        var assay_organism_item;
	    var target;
        var chembldAssayLink = 'https://www.ebi.ac.uk/chembldb/assay/inspect/';

        if (onAssay != null) {
		chembl_assay_uri = onAssay[LDA.helper.LDAConstants.LDA_ABOUT];
		assay_organism = onAssay['assay_organism'];
        assay_organism_item = chembldAssayLink + chembl_assay_uri.split('/').pop();
        assay_description = onAssay['description'];
        assay_description_item = chembldAssayLink + chembl_assay_uri.split('/').pop();
		target = onAssay['target'];
	    }
	   var chembl_target_uri; 
	   var target_pref_label;
       var target_pref_label_item;
       var targetMatch;
	   var target_title;
	   var target_organism;
       var target_organism_item;
	   var target_concatenated_uris;
       var chemblTargetLink = 'https://www.ebi.ac.uk/chembldb/target/inspect/';

	    if (target != null) {
		chembl_target_uri = target[LDA.helper.LDAConstants.LDA_ABOUT];
		//target_pref_label = target['prefLabel'];

        targetMatch = target['exactMatch'];
        if (targetMatch != null) {
            var targetMatchURI = targetMatch[LDA.helper.LDAConstants.LDA_ABOUT];
            target_pref_label = targetMatch['prefLabel'];
            target_pref_label_item = targetMatchURI;
            target_title = target_pref_label;
        }

		target_organism = target['target_organism'];
        target_organism_item = chemblTargetLink + chembl_target_uri.split('/').pop();
		target_concatenated_uris = target['concatenatedURIs'];
	    }

            var chemblActivityLink = 'https://www.ebi.ac.uk/ebisearch/crossrefsearch.ebi?id=' +chembl_activity_uri.split('/a').pop() + '&db=chembl-activity&ref=chembl-compound';

            var activity_activity_type_item, activity_standard_value_item, activity_standard_units_item,
                activity_relation_item;

            var activity_activity_type = item['activity_type'];
            activity_activity_type_item =  chemblActivityLink;
            var activity_standard_value = item['standardValue'];
            activity_standard_value_item = chemblActivityLink;
            var activity_standard_units = item['standardUnits'];
            activity_standard_units_item = chemblActivityLink;
            var activity_relation = item['relation'];
            activity_relation_item = chemblActivityLink;

            var record = Ext.create('LDA.model.PharmacologyPaginatedModel', {
                //for page
                page_uri:page_uri,
                next_page:next_page,
                previous_page:previous_page,
                page_size:page_size,
                start_index:start_index,

                //for compound
                compound_inchikey: compound_inchikey,
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
				csid:csid,
                compound_inchi:compound_inchi,
                compound_smiles:compound_smiles,
                chembl_assay_uri:chembl_assay_uri,
                chembl_target_uri:chembl_target_uri,
                //this is labelled assay_organism
                target_organism:target_organism,
                target_pref_label:target_pref_label,
                //this value is missing totally from compound pharmacology paginated
                assay_organism:assay_organism,
                assay_description:assay_description,
                activity_relation:activity_relation,
                activity_standard_units:activity_standard_units,
                activity_standard_value:activity_standard_value,
                activity_activity_type:activity_activity_type,

                compound_full_mwt_src:chembl_src,
                compound_pref_label_src:cw_src,
                compound_inchi_src:cs_src,
                compound_smiles_src:cs_src,
                target_organism_src:chembl_src,
                target_pref_label_src:cw_src,
                assay_organism_src:chembl_src,
                assay_description_src:chembl_src,
                activity_relation_src:chembl_src,
                activity_standard_units_src:chembl_src,
                activity_standard_value_src:chembl_src,
                activity_activity_type_src:chembl_src,

                compound_pref_label_item: compound_pref_label_item,
                activity_activity_type_item: activity_activity_type_item,
                activity_relation_item: activity_relation_item,
                activity_standard_value_item: activity_standard_value_item,
                activity_standard_units_item: activity_standard_units_item,
                compound_full_mwt_item: compound_full_mwt_item,
                compound_smiles_item: compound_smiles_item,
                compound_inchi_item: compound_inchi_item,
                compound_inchikey_item: compound_inchikey_item,
                target_pref_label_item: target_pref_label_item,
                assay_organism_item: assay_organism_item,
                assay_description_item: assay_description_item,
                target_organism_item:target_organism_item
            });


            records.push(record);

//            console.log('LDA.model.TargetPaginatedModel: TargetPharmacologyPaginated');
//            console.log(JSON.stringify(record));
        });
		var total_count = this.total_count;
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
