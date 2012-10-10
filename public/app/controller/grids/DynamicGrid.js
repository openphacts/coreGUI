/*########################################################################################
 #
 #  Copyright H. Lundbeck A/S
 #  This file is part of LSP4All.
 #
 #  LSP4All is free software; you can redistribute it and/or modify
 #  it under the terms of the GNU General Public License as published by
 #  the Free Software Foundation; either version 2 of the License, or (at
 #  your option) any later version.
 #
 #  LSP4All IS MADE AVAILABLE FOR DISTRIBUTION WITHOUT ANY FORM OF WARRANTY TO THE
 #  EXTENT PERMITTED BY APPLICABLE LAW.  THE COPYRIGHT HOLDER PROVIDES THE PROGRAM \"AS IS\"
 #  WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT
 #  LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 #  PURPOSE. THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM LIES
 #  WITH THE USER.  SHOULD THE PROGRAM PROVE DEFECTIVE IN ANY WAY, THE USER ASSUMES THE
 #  COST OF ALL NECESSARY SERVICING, REPAIR OR CORRECTION. THE COPYRIGHT HOLDER IS NOT
 #  RESPONSIBLE FOR ANY AMENDMENT, MODIFICATION OR OTHER ENHANCEMENT MADE TO THE PROGRAM
 #  BY ANY USER WHO REDISTRIBUTES THE PROGRAM SO AMENDED, MODIFIED OR ENHANCED.
 #
 #  IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING WILL THE
 #  COPYRIGHT HOLDER BE LIABLE TO ANY USER FOR DAMAGES, INCLUDING ANY GENERAL, SPECIAL,
 #  INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR INABILITY TO USE THE
 #  PROGRAM (INCLUDING BUT NOT LIMITED TO LOSS OF DATA OR DATA BEING RENDERED INACCURATE
 #  OR LOSSES SUSTAINED BY THE USER OR THIRD PARTIES OR A FAILURE OF THE PROGRAM TO
 #  OPERATE WITH ANY OTHER PROGRAMS), EVEN IF SUCH HOLDER HAS BEEN ADVISED OF THE
 #  POSSIBILITY OF SUCH DAMAGES.
 #
 #  You should have received a copy of the GNU General Public License
 #  along with this program; if not, write to the Free Software
 #  Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.
 #
 ########################################################################################*/
//TODO move this to a constants file
CSV_EXPORT_LIMIT = 10000;
Ext.define('LSP.controller.grids.DynamicGrid', {
    extend:'Ext.app.Controller',

    views:[
        'dynamicgrid.DynamicGrid'
    ],

    models:['DynamicGrid'],

    refs:[
            {
                ref:'gridView',
                selector:'dynamicgrid'
            }
        ],
	
    init:function () {
		console.log('DynamicGrid: init()');
        this.control({
            'dynamicgrid':{
                itemdblclick:function (view, record, item, index, e, opts) {
                    if (record.data.cs_compound_uri !== undefined) {
                        var csid = record.data.cs_compound_uri.match(/http:\/\/rdf.chemspider.com\/(\d+)/)[1];
                        if (parseInt(csid) >= 1) {
                            Ext.create('CS.view.CompoundWindow').showCompound(csid);
                        }
                    }
                },
                itemcontextmenu:function (view, record, itemHTMLElement, index, eventObject, eOpts) {
                    eventObject.preventDefault();
//                    console.log('itemcontextmenu');
                    this.getGridView().showMenu(eventObject.getX(), eventObject.getY(), record);
                }
            },
            'dynamicgrid toolbar #sdfDownloadProxy_id':{
                click:this.prepSDFile
            },
            'dynamicgrid toolbar #csvDownloadProxy_id':{
                click:this.prepCSVFile
            }
        })
    },
    onLaunch:function () {
    },


    testThis:function (args) {
    },

	addCompletedFilter: function(button) {
		console.log('DynamicGrid: addCompletedFilter()');
		activity_value = this.getFilterContainer().down('#activity_combobox_id').getValue();
		conditions_value = this.getFilterContainer().down('#conditions_combobox_id').getValue();
		value_value = this.getFilterContainer().down('#value_textfield_id').getValue();
		//unit_value = this.getFilterContainer().down('#unit_combobox_id').getValue();
		// TODO unit value check && unit_value != null
		if (activity_value != null && conditions_value != null && value_value != "") {
			filter = Ext.create('LSP.model.Filter', {
				activity: activity_value,
				condition: conditions_value,
				value: value_value//,
				//unit: unit_value
			});
			this.getFilters().push(filter);
			// this is the only way I could find to reference the controller from the model and the view
			filter.controller = this;

			filter_view = Ext.create('LSP.view.filter.CompletedFilter', {});
			filter_view.down('#activityLabel_id').setText(activity_value);
			filter_view.down('#conditionsLabel_id').setText(conditions_value);
			filter_view.down('#valueLabel_id').setText(value_value);
			//filter_view.down('#unitLabel_id').setText(unit_value);
			// tell the filter what model it is using so we can get back to the controller when the
			// filter is removed from the view
			filter.filterView = filter_view;
			this.getFormView().down('#completedFilterContainer_id').add(filter_view);
			this.getFormView().down('#completedFilterContainer_id').setVisible(true);
			filter_view.filterModel = filter;
			filter_view.on({
				close: this.filterClosed
			});
			this.setActivityFilters(activity_value, conditions_value, value_value);
			// currently only 1 filter can be added at a time
			this.getFormView().down('#addCompletedFilter_id').setDisabled(true);
		} else {
			Ext.MessageBox.show({
				title: 'Error',
				msg: 'Filter options cannot be empty.<br\>Please select a value for each of the filter options.',
				buttons: Ext.MessageBox.OK,
				icon: Ext.MessageBox.ERROR
			});
		}
	},

	setActivityFilters: function(activity_value, conditions_value, value_value) {
		console.log('DynamicGrid: setActivityFilters()');
			var dg = this.getGridView();
			var store = dg.store;
			store.setActivityType(activity_value);
			store.setActivityValue(value_value);
			store.setActivityCondition(conditions_value);
	},

/* When a filter is removed from the view also
		// remove the model from the controller
		*/
	filterClosed: function(filter) {
		console.log('DynamicGrid: filterClosed()');
		controller = filter.filterModel.controller;
		var dg = controller.getGridView();
		var store = dg.store;
		var exportStore = dg.exportStore;
		exportStore.setActivityType("");
		exportStore.setActivityValue("");
		exportStore.setActivityCondition("");
		store.setActivityType("");
		store.setActivityValue("");
		store.setActivityCondition("");
		var index = controller.getFilters().indexOf(filter.filterModel);
		controller.getFilters().splice(index, 1);
		controller.getFormView().down('#addCompletedFilter_id').setDisabled(false);
	},

	addFilterForm: function(button) {
		console.log('DynamicGrid: addFilterForm()');
		// view = Ext.widget('FilterPanel');
		hide = this.getFilterContainer().hidden;
		if (hide) {
			this.getFilterContainer().setVisible(true);
		} else {
			this.getFilterContainer().setVisible(false);
		}
	},

    prepCSVFile:function (csv_prep_button) {
        var gridview = csv_prep_button.up('dynamicgrid');
        var store_count = gridview.store.totalCount;
        if(store_count > CSV_EXPORT_LIMIT){alert("The OPS Explorer currently only allows for the export of " + CSV_EXPORT_LIMIT + " records. The current search returns " + store_count + " records. Please restrict your search and try again.");}     
        else{
	  gridview.exportStore.proxy.timeout = '180000';
          gridview.exportStore.proxy.url = gridview.store.proxy.url;
	  gridview.exportStore.proxy.extraParams = gridview.store.proxy.extraParams;
          // and attaching it to the grid view
          gridview.up('form').setLoading( "Preparing download of " + store_count + " records. Please wait..."); 
          // now we load the grid
	  if (this.getFilters().length != 0) {
		gridview.exportStore.setActivityType(this.getFilters()[0].data.activity);
			gridview.exportStore.setActivityValue(this.getFilters()[0].data.value);
			gridview.exportStore.setActivityCondition(this.getFilters()[0].data.condition);
	  };
	  // we only want 1 page with all results but ext seems to send multi requests for the same data
	  // as if it was in an infinite grid. Setting buffered to false prevents this
          gridview.exportStore.buffered = false;
          gridview.exportStore.load({
              params:{ _page:1, _pageSize:store_count},
              callback:function (records, operation, success) {
                  if (success) {
                    gridview.up('form').setLoading(false);
                    csv_prep_button.setText('CSV-File ready! Click ->');
                    csv_prep_button.up('grid').down('#csvDownload_id').enable();
                    gridview.down('#sdfDownloadProxy_id').enable();
                    gridview.exportCSVReady = true;                   
                  }
                  else {
                     gridview.up('form').setLoading(false);
                     alert("We are sorry, something went wrong. Please try again later.");
                  }
              }},this
        
        );
           
    }   
    },

    
    prepSDFile:function (sdf_prep_button) {
        var this_controller = this;
        var update_count = 0;
        var gridview = sdf_prep_button.up('dynamicgrid');
        var store_count = gridview.store.totalCount;
          
        if(gridview.exportCSVReady) {
          gridview.up('form').setLoading( "Preparing download of " + store_count + " molfiles. Please wait..."); 
          var exportStore = gridview.getExportStore();
          var items = exportStore.data.items;
          var item_count = items.length;
          var success_count = 0;
          var fail_count = 0;
          sdf_prep_button.setText('SD-file preparing...');
          csid_hash = {};
          csid_molfile_hash = {};
          var total_csid_count = 0;
          Ext.each(items, function (item) {
              var csid = item.data.csid;
              if (!isNaN(parseInt(csid))) {
                  total_csid_count++;
                  if (item.molfile !== undefined && item.molfile.length > 30) {
                      csid_molfile_hash[csid] = item.molfile;
                  }
                  if (csid_hash[csid] === undefined) {
                      csid_hash[csid] = [item.index];
                  }
                  else {
                      csid_hash[csid].push(item.index);
                  }
              }

          });
          var batch_count = 0;
          var csid_batches = [];
          var local_batch = [];
          var uniq_csid_count = 0;
          for (var csid in csid_hash) {
              local_batch.push(csid);
              batch_count++;
              uniq_csid_count++;
              if(batch_count >= 100){
                  batch_count = 0;
                  csid_batches.push(local_batch);
                  local_batch = [];
              }
          }
          csid_batches.push(local_batch);
          for (var idx in csid_batches) {
               param_array = ["serfilter:'Compound[CSID|Mol]'"];
               for (var iidx in csid_batches[idx]) {
                  param_array.push("'csids[" + iidx + "]':" + csid_batches[idx][iidx]);
               }
               param_json = "{"+ param_array.join(',')+"}";
               var compoundStore = Ext.create('CS.store.Compound');
               compoundStore.proxy.timeout = '180000';
               compoundStore.proxy.startParam = undefined;
               compoundStore.proxy.limitParam = undefined;
               compoundStore.proxy.pageParam = undefined;
                compoundStore.load({
                    params: Ext.JSON.decode(param_json),
                    callback:function (records, operation, success) {
                        if (success) {
                          Ext.Array.each(records, function (rec, index) {
                          // Here we add the molfiles to the exportStore for later export
                            var record_csid = rec.data.CSID;
                            var record_molfile = rec.data.Mol;
                            var csid_records = csid_hash[record_csid]; // record indices with this csid
                            var idx_len = csid_records.length;
                            for (i = 0; i < idx_len; i++) {
                               var row = exportStore.getAt(csid_records[i]);
                               if (row.molfile == undefined) {
                                 row.molfile = record_molfile;
                                 update_count++;
                                }
                            }
                             });
                            this_controller.updateSDFStatus(sdf_prep_button, exportStore, total_csid_count);   
                        }
                        else {
                            gridview.up('form').setLoading(false);
                            alert("Error, sorry the structure retrievel failed. Please try again later.");
                            // CHEMSIDER JSONP TIMES OUT!!! HANDLER..?
                        }
                    }
                }, this);
          }
        }
        else {   // else what..?
                 alert("Error!");
        }
        
        
    },


    updateSDFStatus:function (button, store, total_csid_count) {
        var items = store.data.items;
        var item_count = items.length;
        var missing_count = 0;
        var success_count = 0;
        Ext.each(items, function (item) {
            if (item.molfile !== undefined) {
                success_count++;
            }
        });
        button.setText('SD-File ' + (100 * success_count / total_csid_count).toFixed(0) + '% ready');
        if (success_count >= 0.98*total_csid_count) {
            button.setText('SD-File ready! Click ->');
            button.up('grid').down('#sdfDownload_id').enable();
            button.up('grid').exportSDFReady = true;
            button.up('form').setLoading(false);
        }
    },

    getMolfile:function (csid, row_idxs, grid_store, sdf_prep_button) {
        var me = this;
        var compoundStore = Ext.create('CS.store.Compound');
        var idx_len = row_idxs.length;
        compoundStore.load({
            params:{ 'csids[0]':csid },
            callback:function (obsrecords, operation, success) {
                if (success) {
                    var compound = compoundStore.first().raw.Mol;
                    for (i = 0; i < idx_len; i++) {
                        var item = grid_store.getAt(row_idxs[i]);
                        item.molfile = compound;
                    }
                    me.updateSDFStatus(sdf_prep_button, grid_store);
                }
                else {
                    // CHEMSIDER JSONP TIMES OUT!!! HANDLER..?
                }
            }
        }, this);

    },
    

    prepGrid:function () {
	console.log(this.$className + ': prepGrid()');
        var grid_view = this.getGridView();
        var store = grid_view.getStore();
        store.on('prefetch', this.storeLoadComplete, this);
    },

    storeLoadComplete:function (store, records, success) {
		console.log(this.$className + ': storeLoadComplete()');
		grid_view = this.getGridView();
		grid_store = grid_view.getStore();
		if (success) {
			grid_view.down('#sdfDownload_id').disable();
			grid_view.down('#sdfDownloadProxy_id').setText('Prepare SD-file download');
//			grid_view.down('#sdfDownloadProxy_id').enable();
			this.getSubmitButton().enable();
			grid_view.setLoading(false);
			grid_view.setTitle(grid_view.gridBaseTitle + ' - Total Records: ' + grid_store.getTotalCount());
		} else {
			console.log(this.$className + ': possible timeout for with uri ' + grid_store.proxy.url);
			this.getSubmitButton().enable();
			grid_view.setLoading(false);
			Ext.MessageBox.show({
				title: 'Info',
				msg: 'We are sorry but the OPS system returned an error.',
				buttons: Ext.MessageBox.OK,
				icon: Ext.MessageBox.INFO
			});
		}
    },

	fetchTotalResults: function() {
		console.log('DynamicGrid: fetchTotalResults() for ' + this.$className);
		try {
		var grid_view = this.getGridView();
		var grid_store = grid_view.getStore();
		var form = this.getFormView();
		var button = this.getSubmitButton();
		this.resetDownload();
		countStore = this.getCountStore();
		countStore.uri = grid_store.proxy.reader.uri;
		// TODO only one filter can be used at the moment, need to change code for multiple
		// at some point
		// Count with filters was slow, easier to grab all the results and count them here
		// code kept in case needed in future
		if (this.getFilters().length>0) {
			countStore.setActivityType(this.getFilters()[0].data.activity);
			countStore.setActivityValue(this.getFilters()[0].data.value);
			countStore.setActivityCondition(this.getFilters()[0].data.condition);
		}
		//	allResultsStore = Ext.create('LDA.store.CompoundPharmacologyStore');
		//	allResultsStore.proxy.extraParams.uri = grid_store.proxy.extraParams.uri;
		//	allResultsStore.setActivityType(this.filters[0].data.activity);
		//	allResultsStore.setActivityValue(this.filters[0].data.value);
		//	allResultsStore.setActivityCondition(this.filters[0].data.condition);	
		//	allResultsStore.load(function(records, operation, success) {
		//		total = records.length;
		//		grid_store.proxy.reader.total_count = total;
		//	// we have the total number of results now and the proxy reader knows what it is so
		//	// fetch the first page of results
		//	if (total == 0) {
		//		grid_view.setTitle(grid_view.gridBaseTitle + ' - No records found within OPS for this search!');
		//		grid_view.down('#sdfDownload_id').disable();
		//		grid_view.down('#sdfDownloadProxy_id').setText('Prepare SD-file download');
		//		grid_view.down('#sdfDownloadProxy_id').disable();
		//		button.enable();
		//		grid_view.setLoading(false);
		//		Ext.MessageBox.show({
		//			title: 'Info',
		//			msg: 'The OPS system does not contain any data that match this search.',
		//			buttons: Ext.MessageBox.OK,
		//			icon: Ext.MessageBox.INFO
		//		});
		//	} else {
		//		// for pagianted grid use this
		//		// grid_store.load();
		//		grid_store.guaranteeRange(0, 49);
		//	}
		//	});	
		//} else {
		countStore.load(function(records, operation, success) {
			if (success) {
				total = operation.response.result.primaryTopic[this.countNode];
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
						title: 'Info',
						msg: 'The OPS system does not contain any data that match this search.',
						buttons: Ext.MessageBox.OK,
						icon: Ext.MessageBox.INFO
					});
				} else {
					// for paginated grid use this
					// grid_store.load();
					grid_store.guaranteeRange(0, 49);
				}
			} else {
				grid_view.setTitle(grid_view.gridBaseTitle + ' - We are sorry but the OPS system returned an error!');
				grid_view.down('#sdfDownload_id').disable();
				grid_view.down('#sdfDownloadProxy_id').setText('Prepare SD-file download');
				grid_view.down('#sdfDownloadProxy_id').disable();
				button.enable();
				grid_view.setLoading(false);
				Ext.MessageBox.show({
					title: 'Info',
					msg: 'We are sorry but the OPS system returned an error.',
					buttons: Ext.MessageBox.OK,
					icon: Ext.MessageBox.INFO
				});
			}
		});
		//}
		
		} catch (exception) {
			console.log('DynamicGrid: exception fetching results for ' + this.$className + 'with uri ' + grid_store.proxy.uri);
			Ext.MessageBox.show({
				title: 'Info',
				msg: 'We are sorry but the OPS system returned an error.',
				buttons: Ext.MessageBox.OK,
				icon: Ext.MessageBox.INFO
			});
		}
		
	},

    enableSubmit:function (lookup) {
        this.getSubmitButton().enable();
    },
    // 
    resetDownload:function () {
        var gridview = this.getGridView();
        gridview.exportCSVReady = false;
        gridview.exportSDFReady = false;

        gridview.getExportStore().removeAll(true);
        gridview.down('#csvDownloadProxy_id').setText('Prepare full result set download');
        gridview.down('#csvDownload_id').disable();
        gridview.down('#sdfDownloadProxy_id').setText('Prepare SD-file download');
        gridview.down('#sdfDownload_id').disable();
    },

    onProvChange :function(field, newVal, oldVal) {
        var dg = this.getGridView();
        dg.toggleProv(newVal['prov']);
		dg.getView().refresh();
    },

    getFilters: function() {
	if (this.filters == null) {
		this.filters = new Array();
	}
	return this.filters;
    }
    
});
