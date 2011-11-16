Ext.define('LSP.view.cmpd_by_name.CmpdByNameForm', {
    extend: 'Ext.form.Panel',  
    alias: 'widget.CmpdByNameForm',
    closable: true,
    requires: [
        'LSP.view.dropdowns.compoundLookup'
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
                        name: 'cmpd_uuid',
                        xtype: 'hidden',
                        value: ''
                      },
                      {
                        name: 'authenticity_token',
                        xtype: 'hidden',
                        value: $$('meta[name=csrf-token]')[0].readAttribute('content')
                      },
                      { 
                        xtype: 'compoundLookup',
                        minChars: 8
                      },
                      {
                        xtype: 'button',
                        padding: '5 5 5 5',
                        text: 'Search',
                        action: 'query_cmpd_by_name'
                      }]},
                      grid_cmpdbyname = Ext.widget('dynamicgrid')                             
                ];
        grid_cmpdbyname.timeout = 9000000;
        grid_cmpdbyname.setTitle('Compound by name search results');
        grid_cmpdbyname.setHeight('92%'); 
        grid_cmpdbyname.buttonRender(['exporter']);                                  
        this.callParent(arguments);
    }    
});
