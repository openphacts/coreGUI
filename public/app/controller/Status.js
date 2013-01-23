Ext.define('LSP.controller.Status', {
    extend: 'Ext.app.Controller',
    views: ['api_status.Status'],
    refs: [{
	    ref: 'CWImage',
	    selector: '#status_form_cw_image'
    }],

    init: function() {
        cw_lookup = Ext.create('CW.store.ConceptWikiLookup', {});
	cw_lookup.proxy.setExtraParam('uuid', '07a84994-e464-4bbf-812a-a4b96fa3d197');
	cw_lookup.proxy.setExtraParam('limit', 1);
        var me = this;
        cw_lookup.load({
          params: {'q': 'aspi', 'branch' :'4' },
          callback:function (records, operation, success) {
              if (success) {
                console.log("Success",records[0]);
                me.getCWImage().setSrc('./assets/tick.png');
                me.getCWImage().setVisible(true);
              }
              else {
                console.log("CW boom");
              }
          }
      },this );
    }
});
