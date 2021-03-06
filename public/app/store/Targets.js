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
    id:'Targets',

    proxy:{
        type:'ajax',
        actionMethods:{
            read:'POST'
        },
        extraParams:{protein_uri:''},
//        extraParams:{protein_uri:'http://www.conceptwiki.org/concept/32f4cb35-a214-475e-8eec-70d3d6a59188'},
        url:'/core_api_calls/protein_info.json',
//        url:'testData.json',
        reader:{
            type:'json',
            root:'objects',
            totalProperty:'totalCount'
        }
    }


});
