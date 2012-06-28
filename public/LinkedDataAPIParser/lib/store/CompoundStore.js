/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 26/06/2012
 * Time: 21:45
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LDA.store.CompoundStore', {
    extend:'Ext.data.Store',
    model:'LDA.model.CompoundModel',
    storeId:'CompoundStore',
    proxy:{
        type:'jsonp',
        noCache:false,
        startParam:undefined,
        limitParam:undefined,
        pageParam:undefined,
        callbackKey:'_callback',
        reader:Ext.create('LDA.helper.CompoundReader')
    },
    BASE_URL:'http://ops.few.vu.nl/compound?',
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
