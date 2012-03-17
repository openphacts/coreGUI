Ext.Loader.setConfig({enabled:true});
Ext.Loader.setPath('Ext.ux.DataView', '/ext/examples/ux/DataView/');

Ext.define('LSP.view.dataview.StructureViewer', {
    extend:'Ext.window.Window',
    alias:'widget.StructureViewer',

    requires:['Ext.form.Panel', 'Ext.util.*', 'Ext.ux.DataView.Animated'],

    title:'Structures',
    layout:'fit',
    modal:true,
    autoShow:true,
    height:570,
    width:810,

    initComponent:function () {
        var store = structureViewStore
        var dataview = Ext.create('Ext.view.View', {
            deferInitialRefresh:false,
            store:store,
            tpl:Ext.create('Ext.XTemplate',
                '<tpl for=".">',
                '<div class="structure_data_view-wrap">',
                '<p height="180">',
                '<img width="128" height="128" src="http://www.chemspider.com/ImagesHandler.ashx?id={csid}&w=128&h=128" alt="CSID:{csid}"/>',
                '<br /><strong>Chemspider id : <a href ="http://inchi.chemspider.com/Chemical-Structure.{csid}.html" target="_blank">{csid}</a></strong>',
                '</p>',
                '</div>',
                '</tpl>'
            ),

            plugins:[
                Ext.create('Ext.ux.DataView.Animated', {
                    duration:550,
                    idProperty:'csid'
                })
            ],
            itemSelector:'div.structure_data_view-wrap',
            overItemCls:'x-view-over_structure_dv',
            singleSelect:true,
            autoScroll:true
        });

        this.items = [
            {
                xtype:'form',
                padding:'0 0 0 0',
                border:false,
                autoScroll:true,
                style:'background-color: #fff;',
                items:dataview
            }
        ];

        this.buttons = [
            {
                text:'Use structure',
                action:'commit_structure'
            },
            {
                text:'Cancel',
                scope:this,
                handler:this.close
            }
        ];

        this.callParent(arguments);
    }
});