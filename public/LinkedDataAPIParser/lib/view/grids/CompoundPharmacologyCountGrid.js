/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 26/06/2012
 * Time: 21:24
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LDA.view.grids.CompoundPharmacologyCountGrid', {
    extend:'Ext.grid.Panel',
    alias:'widget.CompoundPharmacologyCountGrid',
    store:Ext.create('LDA.store.CompoundPharmacologyCountStore'),
    loadMask:true,
    columns:[
        {
            header:'Compound URI',
            dataIndex:'uri',
            width:400
        },
        {
            header:'count',
            dataIndex:'count',
            width:60
        }

    ]
});

