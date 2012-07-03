/**
 * Created by JetBrains RubyMine.
 * User: jameseales
 * Date: 03/04/2012
 * Time: 12:42
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LSP.store.GuiComponents', {
        extend:'Ext.data.Store',
        id:'GuiComponents',
        model:'LSP.model.GuiComponent',
        autoLoad:true,

        proxy:{
            type:'ajax',
            extraParams:{type:'grid'},
            url:'application_modules.json',
            reader:{
                type:'json'
            }
        },

        listeners:{
            load:{
                //triggered when GuiComponents store has loaded
                //load is triggered automatically by NavigationTree controller creation
                //check for an initial history token
                //then pass it to the central Viewport history token handler method, bypassing history change
                fn:function () {
                    var currentToken = Ext.History.getToken();
//                    console.log('GuiComponents onLoad: Initial HistoryToken: ' + currentToken);
                    if (currentToken) {
                        if (currentToken.length > 0) {
                            var viewPort = Ext.ComponentQuery.query('lspviewport')[0];
                            viewPort.handleHistoryToken(currentToken);
                        }
                    }
                }
            }
        }
    }
);
