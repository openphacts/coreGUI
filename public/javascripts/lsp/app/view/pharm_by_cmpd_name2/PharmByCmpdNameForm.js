Ext.define('LSP.view.pharm_by_cmpd_name2.PharmByCmpdNameForm', {
    extend: 'Ext.form.Panel',  
    alias: 'widget.PharmByCmpdNameForm',
    closable: true,
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
                      },
                      {
                        xtype: 'button',
                        padding: '5 5 5 5',
                        text: 'Search',
                        disabled: true,
                        action: 'query_pharm_by_cmpd_name'
                      }]},
                      {
                    xtype: 'dynamicgrid2',
                    title: 'Pharmacology by Compound name search results',
                    gridBaseTitle: 'Pharmacology by Compound name search results',                    
                    flex: 1,
                    }                              
                ];

        this.callParent(arguments);
    }    
});
