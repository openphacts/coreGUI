Ext.define('LSP.model.DynamicGrid', {
    extend: 'Ext.data.Model',
    fields: [],
   
    proxy: {
        type: 'ajax',
        api: {
            read: ''
        },
        reader: {
            type: 'json',
            root: 'objects',
            totalProperty: 'totalCount'
        }
    }

});