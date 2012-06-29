/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 27/06/2012
 * Time: 20:28
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LDA.store.CompoundPharmacologyStore', {
    extend:'LDA.store.basestores.FilteringStore',
    model:'LDA.model.PharmacologyModel',
    storeId:'CompoundPharmacologyStore',
    proxy:{
        reader:Ext.create('LDA.helper.CompoundPharmacologyReader')
    },
    BASE_URL:'http://ops.few.vu.nl/compound/pharmacology?'
});
