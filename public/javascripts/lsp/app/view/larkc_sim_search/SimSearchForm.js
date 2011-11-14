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

Ext.define('LSP.view.larkc_sim_search.SimSearchForm', {
    extend: 'Ext.form.Panel',  
    alias: 'widget.SimSearchForm',
    requires: [
        'LSP.view.mol_editor_forms.KetcherForm'
    ],
    closable: true,
     initComponent: function() {
    
        this.items = [
                   {
                xtype: 'form',
                padding: '5 5 0 5',
                border: false,
                height: '100%',
                style: 'background-color: #fff;',
                items: [                      
                      {
                        name: 'utf8',
                        xtype: 'hidden',
                        value: '&#x2713;'
                      },
                      {
                        name: 'authenticity_token',
                        xtype: 'hidden',
                        value: $$('meta[name=csrf-token]')[0].readAttribute('content')
                      },
                      {
                        name: 'molfile',
                        xtype: 'hidden',
                        value: ''
                      },
                      {
                      xtype: 'fieldcontainer',
                      layout: 'column',
                      collapsible: false,
                      defaults: {anchor: '100%'},
                    //  layout: 'anchor',
                      items :[                         
                         {
                          xtype: 'textfield',
                          name: 'smiles',
                          emptyText: 'Enter SMILES here or use the molecular editor to draw structure - click button ->',
                          fieldLabel: 'Search for compounds similar to SMILES',
                          labelWidth: 230,                        
                          width: 650
                        },
                        {
                          xtype: 'button',
                          action: 'ketcher_editor',
                          text: 'Draw structure'
                         }
                         ]
                      },
                      {                      
                          xtype: 'radiogroup',
                          fieldLabel: 'Search type',
                          items: [
                              {boxLabel: 'Exact structure search', name: 'search_type', inputValue: 1, checked: true},
                              {boxLabel: 'Substructure seach', name: 'search_type', inputValue: 2},
                              {boxLabel: 'Structural similarity search', name: 'search_type', inputValue: 3}                              
                          ]
                      },
                      {
                          xtype: 'button',
                          action: 'query',
                          text: 'Start search'
                      },
                      grid_ss = Ext.widget('dynamicgrid2')
                      ]
                  }           
                ];
                
                grid_toolbar = Ext.create('Ext.toolbar.Toolbar', {
                       items: [
                {
                    xtype: 'button',
                    iconCls: 'icon-mol_dv',
                    text: 'Data View',
                    action: 'data_view'
                }
    ]
});        
        grid_ss.addDocked(grid_toolbar);
        grid_ss.setTitle('Structure search results');
        this.callParent(arguments);
    }    
});
