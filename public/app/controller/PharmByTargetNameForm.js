Ext.define('LSP.controller.PharmByTargetNameForm', {
    extend:'Ext.app.Controller',

    views:['pharm_by_target_name2.PharmByTargetNameForm'],

    refs:[
        {
            ref:'gridView', // reference to the view
            selector:'#pharmByTargetGrid_id'
        },
        {
            ref:'formView',
            selector:'PharmByTargetNameForm'
        },
        {
            ref:'submitButton',
            selector:'#pharmByTargetSubmit_id'

        }
    ],

    init:function () {
        this.control({
            'PharmByTargetNameForm button[action=query_pharm_by_target_name]':{
                click:this.submitQuery
            },
            'PharmByTargetNameForm conceptWikiProteinLookup':{
                select:this.enableSubmit
            }
        });
    },

    onLaunch:function () {
        this.control(
            {
                'PharmByTargetNameForm':{
                    afterrender:this.prepGrid
                }
            });
    },

    prepGrid:function () {
        var grid_controller = this.getController('LSP.controller.grids.DynamicGrid');
        var grid_view = this.getGridView();
        var add_next_button = Ext.ComponentQuery.query('PharmByTargetNameForm dynamicgrid3 #nextRecords')[0];
        add_next_button.on('click', function () {
            var form_values = add_next_button.up('form').getValues();
            grid_controller.addNextRecords(grid_view, form_values);
        });
    },

    createGridColumns:function () {
        var grid_controller = this.getController('LSP.controller.grids.DynamicGrid');
        var this_gridview = this.getGridView();
        grid_controller.storeLoad(this_gridview);
    },


    enableSubmit:function (proteinLookup) {
        var form = this.getFormView();
        var button = this.getSubmitButton();
        button.enable();
    },

    submitQuery:function (button) {
        var form = button.up('form');
        button.disable();
        var values = form.getValues();
        var grid = this.getGridView();
        var grid_controller = this.getController('LSP.controller.grids.DynamicGrid');    // NB this was not a var but global - check!
        grid.store.proxy.actionMethods = {read:'POST'};
        grid.store.proxy.extraParams = values;
        grid.store.proxy.api.read = grid.readUrl;
        grid.store.load({params:{ offset:0, limit:100}});
        grid.store.on('load', function (this_store, records, success) {
            grid_controller.storeLoad(grid, success);
            form.doLayout();
            button.enable();
        });
    }


});
