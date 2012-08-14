/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 26/06/2012
 * Time: 21:55
 * To change this template use File | Settings | File Templates.
 */
LDA_IN_DATASET = 'inDataset';
LDA_ABOUT = '_about';
LDA_COMPOUND_PHARMACOLOGY_COUNT = 'compoundPharmacologyTotalResults';
LDA_TARGET_PHARMACOLOGY_COUNT = 'targetPharmacologyTotalResults';
LDA_ENZYME_FAMILY_COUNT = 'enzymePharmacologyTotalResults';
LDA_PERMITTED_ACTIVITY_TYPES = ['IC50', 'Activity'];
LDA_ON_ASSAY = 'onAssay';
LDA_EXACT_MATCH = 'exactMatch';
LDA_PRIMARY_TOPIC = 'primaryTopic';
LDA_RESULT = 'result';
LDA_ACTIVITY = 'activity';
LDA_FOR_MOLECULE = 'forMolecule';
LDA_ASSAY_TARGET = 'target';
LDA_ITEMS = 'items';
LDA_PAGINATED_NEXT = 'next';
LDA_PAGINATED_PREVIOUS = 'prev';
LDA_PAGINATED_PAGE_SIZE = 'itemsPerPage';
LDA_PAGINATED_START_INDEX = 'startIndex';
LDA_TARGET_OF_ASSAY = 'targetOfAssay';
LDA_ASSAY_OF_ACTIVITY = 'assayOfActivity';
LDA_SRC_CLS_MAPPINGS = {
    'http://www.conceptwiki.org':'conceptWikiValue',
    'http://www.conceptwiki.org/':'conceptWikiValue',
    'http://data.kasabi.com/dataset/chembl-rdf':'chemblValue',
    'http://www4.wiwiss.fu-berlin.de/drugbank':'drugbankValue',
    'http://linkedlifedata.com/resource/drugbank':'drugbankValue',
    'http://www.chemspider.com':'chemspiderValue',
    'http://www.chemspider.com/':'chemspiderValue',
    'http://rdf.chemspider.com':'chemspiderValue',
    'http://rdf.chemspider.com/':'chemspiderValue'
};
LDA_PROVENANCE_OFF = 'Off';
LDA_PROVENANCE_COLOUR = 'Colour';
LDA_PROVENANCE_ICON = 'Icon';
LDA_PROVENANCE_TEXT = 'Text';
//this sets default provenance mode
//this should be updated by user cookie, user choice or set in Viewport when running LSP.
LDAProvenanceMode = LDA_PROVENANCE_COLOUR;