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
                                        columnWidth:.1,
                                        renderer: provenanceSummaryRenderer
                                    },
                                    {
                                        xtype:'displayfield',
                                        name:'hba',
                                        itemId:'hba',
                                        fieldCls:'x-cmpBottomfieldValue', // value
                                        baseCls:'x-cmpBottomBase', // label\
                                        anchor:'100%',
                                        padding:'0 0 12px 0',
                                        fieldLabel:'# H-Bond Acceptors',
                                        columnWidth:.13,
                                        labelAlign:'top',
                                        renderer: provenanceSummaryRenderer

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
                                        labelAlign:'top',
                                        renderer: provenanceSummaryRenderer
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
                                        labelAlign:'top',
                                        renderer: provenanceSummaryRenderer
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
                                        labelAlign:'top',
                                        renderer: provenanceSummaryRenderer
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
                                        labelAlign:'top',
                                        renderer: provenanceSummaryRenderer
                                    },
                                    {
                                        xtype:'displayfield',
                                        name:'psa',
                                        itemId:'psa',
                                        fieldCls:'x-cmpBottomfieldValue', // value
                                        baseCls:'x-cmpBottomBase', // label
                                        anchor:'100%',
                                        padding:'0 0 12px 0',
                                        fieldLabel:'Polar Surface Area (Å<sup>2</sup>)',
                                        columnWidth:.12,
                                        labelAlign:'top',
                                        renderer: provenanceSummaryRenderer
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
                                        labelAlign:'top',
                                        renderer: provenanceSummaryRenderer
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
                                        name:'compound_pref_label',
                                        itemId:'compound_pref_label',
                                        //width:600,
                                        anchor:'100%',
                                        fieldCls:'x-cmpTitle',
                                        renderer: provenanceSummaryRenderer
                                    },
                                    {
                                        xtype:'displayfield',
                                        //value:'<br>',
                                        itemId:'spacer4',
                                        renderer: provenanceSummaryRenderer
                                    },

                                    {
                                        xtype:'button',
                                        margin:'0 10 0 0',
                                        text:'Pharmacology Data',
                                        itemId:'pharmCompoundButton',
                                        renderer: provenanceSummaryRenderer

                                    },
                                    {
                                        xtype:'button',
                                        margin:'0 0 0 10',
                                        text:'View in ChemBioNavigator',
                                        itemId:'cbnLinkout',
                                        action:'cbn_linkout',
                                        hidden: true
                                    },
                                    {
                                        xtype:'button',
                                        margin:'0 0 0 10',
                                        text:'ChemSpider Info',
                                        itemId:'csWindowLaunchButton',
                                        chemspiderId: '',
                                        action:'openCSWindow',
                                        hidden: true
                                    },


                                    {
                                        xtype:'displayfield',
                                        value:'<br>',
                                        itemId:'spacer1',
                                        renderer: provenanceSummaryRenderer
                                    },
                                    {
                                        xtype:'displayfield',
                                        name:'description',
                                        itemId:'description',
                                        fieldCls:'x-cmpDescriptions',
                                        anchor:'90%',
                                        maxWidth:600,
                                        renderer: provenanceSummaryRenderer
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
                                        maxWidth:600,
                                        renderer: provenanceSummaryRenderer
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
                                        anchor:'100%',
                                    },
                                    {
                                        xtype:'displayfield',
                                        name:'molform',
                                        itemId:'molform',
                                        cls:'x-cmpfield',
                                        labelWidth:120,
                                        padding:'10px 0 0 0',
                                        maxWidth:570,
                                        anchor:'80%',
                                        labelAlign:'left',
                                        fieldLabel:'Molecular Formula',
                                        renderer: provenanceSummaryRenderer
                                    },
                                    {
                                        xtype:'displayfield',
                                        name:'compound_smiles',
                                        itemId:'compound_smiles',
                                        cls:'x-cmpfield',
                                        labelWidth:120,
                                        padding:'10px 0 0 0',
                                        maxWidth:570,
                                        anchor:'80%',
                                        labelAlign:'left',
                                        fieldLabel:'SMILES',
                                        renderer: provenanceSummaryRenderer
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
                                        fieldLabel:'Standard InChl',
                                        renderer: provenanceSummaryRenderer
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
                                        fieldLabel:'Standard InChiKey',
                                        renderer: provenanceSummaryRenderer
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
                                        fieldLabel:'Affected Organism',
                                        renderer: provenanceSummaryRenderer
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
                                        fieldLabel:'Indication',
                                        renderer: provenanceSummaryRenderer
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
                                        fieldLabel:'Protein Binding',
                                        renderer: provenanceSummaryRenderer
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
                                        fieldLabel:'Toxicity',
                                        renderer: provenanceSummaryRenderer
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
                                        fieldLabel:'Melting Point',
                                        renderer: provenanceSummaryRenderer
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
        recordData = compound;
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
                //console.log("Field: " + prop + " Value: " + td[prop]);
                var val;
                var field = this.down('#' + prop);
                if (field) {

                    switch (prop) {

                        case 'alogp':

                            if (td[prop]){
                                // change alogp value to 1 d.p
                                var alogpValue = new Number(td[prop]);
                                alogpValue = alogpValue.toFixed(1);
                                field.setValue(alogpValue);
                                field.show();
                            }
                            break;

                        case 'molform':

                            if (td[prop]){
                                // correctly format molecular formula
                                var molValue = td[prop];
                                molValue = molValue.replace(/(\d+)?\s*/g, "<sub>$1</sub>");
                                field.setValue(molValue);
                                field.show();
                            }
                            break;

						case 'psa':

                            if (td[prop]){
                                var psaValue = parseFloat(td[prop])*1e19 ;                              
                                field.setValue(psaValue.toFixed(1));
                                field.show();
                            }
							break;

                        case 'meltingPoint':

                            if (td[prop]){
                                var meltingPoint = td[prop];
                                meltingPoint = meltingPoint.replace(/oC/g,'°C');
                                field.setValue(meltingPoint);
                                field.show();
                            }
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

        var csLinkFrag = compound.data.cs_uri.match(/http:\/\/rdf.chemspider.com\/(\d+)/)[1];
        var csLink = this.query('#chemspider_id')[0];
        csLink.setValue('<a href="http://www.chemspider.com/' + csLinkFrag +'"  target="_blank">' + csLinkFrag + '</a>');
        csLink.show();
        var ip = this.query('#compound_form_imagepanel')[0];
		var csid;
		if (compound.data.cs_uri) {
			csid = compound.data.cs_uri.match(/http:\/\/rdf.chemspider.com\/(\d+)/)[1];
	        ip.setSrc('http://www.chemspider.com/ImagesHandler.ashx?id=' + csid);
		}
        ip.show();
        // Preparing for Chemspider window open
        var csButton = this.query('#csWindowLaunchButton')[0];
        csButton.show();
        csButton.chemspiderId = csid;
        // End of Chemspider window open prep.
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
    },

    toggleProv:function (val) {
        provenance = val;
        console.log(" Show provenance : " + provenance);
    }


});

var provenance = false;
var recordData;

function provenanceSummaryRenderer(value, field) {

    var sources = new Array();
    sources['http://www.chemspider.com'] = "ChemSpider";
    sources['http://data.kasabi.com/dataset/chembl-rdf'] = "Chembl";
    sources['http://linkedlifedata.com/resource/drugbank'] = "DrugBank";
    sources['http://www.conceptwiki.org'] = "ConceptWiki";

    if (provenance) {

        var recdata = field.name;
        var itemdata = recdata + '_item';
        recdata += '_src';

        var source = recordData.data[recdata];
        //console.log(source);
        var cls = LDA.helper.LDAConstants.LDA_SRC_CLS_MAPPINGS[source];
        if (!cls) {
            cls = 'defaultValue';
        }
        var iconCls = cls + 'Icon';
        iconCls = '/assets/' + iconCls + '.png';
        cls += LDAProvenanceMode;
        cls += 'Summary';

        var output;

        //console.log(iconCls);
        // output =  '<div class="' + cls + '">' + value  + '   <a href="' + source + '">' + '<img class="' + iconCls + '" height="15" width="15"/>' + '</a>'+ '</div>';
        output =  '<div>' + value  + '   <a href="' + recordData.data[itemdata] + '" target="_blank">' + '<img src="' + iconCls + '" title= "' + sources[source]+  '" height="15" width="15"/>' +  '</a>'+ '</div>';

        return output;

    } else {

        return value;

    }

};

