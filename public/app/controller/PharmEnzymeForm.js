Ext.define('LSP.controller.PharmEnzymeForm', {
    extend: 'Ext.app.Controller',

    views: ['larkc_pharm_by_target.PharmEnzymeForm','tree_selector_forms.EnzymeTreeForm'],

    refs: [
        {
            ref: 'PEform',  // reference to the view
            selector: 'PharmEnzymeForm'
        }
    ],

    init: function() {
        this.control({
            'PharmEnzymeForm button[action=enz_tree]': {
                click: this.launchEnzyme
            },
            'EnzymeTreeForm button[action=get_enzyme]': {
                click: this.getEnzyme
            },
            'PharmEnzymeForm button[action=query]': {
                click: this.submitQuery
            }
        });
    },
    // Launch Enzyme class selection window
    launchEnzyme: function(button) {
        // Launch the window
        var view = Ext.widget('EnzymeTreeForm');            
    },
    
    // Get selection from the enzyme tree window
    getEnzyme: function(button) {
        var tree    = button.up().up().down('enzymeTree');
        var selected = tree.getView().getSelectionModel().getSelection();
        var sel_data = selected[0].data;
        var disp_field = this.getPEform().getForm().findField('enzyme_family');
        disp_field.setValue( '<b>' + sel_data.ec_number + ' : ' + sel_data.name + '</b>');
        var ec_num_field = this.getPEform().getForm().findField('ec_number');
        ec_num_field.setValue(sel_data.ec_number);
        var enz_name_field = this.getPEform().getForm().findField('enz_name');
        enz_name_field.setValue(sel_data.name);
        button.up('EnzymeTreeForm').close();   
    },
    
    submitQuery: function(button) {
        var form    = button.up('form');
        var values = form.getValues();
        
        var grid = form.query('dynamicgrid2')[0];
        grid.store.proxy.extraParams = values;
        grid.store.proxy.api.read = '/core_api_calls/pharm_enzyme_fam.json';
        grid.setTitle('Inhibitors for enzymes in class:  ' + values.ec_number + ' => ' + values.enz_name);
        grid.store.load();
        grid.store.on('load',function(){form.doLayout()});
        
    }
    
    
    }
);
