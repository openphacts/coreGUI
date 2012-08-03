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
                    header:'Compound Label',
                    dataIndex:'compound_pref_label'
                },
                {
                    header:'ChemSpider Compound URI',
                    dataIndex:'cs_compound_uri'
                },
                {
                    header:'Activity Type',
                    dataIndex:'activity_activity_type'
                },
                {
                    header:'Activity Relation',
                    dataIndex:'activity_relation'
                },
                {
                    header:'Activity Value',
                    dataIndex:'activity_standard_value'
                },
                {
                    header:'Activity Units',
                    dataIndex:'activity_standard_units'
                },
                {
                    header:'Target Label',
                    dataIndex:'target_pref_label'
                },
                {
                    header:'Target Organism',
                    dataIndex:'target_organism'
                }
            ]
        }
    }
);