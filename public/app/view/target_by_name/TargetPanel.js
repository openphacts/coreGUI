/**
 * Created by JetBrains RubyMine.
 * User: jameseales
 * Date: 05/03/2012
 * Time: 17:11
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LSP.view.target_by_name.TargetPanel', {
    extend:'Ext.panel.Panel',
    alias:'widget.TargetPanel',
    title:'Target Data',


    initComponent:function () {
        this.items = [
            {
                xtype:'displayfield',
                fieldLabel:'Target Name'
            },
            {
                xtype:'displayfield',
                fieldLabel:'Target Type'
            }
        ]
        this.callParent(arguments);
    }

});
