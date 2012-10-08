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
		cw_dropdown_view.store.proxy.setExtraParam('limit', 10);
    },
    
   
    setConcept:function (concept_url, cw_lookup) {
	  console.log('CW.controller.ConceptWikiLookup: setConcept()');
      var concept_uuid = concept_url.match(/http:\/\/www.conceptwiki.org\/concept\/([a-f0-9\-]+)/)[1];
      var store = Ext.create('Ext.data.Store', {
        model: 'CW.model.ConceptWikiLookup',
        proxy: {
          type: 'jsonp',
          url: CW.config.Settings.getConceptUrl,
          reader: Ext.create('CW.helper.ConceptWikiJSONGetReader')
      }
      });
      store.load({
          params: {'uuid': concept_uuid },
          callback:function (records, operation, success) {
              if (success) {
                console.log("Success",records[0]);
                cw_lookup.setValue(records[0]);
              }
              else {
              
              }
          }
      },this );
    }
})
;


                
