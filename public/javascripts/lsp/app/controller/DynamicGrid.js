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

Ext.define('LSP.controller.DynamicGrid', {
    extend: 'Ext.app.Controller',
    
    views: [
        'dynamicgrid.DynamicGrid'
    ],   
     
    stores: ['DynamicGrid'],
    models: ['DynamicGrid'],
    
//     onLaunch: function() {
//         var dynamicgridStore = this.getStore('DynamicGrid');
//         dynamicgridStore.on('load', this.storeLoad, this);
//     },
//       
//     storeLoad: function() {
//         console.log(this);
//         if(typeof(this.store.proxy.reader.jsonData.columns) === 'object') {  
//             var columns = [];
//             //console.log(this);
//             if(this.rowNumberer) { columns.push(Ext.create('Ext.grid.RowNumberer',{width:40})); }  
//             Ext.each(this.store.proxy.reader.jsonData.columns, function(column){
//                 columns.push(column);  
//             });
//             //console.log(columns);
//             //console.log(this);
// //             if (typeof(title) == "undefined") {
// //      	        var title = this.title;
// //             }			
// //             if (this.store.proxy.reader.jsonData.totalCount > 0){
// //                     this.setTitle(title + ' - Records found: ' +  this.store.proxy.reader.jsonData.totalCount);
// //             }
// //             else {
// //                      this.setTitle(title + ' - Records found: ' +  'No records found!');
// //             }
//                   console.log(this);
//                   var dymview2 = this.getView('dynamicgrid2');
//                   dymview2.reconfigure(this, columns);
//                         
//                     } 
//     }
});