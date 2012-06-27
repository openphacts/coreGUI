/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 25/06/2012
 * Time: 14:00
 * To change this template use File | Settings | File Templates.
 */

Ext.define('LDA.model.CompoundPharmacology', {
    extend:'Ext.data.Model',
    fields:[
        {
            name:'type'
        },
        {
            name:'relation'
        },
        {
            name:'standard_value'
        },
        {
            name:'standard_units'
        }
    ]
});