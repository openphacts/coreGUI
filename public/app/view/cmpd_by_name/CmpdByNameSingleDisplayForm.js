Ext.define('LSP.view.cmpd_by_name.CmpdByNameSingleDisplayForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.CmpdByNameSingleDisplayForm',
    closable: true,

    initComponent: function() {

        var me = this;

        Ext.applyIf(me, {

            // ROOT Panel
            xtype: 'panel',
            bodyPadding: 10,
            renderTo: Ext.getBody(),
            width: 1000,
            height: 800,
            title: 'Compound by Name search results',
            layout: 'anchor',
            suspendLayout: true,

            items: [
                {
                   // TOP Panel
                   xtype: 'panel',
                   width: 1000,
                   height: 520,
                   border: false,
                   layout: 'column',
                   suspendLayout: true,

                       items: [{
                                   // IMAGE panel
                                   xtype: 'panel',
                                   name: 'image',
                                   border: false,
                                   width: 150,
                                   height: 150,
                                   html: '<img src="http://www.chemspider.com/ImagesHandler.ashx?id=187440" height="150" width="150" />', // e.g. Sorafenib
                                   //html: '<img src="http://www.chemspider.com/ImagesHandler.ashx?id=2157" height="150" width="150" />',  // Viagra
                                   suspendLayout: true

                                },{
                                   // MAINDETAILS panel
                                   xtype: 'panel',
                                   bodyPadding: 30,
                                   width: 710,
                                   height: 520,
                                   border: false,
                                   suspendLayout: true,

                                   fieldDefaults: {
                                        anchor: '100%'
                                    },

                                        items: [{
                                                    xtype: 'label',
                                                    name: 'compound_name',
                                                    text: 'Sorafenib',
                                                    cls: 'x-cmpTitle'
                                                },{
                                                    xtype: 'displayfield',
                                                    value: '<br>'
                                                },{
                                                    xtype: 'displayfield',
                                                    name: 'description',
                                                    value: 'Sorafenib (rINN), marketed as Nexavar by Bayer, is a drug ' +
                                                        'approved for the treatment of advanced renal cell carcinoma ' +
                                                        '(primary kidney cancer). It has also received "Fast Track" ' +
                                                        'designation by the FDA for the treatment of advanced ' +
                                                        'hepatocellular carcinoma (primary liver cancer), and has ' +
                                                        'since performed well in Phase III trials.' +
                                                        'Sorafenib is a small molecular inhibitor of Raf kinase, ' +
                                                        'PDGF (platelet-derived growth factor), VEGF receptor 2 &amp; ' +
                                                        '3 kinases and c Kit the receptor for Stem cell factor. ' +
                                                        'A growing number of drugs target most of these pathways. ' +
                                                        'The originality of Sorafenib lays in its simultaneous ' +
                                                        'targeting of the Raf/Mek/Erk pathway.'
                                                },{
                                                    xtype: 'displayfield'
                                                },{
                                                    xtype: 'displayfield',
                                                    name: 'biotransformation',
                                                    value: 'Sorafenib is metabolized primarily in the liver, undergoing' +
                                                        ' oxidative metabolism, mediated by CYP3A4, as well as ' +
                                                        'glucuronidation mediated by UGT1A9. Sorafenib accounts for ' +
                                                        'approximately 70-85% of the circulating analytes in plasma ' +
                                                        'at steady- state. Eight metabolites of sorafenib have been ' +
                                                        'identified, of which five have been detected in plasma. ' +
                                                        'The main circulating metabolite of sorafenib in plasma, the ' +
                                                        'pyridine N-oxide, shows &lt;i&gt;in vitro&lt;/i&gt; potency ' +
                                                        'similar to that of sorafenib. This metabolite comprises ' +
                                                        'approximately 9-16% of circulating analytes at steady-state.'
                                                },{
                                                    xtype: 'displayfield',
                                                    value: '<br>'
                                                },{
                                                    xtype: 'displayfield',
                                                    name: 'csid_uri',
                                                    cls: 'x-cmpfield',
                                                    labelWidth: 120,
                                                    labelAlign: 'left',
                                                    fieldLabel: 'ChemSpider ID',
                                                    value: '187440'
                                                },{
                                                    xtype: 'displayfield',
                                                    name: 'molformula',
                                                    cls: 'x-cmpfield',
                                                    labelWidth: 120,
                                                    labelAlign: 'left',
                                                    fieldLabel: 'Molecular Formula',
                                                    value: 'C21 H16 CI N4 O3'
                                                },{
                                                    xtype: 'displayfield',
                                                    name: 'smiles',
                                                    cls: 'x-cmpfield',
                                                    labelWidth: 120,
                                                    labelAlign: 'left',
                                                    fieldLabel: 'SMILES',
                                                    value: 'CNC(=O)c1cc(ccn1)Oc2ccc(cc2)NC(=O)Nc3ccc(c(c3)C(F)(F)F)Cl'
                                                },{
                                                    xtype: 'displayfield',
                                                    name: 'inchi',
                                                    cls: 'x-cmpfield',
                                                    labelWidth: 120,
                                                    labelAlign: 'left',
                                                    fieldLabel: 'Standard InChl',
                                                    value: 'InChI=1S/C21H16ClF3N4O3/c1-26-19(30)18-11-15(8-9-27-18)32-14-5-2-' +
                                                        '12(3-6-14)28-20(31)29-13-4-7-17(22)16(10-13)21(23,24)25/h2-11H,1H3,(H,26,30)(H2,28,29,31)'
                                                },{
                                                    xtype: 'displayfield',
                                                    name: 'inchiKey',
                                                    cls: 'x-cmpfield',
                                                    labelWidth: 120,
                                                    labelAlign: 'left',
                                                    fieldLabel: 'Standard InChlKey',
                                                    value: 'MLDQJTXFUGDVEO-UHFFFAOYSA-N'
                                                },{
                                                    xtype: 'displayfield',
                                                    name: 'affectedOrganism',
                                                    cls: 'x-cmpfield',
                                                    labelWidth: 120,
                                                    labelAlign: 'left',
                                                    fieldLabel: 'Affected Organism',
                                                    value: 'Humans and other mammals'
                                                  },{
                                                    xtype: 'displayfield',
                                                    name: 'indication',
                                                    cls: 'x-cmpfield',
                                                    labelWidth: 120,
                                                    labelAlign: 'left',
                                                    fieldLabel: 'Indication',
                                                    value: 'For the treatment of patients with advanced renal cell carcinoma.'
                                                  },{
                                                    xtype: 'displayfield',
                                                    name: 'proteinBinding',
                                                    cls: 'x-cmpfield',
                                                    labelWidth: 120,
                                                    labelAlign: 'left',
                                                    fieldLabel: 'Protein Binding',
                                                    value: '99.5%'
                                                  },{
                                                    xtype: 'displayfield',
                                                    name: 'toxicity',
                                                    cls: 'x-cmpfield',
                                                    labelWidth: 120,
                                                    labelAlign: 'left',
                                                    fieldLabel: 'Toxicity'
                                                  },{
                                                    xtype: 'displayfield',
                                                    name: 'meltingPoint',
                                                    cls: 'x-cmpfield',
                                                    labelWidth: 120,
                                                    labelAlign: 'left',
                                                    fieldLabel: 'Melting Point'
                                                  }]


                                    }]
                }, {

                    // BOTTOM Panel
                    xtype: 'panel',
                    bodyPadding: 30,
                    border: false,
                    height: 200,
                    layout:'column',

                    fieldDefaults: {
                        labelAlign: 'top',
                        labelWidth: 120,
                        anchor: '100%'
                    },

                    items: [{
                        xtype: 'displayfield',
                        name: 'alogp',
                        //cls: 'x-cmpBottomfield',
                        //fieldBodyCls: 'x-cmpBottomfield',
                        fieldCls: 'x-cmpBottomfieldValue',     // value
                        baseCls: 'x-cmpBottomBase',            // label
                        fieldLabel: 'ALogP',
                        labelAlign: 'top',
                        columnWidth: .1,
                        value: '4.175'
                    },{
                        xtype: 'displayfield',
                        name: 'hha',
                        fieldCls: 'x-cmpBottomfieldValue',     // value
                        baseCls: 'x-cmpBottomBase',            // label
                        fieldLabel: '# H-Bond Receptors',
                        columnWidth: .13,
                        labelAlign: 'top',
                        value: '4'
                    },{
                        xtype: 'displayfield',
                        name: 'hhd',
                        fieldCls: 'x-cmpBottomfieldValue',     // value
                        baseCls: 'x-cmpBottomBase',            // label
                        fieldLabel: '# H-Bond Donors',
                        columnWidth: .13,
                        labelAlign: 'top',
                        value: '3'
                    },{
                        xtype: 'displayfield',
                        name: 'molweight',
                        fieldCls: 'x-cmpBottomfieldValue',     // value
                        baseCls: 'x-cmpBottomBase',            // label
                        fieldLabel: 'Mol Weight',
                        columnWidth: .1,
                        labelAlign: 'top',
                        value: '464.819'
                    },
                    {
                        xtype: 'displayfield',
                        name: 'mw_freebase',
                        fieldCls: 'x-cmpBottomfieldValue',     // value
                        baseCls: 'x-cmpBottomBase',            // label
                        fieldLabel: 'MW Freebase',
                        columnWidth: .1,
                        labelAlign: 'top',
                        value: '464.825'
                    },{
                        xtype: 'displayfield',
                        name: 'num_ro5_violations',
                        fieldCls: 'x-cmpBottomfieldValue',     // value
                        baseCls: 'x-cmpBottomBase',            // label
                        fieldLabel: '# Rule of 5 Violations',
                        columnWidth: .14,
                        labelAlign: 'top',
                        value: '0'
                    },{
                        xtype: 'displayfield',
                        name: 'psa',
                        fieldCls: 'x-cmpBottomfieldValue',     // value
                        baseCls: 'x-cmpBottomBase',            // label
                        fieldLabel: 'Polar Surface Area',
                        columnWidth: .12,
                        labelAlign: 'top',
                        value: '92.35'
                    },
                    {
                        xtype: 'displayfield',
                        name: 'rtb',
                        fieldCls: 'x-cmpBottomfieldValue',     // value
                        baseCls: 'x-cmpBottomBase',            // label
                        fieldLabel: '# Rotatable Bonds',
                        columnWidth: .12,
                        labelAlign: 'top',
                        value: '6'
                    }]
                }]



        });

        this.callParent(arguments);

    }
});