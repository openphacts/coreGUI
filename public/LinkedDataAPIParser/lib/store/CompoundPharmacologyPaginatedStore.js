/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 27/06/2012
 * Time: 20:29
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LDA.store.CompoundPharmacologyPaginatedStore', {
    extend:'LDA.store.basestores.PaginatedFilteringStore',
    model:'LDA.model.PharmacologyPaginatedModel',
    storeId:'CompoundPharmacologyPaginatedStore',
    //only need to define proxy reader instance and BASE_URL due to inheritance from PaginatedFilteringStore
    proxy:{
        reader:Ext.create('LDA.helper.CompoundPharmacologyPaginatedReader')
    },
    BASE_URL:'http://ops.few.vu.nl/compound/pharmacology/pages?'

});
