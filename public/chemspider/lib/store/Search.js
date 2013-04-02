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
            timeout: 90000,
            url: CS.config.Settings.baseUrl + this.operation,
            reader: {
                type: 'xml'
            },
            noCache: false,
            limitParam: undefined,
            startParam: undefined,
            pageParam: undefined,
            callbackKey: '_callback',
            extraParams: {
	        '_format': 'json', 
                'app_id': app_id,
                'app_key': app_key
            }
        });
    }
});
