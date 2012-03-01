Ext.define('LSP.controller.CmpdByNameForm', {
    extend: 'Ext.app.Controller',

    views: ['cmpd_by_name.CmpdByNameForm'],

    refs: [
        {
            ref: 'gridView',  // reference to the view
            selector: '#CmpdByNameGrid_id'
        },
        {
            ref: 'formView',
            selector: 'CmpdByNameForm',
        },
        {
            ref: 'submitButton',
            selector: '#TargetByNameSubmit_id',
        
        },
    ],

    init: function() {
        this.control({
            'CmpdByNameForm button[action=query_cmpd_by_name]': {
                click: this.submitQuery
            },
            'CmpdByNameForm conceptWikiCompoundLookup': {
                select: this.enableSubmit
            }
        });
    },
    
    enableSubmit: function(compundLookup) {
        var form = this.getFormView();
        var button = this.getSubmitButton();
        button.enable();
    },
    
    submitQuery: function(button) {
        var form = button.up('form');
        button.disable();
        var values = form.getValues();
        var grid = this.getGridView();
        grid_controller = this.getController('LSP.controller.grids.DynamicGrid');
        grid.store.proxy.actionMethods = {read: 'POST'};
        grid.store.proxy.extraParams = values;
        grid.store.proxy.api.read = grid.readUrl;
        grid.store.load({params: { offset: 0, limit: 100}});
        grid.store.on('load',function(){
          grid_controller.storeLoad(grid);
          form.doLayout();
          button.enable();
        });
    },
    }
);
