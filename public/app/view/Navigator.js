Ext.define('LSP.view.Navigator', {
    extend:'Ext.Panel',
    alias:'widget.navigator',

    requires:[
        'LSP.view.Appmoduletree',
        'Ext.layout.container.Accordion',
        'LSP.view.feedback.FeedbackPanel',
        'LSP.view.api_status.Status'
    ],

    collapsible:true,
    margins:'0 0 4 4',
    layout:'accordion',
    layoutConfig:{
        animate:true
    },

    initComponent:function () {
        this.items = [
            {
                title:'Navigation',
                //autoScroll:true,
                layout:'fit',
                border:false,
                iconCls:'nav',
                items:[
                    {
                        xtype:'appmoduletree',
                        id:'appModuleTree',
                        border: false
                    }
                ]
            },
           {
                title:'TSV Downloads',
                border:false,
                itemId: 'background_tasks_form',
                autoScroll:true,
                iconCls:'fb-accordion',
                bodyBorder:false,
                items:[
                    {
                        xtype:'BackgroundTasksForm'
                    }
                ]
            }
        ];

        this.callParent(arguments);
    }
});
