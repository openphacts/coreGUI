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

Ext.define('LSP.controller.grids.DynamicGrid', {
    extend:'Ext.app.Controller',

    views:[
        'dynamicgrid.DynamicGrid'
    ],

    models:['DynamicGrid'],

    refs:[
            //{
              //  ref:'gridView',
              //  selector:'dynamicgrid'
            //}
        ],
    filters: [],

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
			this.filters.push(filter);
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
		var index = controller.filters.indexOf(filter.filterModel);
		controller.filters.splice(index, 1);
	},

	addFilterForm: function(button) {
		console.log('DynamicGrid: addFilterForm()');
		value = this.getFilterContainer().down('#activity_combobox_id').getValue();
		// view = Ext.widget('FilterPanel');
		hide = this.getFilterContainer().hidden;
		if (hide) {
			this.getFilterContainer().setVisible(true);
		} else {
			this.getFilterContainer().setVisible(false);
		}
	},

    prepSDFile2:function (sdf_prep_button) {
        var gridview = sdf_prep_button.up('dynamicgrid');
        var grid_store = gridview.store;
        var items = grid_store.data.items;

        var compoundStore = Ext.create('CS.store.Compound');
        var item_count = items.length;
        var success_count = 0;
        var fail_count = 0;
        sdf_prep_button.setText('SD-file preparing...');
        Ext.each(items, function (item) {
			//TODO some of these items can be null, catch them and ignore (or report?) 
            var csid = item.data.cs_compound_uri.match(/http:\/\/rdf.chemspider.com\/(\d+)/)[1];
            if (!isNaN(parseInt(csid))) {
                if (item.molfile === undefined || item.molfile.length < 30) {
                    compoundStore.load({
                        params:{ 'csids[0]':csid },
                        callback:function (records, operation, success) {
                            if (success) {
                                success_count++;
                                compound = compoundStore.first().raw.Mol;
                                item.molfile = compound;
                                sdf_prep_button.setText('SD-File ' + (100 * success_count / item_count).toFixed(0) + '% ready');
                                if (success_count === item_count) {
                                    sdf_prep_button.setText('SD-File ready! Click ->');
                                    gridview.down('#sdfDownload_id').enable();
                                }
                            }
                            else {
                                fail_count++;
                            }
                        }
                    }, this);
                }
                else {
                    success_count++;
                    sdf_prep_button.setText('SD-File ' + (100 * success_count / item_count).toFixed(0) + '% ready');
                }
            }
            else {
                fail_count++
            }

        })

    },

    prepSDFile:function (sdf_prep_button) {
        var gridview = sdf_prep_button.up('dynamicgrid');
        var grid_store = gridview.store;
        var items = grid_store.data.items;

        //    var compoundStore = Ext.create('CS.store.Compound');
        var item_count = items.length;
        var success_count = 0;
        var fail_count = 0;
        sdf_prep_button.setText('SD-file preparing...');
        csid_hash = {};
        csid_molfile_hash = {};
        Ext.each(items, function (item) {
            var csid = item.data.cs_compound_uri.match(/http:\/\/rdf.chemspider.com\/(\d+)/)[1];
            if (!isNaN(parseInt(csid))) {
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
        for (var csid in csid_hash) {
            var csid_records = csid_hash[csid]; // record indices with this csid
            var has_molfile = (csid_molfile_hash[csid] !== undefined);   // true or false if molfile exists in store allready
            if (has_molfile) {
                var idx_len = csid_records.length;
                for (i = 0; i < idx_len; i++) {
                    var row = grid_store.getAt(csid_records[i]);
                    if (row.molfile == undefined) {
                        row.molfile = csid_molfile_hash[csid];
                    }
                }
                this.updateSDFStatus(sdf_prep_button, grid_store);
            }
            else {
                this.getMolfile(csid, csid_records, grid_store, sdf_prep_button);
            }
        }
    },

    updateSDFStatus:function (button, store) {
        var items = store.data.items;
        var item_count = items.length;
        var missing_count = 0;
        var success_count = 0;
        Ext.each(items, function (item) {
            if (item.molfile === undefined) {
                missing_count++;
            }
        });
        success_count = item_count - missing_count;
        button.setText('SD-File ' + (100 * success_count / item_count).toFixed(0) + '% ready');
        if (success_count === item_count) {
            button.setText('SD-File ready! Click ->');
            button.up('grid').down('#sdfDownload_id').enable();
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

    storeLoadComplete:function (store, records, success) {
		console.log('DynamicGrid: storeLoadComplete()');
		gridView = this.getGridView();
		gridView.setTitle(gridView.gridBaseTitle + ' - Total Records: ' + gridView.getStore().getTotalCount());
}
});
