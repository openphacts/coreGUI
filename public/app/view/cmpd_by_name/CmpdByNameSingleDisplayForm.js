Ext.require([
    'Ext.form.*'
]);

Ext.onReady(function() {

    // ROOT PANEL
    var rootPanel = Ext.create('Ext.panel.Panel', {
        bodyPadding: 10,
        renderTo: Ext.getBody(),
        width: 1000,
        height: 500,
        title: 'Compound by Name search results',
        layout: 'anchor',
        suspendLayout: true
    });

    // TOP PANEL
    var topPanel = Ext.create('Ext.panel.Panel', {
       xtype: 'panel',
       width: 1000,
       height: 265,
       border: false,
       layout: 'column',
       suspendLayout: true,


       items: [{
           // IMAGE PANEL
           xtype: 'panel',
           border: false,
           width: 150,
           height: 150,
           html: '<img src="http://www.chemspider.com/ImagesHandler.ashx?id=187440" height="150" width="150" />', // e.g. Sorafenib
           suspendLayout: true

        }]

    });

   // MAIN DETAILS PANEL
   var mainDetailsPanel = Ext.create('Ext.form.Panel', {
       xtype: 'panel',
       bodyPadding: 30,
       width: 825,
       height: 300,
       border: false,
       suspendLayout: true,

       fieldDefaults: {
            labelAlign: 'left',
            labelWidth: 120,
            anchor: '100%'
        },

        items: [{
            xtype: 'displayfield',
            name: 'titleNameField',
            value: '<span style="font-size:35;">Sorafenib</span>'
        },{
            xtype: 'displayfield',
            name: 'chemSpiderIdField',
            fieldLabel: '<br><br>ChemSpider ID',
            value: '<br><br><span style="color:#808080;">187440</span>'
        },{
            xtype: 'displayfield',
            name: 'molecularFormulaField',
            fieldLabel: 'Molecular Formula',
            value: '<span style="color:#808080;">C21 H16 CI N4 O3</span>'
        },{
            xtype: 'displayfield',
            name: 'smilesField',
            fieldLabel: 'SMILES',
            value: '<span style="color:#808080;">CNC(=O)c1cc(ccn1)Oc2ccc(cc2)NC(=O)Nc3ccc(c(c3)C(F)(F)F)Cl</span>'
        },{
            xtype: 'displayfield',
            name: 'smilesInChlField',
            fieldLabel: 'Standard InChl',
            value: '<span style="color:#808080;">InChI=1S/C21H16ClF3N4O3/c1-26-19(30)18-11-15(8-9-27-18)32-14-5-2-' +
                '12(3-6-14)28-20(31)29-13-4-7-17(22)16(10-13)21(23,24)25/h2-11H,1H3,(H,26,30)(H2,28,29,31)</span>'
        },{
            xtype: 'displayfield',
            name: 'smilesInChlKeyField',
            fieldLabel: 'Standard InChlKey',
            value: '<span style="color:#808080;">MLDQJTXFUGDVEO-UHFFFAOYSA-N</span>'
        }]
   });

   // Add MAIN DETAILS PANEL to TOP PANEL (IMAGE PANEL already added)
   topPanel.add(mainDetailsPanel);
   topPanel.doLayout();

    // Add TOP PANEL to ROOT PANEL
    rootPanel.add(topPanel);

    // Add BOTTOM PANEL to ROOT PANEL
    rootPanel.add({
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
            name: 'alogpField',
            fieldLabel: 'ALogP',
            labelAlign: 'top',
            columnWidth: .10,
            value: '<br><span style="color:#808080;">4.175</span>'
        },{
            xtype: 'displayfield',
            name: 'hbaField',
            fieldLabel: 'Number of Hydrogen Bond Receptors',
            columnWidth: .15,
            labelAlign: 'top',
            value: '<span style="color:#808080;">4</span>'
        },{
            xtype: 'displayfield',
            name: 'hbdField',
            fieldLabel: 'Number of Hydrogen Bond Donors',
            columnWidth: .15,
            labelAlign: 'top',
            value: '<span style="color:#808080;">3</span>'
        },{
            xtype: 'displayfield',
            name: 'molWeightField',
            fieldLabel: 'Mol Weight',
            columnWidth: .10,
            labelAlign: 'top',
            value: '<br><span style="color:#808080;">464.819</span>'
        },
        {
            xtype: 'displayfield',
            name: 'mwFreebaseField',
            fieldLabel: 'MW freebase',
            columnWidth: .10,
            labelAlign: 'top',
            value: '<br><span style="color:#808080;stype">464.825</span>'
        },{
            xtype: 'displayfield',
            name: 'numRoFiveViolationsField',
            fieldLabel: 'Number of ro5 Violations',
            columnWidth: .10,
            labelAlign: 'top',
            value: '<span style="color:#808080;">0</span>'
        },{
            xtype: 'displayfield',
            name: 'psaField',
            fieldLabel: 'Polar Surface Area',
            columnWidth: .10,
            labelAlign: 'top',
            value: '<span style="color:#808080;">92.35</span>'
        },
        {
            xtype: 'displayfield',
            name: 'rtbField',
            fieldLabel: 'Number of Rotatable Bonds',
            columnWidth: .15,
            labelAlign: 'top',
            value: '<span style="color:#808080;">6</span>'
        }]
    });

    // Turn the suspendLayout flag off
    rootPanel.suspendLayout = false;

    // Trigger a layout.
    rootPanel.doLayout();

});

