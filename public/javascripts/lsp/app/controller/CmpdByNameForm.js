Ext.define('LSP.controller.CmpdByNameForm', {
    extend: 'Ext.app.Controller',

    views: ['cmpd_by_name.CmpdByNameForm'],

    init: function() {
        this.control({
            'CmpdByNameForm button[action=query_cmpd_by_name]': {
                click: this.submitQuery
                
            }
        });
    },
    
    submitQuery: function(button) {
        var form = button.up('form');
        values = form.getValues();
        grid_cmpdbyname.store.proxy.actionMethods = {read: 'POST'};
        grid_cmpdbyname.store.proxy.extraParams = values;
        grid_cmpdbyname.store.proxy.api.read = '/core_api_calls/compound_info.json';
        grid_cmpdbyname.store.load();
    }
    
    
    }
);
