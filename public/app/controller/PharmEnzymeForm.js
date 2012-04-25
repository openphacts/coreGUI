Ext.define('LSP.controller.PharmEnzymeForm', {
    extend:'Ext.app.Controller',

    views:['larkc_pharm_by_target.PharmEnzymeForm', 'tree_selector_forms.EnzymeTreeForm'],

    refs:[
        {
            ref:'PEform', // reference to the view
            selector:'PharmEnzymeForm'
        },
        {
            ref:'gridView', // reference to the views grid
            selector:'PharmEnzymeForm dynamicgrid3'
        },
        {
            ref:'submitButton',
            selector:'#submitEnzymePharm_id'

        }
    ],

    init:function () {
        this.control({
            'PharmEnzymeForm button[action=enz_tree]':{
                click:this.launchEnzyme
            },
            'EnzymeTreeForm button[action=get_enzyme]':{
                click:this.getEnzyme
            },
            'EnzymeTreeForm button[action=hide_enzyme_form]':{
                click:this.hideEnzyme
            },
            'PharmEnzymeForm #submitEnzymePharm_id':{
                click:this.submitQuery
            }
        });
    },

    onLaunch:function () {
        this.control(
            {
                'PharmEnzymeForm':{
                    afterrender:this.prepGrid
                }
            });
    },

    prepGrid:function () {
        var grid_controller = this.getController('LSP.controller.grids.DynamicGrid');
        var grid_view = this.getGridView();
        var add_next_button = Ext.ComponentQuery.query('PharmEnzymeForm dynamicgrid3 #nextRecords')[0];
        add_next_button.on('click', function () {
            var form_values = add_next_button.up('form').getValues();
            grid_controller.addNextRecords(grid_view, form_values);
        });
        grid_view.store.proxy.actionMethods = {read:'POST'};
        grid_view.store.proxy.api.read = grid_view.readUrl;
        //previously multiple 'load' event listeners were being added.
        //one before every store load
        //this was slowing everything down
        var form = this.getPEform();
        var button = this.getSubmitButton();
        grid_view.store.on('load', function (this_store, records, success) {
            grid_controller.storeLoad(grid_view, success);
            form.doLayout();
            button.enable();
            grid_view.doLayout();
            grid_view.doComponentLayout();
        });
    },

    // Launch Enzyme class selection window
    launchEnzyme:function (button) {
        // Launch the window
//        var view = Ext.widget('EnzymeTreeForm');
        var view = Ext.ComponentQuery.query('EnzymeTreeForm')[0];
        if (view) {
            console.log('enzyme show');
            view.show();
        } else {
            console.log('enzyme create');
            view = Ext.widget('EnzymeTreeForm');
            view.show();
        }
    },

    hideEnzyme:function (button) {
        var view = Ext.ComponentQuery.query('EnzymeTreeForm')[0];
        if (view) {
            console.log('enzyme hide');
            view.hide();
        }
    },


    // Get selection from the enzyme tree window
    getEnzyme:function (button) {
        var tree = button.up().up().down('enzymeTree');
        var selected = tree.getView().getSelectionModel().getSelection();
        var sel_data = selected[0].data;
        var disp_field = this.getPEform().getForm().findField('enzyme_family');
        disp_field.setValue('<b>' + sel_data.ec_number + ' : ' + sel_data.name + '</b>');
        var ec_num_field = this.getPEform().getForm().findField('ec_number');
        ec_num_field.setValue(sel_data.ec_number);
        var enz_name_field = this.getPEform().getForm().findField('enz_name');
        enz_name_field.setValue(sel_data.name);
        this.hideEnzyme('');
    },

    submitQuery:function (button) {
        var form = button.up('form');
        button.disable();
        var values = form.getValues();
        var grid = this.getGridView();
        grid.store.proxy.extraParams = values;
        grid.store.load({params:{ offset:0, limit:100}});
    }
});
