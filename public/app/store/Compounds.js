Ext.define('LSP.store.Compounds', {
    requires:'LSP.model.Compound',
    extend:'Ext.data.Store',
    model:'LSP.model.Compound',


    proxy:{
        type:'ajax',
        actionMethods:{
            read:'POST'
        },
        extraParams:{compound_uri:''}, //compound_uri
        url:'/core_api_calls/compound_info.json',
        reader:{
            type:'json',
            root:'objects',
            totalProperty:'totalCount'
        }
    }


});