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
        var grid = form.query('dynamicgrid2')[0];
        grid.store.proxy.actionMethods = {read: 'POST'};
        grid.store.proxy.extraParams = values;
        grid.store.proxy.api.read = '/core_api_calls/pharm_by_protein_name.json';
        grid.store.load({params: { offset: 0, limit: 100}});
        grid.store.on('load',function(){form.doLayout()});
    }
    
    
    }
);
