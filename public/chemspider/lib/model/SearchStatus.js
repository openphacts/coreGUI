Ext.define('CS.model.SearchStatus', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'Count', mapping: 'Count' },
        { name: 'Message', mapping: 'Message' },
        { name: 'Progress', mapping: 'Progress' },
        { name: 'Status', mapping: 'Status' },
        { name: 'Elapsed', mapping: 'Elapsed' }
    ]
});
