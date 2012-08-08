Ext.define('LSP.controller.PharmByTargetNameForm', {
        extend:'LSP.controller.grids.DynamicGrid',

    views:['pharm_by_target_name2.PharmByTargetNameGrid'],
//    stores:['LDA.store.TargetPharmacologyPaginatedStore'],

    refs:[
        {
            ref:'gridView', // reference to the view
            selector:'#pharmByTargetNameGrid'
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
            'PharmByTargetNameForm conceptWikiLookup':{
                select:this.enableSubmit
            },
            'PharmByTargetNameForm':{
                afterrender:this.prepGrid,
                historyToken:this.handleHistoryToken
            }
        });
    },


    handleHistoryToken:function (historyTokenObject) {
//
        if (historyTokenObject.u) {
            //gets ref to
            var dg = this.getGridView();
            var store = dg.getStore();
//            if (historyTokenObject.u != store.proxy.extraParams.protein_uri) {
            // Setting the value in the Concept Wiki dropdown to the one defined by the uuid
            var cw_controller = this.getController("CW.controller.ConceptWikiLookup");
            var cw_dropdown = this.getFormView().down('conceptWikiLookup');
            cw_controller.setConcept(historyTokenObject.u, cw_dropdown);
            // Setting the ops_uri for the core API search
//            store.proxy.extraParams.protein_uri = historyTokenObject.u;
            this.getFormView().setLoading(true);
            store.setURI(historyTokenObject.u);
            store.load();

//            }
        } else if (historyTokenObject.s) {
            var lookup = this.down('conceptWikiLookup');
            lookup.setRawValue(historyTokenObject.s);
            lookup.doQuery(historyTokenObject.s);
        }


    },

    prepGrid:function () {
        var grid_controller = this.getController('LSP.controller.grids.DynamicGrid');
        var grid_view = this.getGridView();
        var store = grid_view.getStore();
        store.on('load', this.storeLoadComplete, this);
        store.setPage(1);

//        var add_next_button = Ext.ComponentQuery.query('PharmByTargetNameForm dynamicgrid3 #nextRecords')[0];
//        add_next_button.on('click', function () {
//            var form_values = add_next_button.up('form').getValues();
//            grid_controller.addNextRecords(grid_view, form_values);
//        });

//        grid_view.store.proxy.actionMethods = {read:'POST'};
//        grid_view.store.proxy.api.read = grid_view.readUrl;
//        grid_view.store.proxy.params = {offset:0, limit:100};


    },

    storeLoadComplete:function (store, records, success) {
        console.log('PharmByTargetNameForm: storeLoadComplete()');
        var form = this.getFormView();
        var button = this.getSubmitButton();
        button.enable();
        form.setLoading(false);
		this.callParent();
    },

    createGridColumns:function () {
	    console.log('PharmByTargetNameForm: createGridColumns()');
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
