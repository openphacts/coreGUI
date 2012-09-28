Ext.define('CW.store.ConceptWikiLookup', {
    extend: 'Ext.data.Store',
    requires: ['CW.model.ConceptWikiLookup', 'CW.config.Settings'],
    model: 'CW.model.ConceptWikiLookup',
    constructor: function () {
        this.callParent(arguments);
        this.setProxy({
            type: 'jsonp',
            timeout: 5000,
            url: CW.config.Settings.searchByTagUrl,
            reader: Ext.create('CW.helper.ConceptWikiJSONReader')
        });
    }
});