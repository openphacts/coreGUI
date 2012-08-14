Ext.define('LSP.controller.PharmByTargetNameForm', {
        extend:'LSP.controller.grids.DynamicGrid',

    views:['pharm_by_target_name2.PharmByTargetNameForm', 'pharm_by_target_name2.PharmByTargetNameGrid'],
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
		console.log('PharmByTargetNameForm: init()');
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
	    if (historyTokenObject.u) {
            var dg = this.getGridView();
            var store = dg.store;
            if (historyTokenObject.u != store.proxy.extraParams.uri) {
                store.proxy.extraParams.uri = historyTokenObject.u;
				store.proxy.reader.uri = historyTokenObject.u;
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
        var grid_controller = this.getController('LSP.controller.grids.DynamicGrid');
        var grid_view = this.getGridView();
        var store = grid_view.getStore();
        store.on('load', this.storeLoadComplete, this);
        // store.setPage(1);

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
		var grid_view = this.getGridView();
		var grid_store = grid_view.getStore();
		countStore = Ext.create('LDA.store.TargetPharmacologyCountStore');
		countStore.uri = this.getGridView().getStore().proxy.reader.uri;
		//if the proxy does not have a total count then we need to fetch it from the LDA
		//only need to do this the first time
		if (this.getGridView().getStore().proxy.total_count == null) {
			countStore.load(function(records, operation, success) {
		    	console.log('loaded records ' + success);
				total = operation.response.result.primaryTopic.compoundPharmacologyTotalResults;
				grid_store.setTotalCount(total);
				grid_store.proxy.reader.total_count = total;
				grid_view.down('#pager_id').updatePager();	
				if (grid_store.getCount() == grid_store.getTotalCount()) {
					gridView.setTitle(grid_view.gridBaseTitle + ' - All ' + grid_store.getCount() + ' records loaded');            
				} else {
					grid_view.setTitle(grid_view.gridBaseTitle + ' - Records loaded: ' + grid_store.getCount() + ' - Total Records: ' + grid_store.getTotalCount());
				}	
			});
		}
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
