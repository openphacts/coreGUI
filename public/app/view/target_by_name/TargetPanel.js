/**
 * Created by JetBrains RubyMine.
 * User: jameseales
 * Date: 05/03/2012
 * Time: 17:11
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LSP.view.target_by_name.TargetPanel', {
    extend:'Ext.form.Panel',
    alias:'widget.TargetPanel',
    title:'Target Data',

    initComponent:function () {
        Ext.apply(this, {
                items:[
                    {
                        xtype:'panel',
                        itemId:'dataPanel',
                        hidden:true,
                        items:[

                            {
                                xtype:'displayfield',
                                fieldLabel:'Target Name',
                                name:'target_name'
                            },
                            {
                                xtype:'displayfield',
                                fieldLabel:'Target Type',
                                name:'target_type'
                            },
                            {
                                xtype:'displayfield',
                                fieldLabel:'Description',
                                name:'description'
                            },
                            {
                                xtype:'displayfield',
                                fieldLabel:'Organism',
                                name:'organism'
                            },
                            {
                                xtype:'displayfield',
                                fieldLabel:'Keywords',
                                name:'keywords'
                            },
                            {
                                xtype:'displayfield',
                                fieldLabel:'synonyms',
                                name:'synonyms'
                            }
                        ]},
                    {
                        xtype:'displayfield',
                        itemId:'messageField',
                        hidden:true
                    }
                ]
            }
        );
        this.callParent(arguments);
    },

    startLoading:function () {
        this.setLoading(true);
    },

    endLoading:function () {
        this.setLoading(false);
    },

    showRecord:function (record) {
        var mf = this.query('#messageField')[0];
        mf.hide();
        var dp = this.query('#dataPanel')[0]
        dp.show();
        this.loadRecord(record);
        this.doLayout();
    },

    showErrorMessage:function () {
        var dp = this.query('#dataPanel')[0];
        dp.hide();
        var field = this.query('#messageField')[0];
        field.setRawValue('Server did not respond');
        field.show();
    },

    showNoDataMessage:function () {
        var dp = this.query('#dataPanel')[0];
        dp.hide();
        var field = this.query('#messageField')[0];
        field.setRawValue('No records found within OPS for this search');
        field.show();
    }


});
