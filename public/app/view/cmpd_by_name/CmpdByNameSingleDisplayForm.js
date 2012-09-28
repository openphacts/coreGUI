Ext.define('LSP.view.cmpd_by_name.CmpdByNameSingleDisplayForm', {
    extend:'Ext.form.Panel',
    alias:'widget.CmpdByNameSingleDisplayForm',
    title:'Compound by Name search results',
    anchor:'100% 100%',
    autoScroll:true,
    bodyPadding:'10px',
    layout:'anchor',

    initComponent:function () {
        this.items = [
            {
                // DISPLAY PANEL
                xtype:'panel',
                border:false,
                layout:'anchor',
                autoScroll:true,
                itemId:'displayPanel',
                bodyPadding:'20px',
                hidden:true,

                items:[
                    {
                        // TOP PANEL
                        xtype:'panel',
                        border:false,
                        anchor:'100%',
                        itemId:'topPanelDetails',
                        layout:'column',
                        //autoScroll:true,

                        items:[
                            {
                                // IMAGE AND FIGURES
                                xtype:'panel',
                                //name:'imageAndFigures',
                                itemId:'imageAndFigures',
                                layout:'anchor',
                                border:true,
                                bodyPadding:'8px',

                                items:[
                                    {
                                        // IMAGE
                                        xtype:'image',
                                        name:'image',
                                        itemId:'compound_form_imagepanel',
                                        width:150,
                                        height:150,
                                        src:'./assets/target_placeholder.png'
                                    },
                                    {
                                        xtype:'displayfield',
                                        name:'alogp',
                                        itemId:'alogp',
                                        fieldCls:'x-cmpBottomfieldValue', // value
                                        baseCls:'x-cmpBottomBase', // label
                                        anchor:'100%',
                                        padding:'20px 0 12px 0',
                                        fieldLabel:'ALogP',
                                        labelAlign:'top',
                                        columnWidth:.1

                                    },
                                    {
                                        xtype:'displayfield',
                                        name:'hba',
                                        itemId:'hba',
                                        fieldCls:'x-cmpBottomfieldValue', // value
                                        baseCls:'x-cmpBottomBase', // label\
                                        anchor:'100%',
                                        padding:'0 0 12px 0',
                                        fieldLabel:'# H-Bond Receptors',
                                        columnWidth:.13,
                                        labelAlign:'top'
                                    },
                                    {
                                        xtype:'displayfield',
                                        name:'hbd',
                                        itemId:'hbd',
                                        fieldCls:'x-cmpBottomfieldValue', // value
                                        baseCls:'x-cmpBottomBase', // label
                                        anchor:'100%',
                                        padding:'0 0 12px 0',
                                        fieldLabel:'# H-Bond Donors',
                                        columnWidth:.13,
                                        labelAlign:'top'
                                    },
                                    {
                                        xtype:'displayfield',
                                        name:'full_mwt',
                                        itemId:'full_mwt',
                                        fieldCls:'x-cmpBottomfieldValue', // value
                                        baseCls:'x-cmpBottomBase', // label
                                        anchor:'100%',
                                        padding:'0 0 12px 0',
                                        fieldLabel:'Mol Weight',
                                        columnWidth:.1,
                                        labelAlign:'top'
                                    },
                                    {
                                        xtype:'displayfield',
                                        name:'mw_freebase',
                                        itemId:'mw_freebase',
                                        fieldCls:'x-cmpBottomfieldValue', // value
                                        baseCls:'x-cmpBottomBase', // label
                                        anchor:'100%',
                                        padding:'0 0 12px 0',
                                        fieldLabel:'MW Freebase',
                                        columnWidth:.1,
                                        labelAlign:'top'
                                    },
                                    {
                                        xtype:'displayfield',
                                        name:'num_ro5_violations',
                                        itemId:'num_ro5_violations',
                                        fieldCls:'x-cmpBottomfieldValue', // value
                                        baseCls:'x-cmpBottomBase', // label
                                        anchor:'100%',
                                        padding:'0 0 12px 0',
                                        fieldLabel:'# Rule of 5 Violations',
                                        columnWidth:.14,
                                        labelAlign:'top'
                                    },
                                    {
                                        xtype:'displayfield',
                                        name:'psa',
                                        itemId:'psa',
                                        fieldCls:'x-cmpBottomfieldValue', // value
                                        baseCls:'x-cmpBottomBase', // label
                                        anchor:'100%',
                                        padding:'0 0 12px 0',
                                        fieldLabel:'Polar Surface Area',
                                        columnWidth:.12,
                                        labelAlign:'top'
                                    },
                                    {
                                        xtype:'displayfield',
                                        name:'rtb',
                                        itemId:'rtb',
                                        fieldCls:'x-cmpBottomfieldValue', // value
                                        baseCls:'x-cmpBottomBase', // label
                                        anchor:'100%',
                                        padding:'0 0 12px 0',
                                        fieldLabel:'# Rotatable Bonds',
                                        columnWidth:.12,
                                        labelAlign:'top'
                                    }
                                ]


                            },
                            {
                                // MAIN DETAILS
                                xtype:'panel',
                                bodyPadding:30,
                                columnWidth:1.0,
                                border:false,
                                //autoScroll:true,
                                itemId:'dataPanel',
                                layout:'anchor',

                                items:[
                                    {
                                        xtype:'displayfield',
                                        name:'prefLabel',
                                        itemId:'prefLabel',
                                        //width:600,
                                        anchor:'100%',
                                        fieldCls:'x-cmpTitle'
                                    },
                                    {
                                        xtype:'displayfield',
                                        //value:'<br>',
                                        itemId:'spacer4'
                                    },

                                    {
                                        xtype:'button',
                                        margin:'0 10 0 0',
                                        text:'Pharmacology Data',
                                        itemId:'pharmCompoundButton'

                                    },
                                    {
                                        xtype:'button',
                                        margin:'0 0 0 10',
                                        text:'View in ChemBioNavigator',
                                        itemId:'cbnLinkout',
                                        action:'cbn_linkout'
                                    },


                                    {
                                        xtype:'displayfield',
                                        value:'<br>',
                                        itemId:'spacer1'
                                    },
                                    {
                                        xtype:'displayfield',
                                        name:'description',
                                        itemId:'description',
                                        fieldCls:'x-cmpDescriptions',
                                        anchor:'90%',
                                        maxWidth:600
                                        //width:680

                                    },
                                    {
                                        xtype:'displayfield',
                                        itemId:'spacer2'
                                    },
                                    {
                                        xtype:'displayfield',
                                        name:'biotransformation',
                                        itemId:'biotransformation',
                                        fieldCls:'x-cmpDescriptions',
                                        anchor:'90%',
                                        maxWidth:600
                                        //width:680

                                    },
                                    {
                                        xtype:'displayfield',
                                        itemId:'spacer3',
                                        value:'<br>'
                                    },
                                    {
                                        xtype:'displayfield',
                                        name:'chemspider_id',
                                        itemId:'chemspider_id',
                                        cls:'x-cmpfield',
                                        labelWidth:120,
                                        labelAlign:'left',
                                        fieldLabel:'ChemSpider ID',
                                        anchor:'100%'
                                    },
                                    {
                                        xtype:'displayfield',
                                        name:'molformula',
                                        itemId:'molformula',
                                        cls:'x-cmpfield',
                                        labelWidth:120,
                                        padding:'10px 0 0 0',
                                        maxWidth:570,
                                        anchor:'80%',
                                        labelAlign:'left',
                                        fieldLabel:'Molecular Formula'
                                    },
                                    {
                                        xtype:'displayfield',
                                        name:'smiles',
                                        itemId:'smiles',
                                        cls:'x-cmpfield',
                                        labelWidth:120,
                                        padding:'10px 0 0 0',
                                        maxWidth:570,
                                        anchor:'80%',
                                        labelAlign:'left',
                                        fieldLabel:'SMILES'
                                    },
                                    {
                                        xtype:'displayfield',
                                        name:'inchi',
                                        itemId:'inchi',
                                        cls:'x-cmpfield',
                                        labelWidth:120,
                                        maxWidth:570,
                                        anchor:'80%',
                                        labelAlign:'left',
                                        fieldLabel:'Standard InChl'
                                    },
                                    {
                                        xtype:'displayfield',
                                        name:'inchi_key',
                                        itemId:'inchi_key',
                                        cls:'x-cmpfield',
                                        labelWidth:120,
                                        padding:'10px 0 0 0',
                                        maxWidth:570,
                                        anchor:'80%',
                                        labelAlign:'left',
                                        fieldLabel:'Standard InChiKey'
                                    },
                                    {
                                        xtype:'displayfield',
                                        name:'affectedOrganism',
                                        itemId:'affectedOrganism',
                                        cls:'x-cmpfield',
                                        labelWidth:120,
                                        padding:'10px 0 0 0',
                                        maxWidth:570,
                                        anchor:'80%',
                                        labelAlign:'left',
                                        fieldLabel:'Affected Organism'
                                    },
                                    {
                                        xtype:'displayfield',
                                        name:'indication',
                                        itemId:'indication',
                                        cls:'x-cmpfield',
                                        fieldCls:'x-cmpDescriptions',
                                        labelWidth:120,
                                        padding:'10px 0 0 0',
                                        maxWidth:570,
                                        anchor:'80%',
                                        labelAlign:'left',
                                        fieldLabel:'Indication'
                                    },
                                    {
                                        xtype:'displayfield',
                                        name:'proteinBinding',
                                        itemId:'proteinBinding',
                                        cls:'x-cmpfield',
                                        fieldCls:'x-cmpDescriptions',
                                        labelWidth:120,
                                        padding:'10px 0 0 0',
                                        maxWidth:570,
                                        anchor:'80%',
                                        labelAlign:'left',
                                        fieldLabel:'Protein Binding'
                                    },
                                    {
                                        xtype:'displayfield',
                                        name:'toxicity',
                                        itemId:'toxicity',
                                        cls:'x-cmpfield',
                                        fieldCls:'x-cmpDescriptions',
                                        labelWidth:120,
                                        padding:'10px 0 0 0',
                                        maxWidth:570,
                                        anchor:'80%',
                                        labelAlign:'left',
                                        fieldLabel:'Toxicity'
                                    },
                                    {
                                        xtype:'displayfield',
                                        name:'meltingPoint',
                                        itemId:'meltingPoint',
                                        cls:'x-cmpfield',
                                        fieldCls:'x-cmpDescriptions',
                                        labelWidth:120,
                                        padding:'10px 0 0 0',
                                        maxWidth:570,
                                        anchor:'80%',
                                        labelAlign:'left',
                                        fieldLabel:'Melting Point'
                                    }
                                ]


                            }


                        ]


                    },

                    {

                        // BOTTOM Panel
                        xtype:'panel',
                        itemId:'bottomPanelDetails',
                        bodyPadding:30,
                        border:false,
                        height:100,
                        layout:'column',
                        hidden:true,

                        fieldDefaults:{
                            labelAlign:'top',
                            labelWidth:120,
                            anchor:'100%'
                        },

                        items:[


                        ]

                    },
                    {
                        xtype:'displayfield',
                        border:0,
                        padding:'20px',
                        itemId:'msg',
                        region:'center',
                        hidden:true,
                        fieldCls:'compound-message',
                        value:'message here'
                    }
                ]

            }
        ]

        this.callParent(arguments);

    },

    showData:function (store, records, succesful) {
        if (succesful) {
            if (records.length > 0) {
                var record = store.first();

//                console.log("Number of records returned " + records.length);

                var displayPanel = this.query('#displayPanel')[0];
                displayPanel.show();

                var dp = this.query('#dataPanel')[0];
                dp.show();

                var tp = this.query('#topPanelDetails')[0];
                tp.show();

                var bp = this.query('#bottomPanelDetails')[0];
                bp.show();

                var ip = this.query('#compound_form_imagepanel')[0];
				var csid;
				if (record.data.cs_uri) {
					csid = record.data.cs_uri.match(/http:\/\/rdf.chemspider.com\/(\d+)/)[1];
	                ip.setSrc('http://www.chemspider.com/ImagesHandler.ashx?id=' + csid);
	                ip.show();
				}

                var msg = this.down('#msg');
                msg.hide();

                this.setValues(record);
            } else {
                this.showMessage('No records found within OPS for this search');
            }
        } else {
            this.showMessage('Server did not respond');
        }
        this.up('CmpdByNameForm').setLoading(false);
        var searchButton = Ext.ComponentQuery.query('#CmpdByNameSubmit_id')[0].enable();
    },

    resetAllFields:function () {
        var displayFields = this.query('displayfield');
        Ext.each(displayFields, function (field) {
            field.hide();
        }, this);
        this.doLayout();
    },

    showSpacerFields:function () {
        var spacer = this.down('#spacer1');
        spacer.show();
        spacer = this.down('#spacer2');
        spacer.show();
        spacer = this.down('#spacer3');
        spacer.show();
        spacer = this.down('#spacer4');
        spacer.show();
    },

    setValues:function (compound) {
        this.resetAllFields();
        this.showSpacerFields();
        var td = compound.data;

        var pharmButton = this.down('#pharmCompoundButton');
        pharmButton.hide();
        pharmButton.setHandler(function () {
                //                console.log('Pharma button clicked: ' + '!p=PharmByCmpdNameForm&u=' + target.store.proxy.extraParams.protein_uri);
                Ext.History.add('!p=PharmByCmpdNameForm&u=' + compound.store.proxy.extraParams.uri);
            }
        );
        pharmButton.show();

        for (var prop in td) {
            if (td.hasOwnProperty(prop)) {
//                console.log("Field: " + prop + " Value: " + td[prop]);

                var field = this.down('#' + prop);
                if (field) {

                    switch (prop) {

                        case 'alogp':
                            // change alogp value to 1 d.p
                            var alogpValue = new Number(td[prop]);
                            alogpValue = alogpValue.toFixed(1);
                            field.setValue(alogpValue);
                            field.show();
                            break;
                        case 'molformula':

                            // correctly format molecular formula
                            var molValue = td[prop];
                            molValue = molValue.replace(/(\d+)?\s*/g, "<sub>$1</sub>");
                            field.setValue(molValue);
                            field.show();
                            break;
						case 'psa':
							var psaValue = td[prop];
							field.setValue(psaValue);
							field.show();
							break;
                        default:
                            if (td[prop]){
                                field.setValue(td[prop]);
                                field.show();
                            }
                    }


                } else {
//                    console.log("No itemId for: " + prop);
                }
            }
        }
        var ip = this.query('#compound_form_imagepanel')[0];
		var csid;
		if (compound.data.cs_uri) {
			csid = compound.data.cs_uri.match(/http:\/\/rdf.chemspider.com\/(\d+)/)[1];
	        ip.setSrc('http://www.chemspider.com/ImagesHandler.ashx?id=' + csid);
		}
        ip.show();
        this.doLayout();
    },

    showMessage:function (message) {

        var displayPanel = this.query('#displayPanel')[0];
        displayPanel.show();

        var dp = this.query('#dataPanel')[0];
        dp.hide();

        var tp = this.query('#topPanelDetails')[0];
        tp.hide();

        var bp = this.query('#bottomPanelDetails')[0];
        bp.hide();

        var ip = this.query('#compound_form_imagepanel')[0];
        ip.hide();

        var msg = this.query('#msg')[0];
        msg.setValue(message);
        msg.setVisible(true);
    }
});