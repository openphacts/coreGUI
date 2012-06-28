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
        'LDA.view.grids.CompoundGrid'  ,
        'LDA.view.grids.CompoundPharmacologyGrid',
        'LDA.view.grids.CompoundPharmacologyPaginatedGrid'
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
            xtype:'textfield',
            fieldLabel:'Compound URI',
            value:'http://www.conceptwiki.org/concept/38932552-111f-4a4e-a46a-4ed1d7bdf9d5',
            width:600,
            itemId:'ldacu'
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
            xtype:'textfield',
            fieldLabel:'Compound Pharmacology Count URI',
            value:'http://www.conceptwiki.org/concept/38932552-111f-4a4e-a46a-4ed1d7bdf9d5',
            width:600,
            itemId:'ldacpcu'
        },
        {
            xtype:'panel',
            layout:'hbox',
            items:[
                {
                    xtype:'CompoundPharmacologyCountGrid',
                    width:900,
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
            xtype:'textfield',
            fieldLabel:'Compound Pharmacology URI',
            value:'http://www.conceptwiki.org/concept/38932552-111f-4a4e-a46a-4ed1d7bdf9d5',
            width:600,
            itemId:'ldacpu'
        },
        {
            xtype:'panel',
            layout:'hbox',
            items:[
                {
                    xtype:'CompoundPharmacologyGrid',
                    width:900,
                    height:300,
                    itemId:'ldacpg'
                },
                {
                    xtype:'panel',
                    layout:'vbox',
                    items:[
                        {
                            xtype:'button',
                            text:'load',
                            action:'load_cp',
                            width:100
                        },
                        {
                            xtype:'button',
                            text:'Log Store Details',
                            action:'log_cp',
                            width:100
                        }
                    ]
                }
            ]
        },
        {
            xtype:'textfield',
            fieldLabel:'Compound Pharmacology Paginated URI',
            value:'http://www.conceptwiki.org/concept/38932552-111f-4a4e-a46a-4ed1d7bdf9d5',
            width:600,
            itemId:'ldacppu'
        },
        {
            xtype:'panel',
            layout:'hbox',
            items:[
                {
                    xtype:'CompoundPharmacologyPaginatedGrid',
                    width:900,
                    height:300,
                    itemId:'ldacppg'
                },
                {
                    xtype:'panel',
                    layout:'vbox',
                    items:[
                        {
                            xtype:'button',
                            text:'load',
                            action:'load_cpp',
                            width:100
                        },
                        {
                            xtype:'button',
                            text:'Log Store Details',
                            action:'log_cpp',
                            width:100
                        }
                    ]
                }
            ]
        }


//        {
//            xtype:'textarea',
//            itemId:'textarea2',
//            height:200,
//            width:800
//        },
//        {
//            xtype:'textarea',
//            itemId:'textarea1',
//            height:200,
//            width:800
//        }
//        {
//            xtype:'radiogroup',
//            itemId:'radio',
//
//        }

    ]
});