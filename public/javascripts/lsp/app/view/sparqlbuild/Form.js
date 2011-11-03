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

Ext.define('LSP.view.sparqlbuild.Form', {
    extend: 'Ext.form.Panel',  
    alias: 'widget.sparqlbuild',
        
     initComponent: function() {
    
        this.items = [
                      { 
                        xtype: 'textfield',
                        name: 'endpoint',
                        id: 'endpoint_id',
                        fieldLabel: 'Endpoint URL',
                        width: 700,
                        value: 'http://linkedlifedata.com/sparql' 
                      },{
                        xtype: 'textfield',
                        name: 'select',
                        id: 'select_id',
                        fieldLabel: 'SELECT',
                        width: 700
                      },{
                        xtype: 'textarea',
                        name: 'where',
                        id: 'where_id',
                        fieldLabel: 'WHERE',
                        height: 200,
                        width: 700,
                        emptyText: 'hej'
                      },{
                        xtype: 'textfield',
                        name: 'limit',
                        id: 'limit_id',
                        fieldLabel: 'LIMIT',
                        width: 700,
                        value: '10'
                      },
                      {
                        xtype: 'button',
                        action: 'build',
                        text: 'Build query',                        
                        handler: function() {
                            var endpoint_url = Ext.getCmp('endpoint_id').getValue();
                            var select = Ext.getCmp('select_id').getValue();
                            var where = Ext.getCmp('where_id').getValue();
                            var limit = Ext.getCmp('limit_id').getValue();
                            Ext.Ajax.request({
                                url: 'sparql_endpoint/sparqlbuild.json',
                                params: {
                                    id: 1
                                },
                                success: function(response){
                                    var text = response.responseText;
                                    alert(text);
                                    // process server response here
                                }
                            });
                            }
                      },
                      {
                        xtype: 'textarea',
                        name: 'query',
                        id: 'query_id',
                        fieldLabel: 'SPARQL query',
                        height: 200,
                        width: 700
                      }                        
                ];
        this.callParent(arguments);
    }    
});
