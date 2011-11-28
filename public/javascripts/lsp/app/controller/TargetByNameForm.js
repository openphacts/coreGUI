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
        var grid = form.query('dynamicgrid2')[0];
        grid.store.proxy.actionMethods = {read: 'POST'};
        grid.store.proxy.extraParams = values;
        grid.store.proxy.api.read = '/core_api_calls/protein_info.json';
        grid.store.load({params: { offset: 0, limit: 100}});
        grid.store.on('load',function(){form.doLayout()});
   
    }
    
    
    }
);
