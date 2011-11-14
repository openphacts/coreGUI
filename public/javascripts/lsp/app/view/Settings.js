Ext.define('LSP.view.Settings', {
    extend: 'Ext.form.Panel',
    alias: 'widget.settingsform',
    height: '100%',
    initComponent: function() {
    
        this.items = [
            {
                xtype: 'form',
                padding: '5 5 0 5',
                border: false,
                //height: '100%',
                style: 'background-color: #fff;',
                items: [
                    {
                        xtype: 'label',
                        text: 'To use a different endpoint than the default Amsterdam VU one insert URL of sparql endpoint below and click save' 
                    },
                    {
                        xtype: 'textarea',
                        name: 'endpoint',
                        heigth: 50,
                        fieldLabel: 'URL',
                        emptyText: 'Insert full URL to the sparql endpoint used, eg: http://10.11.93.218:8183/sparql',
                        labelWidth: 30
                    },
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
                        xtype: 'button',
                        text: 'Save',
                        action: 'save_endpoint'
                    } 
                ]
            }
        ];
        this.callParent(arguments);
    }
});