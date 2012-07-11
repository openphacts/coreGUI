/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 04/07/2012
 * Time: 16:45
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LDA.view.grids.TargetPharmacologyCountGrid', {
    extend:'Ext.grid.Panel',
    alias:'widget.TargetPharmacologyCountGrid',
    store:Ext.create('LDA.store.TargetPharmacologyCountStore'),
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
                header:'Target URI',
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
})
;