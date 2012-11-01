Ext.define('LDA.store.SimSearchLocalStore', {
   extend: 'Ext.data.Store',
   model: 'LDA.model.SimModel',
   storeId: 'simSearchLocalStore',
   proxy: {
        type: 'memory',
        reader: {
            type: 'json'
        }
   }
});
