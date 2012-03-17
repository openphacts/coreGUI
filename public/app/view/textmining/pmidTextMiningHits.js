Ext.define('LSP.view.textmining.pmidTextMiningHitsForm', {
    extend:'Ext.form.Panel',
    alias:'widget.pmidTextMiningHits',
    requires:[

    ],
    closable:true,
    height:560,
    width:606,
    bodyPadding:10,

    initComponent:function () {
        var me = this;

        Ext.applyIf(me, {
            items:[
                {
                    xtype:'container',
                    activeItem:0,
                    layout:{
                        type:'column'
                    },
                    anchor:'100%',
                    items:[
                        {
                            xtype:'combobox',
                            margin:'0 10 0 10',
                            //  width: 400,
                            fieldLabel:'Pubmed id',
                            labelPad:0,
                            labelWidth:75
                        },
                        {
                            xtype:'button',
                            text:'View license'
                        }
                    ]
                },
                {
                    xtype:'fieldset',
                    height:244,
                    //   width: 582,
                    defaults:'labelWidth: 75',
                    title:'Bibliographic information',
                    items:[
                        {
                            xtype:'displayfield',
                            fieldLabel:'Title',
                            labelWidth:75,
                            anchor:'100%'
                        },
                        {
                            xtype:'displayfield',
                            fieldLabel:'Auther(s)',
                            labelWidth:75,
                            anchor:'100%'
                        },
                        {
                            xtype:'displayfield',
                            fieldLabel:'Journal',
                            labelWidth:75,
                            anchor:'100%'
                        },
                        {
                            xtype:'textfield',
                            height:150,
                            fieldLabel:'Abstract',
                            labelWidth:75,
                            anchor:'100%'
                        }
                    ]
                },
                {
                    xtype:'dynamicgrid2',
                    title:'Concepts'
                }
            ]
        });

        me.callParent(arguments);
    }
});