Ext.define('LSP.view.placeholder.temp', {
    extend: 'Ext.form.Panel',  
    alias: 'widget.temp',
    closable: true,
    
     initComponent: function() {
    
        this.items = [
                      { 
                        xtype: 'label',
                        text: 'PLACEHOLDER - NO VIEW HERE THIS WILL BE A LINK TO EACH EXEMPLAR WHEN WE HAVE THOSE!',
                        labelWidth: 600 
                      }       
                ];
        this.callParent(arguments);
    }    
});
