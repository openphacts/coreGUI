Ext.define('LSP.view.placeholder.temp', {
    extend:'Ext.form.Panel',
    alias:'widget.temp',
    closable:true,
    title:'OpenPhacts Exemplars',
    initComponent:function () {


        var me = this;

        Ext.applyIf(me, {
            xtype:'panel',
            bodyPadding:10,
            title:'OpenPhacts Exemplars',
            layout:'anchor',
            //         suspendLayout: true,
            autoScroll:true,


            items:[
                {
                    xtype:'label',
                    text:'This page contains links to the OpenPhacts exemplars',
                    labelWidth:600
                },
                {
                    xtype:'displayfield',
                    value:'<a target=\'_blank\' href=\'http://ws.bioinfo.cnio.es/OpenPHACTS/\'>Target Dossier</a>',
                    labelWidth:600
                },
                {
                    xtype:'displayfield',
                    value:'<a target=\'_blank\' href=\'http://cbn.zbh.uni-hamburg.de\'>ChemBioNavigator</a> - username/password: cbn/cbn4ops',
                    labelWidth:600
                },
                {
                    xtype:'displayfield',
                    value:'Polypharmacology Browser - no link yet',
                    labelWidth:600
                }
            ]});
        this.callParent(arguments);
    }
});
