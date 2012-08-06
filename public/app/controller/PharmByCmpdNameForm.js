Ext.define('LSP.controller.PharmByCmpdNameForm', {
        extend:'Ext.app.Controller',
        views:['pharm_by_cmpd_name2.PharmByCmpdNameGrid'],

        refs:[
            {
                ref:'gridView', // reference to the view
                selector:'#pharmByCmpdNameGrid'
            },
            {
                ref:'formView',
                selector:'PharmByCmpdNameForm'
            },
            {
                ref:'submitButton',
                selector:'#pharmByCmpdSubmit_id'
            },
            {
                ref:'nextRecordsButton',
                selector:'PharmByCmpdNameForm dynamicgrid3 #nextRecords'
            } ,
            {
                ref:'lookup',
                selector:'#pharmByCmpdLookup'
            }
        ],

        init:function () {
			console.log('PharmByCmpdNameForm: init()');
            this.control({
                'PharmByCmpdNameForm button[action=query_pharm_by_cmpd_name]':{
                    click:this.submitQuery
                },
                'PharmByCmpdNameForm conceptWikiCompoundLookup':{
                    select:this.enableSubmit
                },
                'PharmByCmpdNameForm':{
                    historyToken:this.handleHistoryToken,
                    afterrender:this.prepGrid
                }
            });
        },

        handleHistoryToken:function (historyTokenObject) {
            console.log('PharmByCmpdNameForm: handleHistoryToken()');
            if (historyTokenObject.u) {
                var dg = this.getGridView();
                var store = dg.store;
                if (historyTokenObject.u != store.proxy.extraParams.uri) {
                    store.proxy.extraParams.uri = historyTokenObject.u;
                    this.getFormView().setLoading(true);
                    store.load();
                }
            } else if (historyTokenObject.s) {
                var lookup = this.getLookup();
                lookup.setRawValue(historyTokenObject.s);
                lookup.doQuery(historyTokenObject.s);
            }
        },

        prepGrid:function () {
            console.log('PharmByCmpdNameForm: prepGrid()');
            // var grid_controller = this.getController('LSP.controller.grids.DynamicGrid');
            var grid_view = this.getGridView();
	        var store = grid_view.getStore();
	        store.on('load', this.storeLoadComplete, this);
	        store.setPage(1);
            // var add_next_button = this.getNextRecordsButton();
            // add_next_button.on('click', function () {
            //     var form_values = add_next_button.up('form').getValues();
            //     grid_controller.addNextRecords(grid_view, form_values);
            // });
            // 
            // grid_view.store.proxy.actionMethods = {read:'POST'};
            // grid_view.store.proxy.api.read = grid_view.readUrl;
//            grid_view.store.proxy.params = {offset:0, limit:100};

            // grid_view.store.on('load', this.storeLoadComplete, this);
        },

        storeLoadComplete:function (store, records, success) {
            console.log('PharmByCmpdNameForm: storeLoadComplete()');
            // var controller = this.getController('LSP.controller.grids.DynamicGrid');
            // var grid_view = this.getGridView();
            var form = this.getFormView();
            var button = this.getSubmitButton();

            // controller.storeLoad(grid_view, success);
            // form.doLayout();
            button.enable();
            // grid_view.doLayout();
            // grid_view.doComponentLayout();
            form.setLoading(false);
        },

        createGridColumns:function () {
	        console.log('PharmByCmpdNameForm: createGridColumns()');
            var grid_controller = this.getController('LSP.controller.grids.DynamicGrid');
            var this_gridview = this.getGridView();
            grid_controller.storeLoad(this_gridview);
        },

        enableSubmit:function (compoundLookup) {
			console.log('PharmByCmpdNameForm: enableSubmit()');
            var form = this.getFormView();
            var button = form.query('button[action=query_pharm_by_cmpd_name]')[0];
            button.enable();
        },

        submitQuery:function (button) {
			console.log('PharmByCmpdNameForm: submitQuery()');
            var form = button.up('form');
            button.disable();
            var values = form.getValues();
            Ext.History.add('!p=PharmByCmpdNameForm&u=' + values.compound_uri);
        }
    }
);
