Ext.define('LSP.view.target_by_name.TargetByNameForm', {
    extend: 'Ext.form.Panel',  
    alias: 'widget.TargetByNameForm',
    closable: true,
    requires: [
//        'LSP.view.dropdowns.proteinLookup'
        'LSP.view.dropdowns.conceptWikiProteinLookup'
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
                        xtype: 'conceptWikiProteinLookup'                      
                      },                        
                      {
                        xtype: 'button',
                        padding: '5 5 5 5',
                        text: 'Search',
                        action: 'query_target_by_name'
                      }]},
                      grid_targetbyname = Ext.widget('dynamicgrid2')                             
                ];
        grid_targetbyname.setTitle('Target by name search results');
        grid_targetbyname.setHeight('92%'); 
        this.callParent(arguments);
    }    
});
