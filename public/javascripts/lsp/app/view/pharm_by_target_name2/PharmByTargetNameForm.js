Ext.define('LSP.view.pharm_by_target_name2.PharmByTargetNameForm', {
    extend: 'Ext.form.Panel',  
    alias: 'widget.PharmByTargetNameForm',
    closable: true,
    requires: [
        'LSP.view.dropdowns.proteinLookup'
    ],
     initComponent: function() {
        
        this.items = [
                   {
                xtype: 'container',
                height: '8%',
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
                      grid_pharmbytargetname = Ext.widget('dynamicgrid2')                             
                ];
        grid_pharmbytargetname.setTitle('Pharmacology by Target name search results');
        grid_pharmbytargetname.setHeight('92%'); 
        this.callParent(arguments);
    }    
});
