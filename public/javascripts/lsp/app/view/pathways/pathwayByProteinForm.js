Ext.define('LSP.view.pathways.pathwayByProteinForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.pathwayByProteinForm',
    requires: [
        'LSP.view.dropdowns.wikiPathwaysProteinLookup'
    ],                         
    closable: true,
    height: 560,
    width: 606,
    bodyPadding: 10,
    layout: {
              type: 'vbox',
              align: 'stretch'
          },
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, { 
            items: [
                {
                    xtype: 'container',
                    activeItem: 0,
                    layout: {
                        type: 'column'
                    },
                    items: [
                        {
                            xtype: 'wikiPathwaysProteinLookup',
                            margin: '0 10 0 10',                          
                            labelWidth: 100,
                            width: 650,
                        },
                        {
                            xtype: 'button',
                            text: 'Search...',
                            action: 'query',
                            width: 120,
                        }
                    ]
                },
                {
                    xtype: 'dynamicgrid2',
                    title: 'Pathways including protein',
                    name: 'pathway_by_protein_grid',
                    flex: 1,
                    dockedItems: [{
                        xtype: 'toolbar',
                        dock: 'top',
                        items: [{
                            xtype: 'button',
                            text: 'View pathway in WikiPathways applet (Google Chrome only)',
                            action: 'wp_view'
                        }]
                    }]
                }
            ]
        });

        me.callParent(arguments);
    }
});
