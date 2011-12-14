Ext.define('LSP.view.pathways.pathwayByCompoundForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.pathwayByCompoundForm',
    requires: [
        'LSP.view.dropdowns.wikiPathwaysCompoundLookup'
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
                            xtype: 'wikiPathwaysCompoundLookup',
                            margin: '0 10 0 10',                          
                            labelWidth: 100,
                            width: 650,
                        },
                        {
                            xtype: 'button',
                            text: 'Search...',
                            disabled: true,
                            action: 'query',
                            width: 120,
                        }
                    ]
                },
                {
                    xtype: 'dynamicgrid2',
                    title: 'Pathways including compound',
                    gridBaseTitle: 'Pathways including compound',
                    name: 'pathway_by_cmpd_grid',
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
