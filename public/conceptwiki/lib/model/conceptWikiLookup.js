Ext.define('CW.model.ConceptWikiLookup', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'match', mapping: 'match', type: 'string' },
        { name: 'uuid', mapping: 'uuid', type: 'string' },
        { name: 'ops_uri', mapping: 'ops_uri', type: 'string' },
        { name: 'pref_label', mapping: 'pref_labels', type:'string'},
        { name: 'alt_labels', mapping: 'alt_labels', type: 'string' },
        { name: 'uuid', mapping: 'uuid', type: 'string' },
        { name: 'concept_type_tags', mapping: 'uuid_tags', type:'string'},
        { name: 'pref_url', mapping: 'pref_url', type: 'string' },
    ],
    getSomething: function () {
        if (this.something == null) this.parseSomething();

        return this.something;
    },
    parseSomething: function () {
        this.something = new Array();
        for (var i = 0; i < this.data.something.length; i++) {
            var syn = this.data.tags[i];
            if (syn.length == 1)
                this.something.push(syn);
        }
    }
});
