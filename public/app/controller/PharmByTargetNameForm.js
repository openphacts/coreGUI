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
            },
            'PharmByTargetNameForm':{
                afterrender:this.prepGrid,
                historyToken:this.handleHistoryToken
            }
        });
    },


    handleHistoryToken:function (historyTokenObject) {
        if (historyTokenObject.u) {
            //gets ref to
            var dg = this.getGridView();
            var store = dg.store;
            if (historyTokenObject.u != store.proxy.extraParams.protein_uri) {
                store.proxy.extraParams.protein_uri = historyTokenObject.u;
                this.getFormView().setLoading(true);
                store.load();
            }
        } else if (historyTokenObject.s) {
            var lookup = this.down('conceptWikiProteinLookup');
            lookup.setRawValue(historyTokenObject.s);
            lookup.doQuery(historyTokenObject.s);
        }


    },

    prepGrid:function () {
        console.log('PharmByTargetNameForm: prepGrid()');
        var grid_controller = this.getController('LSP.controller.grids.DynamicGrid');
        var grid_view = this.getGridView();
        var add_next_button = Ext.ComponentQuery.query('PharmByTargetNameForm dynamicgrid3 #nextRecords')[0];
        add_next_button.on('click', function () {
            var form_values = add_next_button.up('form').getValues();
            grid_controller.addNextRecords(grid_view, form_values);
        });

        grid_view.store.proxy.actionMethods = {read:'POST'};
        grid_view.store.proxy.api.read = grid_view.readUrl;
        grid_view.store.proxy.params = {offset:0, limit:100};

        grid_view.store.on('load', this.storeLoadComplete, this);
    },

    storeLoadComplete:function (store, records, success) {
        console.log('PharmByTargetNameForm: storeLoadComplete()');
        var controller = this.getController('LSP.controller.grids.DynamicGrid');
        var grid_view = this.getGridView();
        var form = this.getFormView();
        var button = this.getSubmitButton();

        controller.storeLoad(grid_view, success);
        form.doLayout();
        button.enable();
        grid_view.doLayout();
        grid_view.doComponentLayout();
        form.setLoading(false);
    },

    createGridColumns:function () {
        var grid_controller = this.getController('LSP.controller.grids.DynamicGrid');
        var this_gridview = this.getGridView();
        grid_controller.storeLoad(this_gridview);
    },


    enableSubmit:function (proteinLookup) {
        var button = this.getSubmitButton();
        button.enable();
    },

    submitQuery:function (button) {
        var form = button.up('form');
        button.disable();
        var values = form.getValues();
        Ext.History.add('!p=PharmByTargetNameForm&u=' + values.protein_uri);
    }
})
;
