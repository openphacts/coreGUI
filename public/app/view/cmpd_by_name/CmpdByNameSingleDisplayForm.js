Ext.define('LSP.view.cmpd_by_name.CmpdByNameSingleDisplayForm', {
    extend:'Ext.form.Panel',
    alias:'widget.CmpdByNameSingleDisplayForm',
    //closable: true,

    initComponent:function () {

        var me = this;

        Ext.applyIf(me, {

            // ROOT Panel
            xtype:'panel',
            bodyPadding:10,
            //width: 1000,
            //height: 750,
            title:'Compound by Name search results',
            layout:'anchor',
            suspendLayout:true,
            autoScroll:true,

            items:[
                {
                    // TOP Panel
                    xtype:'panel',
                    itemId:'topPanelDetails',
                    //width: 1000,
                    border:false,
                    layout:'column',
                    suspendLayout:true,
                    hidden:true,

                    items:[
                        {
                            // IMAGE panel
                            xtype:'image',
                            name:'image',
                            //id: 'imagePanel',  // Ext uses id field and auto assigns one to it. Use itemId instead
                            itemId:'compound_form_imagepanel',
                            width:150,
                            height:150,
                            src:'/images/target_placeholder.png' // e.g. Sorafenib
                            //html: '<img src="http://www.chemspider.com/ImagesHandler.ashx?id=2157" height="150" width="150" />',  // Viagra

                        },
                        {
                            // MAINDETAILS panel
                            xtype:'panel',
                            itemId:'dataPanel',
                            bodyPadding:30,
                            width:710,
                            border:false,
                            suspendLayout:true,

                            fieldDefaults:{
                                anchor:'100%'
                            },

                            items:[
                                {
                                    xtype:'displayfield',
                                    name:'compound_name',
                                    itemId:'compound_name',
                                    //text: 'Sorafenib',
                                    fieldCls:'x-cmpTitle'
                                },
                                {xtype:'button', text:'Pharmacology Data', itemId:'pharmCompoundButton'},
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
                                    width:680

                                    /*
                                     value: 'Sorafenib (rINN), marketed as Nexavar by Bayer, is a drug ' +
                                     'approved for the treatment of advanced renal cell carcinoma ' +
                                     '(primary kidney cancer). It has also received "Fast Track" ' +
                                     'designation by the FDA for the treatment of advanced ' +
                                     'hepatocellular carcinoma (primary liver cancer), and has ' +
                                     'since performed well in Phase III trials.' +
                                     'Sorafenib is a small molecular inhibitor of Raf kinase, ' +
                                     'PDGF (platelet-derived growth factor), VEGF receptor 2 and; ' +
                                     '3 kinases and c Kit the receptor for Stem cell factor. ' +
                                     'A growing number of drugs target most of these pathways. ' +
                                     'The originality of Sorafenib lays in its simultaneous ' +
                                     'targeting of the Raf/Mek/Erk pathway.' */
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
                                    width:680
                                    /*
                                     value: 'Sorafenib is metabolized primarily in the liver, undergoing' +
                                     ' oxidative metabolism, mediated by CYP3A4, as well as ' +
                                     'glucuronidation mediated by UGT1A9. Sorafenib accounts for ' +
                                     'approximately 70-85% of the circulating analytes in plasma ' +
                                     'at steady- state. Eight metabolites of sorafenib have been ' +
                                     'identified, of which five have been detected in plasma. ' +
                                     'The main circulating metabolite of sorafenib in plasma, the ' +
                                     'pyridine N-oxide, shows <i>in vitro</i> potency ' +
                                     'similar to that of sorafenib. This metabolite comprises ' +
                                     'approximately 9-16% of circulating analytes at steady-state.' */
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
                                    fieldLabel:'ChemSpider ID'
                                    //value: '187440'
                                },
                                {
                                    xtype:'displayfield',
                                    name:'molformula',
                                    itemId:'molformula',
                                    cls:'x-cmpfield',
                                    labelWidth:120,
                                    width:400,
                                    labelAlign:'left',
                                    fieldLabel:'Molecular Formula'
                                    //value: 'C21 H16 CI N4 O3'
                                },
                                {
                                    xtype:'displayfield',
                                    name:'smiles',
                                    itemId:'smiles',
                                    cls:'x-cmpfield',
                                    labelWidth:120,
                                    width:650,
                                    labelAlign:'left',
                                    fieldLabel:'SMILES'
                                    //value: 'CNC(=O)c1cc(ccn1)Oc2ccc(cc2)NC(=O)Nc3ccc(c(c3)C(F)(F)F)Cl'
                                },
                                {
                                    xtype:'displayfield',
                                    name:'inchi',
                                    itemId:'inchi',
                                    cls:'x-cmpfield',
                                    labelWidth:120,
                                    width:650,
                                    labelAlign:'left',
                                    fieldLabel:'Standard InChl'
                                    //value: 'InChI=1S/C21H16ClF3N4O3/c1-26-19(30)18-11-15(8-9-27-18)32-14-5-2-' +
                                    //    '12(3-6-14)28-20(31)29-13-4-7-17(22)16(10-13)21(23,24)25/h2-11H,1H3,(H,26,30)(H2,28,29,31)'
                                },
                                {
                                    xtype:'displayfield',
                                    name:'inchiKey',
                                    itemId:'inchiKey',
                                    cls:'x-cmpfield',
                                    labelWidth:120,
                                    width:400,
                                    labelAlign:'left',
                                    fieldLabel:'Standard InChlKey'
                                    //value: 'MLDQJTXFUGDVEO-UHFFFAOYSA-N'
                                },
                                {
                                    xtype:'displayfield',
                                    name:'affectedOrganism',
                                    itemId:'affectedOrganism',
                                    cls:'x-cmpfield',
                                    labelWidth:120,
                                    width:300,
                                    labelAlign:'left',
                                    fieldLabel:'Affected Organism'
                                    //value: 'Humans and other mammals'
                                },
                                {
                                    xtype:'displayfield',
                                    name:'indication',
                                    itemId:'indication',
                                    cls:'x-cmpfield',
                                    labelWidth:120,
                                    width:650,
                                    labelAlign:'left',
                                    fieldLabel:'Indication'
                                    //value: 'For the treatment of patients with advanced renal cell carcinoma.'
                                },
                                {
                                    xtype:'displayfield',
                                    name:'proteinBinding',
                                    itemId:'proteinBinding',
                                    cls:'x-cmpfield',
                                    labelWidth:120,
                                    width:650,
                                    labelAlign:'left',
                                    fieldLabel:'Protein Binding'
                                    //value: '99.5%'
                                },
                                {
                                    xtype:'displayfield',
                                    name:'toxicity',
                                    itemId:'toxicity',
                                    cls:'x-cmpfield',
                                    labelWidth:120,
                                    width:650,
                                    labelAlign:'left',
                                    fieldLabel:'Toxicity'
                                },
                                {
                                    xtype:'displayfield',
                                    name:'meltingPoint',
                                    itemId:'meltingPoint',
                                    cls:'x-cmpfield',
                                    labelWidth:120,
                                    width:650,
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
                        {
                            xtype:'displayfield',
                            name:'alogp',
                            itemId:'alogp',
                            fieldCls:'x-cmpBottomfieldValue', // value
                            baseCls:'x-cmpBottomBase', // label
                            fieldLabel:'ALogP',
                            labelAlign:'top',
                            columnWidth:.1
                            //value: '4.175'
                        },
                        {
                            xtype:'displayfield',
                            name:'hha',
                            itemId:'hha',
                            fieldCls:'x-cmpBottomfieldValue', // value
                            baseCls:'x-cmpBottomBase', // label
                            fieldLabel:'# H-Bond Receptors',
                            columnWidth:.13,
                            labelAlign:'top'
                            //value: '4'
                        },
                        {
                            xtype:'displayfield',
                            name:'hhd',
                            itemId:'hhd',
                            fieldCls:'x-cmpBottomfieldValue', // value
                            baseCls:'x-cmpBottomBase', // label
                            fieldLabel:'# H-Bond Donors',
                            columnWidth:.13,
                            labelAlign:'top'
                            //value: '3'
                        },
                        {
                            xtype:'displayfield',
                            name:'molweight',
                            itemId:'molweight',
                            fieldCls:'x-cmpBottomfieldValue', // value
                            baseCls:'x-cmpBottomBase', // label
                            fieldLabel:'Mol Weight',
                            columnWidth:.1,
                            labelAlign:'top'
                            //value: '464.819'
                        },
                        {
                            xtype:'displayfield',
                            name:'mw_freebase',
                            itemId:'mw_freebase',
                            fieldCls:'x-cmpBottomfieldValue', // value
                            baseCls:'x-cmpBottomBase', // label
                            fieldLabel:'MW Freebase',
                            columnWidth:.1,
                            labelAlign:'top'
                            //value: '464.825'
                        },
                        {
                            xtype:'displayfield',
                            name:'num_ro5_violations',
                            itemId:'num_ro5_violations',
                            fieldCls:'x-cmpBottomfieldValue', // value
                            baseCls:'x-cmpBottomBase', // label
                            fieldLabel:'# Rule of 5 Violations',
                            columnWidth:.14,
                            labelAlign:'top'
                            //value: '0'
                        },
                        {
                            xtype:'displayfield',
                            name:'psa',
                            itemId:'psa',
                            fieldCls:'x-cmpBottomfieldValue', // value
                            baseCls:'x-cmpBottomBase', // label
                            fieldLabel:'Polar Surface Area',
                            columnWidth:.12,
                            labelAlign:'top'
                            //value: '92.35'
                        },
                        {
                            xtype:'displayfield',
                            name:'rtb',
                            itemId:'rtb',
                            fieldCls:'x-cmpBottomfieldValue', // value
                            baseCls:'x-cmpBottomBase', // label
                            fieldLabel:'# Rotatable Bonds',
                            columnWidth:.12,
                            labelAlign:'top'
                            //value: '6'
                        }
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

        });
        var store = Ext.data.StoreManager.lookup('Compounds');
        store.addListener('load', this.showData, this);
        this.callParent(arguments);

    },

    startLoading:function () {
        this.setLoading(true);
    },

    endLoading:function () {
        this.setLoading(false);
    },

    showData:function (store, records, succesful) {
        if (succesful) {
            if (records.length > 0) {
                var record = store.first();

//                console.log("Number of records returned " + records.length);

                var dp = this.query('#dataPanel')[0];
                dp.show();

                var tp = this.query('#topPanelDetails')[0];
                tp.show();

                var bp = this.query('#bottomPanelDetails')[0];
                bp.show();

                var ip = this.query('#compound_form_imagepanel')[0];
                var csid = record.data.csid_uri.match(/http:\/\/rdf.chemspider.com\/(\d+)/)[1];
                ip.setSrc('http://www.chemspider.com/ImagesHandler.ashx?id=' + csid);
                ip.show();

                var msg = this.down('#msg');
                msg.hide();

                this.setValues(record);
            } else {
                this.showMessage('No records found within OPS for this search');
            }
        } else {
            this.showMessage('Server did not respond');
        }
        this.endLoading();
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
    },

    setValues:function (compound) {
        this.resetAllFields();
        this.showSpacerFields();
        var td = compound.data;

        var pharmButton = this.down('#pharmCompoundButton');
        pharmButton.hide();
        pharmButton.setHandler(function () {
                //                console.log('Pharma button clicked: ' + '!p=PharmByCmpdNameForm&u=' + target.store.proxy.extraParams.protein_uri);
                Ext.History.add('!p=PharmByCmpdNameForm&u=' + compound.store.proxy.extraParams.compound_uri);
            }
        );
        pharmButton.show();

        for (var prop in td) {
            if (td.hasOwnProperty(prop)) {
//                console.log("Field: " + prop + " Value: " + td[prop]);

                var field = this.down('#' + prop);
                if (field) {

                    if (prop == 'alogp') {

                        // set alogp value to 1 decimal place
                        var alogpValue = new Number(td[prop]);
                        alogpValue = alogpValue.toFixed(1);
                        field.setValue(alogpValue);
                        field.show();

                    } else {

                        field.setValue(td[prop]);
                        field.show();

                    }



                } else {
//                    console.log("No itemId for: " + prop);
                }
            }
        }
        this.doLayout();
    },

    showMessage:function (message) {
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