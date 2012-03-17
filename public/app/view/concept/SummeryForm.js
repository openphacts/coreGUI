Ext.define('LSP.view.concept.SummeryForm', {
    extend:'Ext.form.Panel',
    alias:'widget.SummeryForm',
    closable:true,
    requires:[
        'LSP.view.dropdowns.conceptWikiLookup'
    ],
    initComponent:function () {
        var me = this;
        me.items = [
            {
                xtype:'container',
                height:'6%',
                margin:'5 5 5 5',
                name:'form_fields',
                layout:{
                    type:'column'
                },
                items:[
                    {
                        xtype:'conceptWikiLookup'
                    },
                    {
                        xtype:'button',
                        padding:'5 5 5 5',
                        text:'Look up',
                        action:'look_up_concept'
                    },
                    {
                        name:'utf8',
                        xtype:'hidden',
                        value:'&#x2713;'
                    },
                    {
                        name:'authenticity_token',
                        xtype:'hidden',
                        value:$$('meta[name=csrf-token]')[0].readAttribute('content')
                    }
                ]},
            object_grid = Ext.widget('dynamicgrid2'),
            subject_grid = Ext.widget('dynamicgrid2')
        ];
        object_grid.setTitle('Concept Properties');
        object_grid.setHeight('47%');
        subject_grid.setTitle('Concept Relations');
        subject_grid.setHeight('47%');
        me.callParent(arguments);
    }
});