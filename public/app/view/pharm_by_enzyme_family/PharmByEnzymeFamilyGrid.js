Ext.define('LSP.view.pharm_by_enzyme_family.PharmByEnzymeFamilyGrid', {
        extend:'Ext.grid.Panel',
        alias:'widget.PharmByEnzymeFamilyGrid',
        layout:'fit',
        verticalScroller:{
            xtype:'paginggridscroller'
        },
        requires:[

        ],
        store:'EnzymeFamilyPaginatedStore',
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
                    dataIndex:'activity_activity_type'
                },
                {
                    header:'Target Organism',
                    dataIndex:'target_organism'
                },
                {
                    header:'Assay Organism',
                    dataIndex:'assay_organism'
                },
                {
                    header:'Inchi key',
                    dataIndex:'compound_inchikey'
                },
                {
                    header:'Target Name',
                    dataIndex:'target_title'
                },
                {
                    header:'Relation',
                    dataIndex:'activity_relation'
                },
                {
                    header:'Molweight',
                    dataIndex:'compound_full_mwt'
                },
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