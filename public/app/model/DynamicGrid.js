Ext.define('LSP.model.DynamicGrid', {
    extend: 'Ext.data.Model',
    config: {
      fields: [],
      proxy: {
          type: 'ajax',
          timeout: '180000',
          api: {
              read: ''  // We configure this in the form controller
          },
          reader: {
              type: 'json',
              root: 'objects',
              totalProperty: 'totalCount'
          }
      }
    
    
    },
    
    constructor: function(config) {
      this.initConfig(config);
      return this;  
    }
    
});
