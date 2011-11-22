Ext.define('LSP.controller.PharmByTargetNameForm', {
    extend: 'Ext.app.Controller',

    views: ['pharm_by_target_name2.PharmByTargetNameForm'],

    init: function() {
        this.control({
            'PharmByTargetNameForm button[action=query_pharm_by_target_name]': {
                click: this.submitQuery
                
            }
        });
    },
    
    submitQuery: function(button) {
        var form = button.up('form');
        values = form.getValues();
        grid_pharmbytargetname.store.proxy.actionMethods = {read: 'POST'};
        grid_pharmbytargetname.store.proxy.extraParams = values;
        grid_pharmbytargetname.store.proxy.api.read = '/core_api_calls/pharm_by_protein_name.json';
        //grid.store.proxy.create;
        grid_pharmbytargetname.store.load();
    }
    
    
    }
);
