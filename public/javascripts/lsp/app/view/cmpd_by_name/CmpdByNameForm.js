Ext.define('LSP.view.cmpd_by_name.CmpdByNameForm', {
    extend: 'Ext.form.Panel',  
    alias: 'widget.CmpdByNameForm',
    closable: true,
    requires: [
        'LSP.view.dropdowns.compoundLookup'
    ],
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
                margin: '5 5 5 5',
                name: 'form_fields',
                layout: {
                    type: 'column'
                },
                style: 'background-color: #fff;',
                items: [                      
                      { 
                        xtype: 'compoundLookup',                        
                      },
                      {
                        xtype: 'button',
                        padding: '5 5 5 5',
                        text: 'Search',
                        disabled: true,
                        action: 'query_cmpd_by_name'
                      }
                      ]},
                      {
                    xtype: 'dynamicgrid2',
                    title: 'Compound by name search results',
                    gridBaseTitle: 'Compound by name search results',
                    flex: 1,
                    }                             
                ]        
          });
        this.callParent(arguments);
    }    
});
