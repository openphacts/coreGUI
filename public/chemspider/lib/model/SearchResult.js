Ext.define('CS.model.SearchResult', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'CSID', 
        convert: function (value, record) { return record.raw; }
    }]
});
