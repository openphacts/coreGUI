/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 20/06/2012
 * Time: 10:50
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LDA.view.LDAParserView', {
    extend:'Ext.form.Panel',
    alias:'widget.LDAParserView',
    requires:[
        'LDA.view.grids.CompoundPharmacologyCountGrid',
        'LDA.view.grids.CompoundGrid'
    ],
    layout:{
        type:'vbox'

    },
    items:[
//        {
//            xtype:'displayfield',
//            value:'foo'
//        },

        {
            xtype:'label',
            text:'Compound'
        },
        {
            xtype:'panel',
            layout:'hbox',
            items:[
                {
                    xtype:'CompoundGrid',
                    width:900,
                    height:300,
                    itemId:'ldacg'
                },
                {
                    xtype:'panel',
                    layout:'vbox',
                    items:[
                        {
                            xtype:'button',
                            text:'load',
                            action:'load_c',
                            width:100
                        },
                        {
                            xtype:'button',
                            text:'Log Store Details',
                            action:'log_c',
                            width:100
                        }
                    ]
                }
            ]
        },
        {
            xtype:'label',
            text:'CompoundPharmacologyCount'
        },
        {
            xtype:'panel',
            layout:'hbox',
            items:[
                {
                    xtype:'CompoundPharmacologyCountGrid',
                    width:500,
                    height:300,
                    itemId:'ldacpcg'
                },
                {
                    xtype:'panel',
                    layout:'vbox',
                    items:[
                        {
                            xtype:'button',
                            text:'load',
                            action:'load_cpc',
                            width:100
                        },
                        {
                            xtype:'button',
                            text:'Log Store Details',
                            action:'log_cpc',
                            width:100
                        }
                    ]
                }
            ]
        },


        {
            xtype:'textarea',
            itemId:'textarea2',
            height:200,
            width:800
        },
        {
            xtype:'textarea',
            itemId:'textarea1',
            height:200,
            width:800
        }
//        {
//            xtype:'radiogroup',
//            itemId:'radio',
//
//        }

    ]
});