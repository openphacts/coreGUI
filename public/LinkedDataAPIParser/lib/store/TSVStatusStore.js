Ext.define('LDA.store.TSVStatusStore', {
    extend:'Ext.data.Store',
    model:'LDA.model.TSVStatusModel',
    storeId:'TSVStatusStore',
    pageParam: undefined,
    startParam: undefined,
    limitParam: undefined, 
    task: undefined,   
    UUID: undefined,
    runner: undefined,
    proxy: {
	type: 'ajax',
        timeout: 180000,
        url: tsv_status_url
    },

    constructor:function (config, arguments) {
	console.log('LDA.store.TSVStatusStore: constructor()');
        this.proxy.reader = Ext.create('LDA.helper.TSVStatusReader', {});
        this.callParent(arguments);
    },

    setTask: function(task) {
        this.task = task;
    },

    getTask: function() {
        return this.task;
    },

    setUUID: function(uuid) {
        this.UUID = uuid;
    },

    getUUID: function() {
        return this.UUID;
    },

    setTaskRunner: function(runner) {
        this.runner = runner;
    },

    getTaskRunner: function() {
        return this.runner;
    }
});
