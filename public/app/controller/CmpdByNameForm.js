Ext.define('LSP.controller.CmpdByNameForm', {
    extend: 'Ext.app.Controller',
    models:['Compound'],
    stores:['Compounds'],
    views: ['cmpd_by_name.CmpdByNameSingleDisplayForm'],

    refs: [
        {
            //ref: 'gridView',  // reference to the view
            //selector: '#CmpdByNameGrid_id'
            ref: 'cmpdByNameSingleDisplayForm',
            selector: 'CmpdByNameSingleDisplayForm'
        },
        {
            ref: 'formView',
            selector: 'CmpdByNameForm'
        },
        {
            ref: 'submitButton',
            selector: '#TargetByNameSubmit_id'
        
        }
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
        var tp = this.getCmpdByNameSingleDisplayForm();
        tp.startLoading();
        var values = form.getValues();
        //var grid = this.getGridView();

        var store = this.getCompoundsStore();
        store.proxy.extraParams.compound_uri = values;

        store.load({
            scope:this,
            callback:function (records, operation, success) {
                if (success) {
                    console.log('successful response from server');
                    if (records.length > 0) {
                        console.log('more than zero records returned records.length=' + records.length);
                        tp.showRecord(records[0]);
                    } else {
                        console.log('zero records returned records.length=' + records.length);
                        tp.showNoDataMessage();
                    }
                }
                else {
                    console.log('unsuccessful response from server');
                    tp.showErrorMessage();
                }
            }
        });
        tp.endLoading();
        button.enable();

        /*
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
        */

    }
    }
);
