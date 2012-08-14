/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 29/06/2012
 * Time: 11:10
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LDA.store.basestores.BaseStore', {
    extend:'Ext.data.Store',
    _format:'json',
    uri:'',
    BASE_URL:'',
    stringEncoder:Ext.create('LDA.helper.JamesQueryStringEncoder'),
		//     proxy:{
		//         type:'jsonp',
		//         noCache:false,
		//         startParam:undefined,
		// limitParam:undefined,
		// pageParam:undefined,
		//         //this is the only query param handled natively by the proxy, all others are handled in store config below.
		//         callbackKey:'_callback'
		//     },

    listeners:{
        //this is used to construct the proxy url before the load is done
        beforeprefetch:{

            fn:function () {
                var me = this;
                me.updateProxyURL();
            }
        }
    },

    setURI:function (uri) {
        this.uri = uri;
    },

    updateProxyURL:function () {
        this.proxy.url = this.BASE_URL +
            this.stringEncoder.toQueryString(
                {
                    _format:this._format,
                    uri:this.uri
                });
//        console.log('Proxy: ' + Ext.ClassManager.getName(this) + ' URL updated to: ' + this.proxy.url);
    }

});

