Ext.define('CW.view.ConceptWikiLookup', {
    extend:'Ext.form.ComboBox',
    alias:'widget.conceptWikiLookup',
    requires:[
        'CW.model.ConceptWikiLookup',
        'CW.helper.ConceptWikiJSONReader',
        'CW.store.ConceptWikiLookup'
    ],
    cwTagUuid: 'pleaseConfigure[cwConceptTagUuid:]',
    store: undefined,
    // search boks configs
    forceSelection:true,
    allowBlank:false,
    typeAhead:true,
    typeAheadDelay: 250,
    queryDelay: 250,
    queryCaching: false,
    queryParam: 'q',
    queryMode:'remote',
    valueField:'ops_uri',
    displayField:'pref_label',
    name: 'ops_uri',  // can be overwritten in view config
    minChars:4,
    hideTrigger:true,
    forceSelection:true,
    allowBlank:false,
    typeAhead:false,
    emptyText:'Start typing...',
    margin:'5 5 5 5',
    width:700,
    fieldLabel: 'Overwrite this in config',
    labelWidth:120,
    listConfig:{
        loadingText:'Searching...',
        emptyText:'Nothing found which matches your text, you may need to enter more text or try something different.',
        getInnerTpl:function () {
            return '<p><span style="font-family: verdana; color: grey; "><small>Match: {match}</small></span><br/><b>{pref_label}</b> <a href="http://ops.conceptwiki.org/wiki/#/concept/{uuid}/view" target="_blank">(definition)</a></p>';
        }                                                                                                                                                                                        
    },
    autoSelect: false,
    listeners: {
        beforequery: function() {
            this.store.setQueryValue(this.rawValue);
            this.store.setComboBox(this);
        }
}, initComponent: function() {
        this.addEvents('matchingconcept');
        this.callParent(arguments);
    },
});
         
