Ext.define('LSP.controller.TargetByNameForm', {
    extend: 'Ext.app.Controller',

    views: ['target_by_name.TargetByNameForm'],

    init: function() {
        this.control({
            'TargetByNameForm button[action=query_target_by_name]': {
                click: this.submitQuery
                
            }
        });
    },
    
    submitQuery: function(button) {
        var form = button.up('form'),
        values = form.getValues();
        grid_targetbyname.store.proxy.actionMethods = {read: 'POST'};
        grid_targetbyname.store.proxy.extraParams = values;
    //    grid_targetbyname.store.proxy.api.read = '/sparql_endpoint/target_by_name.json';
         grid_targetbyname.store.proxy.api.read = '/core_api_calls/protein_info.json';
        //grid.store.proxy.create;
        grid_targetbyname.store.load();
    }
    
    
    }
);
