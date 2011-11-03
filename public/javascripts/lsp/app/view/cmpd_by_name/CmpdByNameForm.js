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

Ext.define('LSP.view.cmpd_by_name.CmpdByNameForm', {
    extend: 'Ext.form.Panel',  
    alias: 'widget.CmpdByNameForm',
    closable: true,
    
     initComponent: function() {
        
        this.items = [
                   {
                xtype: 'container',
                height: '8%',
                margin: '5 5 5 5',
                name: 'form_fields',
                layout: {
                    type: 'column'
                },
                style: 'background-color: #fff;',
                items: [                      
                      {
                        name: 'utf8',
                        xtype: 'hidden',
                        value: '&#x2713;'
                      },
                      {
                        name: 'cmpd_uuid',
                        xtype: 'hidden',
                        value: ''
                      },
                      {
                        name: 'authenticity_token',
                        xtype: 'hidden',
                        value: $$('meta[name=csrf-token]')[0].readAttribute('content')
                      },
                      {
                        xtype: 'combo',
                        valueField:'cmpdurl',
                      	store:  Ext.create('Ext.data.Store',{
                                      fields: [
                                        {type: 'string', name: 'cmpd_name'},
                                        {type: 'string', name: 'cmpdurl'}
                                      ],
                                      proxy: {
                                          type: 'ajax',
                                          api: {
                                              read: 'sparql_endpoint/cmpd_name_lookup.json'
                                          },
                                          reader: {
                                              type: 'json',
                                              root: 'objects',
                                              totalProperty: 'totalCount'
                                          }
                                      }
                                  }),
                      	queryMode: 'remote',
                      	displayField: 'cmpd_name',
                      	minChars:4,
                      	hideTrigger:true,
                      	forceSelection:true,
                      	typeAhead:true,
                        emptyText: 'Start typing...',
                        name: 'cmpd_uuid',
                        margin: '5 5 5 5',
                        width: 800,
                        fieldLabel: 'Compound name',
                        labelWidth: 120,
                        listConfig: {
                          loadingText: 'Searching...',
                          emptyText: 'No matching compounds found.',
                        },
                        listeners: {
                            select: function(combo, selection) {
                            var post = selection[0];
                              if (post) {
                                 var fields = this.up().items.items;
                                 fields.forEach(function(item) { if(item.name == 'cmpd_uuid'){item.setValue(post.data.cmpdurl);}});
                              }
                            }
                        }
                      },
                      {
                        xtype: 'button',
                        padding: '5 5 5 5',
                        text: 'Search',
                        action: 'query_cmpd_by_name'
                      }]},
                      grid_cmpdbyname = Ext.widget('dynamicgrid')                             
                ];
        grid_cmpdbyname.timeout = 9000000;
        grid_cmpdbyname.setTitle('Compound by name search results');
        grid_cmpdbyname.setHeight('92%'); 
        grid_cmpdbyname.buttonRender(['exporter']);                                  
        this.callParent(arguments);
    }    
});
