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

/* replace with the settings panel options later on */
iconSize = 'small'

Ext.define('LSP.view.Viewport', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.lspviewport',

    requires: [
      'LSP.view.Viewer',
      'LSP.view.Navigator',
      'LSP.view.Settings',
      'LSP.view.user.Loginbutton',
      'LSP.view.user.Logoutbutton',
      'LSP.view.user.Newbutton',
      'Ext.layout.container.Border',
      'Ext.toolbar.Spacer'
    ],

  	layout: 'border',
    
    initComponent: function() {

      var ops_logo = Ext.create('Ext.Img',{src: 'images/ops_logo.png',bodyStyle: {background: 'transparent'}});
      this.items = [
        {
      	  region: 'north',
      	  id: 'northView',
      	  height: 60,
      	  border: false,
      	  bodyStyle: {
              background: 'transparent',
          },
      	  layout: {
            type: 'hbox',
            padding: '5',
            align: 'middle'
          },
      	  items: [
      	     ops_logo,
            {
              id: 'lsp-header',
              xtype: 'box',
              html: '<h1>Open PHACTS GUI</h1>'
            },
            {
              xtype: 'tbspacer',
              flex: 1
            },
            {
              xtype: 'displayfield',
              value: 'Testing connection to OPS API...',
              width: 400,
              name: 'ops_api_staus',
              id: 'ops_api_staus_id',
            },
            {
              xtype: 'tbspacer',
              flex: 1
            },
            {
              xtype: 'loginbutton',
              id: 'loginButton'
            },
            {
              xtype: 'usernewbutton',
              id: 'userNewButton'
            },
            {
              xtype: 'logoutbutton',
              id: 'logoutButton'
            }
          ]
        },
        {
      		region: 'center',
      		id: 'centerView',
      		xtype: 'viewer'      		
      	},
        {
      		region: 'west',
      		id: 'westView',
      		width: 225,
      		xtype: 'navigator'
      	}
      ]
      this.callParent(arguments);
    }
});
