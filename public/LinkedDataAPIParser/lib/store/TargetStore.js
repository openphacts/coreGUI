/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 29/06/2012
 * Time: 07:41
 * To change this template use File | Settings | File Templates.
 */

Ext.define('LDA.store.TargetStore', {
    extend:'LDA.store.basestores.BaseStore',
    model:'LDA.model.TargetModel',
    storeId:'TargetStore',
    proxy:{
        reader:Ext.create('LDA.helper.TargetReader')
    },
    BASE_URL:'http://ops.few.vu.nl/target?'
});
