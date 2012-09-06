Ext.define('LSP.controller.PharmByTargetNameForm', {
        extend:'LSP.controller.grids.DynamicGrid',

    views:['pharm_by_target_name2.PharmByTargetNameForm', 'pharm_by_target_name2.PharmByTargetNameScrollingGrid'],
    // views:['pharm_by_target_name2.PharmByTargetNameForm', 'pharm_by_target_name2.PharmByTargetNameGrid'],
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

        }, {
		ref: 'filterContainer',
		selector: 'PharmByTargetNameForm #filterContainer_id'
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
            },
	    'PharmByTargetNameForm button[action=add_filter_form]': {
		click: this.addFilterForm
	     },
	     'PharmByTargetNameForm button[action=add_completed_filter]': {
		click: this.addCompletedFilter
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
                dg.setLoading(true);
				this.fetchTotalResults();
                // store.load();
            }
        } else if (historyTokenObject.s) {
            var lookup = this.getLookup();
            lookup.setRawValue(historyTokenObject.s);
            lookup.doQuery(historyTokenObject.s);
        }
    },

	fetchTotalResults:function() {
		console.log('PharmByTargetNameForm: fetchTotalResults()');
		var grid_view = this.getGridView();
		var grid_store = grid_view.getStore();
		var form = this.getFormView();
        var button = this.getSubmitButton();
		countStore = Ext.create('LDA.store.TargetPharmacologyCountStore');
		countStore.uri = grid_store.proxy.reader.uri;
		if (this.filters.length>0) {
			countStore.setActivityType(this.filters[0].data.activity);
			countStore.setActivityValue(this.filters[0].data.value);
			countStore.setActivityCondition(this.filters[0].data.condition);
		}
			countStore.load(function(records, operation, success) {
				total = operation.response.result.primaryTopic.targetPharmacologyTotalResults;
				grid_store.proxy.reader.total_count = total;
				// we have the total number of results now and the proxy reader knows what it is so
				// fetch the first page of results
				if (total == 0) {
					grid_view.setTitle(grid_view.gridBaseTitle + ' - No records found within OPS for this search!');
					grid_view.down('#sdfDownload_id').disable();
					grid_view.down('#sdfDownloadProxy_id').setText('Prepare SD-file download');
			        grid_view.down('#sdfDownloadProxy_id').disable();
			        button.enable();
			        grid_view.setLoading(false);
						            Ext.MessageBox.show({
						                title:'Info',
						                msg:'The OPS system does not contain any data that match this search.',
						                buttons:Ext.MessageBox.OK,
						                icon:Ext.MessageBox.INFO
						            });
						        } else {
					// for paginated grid use this
					// grid_store.load();
					grid_store.guaranteeRange(0,49);
				}		
			});
	},

    prepGrid:function () {
        var grid_controller = this.getController('LSP.controller.grids.DynamicGrid');
        var grid_view = this.getGridView();
        var store = grid_view.getStore();
        store.on('prefetch', this.storeLoadComplete, this);
        // store.on('load', this.storeLoadComplete, this);
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
		grid_view = this.getGridView();
		grid_view.down('#sdfDownload_id').disable();
		grid_view.down('#sdfDownloadProxy_id').setText('Prepare SD-file download');
        grid_view.down('#sdfDownloadProxy_id').enable();
        var form = this.getFormView();
        var button = this.getSubmitButton();
        button.enable();
        grid_view.setLoading(false);
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
});
