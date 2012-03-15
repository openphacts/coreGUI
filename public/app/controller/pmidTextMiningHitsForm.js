Ext.define('LSP.controller.pmidTextMiningHitsForm', {
extend: 'Ext.app.Controller',

    views: ['textmining.pmidTextMiningHitsForm'],
    stores: ['DynamicGrid'],
    
    refs: [
        {
            ref: 'tmForm',
            selector: 'pmidTextMiningHitsForm'
        }
    ],
    
    init: function() {
        this.control({
            'pmidTextMiningHits button[action=query]': {
                click: this.submitQuery                
            },
            'pmidTextMiningHits pmidLookup': {
                select: this.enableSubmit
            }
        });
    },

    enableSubmit: function(pmidLookup) {
        var form = pmidLookup.up('form');
        var button = form.query('button[action=query]')[0];
        button.enable();
    },
    
    submitQuery: function(button) {
        var form = button.up('form');
        button.disable();
        values = form.getValues();
        
        var grid = form.query('dynamicgrid2')[0];
        grid.store.proxy.extraParams = {pubmed_uri: values.pmid_uri};
        grid.store.proxy.api.read = 'core_api_calls/pmid2concepts.json';
        grid.store.load();
        grid.store.on('load',function(){
              form.doLayout();
              button.enable();
              });
        
        Ext.Ajax.request({
          url: 'core_api_calls/pmid2title.json',
          params: {
              pubmed_uri: values.pmid_uri
          },
          success: function(response){
              var title = response.responseText;
              form.form.findField('title').setValue(Ext.JSON.decode(title).title);
          }
      });
      Ext.Ajax.request({
          url: 'core_api_calls/pmid2abstract.json',
          params: {
              pubmed_uri: values.pmid_uri
          },
          success: function(response){
              var abst = response.responseText;
              form.form.findField('abstract').setValue(Ext.JSON.decode(abst).abstract);
          }
      });
//       Ext.Ajax.request({
//           url: 'core_api_calls/pmid2concepts.json',
//           params: {
//               pubmed_uri: values.pmid_uri
//           },
//           success: function(response){
//               var hits = response.responseText;
//               //form.form.findField('abstract').setValue(Ext.JSON.decode(abst).abstract);
//           }
//       });
    }}
);
