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

Ext.define('LSP.controller.SimSearchForm', {
    extend: 'Ext.app.Controller',

    views: ['larkc_sim_search.SimSearchForm','mol_editor_forms.KetcherForm', 'dataview.StructureViewer'],

    refs: [
        {
            ref: 'ssform',  // reference to the view
            selector: 'SimSearchForm'
        }
    ],

    init: function() {
        this.control({
            'SimSearchForm button[action=ketcher_editor]': {
                click: this.launchKetcher
            },
            'KetcherForm button[action=commit_structure]': {
                click: this.getSmiles
            },
            'SimSearchForm button[action=query]': {
                click: this.submitQuery
            },
            'SimSearchForm button[action=data_view]': {
                click: this.launchDataView
            }
        });
    },
    // Launch ketcher window
    launchKetcher: function(button) {
        // Launch the window
        var view = Ext.widget('KetcherForm');    
        // Check to see if we already have a structure to modify and load it if we do
        fields = this.getSsform().form.getFields().items;
        var molfile = '';
        fields.forEach(function(item) { if(item.name == 'molfile'){molfile = item.getValue(); var temp = 12;}});
        if(molfile != ''){
          document.getElementById('ketcher_box_id').contentWindow.ketcher.setMolecule(molfile);
        }
    },
    
    // Grep smiles from ketcher window and store in smiles field in form
    getSmiles: function(button) {
          var ketcher_window = document.getElementById('ketcher_box_id');
          // smiles is used for query
          smiles = ketcher_window.contentWindow.ketcher.getSmiles();
          // molfile is stored in hidden field for use when updating existing structure
          molfile = ketcher_window.contentWindow.ketcher.getMolfile();
          // We get all fields in form so that we can update the right one
          fields = this.getSsform().form.getFields().items;
          fields.forEach(function(item) { if(item.name == 'smiles'){item.setValue(smiles)} else if(item.name == 'molfile'){item.setValue(molfile)} });
          button.up('KetcherForm').close();
    },
    
    submitQuery: function(button) {
        var form    = button.up('form'),
        values = form.getValues();
        //console.log(values.endpoint);
        grid_ss.store.proxy.actionMethods = {read: 'POST'};
        grid_ss.store.proxy.extraParams = values;
        grid_ss.store.proxy.api.read = '/sparql_endpoint/search_by_smiles.json';
        var grid_title = '';
        if (values.search_type == '1') {grid_title = 'Exact structure match'};
        if (values.search_type == '2') {grid_title = 'Substructure structure'};
        if (values.search_type == '3') {grid_title = 'Similarity search'};
        grid_ss.setTitle(grid_title);
        
        //grid.store.proxy.create;
        grid_ss.store.load();
    },
    
    launchDataView: function(button) {
        var grid = button.up('dynamicgrid2');
        structureViewStore = grid.store;
        var view = Ext.widget('StructureViewer');    
        console.log(grid.store);  
    
    }
        
    }
);
