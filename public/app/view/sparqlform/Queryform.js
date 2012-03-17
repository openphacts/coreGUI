Ext.define('LSP.view.sparqlform.Queryform', {
    extend:'Ext.form.Panel',
    alias:'widget.queryform',
    closable:true,
    layout:{
        type:'vbox',
        align:'stretch'
    },
    initComponent:function () {

        this.items = [
            {
                xtype:'form',
                padding:'5 5 0 5',
                border:false,
                style:'background-color: #fff;',
                items:[
                    {
                        xtype:'textarea',
                        name:'query',
                        id:'query_id',
                        fieldLabel:'SPARQL query',
                        height:120,
                        labelWidth:110,
                        width:700,
                        value:'SELECT *  WHERE { ?s ?p ?o}'
                    },
                    {
                        xtype:'fieldcontainer',
                        height:31,
                        width:700,
                        layout:{
                            type:'column'
                        },
                        items:[
                            {
                                xtype:'numberfield',
                                name:'limit',
                                margin:'0 10 0 110',
                                padding:'',
                                width:190,
                                fieldLabel:'Limit',
                                labelWidth:110,
                                autoStripChars:true,
                                maxValue:100,
                                minValue:1,
                                value:10,
                                allowDecimals:false
                            },
                            {
                                xtype:'numberfield',
                                name:'offset',
                                margin:'0 10 0 0',
                                width:190,
                                fieldLabel:'Offset',
                                labelWidth:110,
                                maxValue:10000,
                                minValue:0,
                                value:0,
                                allowDecimals:false
                            }
                        ]
                    },
                    {
                        xtype:'button',
                        action:'query',
                        text:'Submit query'
                    }
                ]
            },
            {
                xtype:'dynamicgrid3',
                title:'SPARQL query results',
                name:'sparql_query_results',
                flex:1
            }
        ];
        this.callParent(arguments);
    }
});
