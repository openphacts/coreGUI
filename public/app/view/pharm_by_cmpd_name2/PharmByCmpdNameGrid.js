Ext.define('LSP.view.pharm_by_cmpd_name2.PharmByCmpdNameGrid', {
        extend:'Ext.grid.Panel',
        alias:'widget.PharmByCmpdNameGrid',
        layout:'fit',
        verticalScroller:{
            xtype:'paginggridscroller'
        },
        requires:[
        ],
        store:'CompoundPharmacologyPaginatedStore',
        listeners: {
            itemcontextmenu: function(view, record, node, index, event) {
                event.stopEvent();
				alert("right click");
				// showMenu(event.browserEvent.clientX, event.browserEvent.clientY, record);
                return false;
            }
        },
        columns:{
            defaults:{
            },

            items:[

                {
                    header:'Structure',
                    dataIndex:'compound_pref_label'
                },
                {
                    header:'Smiles',
                    dataIndex:'compound_smiles'
                },
                {
                    header:'Std Value',
                    dataIndex:'activity_standard_value'
                },
                {
                    header:'Chemspider ID',
                    dataIndex:'cs_compound_uri'
                },
                {
                    header:'Std Type',
                    dataIndex:'activity_standard_type'
                },
                {
                    header:'Inchi key',
                    dataIndex:'compound_inchikey'
                },
                {
                    header:'Target Organism',
                    dataIndex:'target_organism'
                },
                {
                    header:'Std Unit',
                    dataIndex:'activity_standard_units'
                },
                {
                    header:'Target Organism',
                    dataIndex:'target_organism'
                },
                {
                    header:'Target Name',
                    dataIndex:'target_title'
                },
                {
                    header:'Molweight',
                    dataIndex:'compound_full_mwt'
                },
                {
                    header:'Relation',
                    dataIndex:'activity_relation'
                },
				//no idea what this refers to in the LDA.model.PharmacologyPaginatedModel
                // {
                //     header:'Num ro5 violations',
                //     dataIndex:'target_organism'
                // },
                {
                    header:'Inchi',
                    dataIndex:'compound_inchikey_src'
                },
                {
                    header:'Compound name',
                    dataIndex:'compound_generic_name'
                }
            ]
        }
	}
);