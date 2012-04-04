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
        }
    }
);
