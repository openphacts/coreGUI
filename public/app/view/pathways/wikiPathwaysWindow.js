Ext.define('LSP.view.pathways.wikiPathwaysWindow', {
    extend:'Ext.window.Window',
    alias:'widget.wikiPathwaysWindow',

    requires:['Ext.form.Panel'],

    title:'Pathway from WikiPathways',
    layout:'fit',
    modal:true,
    autoShow:true,
    height:580,
    width:700,
//    wpathway_id: "WP87",
    initComponent:function () {
        this.items = [
            {
                xtype:'form',
                padding:'0 0 0 0',
                border:false,
                style:'background-color: #fff;',

                items:[
                    {
                        xtype:'box',
                        width:700,
                        height:530,
                        id:'wikipathways_win_id',
                        name:'wikipathways_win',
                        autoEl:{
                            tag:'iframe',
                            src:('http://www.wikipathways.org/wpi/PathwayWidget.php?id=' + this.wpathway_id)
                        }}
                ]
            }
        ];

        this.buttons = [
            {
                text:'Close',
                scope:this,
                handler:this.close
            }
        ];

        this.callParent(arguments);
    }
});
