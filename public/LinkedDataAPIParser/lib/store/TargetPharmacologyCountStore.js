/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 29/06/2012
 * Time: 11:23
 * To change this template use File | Settings | File Templates.
 */

Ext.define('LDA.store.TargetPharmacologyCountStore', {
    extend:'LDA.store.basestores.FilteringStore',
    model:'LDA.model.PharmacologyCountModel',
    storeId:'TargetPharmacologyCountStore',
    proxy:{
        reader:Ext.create('LDA.helper.TargetPharmacologyCountReader')
    },
    BASE_URL:'http://ops.few.vu.nl/target/pharmacology/count?'
});
