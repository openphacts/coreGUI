/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 26/06/2012
 * Time: 21:45
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LDA.view.grids.CompoundGrid', {
    extend:'Ext.grid.Panel',
    alias:'widget.CompoundGrid',
    store:Ext.create('LDA.store.CompoundStore'),
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
                header:'Name',
                dataIndex:'prefLabel',
                width:100
            },
            {
                header:'CW URI',
                dataIndex:'cw_uri',
                width:400
            },
            {
                header:'CS URI',
                dataIndex:'cs_uri',
                width:400
            },
            {
                header:'Chembl URI',
                dataIndex:'chembl_uri',
                width:400
            },
            {
                header:'Drugbank URI',
                dataIndex:'drugbank_uri',
                width:400
            },
            {
                header:'Inchi',
                dataIndex:'inchi',
                width:100
            },
            {
                header:'Inchi key',
                dataIndex:'inchi_key',
                width:100
            },
            {
                header:'Smiles',
                dataIndex:'smiles',
                width:100
            },
            {
                header:'A log P',
                dataIndex:'alogp',
                width:100
            },
            {
                header:'Full Molecular Weight',
                dataIndex:'full_mwt',
                width:100
            },
            {
                header:'Hydrogen bond acceptors',
                dataIndex:'hba',
                width:100
            },
            {
                header:'Hydrogen bond donors',
                dataIndex:'hbd',
                width:100
            },
            {
                header:'Molecular forn',
                dataIndex:'molform',
                width:100
            },
            {
                header:'Freebase molecular weight',
                dataIndex:'mw_freebase',
                width:100
            },
            {
                header:'Polar surface area',
                dataIndex:'psa',
                width:100
            },
            {
                header:'Rotatable bonds',
                dataIndex:'rtb',
                width:100
            },
            {
                header:'Biotransformation',
                dataIndex:'biotransformation',
                width:400
            },
            {
                header:'Description',
                dataIndex:'description',
                width:400
            },
            {
                header:'Protein binding',
                dataIndex:'proteinBinding',
                width:400
            },
            {
                header:'Toxicity',
                dataIndex:'toxicity',
                width:400
            }
        ]
    }
})
;