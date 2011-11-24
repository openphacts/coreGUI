Ext.define('LSP.controller.PharmByCmpdNameForm', {
    extend: 'Ext.app.Controller',

    views: ['pharm_by_cmpd_name2.PharmByCmpdNameForm'],

    init: function() {
        this.control({
            'PharmByCmpdNameForm button[action=query_pharm_by_cmpd_name]': {
                click: this.submitQuery                
            }
        });
    },
    
    submitQuery: function(button) {
        var form = button.up('form');
        values = form.getValues(); 
        grid_pharmbycompoundname.store.proxy.actionMethods = {read: 'POST'};
        grid_pharmbycompoundname.store.proxy.extraParams = values;
        grid_pharmbycompoundname.store.proxy.api.read = '/core_api_calls/pharm_by_compound_name.json';
        //grid.store.proxy.create;
        grid_pharmbycompoundname.store.load();
    }
    
    
    }
);
