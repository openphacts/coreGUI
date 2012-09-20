/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 04/07/2012
 * Time: 16:44
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LDA.view.grids.TargetGrid', {
    extend:'Ext.grid.Panel',
    alias:'widget.TargetGrid',
    store:Ext.create('LDA.store.TargetStore'),
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
                header:'ConceptWiki Target URI',
                dataIndex:'cw_target_uri',
                width:100
            },
            {
                header:'ChEMBL Target URI',
                dataIndex:'chembl_target_uri',
                width:100
            },
            {
                header:'DrugBank Target URI',
                dataIndex:'drugbank_target_uri',
                width:100
            }            ,
            {
                header:'Name',
                dataIndex:'label',
                width:100
            }
            ,
            {
                header:'Keywords',
                dataIndex:'keywords',
                width:100
            }
            ,
            {
                header:'Description',
                dataIndex:'description',
                width:100
            }
            ,
            {
                header:'Target Type',
                dataIndex:'target_type',
                width:100
            },
            {
                header:'Organism',
                dataIndex:'organism',
                width:100
            },
            {
                header:'Synonyms',
                dataIndex:'synonyms',
                width:100
            }
            ,
            {
                header:'Cellular Location',
                dataIndex:'cellular_location',
                width:100
            }
            ,
            {
                header:'Molecular Weight',
                dataIndex:'molecular_weight',
                width:100
            }
            ,
            {
                header:'Number of Residues',
                dataIndex:'number_of_residues',
                width:100
            }
            ,
            {
                header:'PDB ID',
                dataIndex:'pdb_id_page',
                width:100
            }
            ,
            {
                header:'Specific Function',
                dataIndex:'specific_function',
                width:100
            }
            ,
            {
                header:'Theoretical Pi',
                dataIndex:'theoretical_pi',
                width:100
            }
        ]


    }
})
;
