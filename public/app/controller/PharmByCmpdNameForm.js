Ext.define('LSP.controller.PharmByCmpdNameForm', {
    extend: 'Ext.app.Controller',

    views: ['pharm_by_cmpd_name2.PharmByCmpdNameForm'],

    init: function() {
        this.control({
            'PharmByCmpdNameForm button[action=query_pharm_by_cmpd_name]': {
                click: this.submitQuery                
            },
            'PharmByCmpdNameForm compoundLookup': {
                select: this.enableSubmit
            }
        });
    },
    enableSubmit: function(compoundLookup) {
        var form = proteinLookup.up('form');
        var button = form.query('button[action=query_pharm_by_cmpd_name]')[0];
        button.enable();
    },
    
    submitQuery: function(button) {
        var form = button.up('form');
        button.disable();
        values = form.getValues();
        var grid = form.query('dynamicgrid2')[0];
        grid.store.proxy.actionMethods = {read: 'POST'};
        grid.store.proxy.extraParams = values;
        grid.store.proxy.api.read = '/core_api_calls/pharm_by_compound_name.json';
        grid.store.load({params: { offset: 0, limit: 100}});
        grid.store.on('load',function(){form.doLayout();button.enable();});
    }
    
    
    }
);
