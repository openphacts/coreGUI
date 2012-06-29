/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 29/06/2012
 * Time: 11:10
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LDA.store.basestores.BaseStore', {
    extend:'Ext.data.Store',
    proxy:{
        type:'jsonp',
        noCache:false,
        startParam:undefined,
        limitParam:undefined,
        pageParam:undefined,
        //this is the only query param handled natively by the proxy, all others are handled in store config below.
        callbackKey:'_callback'
    },
    _format:'json',
    uri:'',
    BASE_URL:'',

    listeners:{
        //this is used to construct the proxy url before the load is done
        beforeload:this.updateProxyURL()
    },

    setURI:function (uri) {
        this.uri = uri;
    },

    updateProxyURL:function () {
        this.proxy.url = this.BASE_URL +
            Ext.Object.toQueryString(
                {
                    _format:this._format,
                    uri:this.uri
                });
    }

});

