Ext.define('LSP.view.target_by_name.TargetByNameForm', {
    extend: 'Ext.form.Panel',  
    alias: 'widget.TargetByNameForm',
    closable: true,
    requires: [
        'LSP.view.dropdowns.conceptWikiProteinLookup',
        'LSP.view.dynamicgrid.DynamicGrid3'
    ],
    layout: {
          type: 'vbox',
          align: 'stretch'
      },
     initComponent: function() {
    
        this.items = [
                      {
                        xtype: 'label',
                        html: '<font face="verdana" color="grey">Hint: Type in protein name and species. E.g. \"GPR39 Human\"</font>',
                        labelWidth: 400,
                        padding: '0 0 0 140' 
                      },
                      {
                        xtype: 'container',
                        margin: '0 5 5 5',
                        name: 'form_fields',
                        layout: {
                            type: 'column'
                        },
                        style: 'background-color: #fff;',
                        items: [                      
                              {
                                xtype: 'conceptWikiProteinLookup',
                              },
                              {
                                xtype: 'button',
                                padding: '5 5 5 5',
                                text: 'Search',
                                disabled: true,
                                action: 'query_target_by_name'
                              }]
                        },
                       {
                        xtype: 'dynamicgrid3',
                        title: 'Target by name search results',
                        gridBaseTitle: 'Target by name search results',
                        flex: 1,
                        }                       
                ];
        this.callParent(arguments);
    }    
});
