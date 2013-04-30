Ext.define('LSP.view.pharm_by_enzyme_family.PharmByEnzymeFamilyScrollingGrid', {
    extend:'LSP.view.dynamicgrid.DynamicGrid',
        alias:'widget.PharmByEnzymeFamilyScrollingGrid',
        layout:'fit',
 	//verticalScrollerType: Ext.create('LDA.helper.DynamicPagingToolbar',{itemId: 'pager_id'}),
        disableSelection: true,
        invalidateScrollerOnRefresh: false,
        requires:[

        ],
		listeners: {
		    'sortchange': function(ct, column, direction, eOpts ) {
				console.log('PharmByEnzymeFamilyScrollingGrid: sortchange()');
				this.setLoading(true);
		    }
		},
        store:'EnzymeFamilyPaginatedStore',
	    exportStore: null,
	    getExportStore: function() {
		if (this.exportStore == null) {
			this.exportStore = Ext.create('LDA.store.EnzymeFamilyPaginatedStore', {});
		}
		return this.exportStore;		
	},
        columns:{
            defaults:{
            },

            items:[
				{
					xtype: 'rownumberer',
					width: 40
				},
                {
                    header:'Structure',
                    dataIndex:'cs_compound_uri',
					xtype: 'templatecolumn',
					tpl:'<img width="128" height="128" src="http://www.chemspider.com/ImagesHandler.ashx?id={csid}&w=128&h=128" alt="CSID:{csid}"/>',
                    width:135,
                    sortable:false
                },
                {
                    header:'Compound Name',
                    dataIndex:'compound_pref_label',
                    width: 180,
                    renderer: enzymeProvenanceRenderer,
                    tdCls: 'wrap gridDescriptiveRowPadding'
                },
                {
                    header:'Target Name',
                    dataIndex:'target_title',
                    width: 180,
                    renderer: enzymeProvenanceRenderer,
                    tdCls: 'wrap gridDescriptiveRowPadding'
                },
                {
                    header:'Target Organism',
                    dataIndex:'target_organism',
                    renderer: enzymeProvenanceRenderer,
                    align:'center',
                    tdCls: 'gridRowPadding'
                },
                {
                    header:'Assay Organism',
                    dataIndex:'assay_organism',
                    renderer: enzymeProvenanceRenderer,
                    align:'center',
                    tdCls: 'gridRowPadding'
                },
                {
                    header:'Assay Description',
                    dataIndex:'assay_description',
                    width:200,
                    renderer:enzymeProvenanceRenderer,
                    tdCls:'wrap gridDescriptiveRowPadding'
                },
                {
                    header:'Activity Type',
                    dataIndex:'activity_activity_type',
                    renderer: enzymeProvenanceRenderer,
                    width: 72,
                    align:'center',
                    tdCls: 'gridRowPadding'
                },
                {
                    header:'Relation',
                    dataIndex:'activity_relation',
                    renderer: enzymeProvenanceRenderer,
                    width: 52,
                    align:'center',
                    tdCls: 'gridRowPadding'
                },
                {
                    header:'Value',
                    dataIndex:'activity_standard_value',
                    renderer: enzymeProvenanceRenderer,
                    width: 60,
                    align:'center',
                    tdCls: 'gridRowPadding'
                },
                {
                    header:'Units',
                    dataIndex:'activity_standard_units',
                    renderer: enzymeProvenanceRenderer,
                    width: 60,
                    align:'center',
                    tdCls: 'gridRowPadding'
                },
                {
                    header:'Mol Weight',
                    dataIndex:'compound_full_mwt',
                    renderer: enzymeProvenanceRenderer,
                    align:'center',
                    width: 80,
                    tdCls: 'gridRowPadding'
                },{
                    header:'SMILES',
                    dataIndex:'compound_smiles',
                    renderer: enzymeProvenanceRenderer,
                    align:'center',
                    tdCls: 'gridRowPadding'
                },
                {
                    header:'InChI',
                    dataIndex:'compound_inchi',
                    renderer: enzymeProvenanceRenderer,
                    align:'center',
                    tdCls: 'gridRowPadding'
                },
                {
                    header:'InChIKey',
                    dataIndex:'compound_inchikey',
                    renderer: enzymeProvenanceRenderer,
                    align:'center',
                    tdCls: 'gridRowPadding'
                }
            ]

        },

        enzyme_prov: false,

        toggleProv:function (val) {
            this.enzyme_prov = val;
            console.log(" Show provenance : " + this.enzyme_prov );
            this.doLayout();
        }
    }
);

function enzymeProvenanceRenderer (data, cell, record, rowIndex, columnIndex, store) {
	//console.log("Enzyme Pharmacology provenance renderer");

    //if (LDAProvenanceMode != LDA.helper.LDAConstants.LDA_PROVENANCE_OFF) {
    if (this.enzyme_prov) {

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

            if (record.data[recdata] && data){

                if (this.columns[columnIndex].dataIndex == 'target_title') {

                    var output = new String();
                    var targetNames = data.split(',');
                    //console.log( ' concat uisl ' + record.data['target_concatenated_uris']);
                    var targetURIs = record.data['target_concatenated_uris'].split(',');
                    var targetBaseURL = 'https://www.ebi.ac.uk/chembl/target/inspect/';
                    Ext.each(targetNames, function (target, index) {

                        var url = targetURIs[index];
                        if (url) {
                            //console.log( ' url ' + url);
                            //var targetId = url.split('/').pop();
                            var linkOut = targetBaseURL + url.split('/').pop();
                            //console.log( "  TARGET NAME " + index + ' ' + target + ' ' +targetURIs[index]  );
                            output += '<div>' + target + '</div>' + '<br>' + '<a href="' + linkOut + '" target="_blank">' + '<img src="' + iconCls + '" height="15" width="15"/>' + '</a>';

                        } else {

                            var onlyTarget = targetURIs[0].split('/').pop();
                            var linkOutfirst = targetBaseURL + onlyTarget;
                            output += '<div>' + target + '</div>' + '<br>' + '<a href="' + linkOutfirst + '" target="_blank">' + '<img src="' + iconCls + '" height="15" width="15"/>' + '</a>';
                        }

                    });
                    return output;

                }

                // return '<div class="' + cls + '">' + data + '</div>' + '<br>' + record.data[recdata];
                return '<div>' + data + '</div>' + '<br>' + '<a href="' + record.data[itemdata] +'" target="_blank">' +'<img src="' + iconCls + '" height="15" width="15"/>' + '</a>';

            } else {

                return '<div>' + data + '</div>'

            }

        }
        //else if (LDAProvenanceMode == LDA.helper.LDAConstants.LDA_PROVENANCE_ICON) {
        //this needs an img adding in
        //    return '<div class="' + cls + '">' + data + '</div>';
        //} else if (LDAProvenanceMode == LDA.helper.LDAConstants.LDA_PROVENANCE_TEXT) {
        //    return '<div class="' + cls + '">' + data + ' (' + source + ')</div>';
        //}
    } else {
        return data;
    }
    return data;
};


//{
//    header:'Chemspider ID',
//    dataIndex:'cs_compound_uri',
//	sortable:false
//},
