/*
Copyright(c) 2011 Company Name
*/
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

Ext.define('LSP.view.Appmoduletree', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.appmoduletree',
    
    requires: [
      'Ext.data.TreeStore'
    ],
    
    //singleExpand: true,    
    rootVisible: false,
    useArrows: true,
    frame: false,
    autoScroll: true,
    height: '100%',
    
    store: 'NavigationTree',
    
    listeners: {
      itemclick: function(tree, record, item, index, e, options) {
        if (record.raw.application_type == 'grid') {
          // Check if panel with that ID exists, then switch
          var view;
          Ext.getCmp('centerView').items.each( function(curItem) {
            if (curItem.gridId == record.raw.id) {
              view = curItem;
              return;
            }
          });
          if (!view) {
            view = Ext.widget(record.raw.xtype);
            view.setTitle(record.raw.home);
            view.url = record.raw.url;
            view.gridId = record.raw.id;
            Ext.getCmp('centerView').add(view);
          }          
          Ext.getCmp('centerView').setActiveTab(view);
        }
      }
     },
    
    initComponent: function() {
        
        this.callParent(arguments);
    }
});
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

Ext.define('LSP.store.NavigationTree', {
    extend: 'Ext.data.TreeStore',    
    proxy: {
        type: 'ajax',
        url: 'application_modules.json'
    }
});
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

Ext.define('LSP.model.Grid', {
    extend: 'Ext.data.Model',
    fields: []
});
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

Ext.define('LSP.store.Grids', {
    extend: 'Ext.data.Store',    
    //model: 'LSP.model.Grid',
    fields: [],
    proxy: {
        type: 'ajax',
        api: {
            read: ''
        },
        //url: '/users.json',                    
        reader: {
            type: 'json',
            root: 'objects',
            totalProperty: 'totalCount'
        }
    }
});
Ext.define('LSP.view.Navigator', {
    extend: 'Ext.Panel',
    alias: 'widget.navigator',
    
    requires: [
      'LSP.view.Appmoduletree',
      'Ext.layout.container.Accordion'
    ],
    
    collapsible: true,
    margins: '0 0 4 4',
    layout: 'accordion',
    layoutConfig: {
        animate: true
    },
    
    initComponent: function() {
        this.items = [{
            title:'Navigation',
            autoScroll: true,
            border: false,
            iconCls: 'nav',
            items: [
              {
                xtype: 'appmoduletree',
                id: 'appModuleTree'
              }
            ]
        },{
            title:'Settings',
            border: false,
            autoScroll: true,
            iconCls: 'settings',
            items: [
              {
                xtype: 'settingsform',
                id: 'appSettings'
              }
            ]
        }];
        
        this.callParent(arguments);
    }
});
Ext.define('LSP.view.Settings', {
    extend: 'Ext.form.Panel',
    alias: 'widget.settingsform',
    height: '100%',
    initComponent: function() {
    
        this.items = [
            {
                xtype: 'form',
                padding: '5 5 0 5',
                border: false,
                //height: '100%',
                style: 'background-color: #fff;',
                items: [
                    {
                        xtype: 'label',
                        text: 'To use a different endpoint than the default Amsterdam VU one insert URL of sparql endpoint below and click save' 
                    },
                    {
                        xtype: 'textarea',
                        name: 'endpoint',
                        heigth: 50,
                        fieldLabel: 'URL',
                        emptyText: 'Insert full URL to the sparql endpoint used, eg: http://10.11.93.218:8183/sparql',
                        labelWidth: 30
                    },
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
                        xtype: 'button',
                        text: 'Save',
                        action: 'save_endpoint'
                    } 
                ]
            }
        ];
        this.callParent(arguments);
    }
});
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

Ext.define('LSP.view.user.Loginbutton', {
    extend: 'Ext.Button',
    alias: 'widget.loginbutton',
    
    size: 'small',
    text: 'Log in',
    
    initComponent: function() {
        this.callParent(arguments);
    }
});
/*######################################################################################
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

Ext.define('LSP.view.user.Logoutbutton', {
    extend: 'Ext.Button',
    alias: 'widget.logoutbutton',
    
    size: 'small',
    text: 'Log out',
    
    initComponent: function() {
        this.callParent(arguments);
    }
});
/*######################################################################################
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

Ext.define('LSP.view.user.Newbutton', {
    extend: 'Ext.Button',
    alias: 'widget.usernewbutton',   
    
    size: 'small',
    text: 'Create account',
    
    initComponent: function() {
        this.callParent(arguments);
    }
});
/*######################################################################################
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

Ext.define('LSP.view.user.New', {
    extend: 'Ext.window.Window',
    alias : 'widget.usernew',

    requires: ['Ext.form.Panel'],

    title : 'New user',
    layout: 'fit',
    modal: true,
    autoShow: true,
    height: 200,
    width: 280,

    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                padding: '5 5 0 5',
                border: false,
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
                        xtype: 'textfield',
                        name : 'user[login]',
                        fieldLabel: 'Login'
                    },
                    {
                        xtype: 'textfield',
                        name : 'user[email]',
                        fieldLabel: 'Email'
                    },
                    {
                        xtype: 'textfield',
                        name : 'user[password]',
                        inputType: 'password',
                        fieldLabel: 'Password'
                    },
                    {
                        xtype: 'textfield',
                        name : 'user[password_confirmation]',
                        inputType: 'password',
                        fieldLabel: 'Password confirmation'
                    }
                ]
            }
        ];

        this.buttons = [
            {
                text: 'Save',
                action: 'commit'
            },
            {
                text: 'Cancel',
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);
    }
});

Ext.define('LSP.view.sparqlform.Queryform', {
    extend: 'Ext.form.Panel',  
    alias: 'widget.queryform',
    closable: true,
    layout: {
              type: 'vbox',
              align: 'stretch'
          },    
    initComponent: function() {
    
        this.items = [
            {
                xtype: 'form',
                padding: '5 5 0 5',
                border: false,
                style: 'background-color: #fff;',
                items: [
					{
						xtype: 'textarea',
						name: 'query',
						id: 'query_id',
						fieldLabel: 'SPARQL query',
						height: 120,
						labelWidth: 110,
						width: 700,
						value: 'SELECT *  WHERE { ?s ?p ?o}'
					},
					{
            xtype: 'fieldcontainer',
            height: 31,
            width: 700,
            layout: {
                type: 'column'
            },
            items: [
                {
                    xtype: 'numberfield',
                    name: 'limit',
                    margin: '0 10 0 110',
                    padding: '',
                    width: 190,
                    fieldLabel: 'Limit',
                    labelWidth: 110,
                    autoStripChars: true,
                    maxValue: 100,
                    minValue: 1,
                    value: 10,
                    allowDecimals: false
                },
                {
                    xtype: 'numberfield',
                    name: 'offset',
                    margin: '0 10 0 0',
                    width: 190,
                    fieldLabel: 'Offset',
                    labelWidth: 110,
                    maxValue: 10000,
                    minValue: 0,
                    value: 0,
                    allowDecimals: false
                }
                ]
            },
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
						xtype: 'button',
						action: 'query',
						text: 'Submit query'
					}
                ]
            },
					{
            xtype: 'dynamicgrid2',
            title: 'SPARQL query results',
            name: 'sparql_query_results',
            flex: 1,
          }           
        ];
        this.callParent(arguments);
    }    
});

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

Ext.define('LSP.view.mol_editor_forms.KetcherForm', {
    extend: 'Ext.window.Window',
    alias : 'widget.KetcherForm',

    requires: ['Ext.form.Panel'],

    title : 'Draw structure',
    layout: 'fit',
    modal: true,
    autoShow: true,
    height: 570,
    width: 810,

    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                padding: '0 0 0 0',
                border: false,
                style: 'background-color: #fff;',

                items: [
                    {
                        xtype: 'box',
                        width: 800,
                        height: 520,
                        id: 'ketcher_box_id',
                        autoEl: {
                        tag: 'iframe',
                        src: 'ketcher/ketcher.html'
                        }}
                        ]
                    }
        ];

        this.buttons = [
            {
                text: 'Use structure',
                action: 'commit_structure'
            },
            {
                text: 'Cancel',
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);
    }
});

Ext.define('LSP.view.pharm_by_cmpd_name2.PharmByCmpdNameForm', {
    extend: 'Ext.form.Panel',  
    alias: 'widget.PharmByCmpdNameForm',
    closable: true,
    layout: {
          type: 'vbox',
          align: 'stretch'
      },
    
     initComponent: function() {
        
        this.items = [
                   {
                xtype: 'container',
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
                        xtype: 'compoundLookup',                        
                      },
                      {
                        xtype: 'button',
                        padding: '5 5 5 5',
                        text: 'Search',
                        disabled: true,
                        action: 'query_pharm_by_cmpd_name'
                      }]},
                      {
                    xtype: 'dynamicgrid2',
                    title: 'Pharmacology by Compound name search results',
                    gridBaseTitle: 'Pharmacology by Compound name search results',                    
                    flex: 1,
                    }                              
                ];

        this.callParent(arguments);
    }    
});

/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as published by the Free Software Foundation and appearing in the file LICENSE included in the packaging of this file.  Please review the following information to ensure the GNU General Public License version 3.0 requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
/**
 * @class Ext.ux.grid.FiltersFeature
 * @extends Ext.grid.Feature

FiltersFeature is a grid {@link Ext.grid.Feature feature} that allows for a slightly more
robust representation of filtering than what is provided by the default store.

Filtering is adjusted by the user using the grid's column header menu (this menu can be
disabled through configuration). Through this menu users can configure, enable, and
disable filters for each column.

#Features#

##Filtering implementations:##

Default filtering for Strings, Numeric Ranges, Date Ranges, Lists (which can be backed by a
{@link Ext.data.Store}), and Boolean. Additional custom filter types and menus are easily
created by extending {@link Ext.ux.grid.filter.Filter}.

##Graphical Indicators:##

Columns that are filtered have {@link #filterCls a configurable css class} applied to the column headers.

##Automatic Reconfiguration:##

Filters automatically reconfigure when the grid 'reconfigure' event fires.

##Stateful:##

Filter information will be persisted across page loads by specifying a `stateId`
in the Grid configuration.

The filter collection binds to the {@link Ext.grid.Panel#beforestaterestore beforestaterestore}
and {@link Ext.grid.Panel#beforestatesave beforestatesave} events in order to be stateful.

##GridPanel Changes:##

- A `filters` property is added to the GridPanel using this feature.
- A `filterupdate` event is added to the GridPanel and is fired upon onStateChange completion.

##Server side code examples:##

- [PHP](http://www.vinylfox.com/extjs/grid-filter-php-backend-code.php) - (Thanks VinylFox)</li>
- [Ruby on Rails](http://extjs.com/forum/showthread.php?p=77326#post77326) - (Thanks Zyclops)</li>
- [Ruby on Rails](http://extjs.com/forum/showthread.php?p=176596#post176596) - (Thanks Rotomaul)</li>
- [Python](http://www.debatablybeta.com/posts/using-extjss-grid-filtering-with-django/) - (Thanks Matt)</li>
- [Grails](http://mcantrell.wordpress.com/2008/08/22/extjs-grids-and-grails/) - (Thanks Mike)</li>

#Example usage:#

    var store = Ext.create('Ext.data.Store', {
        pageSize: 15
        ...
    });

    var filtersCfg = {
        ftype: 'filters',
        autoReload: false, //don't reload automatically
        local: true, //only filter locally
        // filters may be configured through the plugin,
        // or in the column definition within the headers configuration
        filters: [{
            type: 'numeric',
            dataIndex: 'id'
        }, {
            type: 'string',
            dataIndex: 'name'
        }, {
            type: 'numeric',
            dataIndex: 'price'
        }, {
            type: 'date',
            dataIndex: 'dateAdded'
        }, {
            type: 'list',
            dataIndex: 'size',
            options: ['extra small', 'small', 'medium', 'large', 'extra large'],
            phpMode: true
        }, {
            type: 'boolean',
            dataIndex: 'visible'
        }]
    };

    var grid = Ext.create('Ext.grid.Panel', {
         store: store,
         columns: ...,
         filters: [filtersCfg],
         height: 400,
         width: 700,
         bbar: Ext.create('Ext.PagingToolbar', {
             store: store
         })
    });

    // a filters property is added to the GridPanel
    grid.filters

 * @markdown
 */
Ext.define('Ext.ux.grid.FiltersFeature', {
    extend: 'Ext.grid.feature.Feature',
    alias: 'feature.filters',
    uses: [
        'Ext.ux.grid.menu.ListMenu',
        'Ext.ux.grid.menu.RangeMenu',
        'Ext.ux.grid.filter.BooleanFilter',
        'Ext.ux.grid.filter.DateFilter',
        'Ext.ux.grid.filter.ListFilter',
        'Ext.ux.grid.filter.NumericFilter',
        'Ext.ux.grid.filter.StringFilter'
    ],

    /**
     * @cfg {Boolean} autoReload
     * Defaults to true, reloading the datasource when a filter change happens.
     * Set this to false to prevent the datastore from being reloaded if there
     * are changes to the filters.  See <code>{@link updateBuffer}</code>.
     */
    autoReload : true,
    /**
     * @cfg {Boolean} encode
     * Specify true for {@link #buildQuery} to use Ext.util.JSON.encode to
     * encode the filter query parameter sent with a remote request.
     * Defaults to false.
     */
    /**
     * @cfg {Array} filters
     * An Array of filters config objects. Refer to each filter type class for
     * configuration details specific to each filter type. Filters for Strings,
     * Numeric Ranges, Date Ranges, Lists, and Boolean are the standard filters
     * available.
     */
    /**
     * @cfg {String} filterCls
     * The css class to be applied to column headers with active filters.
     * Defaults to <tt>'ux-filterd-column'</tt>.
     */
    filterCls : 'ux-filtered-column',
    /**
     * @cfg {Boolean} local
     * <tt>true</tt> to use Ext.data.Store filter functions (local filtering)
     * instead of the default (<tt>false</tt>) server side filtering.
     */
    local : false,
    /**
     * @cfg {String} menuFilterText
     * defaults to <tt>'Filters'</tt>.
     */
    menuFilterText : 'Filters',
    /**
     * @cfg {String} paramPrefix
     * The url parameter prefix for the filters.
     * Defaults to <tt>'filter'</tt>.
     */
    paramPrefix : 'filter',
    /**
     * @cfg {Boolean} showMenu
     * Defaults to true, including a filter submenu in the default header menu.
     */
    showMenu : true,
    /**
     * @cfg {String} stateId
     * Name of the value to be used to store state information.
     */
    stateId : undefined,
    /**
     * @cfg {Integer} updateBuffer
     * Number of milliseconds to defer store updates since the last filter change.
     */
    updateBuffer : 500,

    // doesn't handle grid body events
    hasFeatureEvent: false,


    /** @private */
    constructor : function (config) {
        var me = this;

        config = config || {};
        Ext.apply(me, config);

        me.deferredUpdate = Ext.create('Ext.util.DelayedTask', me.reload, me);

        // Init filters
        me.filters = me.createFiltersCollection();
        me.filterConfigs = config.filters;
    },

    attachEvents: function() {
        var me = this,
            view = me.view,
            headerCt = view.headerCt,
            grid = me.getGridPanel();

        me.bindStore(view.getStore(), true);

        // Listen for header menu being created
        headerCt.on('menucreate', me.onMenuCreate, me);

        view.on('refresh', me.onRefresh, me);
        grid.on({
            scope: me,
            beforestaterestore: me.applyState,
            beforestatesave: me.saveState,
            beforedestroy: me.destroy
        });

        // Add event and filters shortcut on grid panel
        grid.filters = me;
        grid.addEvents('filterupdate');
    },

    createFiltersCollection: function () {
        return Ext.create('Ext.util.MixedCollection', false, function (o) {
            return o ? o.dataIndex : null;
        });
    },

    /**
     * @private Create the Filter objects for the current configuration, destroying any existing ones first.
     */
    createFilters: function() {
        var me = this,
            hadFilters = me.filters.getCount(),
            grid = me.getGridPanel(),
            filters = me.createFiltersCollection(),
            model = grid.store.model,
            fields = model.prototype.fields,
            field,
            filter,
            state;

        if (hadFilters) {
            state = {};
            me.saveState(null, state);
        }

        function add (dataIndex, config, filterable) {
            if (dataIndex && (filterable || config)) {
                field = fields.get(dataIndex);
                filter = {
                    dataIndex: dataIndex,
                    type: (field && field.type && field.type.type) || 'auto'
                };

                if (Ext.isObject(config)) {
                    Ext.apply(filter, config);
                }

                filters.replace(filter);
            }
        }

        // We start with filters from our config and then merge on filters from the columns
        // in the grid. The Grid columns take precedence.
        Ext.Array.each(me.filterConfigs, function (fc) {
            add(fc.dataIndex, fc);
        });

        Ext.Array.each(grid.columns, function (column) {
            if (column.filterable === false) {
                filters.removeAtKey(column.dataIndex);
            } else {
                add(column.dataIndex, column.filter, column.filterable);
            }
        });

        me.removeAll();
        me.addFilters(filters.items);

        if (hadFilters) {
            me.applyState(null, state);
        }
    },

    /**
     * @private Handle creation of the grid's header menu. Initializes the filters and listens
     * for the menu being shown.
     */
    onMenuCreate: function(headerCt, menu) {
        var me = this;
        me.createFilters();
        menu.on('beforeshow', me.onMenuBeforeShow, me);
    },

    /**
     * @private Handle showing of the grid's header menu. Sets up the filter item and menu
     * appropriate for the target column.
     */
    onMenuBeforeShow: function(menu) {
        var me = this,
            menuItem, filter;

        if (me.showMenu) {
            menuItem = me.menuItem;
            if (!menuItem || menuItem.isDestroyed) {
                me.createMenuItem(menu);
                menuItem = me.menuItem;
            }

            filter = me.getMenuFilter();

            if (filter) {
                menuItem.menu = filter.menu;
                menuItem.setChecked(filter.active);
                // disable the menu if filter.disabled explicitly set to true
                menuItem.setDisabled(filter.disabled === true);
            }
            menuItem.setVisible(!!filter);
            this.sep.setVisible(!!filter);
        }
    },


    createMenuItem: function(menu) {
        var me = this;
        me.sep  = menu.add('-');
        me.menuItem = menu.add({
            checked: false,
            itemId: 'filters',
            text: me.menuFilterText,
            listeners: {
                scope: me,
                checkchange: me.onCheckChange,
                beforecheckchange: me.onBeforeCheck
            }
        });
    },

    getGridPanel: function() {
        return this.view.up('gridpanel');
    },

    /**
     * @private
     * Handler for the grid's beforestaterestore event (fires before the state of the
     * grid is restored).
     * @param {Object} grid The grid object
     * @param {Object} state The hash of state values returned from the StateProvider.
     */
    applyState : function (grid, state) {
        var key, filter;
        this.applyingState = true;
        this.clearFilters();
        if (state.filters) {
            for (key in state.filters) {
                filter = this.filters.get(key);
                if (filter) {
                    filter.setValue(state.filters[key]);
                    filter.setActive(true);
                }
            }
        }
        this.deferredUpdate.cancel();
        if (this.local) {
            this.reload();
        }
        delete this.applyingState;
        delete state.filters;
    },

    /**
     * Saves the state of all active filters
     * @param {Object} grid
     * @param {Object} state
     * @return {Boolean}
     */
    saveState : function (grid, state) {
        var filters = {};
        this.filters.each(function (filter) {
            if (filter.active) {
                filters[filter.dataIndex] = filter.getValue();
            }
        });
        return (state.filters = filters);
    },

    /**
     * @private
     * Handler called by the grid 'beforedestroy' event
     */
    destroy : function () {
        var me = this;
        Ext.destroyMembers(me, 'menuItem', 'sep');
        me.removeAll();
        me.clearListeners();
    },

    /**
     * Remove all filters, permanently destroying them.
     */
    removeAll : function () {
        if(this.filters){
            Ext.destroy.apply(Ext, this.filters.items);
            // remove all items from the collection
            this.filters.clear();
        }
    },


    /**
     * Changes the data store bound to this view and refreshes it.
     * @param {Store} store The store to bind to this view
     */
    bindStore : function(store, initial){
        if(!initial && this.store){
            if (this.local) {
                store.un('load', this.onLoad, this);
            } else {
                store.un('beforeload', this.onBeforeLoad, this);
            }
        }
        if(store){
            if (this.local) {
                store.on('load', this.onLoad, this);
            } else {
                store.on('beforeload', this.onBeforeLoad, this);
            }
        }
        this.store = store;
    },


    /**
     * @private
     * Get the filter menu from the filters MixedCollection based on the clicked header
     */
    getMenuFilter : function () {
        var header = this.view.headerCt.getMenu().activeHeader;
        return header ? this.filters.get(header.dataIndex) : null;
    },

    /** @private */
    onCheckChange : function (item, value) {
        this.getMenuFilter().setActive(value);
    },

    /** @private */
    onBeforeCheck : function (check, value) {
        return !value || this.getMenuFilter().isActivatable();
    },

    /**
     * @private
     * Handler for all events on filters.
     * @param {String} event Event name
     * @param {Object} filter Standard signature of the event before the event is fired
     */
    onStateChange : function (event, filter) {
        if (event !== 'serialize') {
            var me = this,
                grid = me.getGridPanel();

            if (filter == me.getMenuFilter()) {
                me.menuItem.setChecked(filter.active, false);
            }

            if ((me.autoReload || me.local) && !me.applyingState) {
                me.deferredUpdate.delay(me.updateBuffer);
            }
            me.updateColumnHeadings();

            if (!me.applyingState) {
                grid.saveState();
            }
            grid.fireEvent('filterupdate', me, filter);
        }
    },

    /**
     * @private
     * Handler for store's beforeload event when configured for remote filtering
     * @param {Object} store
     * @param {Object} options
     */
    onBeforeLoad : function (store, options) {
        options.params = options.params || {};
        this.cleanParams(options.params);
        var params = this.buildQuery(this.getFilterData());
        Ext.apply(options.params, params);
    },

    /**
     * @private
     * Handler for store's load event when configured for local filtering
     * @param {Object} store
     * @param {Object} options
     */
    onLoad : function (store, options) {
        store.filterBy(this.getRecordFilter());
    },

    /**
     * @private
     * Handler called when the grid's view is refreshed
     */
    onRefresh : function () {
        this.updateColumnHeadings();
    },

    /**
     * Update the styles for the header row based on the active filters
     */
    updateColumnHeadings : function () {
        var me = this,
            headerCt = me.view.headerCt;
        if (headerCt) {
            headerCt.items.each(function(header) {
                var filter = me.getFilter(header.dataIndex);
                header[filter && filter.active ? 'addCls' : 'removeCls'](me.filterCls);
            });
        }
    },

    /** @private */
    reload : function () {
        var me = this,
            store = me.view.getStore(),
            start;

        if (me.local) {
            store.clearFilter(true);
            store.filterBy(me.getRecordFilter());
        } else {
            me.deferredUpdate.cancel();
            store.loadPage(1);
        }
    },

    /**
     * Method factory that generates a record validator for the filters active at the time
     * of invokation.
     * @private
     */
    getRecordFilter : function () {
        var f = [], len, i;
        this.filters.each(function (filter) {
            if (filter.active) {
                f.push(filter);
            }
        });

        len = f.length;
        return function (record) {
            for (i = 0; i < len; i++) {
                if (!f[i].validateRecord(record)) {
                    return false;
                }
            }
            return true;
        };
    },

    /**
     * Adds a filter to the collection and observes it for state change.
     * @param {Object/Ext.ux.grid.filter.Filter} config A filter configuration or a filter object.
     * @return {Ext.ux.grid.filter.Filter} The existing or newly created filter object.
     */
    addFilter : function (config) {
        var Cls = this.getFilterClass(config.type),
            filter = config.menu ? config : (new Cls(config));
        this.filters.add(filter);

        Ext.util.Observable.capture(filter, this.onStateChange, this);
        return filter;
    },

    /**
     * Adds filters to the collection.
     * @param {Array} filters An Array of filter configuration objects.
     */
    addFilters : function (filters) {
        if (filters) {
            var i, len, filter;
            for (i = 0, len = filters.length; i < len; i++) {
                filter = filters[i];
                // if filter config found add filter for the column
                if (filter) {
                    this.addFilter(filter);
                }
            }
        }
    },

    /**
     * Returns a filter for the given dataIndex, if one exists.
     * @param {String} dataIndex The dataIndex of the desired filter object.
     * @return {Ext.ux.grid.filter.Filter}
     */
    getFilter : function (dataIndex) {
        return this.filters.get(dataIndex);
    },

    /**
     * Turns all filters off. This does not clear the configuration information
     * (see {@link #removeAll}).
     */
    clearFilters : function () {
        this.filters.each(function (filter) {
            filter.setActive(false);
        });
    },

    /**
     * Returns an Array of the currently active filters.
     * @return {Array} filters Array of the currently active filters.
     */
    getFilterData : function () {
        var filters = [], i, len;

        this.filters.each(function (f) {
            if (f.active) {
                var d = [].concat(f.serialize());
                for (i = 0, len = d.length; i < len; i++) {
                    filters.push({
                        field: f.dataIndex,
                        data: d[i]
                    });
                }
            }
        });
        return filters;
    },

    /**
     * Function to take the active filters data and build it into a query.
     * The format of the query depends on the <code>{@link #encode}</code>
     * configuration:
     * <div class="mdetail-params"><ul>
     *
     * <li><b><tt>false</tt></b> : <i>Default</i>
     * <div class="sub-desc">
     * Flatten into query string of the form (assuming <code>{@link #paramPrefix}='filters'</code>:
     * <pre><code>
filters[0][field]="someDataIndex"&
filters[0][data][comparison]="someValue1"&
filters[0][data][type]="someValue2"&
filters[0][data][value]="someValue3"&
     * </code></pre>
     * </div></li>
     * <li><b><tt>true</tt></b> :
     * <div class="sub-desc">
     * JSON encode the filter data
     * <pre><code>
filters[0][field]="someDataIndex"&
filters[0][data][comparison]="someValue1"&
filters[0][data][type]="someValue2"&
filters[0][data][value]="someValue3"&
     * </code></pre>
     * </div></li>
     * </ul></div>
     * Override this method to customize the format of the filter query for remote requests.
     * @param {Array} filters A collection of objects representing active filters and their configuration.
     *    Each element will take the form of {field: dataIndex, data: filterConf}. dataIndex is not assured
     *    to be unique as any one filter may be a composite of more basic filters for the same dataIndex.
     * @return {Object} Query keys and values
     */
    buildQuery : function (filters) {
        var p = {}, i, f, root, dataPrefix, key, tmp,
            len = filters.length;

        if (!this.encode){
            for (i = 0; i < len; i++) {
                f = filters[i];
                root = [this.paramPrefix, '[', i, ']'].join('');
                p[root + '[field]'] = f.field;

                dataPrefix = root + '[data]';
                for (key in f.data) {
                    p[[dataPrefix, '[', key, ']'].join('')] = f.data[key];
                }
            }
        } else {
            tmp = [];
            for (i = 0; i < len; i++) {
                f = filters[i];
                tmp.push(Ext.apply(
                    {},
                    {field: f.field},
                    f.data
                ));
            }
            // only build if there is active filter
            if (tmp.length > 0){
                p[this.paramPrefix] = Ext.JSON.encode(tmp);
            }
        }
        return p;
    },

    /**
     * Removes filter related query parameters from the provided object.
     * @param {Object} p Query parameters that may contain filter related fields.
     */
    cleanParams : function (p) {
        // if encoding just delete the property
        if (this.encode) {
            delete p[this.paramPrefix];
        // otherwise scrub the object of filter data
        } else {
            var regex, key;
            regex = new RegExp('^' + this.paramPrefix + '\[[0-9]+\]');
            for (key in p) {
                if (regex.test(key)) {
                    delete p[key];
                }
            }
        }
    },

    /**
     * Function for locating filter classes, overwrite this with your favorite
     * loader to provide dynamic filter loading.
     * @param {String} type The type of filter to load ('Filter' is automatically
     * appended to the passed type; eg, 'string' becomes 'StringFilter').
     * @return {Class} The Ext.ux.grid.filter.Class
     */
    getFilterClass : function (type) {
        // map the supported Ext.data.Field type values into a supported filter
        switch(type) {
            case 'auto':
              type = 'string';
              break;
            case 'int':
            case 'float':
              type = 'numeric';
              break;
            case 'bool':
              type = 'boolean';
              break;
        }
        return Ext.ClassManager.getByAlias('gridfilter.' + type);
    }
});


Ext.define('LSP.view.pathways.wikiPathwaysWindow', {
    extend: 'Ext.window.Window',
    alias : 'widget.wikiPathwaysWindow',

    requires: ['Ext.form.Panel'],

    title : 'Pathway from WikiPathways',
    layout: 'fit',
    modal: true,
    autoShow: true,
    height: 580,
    width: 700,
//    wpathway_id: "WP87",
    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                padding: '0 0 0 0',
                border: false,
                style: 'background-color: #fff;',

                items: [
                    {
                        xtype: 'box',
                        width: 700,
                        height: 530,
                        id: 'wikipathways_win_id',
                        name: 'wikipathways_win',
                        autoEl: {
                        tag: 'iframe',
                        src: ('http://www.wikipathways.org/wpi/PathwayWidget.php?id=' + this.wpathway_id)
                        }}
                        ]
                    }
        ];

        this.buttons = [
            {
                text: 'Close',
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);
    }
});

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

Ext.define('LSP.view.usergrid.UserGrid', {
    extend: 'Ext.form.Panel',  
    alias: 'widget.usergrid',
        
    initComponent: function() {
    
        this.items = [
				grid = Ext.widget('dynamicgrid') 
        ];
		grid.buttonRender(['new','edit','filter','delete','load','exporter']);
        this.callParent(arguments);
    }    
});

Ext.define('LSP.view.placeholder.temp', {
    extend: 'Ext.form.Panel',  
    alias: 'widget.temp',
    closable: true,
    
     initComponent: function() {
    
        this.items = [
                      { 
                        xtype: 'label',
                        text: 'PLACEHOLDER - NO VIEW AND CONTROLLER HERE YET!',
                        labelWidth: 500 
                      }       
                ];
        this.callParent(arguments);
    }    
});

/*######################################################################################
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

Ext.define('LSP.view.user.Loginform', {
    extend: 'Ext.form.Panel',
    alias : 'widget.loginform',
    
    requires: ['Ext.form.field.Hidden'],

    padding: '5 5 0 5',
    border: false,
    style: 'background-color: #fff;',

    initComponent: function() {
        this.items = [            
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
                xtype: 'textfield',
                name : 'user_session[login]',
                fieldLabel: 'Name'
            },
            {
                xtype: 'textfield',
                name : 'user_session[password]',
                inputType: 'password',
                fieldLabel: 'Password'
            }            
        ];        

        this.callParent(arguments);
    }
});

/* 
 * Purpose: to make text selectable in a Ext JS 4 grid
 *
 * Usage for MVC app:
 * 
 * 1. copy this file to feature/selectable.js
 * 2. add this to your grid config:
 
    features: [
        {ftype: 'selectable', id: 'selectable'}
    ],
 
 * Tested with Ext.grid.Panel in Ext JS 4.0.2a MVC app
 */
 
// append our CSS class to <head>
Ext.getHead().insertHtml("beforeEnd", 
    '<style type="text/css">' +
    '.x-selectable, .x-selectable * {' +
    '    -khtml-user-select: text !important;' +
    '    -moz-user-select: text !important;' +
    '}' +
    '</style>'
);
 
Ext.require('Ext.view.Table', function() {
    Ext.override(Ext.view.Table, {
        afterRender: function() {
            var me = this;
 
            me.callParent();
            me.mon(me.el, {
                scroll: me.fireBodyScroll,
                scope: me
            });
 
            // in case the selectable feature is present, don't do me.el.unselectable() 
            if ( me.getFeature('selectable')===undefined ) {
                me.el.unselectable();
            }
            me.attachEventsForFeatures();
        }
    });
});
 
Ext.require('Ext.grid.feature.Feature', function() {
    Ext.define('LSP.view.dynamicgrid.feature.selectable', {
        extend: 'Ext.grid.feature.Feature',
        alias: 'feature.selectable',
 
        mutateMetaRowTpl: function(metaRowTpl) {
            var i,
                ln = metaRowTpl.length;
 
            for (i = 0; i < ln; i++) {
                tpl = metaRowTpl[i];
                tpl = tpl.replace(/x-grid-row/, 'x-grid-row x-selectable');
                tpl = tpl.replace(/x-grid-cell-inner x-unselectable/g, 'x-grid-cell-inner');
                tpl = tpl.replace(/unselectable="on"/g, '');
                metaRowTpl[i] = tpl;
            }
        }        
    });
});  
/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as published by the Free Software Foundation and appearing in the file LICENSE included in the packaging of this file.  Please review the following information to ensure the GNU General Public License version 3.0 requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
/**
 * @class Ext.ux.DataViewTransition
 * @extends Object
 * @author Ed Spencer (http://sencha.com)
 * Transition plugin for DataViews
 */
Ext.define('Ext.ux.DataView.Animated', {

    /**
     * @property defaults
     * @type Object
     * Default configuration options for all DataViewTransition instances
     */
    defaults: {
        duration  : 750,
        idProperty: 'id'
    },
    
    /**
     * Creates the plugin instance, applies defaults
     * @constructor
     * @param {Object} config Optional config object
     */
    constructor: function(config) {
        Ext.apply(this, config || {}, this.defaults);
    },

    /**
     * Initializes the transition plugin. Overrides the dataview's default refresh function
     * @param {Ext.view.View} dataview The dataview
     */
    init: function(dataview) {
        /**
         * @property dataview
         * @type Ext.view.View
         * Reference to the DataView this instance is bound to
         */
        this.dataview = dataview;
        
        var idProperty = this.idProperty,
            store = dataview.store;
        
        dataview.blockRefresh = true;
        dataview.updateIndexes = Ext.Function.createSequence(dataview.updateIndexes, function() {
            this.getTargetEl().select(this.itemSelector).each(function(element, composite, index) {
                element.id = element.dom.id = Ext.util.Format.format("{0}-{1}", dataview.id, store.getAt(index).internalId);
            }, this);
        }, dataview);
        
        /**
         * @property dataviewID
         * @type String
         * The string ID of the DataView component. This is used internally when animating child objects
         */
        this.dataviewID = dataview.id;
        
        /**
         * @property cachedStoreData
         * @type Object
         * A cache of existing store data, keyed by id. This is used to determine
         * whether any items were added or removed from the store on data change
         */
        this.cachedStoreData = {};
        
        //catch the store data with the snapshot immediately
        this.cacheStoreData(store.data || store.snapshot);

        dataview.on('resize', function() {
            var store = dataview.store;
            if (store.getCount() > 0) {
                // reDraw.call(this, store);
            }
        }, this);
        
        dataview.store.on('datachanged', reDraw, this);
        
        function reDraw(store) {
            var parentEl = dataview.getTargetEl(),
                calcItem = store.getAt(0),
                added    = this.getAdded(store),
                removed  = this.getRemoved(store),
                previous = this.getRemaining(store),
                existing = Ext.apply({}, previous, added);
            
            //hide old items
            Ext.each(removed, function(item) {
                var id = this.dataviewID + '-' + item.internalId;
                Ext.fly(id).animate({
                    remove  : false,
                    duration: duration,
                    opacity : 0,
                    useDisplay: true,
                    callback: function() {
                        Ext.fly(id).setDisplayed(false);
                    }
                });
            }, this);
            
            //store is empty
            if (calcItem == undefined) {
                this.cacheStoreData(store);
                return;
            }
            
            this.cacheStoreData(store);
            
            var el = Ext.get(this.dataviewID + "-" + calcItem.internalId);
            
            //if there is nothing rendered, force a refresh and return. This happens when loading asynchronously (was not
            //covered correctly in previous versions, which only accepted local data)
            if (!el) {
                dataview.refresh();
                return true;
            }
            
            //calculate the number of rows and columns we have
            var itemCount   = store.getCount(),
                itemWidth   = el.getMargin('lr') + el.getWidth(),
                itemHeight  = el.getMargin('bt') + el.getHeight(),
                dvWidth     = parentEl.getWidth(),
                columns     = Math.floor(dvWidth / itemWidth),
                rows        = Math.ceil(itemCount / columns),
                currentRows = Math.ceil(this.getExistingCount() / columns);
            
            //stores the current top and left values for each element (discovered below)
            var oldPositions = {},
                newPositions = {},
                elCache      = {};
            
            //find current positions of each element and save a reference in the elCache
            Ext.iterate(previous, function(id, item) {
                var id = item.internalId,
                    el = elCache[id] = Ext.get(this.dataviewID + '-' + id);
                
                oldPositions[id] = {
                    top : el.getTop()  - parentEl.getTop()  - el.getMargin('t') - parentEl.getPadding('t'),
                    left: el.getLeft() - parentEl.getLeft() - el.getMargin('l') - parentEl.getPadding('l')
                };
            }, this);
            
            //make sure the correct styles are applied to the parent element
            parentEl.applyStyles({
                display : 'block',
                position: 'relative'
            });
            
            //set absolute positioning on all DataView items. We need to set position, left and 
            //top at the same time to avoid any flickering
            Ext.iterate(previous, function(id, item) {
                var oldPos = oldPositions[id],
                    el     = elCache[id];

                if (el.getStyle('position') != 'absolute') {
                    elCache[id].applyStyles({
                        position: 'absolute',
                        left    : oldPos.left + "px",
                        top     : oldPos.top + "px"
                    });
                }
            });
            
            //get new positions
            var index = 0;
            Ext.iterate(store.data.items, function(item) {
                var id = item.internalId,
                    el = elCache[id];
                
                var column = index % columns,
                    row    = Math.floor(index / columns),
                    top    = row    * itemHeight,
                    left   = column * itemWidth;
                
                newPositions[id] = {
                    top : top,
                    left: left
                };
                
                index ++;
            }, this);
            
            //do the movements
            var startTime  = new Date(),
                duration   = this.duration,
                dataviewID = this.dataviewID;
            
            var doAnimate = function() {
                var elapsed  = new Date() - startTime,
                    fraction = elapsed / duration,
                    id;
                
                if (fraction >= 1) {
                    for (id in newPositions) {
                        Ext.fly(dataviewID + '-' + id).applyStyles({
                            top : newPositions[id].top + "px",
                            left: newPositions[id].left + "px"
                        });
                    }
                    
                    Ext.TaskManager.stop(task);
                } else {
                    //move each item
                    for (id in newPositions) {
                        if (!previous[id]) {
                            continue;
                        }
                        
                        var oldPos  = oldPositions[id],
                            newPos  = newPositions[id],
                            oldTop  = oldPos.top,
                            newTop  = newPos.top,
                            oldLeft = oldPos.left,
                            newLeft = newPos.left,
                            diffTop = fraction * Math.abs(oldTop  - newTop),
                            diffLeft= fraction * Math.abs(oldLeft - newLeft),
                            midTop  = oldTop  > newTop  ? oldTop  - diffTop  : oldTop  + diffTop,
                            midLeft = oldLeft > newLeft ? oldLeft - diffLeft : oldLeft + diffLeft;
                        
                        Ext.fly(dataviewID + '-' + id).applyStyles({
                            top : midTop + "px",
                            left: midLeft + "px"
                        }).setDisplayed(true);
                    }
                }
            };
            
            var task = {
                run     : doAnimate,
                interval: 20,
                scope   : this
            };
            
            Ext.TaskManager.start(task);
            
            //show new items
            Ext.iterate(added, function(id, item) {
                Ext.fly(this.dataviewID + '-' + item.internalId).applyStyles({
                    top    : newPositions[item.internalId].top + "px",
                    left   : newPositions[item.internalId].left + "px"
                }).setDisplayed(true);
                
                Ext.fly(this.dataviewID + '-' + item.internalId).animate({
                    remove  : false,
                    duration: duration,
                    opacity : 1
                });
            }, this);
            
            this.cacheStoreData(store);
        }
    },
    
    /**
     * Caches the records from a store locally for comparison later
     * @param {Ext.data.Store} store The store to cache data from
     */
    cacheStoreData: function(store) {
        this.cachedStoreData = {};
        
        store.each(function(record) {
             this.cachedStoreData[record.internalId] = record;
        }, this);
    },
    
    /**
     * Returns all records that were already in the DataView
     * @return {Object} All existing records
     */
    getExisting: function() {
        return this.cachedStoreData;
    },
    
    /**
     * Returns the total number of items that are currently visible in the DataView
     * @return {Number} The number of existing items
     */
    getExistingCount: function() {
        var count = 0,
            items = this.getExisting();
        
        for (var k in items) {
            count++;
        }
        
        return count;
    },
    
    /**
     * Returns all records in the given store that were not already present
     * @param {Ext.data.Store} store The updated store instance
     * @return {Object} Object of records not already present in the dataview in format {id: record}
     */
    getAdded: function(store) {
        var added = {};
        
        store.each(function(record) {
            if (this.cachedStoreData[record.internalId] == undefined) {
                added[record.internalId] = record;
            }
        }, this);
        
        return added;
    },
    
    /**
     * Returns all records that are present in the DataView but not the new store
     * @param {Ext.data.Store} store The updated store instance
     * @return {Array} Array of records that used to be present
     */
    getRemoved: function(store) {
        var removed = [],
            id;
        
        for (id in this.cachedStoreData) {
            if (store.findBy(function(record) {return record.internalId == id;}) == -1) {
                removed.push(this.cachedStoreData[id]);
            }
        }
        
        return removed;
    },
    
    /**
     * Returns all records that are already present and are still present in the new store
     * @param {Ext.data.Store} store The updated store instance
     * @return {Object} Object of records that are still present from last time in format {id: record}
     */
    getRemaining: function(store) {
        var remaining = {};

        store.each(function(record) {
            if (this.cachedStoreData[record.internalId] != undefined) {
                remaining[record.internalId] = record;
            }
        }, this);
        
        return remaining;
    }
});


Ext.define('LSP.view.dropdowns.compoundLookup', {
    extend: 'Ext.form.ComboBox',  
    alias: 'widget.compoundLookup',

    store:  Ext.create('Ext.data.Store',{
            fields: [
              {type: 'string', name: 'compound_name'},
              {type: 'string', name: 'compound_uri'}
            ],
            proxy: {
                type: 'ajax',
                api: {
                    read: 'core_api_calls/cmpd_name_lookup.json'
                },
                reader: {
                    type: 'json',
                    root: 'objects',
                    totalProperty: 'totalCount'
                }
            }
        }),
    	queryMode: 'remote',
      valueField:'compound_uri',
    	displayField: 'compound_name',
      name: 'compound_uri',
    	minChars:4,
    	hideTrigger:true,
    	forceSelection:true,
    	typeAhead:true,
      emptyText: 'Start typing...',
      margin: '5 5 5 5',
      width: 600,
      queryDelay: 700,
      fieldLabel: 'Compound name',
      labelWidth: 120,
      listConfig: {
        loadingText: 'Searching...',
        emptyText: 'No matching compounds found.',
      }
});

Ext.define('LSP.view.dropdowns.proteinLookup', {
    extend: 'Ext.form.ComboBox',  
    alias: 'widget.proteinLookup',

    store:  Ext.create('Ext.data.Store',{
            fields: [
              {type: 'string', name: 'protein_name'},
              {type: 'string', name: 'protein_uri'}
            ],
            proxy: {
                type: 'ajax',
                api: {
                    read: '/core_api_calls/protein_lookup.json'
                },
                reader: {
                    type: 'json',
                    root: 'objects',
                    totalProperty: 'totalCount'
                }
            }
        }),
    	queryMode: 'remote',
      valueField:'protein_uri',
    	displayField: 'protein_name',
      name: 'protein_uri',
    	minChars:4,
    	hideTrigger:true,
    	forceSelection:true,
    	typeAhead:true,
      emptyText: 'Start typing...',
      margin: '5 5 5 5',
      width: 600,
      queryDelay: 700,
      fieldLabel: 'Protein name',
      labelWidth: 120,
      listConfig: {
        loadingText: 'Searching...',
        emptyText: 'No matching proteins found.',
      }
});

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

Ext.define('LSP.view.Enzymetree', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.enzymeTree',
    
 
     requires: [
        'Ext.data.*',
        'Ext.grid.*',
        'Ext.tree.*'
    ],


    
    singleExpand: true,
    //simpleSelect: true,
    multiSelect: false,    
    rootVisible: false,
    useArrows: true,
    frame: true,
    height: 550,
    autoScroll: true,
    columns: [{
            xtype: 'treecolumn', //this is so we know which column will show the tree
            text: 'EC number',
            sortable: true,
            dataIndex: 'ec_number',
            width: 160
            },
            {
            text: 'Enzyme family name',
            dataIndex: 'name',
            width: 290            
            }],    
   
   
    initComponent: function() {
        var config = {
            store: {
                fields: [{name : 'ec_number', type: 'string', sortDir:'ASC'},{name: 'name', type: 'string'}],
                proxy: {
                    type: 'ajax',
                    api: {
                        read: 'enzymes.json'
                    },
                    reader: {
                        type: 'json',
                        root: 'objects',
                        totalProperty: 'totalCount'
                    }
                },
                sorters: [
                  {
                      property : 'ec_number',
                      direction: 'ASC'
                  }],
               sortOnLoad:true  
            }
           // autoLoad: 'enzymes.json',    
           // folderSort: true 
        };  
          
        Ext.apply(this, config);  
        Ext.apply(this.initialConfig, config);
        this.callParent(arguments);
    }
});
Ext.define('LSP.view.dropdowns.conceptWikiLookup', {
    extend: 'Ext.form.ComboBox',  
    alias: 'widget.conceptWikiLookup',

    store:  Ext.create('Ext.data.Store',{
            fields: [
              {type: 'string', name: 'concept_label'},
              {type: 'string', name: 'concept_url'},
              {type: 'string', name: 'concept_uuid'},
              {type: 'string', name: 'concept_alt_labels'},
              {type: 'string', name: 'tag_label'},
              {type: 'string', name: 'tag_uuid'},
              
              
            ],
            proxy: {
                type: 'ajax',
                api: {
                    read: '/concept_wiki_api_calls/concept_lookup.json'
                },
                reader: {
                    type: 'json'
                    }
            }
        }),
    	queryMode: 'remote',
      valueField:'concept_url',
    	displayField: 'concept_label',
      name: 'concept_uri',
    	minChars:4,
    	hideTrigger:true,
    	forceSelection:true,
    	typeAhead:true,
      emptyText: 'Start typing...',
      margin: '5 5 5 5',
      width: 700,
      queryDelay: 700,
      fieldLabel: 'Concept name',
      labelWidth: 120,
      listConfig: {
        loadingText: 'Searching...',
        emptyText: 'No matching concepts found.',
        getInnerTpl: function() {
            return '<p><b>{concept_label}</b> <a href="{concept_url}" target="_blank">(definition)</a> <i>({tag_label})</i><br/ ><small><i>{concept_alt_labels}</i></small></p>';
        }

      }
});

Ext.define('LSP.view.dropdowns.pmidLookup', {
    extend: 'Ext.form.ComboBox',  
    alias: 'widget.pmidLookup',

    store:  Ext.create('Ext.data.Store',{
            fields: [
              {type: 'string', name: 'pmid'},
              {type: 'string', name: 'pmid_uri'}
            ],
            proxy: {
                type: 'ajax',
                api: {
                    read: 'core_api_calls/pmid_lookup.json'
                },
                reader: {
                    type: 'json',                    
                }
            }
        }),
    	queryMode: 'remote',
      valueField:'pmid_uri',
    	displayField: 'pmid',
      name: 'pmid_uri',
    	minChars:2,
    	hideTrigger:true,
    	forceSelection:true,
    	typeAhead:true,
      emptyText: 'Start typing Pubmed id...',
      margin: '5 5 5 5',
      width: 600,
      queryDelay: 700,
      fieldLabel: 'Pubmed id',
      labelWidth: 120,
      listConfig: {
        loadingText: 'Searching...',
        emptyText: 'No matching pubmed ids found.',
      }
});

Ext.define('LSP.model.DynamicGrid', {
    extend: 'Ext.data.Model',
    fields: [],
   
    proxy: {
        type: 'ajax',
        api: {
            read: ''
        },
        reader: {
            type: 'json',
            root: 'objects',
            totalProperty: 'totalCount'
        }
    }

});
Ext.define('LSP.view.dropdowns.wikiPathwaysProteinLookup', {
    extend: 'Ext.form.ComboBox',  
    alias: 'widget.wikiPathwaysProteinLookup',

    store:  Ext.create('Ext.data.Store',{
            fields: [
              {type: 'string', name: 'wp_protein_name'},
              {type: 'string', name: 'wp_protein_uri'},              
            ],
            proxy: {
                type: 'ajax',
                api: {
                    read: '/core_api_calls/wiki_pathway_protein_lookup.json'
                },
                reader: {
                    type: 'json'
                    }
            }
        }),
    	queryMode: 'remote',
//      valueField:'wp_protein_uri',
      valueField:'wp_protein_uri',
    	displayField: 'wp_protein_name',
      name: 'wp_protein_uri',
    	minChars:4,
    	hideTrigger:true,
    	forceSelection:true,
    	typeAhead:true,
      emptyText: 'Start typing...',
      margin: '5 5 5 5',
      width: 700,
      queryDelay: 700,
      fieldLabel: 'Protein name',
      labelWidth: 120,
      listConfig: {
        loadingText: 'Searching...',
      }
});

Ext.define('LSP.view.dropdowns.wikiPathwaysCompoundLookup', {
    extend: 'Ext.form.ComboBox',  
    alias: 'widget.wikiPathwaysCompoundLookup',

    store:  Ext.create('Ext.data.Store',{
            fields: [
              {type: 'string', name: 'compound_name'},
              {type: 'string', name: 'compound_uri'},              
            ],
            proxy: {
                type: 'ajax',
                api: {
                    read: '/core_api_calls/wiki_pathway_compound_lookup.json'
                },
                reader: {
                    type: 'json'
                    }
            }
        }),
    	queryMode: 'remote',
//      valueField:'cmpd_uri',
      valueField:'compound_uri',
    	displayField: 'compound_name',
      name: 'compound_uri',
    	minChars:4,
    	hideTrigger:true,
    	forceSelection:true,
    	typeAhead:true,
      emptyText: 'Start typing...',
      margin: '5 5 5 5',
      width: 700,
      queryDelay: 700,
      fieldLabel: 'Compound name',
      labelWidth: 120,
      listConfig: {
        loadingText: 'Searching...',
      }
});

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

Ext.define('LSP.view.buttons.New', {
    extend: 'Ext.Button',  
    alias: 'widget.newbutton',
	constructor: function(config) {
      config = config || {};

		Ext.applyIf(config, {
			text: 'New',
			hidden: true,
			scale: iconSize,
			iconCls: 'icon-new',
			iconAlign: 'left',
			listeners: {
				click: function() {
					var win = Ext.create('widget.window', {
						title: 'Create form',
						frame: false,
						bodyBorder: true,
						closable: true,
						closeAction: 'hide',
						animateTarget: this,
						width: 600,
						height: 350,
						layout: 'fit',
						bodyStyle: 'padding: 5px;',
						items: [{
							xtype: 'form',
							frame: true,
							bodyStyle: 'padding:5px 5px 0',
							fieldDefaults: {
								msgTarget: 'side',
								labelWidth: 75
							},
							defaultType: 'textfield',
							defaults: {
								anchor: '100%'
							},

							items: [{
								fieldLabel: 'Test',
								name: 'Test'
							},{
								fieldLabel: 'Test',
								name: 'Test'
							},{
								fieldLabel: 'Test',
								name: 'Test'
							}, {
								fieldLabel: 'Test',
								name: 'Test'
							}, {
								xtype: 'timefield',
								fieldLabel: 'TimeTest',
								name: 'time',
								minValue: '9:00am',
								maxValue: '6:00pm'
							}]
							
						}],

						buttons: [{
							text: 'Create'
						},{
							text: 'Cancel'
						}]											
					
					});
					win.show();									
				}
			}
        });

	  LSP.view.buttons.New.superclass.constructor.call(this, config);
	}
	
});
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

Ext.define('LSP.view.buttons.Edit', {
    extend: 'Ext.Button',  
    alias: 'widget.editbutton',
	constructor: function(config) {
      config = config || {};

        Ext.applyIf(config, {
			text: 'Edit',
			hidden: true,
			scale: iconSize,
			iconCls: 'icon-edit',
			iconAlign: 'left',
			listeners: {
				click: function() {
					var win = Ext.create('widget.window', {
						title: 'Edit form',
						frame: false,
						closable: true,
						closeAction: 'hide',
						animateTarget: this,
						width: 600,
						height: 350,
						layout: 'fit',
						bodyStyle: 'padding: 5px;',
						items: [{
							xtype: 'form',
							frame: true,
							bodyStyle: 'padding:5px 5px 0',
							fieldDefaults: {
								msgTarget: 'side',
								labelWidth: 75
							},
							defaultType: 'textfield',
							defaults: {
								anchor: '100%'
							},

							items: [{
								fieldLabel: 'Test',
								name: 'Test'
							},{
								fieldLabel: 'Test',
								name: 'Test'
							},{
								fieldLabel: 'Test',
								name: 'Test'
							}, {
								fieldLabel: 'Test',
								name: 'Test'
							}, {
								xtype: 'timefield',
								fieldLabel: 'TimeTest',
								name: 'time',
								minValue: '9:00am',
								maxValue: '6:00pm'
							}]
							
						}],

						buttons: [{
							text: 'Save'
						},{
							text: 'Cancel'
						}]											
					
					});
					win.show();									
				}
			}
        });

      LSP.view.buttons.New.superclass.constructor.call(this, config);
	}
	
});
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

Ext.define('LSP.view.buttons.Delete', {
    extend: 'Ext.Button',  
    alias: 'widget.deletebutton',
	constructor: function(config) {
      config = config || {};

        Ext.applyIf(config, {
			text: 'Delete',
			hidden: true,
			scale: iconSize,
			iconCls: 'icon-delete',
			iconAlign: 'left'
        });

      LSP.view.buttons.New.superclass.constructor.call(this, config);
	}
	
});
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

Ext.define('LSP.view.buttons.Filter', {
    extend: 'Ext.Button',  
    alias: 'widget.filterbutton',
	constructor: function(config) {
      config = config || {};

        Ext.applyIf(config, {
			text: 'Filter',
			name: 'filter-button',
			hidden: true,
			scale: iconSize,
			iconCls: 'icon-filter',
			iconAlign: 'left',
			listeners: {
				click: function() {
					var win = Ext.create('widget.window', {
						title: 'Filter form',
						frame: false,
						closable: true,
						closeAction: 'hide',
						animateTarget: this,
						width: 600,
						height: 350,
						layout: 'fit',
						bodyStyle: 'padding: 5px;',
						items: [{
							xtype: 'form',
							frame: true,
							bodyStyle: 'padding:5px 5px 0',
							fieldDefaults: {
								msgTarget: 'side',
								labelWidth: 75
							},
							defaultType: 'textfield',
							defaults: {
								anchor: '100%'
							},

							items: [{
								fieldLabel: 'Test',
								name: 'Test'
							},{
								fieldLabel: 'Test',
								name: 'Test'
							},{
								fieldLabel: 'Test',
								name: 'Test'
							}, {
								fieldLabel: 'Test',
								name: 'Test'
							}, {
								xtype: 'timefield',
								fieldLabel: 'TimeTest',
								name: 'time',
								minValue: '9:00am',
								maxValue: '6:00pm'
							}]
							
						}],

						buttons: [{
							text: 'Filter'
						},{
							text: 'Cancel'
						}]											
					
					});
					win.show();									
				}
			}
        });

      LSP.view.buttons.New.superclass.constructor.call(this, config);
	}
	
});
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

Ext.define('LSP.controller.NavigationTree', {
    extend: 'Ext.app.Controller',
    
    stores: ['NavigationTree'],
    
    views: [
        'Appmoduletree'
    ],
    
    init: function() {
        
    }
    
});
Ext.define('LSP.controller.Queryform', {
    extend: 'Ext.app.Controller',

    views: ['sparqlform.Queryform'],

    init: function() {
        this.control({
            'queryform button[action=query]': {
                click: this.submitQuery
            }
        });
    },

    submitQuery: function(button) {
        var form = button.up('form');
        button.disable();
        values = form.getValues();
    //   console.log(values);
        var sparql_pane = form.up('queryform');
        var grid = sparql_pane.query('dynamicgrid2')[0];
        grid.store.proxy.actionMethods = {read: 'POST'};
        grid.store.proxy.extraParams = values;
        grid.store.proxy.api.read = '/core_api_calls/sparql.json';
        grid.store.load();
        grid.store.on('load',function(){form.doLayout(); button.enable();});
 
    }
});

Ext.define('LSP.controller.PharmByCmpdNameForm', {
    extend: 'Ext.app.Controller',

    views: ['pharm_by_cmpd_name2.PharmByCmpdNameForm'],

    init: function() {
        this.control({
            'PharmByCmpdNameForm button[action=query_pharm_by_cmpd_name]': {
                click: this.submitQuery                
            },
            'PharmByCmpdNameForm compoundLookup': {
                select: this.enableSubmit
            }
        });
    },
    enableSubmit: function(compoundLookup) {
        var form = proteinLookup.up('form');
        var button = form.query('button[action=query_pharm_by_cmpd_name]')[0];
        button.enable();
    },
    
    submitQuery: function(button) {
        var form = button.up('form');
        button.disable();
        values = form.getValues();
        var grid = form.query('dynamicgrid2')[0];
        grid.store.proxy.actionMethods = {read: 'POST'};
        grid.store.proxy.extraParams = values;
        grid.store.proxy.api.read = '/core_api_calls/pharm_by_compound_name.json';
        grid.store.load({params: { offset: 0, limit: 100}});
        grid.store.on('load',function(){form.doLayout();button.enable();});
    }
    
    
    }
);

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

Ext.define('LSP.controller.Settings', {
    extend: 'Ext.app.Controller',

    views: ['Settings'],

    init: function() {
        this.control({
            'settingsform button[action=save_endpoint]': {
                click: this.saveEndpoint
            },
            
        });
    },
    saveEndpoint: function(button) {
        // Call to store endpoint in session
        var form    = button.up('form');
        var values = form.getValues();
        form.submit({
            url: '/sparql_endpoint/settings.json',
            waitMsg: 'Saving end point...',
            success: function(fp, o) {
              Ext.Msg.alert('Success', 'Endpoint stored');
        }});
            
    }
    }
);

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

Ext.define('LSP.view.user.Login', {
    extend: 'Ext.window.Window',
    alias : 'widget.userlogin',

    requires: [
        'LSP.view.user.Loginform'
    ],

    title : 'Log in',
    layout: 'fit',
    modal: true,
    autoShow: true,
    height: 120,
    width: 280,

    initComponent: function() {
        this.items = [
            {
                xtype: 'loginform'
            }
        ];

        this.buttons = [
            {
                text: 'Login',
                action: 'login'
            },
            {
                text: 'Cancel',
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);
    }
});

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
    
    onLaunch: function(){
        this.checkCoreAPI();
    },
    
    checkCoreAPI: function(){
        /*
		Ext.Ajax.request({
          url: '/core_api_calls/check.json',
          success: function(response){
              var status_field = Ext.ComponentQuery.query('displayfield[id="ops_api_staus_id"]')[0];
              status_field.setValue("");
          },
          failure: function(response){
              var status_field = Ext.ComponentQuery.query('displayfield[id="ops_api_staus_id"]')[0];
              status_field.setValue("<b>Sorry, Open PHACTS core API is currently off-line<br/>Please try again later by refreshing your browser</b>");
          }
      });
	  */
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
                //LSPSharedData.user = values['user_session[login]'];
                Ext.getCmp('logoutButton').setText('Log out');
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
                //LSPSharedData.user = values['user[login]'];
                Ext.getCmp('logoutButton').setText('Log out');
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
Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('Ext.ux.grid', 'ext/examples/ux/grid');
Ext.define('LSP.view.dynamicgrid.DynamicGrid', {
    extend: 'Ext.grid.Panel',  
    alias: 'widget.dynamicgrid2',
    requires: [
		'Ext.grid.RowNumberer',
		'Ext.form.*',
		'Ext.ux.grid.FiltersFeature',
		'LSP.view.dynamicgrid.feature.selectable'
	   ],
	  //forceFit: true,
    autoScroll: true,
    layout: 'fit',
    gridBaseTitle: '',
    limit: 100,
    initComponent: function(){
        
        // initializing features for the grid
        var groupingFeature = Ext.create('Ext.grid.feature.Grouping',{
        groupHeaderTpl: 'Group: {name} ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})'
        });        
        var filters = {
        ftype: 'filters',
        // encode and local configuration options defined previously for easier reuse
        encode: true, // json encode the filter query
        local: true,   // defaults to false (remote filtering)
        };
        // this feature allows for selection of text in the grid by changing the underlaying style for the cell
        var cellTextSelector = {
          ftype: 'selectable', 
          id: 'selectable'
        };  
        
        var config = {
            tbar : [
                      {
            					xtype: 'exporterbutton',
            					name: 'exporter-button',
            					text: 'Download to Excel'
                      }
                    ],
            store: {
                fields: [],
                proxy: {
                    type: 'ajax',
                    api: {
                        read: ''
                    },
                    reader: {
                        type: 'json',
                        root: 'objects',
                        totalProperty: 'totalCount'
                    }
                }
            }, 
            columns:[{name: 'temp', hidden:true}],  
            rowNumberer: true,
            defaultWidth : 200,
            features: [groupingFeature, filters, cellTextSelector]
        };
          
        Ext.apply(this, config);  
        Ext.apply(this.initialConfig, config);
        this.callParent(arguments);
    },  
    storeLoad: function() {
        if(typeof(this.store.proxy.reader.jsonData.columns) === 'object') {  
            var columns = [];
            //console.log(this);
            if(this.rowNumberer) { columns.push(Ext.create('Ext.grid.RowNumberer',{width:40})); }  
            Ext.each(this.store.proxy.reader.jsonData.columns, function(column){
                columns.push(column);  
            });
            //console.log(columns);
            //console.log(this);
            if (typeof(title) == "undefined") {
     	        var title = this.title;
            }			
            if (this.store.proxy.reader.jsonData.totalCount > 0){
                    this.setTitle(this.gridBaseTitle + ' - Records found: ' +  this.store.proxy.reader.jsonData.totalCount);
            }
            else {
                     this.setTitle(this.gridBaseTitle + ' - Records found: ' +  'No records found!');
            }
    //            console.log(this);
    //              console.log(this.views);
                         this.reconfigure(this.store, columns);
                 this.setHeight('80%');       
                    }  
    },  
    onRender: function(ct, position) {
        LSP.view.dynamicgrid.Grid.superclass.onRender.call(this, ct, position);  
        this.store.on('load', this.storeLoad, this);
	    /*this.store.proxy.api.read = 'users.json';
        this.store.load();*/
    }
//     ,  
//     storeLoad: function() {
//         if(typeof(this.store.proxy.reader.jsonData.columns) === 'object') {  
//             var columns = [];
//             //console.log(this);
//             if(this.rowNumberer) { columns.push(Ext.create('Ext.grid.RowNumberer',{width:40})); }  
//             Ext.each(this.store.proxy.reader.jsonData.columns, function(column){
//                 columns.push(column);  
//             });
//             //console.log(columns);
//             //console.log(this);
//             if (typeof(title) == "undefined") {
//      	        var title = this.title;
//             }			
//             if (this.store.proxy.reader.jsonData.totalCount > 0){
//                     this.setTitle(title + ' - Records found: ' +  this.store.proxy.reader.jsonData.totalCount);
//             }
//             else {
//                      this.setTitle(title + ' - Records found: ' +  'No records found!');
//             }
//                          this.reconfigure(this.store, columns);
//                         
//                     }  
//     },  
//     onRender: function(ct, position) {
//         LSP.view.dynamicgrid.Grid.superclass.onRender.call(this, ct, position);  
//         this.store.on('load', this.storeLoad, this);
// 	    /*this.store.proxy.api.read = 'users.json';
//         this.store.load();*/
//     }
});
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
     
//    stores: ['DynamicGrid'],
//    models: ['DynamicGrid'],
    
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
Ext.define('LSP.view.larkc_sim_search.SimSearchForm', {
    extend: 'Ext.form.Panel',  
    alias: 'widget.SimSearchForm',
    requires: [
        'LSP.view.mol_editor_forms.KetcherForm'
    ],
    closable: true,
    layout: {
          type: 'vbox',
          align: 'stretch'
      },
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
                      {
                    xtype: 'dynamicgrid2',
                    title: 'Structure search results',
                    gridBaseTitle: 'Structure search results',                    
                    flex: 1,
                    dockedItems: [{
                        xtype: 'toolbar',
                        dock: 'top',
                        items: [{
                             xtype: 'button',
                            iconCls: 'icon-mol_dv',
                            text: 'Data View',
                            action: 'data_view'
                        }]
                    }]
                    } 
                      ]
                  }           
                ];
                
        this.callParent(arguments);
    }    
});


    Ext.Loader.setConfig({enabled: true});
    Ext.Loader.setPath('Ext.ux.DataView', '/ext/examples/ux/DataView/');

Ext.define('LSP.view.dataview.StructureViewer', {
    extend: 'Ext.window.Window',
    alias: 'widget.StructureViewer',
   
    requires: ['Ext.form.Panel','Ext.util.*','Ext.ux.DataView.Animated'],

    title : 'Structures',
    layout: 'fit',
    modal: true,
    autoShow: true,
    height: 570,
    width: 810,

    initComponent: function() {
        var store = structureViewStore
        var dataview = Ext.create('Ext.view.View', {
        deferInitialRefresh: false,
        store: store,
        tpl  : Ext.create('Ext.XTemplate',
            '<tpl for=".">',
                '<div class="structure_data_view-wrap">',
                   '<p height="180">', 
                    '<img width="128" height="128" src="http://www.chemspider.com/ImagesHandler.ashx?id={csid}&w=128&h=128" alt="CSID:{csid}"/>',
                    '<br /><strong>Chemspider id : <a href ="http://inchi.chemspider.com/Chemical-Structure.{csid}.html" target="_blank">{csid}</a></strong>',
                   '</p>', 
                '</div>',
            '</tpl>'
        ),

        plugins : [
            Ext.create('Ext.ux.DataView.Animated', {
                duration  : 550,
                idProperty: 'csid'
            })
        ],
        itemSelector: 'div.structure_data_view-wrap',
        overItemCls : 'x-view-over_structure_dv',
        singleSelect : true,
        autoScroll: true
    });
      
        this.items = [
            {
                xtype: 'form',
                padding: '0 0 0 0',
                border: false,
                autoScroll: true,
                style: 'background-color: #fff;',
                items: dataview
                    }
        ];

        this.buttons = [
            {
                text: 'Use structure',
                action: 'commit_structure'
            },
            {
                text: 'Cancel',
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);
    }
});
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

        var grid = form.query('dynamicgrid2')[0];
        grid.store.proxy.actionMethods = {read: 'POST'};
        grid.store.proxy.extraParams = values;
        grid.store.proxy.api.read = '/core_api_calls/search_by_smiles.json';
        grid.store.load({params: { offset: 0, limit: 100}});
        grid.store.on('load',function(){form.doLayout()});
        var grid_title = '';
        if (values.search_type == '1') {grid_title = 'Exact structure match'};
        if (values.search_type == '2') {grid_title = 'Substructure structure'};
        if (values.search_type == '3') {grid_title = 'Similarity search'};
        grid.setTitle(grid_title);
    },
    
    launchDataView: function(button) {
        var grid = button.up('dynamicgrid2');
        structureViewStore = grid.store;
        var view = Ext.widget('StructureViewer');    
   //     console.log(grid.store);  
    
    }
        
    }
);

Ext.define('LSP.view.cmpd_by_name.CmpdByNameForm', {
    extend: 'Ext.form.Panel',  
    alias: 'widget.CmpdByNameForm',
    closable: true,
    requires: [
        'LSP.view.dropdowns.compoundLookup'
    ],
    layout: {
          type: 'vbox',
          align: 'stretch'
      },
    
     initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
          items: [
                   {
                xtype: 'container',
                margin: '5 5 5 5',
                name: 'form_fields',
                layout: {
                    type: 'column'
                },
                style: 'background-color: #fff;',
                items: [                      
                      { 
                        xtype: 'compoundLookup',                        
                      },
                      {
                        xtype: 'button',
                        padding: '5 5 5 5',
                        text: 'Search',
                        disabled: true,
                        action: 'query_cmpd_by_name'
                      }
                      ]},
                      {
                    xtype: 'dynamicgrid2',
                    title: 'Compound by name search results',
                    gridBaseTitle: 'Compound by name search results',
                    flex: 1,
                    }                             
                ]        
          });
        this.callParent(arguments);
    }    
});

Ext.define('LSP.controller.CmpdByNameForm', {
    extend: 'Ext.app.Controller',

    views: ['cmpd_by_name.CmpdByNameForm'],

    init: function() {
        this.control({
            'CmpdByNameForm button[action=query_cmpd_by_name]': {
                click: this.submitQuery
            },
            'CmpdByNameForm compoundLookup': {
                select: this.enableSubmit
            }
        });
    },
    
       enableSubmit: function(proteinLookup) {
        var form = proteinLookup.up('form');
        var button = form.query('button[action=query_cmpd_by_name]')[0];
        button.enable();
    },
    
    submitQuery: function(button) {
        var form = button.up('form');
        button.disable();
        values = form.getValues();
        var grid = form.query('dynamicgrid2')[0];
        grid.store.proxy.actionMethods = {read: 'POST'};
        grid.store.proxy.extraParams = values;
        grid.store.proxy.api.read = '/core_api_calls/compound_info.json';
        grid.store.load({params: { offset: 0, limit: 100}});
        grid.store.on('load',function(){
            form.doLayout();
            button.enable();
            
            });
        
//         grid_cmpdbyname.store.proxy.actionMethods = {read: 'POST'};
//         grid_cmpdbyname.store.proxy.extraParams = values;
//         grid_cmpdbyname.store.proxy.api.read = '/core_api_calls/compound_info.json';
//         grid_cmpdbyname.store.load({params: { offset: 0, limit: 100}});
    }
    
    
    }
);

Ext.define('LSP.view.target_by_name.TargetByNameForm', {
    extend: 'Ext.form.Panel',  
    alias: 'widget.TargetByNameForm',
    closable: true,
    requires: [
        'LSP.view.dropdowns.proteinLookup'
//        'LSP.view.dropdowns.conceptWikiProteinLookup'
    ],
    layout: {
          type: 'vbox',
          align: 'stretch'
      },
     initComponent: function() {
    
        this.items = [
                   {
                xtype: 'container',
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
                        name: 'authenticity_token',
                        xtype: 'hidden',
                        value: $$('meta[name=csrf-token]')[0].readAttribute('content')
                      },
                      {
                        xtype: 'proteinLookup'                      
                      },                        
                      {
                        xtype: 'button',
                        padding: '5 5 5 5',
                        text: 'Search',
                        disabled: true,
                        action: 'query_target_by_name'
                      }]},
                      {
                    xtype: 'dynamicgrid2',
                    title: 'Target by name search results',
                    gridBaseTitle: 'Target by name search results',
                    flex: 1,
                    }                       
                ];
        this.callParent(arguments);
    }    
});

Ext.define('LSP.controller.TargetByNameForm', {
    extend: 'Ext.app.Controller',

    views: ['target_by_name.TargetByNameForm'],

    init: function() {
        this.control({
            'TargetByNameForm button[action=query_target_by_name]': {
                click: this.submitQuery
            },
            'TargetByNameForm proteinLookup': {
                select: this.enableSubmit
            }
        });
    },
    
    enableSubmit: function(proteinLookup) {
        var form = proteinLookup.up('form');
        var button = form.query('button[action=query_target_by_name]')[0];
        button.enable();
    },
    
    submitQuery: function(button) {
        var form = button.up('form');
        button.disable();
        values = form.getValues();
        var grid = form.query('dynamicgrid2')[0];
        grid.store.proxy.actionMethods = {read: 'POST'};
        grid.store.proxy.extraParams = values;
        grid.store.proxy.api.read = '/core_api_calls/protein_info.json';
        grid.store.load({params: { offset: 0, limit: 100}});
        grid.store.on('load',function(){form.doLayout();button.enable();});
   
    }
    
    
    }
);

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

Ext.define('LSP.view.tree_selector_forms.EnzymeTreeForm', {
    extend: 'Ext.window.Window',
    alias : 'widget.EnzymeTreeForm',

    requires: ['Ext.form.Panel','LSP.view.Enzymetree'],

    title : 'Select an enzyme family',
    layout: 'fit',
    modal: true,
    autoShow: true,
    height: 600,
    width: 500,

    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                padding: '0 0 0 0',
                border: false,
                style: 'background-color: #fff;',

                items: [
                    enztree = Ext.widget('enzymeTree')
                       ]
            }
        ];

        this.buttons = [
            {
                text: 'Use selection',
                action: 'get_enzyme'
            },
            {
                text: 'Cancel',
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);
    }
});

Ext.define('LSP.view.larkc_pharm_by_target.PharmEnzymeForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.PharmEnzymeForm',

    requires: [
        'LSP.view.tree_selector_forms.EnzymeTreeForm'
    ],                         
    closable: true,
    layout: {
          type: 'vbox',
          align: 'stretch'
      },
    initComponent: function() {
        var me = this;
        me.items = [
            {
                xtype: 'container',
                height: 34,
                name: 'form_fields',
          //      width: 600,
                layout: {
                    type: 'column'
                },
                items: [
                    {
                        xtype: 'displayfield',
                        name: 'enzyme_family',
                        margin: '5 5 5 5',
                        width: 488,
                        value: 'No enzyme class selected - press button ->',
                        fieldLabel: 'Enzyme family class',
                        labelWidth: 130
                    },
                    {
                        xtype: 'button',
                        padding: '5 5 5 5',
                        text: 'Browse EC codes',
                        action: 'enz_tree'
                    },
                    {
                        name: 'enz_name',
                        xtype: 'hidden',
                        value: ''
                    },
                    {
                        name: 'ec_number',
                        xtype: 'hidden',
                        value: ''
                    },
                    {
                        name: 'utf8',
                        xtype: 'hidden',
                        value: '&#x2713;'
                    },
                    {
                        name: 'authenticity_token',
                        xtype: 'hidden',
                        value: $$('meta[name=csrf-token]')[0].readAttribute('content')
                    }
                ]
            },
            {
                xtype: 'fieldset',
          //      width: 600,
                layout: {
                    type: 'fit'
                },
                title: 'Variables',
                items: [
                    {
                        xtype: 'fieldcontainer',
                        height: 31,
                        width: 601,
                        layout: {
                            type: 'column'
                        },
                        fieldLabel: 'Filter by activity (mM)',
                        labelWidth: 125,
                        items: [
                            {
                                xtype: 'numberfield',
                                name: 'min_filter',
                                margin: '0 5 0 5',
                                padding: '',
                                width: 190,
                                fieldLabel: 'exclude below (<)',
                                labelWidth: 110,
                                autoStripChars: true,
                                maxValue: 1000000,
                                minValue: 0.00000,
                                decimalPrecision: 6,
                                value: 0.00000,
                                allowDecimals: true
                            },
                            {
                                xtype: 'numberfield',
                                name: 'max_filter',
                                margin: '0 5 0 5',
                                width: 190,
                                fieldLabel: 'exclude above (>)',
                                labelWidth: 110,
                                maxValue: 10000000,
                                minValue: 0.000001,
                                decimalPrecision: 6,
                                value: 1000000,
                                allowDecimals: true
                            }
                        ]
                    },
                    {
                        xtype: 'checkboxgroup',
                        height: 34,
                        width: 600,
                        fieldLabel: 'Species',
                        items: [
                            {
                                xtype: 'checkboxfield',
                                boxLabel: 'Human',
                                inputValue: 'Homo+sapiens',
                                name: 'species_1'
                            },
                            {
                                xtype: 'checkboxfield',
                                boxLabel: 'Mouse',
                                inputValue: 'Mus+musculus',
                                name: 'species_2'
                            },                            
                            {
                                xtype: 'checkboxfield',
                                boxLabel: 'Rat',
                                inputValue: 'Rattus+norvegicus',
                                name: 'species_3'
                            }
                        ]
                    }
                ]
            },
                   {
                       xtype: 'button',
                       action: 'query',
                       text: 'Start search'
                   },                   
			            {
                    xtype: 'dynamicgrid2',
                    title: 'Inhibitors for enzyme class: no selection yet',
                    gridBaseTitle: 'Inhibitors for enzymes in class: ',
                    flex: 1,
                    }  
        ];                  
        me.callParent(arguments);
    }
});
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
        
        var grid = form.query('dynamicgrid2')[0];
        grid.store.proxy.extraParams = values;
        grid.store.proxy.api.read = '/core_api_calls/pharm_enzyme_fam.json';
        grid.setTitle('Inhibitors for enzymes in class:  ' + values.ec_number + ' => ' + values.enz_name);
        grid.store.load();
        grid.store.on('load',function(){form.doLayout()});
        
    }
    
    
    }
);

Ext.define('LSP.view.pharm_by_target_name2.PharmByTargetNameForm', {
    extend: 'Ext.form.Panel',  
    alias: 'widget.PharmByTargetNameForm',
    closable: true,
    requires: [
        'LSP.view.dropdowns.proteinLookup'
    ],
    layout: {
          type: 'vbox',
          align: 'stretch'
      },
     initComponent: function() {
        
        this.items = [
                   {
                xtype: 'container',
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
                        name: 'authenticity_token',
                        xtype: 'hidden',
                        value: $$('meta[name=csrf-token]')[0].readAttribute('content')
                      },
                      {
                        xtype: 'proteinLookup'                      
                      },
                      {
                        xtype: 'button',
                        padding: '5 5 5 5',
                        text: 'Search',
                        disabled: true,
                        name: 'query_summit_button',
                        action: 'query_pharm_by_target_name'
                      }]},
                      {
                        xtype: 'dynamicgrid2',
                        title: 'Pharmacology by Target name search results',
                        gridBaseTitle: 'Pharmacology by Target name search results',
                        flex: 1,
                        } 
                ]; 
        this.callParent(arguments);
    }    
});

Ext.define('LSP.controller.PharmByTargetNameForm', {
    extend: 'Ext.app.Controller',

    views: ['pharm_by_target_name2.PharmByTargetNameForm'],

    init: function() {
        this.control({
            'PharmByTargetNameForm button[action=query_pharm_by_target_name]': {
                click: this.submitQuery                
            },
            'PharmByTargetNameForm proteinLookup': {
                select: this.enableSubmit
            }
        });
    },
    
    enableSubmit: function(proteinLookup) {
        var form = proteinLookup.up('form');
        var button = form.query('button[action=query_pharm_by_target_name]')[0];
        button.enable();
    },
    
    submitQuery: function(button) {
        var form = button.up('form');
        button.disable();
        values = form.getValues();
        var grid = form.query('dynamicgrid2')[0];
        grid.store.proxy.actionMethods = {read: 'POST'};
        grid.store.proxy.extraParams = values;
        grid.store.proxy.api.read = '/core_api_calls/pharm_by_protein_name.json';
        grid.store.load({params: { offset: 0, limit: 100}});
        grid.store.on('load',function(){form.doLayout();button.enable();});
    }
    
    
    }
);

Ext.define('LSP.view.concept.SummeryForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.SummeryForm',
    closable: true,
    requires: [
        'LSP.view.dropdowns.conceptWikiLookup'
    ],    
    initComponent: function() {
        var me = this;
        me.items = [
            {
                xtype: 'container',
                height: '6%',
                margin: '5 5 5 5',
                name: 'form_fields',
                layout: {
                    type: 'column'
                },
                items: [
                    {
                        xtype: 'conceptWikiLookup'
                    },
                    {
                        xtype: 'button',
                        padding: '5 5 5 5',
                        text: 'Look up',
                        action: 'look_up_concept'
                    },
                    {
                        name: 'utf8',
                        xtype: 'hidden',
                        value: '&#x2713;'
                    },
                    {
                        name: 'authenticity_token',
                        xtype: 'hidden',
                        value: $$('meta[name=csrf-token]')[0].readAttribute('content')
                    }
                ]},
                  object_grid = Ext.widget('dynamicgrid2'),
                  subject_grid = Ext.widget('dynamicgrid2')
        ];
        object_grid.setTitle('Concept Properties');
        object_grid.setHeight('47%'); 
        subject_grid.setTitle('Concept Relations');
        subject_grid.setHeight('47%'); 
        me.callParent(arguments);
    }
});
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

Ext.define('LSP.controller.SummeryForm', {
    extend: 'Ext.app.Controller',

    views: ['concept.SummeryForm'],

    init: function() {
        this.control({
            'SummeryForm button[action=look_up_concept]': {
                click: this.lookUpConcept
            }
        });
    },

    lookUpConcept: function(button) {
        var form = button.up('form'),
        values = form.getValues();
        subject_grid.store.proxy.actionMethods = {read: 'POST'};
        subject_grid.store.proxy.extraParams = values
        subject_grid.store.proxy.api.read = '/sparql_endpoint/concept_subject_summery.json';
        subject_grid.store.load();
        object_grid.store.proxy.actionMethods = {read: 'POST'};
        object_grid.store.proxy.extraParams = values
        object_grid.store.proxy.api.read = '/sparql_endpoint/concept_object_summery.json';
        object_grid.store.load();
    }
});

Ext.define('LSP.view.textmining.pmidTextMiningHitsForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.pmidTextMiningHits',
    requires: [
        'LSP.view.dropdowns.pmidLookup'
    ],                         
    closable: true,
    height: 560,
    width: 606,
    bodyPadding: 10,
    layout: {
              type: 'vbox',
              align: 'stretch'
          },
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, { 
            items: [
                {
                    xtype: 'container',
                    activeItem: 0,
                    layout: {
                        type: 'column'
                    },
                    items: [
                        {
                            xtype: 'pmidLookup',
                            margin: '0 10 0 10',                          
                            labelWidth: 75,
                            width: 650,
                        },
                        {
                            xtype: 'button',
                            text: 'Search...',
                            action: 'query',
                            disabled: true,
                            width: 120,
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    height: 200,
                    layout: 'anchor',
                    defaults: {labelWidth: 75},
                    title: 'Bibliographic information',
                    items: [
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Title',
                            name: 'title',
                            anchor: '100%',
                        },
                        {
                            xtype: 'textarea',
                            height: 150,
                            readOnly: true,
                            fieldLabel: 'Abstract',
                            name: 'abstract',
                            anchor: '100%',
                        }
                    ]
                },
                {
                    xtype: 'dynamicgrid2',
                    title: 'Text mined concepts',
                    gridBaseTitle: 'Text mined concepts',                    
                    name: 'textmining_hits',
                    flex: 1,
                }
            ]
        });

        me.callParent(arguments);
    }
});
Ext.define('LSP.store.DynamicGrid', {
    extend: 'Ext.data.Store',    
    model: 'LSP.model.DynamicGrid'
});
Ext.define('LSP.controller.pmidTextMiningHitsForm', {
extend: 'Ext.app.Controller',

    views: ['textmining.pmidTextMiningHitsForm'],
    stores: ['DynamicGrid'],
    
    refs: [
        {
            ref: 'tmForm',
            selector: 'pmidTextMiningHitsForm'
        }
    ],
    
    init: function() {
        this.control({
            'pmidTextMiningHits button[action=query]': {
                click: this.submitQuery                
            },
            'pmidTextMiningHits pmidLookup': {
                select: this.enableSubmit
            }
        });
    },

    enableSubmit: function(pmidLookup) {
        var form = pmidLookup.up('form');
        var button = form.query('button[action=query]')[0];
        button.enable();
    },
    
    submitQuery: function(button) {
        var form = button.up('form');
        button.disable();
  //      console.log(form);
        values = form.getValues();
        
        var grid = form.query('dynamicgrid2')[0];
        grid.store.proxy.extraParams = {pubmed_uri: values.pmid_uri};
        grid.store.proxy.api.read = 'core_api_calls/pmid2concepts.json';
        grid.store.load();
        grid.store.on('load',function(){
              form.doLayout();
              button.enable();
              });
        
        Ext.Ajax.request({
          url: 'core_api_calls/pmid2title.json',
          params: {
              pubmed_uri: values.pmid_uri
          },
          success: function(response){
              var title = response.responseText;
              form.form.findField('title').setValue(Ext.JSON.decode(title).title);
          }
      });
      Ext.Ajax.request({
          url: 'core_api_calls/pmid2abstract.json',
          params: {
              pubmed_uri: values.pmid_uri
          },
          success: function(response){
              var abst = response.responseText;
              form.form.findField('abstract').setValue(Ext.JSON.decode(abst).abstract);
          }
      });
//       Ext.Ajax.request({
//           url: 'core_api_calls/pmid2concepts.json',
//           params: {
//               pubmed_uri: values.pmid_uri
//           },
//           success: function(response){
//               var hits = response.responseText;
//               console.log(hits);
//               //form.form.findField('abstract').setValue(Ext.JSON.decode(abst).abstract);
//           }
//       });
    }}
);

Ext.define('LSP.view.pathways.pathwayByProteinForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.pathwayByProteinForm',
    requires: [
        'LSP.view.dropdowns.wikiPathwaysProteinLookup'
    ],                         
    closable: true,
    height: 560,
    width: 606,
    bodyPadding: 10,
    layout: {
              type: 'vbox',
              align: 'stretch'
          },
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, { 
            items: [
                {
                    xtype: 'container',
                    activeItem: 0,
                    layout: {
                        type: 'column'
                    },
                    items: [
                        {
                            xtype: 'wikiPathwaysProteinLookup',
                            margin: '0 10 0 10',                          
                            labelWidth: 100,
                            width: 650,
                        },
                        {
                            xtype: 'button',
                            text: 'Search...',
                            action: 'query',
                            disabled: true,
                            width: 120,
                        }
                    ]
                },
                {
                    xtype: 'dynamicgrid2',
                    title: 'Pathways including protein',
                    gridBaseTitle: 'Pathways including protein',
                    name: 'pathway_by_protein_grid',
                    flex: 1,
                    dockedItems: [{
                        xtype: 'toolbar',
                        dock: 'top',
                        items: [{
                            xtype: 'button',
                            text: 'View pathway in WikiPathways applet (Google Chrome only)',
                            action: 'wp_view'
                        }]
                    }]
                }
            ]
        });

        me.callParent(arguments);
    }
});

Ext.define('LSP.controller.pathwayByProteinForm', {
extend: 'Ext.app.Controller',

    views: ['pathways.pathwayByProteinForm','pathways.wikiPathwaysWindow'],
    stores: ['DynamicGrid'],
    
    refs: [
        {
            ref: 'pwbyproteinForm',
            selector: 'pathwayByProteinForm'
        }
    ],
    
    init: function() {
        this.control({
            'pathwayByProteinForm button[action=query]': {
                click: this.submitQuery                               
            },
            'pathwayByProteinForm button[action=wp_view]': {
                click: this.launchWPApplet                               
            },
            'pathwayByProteinForm wikiPathwaysProteinLookup': {
                select: this.enableSubmit                               
            },
            
        });
    },
    
    
    enableSubmit: function(wikiPathwaysProteinLookup) {
        var form = wikiPathwaysProteinLookup.up('form');
        var button = form.query('button[action=query]')[0];
        button.enable();
    },
    
    // Launch WikiPathways applet window
    launchWPApplet: function(button) {
        var form = button.up('form');
        var grid = form.query('dynamicgrid2')[0];
        var selection = grid.getSelectionModel().getSelection()[0];
        console.log(selection.data);
        if (selection) {
            //TODO get the "WP88" like id and save to a var before fireing
           // Launch the window
            var view = Ext.widget('wikiPathwaysWindow',{wpathway_id: selection.data.Pathway_id});    
          }            
    },
    
    submitQuery: function(button) {
        var form = button.up('form');
        button.disable();
  //      console.log(form);
        values = form.getValues();
  //      console.log(values);
        var grid = form.query('dynamicgrid2')[0];
        grid.store.proxy.extraParams = values;
        grid.store.proxy.api.read = 'core_api_calls/wiki_pathways_by_protein.json';
        grid.store.load();
        grid.store.on('load',function(){
            form.doLayout();
            button.enable();
            });
    }}
);

Ext.define('LSP.view.pathways.pathwayByCompoundForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.pathwayByCompoundForm',
    requires: [
        'LSP.view.dropdowns.wikiPathwaysCompoundLookup'
    ],                         
    closable: true,
    height: 560,
    width: 606,
    bodyPadding: 10,
    layout: {
              type: 'vbox',
              align: 'stretch'
          },
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, { 
            items: [
                {
                    xtype: 'container',
                    activeItem: 0,
                    layout: {
                        type: 'column'
                    },
                    items: [
                        {
                            xtype: 'wikiPathwaysCompoundLookup',
                            margin: '0 10 0 10',                          
                            labelWidth: 100,
                            width: 650,
                        },
                        {
                            xtype: 'button',
                            text: 'Search...',
                            disabled: true,
                            action: 'query',
                            width: 120,
                        }
                    ]
                },
                {
                    xtype: 'dynamicgrid2',
                    title: 'Pathways including compound',
                    gridBaseTitle: 'Pathways including compound',
                    name: 'pathway_by_cmpd_grid',
                    flex: 1,
                    dockedItems: [{
                        xtype: 'toolbar',
                        dock: 'top',
                        items: [{
                            xtype: 'button',
                            text: 'View pathway in WikiPathways applet (Google Chrome only)',
                            action: 'wp_view'
                        }]
                    }]
                }
            ]
        });

        me.callParent(arguments);
    }
});

Ext.define('LSP.controller.pathwayByCompoundForm', {
extend: 'Ext.app.Controller',

    views: ['pathways.pathwayByCompoundForm','pathways.wikiPathwaysWindow'],
    stores: ['DynamicGrid'],
    
    refs: [
        {
            ref: 'pwbycmpdForm',
            selector: 'pathwayByCompoundForm'
        }
    ],
    
    init: function() {
        this.control({
            'pathwayByCompoundForm button[action=query]': {
                click: this.submitQuery                               
            },
            'pathwayByCompoundForm button[action=wp_view]': {
                click: this.launchWPApplet                               
            },
            'pathwayByCompoundForm wikiPathwaysCompoundLookup': {
                select: this.enableSubmit                               
            }
            
        });
    },
    
    
    enableSubmit: function(wikiPathwaysCompoundLookup) {
        var form = wikiPathwaysCompoundLookup.up('form');
        var button = form.query('button[action=query]')[0];
        button.enable();
    },
    
    
    // Launch WikiPathways applet window
    launchWPApplet: function(button) {
        var form = button.up('form');
        var grid = form.query('dynamicgrid2')[0];
        var selection = grid.getSelectionModel().getSelection()[0];
        console.log(selection.data);
        if (selection) {
            //TODO get the "WP88" like id and save to a var before fireing
           // Launch the window
            var view = Ext.widget('wikiPathwaysWindow',{wpathway_id: selection.data.Pathway_id});    
          }            
    },
    
    submitQuery: function(button) {
        var form = button.up('form');
        button.disable();
  //      console.log(form);
        values = form.getValues();
  //      console.log(values);
        var grid = form.query('dynamicgrid2')[0];
        grid.store.proxy.extraParams = values;
        grid.store.proxy.api.read = 'core_api_calls/wiki_pathways_by_compound.json';
        grid.store.load();
        grid.store.on('load',function(){
            form.doLayout();
            button.enable();
            });
    }}
);

Ext.define('LSP.view.Viewer', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.viewer',
    
    requires: [
		'LSP.view.usergrid.UserGrid',
		'LSP.view.sparqlform.Queryform',
		'LSP.view.larkc_sim_search.SimSearchForm',
		'LSP.view.cmpd_by_name.CmpdByNameForm',
		'LSP.view.target_by_name.TargetByNameForm',
		'LSP.view.pharm_by_cmpd_name2.PharmByCmpdNameForm',
		'LSP.view.pharm_by_target_name2.PharmByTargetNameForm',
		'LSP.view.concept.SummeryForm',
		'LSP.view.placeholder.temp',
		'LSP.view.larkc_pharm_by_target.PharmEnzymeForm',
		'LSP.view.textmining.pmidTextMiningHitsForm',
		'LSP.view.pathways.pathwayByCompoundForm',
                'LSP.view.pathways.pathwayByProteinForm'
	],
    
    activeItem: 0,
    margins: '0 4 4 4',
    //cls: 'preview',
    
    initComponent: function() {
        
        this.callParent(arguments);
    }
});

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

Ext.define('LSP.view.standardToolbar.StandardToolbar', {
    extend: 'Ext.toolbar.Toolbar',  
    alias: 'widget.standardtoolbar',
	
	requires: [
		'LSP.view.buttons.New',
		'LSP.view.buttons.Edit',
		'LSP.view.buttons.Delete',
		'LSP.view.buttons.Filter'
	],
				
	initComponent: function(){  
		var config = {
			xtype: 'toolbar',
			dock: 'top',
			items: [
				{
					text: 'Reload',
					name: 'load-button',
					action: 'load',
					hidden: true,
					iconCls: 'icon-reload',
                    listeners: {
                        click: function(a,b,c) {
                            Ext.getCmp(this.ownerCt.ownerCt.id).store.proxy.api.read = this.ownerCt.ownerCt.url;
                            Ext.getCmp(this.ownerCt.ownerCt.id).store.load();
                        }
                    }
				},
				{
					xtype: 'newbutton',
					name: 'new-button'
				},
				{
					xtype: 'editbutton',
					name: 'edit-button'
				},
				{
					xtype: 'deletebutton',
					name: 'delete-button'
			    },
			    {
					xtype: 'filterbutton',
					name: 'filter-button'
			  },
			  {
					xtype: 'button',
					name: 'exporter-button',
					hidden: false,
					text: 'Download to Excel'
			  }
			]
		};
	
		Ext.apply(this, config);  
        Ext.apply(this.initialConfig, config);  
        this.callParent(arguments);
    },
	
	onRender: function(ct, position) {
        LSP.view.standardToolbar.StandardToolbar.superclass.onRender.call(this, ct, position);  
    }
	
});
	
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
Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('Ext.ux.grid', 'ext/examples/ux/grid');
Ext.define('LSP.view.dynamicgrid.Grid', {
    extend: 'Ext.grid.GridPanel',  
    alias: 'widget.dynamicgrid',
    
    requires: [
		'Ext.grid.RowNumberer',
		'Ext.form.*',
		'Ext.ux.grid.FiltersFeature',
		'LSP.view.standardToolbar.StandardToolbar'
	],
    
    initComponent: function(){
        
        var groupingFeature = Ext.create('Ext.grid.feature.Grouping',{
        groupHeaderTpl: 'Group: {name} ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})'
        });
        var filters = {
        ftype: 'filters',
        // encode and local configuration options defined previously for easier reuse
        encode: false, // json encode the filter query
        local: true,   // defaults to false (remote filtering)
        };  
        var config = {
            store: {
                fields: [],
                proxy: {
                    type: 'ajax',
                    api: {
                        read: ''
                    },
                    reader: {
                        type: 'json',
                        root: 'objects',
                        totalProperty: 'totalCount'
                    }
                }
            },
      	dockedItems: [{
				  xtype: 'standardtoolbar'
      		}],
            columns:[{name: 'temp', hidden:true}],  
            rowNumberer: true,
            defaultWidth : 200,
            features: [groupingFeature, filters]
        };  
          
        Ext.apply(this, config);  
        Ext.apply(this.initialConfig, config);
        this.callParent(arguments);
    },  
    buttonRender: function(showButtons) {
		hiddenButtons = this.down('toolbar').items.items;
		hiddenButtons.forEach(function(hiddenItem) { 
			showButtons.forEach(function(showItem) {
				if(hiddenItem.name == showItem + '-button')
					{hiddenItem.show();}
			})
		});
    },  
    storeLoad: function() {
        if(typeof(this.store.proxy.reader.jsonData.columns) === 'object') {  
            var columns = [];
            //console.log(this);
            if(this.rowNumberer) { columns.push(Ext.create('Ext.grid.RowNumberer',{width:40})); }  
            Ext.each(this.store.proxy.reader.jsonData.columns, function(column){
                columns.push(column);  
            });
            //console.log(columns);
            //console.log(this);
            if (typeof(title) == "undefined") {
     	        var title = this.title;
            }			
            if (this.store.proxy.reader.jsonData.totalCount > 0){
                    this.setTitle(title + ' - Records found: ' +  this.store.proxy.reader.jsonData.totalCount);
            }
            else {
                     this.setTitle(title + ' - Records found: ' +  'No records found!');
            }
          //      console.log(this);
          //        console.log(this.views);
                         this.reconfigure(this.store, columns);
                        
                    }  
    },  
    onRender: function(ct, position) {
        LSP.view.dynamicgrid.Grid.superclass.onRender.call(this, ct, position);  
        this.store.on('load', this.storeLoad, this);
	    /*this.store.proxy.api.read = 'users.json';
        this.store.load();*/
    }
});
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

Ext.define('LSP.controller.Grid', {
    extend: 'Ext.app.Controller',
    
    views: [
        'dynamicgrid.Grid'
    ],
    
    stores: ['Grids'],
    models: ['Grid']
});
/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as published by the Free Software Foundation and appearing in the file LICENSE included in the packaging of this file.  Please review the following information to ensure the GNU General Public License version 3.0 requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
/**
 * @class Ext.ux.grid.menu.ListMenu
 * @extends Ext.menu.Menu
 * This is a supporting class for {@link Ext.ux.grid.filter.ListFilter}.
 * Although not listed as configuration options for this class, this class
 * also accepts all configuration options from {@link Ext.ux.grid.filter.ListFilter}.
 */
Ext.define('Ext.ux.grid.menu.ListMenu', {
    extend: 'Ext.menu.Menu',

    /**
     * @cfg {String} labelField
     * Defaults to 'text'.
     */
    labelField :  'text',
    /**
     * @cfg {String} paramPrefix
     * Defaults to 'Loading...'.
     */
    loadingText : 'Loading...',
    /**
     * @cfg {Boolean} loadOnShow
     * Defaults to true.
     */
    loadOnShow : true,
    /**
     * @cfg {Boolean} single
     * Specify true to group all items in this list into a single-select
     * radio button group. Defaults to false.
     */
    single : false,

    constructor : function (cfg) {
        this.selected = [];
        this.addEvents(
            /**
             * @event checkchange
             * Fires when there is a change in checked items from this list
             * @param {Object} item Ext.menu.CheckItem
             * @param {Object} checked The checked value that was set
             */
            'checkchange'
        );

        this.callParent([cfg = cfg || {}]);

        if(!cfg.store && cfg.options){
            var options = [];
            for(var i=0, len=cfg.options.length; i<len; i++){
                var value = cfg.options[i];
                switch(Ext.type(value)){
                    case 'array':  options.push(value); break;
                    case 'object': options.push([value.id, value[this.labelField]]); break;
                    case 'string': options.push([value, value]); break;
                }
            }

            this.store = Ext.create('Ext.data.ArrayStore', {
                fields: ['id', this.labelField],
                data:   options,
                listeners: {
                    'load': this.onLoad,
                    scope:  this
                }
            });
            this.loaded = true;
        } else {
            this.add({text: this.loadingText, iconCls: 'loading-indicator'});
            this.store.on('load', this.onLoad, this);
        }
    },

    destroy : function () {
        if (this.store) {
            this.store.destroyStore();
        }
        this.callParent();
    },

    /**
     * Lists will initially show a 'loading' item while the data is retrieved from the store.
     * In some cases the loaded data will result in a list that goes off the screen to the
     * right (as placement calculations were done with the loading item). This adapter will
     * allow show to be called with no arguments to show with the previous arguments and
     * thus recalculate the width and potentially hang the menu from the left.
     */
    show : function () {
        var lastArgs = null;
        return function(){
            if(arguments.length === 0){
                this.callParent(lastArgs);
            } else {
                lastArgs = arguments;
                if (this.loadOnShow && !this.loaded) {
                    this.store.load();
                }
                this.callParent(arguments);
            }
        };
    }(),

    /** @private */
    onLoad : function (store, records) {
        var me = this,
            visible = me.isVisible(),
            gid, item, itemValue, i, len;

        me.hide(false);

        me.removeAll(true);

        gid = me.single ? Ext.id() : null;
        for (i = 0, len = records.length; i < len; i++) {
            itemValue = records[i].get('id');
            item = Ext.create('Ext.menu.CheckItem', {
                text: records[i].get(me.labelField),
                group: gid,
                checked: Ext.Array.contains(me.selected, itemValue),
                hideOnClick: false,
                value: itemValue
            });

            item.on('checkchange', me.checkChange, me);

            me.add(item);
        }

        me.loaded = true;

        if (visible) {
            me.show();
        }
        me.fireEvent('load', me, records);
    },

    /**
     * Get the selected items.
     * @return {Array} selected
     */
    getSelected : function () {
        return this.selected;
    },

    /** @private */
    setSelected : function (value) {
        value = this.selected = [].concat(value);

        if (this.loaded) {
            this.items.each(function(item){
                item.setChecked(false, true);
                for (var i = 0, len = value.length; i < len; i++) {
                    if (item.value == value[i]) {
                        item.setChecked(true, true);
                    }
                }
            }, this);
        }
    },

    /**
     * Handler for the 'checkchange' event from an check item in this menu
     * @param {Object} item Ext.menu.CheckItem
     * @param {Object} checked The checked value that was set
     */
    checkChange : function (item, checked) {
        var value = [];
        this.items.each(function(item){
            if (item.checked) {
                value.push(item.value);
            }
        },this);
        this.selected = value;

        this.fireEvent('checkchange', item, checked);
    }
});


/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as published by the Free Software Foundation and appearing in the file LICENSE included in the packaging of this file.  Please review the following information to ensure the GNU General Public License version 3.0 requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
/**
 * @class Ext.ux.grid.menu.RangeMenu
 * @extends Ext.menu.Menu
 * Custom implementation of {@link Ext.menu.Menu} that has preconfigured items for entering numeric
 * range comparison values: less-than, greater-than, and equal-to. This is used internally
 * by {@link Ext.ux.grid.filter.NumericFilter} to create its menu.
 */
Ext.define('Ext.ux.grid.menu.RangeMenu', {
    extend: 'Ext.menu.Menu',

    /**
     * @cfg {String} fieldCls
     * The Class to use to construct each field item within this menu
     * Defaults to:<pre>
     * fieldCls : Ext.form.field.Number
     * </pre>
     */
    fieldCls : 'Ext.form.field.Number',

    /**
     * @cfg {Object} fieldCfg
     * The default configuration options for any field item unless superseded
     * by the <code>{@link #fields}</code> configuration.
     * Defaults to:<pre>
     * fieldCfg : {}
     * </pre>
     * Example usage:
     * <pre><code>
fieldCfg : {
    width: 150,
},
     * </code></pre>
     */

    /**
     * @cfg {Object} fields
     * The field items may be configured individually
     * Defaults to <tt>undefined</tt>.
     * Example usage:
     * <pre><code>
fields : {
    gt: { // override fieldCfg options
        width: 200,
        fieldCls: Ext.ux.form.CustomNumberField // to override default {@link #fieldCls}
    }
},
     * </code></pre>
     */

    /**
     * @cfg {Object} iconCls
     * The iconCls to be applied to each comparator field item.
     * Defaults to:<pre>
iconCls : {
    gt : 'ux-rangemenu-gt',
    lt : 'ux-rangemenu-lt',
    eq : 'ux-rangemenu-eq'
}
     * </pre>
     */
    iconCls : {
        gt : 'ux-rangemenu-gt',
        lt : 'ux-rangemenu-lt',
        eq : 'ux-rangemenu-eq'
    },

    /**
     * @cfg {Object} fieldLabels
     * Accessible label text for each comparator field item. Can be overridden by localization
     * files. Defaults to:<pre>
fieldLabels : {
     gt: 'Greater Than',
     lt: 'Less Than',
     eq: 'Equal To'
}</pre>
     */
    fieldLabels: {
        gt: 'Greater Than',
        lt: 'Less Than',
        eq: 'Equal To'
    },

    /**
     * @cfg {Object} menuItemCfgs
     * Default configuration options for each menu item
     * Defaults to:<pre>
menuItemCfgs : {
    emptyText: 'Enter Filter Text...',
    selectOnFocus: true,
    width: 125
}
     * </pre>
     */
    menuItemCfgs : {
        emptyText: 'Enter Number...',
        selectOnFocus: false,
        width: 155
    },

    /**
     * @cfg {Array} menuItems
     * The items to be shown in this menu.  Items are added to the menu
     * according to their position within this array. Defaults to:<pre>
     * menuItems : ['lt','gt','-','eq']
     * </pre>
     */
    menuItems : ['lt', 'gt', '-', 'eq'],


    constructor : function (config) {
        var me = this,
            fields, fieldCfg, i, len, item, cfg, Cls;

        me.callParent(arguments);

        fields = me.fields = me.fields || {};
        fieldCfg = me.fieldCfg = me.fieldCfg || {};
        
        me.addEvents(
            /**
             * @event update
             * Fires when a filter configuration has changed
             * @param {Ext.ux.grid.filter.Filter} this The filter object.
             */
            'update'
        );
      
        me.updateTask = Ext.create('Ext.util.DelayedTask', me.fireUpdate, me);
    
        for (i = 0, len = me.menuItems.length; i < len; i++) {
            item = me.menuItems[i];
            if (item !== '-') {
                // defaults
                cfg = {
                    itemId: 'range-' + item,
                    enableKeyEvents: true,
                    hideLabel: false,
                    fieldLabel: me.iconTpl.apply({
                        cls: me.iconCls[item] || 'no-icon',
                        text: me.fieldLabels[item] || '',
                        src: Ext.BLANK_IMAGE_URL
                    }),
                    labelSeparator: '',
                    labelWidth: 29,
                    listeners: {
                        scope: me,
                        change: me.onInputChange,
                        keyup: me.onInputKeyUp,
                        el: {
                            click: function(e) {
                                e.stopPropagation();
                            }
                        }
                    },
                    activate: Ext.emptyFn,
                    deactivate: Ext.emptyFn
                };
                Ext.apply(
                    cfg,
                    // custom configs
                    Ext.applyIf(fields[item] || {}, fieldCfg[item]),
                    // configurable defaults
                    me.menuItemCfgs
                );
                Cls = cfg.fieldCls || me.fieldCls;
                item = fields[item] = Ext.create(Cls, cfg);
            }
            me.add(item);
        }
    },

    /**
     * @private
     * called by this.updateTask
     */
    fireUpdate : function () {
        this.fireEvent('update', this);
    },
    
    /**
     * Get and return the value of the filter.
     * @return {String} The value of this filter
     */
    getValue : function () {
        var result = {}, key, field;
        for (key in this.fields) {
            field = this.fields[key];
            if (field.isValid() && field.getValue() !== null) {
                result[key] = field.getValue();
            }
        }
        return result;
    },
  
    /**
     * Set the value of this menu and fires the 'update' event.
     * @param {Object} data The data to assign to this menu
     */	
    setValue : function (data) {
        var key;
        for (key in this.fields) {
            this.fields[key].setValue(key in data ? data[key] : '');
        }
        this.fireEvent('update', this);
    },

    /**  
     * @private
     * Handler method called when there is a keyup event on an input
     * item of this menu.
     */
    onInputKeyUp: function(field, e) {
        if (e.getKey() === e.RETURN && field.isValid()) {
            e.stopEvent();
            this.hide();
        }
    },

    /**
     * @private
     * Handler method called when the user changes the value of one of the input
     * items in this menu.
     */
    onInputChange: function(field) {
        var me = this,
            fields = me.fields,
            eq = fields.eq,
            gt = fields.gt,
            lt = fields.lt;

        if (field == eq) {
            if (gt) {
                gt.setValue(null);
            }
            if (lt) {
                lt.setValue(null);
            }
        }
        else {
            eq.setValue(null);
        }

        // restart the timer
        this.updateTask.delay(this.updateBuffer);
    }
}, function() {

    /**
     * @cfg {Ext.XTemplate} iconTpl
     * A template for generating the label for each field in the menu
     */
    this.prototype.iconTpl = Ext.create('Ext.XTemplate',
        '<img src="{src}" alt="{text}" class="' + Ext.baseCSSPrefix + 'menu-item-icon ux-rangemenu-icon {cls}" />'
    );

});


/**
*
*  Base64 encode / decode
*  http://www.webtoolkit.info/
*
**/

(function() {

    // private property
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    // private method for UTF-8 encoding
    function utf8Encode(string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    }

    Ext.define("Ext.ux.exporter.Base64", {
        statics: {
        //This was the original line, which tries to use Firefox's built in Base64 encoder, but this kept throwing exceptions....
         encode : (typeof btoa == 'function') ? function(input) { return btoa(input); } : function (input) {
        //encode : function (input) {
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;
            input = utf8Encode(input);
            while (i < input.length) {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output = output +
                keyStr.charAt(enc1) + keyStr.charAt(enc2) +
                keyStr.charAt(enc3) + keyStr.charAt(enc4);
            }
            return output;
        }}
    });
})();
/**
 * @class Ext.ux.Exporter.Button
 * @extends Ext.Button
 * @author Nige White, with modifications from Ed Spencer, with modifications from iwiznia.
 * Specialised Button class that allows downloading of data via data: urls.
 * Internally, this is just a link.
 * Pass it either an Ext.Component subclass with a 'store' property, or just a store or nothing and it will try to grab the first parent of this button that is a grid or tree panel:
 * new Ext.ux.Exporter.Button({component: someGrid});
 * new Ext.ux.Exporter.Button({store: someStore});
 * @cfg {Ext.Component} component The component the store is bound to
 * @cfg {Ext.data.Store} store The store to export (alternatively, pass a component with a getStore method)
 */
Ext.define("Ext.ux.exporter.Button", {
    extend: "Ext.Button",
    alias: "widget.exporterbutton",
    constructor: function(config) {
      config = config || {};

      Ext.applyIf(config, {
        disabled      : true,
        text          : 'Download',
        cls           : 'download',
        href          : "/"
      });

      Ext.ux.exporter.Button.superclass.constructor.call(this, config);

      if (this.store || this.component) {
          this.setComponent(this.store || this.component, config);
      } else {
          var self = this;
          this.on("render", function() { // We wait for the combo to be rendered, so we can look up to grab the component containing it
              self.setComponent(self.up("gridpanel") || self.up("treepanel"), config);
          });
      }
    },

    setComponent: function(component, config) {
        this.component = component;
        this.store = !component.is ? component : component.getStore(); // only components or stores, if it doesn't respond to is method, it's a store
        var setLink = function() {
          var newConf = Ext.clone(config);
          this.el.query('a', true)[0].href = 'data:application/vnd.ms-excel;base64,' + Ext.ux.exporter.Exporter.exportAny(this.component, null, newConf);
          this.enable();
        };

        var me = this;
        this.store.on("load", setLink, this);
        if(Ext.ComponentQuery.is(this.component, "gridpanel")) {
            Ext.Array.each(this.component.columns, function(col) {
                col.on("show", setLink, me);
                col.on("hide", setLink, me);
            });
        }
    },

    onClick : function(e){
        if (e.button != 0) return;

        if (!this.disabled){
          this.fireEvent("click", this, e);

          if (this.handler) this.handler.call(this.scope || this, this, e);
        }
    }
});
/**
 * @class Ext.ux.Exporter.Formatter
 * @author Ed Spencer (http://edspencer.net)
 * @cfg {Ext.data.Store} store The store to export
 */
Ext.define("Ext.ux.exporter.Formatter", {
    /**
     * Performs the actual formatting. This must be overridden by a subclass
     */
    format: Ext.emptyFn,
    constructor: function(config) {
        config = config || {};

        Ext.applyIf(config, {

        });
    }
});
/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as published by the Free Software Foundation and appearing in the file LICENSE included in the packaging of this file.  Please review the following information to ensure the GNU General Public License version 3.0 requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
/**
 * @class Ext.ux.grid.filter.Filter
 * @extends Ext.util.Observable
 * Abstract base class for filter implementations.
 */
Ext.define('Ext.ux.grid.filter.Filter', {
    extend: 'Ext.util.Observable',

    /**
     * @cfg {Boolean} active
     * Indicates the initial status of the filter (defaults to false).
     */
    active : false,
    /**
     * True if this filter is active.  Use setActive() to alter after configuration.
     * @type Boolean
     * @property active
     */
    /**
     * @cfg {String} dataIndex
     * The {@link Ext.data.Store} dataIndex of the field this filter represents.
     * The dataIndex does not actually have to exist in the store.
     */
    dataIndex : null,
    /**
     * The filter configuration menu that will be installed into the filter submenu of a column menu.
     * @type Ext.menu.Menu
     * @property
     */
    menu : null,
    /**
     * @cfg {Number} updateBuffer
     * Number of milliseconds to wait after user interaction to fire an update. Only supported
     * by filters: 'list', 'numeric', and 'string'. Defaults to 500.
     */
    updateBuffer : 500,

    constructor : function (config) {
        Ext.apply(this, config);

        this.addEvents(
            /**
             * @event activate
             * Fires when an inactive filter becomes active
             * @param {Ext.ux.grid.filter.Filter} this
             */
            'activate',
            /**
             * @event deactivate
             * Fires when an active filter becomes inactive
             * @param {Ext.ux.grid.filter.Filter} this
             */
            'deactivate',
            /**
             * @event serialize
             * Fires after the serialization process. Use this to attach additional parameters to serialization
             * data before it is encoded and sent to the server.
             * @param {Array/Object} data A map or collection of maps representing the current filter configuration.
             * @param {Ext.ux.grid.filter.Filter} filter The filter being serialized.
             */
            'serialize',
            /**
             * @event update
             * Fires when a filter configuration has changed
             * @param {Ext.ux.grid.filter.Filter} this The filter object.
             */
            'update'
        );
        Ext.ux.grid.filter.Filter.superclass.constructor.call(this);

        // setting filtered to true on all filter instances ensures that the filter won't be blurred when the mouse leaves the component
        this.menu = this.createMenu(Ext.applyIf({filtered: true}, config));
        this.init(config);
        if(config && config.value){
            this.setValue(config.value);
            this.setActive(config.active !== false, true);
            delete config.value;
        }
    },

    /**
     * Destroys this filter by purging any event listeners, and removing any menus.
     */
    destroy : function(){
        if (this.menu){
            this.menu.destroy();
        }
        this.clearListeners();
    },

    /**
     * Template method to be implemented by all subclasses that is to
     * initialize the filter and install required menu items.
     * Defaults to Ext.emptyFn.
     */
    init : Ext.emptyFn,

    /**
     * @private @override
     * Creates the Menu for this filter.
     * @param {Object} config Filter configuration
     * @return {Ext.menu.Menu}
     */
    createMenu: function(config) {
        return Ext.create('Ext.menu.Menu', config);
    },

    /**
     * Template method to be implemented by all subclasses that is to
     * get and return the value of the filter.
     * Defaults to Ext.emptyFn.
     * @return {Object} The 'serialized' form of this filter
     * @methodOf Ext.ux.grid.filter.Filter
     */
    getValue : Ext.emptyFn,

    /**
     * Template method to be implemented by all subclasses that is to
     * set the value of the filter and fire the 'update' event.
     * Defaults to Ext.emptyFn.
     * @param {Object} data The value to set the filter
     * @methodOf Ext.ux.grid.filter.Filter
     */
    setValue : Ext.emptyFn,

    /**
     * Template method to be implemented by all subclasses that is to
     * return <tt>true</tt> if the filter has enough configuration information to be activated.
     * Defaults to <tt>return true</tt>.
     * @return {Boolean}
     */
    isActivatable : function(){
        return true;
    },

    /**
     * Template method to be implemented by all subclasses that is to
     * get and return serialized filter data for transmission to the server.
     * Defaults to Ext.emptyFn.
     */
    getSerialArgs : Ext.emptyFn,

    /**
     * Template method to be implemented by all subclasses that is to
     * validates the provided Ext.data.Record against the filters configuration.
     * Defaults to <tt>return true</tt>.
     * @param {Ext.data.Record} record The record to validate
     * @return {Boolean} true if the record is valid within the bounds
     * of the filter, false otherwise.
     */
    validateRecord : function(){
        return true;
    },

    /**
     * Returns the serialized filter data for transmission to the server
     * and fires the 'serialize' event.
     * @return {Object/Array} An object or collection of objects containing
     * key value pairs representing the current configuration of the filter.
     * @methodOf Ext.ux.grid.filter.Filter
     */
    serialize : function(){
        var args = this.getSerialArgs();
        this.fireEvent('serialize', args, this);
        return args;
    },

    /** @private */
    fireUpdate : function(){
        if (this.active) {
            this.fireEvent('update', this);
        }
        this.setActive(this.isActivatable());
    },

    /**
     * Sets the status of the filter and fires the appropriate events.
     * @param {Boolean} active        The new filter state.
     * @param {Boolean} suppressEvent True to prevent events from being fired.
     * @methodOf Ext.ux.grid.filter.Filter
     */
    setActive : function(active, suppressEvent){
        if(this.active != active){
            this.active = active;
            if (suppressEvent !== true) {
                this.fireEvent(active ? 'activate' : 'deactivate', this);
            }
        }
    }
});


/**
 * @class Ext.ux.Exporter.ExcelFormatter
 * @extends Ext.ux.Exporter.Formatter
 * Specialised Format class for outputting .xls files
 */
Ext.define("Ext.ux.exporter.excelFormatter.ExcelFormatter", {
    extend: "Ext.ux.exporter.Formatter",
    uses: [
        "Ext.ux.exporter.excelFormatter.Cell",
        "Ext.ux.exporter.excelFormatter.Style",
        "Ext.ux.exporter.excelFormatter.Worksheet",
        "Ext.ux.exporter.excelFormatter.Workbook"
    ],

    format: function(store, config) {
      var workbook = new Ext.ux.exporter.excelFormatter.Workbook(config);
      workbook.addWorksheet(store, config || {});

      return workbook.render();
    }
});
/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as published by the Free Software Foundation and appearing in the file LICENSE included in the packaging of this file.  Please review the following information to ensure the GNU General Public License version 3.0 requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
/**
 * @class Ext.ux.grid.filter.BooleanFilter
 * @extends Ext.ux.grid.filter.Filter
 * Boolean filters use unique radio group IDs (so you can have more than one!)
 * <p><b><u>Example Usage:</u></b></p>
 * <pre><code>
var filters = Ext.create('Ext.ux.grid.GridFilters', {
    ...
    filters: [{
        // required configs
        type: 'boolean',
        dataIndex: 'visible'

        // optional configs
        defaultValue: null, // leave unselected (false selected by default)
        yesText: 'Yes',     // default
        noText: 'No'        // default
    }]
});
 * </code></pre>
 */
Ext.define('Ext.ux.grid.filter.BooleanFilter', {
    extend: 'Ext.ux.grid.filter.Filter',
    alias: 'gridfilter.boolean',

	/**
	 * @cfg {Boolean} defaultValue
	 * Set this to null if you do not want either option to be checked by default. Defaults to false.
	 */
	defaultValue : false,
	/**
	 * @cfg {String} yesText
	 * Defaults to 'Yes'.
	 */
	yesText : 'Yes',
	/**
	 * @cfg {String} noText
	 * Defaults to 'No'.
	 */
	noText : 'No',

    /**
     * @private
     * Template method that is to initialize the filter and install required menu items.
     */
    init : function (config) {
        var gId = Ext.id();
		this.options = [
			Ext.create('Ext.menu.CheckItem', {text: this.yesText, group: gId, checked: this.defaultValue === true}),
			Ext.create('Ext.menu.CheckItem', {text: this.noText, group: gId, checked: this.defaultValue === false})];

		this.menu.add(this.options[0], this.options[1]);

		for(var i=0; i<this.options.length; i++){
			this.options[i].on('click', this.fireUpdate, this);
			this.options[i].on('checkchange', this.fireUpdate, this);
		}
	},

    /**
     * @private
     * Template method that is to get and return the value of the filter.
     * @return {String} The value of this filter
     */
    getValue : function () {
		return this.options[0].checked;
	},

    /**
     * @private
     * Template method that is to set the value of the filter.
     * @param {Object} value The value to set the filter
     */
	setValue : function (value) {
		this.options[value ? 0 : 1].setChecked(true);
	},

    /**
     * @private
     * Template method that is to get and return serialized filter data for
     * transmission to the server.
     * @return {Object/Array} An object or collection of objects containing
     * key value pairs representing the current configuration of the filter.
     */
    getSerialArgs : function () {
		var args = {type: 'boolean', value: this.getValue()};
		return args;
	},

    /**
     * Template method that is to validate the provided Ext.data.Record
     * against the filters configuration.
     * @param {Ext.data.Record} record The record to validate
     * @return {Boolean} true if the record is valid within the bounds
     * of the filter, false otherwise.
     */
    validateRecord : function (record) {
		return record.get(this.dataIndex) == this.getValue();
	}
});


/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as published by the Free Software Foundation and appearing in the file LICENSE included in the packaging of this file.  Please review the following information to ensure the GNU General Public License version 3.0 requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
/**
 * @class Ext.ux.grid.filter.DateFilter
 * @extends Ext.ux.grid.filter.Filter
 * Filter by a configurable Ext.picker.DatePicker menu
 * <p><b><u>Example Usage:</u></b></p>
 * <pre><code>
var filters = Ext.create('Ext.ux.grid.GridFilters', {
    ...
    filters: [{
        // required configs
        type: 'date',
        dataIndex: 'dateAdded',

        // optional configs
        dateFormat: 'm/d/Y',  // default
        beforeText: 'Before', // default
        afterText: 'After',   // default
        onText: 'On',         // default
        pickerOpts: {
            // any DatePicker configs
        },

        active: true // default is false
    }]
});
 * </code></pre>
 */
Ext.define('Ext.ux.grid.filter.DateFilter', {
    extend: 'Ext.ux.grid.filter.Filter',
    alias: 'gridfilter.date',
    uses: ['Ext.picker.Date', 'Ext.menu.Menu'],

    /**
     * @cfg {String} afterText
     * Defaults to 'After'.
     */
    afterText : 'After',
    /**
     * @cfg {String} beforeText
     * Defaults to 'Before'.
     */
    beforeText : 'Before',
    /**
     * @cfg {Object} compareMap
     * Map for assigning the comparison values used in serialization.
     */
    compareMap : {
        before: 'lt',
        after:  'gt',
        on:     'eq'
    },
    /**
     * @cfg {String} dateFormat
     * The date format to return when using getValue.
     * Defaults to 'm/d/Y'.
     */
    dateFormat : 'm/d/Y',

    /**
     * @cfg {Date} maxDate
     * Allowable date as passed to the Ext.DatePicker
     * Defaults to undefined.
     */
    /**
     * @cfg {Date} minDate
     * Allowable date as passed to the Ext.DatePicker
     * Defaults to undefined.
     */
    /**
     * @cfg {Array} menuItems
     * The items to be shown in this menu
     * Defaults to:<pre>
     * menuItems : ['before', 'after', '-', 'on'],
     * </pre>
     */
    menuItems : ['before', 'after', '-', 'on'],

    /**
     * @cfg {Object} menuItemCfgs
     * Default configuration options for each menu item
     */
    menuItemCfgs : {
        selectOnFocus: true,
        width: 125
    },

    /**
     * @cfg {String} onText
     * Defaults to 'On'.
     */
    onText : 'On',

    /**
     * @cfg {Object} pickerOpts
     * Configuration options for the date picker associated with each field.
     */
    pickerOpts : {},

    /**
     * @private
     * Template method that is to initialize the filter and install required menu items.
     */
    init : function (config) {
        var me = this,
            pickerCfg, i, len, item, cfg;

        pickerCfg = Ext.apply(me.pickerOpts, {
            xtype: 'datepicker',
            minDate: me.minDate,
            maxDate: me.maxDate,
            format:  me.dateFormat,
            listeners: {
                scope: me,
                select: me.onMenuSelect
            }
        });

        me.fields = {};
        for (i = 0, len = me.menuItems.length; i < len; i++) {
            item = me.menuItems[i];
            if (item !== '-') {
                cfg = {
                    itemId: 'range-' + item,
                    text: me[item + 'Text'],
                    menu: Ext.create('Ext.menu.Menu', {
                        items: [
                            Ext.apply(pickerCfg, {
                                itemId: item
                            })
                        ]
                    }),
                    listeners: {
                        scope: me,
                        checkchange: me.onCheckChange
                    }
                };
                item = me.fields[item] = Ext.create('Ext.menu.CheckItem', cfg);
            }
            //me.add(item);
            me.menu.add(item);
        }
    },

    onCheckChange : function () {
        this.setActive(this.isActivatable());
        this.fireEvent('update', this);
    },

    /**
     * @private
     * Handler method called when there is a keyup event on an input
     * item of this menu.
     */
    onInputKeyUp : function (field, e) {
        var k = e.getKey();
        if (k == e.RETURN && field.isValid()) {
            e.stopEvent();
            this.menu.hide();
        }
    },

    /**
     * Handler for when the DatePicker for a field fires the 'select' event
     * @param {Ext.picker.Date} picker
     * @param {Object} picker
     * @param {Object} date
     */
    onMenuSelect : function (picker, date) {
        var fields = this.fields,
            field = this.fields[picker.itemId];

        field.setChecked(true);

        if (field == fields.on) {
            fields.before.setChecked(false, true);
            fields.after.setChecked(false, true);
        } else {
            fields.on.setChecked(false, true);
            if (field == fields.after && this.getFieldValue('before') < date) {
                fields.before.setChecked(false, true);
            } else if (field == fields.before && this.getFieldValue('after') > date) {
                fields.after.setChecked(false, true);
            }
        }
        this.fireEvent('update', this);

        picker.up('menu').hide();
    },

    /**
     * @private
     * Template method that is to get and return the value of the filter.
     * @return {String} The value of this filter
     */
    getValue : function () {
        var key, result = {};
        for (key in this.fields) {
            if (this.fields[key].checked) {
                result[key] = this.getFieldValue(key);
            }
        }
        return result;
    },

    /**
     * @private
     * Template method that is to set the value of the filter.
     * @param {Object} value The value to set the filter
     * @param {Boolean} preserve true to preserve the checked status
     * of the other fields.  Defaults to false, unchecking the
     * other fields
     */
    setValue : function (value, preserve) {
        var key;
        for (key in this.fields) {
            if(value[key]){
                this.getPicker(key).setValue(value[key]);
                this.fields[key].setChecked(true);
            } else if (!preserve) {
                this.fields[key].setChecked(false);
            }
        }
        this.fireEvent('update', this);
    },

    /**
     * @private
     * Template method that is to return <tt>true</tt> if the filter
     * has enough configuration information to be activated.
     * @return {Boolean}
     */
    isActivatable : function () {
        var key;
        for (key in this.fields) {
            if (this.fields[key].checked) {
                return true;
            }
        }
        return false;
    },

    /**
     * @private
     * Template method that is to get and return serialized filter data for
     * transmission to the server.
     * @return {Object/Array} An object or collection of objects containing
     * key value pairs representing the current configuration of the filter.
     */
    getSerialArgs : function () {
        var args = [];
        for (var key in this.fields) {
            if(this.fields[key].checked){
                args.push({
                    type: 'date',
                    comparison: this.compareMap[key],
                    value: Ext.Date.format(this.getFieldValue(key), this.dateFormat)
                });
            }
        }
        return args;
    },

    /**
     * Get and return the date menu picker value
     * @param {String} item The field identifier ('before', 'after', 'on')
     * @return {Date} Gets the current selected value of the date field
     */
    getFieldValue : function(item){
        return this.getPicker(item).getValue();
    },

    /**
     * Gets the menu picker associated with the passed field
     * @param {String} item The field identifier ('before', 'after', 'on')
     * @return {Object} The menu picker
     */
    getPicker : function(item){
        return this.fields[item].menu.items.first();
    },

    /**
     * Template method that is to validate the provided Ext.data.Record
     * against the filters configuration.
     * @param {Ext.data.Record} record The record to validate
     * @return {Boolean} true if the record is valid within the bounds
     * of the filter, false otherwise.
     */
    validateRecord : function (record) {
        var key,
            pickerValue,
            val = record.get(this.dataIndex),
            clearTime = Ext.Date.clearTime;

        if(!Ext.isDate(val)){
            return false;
        }
        val = clearTime(val, true).getTime();

        for (key in this.fields) {
            if (this.fields[key].checked) {
                pickerValue = clearTime(this.getFieldValue(key), true).getTime();
                if (key == 'before' && pickerValue <= val) {
                    return false;
                }
                if (key == 'after' && pickerValue >= val) {
                    return false;
                }
                if (key == 'on' && pickerValue != val) {
                    return false;
                }
            }
        }
        return true;
    }
});


/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as published by the Free Software Foundation and appearing in the file LICENSE included in the packaging of this file.  Please review the following information to ensure the GNU General Public License version 3.0 requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
/**
 * @class Ext.ux.grid.filter.ListFilter
 * @extends Ext.ux.grid.filter.Filter
 * <p>List filters are able to be preloaded/backed by an Ext.data.Store to load
 * their options the first time they are shown. ListFilter utilizes the
 * {@link Ext.ux.grid.menu.ListMenu} component.</p>
 * <p>Although not shown here, this class accepts all configuration options
 * for {@link Ext.ux.grid.menu.ListMenu}.</p>
 *
 * <p><b><u>Example Usage:</u></b></p>
 * <pre><code>
var filters = Ext.create('Ext.ux.grid.GridFilters', {
    ...
    filters: [{
        type: 'list',
        dataIndex: 'size',
        phpMode: true,
        // options will be used as data to implicitly creates an ArrayStore
        options: ['extra small', 'small', 'medium', 'large', 'extra large']
    }]
});
 * </code></pre>
 *
 */
Ext.define('Ext.ux.grid.filter.ListFilter', {
    extend: 'Ext.ux.grid.filter.Filter',
    alias: 'gridfilter.list',

    /**
     * @cfg {Array} options
     * <p><code>data</code> to be used to implicitly create a data store
     * to back this list when the data source is <b>local</b>. If the
     * data for the list is remote, use the <code>{@link #store}</code>
     * config instead.</p>
     * <br><p>Each item within the provided array may be in one of the
     * following formats:</p>
     * <div class="mdetail-params"><ul>
     * <li><b>Array</b> :
     * <pre><code>
options: [
    [11, 'extra small'],
    [18, 'small'],
    [22, 'medium'],
    [35, 'large'],
    [44, 'extra large']
]
     * </code></pre>
     * </li>
     * <li><b>Object</b> :
     * <pre><code>
labelField: 'name', // override default of 'text'
options: [
    {id: 11, name:'extra small'},
    {id: 18, name:'small'},
    {id: 22, name:'medium'},
    {id: 35, name:'large'},
    {id: 44, name:'extra large'}
]
     * </code></pre>
     * </li>
     * <li><b>String</b> :
     * <pre><code>
     * options: ['extra small', 'small', 'medium', 'large', 'extra large']
     * </code></pre>
     * </li>
     */
    /**
     * @cfg {Boolean} phpMode
     * <p>Adjust the format of this filter. Defaults to false.</p>
     * <br><p>When GridFilters <code>@cfg encode = false</code> (default):</p>
     * <pre><code>
// phpMode == false (default):
filter[0][data][type] list
filter[0][data][value] value1
filter[0][data][value] value2
filter[0][field] prod

// phpMode == true:
filter[0][data][type] list
filter[0][data][value] value1, value2
filter[0][field] prod
     * </code></pre>
     * When GridFilters <code>@cfg encode = true</code>:
     * <pre><code>
// phpMode == false (default):
filter : [{"type":"list","value":["small","medium"],"field":"size"}]

// phpMode == true:
filter : [{"type":"list","value":"small,medium","field":"size"}]
     * </code></pre>
     */
    phpMode : false,
    /**
     * @cfg {Ext.data.Store} store
     * The {@link Ext.data.Store} this list should use as its data source
     * when the data source is <b>remote</b>. If the data for the list
     * is local, use the <code>{@link #options}</code> config instead.
     */

    /**
     * @private
     * Template method that is to initialize the filter.
     * @param {Object} config
     */
    init : function (config) {
        this.dt = Ext.create('Ext.util.DelayedTask', this.fireUpdate, this);
    },

    /**
     * @private @override
     * Creates the Menu for this filter.
     * @param {Object} config Filter configuration
     * @return {Ext.menu.Menu}
     */
    createMenu: function(config) {
        var menu = Ext.create('Ext.ux.grid.menu.ListMenu', config);
        menu.on('checkchange', this.onCheckChange, this);
        return menu;
    },

    /**
     * @private
     * Template method that is to get and return the value of the filter.
     * @return {String} The value of this filter
     */
    getValue : function () {
        return this.menu.getSelected();
    },
    /**
     * @private
     * Template method that is to set the value of the filter.
     * @param {Object} value The value to set the filter
     */
    setValue : function (value) {
        this.menu.setSelected(value);
        this.fireEvent('update', this);
    },

    /**
     * @private
     * Template method that is to return <tt>true</tt> if the filter
     * has enough configuration information to be activated.
     * @return {Boolean}
     */
    isActivatable : function () {
        return this.getValue().length > 0;
    },

    /**
     * @private
     * Template method that is to get and return serialized filter data for
     * transmission to the server.
     * @return {Object/Array} An object or collection of objects containing
     * key value pairs representing the current configuration of the filter.
     */
    getSerialArgs : function () {
        return {type: 'list', value: this.phpMode ? this.getValue().join(',') : this.getValue()};
    },

    /** @private */
    onCheckChange : function(){
        this.dt.delay(this.updateBuffer);
    },


    /**
     * Template method that is to validate the provided Ext.data.Record
     * against the filters configuration.
     * @param {Ext.data.Record} record The record to validate
     * @return {Boolean} true if the record is valid within the bounds
     * of the filter, false otherwise.
     */
    validateRecord : function (record) {
        var valuesArray = this.getValue();
        return Ext.Array.indexOf(valuesArray, record.get(this.dataIndex)) > -1;
    }
});


/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as published by the Free Software Foundation and appearing in the file LICENSE included in the packaging of this file.  Please review the following information to ensure the GNU General Public License version 3.0 requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
/**
 * @class Ext.ux.grid.filter.NumericFilter
 * @extends Ext.ux.grid.filter.Filter
 * Filters using an Ext.ux.grid.menu.RangeMenu.
 * <p><b><u>Example Usage:</u></b></p>
 * <pre><code>
var filters = Ext.create('Ext.ux.grid.GridFilters', {
    ...
    filters: [{
        type: 'numeric',
        dataIndex: 'price'
    }]
});
 * </code></pre>
 * <p>Any of the configuration options for {@link Ext.ux.grid.menu.RangeMenu} can also be specified as
 * configurations to NumericFilter, and will be copied over to the internal menu instance automatically.</p>
 */
Ext.define('Ext.ux.grid.filter.NumericFilter', {
    extend: 'Ext.ux.grid.filter.Filter',
    alias: 'gridfilter.numeric',
    uses: ['Ext.form.field.Number'],

    /**
     * @private @override
     * Creates the Menu for this filter.
     * @param {Object} config Filter configuration
     * @return {Ext.menu.Menu}
     */
    createMenu: function(config) {
        var me = this,
            menu;
        menu = Ext.create('Ext.ux.grid.menu.RangeMenu', config);
        menu.on('update', me.fireUpdate, me);
        return menu;
    },

    /**
     * @private
     * Template method that is to get and return the value of the filter.
     * @return {String} The value of this filter
     */
    getValue : function () {
        return this.menu.getValue();
    },

    /**
     * @private
     * Template method that is to set the value of the filter.
     * @param {Object} value The value to set the filter
     */
    setValue : function (value) {
        this.menu.setValue(value);
    },

    /**
     * @private
     * Template method that is to return <tt>true</tt> if the filter
     * has enough configuration information to be activated.
     * @return {Boolean}
     */
    isActivatable : function () {
        var values = this.getValue(),
            key;
        for (key in values) {
            if (values[key] !== undefined) {
                return true;
            }
        }
        return false;
    },

    /**
     * @private
     * Template method that is to get and return serialized filter data for
     * transmission to the server.
     * @return {Object/Array} An object or collection of objects containing
     * key value pairs representing the current configuration of the filter.
     */
    getSerialArgs : function () {
        var key,
            args = [],
            values = this.menu.getValue();
        for (key in values) {
            args.push({
                type: 'numeric',
                comparison: key,
                value: values[key]
            });
        }
        return args;
    },

    /**
     * Template method that is to validate the provided Ext.data.Record
     * against the filters configuration.
     * @param {Ext.data.Record} record The record to validate
     * @return {Boolean} true if the record is valid within the bounds
     * of the filter, false otherwise.
     */
    validateRecord : function (record) {
        var val = record.get(this.dataIndex),
            values = this.getValue(),
            isNumber = Ext.isNumber;
        if (isNumber(values.eq) && val != values.eq) {
            return false;
        }
        if (isNumber(values.lt) && val >= values.lt) {
            return false;
        }
        if (isNumber(values.gt) && val <= values.gt) {
            return false;
        }
        return true;
    }
});


/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as published by the Free Software Foundation and appearing in the file LICENSE included in the packaging of this file.  Please review the following information to ensure the GNU General Public License version 3.0 requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
/**
 * @class Ext.ux.grid.filter.StringFilter
 * @extends Ext.ux.grid.filter.Filter
 * Filter by a configurable Ext.form.field.Text
 * <p><b><u>Example Usage:</u></b></p>
 * <pre><code>
var filters = Ext.create('Ext.ux.grid.GridFilters', {
    ...
    filters: [{
        // required configs
        type: 'string',
        dataIndex: 'name',

        // optional configs
        value: 'foo',
        active: true, // default is false
        iconCls: 'ux-gridfilter-text-icon' // default
        // any Ext.form.field.Text configs accepted
    }]
});
 * </code></pre>
 */
Ext.define('Ext.ux.grid.filter.StringFilter', {
    extend: 'Ext.ux.grid.filter.Filter',
    alias: 'gridfilter.string',

    /**
     * @cfg {String} iconCls
     * The iconCls to be applied to the menu item.
     * Defaults to <tt>'ux-gridfilter-text-icon'</tt>.
     */
    iconCls : 'ux-gridfilter-text-icon',

    emptyText: 'Enter Filter Text...',
    selectOnFocus: true,
    width: 125,

    /**
     * @private
     * Template method that is to initialize the filter and install required menu items.
     */
    init : function (config) {
        Ext.applyIf(config, {
            enableKeyEvents: true,
            iconCls: this.iconCls,
            hideLabel: true,
            listeners: {
                scope: this,
                keyup: this.onInputKeyUp,
                el: {
                    click: function(e) {
                        e.stopPropagation();
                    }
                }
            }
        });

        this.inputItem = Ext.create('Ext.form.field.Text', config);
        this.menu.add(this.inputItem);
        this.updateTask = Ext.create('Ext.util.DelayedTask', this.fireUpdate, this);
    },

    /**
     * @private
     * Template method that is to get and return the value of the filter.
     * @return {String} The value of this filter
     */
    getValue : function () {
        return this.inputItem.getValue();
    },

    /**
     * @private
     * Template method that is to set the value of the filter.
     * @param {Object} value The value to set the filter
     */
    setValue : function (value) {
        this.inputItem.setValue(value);
        this.fireEvent('update', this);
    },

    /**
     * @private
     * Template method that is to return <tt>true</tt> if the filter
     * has enough configuration information to be activated.
     * @return {Boolean}
     */
    isActivatable : function () {
        return this.inputItem.getValue().length > 0;
    },

    /**
     * @private
     * Template method that is to get and return serialized filter data for
     * transmission to the server.
     * @return {Object/Array} An object or collection of objects containing
     * key value pairs representing the current configuration of the filter.
     */
    getSerialArgs : function () {
        return {type: 'string', value: this.getValue()};
    },

    /**
     * Template method that is to validate the provided Ext.data.Record
     * against the filters configuration.
     * @param {Ext.data.Record} record The record to validate
     * @return {Boolean} true if the record is valid within the bounds
     * of the filter, false otherwise.
     */
    validateRecord : function (record) {
        var val = record.get(this.dataIndex);

        if(typeof val != 'string') {
            return (this.getValue().length === 0);
        }

        return val.toLowerCase().indexOf(this.getValue().toLowerCase()) > -1;
    },

    /**
     * @private
     * Handler method called when there is a keyup event on this.inputItem
     */
    onInputKeyUp : function (field, e) {
        var k = e.getKey();
        if (k == e.RETURN && field.isValid()) {
            e.stopEvent();
            this.menu.hide();
            return;
        }
        // restart the timer
        this.updateTask.delay(this.updateBuffer);
    }
});


/**
 * @class Ext.ux.Exporter.ExcelFormatter.Worksheet
 * @extends Object
 * Represents an Excel worksheet
 * @cfg {Ext.data.Store} store The store to use (required)
 */
Ext.define("Ext.ux.exporter.excelFormatter.Worksheet", {

  constructor: function(store, config) {
    config = config || {};

    this.store = store;

    Ext.applyIf(config, {
      hasTitle   : true,
      hasHeadings: true,
      stripeRows : true,

      title      : "Workbook",
      columns    : store.fields == undefined ? {} : store.fields.items
    });

    Ext.apply(this, config);

    Ext.ux.exporter.excelFormatter.Worksheet.superclass.constructor.apply(this, arguments);
  },

  /**
   * @property dateFormatString
   * @type String
   * String used to format dates (defaults to "Y-m-d"). All other data types are left unmolested
   */
  dateFormatString: "Y-m-d",

  worksheetTpl: new Ext.XTemplate(
    '<ss:Worksheet ss:Name="{title}">',
      '<ss:Names>',
        '<ss:NamedRange ss:Name="Print_Titles" ss:RefersTo="=\'{title}\'!R1:R2" />',
      '</ss:Names>',
      '<ss:Table x:FullRows="1" x:FullColumns="1" ss:ExpandedColumnCount="{colCount}" ss:ExpandedRowCount="{rowCount}">',
        '{columns}',
        '<ss:Row ss:Height="38">',
            '<ss:Cell ss:StyleID="title" ss:MergeAcross="{colCount - 1}">',
              '<ss:Data xmlns:html="http://www.w3.org/TR/REC-html40" ss:Type="String">',
                '<html:B><html:U><html:Font html:Size="15">{title}',
                '</html:Font></html:U></html:B></ss:Data><ss:NamedCell ss:Name="Print_Titles" />',
            '</ss:Cell>',
        '</ss:Row>',
        '<ss:Row ss:AutoFitHeight="1">',
          '{header}',
        '</ss:Row>',
        '{rows}',
      '</ss:Table>',
      '<x:WorksheetOptions>',
        '<x:PageSetup>',
          '<x:Layout x:CenterHorizontal="1" x:Orientation="Landscape" />',
          '<x:Footer x:Data="Page &amp;P of &amp;N" x:Margin="0.5" />',
          '<x:PageMargins x:Top="0.5" x:Right="0.5" x:Left="0.5" x:Bottom="0.8" />',
        '</x:PageSetup>',
        '<x:FitToPage />',
        '<x:Print>',
          '<x:PrintErrors>Blank</x:PrintErrors>',
          '<x:FitWidth>1</x:FitWidth>',
          '<x:FitHeight>32767</x:FitHeight>',
          '<x:ValidPrinterInfo />',
          '<x:VerticalResolution>600</x:VerticalResolution>',
        '</x:Print>',
        '<x:Selected />',
        '<x:DoNotDisplayGridlines />',
        '<x:ProtectObjects>False</x:ProtectObjects>',
        '<x:ProtectScenarios>False</x:ProtectScenarios>',
      '</x:WorksheetOptions>',
    '</ss:Worksheet>'
  ),

  /**
   * Builds the Worksheet XML
   * @param {Ext.data.Store} store The store to build from
   */
  render: function(store) {
    return this.worksheetTpl.apply({
      header  : this.buildHeader(),
      columns : this.buildColumns().join(""),
      rows    : this.buildRows().join(""),
      colCount: this.columns.length,
      rowCount: this.store.getCount() + 2,
      title   : this.title
    });
  },

  buildColumns: function() {
    var cols = [];

    Ext.each(this.columns, function(column) {
      cols.push(this.buildColumn());
    }, this);

    return cols;
  },

  buildColumn: function(width) {
    return Ext.String.format('<ss:Column ss:AutoFitWidth="1" ss:Width="{0}" />', width || 164);
  },

  buildRows: function() {
    var rows = [];

    this.store.each(function(record, index) {
      rows.push(this.buildRow(record, index));
    }, this);

    return rows;
  },

  buildHeader: function() {
    var cells = [];

    Ext.each(this.columns, function(col) {
      var title;

      if(col.dataIndex) {
          if (col.text != undefined) {
            title = col.text;
          } else {
            //make columns taken from Record fields (e.g. with a col.name) human-readable
            title = col.name.replace(/_/g, " ");
            title = title.charAt(0).toUpperCase() + title.substr(1).toLowerCase();
          }

          cells.push(Ext.String.format('<ss:Cell ss:StyleID="headercell"><ss:Data ss:Type="String">{0}</ss:Data><ss:NamedCell ss:Name="Print_Titles" /></ss:Cell>', title));
      }
    }, this);

    return cells.join("");
  },

  buildRow: function(record, index) {
    var style,
        cells = [];
    if (this.stripeRows === true) style = index % 2 == 0 ? 'even' : 'odd';

    Ext.each(this.columns, function(col) {
      var name  = col.name || col.dataIndex;

      if(name) {
          //if given a renderer via a ColumnModel, use it and ensure data type is set to String
          if (Ext.isFunction(col.renderer)) {
            var value = col.renderer(record.get(name), null, record),
                type = "String";
          } else {
			if(record.fields.get(name)) {
				var value = record.get(name),
					type  = this.typeMappings[col.type || record.fields.get(name).type.type];
			}
          }

          cells.push(this.buildCell(value, type, style).render());
      }
    }, this);

    return Ext.String.format("<ss:Row>{0}</ss:Row>", cells.join(""));
  },

  buildCell: function(value, type, style) {
    if (type == "DateTime" && Ext.isFunction(value.format)) value = value.format(this.dateFormatString);

    return new Ext.ux.exporter.excelFormatter.Cell({
      value: value,
      type : type,
      style: style
    });
  },

  /**
   * @property typeMappings
   * @type Object
   * Mappings from Ext.data.Record types to Excel types
   */
  typeMappings: {
    'int'   : "Number",
    'string': "String",
    'float' : "Number",
    'date'  : "DateTime"
  }
});
/**
 * @class Ext.ux.Exporter.ExcelFormatter.Cell
 * @extends Object
 * Represents a single cell in a worksheet
 */

Ext.define("Ext.ux.exporter.excelFormatter.Cell", {
    constructor: function(config) {
        Ext.applyIf(config, {
          type: "String"
        });

        Ext.apply(this, config);

        Ext.ux.exporter.excelFormatter.Cell.superclass.constructor.apply(this, arguments);
    },

    render: function() {
        return this.tpl.apply(this);
    },

    tpl: new Ext.XTemplate(
        '<ss:Cell ss:StyleID="{style}">',
          '<ss:Data ss:Type="{type}"><![CDATA[{value}]]></ss:Data>',
        '</ss:Cell>'
    )
});
/**
 * @class Ext.ux.Exporter.ExcelFormatter.Style
 * @extends Object
 * Represents a style declaration for a Workbook (this is like defining CSS rules). Example:
 *
 * new Ext.ux.Exporter.ExcelFormatter.Style({
 *   attributes: [
 *     {
 *       name: "Alignment",
 *       properties: [
 *         {name: "Vertical", value: "Top"},
 *         {name: "WrapText", value: "1"}
 *       ]
 *     },
 *     {
 *       name: "Borders",
 *       children: [
 *         name: "Border",
 *         properties: [
 *           {name: "Color", value: "#e4e4e4"},
 *           {name: "Weight", value: "1"}
 *         ]
 *       ]
 *     }
 *   ]
 * })
 *
 * @cfg {String} id The ID of this style (required)
 * @cfg {Array} attributes The attributes for this style
 * @cfg {String} parentStyle The (optional parentStyle ID)
 */
Ext.define("Ext.ux.exporter.excelFormatter.Style", {
  constructor: function(config) {
    config = config || {};

    Ext.apply(this, config, {
      parentStyle: '',
      attributes : []
    });

    Ext.ux.exporter.excelFormatter.Style.superclass.constructor.apply(this, arguments);

    if (this.id == undefined) throw new Error("An ID must be provided to Style");

    this.preparePropertyStrings();
  },

  /**
   * Iterates over the attributes in this style, and any children they may have, creating property
   * strings on each suitable for use in the XTemplate
   */
  preparePropertyStrings: function() {
    Ext.each(this.attributes, function(attr, index) {
      this.attributes[index].propertiesString = this.buildPropertyString(attr);
      this.attributes[index].children = attr.children || [];

      Ext.each(attr.children, function(child, childIndex) {
        this.attributes[index].children[childIndex].propertiesString = this.buildPropertyString(child);
      }, this);
    }, this);
  },

  /**
   * Builds a concatenated property string for a given attribute, suitable for use in the XTemplate
   */
  buildPropertyString: function(attribute) {
    var propertiesString = "";

    Ext.each(attribute.properties || [], function(property) {
      propertiesString += Ext.String.format('ss:{0}="{1}" ', property.name, property.value);
    }, this);

    return propertiesString;
  },

  render: function() {
    return this.tpl.apply(this);
  },

  tpl: new Ext.XTemplate(
    '<tpl if="parentStyle.length == 0">',
      '<ss:Style ss:ID="{id}">',
    '</tpl>',
    '<tpl if="parentStyle.length != 0">',
      '<ss:Style ss:ID="{id}" ss:Parent="{parentStyle}">',
    '</tpl>',
    '<tpl for="attributes">',
      '<tpl if="children.length == 0">',
        '<ss:{name} {propertiesString} />',
      '</tpl>',
      '<tpl if="children.length > 0">',
        '<ss:{name} {propertiesString}>',
          '<tpl for="children">',
            '<ss:{name} {propertiesString} />',
          '</tpl>',
        '</ss:{name}>',
      '</tpl>',
    '</tpl>',
    '</ss:Style>'
  )
});
/**
 * @class Ext.ux.Exporter.ExcelFormatter.Workbook
 * @extends Object
 * Represents an Excel workbook
 */
Ext.define("Ext.ux.exporter.excelFormatter.Workbook", {

  constructor: function(config) {
    config = config || {};

    Ext.apply(this, config, {
      /**
       * @property title
       * @type String
       * The title of the workbook (defaults to "Workbook")
       */
      title: "Workbook",

      /**
       * @property worksheets
       * @type Array
       * The array of worksheets inside this workbook
       */
      worksheets: [],

      /**
       * @property compileWorksheets
       * @type Array
       * Array of all rendered Worksheets
       */
      compiledWorksheets: [],

      /**
       * @property cellBorderColor
       * @type String
       * The colour of border to use for each Cell
       */
      cellBorderColor: "#e4e4e4",

      /**
       * @property styles
       * @type Array
       * The array of Ext.ux.Exporter.ExcelFormatter.Style objects attached to this workbook
       */
      styles: [],

      /**
       * @property compiledStyles
       * @type Array
       * Array of all rendered Ext.ux.Exporter.ExcelFormatter.Style objects for this workbook
       */
      compiledStyles: [],

      /**
       * @property hasDefaultStyle
       * @type Boolean
       * True to add the default styling options to all cells (defaults to true)
       */
      hasDefaultStyle: true,

      /**
       * @property hasStripeStyles
       * @type Boolean
       * True to add the striping styles (defaults to true)
       */
      hasStripeStyles: true,

      windowHeight    : 9000,
      windowWidth     : 50000,
      protectStructure: false,
      protectWindows  : false
    });

    if (this.hasDefaultStyle) this.addDefaultStyle();
    if (this.hasStripeStyles) this.addStripedStyles();

    this.addTitleStyle();
    this.addHeaderStyle();
  },

  render: function() {
    this.compileStyles();
    this.joinedCompiledStyles = this.compiledStyles.join("");

    this.compileWorksheets();
    this.joinedWorksheets = this.compiledWorksheets.join("");

    return this.tpl.apply(this);
  },

  /**
   * Adds a worksheet to this workbook based on a store and optional config
   * @param {Ext.data.Store} store The store to initialize the worksheet with
   * @param {Object} config Optional config object
   * @return {Ext.ux.Exporter.ExcelFormatter.Worksheet} The worksheet
   */
  addWorksheet: function(store, config) {
    var worksheet = new Ext.ux.exporter.excelFormatter.Worksheet(store, config);

    this.worksheets.push(worksheet);

    return worksheet;
  },

  /**
   * Adds a new Ext.ux.Exporter.ExcelFormatter.Style to this Workbook
   * @param {Object} config The style config, passed to the Style constructor (required)
   */
  addStyle: function(config) {
    var style = new Ext.ux.exporter.excelFormatter.Style(config || {});

    this.styles.push(style);

    return style;
  },

  /**
   * Compiles each Style attached to this Workbook by rendering it
   * @return {Array} The compiled styles array
   */
  compileStyles: function() {
    this.compiledStyles = [];

    Ext.each(this.styles, function(style) {
      this.compiledStyles.push(style.render());
    }, this);

    return this.compiledStyles;
  },

  /**
   * Compiles each Worksheet attached to this Workbook by rendering it
   * @return {Array} The compiled worksheets array
   */
  compileWorksheets: function() {
    this.compiledWorksheets = [];

    Ext.each(this.worksheets, function(worksheet) {
      this.compiledWorksheets.push(worksheet.render());
    }, this);

    return this.compiledWorksheets;
  },

  tpl: new Ext.XTemplate(
    '<?xml version="1.0" encoding="utf-8"?>',
    '<ss:Workbook xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:o="urn:schemas-microsoft-com:office:office">',
      '<o:DocumentProperties>',
        '<o:Title>{title}</o:Title>',
      '</o:DocumentProperties>',
      '<ss:ExcelWorkbook>',
        '<ss:WindowHeight>{windowHeight}</ss:WindowHeight>',
        '<ss:WindowWidth>{windowWidth}</ss:WindowWidth>',
        '<ss:ProtectStructure>{protectStructure}</ss:ProtectStructure>',
        '<ss:ProtectWindows>{protectWindows}</ss:ProtectWindows>',
      '</ss:ExcelWorkbook>',
      '<ss:Styles>',
        '{joinedCompiledStyles}',
      '</ss:Styles>',
        '{joinedWorksheets}',
    '</ss:Workbook>'
  ),

  /**
   * Adds the default Style to this workbook. This sets the default font face and size, as well as cell borders
   */
  addDefaultStyle: function() {
    var borderProperties = [
      {name: "Color",     value: this.cellBorderColor},
      {name: "Weight",    value: "1"},
      {name: "LineStyle", value: "Continuous"}
    ];

    this.addStyle({
      id: 'Default',
      attributes: [
        {
          name: "Alignment",
          properties: [
            {name: "Vertical", value: "Top"},
            {name: "WrapText", value: "1"}
          ]
        },
        {
          name: "Font",
          properties: [
            {name: "FontName", value: "arial"},
            {name: "Size",     value: "10"}
          ]
        },
        {name: "Interior"}, {name: "NumberFormat"}, {name: "Protection"},
        {
          name: "Borders",
          children: [
            {
              name: "Border",
              properties: [{name: "Position", value: "Top"}].concat(borderProperties)
            },
            {
              name: "Border",
              properties: [{name: "Position", value: "Bottom"}].concat(borderProperties)
            },
            {
              name: "Border",
              properties: [{name: "Position", value: "Left"}].concat(borderProperties)
            },
            {
              name: "Border",
              properties: [{name: "Position", value: "Right"}].concat(borderProperties)
            }
          ]
        }
      ]
    });
  },

  addTitleStyle: function() {
    this.addStyle({
      id: "title",
      attributes: [
        {name: "Borders"},
        {name: "Font"},
        {
          name: "NumberFormat",
          properties: [
            {name: "Format", value: "@"}
          ]
        },
        {
          name: "Alignment",
          properties: [
            {name: "WrapText",   value: "1"},
            {name: "Horizontal", value: "Center"},
            {name: "Vertical",   value: "Center"}
          ]
        }
      ]
    });
  },

  addHeaderStyle: function() {
    this.addStyle({
      id: "headercell",
      attributes: [
        {
          name: "Font",
          properties: [
            {name: "Bold", value: "1"},
            {name: "Size", value: "10"}
          ]
        },
        {
          name: "Interior",
          properties: [
            {name: "Pattern", value: "Solid"},
            {name: "Color",   value: "#C8C8C8"}
          ]
        },
        {
          name: "Alignment",
          properties: [
            {name: "WrapText",   value: "1"},
            {name: "Horizontal", value: "Center"}
          ]
        }
      ]
    });
  },

  /**
   * Adds the default striping styles to this workbook
   */
  addStripedStyles: function() {
    this.addStyle({
      id: "even",
      attributes: [
        {
          name: "Interior",
          properties: [
            {name: "Pattern", value: "Solid"},
            {name: "Color",   value: "#FFFFFF"}
          ]
        }
      ]
    });

    this.addStyle({
      id: "odd",
      attributes: [
        {
          name: "Interior",
          properties: [
            {name: "Pattern", value: "Solid"},
            {name: "Color",   value: "#FFFFFF"}
          ]
        }
      ]
    });

    Ext.each(['even', 'odd'], function(parentStyle) {
      this.addChildNumberFormatStyle(parentStyle, parentStyle + 'date', "[ENG][$-409]dd\-mmm\-yyyy;@");
      this.addChildNumberFormatStyle(parentStyle, parentStyle + 'int', "0");
      this.addChildNumberFormatStyle(parentStyle, parentStyle + 'float', "0.00");
    }, this);
  },

  /**
   * Private convenience function to easily add a NumberFormat style for a given parentStyle
   * @param {String} parentStyle The ID of the parentStyle Style
   * @param {String} id The ID of the new style
   * @param {String} value The value of the NumberFormat's Format property
   */
  addChildNumberFormatStyle: function(parentStyle, id, value) {
    this.addStyle({
      id: id,
      parentStyle: "even",
      attributes: [
        {
          name: "NumberFormat",
          properties: [{name: "Format", value: value}]
        }
      ]
    });
  }
});



Ext.Loader.setConfig({enabled:true});
Ext.create('Ext.app.Application', {
    name: 'LSP',

    appFolder: 'app',

    // Define all the controllers that should initialize at boot up of your application
    controllers: [
        'Users',
        'DynamicGrid',
        'Grid',
        'NavigationTree',
        'Queryform',
        'SimSearchForm',
        'CmpdByNameForm',
 	'TargetByNameForm',
	'PharmByTargetNameForm',
	'PharmByCmpdNameForm',
	'PharmEnzymeForm',
	'SummeryForm',
	'Settings',
	'pmidTextMiningHitsForm',
	'pathwayByCompoundForm', 
        'pathwayByProteinForm'
    ],
    
    autoCreateViewport: true,
    
    launch: function() {
		Ext.Loader.setConfig({enabled:true});
        
    }
});


