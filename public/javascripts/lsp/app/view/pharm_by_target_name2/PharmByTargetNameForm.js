Ext.define('LSP.view.pharm_by_target_name2.PharmByTargetNameForm', {
    extend: 'Ext.form.Panel',  
    alias: 'widget.PharmByTargetNameForm',
    closable: true,
    requires: [
        'LSP.view.dropdowns.proteinLookup'
    ],
    layout: {
          type: 'vbox',
          align: 'stretch'
      },
     initComponent: function() {
        
        this.items = [
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
                        name: 'utf8',
                        xtype: 'hidden',
                        value: '&#x2713;'
                      },
                      {
                        name: 'authenticity_token',
                        xtype: 'hidden',
                        value: $$('meta[name=csrf-token]')[0].readAttribute('content')
                      },
                      {
                        xtype: 'proteinLookup'                      
                      },
                      {
                        xtype: 'button',
                        padding: '5 5 5 5',
                        text: 'Search',
                        action: 'query_pharm_by_target_name'
                      }]},
                      {
                        xtype: 'dynamicgrid2',
                        title: 'Pharmacology by Target name search results',
                        flex: 1,
                        } 
                ]; 
        this.callParent(arguments);
    }    
});
