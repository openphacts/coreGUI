Ext.define('LSP.store.DynamicGrid', {
    extend:'Ext.data.Store',
    model:'LSP.model.DynamicGrid',
    fields:[],
    proxy:{
        type:'ajax',
        timeout:'180000',
        suaptest:'REMOVE',
        api:{
            read:''  // We configure this in the form controller
        },
        reader:{
            type:'json',
            suaptest2:'REMOVE2',
            totalProperty:'totalCount'
        }
    }
});