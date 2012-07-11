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
    columns:{
        defaults:{
            renderer:function (value, metaData, record, rowIndex, colIndex, store, view) {
                if (LDAProvenanceMode != LDA_PROVENANCE_OFF) {
                    var data = this.columns[colIndex].dataIndex;
                    data += '_src';
                    var source = record.data[data];
                    var cls = LDA_SRC_CLS_MAPPINGS[source];
                    if (!cls) {
                        cls = 'defaultValue';
                    }
//                    console.log(data + ' : ' + source + ' : ' + cls);
                    cls += LDAProvenanceMode;
                    if (LDAProvenanceMode == LDA_PROVENANCE_COLOUR) {
                        return '<div class="' + cls + '">' + value + '</div>';
                    } else if (LDAProvenanceMode == LDA_PROVENANCE_ICON) {
                        //this needs an img adding in
                        return '<div class="' + cls + '">' + value + '</div>';
                    } else if (LDAProvenanceMode == LDA_PROVENANCE_TEXT) {
                        return '<div class="' + cls + '">' + value + ' (' + source + ')</div>';
                    }
                } else {
                    return value;
                }
            }
        },
        items:[
            {
                header:'Compound URI',
                dataIndex:'uri',
                width:400
            },
            {
                header:'Pharmacology Count',
                dataIndex:'count',
                width:60
            }
        ]
    }
});

