/**
 * Created by JetBrains RubyMine.
 * User: jameseales
 * Date: 06/03/2012
 * Time: 15:16
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LSP.store.Targets', {
    requires:'LSP.model.Target',
    extend:'Ext.data.Store',
    model:'LSP.model.Target',


    proxy:{
        type:'ajax',
        actionMethods:{
            read:'POST'
        },
        extraParams:{protein_uri:''},
        url:'/core_api_calls/protein_info.json',
        reader:{
            type:'json',
            root:'objects',
            totalProperty:'totalCount'
        }
    }


});
