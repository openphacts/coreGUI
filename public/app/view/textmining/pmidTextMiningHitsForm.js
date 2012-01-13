Ext.define('LSP.view.textmining.pmidTextMiningHitsForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.pmidTextMiningHits',
    requires: [
        'LSP.view.dropdowns.pmidLookup'
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
                            xtype: 'pmidLookup',
                            margin: '0 10 0 10',                          
                            labelWidth: 75,
                            width: 650,
                        },
                        {
                            xtype: 'button',
                            text: 'Search...',
                            action: 'query',
                            disabled: true,
                            width: 120,
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    height: 200,
                    layout: 'anchor',
                    defaults: {labelWidth: 75},
                    title: 'Bibliographic information',
                    items: [
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Title',
                            name: 'title',
                            anchor: '100%',
                        },
                        {
                            xtype: 'textarea',
                            height: 150,
                            readOnly: true,
                            fieldLabel: 'Abstract',
                            name: 'abstract',
                            anchor: '100%',
                        }
                    ]
                },
                {
                    xtype: 'dynamicgrid2',
                    title: 'Text mined concepts',
                    gridBaseTitle: 'Text mined concepts',                    
                    name: 'textmining_hits',
                    flex: 1,
                }
            ]
        });

        me.callParent(arguments);
    }
});