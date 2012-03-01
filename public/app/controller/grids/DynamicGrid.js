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
    extend: 'Ext.app.Controller',
    
    views: [
        'dynamicgrid.DynamicGrid3'
    ],   

   models: ['DynamicGrid'],

    
    init: function() {
    },
    onLaunch: function() {
    },

   
    testThis: function(args) {
     },
   
    addNextRecords: function(this_gridview,extraParams) {
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
      temp_store.load({params: { offset: offset, limit: 100}}); 
      temp_store.on('load',function(){
          this_store.loadRecords(temp_store.getRange(),{addRecords: true});
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
     
    storeLoad: function(this_gridview) {
        var this_controller = this;
        var dynamicgridStore = this_gridview.store;
        if(typeof(dynamicgridStore.proxy.reader.jsonData.columns) === 'object') {  
             var columns = [];
             if(this_gridview.rowNumberer) { columns.push(Ext.create('Ext.grid.RowNumberer',{width:40})); }  
             Ext.each(dynamicgridStore.proxy.reader.jsonData.columns, function(column){
                 columns.push(column);  
             });
                this_gridview.reconfigure(dynamicgridStore, columns);
                this_gridview.recordsLoaded = dynamicgridStore.data.length;
                if (this_gridview.recordsLoaded == 0) {
                     this_gridview.setTitle(this_gridview.gridBaseTitle + '- No records found within OPS for this search!');
                }
                else {
                    this_gridview.setTitle(this_gridview.gridBaseTitle + ' - Records loaded: ' + this_gridview.recordsLoaded);
                    if (this_gridview.recordsLoaded == this_gridview.limit) {
                      this_gridview.down('#nextRecords').enable();
                        
                    }
                    else {
                      this_gridview.setTitle(this_gridview.gridBaseTitle + ' - All ' + this_gridview.recordsLoaded + ' records loaded');
                    }
                }
                
     }
    },
    
   
})