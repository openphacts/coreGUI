Ext.define('LSP.controller.PharmByCmpdNameForm', {
        extend:'Ext.app.Controller',
        views:['pharm_by_cmpd_name2.PharmByCmpdNameForm'],

        refs:[
            {
                ref:'gridView', // reference to the view
                selector:'#pharmByCmpdGrid_id'
            },
            {
                ref:'formView',
                selector:'PharmByCmpdNameForm'
            },
            {
                ref:'submitButton',
                selector:'#pharmByCmpdSubmit_id'

            }
        ],

        init:function () {

            this.control({
                'PharmByCmpdNameForm button[action=query_pharm_by_cmpd_name]':{
                    click:this.submitQuery
                },
                'PharmByCmpdNameForm conceptWikiCompoundLookup':{
                    select:this.enableSubmit
                }
            });
        },


        onLaunch:function () {
            this.control(
                {
                    'PharmByCmpdNameForm':{
                        afterrender:this.prepGrid
                    }
                });
        },

        prepGrid:function () {
            var grid_controller = this.getController('LSP.controller.grids.DynamicGrid');
            var grid_view = this.getGridView();
            var add_next_button = Ext.ComponentQuery.query('PharmByCmpdNameForm dynamicgrid3 #nextRecords')[0];
            add_next_button.on('click', function () {
                var form_values = add_next_button.up('form').getValues();
                grid_controller.addNextRecords(grid_view, form_values);
            });
            grid_view.store.proxy.actionMethods = {read:'POST'};
            grid_view.store.proxy.api.read = grid_view.readUrl;
            //previously multiple 'load' event listeners were being added.
            //one before every store load
            //this was slowing everything down
            var form = this.getFormView();
            var button = this.getSubmitButton();
            grid_view.store.on('load', function (this_store, records, success) {
                grid_controller.storeLoad(grid_view, success);
                form.doLayout();
                button.enable();
                grid_view.doLayout();
                grid_view.doComponentLayout();
            });
        },

        createGridColumns:function () {
            var grid_controller = this.getController('LSP.controller.grids.DynamicGrid');
            var this_gridview = this.getGridView();
            grid_controller.storeLoad(this_gridview);
        },

        enableSubmit:function (compoundLookup) {
            var form = this.getFormView();
            var button = form.query('button[action=query_pharm_by_cmpd_name]')[0];
            button.enable();
        },

        submitQuery:function (button) {
            var form = button.up('form');
            button.disable();
            var values = form.getValues();
            var grid = this.getGridView();
            grid.store.proxy.extraParams = values;
            grid.store.load({params:{ offset:0, limit:100}});
        }


    }
);
