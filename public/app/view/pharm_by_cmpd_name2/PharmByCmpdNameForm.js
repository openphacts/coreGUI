Ext.define('LSP.view.pharm_by_cmpd_name2.PharmByCmpdNameForm', {
    extend:'Ext.form.Panel',
    alias:'widget.PharmByCmpdNameForm',
    closable:true,
    requires:[
        'LSP.view.dropdowns.conceptWikiCompoundLookup',
        'LSP.view.dynamicgrid.DynamicGrid3'
    ],
    layout:{
        type:'vbox',
        align:'stretch'
    },

    initComponent:function () {
        this.items = [
            {
                xtype:'label',
                html:'<span style="font-family: verdana; color: grey; ">Hint: Type in compound name. E.g. \"Aspirin\"</span>',
                labelWidth:400,
                padding:'5 0 0 140'
            },
            {
                xtype:'container',
                margin:'0 5 5 5',
                name:'form_fields',
                layout:{
                    type:'column'
                },
                style:'background-color: #fff;',
                items:[
                    {
                        name:'cmpd_uuid',
                        xtype:'hidden',
                        value:''
                    },
                    {
                        xtype:'conceptWikiCompoundLookup',
                        itemId:'pharmByCmpdLookup',
                        fieldLabel:'Compound name',
                        forceSelection:true,
                        allowBlank:false,
                        typeAhead:true,
                        typeAheadDelay:250,
                        queryDelay:200
                    },
                    {
                        xtype:'button',
                        itemId:'pharmByCmpdSubmit_id',
                        padding:'5 5 5 5',
                        text:'Search...',
                        disabled:true,
                        action:'query_pharm_by_cmpd_name'
                    }
                ]},
            {
                xtype:'dynamicgrid3',
                itemId:'pharmByCmpdGrid_id',
                readUrl:'/core_api_calls/pharm_by_compound_name.json',
                title:'Pharmacology by Compound name search results',
                gridBaseTitle:'Pharmacology by Compound name search results',
                flex:1
            }
        ];
        this.callParent(arguments);
    }
});
