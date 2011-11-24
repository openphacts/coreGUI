Ext.define('LSP.controller.pmidTextMiningHitsForm', {
extend: 'Ext.app.Controller',

    views: ['LSP.view.textmining.pmidTextMiningHitsForm'],

    init: function() {
        this.control({
            'pmidTextMiningHits button[action=query]': {
                click: this.submitQuery                
            }
        });
    },
    
    submitQuery: function(button) {
        var form = button.up('form');
        values = form.getValues();
        Ext.Ajax.request({
          url: 'core_api_calls/pmid2title.json',
          params: {
              pubmed_uri: values.pmid_uri
          },
          success: function(response){
              var title = response.responseText;
              //console.log(Ext.JSON.decode(title));
              form.form.findField('title').setValue(Ext.JSON.decode(title));
          }
        // process server response here
      });

    }}
);
