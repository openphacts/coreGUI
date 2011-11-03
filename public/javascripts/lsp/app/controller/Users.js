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

Ext.define('LSP.controller.Users', {
    extend: 'Ext.app.Controller',
    
    views: [
        'user.Login',
        'user.New'
    ],

    init: function() {
        this.control({
            'loginbutton': {
                click: this.userLoginWindow
            },
            'logoutbutton': {
                click: this.logoutUser
            },
            'usernewbutton': {
                click: this.newUserWindow
            },
            'loginform': {
                render: function(form) {
                    form.getForm().findField('user_session[login]').focus(false,10);                    
                }
            },
            'userlogin button[action=login]': {
                click: this.loginUser
            },
            'usernew button[action=commit]': {
                click: this.newUser
            }
        });
    },
    
    userLoginWindow: function(button, event, object) {
        var view = Ext.widget('userlogin');
    },
    
    newUserWindow: function(button, event, object) {
        var view = Ext.widget('usernew');
    },
    
    loginUser: function(button, event, object) {
        var win = button.up('window'),
            form   = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();

        //record.set(values);
        
        Ext.Ajax.request({
            url: '/login',
            params: values,
            success: function(response){
                LSPSharedData.user = values['user_session[login]'];
                Ext.getCmp('logoutButton').setText('Log out ' + LSPSharedData.user);
                Ext.getCmp('loginButton').setVisible(false);
                Ext.getCmp('userNewButton').setVisible(false);
                Ext.getCmp('logoutButton').setVisible(true);
                Ext.getCmp('centerView').items.each( function(curItem) {
                  curItem.destroy();
                });
                Ext.getCmp('appModuleTree').getStore().load();
            }
        });
        
        win.close();        
    },
    
    logoutUser: function(button, event, object) {
        Ext.Ajax.request({
            url: '/logout',
            method: 'DELETE',
            success: function(response){
                Ext.getCmp('loginButton').setVisible(true);
                Ext.getCmp('userNewButton').setVisible(true);
                Ext.getCmp('logoutButton').setVisible(false);
                Ext.getCmp('centerView').items.each( function(curItem) {
                  curItem.destroy();
                });
                Ext.getCmp('appModuleTree').getStore().load();
            },
            failure: function(response){
                Ext.Msg.alert(response.statusText, response.responseText);
            }
        });    
    },
    
    newUser: function(button, event, object) {
        var win = button.up('window'),
            form   = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();

        //record.set(values);
        
        Ext.Ajax.request({
            url: '/users',
            method: 'POST',
            params: values,
            success: function(response){
                LSPSharedData.user = values['user[login]'];
                Ext.getCmp('logoutButton').setText('Log out ' + LSPSharedData.user);
                Ext.getCmp('loginButton').setVisible(false);
                Ext.getCmp('userNewButton').setVisible(false);
                Ext.getCmp('logoutButton').setVisible(true);
            },
            failure: function(response){
                Ext.Msg.alert(response.statusText, response.responseText);
            }
        });
        
        win.close();        
    }    
    
});