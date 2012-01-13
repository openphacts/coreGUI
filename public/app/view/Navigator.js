Ext.define('LSP.view.Navigator', {
    extend: 'Ext.Panel',
    alias: 'widget.navigator',
    
    requires: [
      'LSP.view.Appmoduletree',
      'Ext.layout.container.Accordion'
    ],
    
    collapsible: true,
    margins: '0 0 4 4',
    layout: 'accordion',
    layoutConfig: {
        animate: true
    },
    
    initComponent: function() {
        this.items = [{
            title:'Navigation',
            autoScroll: true,
            border: false,
            iconCls: 'nav',
            items: [
              {
                xtype: 'appmoduletree',
                id: 'appModuleTree'
              }
            ]
        },{
            title:'Settings',
            border: false,
            autoScroll: true,
            iconCls: 'settings',
            items: [
              {
                xtype: 'settingsform',
                id: 'appSettings'
              }
            ]
        }];
        
        this.callParent(arguments);
    }
});