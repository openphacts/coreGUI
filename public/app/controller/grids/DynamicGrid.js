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
        'dynamicgrid.DynamicGrid3'
    ],

    models:['DynamicGrid'],

    refs:[
            {
                ref:'gridView',
                selector:'dynamicgrid3'
            }
        ],

    init:function () {
		console.log('DynamicGrid: init()');
        this.control({
            'dynamicgrid3':{
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
            'dynamicgrid3 toolbar #sdfDownloadProxy_id':{
                click:this.prepSDFile
            }
        })
    },
    onLaunch:function () {
    },


    testThis:function (args) {
    },

    addNextRecords:function (this_gridview, extraParams) {
		console.log('DynamicGrid: addNextRecords()');
        this_gridview.down('#sdfDownloadProxy_id').setText('Prepare SD-file download');
        this_gridview.down('#sdfDownload_id').disable();
        var this_store = this_gridview.store;
        var this_controller = this;
        var temp_store = Ext.create('LSP.store.DynamicGrid');
        // configure copy store:
        temp_store.proxy.extraParams = extraParams;
        temp_store.proxy.api.read = this_gridview.readUrl;
        temp_store.proxy.actionMethods = this_store.proxy.actionMethods;
        var offset = this_store.data.length + 1;
        // We load the copy store to get the new records
        this_gridview.setLoading(true);
        temp_store.load({params:{ offset:offset, limit:100}});
        temp_store.on('load', function (temp_store, new_records, success) {
            if (success === false) {
                Ext.MessageBox.show({
                    title:'Error',
                    msg:'Call to OpenPhacts API timed out.<br/>We are sorry, please try again later.',
                    buttons:Ext.MessageBox.OK,
                    icon:Ext.MessageBox.ERROR
                });
                this_gridview.setTitle(this_gridview.gridBaseTitle + ' - Error on search!');
                this_gridview.setLoading(false);
                return false;
            }
            var idx_start = offset - 1;
            var row_count = 0;
            Ext.each(new_records, function (new_record) {
                new_record.index = idx_start + row_count;
                row_count++;
            });
            this_store.loadRecords(new_records, {addRecords:true});
            this_gridview.setLoading(false);
            this_gridview.recordsLoaded = this_store.data.length;
            if (temp_store.data.length < 100) {
                this_gridview.setTitle(this_gridview.gridBaseTitle + ' - All ' + this_gridview.recordsLoaded + ' records loaded');
                this_gridview.down('#nextRecords').disable();
            }
            else {
                this_gridview.setTitle(this_gridview.gridBaseTitle + ' - Records loaded: ' + this_store.data.length);
            }
        });

    },

    storeLoad:function (this_gridview, success) {
		console.log('DynamicGrid: storeLoad()');
        if (success === false) {
            Ext.MessageBox.show({
                title:'Error',
                msg:'Call to OpenPhacts API timed out.<br/>We are sorry, please try again later.',
                buttons:Ext.MessageBox.OK,
                icon:Ext.MessageBox.ERROR
            });
            this_gridview.setTitle(this_gridview.gridBaseTitle + ' - Error on search!');
            return false;
        }


        this_gridview.down('#sdfDownloadProxy_id').setText('Prepare SD-file download');

        var this_controller = this;
        var dynamicgridStore = this_gridview.store;
        if (typeof(dynamicgridStore.proxy.reader.jsonData.columns) === 'object') {
            var columns = [];
            if (this_gridview.rowNumberer) {
                columns.push(Ext.create('Ext.grid.RowNumberer', {width:40}));
            }
            Ext.each(dynamicgridStore.proxy.reader.jsonData.columns, function (column) {
                columns.push(column);
                if (column.text == 'csid_uri') {
                    this_gridview.csid_column = true;
                    this_gridview.down('#sdfDownloadProxy_id').enable();
                }
            });
            this_gridview.reconfigure(dynamicgridStore, columns);
            this_gridview.recordsLoaded = dynamicgridStore.data.length;
            if (this_gridview.recordsLoaded == 0) {
                this_gridview.setTitle(this_gridview.gridBaseTitle + ' - No records found within OPS for this search!');
                Ext.MessageBox.show({
                    title:'Info',
                    msg:'The OPS system does not contain any data that match this search.',
                    buttons:Ext.MessageBox.OK,
                    icon:Ext.MessageBox.INFO
                });
            }
            else {
                this_gridview.setTitle(this_gridview.gridBaseTitle + ' - Records loaded: ' + this_gridview.recordsLoaded);
                if (this_gridview.recordsLoaded == this_gridview.limit) {
                    this_gridview.down('#nextRecords').enable();
                    //                     this_gridview.down('#csvDownloadProxy_id').enable();

                }
                else {
                    this_gridview.setTitle(this_gridview.gridBaseTitle + ' - All ' + this_gridview.recordsLoaded + ' records loaded');
                }
            }

        }
    },

    prepSDFile2:function (sdf_prep_button) {
        var gridview = sdf_prep_button.up('dynamicgrid3');
        var grid_store = gridview.store;
        var items = grid_store.data.items;

        var compoundStore = Ext.create('CS.store.Compound');
        var item_count = items.length;
        var success_count = 0;
        var fail_count = 0;
        sdf_prep_button.setText('SD-file preparing...');
        Ext.each(items, function (item) {
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
        var gridview = sdf_prep_button.up('dynamicgrid3');
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
		if (gridView.getStore().getTotalCount() == 0) {
            gridView.setTitle(gridView.gridBaseTitle + ' - No records found within OPS for this search!');
			gridView.down('#sdfDownload_id').disable();
			gridView.down('#sdfDownloadProxy_id').setText('Prepare SD-file download');
	        gridView.down('#sdfDownloadProxy_id').disable();
            Ext.MessageBox.show({
                title:'Info',
                msg:'The OPS system does not contain any data that match this search.',
                buttons:Ext.MessageBox.OK,
                icon:Ext.MessageBox.INFO
            });
        } else {
			if (gridView.getStore().getCount() == gridView.getStore().getTotalCount()) {
				gridView.setTitle(gridView.gridBaseTitle + ' - All ' + gridView.getStore().getCount() + ' records loaded');            
			} else {
				gridView.setTitle(gridView.gridBaseTitle + ' - Records loaded: ' + gridView.getStore().getCount() + ' - Total Records: ' + gridView.getStore().getTotalCount());
	            
			}
			gridView.down('#sdfDownloadProxy_id').setText('Prepare SD-file download');
	        gridView.down('#sdfDownloadProxy_id').enable();
			gridView.down('#csvDownload_id').enable();
        }
}
});