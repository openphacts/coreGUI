Ext.define('CW.store.ConceptWikiLookup', {
    extend: 'Ext.data.Store',
    requires: ['CW.model.ConceptWikiLookup', 'CW.config.Settings'],
    queryValue: undefined,
    comboBox: undefined,
    model: 'CW.model.ConceptWikiLookup',
	proxy: {
        type: 'jsonp',
        timeout: 5000,
        url: CW.config.Settings.searchByTagUrl,
        reader: Ext.create('CW.helper.ConceptWikiJSONReader')
    },
    constructor: function () {
		console.log('CW.store.ConceptWikiLookup: constructor()');
        this.callParent(arguments);
    },
     listeners: {
            load: function () {
                var me = this;
                Ext.each(this.data.items, function (item, index) {
                    if(item.data.pref_label == this.store.queryValue) {
                        me.getComboBox().setValue(item);
                        me.getComboBox().fireEvent('matchingconcept');
                    }
                });
            }
    },
    setQueryValue: function(queryValue) {
        this.queryValue = queryValue;
    },

    getQueryValue: function(){
        return this.queryValue;
    },
    setComboBox: function(comboBox) {
        this.comboBox = comboBox;
    },

    getComboBox: function(){
        return this.comboBox;
    }

});
