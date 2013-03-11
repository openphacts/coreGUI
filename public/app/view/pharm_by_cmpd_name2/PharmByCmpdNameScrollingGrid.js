Ext.define('LSP.view.pharm_by_cmpd_name2.PharmByCmpdNameScrollingGrid', {
        extend:'LSP.view.dynamicgrid.DynamicGrid',
        alias:'widget.PharmByCmpdNameScrollingGrid',
        layout:'fit',
        //         verticalScroller: Ext.create('LDA.helper.DynamicPagingToolbar', {
        // 					itemId: 'pager_id',
        // 					store: 'CompoundPharmacologyPaginatedStore'
        // }),
        // verticalScrollerType:Ext.create('LDA.helper.DynamicPagingToolbar', {itemId:'pager_id'}),
        disableSelection:true,
        invalidateScrollerOnRefresh:false,
        requires:[],
        listeners:{
            'sortchange':function (ct, column, direction, eOpts) {
                console.log('PharmByCmpdNameScrollingGrid: sortchange()');
                this.setLoading(true);
            }
        },
        refs:[
            // {
            // 	ref:'pager',
            //         		selector:'#pager_id'
            // }
        ],
        store:'CompoundPharmacologyPaginatedStore',
        exportStore:null,
        getExportStore:function () {
            if (this.exportStore == null) {
                this.exportStore = Ext.create('LDA.store.CompoundPharmacologyPaginatedStore', {});
            }
            return this.exportStore;
        },
        // dockedItems: [{
        //         xtype: 'dynamicpagingtoolbar',
        // 		itemId: 'pager_id',
        //         dock: 'bottom',
        // 		store: 'CompoundPharmacologyPaginatedStore',
        //         displayInfo: true
        //     }],

        columns:[
            {
                xtype:'rownumberer',
                width:40
            },
            {
                //TODO: renderer for chemical structure image (from chemspider?)
                header:'Structure',
                dataIndex:'cs_compound_uri',
                xtype:'templatecolumn',
                width:135,
                tpl:'<img width="128" height="128" src="http://www.chemspider.com/ImagesHandler.ashx?id={csid}&w=128&h=128" alt="CSID:{csid}"/>',
                sortable:false
            },
            {
                header:'Compound Name',
                dataIndex:'compound_pref_label',
                renderer:compoundProvenanceRenderer,
                align:'center',
                tdCls: 'gridRowPadding'

            },
            {
                header:'Target Names',
                width: 180,
                dataIndex:'targets',
                renderer:compoundProvenanceRenderer,
                tdCls: 'wrap gridDescriptiveRowPadding'
                //align:'center'
            },
            {
                header:'Target Organisms',
                dataIndex:'target_organisms',
                renderer:compoundProvenanceRenderer,
                align:'center',
                tdCls: 'gridRowPadding'

            },
            {
                header:'Assay Organism',
                dataIndex:'assay_organism',
                renderer: compoundProvenanceRenderer,
                tooltip: 'Name of the organism for the assay system (e.g., the organism, tissue or cell line in ' +
                    'which an assay was performed). May differ from the target organism (e.g., for a human protein' +
                    ' expressed in non-human cells, or pathogen-infected human cells)',
                align:'center',
                tdCls: 'gridRowPadding'
            },
            {
                header:'Assay Description',
                dataIndex:'assay_description',
                width: 200,
                renderer:compoundProvenanceRenderer,
                tdCls: 'wrap gridDescriptiveRowPadding'
                //align:'center'
            },
            {
                header:'Activity Type',
                dataIndex:'activity_activity_type',
                width: 72,
                renderer:compoundProvenanceRenderer,
                align:'center',
                tdCls: 'gridRowPadding'

            },
            {
                header:'Relation',
                width: 52,
                dataIndex:'activity_relation',
                renderer:compoundProvenanceRenderer,
                align:'center',
                tdCls: 'gridRowPadding'

            },
            {
                header:'Value',
                dataIndex:'activity_standard_value',
                width: 60,
                renderer:compoundProvenanceRenderer,
                align:'center',
                tdCls: 'gridRowPadding'

            },
            {
                header:'Units',
                dataIndex:'activity_standard_units',
                width: 60,
                renderer:compoundProvenanceRenderer,
                align:'center',
                tdCls: 'gridRowPadding'

            },
            {
                header:'SMILES',
                dataIndex:'compound_smiles',
                renderer:compoundProvenanceRenderer,
                align:'center',
                tdCls: 'gridRowPadding'

            },
            {
                header:'InChI',
                dataIndex:'compound_inchi',
                renderer:compoundProvenanceRenderer,
                align:'center',
                tdCls: 'gridRowPadding'

            },

            {
                header:'InChIKey',
                dataIndex:'compound_inchikey',
                renderer:compoundProvenanceRenderer,
                align:'center',
                tdCls: 'gridRowPadding'

            },

            {
                header:'PubMed ID',
                dataIndex:'activity_pubmed_id',
                xtype:'templatecolumn',
                tpl: '<a href="http://www.ncbi.nlm.nih.gov/pubmed?term={activity_pubmed_id}" target="_blank">{activity_pubmed_id}</a>',
                //renderer:compoundProvenanceRenderer,
                align:'center',
                tdCls: 'gridRowPadding'
            }
        ],

        compound_prov: false,

        toggleProv:function (val) {
            this.compound_prov = val;
            console.log(" Show provenance : " + this.compound_prov);
            this.doLayout();
        }
    }
);

function compoundProvenanceRenderer(data, cell, record, rowIndex, columnIndex, store) {
	//console.log("Compound Pharmacology provenance renderer");

    //if (LDAProvenanceMode != LDA.helper.LDAConstants.LDA_PROVENANCE_OFF) {
    if (this.compound_prov) {

        var recdata = this.columns[columnIndex].dataIndex;
        var itemdata = recdata + '_item';
        recdata += '_src';
        var source = record.data[recdata];
        var cls = LDA.helper.LDAConstants.LDA_SRC_CLS_MAPPINGS[source];
        if (!cls) {
            cls = 'defaultValue';
        }
        var iconCls = cls + 'Icon';
        iconCls = '/assets/' + iconCls + '.png';
        //console.log(iconCls);
        cls += LDAProvenanceMode;

        if (LDAProvenanceMode == LDA.helper.LDAConstants.LDA_PROVENANCE_COLOUR) {

            if (record.data[recdata] && data || this.columns[columnIndex].dataIndex == 'targets' || this.columns[columnIndex].dataIndex == 'target_organisms' ) {
                if (this.columns[columnIndex].dataIndex == 'targets') {

                    //loops through arrays
                    var output = new String();
                    Ext.each(data, function (target, index) {
                        var targetcls = LDA.helper.LDAConstants.LDA_SRC_CLS_MAPPINGS[target['src']];
                        var targetIconCls = targetcls + 'Icon';
                        targetIconCls = '/assets/' + targetIconCls + '.png';
                        targetcls += LDAProvenanceMode;
                        output += '<div class="' + targetcls + '">' + target.title + '</div>' + '<br>' + '<a href="' + target['item'] + '" target="_blank">' + '<img src="' + targetIconCls + '" height="15" width="15"/>' + '</a>';

                    });
                    return output;
                }

                if (this.columns[columnIndex].dataIndex == 'target_organisms') {
                    //loops through arrays
                    var organismsOutput = new String();
                    Ext.each(data, function (organism, index) {
                        var organismCls = LDA.helper.LDAConstants.LDA_SRC_CLS_MAPPINGS[organism['src']];
                        var organismIconCls = organismCls + 'Icon';
                        organismIconCls = '/assets/' + organismIconCls + '.png';
                        organismCls += LDAProvenanceMode;
                        organismsOutput += '<div class="' + organismCls + '">' + organism.organism + '</div>' + '<br>' + '<a href="' + organism['item'] + '" target="_blank">' + '<img src="' + organismIconCls + '" height="15" width="15"/>' + '</a>';

                    });
                    return organismsOutput;
                }

                // return '<div class="' + cls + '">' + data + '</div>' + '<br>' + record.data[recdata];
                return '<div class="' + cls + '">' + data + '</div>' + '<br>' + '<a href="' + record.data[itemdata] + '" target="_blank">' + '<img src="' + iconCls + '" height="15" width="15"/>' + '</a>';

            } else {

                return '<div class="' + cls + '">' + data + '</div>'

            }

        }
        //else if (LDAProvenanceMode == LDA.helper.LDAConstants.LDA_PROVENANCE_ICON) {
        //this needs an img adding in
        //    return '<div class="' + cls + '">' + data + '</div>';
        //} else if (LDAProvenanceMode == LDA.helper.LDAConstants.LDA_PROVENANCE_TEXT) {
        //    return '<div class="' + cls + '">' + data + ' (' + source + ')</div>';
        //}
    } else {
        if (this.columns[columnIndex].dataIndex == 'targets') {
            //console.log('target_title ' + data.length);
            var target_names = "";
            Ext.each(data, function (target, index) {
                target_names += target.title;
                //console.log(" TARGET NAME SRC " + target['src']);
                target_names += "<br><br>";
            });
            return "<div>" + target_names + "</div>";
        } else if (this.columns[columnIndex].dataIndex == 'target_organisms') {
            //console.log('target_organism ' + data.length);
            var target_organisms = "";
            Ext.each(data, function (target, index) {
                target_organisms += target['organism'];
                target_organisms += "<br><br>";
            });
            return "<div>" + target_organisms + "</div>";
        }
        return data;
    }
    return data;
};

//{
//    header:'Chemspider ID',
//    dataIndex:'cs_compound_uri',
//    sortable:false,
//    renderer: compoundProvenanceRenderer,
//    align: 'center'
//},


/*
 var output = new String();
 var targetNames = data.split(',');
 //console.log( ' concat uisl ' + record.data['target_concatenated_uris']);
 var targetURIs = record.data['target_concatenated_uris'].split(',');
 var targetBaseURL = 'https://www.ebi.ac.uk/chembl/target/inspect/';
 Ext.each(targetURIs, function (target, index) {
 var url = targetURIs[index];
 if (url && targetURIs.length > 1) {
 //console.log( ' url ' + url);
 //var targetId = url.split('/').pop();
 var linkOut = targetBaseURL + url.split('/').pop();
 //console.log( "  TARGET NAME " + index + ' ' + target + ' ' +targetURIs[index]  );
 output += '<div class="' + cls + '">' + targetNames[index] + '</div>' + '<br>' + '<a href="' + linkOut + '" target="_blank">' + '<img src="' + iconCls + '" height="15" width="15"/>' + '</a>';

 } else {
 var onlyTarget = targetURIs[0].split('/').pop();
 var linkOutfirst = targetBaseURL + onlyTarget;
 output += '<div class="' + cls + '">' + data + '</div>' + '<br>' + '<a href="' + linkOutfirst + '" target="_blank">' + '<img src="' + iconCls + '" height="15" width="15"/>' + '</a>';
 }

 });
 return output;
 */