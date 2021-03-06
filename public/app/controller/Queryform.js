Ext.define('LSP.controller.Queryform', {
    extend:'Ext.app.Controller',

    views:['sparqlform.Queryform'],

    init:function () {
        this.control({
            'queryform button[action=query]':{
                click:this.submitQuery
            }
        });
    },

    submitQuery:function (button) {
        var form = button.up('form');
        button.disable();
        var values = form.getValues();
        var sparql_pane = form.up('queryform');
        var grid = sparql_pane.query('dynamicgrid3')[0];
        grid.store.proxy.actionMethods = {read:'POST'};
        grid.store.proxy.extraParams = values;
        grid.store.proxy.api.read = '/core_api_calls/sparql.json';
        grid.store.load();
        grid.store.on('load', function (this_store, records, success) {
            grid_controller.storeLoad(grid, success);
            form.doLayout();
            button.enable();
        });

    }
});
