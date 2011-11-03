Ext.define('LSP.view.placeholder.temp', {
    extend: 'Ext.form.Panel',  
    alias: 'widget.temp',
    closable: true,
    
     initComponent: function() {
    
        this.items = [
                      { 
                        xtype: 'label',
                        text: 'PLACEHOLDER - NO VIEW AND CONTROLLER HERE YET!',
                        labelWidth: 500 
                      }       
                ];
        this.callParent(arguments);
    }    
});
