Ext.define('LDA.helper.LDAConstants', {
    singleton: true,
    LDA_BASE_URL: 'http://ops2.few.vu.nl',
    LDA_IN_DATASET: 'inDataset',
    LDA_ABOUT: '_about',
    LDA_LABEL: 'label',
    LDA_COMPOUND_PHARMACOLOGY_COUNT: 'compoundPharmacologyTotalResults',
    LDA_TARGET_PHARMACOLOGY_COUNT: 'targetPharmacologyTotalResults',
    LDA_ENZYME_FAMILY_COUNT: 'enzymePharmacologyTotalResults',
    LDA_PERMITTED_ACTIVITY_TYPES: ['IC50', 'Activity'],
    LDA_ON_ASSAY: 'hasAssay',
    LDA_ON_TARGET: 'hasTarget',
    LDA_EXACT_MATCH: 'exactMatch',
    LDA_PRIMARY_TOPIC: 'primaryTopic',
    LDA_RESULT: 'result',
    LDA_ACTIVITY: 'activity',
    LDA_FOR_MOLECULE: 'hasMolecule',
    LDA_ASSAY_TARGET: 'target',
    LDA_ITEMS: 'items',
    LDA_PAGINATED_NEXT: 'next',
    LDA_PAGINATED_PREVIOUS: 'prev',
    LDA_PAGINATED_PAGE_SIZE: 'itemsPerPage',
    LDA_PAGINATED_START_INDEX: 'startIndex',
    LDA_TARGET_OF_ASSAY: 'targetOfAssay',
    LDA_ASSAY_OF_ACTIVITY: 'assayOfActivity',
    LDA_SRC_CLS_MAPPINGS: {
        'http://www.conceptwiki.org': 'conceptWikiValue',
        'http://www.conceptwiki.org/': 'conceptWikiValue',
        'http://data.kasabi.com/dataset/chembl-rdf': 'chemblValue',
        'http://www.ebi.ac.uk/chembl' : 'chemblValue',
        'http://www4.wiwiss.fu-berlin.de/drugbank': 'drugbankValue',
        'http://linkedlifedata.com/resource/drugbank': 'drugbankValue',
        'http://www.chemspider.com': 'chemspiderValue',
        'http://www.chemspider.com/': 'chemspiderValue',
        'http://rdf.chemspider.com': 'chemspiderValue',
        'http://rdf.chemspider.com/': 'chemspiderValue',
        'http://ops.rsc-us.org' : 'chemspiderValue',
        'http://purl.uniprot.org' : 'uniprotValue',
        'http://purl.uniprot.org/' : 'uniprotValue'
    },
    LDA_PROVENANCE_OFF: 'Off',
    LDA_PROVENANCE_COLOUR: 'Colour',
    LDA_PROVENANCE_ICON: 'Icon',
    LDA_PROVENANCE_TEXT: 'Text',
    //this sets default provenance mode
    //TODO this should be updated by user cookie, user choice or set in Viewport when running LSP.
    LDAProvenanceMode: 'Colour',
    LDADataItems: {
        "compound_smiles": "smiles",
        "activity_standard_value": "std_value",
        "compound_inchikey": "inchiKey",
        "activity_activity_type": "std_type",
        "activity_standard_units": "std_unit",
        "target_pref_label": "target_name",
        "activity_relation": "relation",
        "compound_inchi": "inchi",
        "compound_full_mwt": "molweight",
        "cw_compound_uri": "compound_cw",
        "compound_pref_label": "compound_name",
        "target_organism": "target_organisms",
	"target_title": "target_names",
	"assay_description": "assay_description",
	"assay_organism": "assay_organism",
	"activity_pubmed_id": "pmid",
        "targets": "target_name",
        "target_organisms": "target_organisms"
    },
    LDAUnits: {
	    "percentage": "%",
	    "microgram_per_milliliter": "μg/ml",
	    "nanomolar": "nM",
	    "micromolar": "μM"
}
});
