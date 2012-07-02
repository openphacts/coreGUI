/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 29/06/2012
 * Time: 11:23
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LDA.store.TargetPharmacologyStore', {
    extend:'LDA.store.basestores.FilteringStore',
    model:'LDA.model.PharmacologyModel',
    storeId:'TargetPharmacologyStore',
    BASE_URL:'http://ops.few.vu.nl/target/pharmacology?',

    constructor:function (config, arguments) {
        this.proxy.reader = Ext.create('LDA.helper.TargetPharmacologyReader');
        this.callParent(arguments);
    }
});