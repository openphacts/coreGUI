Ext.define('LSP.controller.pmidTextMiningHitsForm', {
extend: 'Ext.app.Controller',

    views: ['LSP.view.textmining.pmidTextMiningHitsForm'],
    stores: ['LSP.store.DynamicGrid'],
    
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
            }
        });
    },
    
    submitQuery: function(button) {
        var form = button.up('form');
        console.log(form);
        values = form.getValues();
        
        var grid = form.query('dynamicgrid2')[0];
        grid.store.proxy.extraParams = {pubmed_uri: values.pmid_uri};
        grid.store.proxy.api.read = 'core_api_calls/pmid2concepts.json';
        grid.store.load();
        grid.store.on('load',function(){form.doLayout()});
        
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
//               console.log(hits);
//               //form.form.findField('abstract').setValue(Ext.JSON.decode(abst).abstract);
//           }
//       });
    }}
);
