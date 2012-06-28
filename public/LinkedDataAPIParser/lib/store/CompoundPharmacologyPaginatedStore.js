/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 27/06/2012
 * Time: 20:29
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LDA.store.CompoundPharmacologyPaginatedStore', {
    extend:'Ext.data.Store',
    model:'LDA.model.CompoundPharmacologyPaginatedModel',
    storeId:'CompoundPharmacologyPaginatedStore',
    proxy:{
        type:'jsonp',
        noCache:false,
        startParam:undefined,
        limitParam:undefined,
        pageParam:undefined,
        callbackKey:'_callback',
        reader:Ext.create('LDA.helper.CompoundPharmacologyPaginatedReader')
    },
    BASE_URL:'http://ops.few.vu.nl/compound/pharmacology/pages?',
    uri:'',
    page:'',

    setURI:function (uri) {
        this.uri = uri;
        this.proxy.url = this.BASE_URL +
            Ext.Object.toQueryString(
                {
                    uri:this.uri,
                    page:this.page,
                    _format:'json'
                });
    }

});
