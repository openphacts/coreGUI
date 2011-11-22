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

Ext.define('LSP.controller.PharmEnzymeForm', {
    extend: 'Ext.app.Controller',

    views: ['larkc_pharm_by_target.PharmEnzymeForm','tree_selector_forms.EnzymeTreeForm'],

    refs: [
        {
            ref: 'PEform',  // reference to the view
            selector: 'PharmEnzymeForm'
        }
    ],

    init: function() {
        this.control({
            'PharmEnzymeForm button[action=enz_tree]': {
                click: this.launchEnzyme
            },
            'EnzymeTreeForm button[action=get_enzyme]': {
                click: this.getEnzyme
            },
            'PharmEnzymeForm button[action=query]': {
                click: this.submitQuery
            }
        });
    },
    // Launch Enzyme class selection window
    launchEnzyme: function(button) {
        // Launch the window
        var view = Ext.widget('EnzymeTreeForm');            
    },
    
    // Get selection from the enzyme tree window
    getEnzyme: function(button) {
        var tree    = button.up().up().down('enzymeTree');
        var selected = tree.getView().getSelectionModel().getSelection();
        var sel_data = selected[0].data;
        var disp_field = this.getPEform().getForm().findField('enzyme_family');
        disp_field.setValue( '<b>' + sel_data.ec_number + ' : ' + sel_data.name + '</b>');
        var ec_num_field = this.getPEform().getForm().findField('ec_number');
        ec_num_field.setValue(sel_data.ec_number);
        var enz_name_field = this.getPEform().getForm().findField('enz_name');
        enz_name_field.setValue(sel_data.name);
        button.up('EnzymeTreeForm').close();   
    },
    
    submitQuery: function(button) {
        var form    = button.up('form');
        var values = form.getValues();
        pharenz_grid.store.proxy.actionMethods = {read: 'POST'};
        pharenz_grid.store.proxy.extraParams = values;
//        pharenz_grid.store.proxy.api.read = '/sparql_endpoint/pharm_enzyme_fam.json';
        pharenz_grid.store.proxy.api.read = '/core_api_calls/pharm_enzyme_fam.json';
 
        pharenz_grid.setTitle('Inhibitors for enzymes in class:  ' + values.ec_number + ' => ' + values.enz_name);
        pharenz_grid.store.load();
    }
    
    
    }
);
