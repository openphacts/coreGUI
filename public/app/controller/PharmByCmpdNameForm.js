Ext.define('LSP.controller.PharmByCmpdNameForm', {
        extend:'LSP.controller.grids.DynamicGrid',
        views:['pharm_by_cmpd_name2.PharmByCmpdNameForm', 'pharm_by_cmpd_name2.PharmByCmpdNameScrollingGrid'],
        // views:['pharm_by_cmpd_name2.PharmByCmpdNameForm', 'pharm_by_cmpd_name2.PharmByCmpdNameGrid'],
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
					store.proxy.reader.uri = historyTokenObject.u;
                    dg.setLoading(true);
					//loading the store is done after the total results are fetched
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
			console.log('PharmByCmpdNameForm: fetchTotalResults()');
			var grid_view = this.getGridView();
			var grid_store = grid_view.getStore();
			var form = this.getFormView();
	        var button = this.getSubmitButton();
			countStore = Ext.create('LDA.store.CompoundPharmacologyCountStore');
			countStore.uri = grid_store.proxy.reader.uri;
				countStore.load(function(records, operation, success) {
					total = operation.response.result.primaryTopic.compoundPharmacologyTotalResults;
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
						// for pagianted grid use this
						// grid_store.load();
						grid_store.guaranteeRange(0,49);
					}		
				});
		},

        prepGrid:function () {
            console.log('PharmByCmpdNameForm: prepGrid()');
            var grid_view = this.getGridView();
	        var store = grid_view.getStore();
	        store.on('prefetch', this.storeLoadComplete, this);
	        // store.setPage(1);
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
			grid_view = this.getGridView();
			grid_view.down('#sdfDownload_id').disable();
			grid_view.down('#sdfDownloadProxy_id').setText('Prepare SD-file download');
	        grid_view.down('#sdfDownloadProxy_id').enable();
            // var controller = this.getController('LSP.controller.grids.DynamicGrid');
            // var grid_view = this.getGridView();
            var form = this.getFormView();
            var button = this.getSubmitButton();

            // controller.storeLoad(grid_view, success);
            // form.doLayout();
            button.enable();
            // grid_view.doLayout();
            // grid_view.doComponentLayout();
            grid_view.setLoading(false);
			this.callParent();
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
