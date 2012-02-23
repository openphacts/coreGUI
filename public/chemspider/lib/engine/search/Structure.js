Ext.define('CS.engine.search.Structure', {
    extend: 'CS.engine.search.Base',
    alias: 'widget.engine.structuresearch',
    constructor: function (config) {
        this.store = Ext.create('CS.store.Search', {});
        this.callParent(arguments)
    },
    doSearch: function (type, params) {
        if (type.toLowerCase() == 'exact') {
            this.store.setOperation('ExactStructureSearch');
        }
        else if (type.toLowerCase() == 'substructure') {
            this.store.setOperation('SubstructureSearch');
        }
        else if (type.toLowerCase() == 'similarity') {
            this.store.setOperation('SimilaritySearch');
        }

        this.runSearch(params);
    }
});
