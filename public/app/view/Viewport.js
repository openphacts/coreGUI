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
iconSize = 'small';

Ext.define('LSP.view.Viewport', {
    extend:'Ext.container.Viewport',
    alias:'widget.lspviewport',

    requires:[
        'LSP.view.Viewer',
        'LSP.view.Navigator',
        'LSP.view.Settings',
        'LSP.view.user.Loginbutton',
        'LSP.view.user.Logoutbutton',
        'LSP.view.user.Newbutton',
        'Ext.layout.container.Border',
        'Ext.toolbar.Spacer',
        'LSP.store.GuiComponents'
    ],

    layout:'border',

    //gets a record from GuiComponents store by its xtype
    getFormByXtype:function (token) {
        var appModStore = Ext.data.StoreManager.lookup('GuiComponents');
        var records = appModStore.queryBy(
            function (record, id) {
                return record.raw.xtype == token;
            }
        );
        if (records) {
            if (records.getCount() > 0) {
                return records.first();
            }
        }
    },

//    getObjectFromString:function (queryString) {
//        var qBits = queryString.split('&');
//        console.log(qBits);
//        var obj = new Object();
//        Ext.each(qBits, function (item, index) {
//            console.log(item);
//            if (item.length > 0) {
//                var smallBits = item.split('=');
//                if (smallBits.length == 1) {
//                    obj[smallBits[0]] = '';
//                } else if (smallBits.l == 2) {
//                    obj[smallBits[0]] = smallBits[1];
//                }
//            }
//
//        });
////        console.dir(obj);
//        return obj;
//    },

//all UI changes should come through this function
    handleHistoryToken:function (token) {
        //not null
        if (token) {
            //must start with ! (shebang/hashbang can help with googlebot indexing, some people hate this kind of thing, personally i don't care)
            if (token.indexOf('!') == 0) {
//            console.log('Viewport History change: ' + token);
                //cut off shebang
//                var historyTokenObject = Ext.Object.fromQueryString(token.substring(1));
                var historyTokenObject = this.parseHistoryToken(token.substring(1));
//                console.dir(historyTokenObject);
                if (historyTokenObject.p) {
                    var form = this.getFormByXtype(historyTokenObject.p);
                    if (form) {
                        this.changeView(form, historyTokenObject);
                    }
                }
            }
        }
    },

    parseHistoryToken:function (stringToParse) {
        var obj = {};
        var andBits = stringToParse.split('&');
        Ext.each(andBits, function (bit) {
            var firstEquals = bit.indexOf('=');
            if (firstEquals != -1) {
                var key = bit.substring(0, firstEquals);
                var value = bit.substring(firstEquals + 1, bit.length)
                obj[key] = value;
            }
        });
        return obj;
    },

//this handles the changing of central ui panel
    changeView:function (record, formData) {
        var view;
        Ext.getCmp('centerView').items.each(function (curItem) {
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
        var centreView = Ext.getCmp('centerView');
        centreView.suspendEvents(false);
        centreView.setActiveTab(view);
        centreView.resumeEvents();

        //this handles any formData provided by the History token
        //e.g. record = 'CmpdByNameForm'
        // formData = 'http://www.conceptwiki.org/concept/59aabd64-bee9-45b7-bbe0-9533f6a1f6bc'
        //it is the individual forms responsibility to process the formData string
        if (formData) {
            if (view.setFormData) {
                view.setFormData(formData);
            } else {
                view.fireEvent('historyToken', formData);
            }
        }
    },


    initComponent:function () {
        //set provenance to default of icon mode
        LDAProvenanceMode = LDA_PROVENANCE_COLOUR;
        //init history, needs to be done first
        Ext.History.init();
        //add event listener for History 'change' event
        //listener sends new history token to handleHistoryToken function with Viewport scope
        Ext.History.on('change', function (token) {
            if (token) {
                this.handleHistoryToken(token);
            }
        }, this);

        var ops_logo = Ext.create('Ext.Img', {src:'images/ops_logo.png', bodyStyle:{background:'transparent'}});
        this.items = [
            {
                region:'north',
                id:'northView',
                height:60,
                border:false,
                bodyStyle:{
                    background:'transparent'
                },
                layout:{
                    type:'hbox',
                    padding:'5',
                    align:'middle'
                },
                items:[
                    ops_logo,
                    {
                        id:'lsp-header',
                        xtype:'box',
                        html:'<h1>Open PHACTS GUI</h1>'
                    },
                    {
                        xtype:'tbspacer',
                        flex:1
                    },
                    {
                        xtype:'displayfield',
                        value:'Testing connection to OPS API...',
                        width:400,
                        name:'ops_api_staus',
                        id:'ops_api_staus_id'
                    },
                    {
                        xtype:'tbspacer',
                        flex:1
                    },
                    {
                        xtype:'loginbutton',
                        id:'loginButton',
                        hidden:true
                    },
                    {
                        xtype:'usernewbutton',
                        id:'userNewButton',
                        hidden:true
                    },
                    {
                        xtype:'logoutbutton',
                        id:'logoutButton',
                        hidden:true
                    }
                ]
            },
            {
                region:'center',
                id:'centerView',
                xtype:'viewer'
            },
            {
                region:'west',
                id:'westView',
                width:225,
                xtype:'navigator'
            }
        ];
        this.callParent(arguments);
    }
})
;
