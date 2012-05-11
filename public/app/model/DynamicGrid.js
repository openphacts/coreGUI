Ext.define('LSP.model.DynamicGrid', {
    extend:'Ext.data.Model',
//    config:{
        fields:[],
        proxy:{
            type:'ajax',
            timeout:'180000',
            suaptest: 'REMOVE',
            api:{
                read:''  // We configure this in the form controller
            },
            reader:{
                type:'json',
                suaptest2: 'REMOVE2',
                totalProperty:'totalCount'
            }
        }


//    },

//     constructor:function (config) {
//         this.initConfig(config);
//         return this;
//     }

});
