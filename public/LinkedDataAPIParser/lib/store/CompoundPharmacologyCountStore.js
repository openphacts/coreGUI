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
        url:'http://ops.few.vu.nl/compound/pharmacology/count?uri=http%3A%2F%2Fwww.conceptwiki.org%2Fconcept%2F38932552-111f-4a4e-a46a-4ed1d7bdf9d5&_format=json',
        reader:Ext.create('LDA.helper.CompoundPharmacologyCountReader')
//        autoLoad:false
    }
//    data:[
//        {firstName:'Ed', lastName:'Spencer', count:'1'},
//        {firstName:'Tommy', lastName:'Maintz', count:'2'},
//        {firstName:'Aaron', lastName:'Conran', count:'3'},
//        {firstName:'Jamie', lastName:'Avins', count:'4'}
//    ]




});