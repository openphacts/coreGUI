Ext.define('CW.controller.ConceptWikiLookup', {
    extend:'Ext.app.Controller',
    models: ['CW.model.ConceptWikiLookup'],
    views:['CW.view.ConceptWikiLookup'],
    stores:['CW.store.ConceptWikiLookup'],
    
    init:function () {
        this.control({
            'conceptWikiLookup':{
                afterrender:this.prepProxy
            }
        });
    },

     // Fires when the box is rendered the first time
     prepProxy:function (cw_dropdown_view) {
        // cw_dropdown_view.store.proxy.extraParams = cw_dropdown_view.store.proxy.extraParams + {uuid: cw_dropdown_view.cwTagUuid, limit: 10};
		cw_dropdown_view.store.proxy.setExtraParam('uuid', cw_dropdown_view.cwTagUuid);
                //TODO add this back in when it is in the lda api for concept wiki
		//cw_dropdown_view.store.proxy.setExtraParam('limit', 10);
    },
    
   
    setConcept:function (concept_url, cw_lookup, sender) {
	  console.log('CW.controller.ConceptWikiLookup: setConcept()');
      var concept_uuid = concept_url.match(/http:\/\/www.conceptwiki.org\/concept\/([a-f0-9\-]+)/)[1];
      var store = Ext.create('Ext.data.Store', {
        model: 'CW.model.ConceptWikiLookup',
        proxy: {
          type: 'jsonp',
          url: CW.config.Settings.getConceptUrl,
          reader: Ext.create('CW.helper.ConceptWikiJSONGetReader'),
          noCache: false,
          limitParam: undefined,
          startParam: undefined,
          pageParam: undefined,
          callbackKey: '_callback',
          extraParams: {
              '_format': 'json', 
              'app_id': app_id,
              'app_key': app_key
          }
      }
      });
      store.load({
          params: {'uuid': concept_uuid },
          callback:function (records, operation, success) {
              if (success) {
                cw_lookup.setValue(records[0]);
                sender.setTypeName(records[0].data.pref_label)
              }
              else {
              
              }
          }
      },this );
    }
})
;


                
