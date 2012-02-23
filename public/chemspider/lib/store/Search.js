Ext.define('CS.store.Search', {
    extend: 'Ext.data.Store',
    requires: ['CS.model.Search', 'CS.config.Settings'],
    model: 'CS.model.Search',
    operation: '',
    constructor: function () {
        this.callParent(arguments);

        if(this.operation != '')
            this.setOperation(this.operation);
    },
    setOperation: function (operation) {
        this.operation = operation;

        this.setProxy({
            type: 'jsonp',
            url: CS.config.Settings.baseUrl + '/JSON.ashx?op=' + this.operation,
            reader: {
                type: 'xml'
            }
        });
    }
});
