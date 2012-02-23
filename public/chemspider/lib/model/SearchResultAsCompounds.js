Ext.define('CS.model.SearchResultAsCompounds', {
    extend: 'Ext.data.Model',
    id: 'CSID',
    fields: [
        { name: 'CSID', mapping: 'CSID' },
        { name: 'Name', mapping: 'Name' },
        { name: 'MF', mapping: 'MF' }
    ]
});
