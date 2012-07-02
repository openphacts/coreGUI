/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 27/06/2012
 * Time: 20:25
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LDA.view.grids.CompoundPharmacologyGrid', {
    extend:'Ext.grid.Panel',
    alias:'widget.CompoundPharmacologyGrid',
    store:Ext.create('LDA.store.CompoundPharmacologyStore'),
    loadMask:true,
    columns:[
        {
            header:'ConceptWiki Compound URI',
            dataIndex:'cw_compound_uri',
            width:400
        },
        {
            header:'Target title source',
            dataIndex:'target_title_src',
            width:400
        }
    ]
});