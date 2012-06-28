/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 27/06/2012
 * Time: 20:28
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LDA.store.CompoundPharmacologyStore', {
    extend:'Ext.data.Store',
    model:'LDA.model.CompoundPharmacologyModel',
    storeId:'CompoundPharmacologyStore',
    proxy:{
        type:'jsonp',
        noCache:false,
        startParam:undefined,
        limitParam:undefined,
        pageParam:undefined,
        callbackKey:'_callback',
        reader:Ext.create('LDA.helper.CompoundPharmacologyReader')
    },
    BASE_URL:'http://ops.few.vu.nl/compound/pharmacology?',
    uri:'',

    setURI:function (uri) {
        this.uri = uri;
        this.proxy.url = this.BASE_URL +
            Ext.Object.toQueryString(
                {
                    uri:this.uri,
                    _format:'json'
                });
    }

});
