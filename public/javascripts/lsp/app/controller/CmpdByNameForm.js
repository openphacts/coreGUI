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
        var grid = form.query('dynamicgrid2')[0];
        grid.store.proxy.actionMethods = {read: 'POST'};
        grid.store.proxy.extraParams = values;
        grid.store.proxy.api.read = '/core_api_calls/compound_info.json';
        grid.store.load({params: { offset: 0, limit: 100}});
        grid.store.on('load',function(){form.doLayout()});
        
//         grid_cmpdbyname.store.proxy.actionMethods = {read: 'POST'};
//         grid_cmpdbyname.store.proxy.extraParams = values;
//         grid_cmpdbyname.store.proxy.api.read = '/core_api_calls/compound_info.json';
//         grid_cmpdbyname.store.load({params: { offset: 0, limit: 100}});
    }
    
    
    }
);
