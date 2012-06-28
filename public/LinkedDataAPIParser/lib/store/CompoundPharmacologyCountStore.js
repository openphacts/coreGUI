/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 25/06/2012
 * Time: 15:32
 * To change this template use File | Settings | File Templates.
 */

Ext.define('LDA.store.CompoundPharmacologyCountStore', {
    extend:'Ext.data.Store',
    model:'LDA.model.CompoundPharmacologyCountModel',
    storeId:'CompoundPharmacologyCountStore',
    proxy:{
        type:'jsonp',
        noCache:false,
        startParam:undefined,
        limitParam:undefined,
        pageParam:undefined,
        callbackKey:'_callback',
        reader:Ext.create('LDA.helper.CompoundPharmacologyCountReader')
//        autoLoad:false
    },
    BASE_URL:'http://ops.few.vu.nl/compound/pharmacology/count?',
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
//    data:[
//        {firstName:'Ed', lastName:'Spencer', count:'1'},
//        {firstName:'Tommy', lastName:'Maintz', count:'2'},
//        {firstName:'Aaron', lastName:'Conran', count:'3'},
//        {firstName:'Jamie', lastName:'Avins', count:'4'}
//    ]




});