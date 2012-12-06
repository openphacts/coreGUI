/*
Copyright(c) 2012 Company Name
*/
Ext.define('LDA.helper.LDAConstants', {
    singleton: true,
    LDA_BASE_URL: 'http://ops2.few.vu.nl',
    LDA_IN_DATASET: 'inDataset',
    LDA_ABOUT: '_about',
    LDA_LABEL: 'label',
    LDA_COMPOUND_PHARMACOLOGY_COUNT: 'compoundPharmacologyTotalResults',
    LDA_TARGET_PHARMACOLOGY_COUNT: 'targetPharmacologyTotalResults',
    LDA_ENZYME_FAMILY_COUNT: 'enzymePharmacologyTotalResults',
    LDA_PERMITTED_ACTIVITY_TYPES: ['IC50', 'Activity'],
    LDA_ON_ASSAY: 'onAssay',
    LDA_EXACT_MATCH: 'exactMatch',
    LDA_PRIMARY_TOPIC: 'primaryTopic',
    LDA_RESULT: 'result',
    LDA_ACTIVITY: 'activity',
    LDA_FOR_MOLECULE: 'forMolecule',
    LDA_ASSAY_TARGET: 'target',
    LDA_ITEMS: 'items',
    LDA_PAGINATED_NEXT: 'next',
    LDA_PAGINATED_PREVIOUS: 'prev',
    LDA_PAGINATED_PAGE_SIZE: 'itemsPerPage',
    LDA_PAGINATED_START_INDEX: 'startIndex',
    LDA_TARGET_OF_ASSAY: 'targetOfAssay',
    LDA_ASSAY_OF_ACTIVITY: 'assayOfActivity',
    LDA_SRC_CLS_MAPPINGS: {
        'http://www.conceptwiki.org': 'conceptWikiValue',
        'http://www.conceptwiki.org/': 'conceptWikiValue',
        'http://data.kasabi.com/dataset/chembl-rdf': 'chemblValue',
        'http://www4.wiwiss.fu-berlin.de/drugbank': 'drugbankValue',
        'http://linkedlifedata.com/resource/drugbank': 'drugbankValue',
        'http://www.chemspider.com': 'chemspiderValue',
        'http://www.chemspider.com/': 'chemspiderValue',
        'http://rdf.chemspider.com': 'chemspiderValue',
        'http://rdf.chemspider.com/': 'chemspiderValue',
        'http://purl.uniprot.org' : 'uniprotValue',
        'http://purl.uniprot.org/' : 'uniprotValue'
    },
    LDA_PROVENANCE_OFF: 'Off',
    LDA_PROVENANCE_COLOUR: 'Colour',
    LDA_PROVENANCE_ICON: 'Icon',
    LDA_PROVENANCE_TEXT: 'Text',
    //this sets default provenance mode
    //TODO this should be updated by user cookie, user choice or set in Viewport when running LSP.
    LDAProvenanceMode: 'Colour',
    LDADataItems: {
        "compound_smiles": "smiles",
        "activity_standard_value": "std_value",
        "compound_inchikey": "inchiKey",
        "activity_activity_type": "std_type",
        "activity_standard_units": "std_unit",
        "target_pref_label": "target_name",
        "activity_relation": "relation",
        "compound_inchi": "inchi",
        "compound_full_mwt": "molweight",
        "cw_compound_uri": "compound_cw",
        "compound_pref_label": "compound_name",
        "target_organism": "target_organisms",
	"target_title": "target_names",
	"assay_description": "assay_description",
	"assay_organism": "assay_organism"
    }
});

Ext.define('CW.config.Settings', {
    singleton: true,
    searchByTagUrl: 'http://ops.conceptwiki.org/web-ws/concept/search/byTag',
    getConceptUrl: 'http://ops.conceptwiki.org/web-ws/concept/get',
    base_ops_uri: 'http://www.conceptwiki.org/concept/',
    lang_code: "en"
});


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
                                        anchor:'100%'
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
	if (compound.data.cs_uri) {
            var csLinkFrag = compound.data.cs_uri.match(/http:\/\/rdf.chemspider.com\/(\d+)/)[1];
            var csLink = this.query('#chemspider_id')[0];
            csLink.setValue('<a href="http://www.chemspider.com/' + csLinkFrag +'"  target="_blank">' + csLinkFrag + '</a>');
            csLink.show();
	}
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
        compound_name_provenance = val;
        console.log(" Show provenance : " + compound_name_provenance);
    }


});

var compound_name_provenance = false;
var recordData;

function provenanceSummaryRenderer(value, field) {
	//console.log("Compound by name provenance renderer");

    var sources = new Array();
    sources['http://www.chemspider.com'] = "ChemSpider";
    sources['http://data.kasabi.com/dataset/chembl-rdf'] = "Chembl";
    sources['http://linkedlifedata.com/resource/drugbank'] = "DrugBank";
    sources['http://www.conceptwiki.org'] = "ConceptWiki";

    if (compound_name_provenance) {

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


/*########################################################################################
 #
 #  Copyright H. Lundbeck A/S
 #  This file is part of LSP4All.
 #
 #  LSP4All is free software; you can redistribute it and/or modify
 #  it under the terms of the GNU General Public License as published by
 #  the Free Software Foundation; either version 2 of the License, or (at
 #  your option) any later version.
 #
 #  LSP4All IS MADE AVAILABLE FOR DISTRIBUTION WITHOUT ANY FORM OF WARRANTY TO THE
 #  EXTENT PERMITTED BY APPLICABLE LAW.  THE COPYRIGHT HOLDER PROVIDES THE PROGRAM \"AS IS\"
 #  WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT
 #  LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 #  PURPOSE. THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM LIES
 #  WITH THE USER.  SHOULD THE PROGRAM PROVE DEFECTIVE IN ANY WAY, THE USER ASSUMES THE
 #  COST OF ALL NECESSARY SERVICING, REPAIR OR CORRECTION. THE COPYRIGHT HOLDER IS NOT
 #  RESPONSIBLE FOR ANY AMENDMENT, MODIFICATION OR OTHER ENHANCEMENT MADE TO THE PROGRAM
 #  BY ANY USER WHO REDISTRIBUTES THE PROGRAM SO AMENDED, MODIFIED OR ENHANCED.
 #
 #  IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING WILL THE
 #  COPYRIGHT HOLDER BE LIABLE TO ANY USER FOR DAMAGES, INCLUDING ANY GENERAL, SPECIAL,
 #  INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR INABILITY TO USE THE
 #  PROGRAM (INCLUDING BUT NOT LIMITED TO LOSS OF DATA OR DATA BEING RENDERED INACCURATE
 #  OR LOSSES SUSTAINED BY THE USER OR THIRD PARTIES OR A FAILURE OF THE PROGRAM TO
 #  OPERATE WITH ANY OTHER PROGRAMS), EVEN IF SUCH HOLDER HAS BEEN ADVISED OF THE
 #  POSSIBILITY OF SUCH DAMAGES.
 #
 #  You should have received a copy of the GNU General Public License
 #  along with this program; if not, write to the Free Software
 #  Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.
 #
 ########################################################################################*/

Ext.define('LSP.view.Appmoduletree', {
    extend:'Ext.tree.Panel',
    alias:'widget.appmoduletree',

    requires:[
        'Ext.data.TreeStore'
    ],

    //singleExpand: true,    
    rootVisible:false,
    useArrows:true,
    frame:false,
    autoScroll:true,
    height:'100%',

    store:'NavigationTree',

    listeners:{
        itemclick:function (tree, record, item, index, e, options) {
			console.log("AppmoduleTree: itemclick()");
            if (record.raw.application_type == 'grid') {
                // Check if panel with that ID exists, then switch
                Ext.History.add('!p=' + record.raw.xtype);
            }
        }
    },

    initComponent:function () {
        this.callParent(arguments);
    }
});
/*########################################################################################
 #
 #  Copyright H. Lundbeck A/S
 #  This file is part of LSP4All.
 #
 #  LSP4All is free software; you can redistribute it and/or modify
 #  it under the terms of the GNU General Public License as published by
 #  the Free Software Foundation; either version 2 of the License, or (at
 #  your option) any later version.
 #
 #  LSP4All IS MADE AVAILABLE FOR DISTRIBUTION WITHOUT ANY FORM OF WARRANTY TO THE
 #  EXTENT PERMITTED BY APPLICABLE LAW.  THE COPYRIGHT HOLDER PROVIDES THE PROGRAM \"AS IS\"
 #  WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT
 #  LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 #  PURPOSE. THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM LIES
 #  WITH THE USER.  SHOULD THE PROGRAM PROVE DEFECTIVE IN ANY WAY, THE USER ASSUMES THE
 #  COST OF ALL NECESSARY SERVICING, REPAIR OR CORRECTION. THE COPYRIGHT HOLDER IS NOT
 #  RESPONSIBLE FOR ANY AMENDMENT, MODIFICATION OR OTHER ENHANCEMENT MADE TO THE PROGRAM
 #  BY ANY USER WHO REDISTRIBUTES THE PROGRAM SO AMENDED, MODIFIED OR ENHANCED.
 #
 #  IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING WILL THE
 #  COPYRIGHT HOLDER BE LIABLE TO ANY USER FOR DAMAGES, INCLUDING ANY GENERAL, SPECIAL,
 #  INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR INABILITY TO USE THE
 #  PROGRAM (INCLUDING BUT NOT LIMITED TO LOSS OF DATA OR DATA BEING RENDERED INACCURATE
 #  OR LOSSES SUSTAINED BY THE USER OR THIRD PARTIES OR A FAILURE OF THE PROGRAM TO
 #  OPERATE WITH ANY OTHER PROGRAMS), EVEN IF SUCH HOLDER HAS BEEN ADVISED OF THE
 #  POSSIBILITY OF SUCH DAMAGES.
 #
 #  You should have received a copy of the GNU General Public License
 #  along with this program; if not, write to the Free Software
 #  Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.
 #
 ########################################################################################*/
Ext.define('LSP.store.NavigationTree', {
    extend:'Ext.data.TreeStore',
    // proxy:{
    //         type:'ajax',
    //         url:'application_modules.json'
    //     }
    root:{
        expanded:true,
        children:[
            {
                xtype:"",
                home:"",
                leaf:false,
                text:"Compound",
                cls:"folder",
                children:[
                    {
                        xtype:"CmpdByNameForm",
                        home:"Compound by name",
                        leaf:true,
                        text:"Compound by name",
                        cls:"file",
                        application_type:'grid'
                    },
                    {
                        xtype:"SimSearchForm",
                        home:"Compound Structure Search",
                        leaf:true,
                        text:"Compound by structure",
                        cls:"file",
                        application_type:'grid'
                    }

                ]
            },
            {
                xtype:"",
                home:"",
                leaf:false,
                text:"Target",
                cls:"folder",
                children:[
                    {
                        xtype:"TargetByNameForm",
                        home:"Target by name",
                        leaf:true,
                        text:"Target by name",
                        cls:"file",
                        application_type:'grid'
                    }
                    //{
                    //    xtype:"temp",
                    //    home:"",
                    //    leaf:true,
                    //    text:"X-Target by sequence",
                    //    cls:"file",
                    //    application_type:'grid'
                    //}
                ]
            },
            {
                xtype:"",
                leaf:false,
                text:"Pharmacology",
                cls:"folder",
                children:[
                    {
                        xtype:"PharmEnzymeForm",
                        home:"Compounds active against enzyme family",
                        leaf:true,
                        text:"Pharmacology by Enzyme family",
                        cls:"file",
                        application_type:'grid'
                    },
                    {
                        xtype:"PharmByCmpdNameForm",
                        home:"Pharmacology by Compound name",
                        leaf:true,
                        text:"Pharmacology by Compound",
                        cls:"file",
                        application_type:'grid'
                    },
                    {
                        xtype:"PharmByTargetNameForm",
                        home:"Pharmacology by Target Name",
                        leaf:true,
                        text:"Pharmacology by Target",
                        cls:"file",
                        application_type:'grid'
                    }
                ]
            }


        ]


    }
});


//			,{
//				xtype: "",
//		        home: "",
//		        leaf: false,
//		        text: "Searching",
//		        cls: "folder",
//				children: [{
//					xtype: "queryform",
//			        home: "SPARQL form",
//			        leaf: true,
//			        text: "SPARQL",
//			        cls: "file",
//			        url: "rdf.json"
//				}]
//			}
// Summmary form is hidden for the moment
// {
// 					xtype: "",
// 			        leaf: false,
// 			        text: "Concept",
// 			        cls: "folder",
// 					children: [{
// 						xtype: "SummeryForm",
// 						home: "Concept properties and relations",
// 				        leaf: true,
// 				        text: "Summary",
// 				        cls: "file",
// 						application_type : 'grid'
// 					}]
// 				},
//,

//{
//    xtype:"",
//        cls:"folder",
//    text:"Exemplars",
//    leaf:false,
//    children:[
//    {
//        xtype:"temp",
//        leaf:true,
//        text:"X-Chem-Bio Navigator",
//        cls:"file",
//        application_type:'grid'
//    },
//    {
//        xtype:"temp",
//        leaf:true,
//        text:"X-Target Dossier",
//        cls:"file",
//        application_type:'grid'
//    },
//    {
//        xtype:"temp",
//        leaf:true,
//        text:"X-Polypharmacology Browser",
//        cls:"file",
//        application_type:'grid'
//    }
//]
//}

/*########################################################################################
 #
 #  Copyright H. Lundbeck A/S
 #  This file is part of LSP4All.
 #
 #  LSP4All is free software; you can redistribute it and/or modify
 #  it under the terms of the GNU General Public License as published by
 #  the Free Software Foundation; either version 2 of the License, or (at
 #  your option) any later version.
 #
 #  LSP4All IS MADE AVAILABLE FOR DISTRIBUTION WITHOUT ANY FORM OF WARRANTY TO THE
 #  EXTENT PERMITTED BY APPLICABLE LAW.  THE COPYRIGHT HOLDER PROVIDES THE PROGRAM \"AS IS\"
 #  WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT
 #  LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 #  PURPOSE. THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM LIES
 #  WITH THE USER.  SHOULD THE PROGRAM PROVE DEFECTIVE IN ANY WAY, THE USER ASSUMES THE
 #  COST OF ALL NECESSARY SERVICING, REPAIR OR CORRECTION. THE COPYRIGHT HOLDER IS NOT
 #  RESPONSIBLE FOR ANY AMENDMENT, MODIFICATION OR OTHER ENHANCEMENT MADE TO THE PROGRAM
 #  BY ANY USER WHO REDISTRIBUTES THE PROGRAM SO AMENDED, MODIFIED OR ENHANCED.
 #
 #  IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING WILL THE
 #  COPYRIGHT HOLDER BE LIABLE TO ANY USER FOR DAMAGES, INCLUDING ANY GENERAL, SPECIAL,
 #  INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR INABILITY TO USE THE
 #  PROGRAM (INCLUDING BUT NOT LIMITED TO LOSS OF DATA OR DATA BEING RENDERED INACCURATE
 #  OR LOSSES SUSTAINED BY THE USER OR THIRD PARTIES OR A FAILURE OF THE PROGRAM TO
 #  OPERATE WITH ANY OTHER PROGRAMS), EVEN IF SUCH HOLDER HAS BEEN ADVISED OF THE
 #  POSSIBILITY OF SUCH DAMAGES.
 #
 #  You should have received a copy of the GNU General Public License
 #  along with this program; if not, write to the Free Software
 #  Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.
 #
 ########################################################################################*/

Ext.define('LSP.view.mol_editor_forms.KetcherForm', {
    extend:'Ext.window.Window',
    alias:'widget.KetcherForm',

    requires:['Ext.form.Panel'],

    title:'Draw structure',
    layout:'fit',
    modal:true,
    autoShow:true,
    height:570,
    width:810,

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
                        width:800,
                        height:520,
                        id:'ketcher_box_id',
                        autoEl:{
                            tag:'iframe',
                            src:'ketcher/ketcher.html'
                        }}
                ]
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

Ext.define('LSP.model.DynamicGrid', {
    extend:'Ext.data.Model',
    fields:[]
});

Ext.define('LSP.view.Settings', {
    extend:'Ext.form.Panel',
    alias:'widget.settingsform',
    height:'100%',
    initComponent:function () {

        this.items = [
            {
                xtype:'form',
                padding:'5 5 0 5',
                border:false,
                //height: '100%',
                style:'background-color: #fff;',
                items:[
                    {
                        xtype:'label',
                        text:'To use a different endpoint than the default Amsterdam VU one insert URL of sparql endpoint below and click save'
                    },
                    {
                        xtype:'textarea',
                        name:'endpoint',
                        heigth:50,
                        fieldLabel:'URL',
                        emptyText:'Insert full URL to the sparql endpoint used, eg: http://10.11.93.218:8183/sparql',
                        labelWidth:30
                    },
                    {
                        name:'utf8',
                        xtype:'hidden',
                        value:'&#x2713;'
                    },
                    {
                        name:'authenticity_token',
                        xtype:'hidden',
                        value:$$('meta[name=csrf-token]')[0].readAttribute('content')
                    },
                    {
                        xtype:'button',
                        text:'Save',
                        action:'save_endpoint'
                    }
                ]
            }
        ];
        this.callParent(arguments);
    }
});
Ext.define('LSP.model.Unit', {
    extend:'Ext.data.Model',
    fields:['unit', 'name']
});

Ext.define('CW.model.ConceptWikiLookup', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'match', mapping: 'match', type: 'string' },
        { name: 'uuid', mapping: 'uuid', type: 'string' },
        { name: 'ops_uri', mapping: 'ops_uri', type: 'string' },
        { name: 'pref_label', mapping: 'pref_labels', type:'string'},
        { name: 'alt_labels', mapping: 'alt_labels', type: 'string' },
        { name: 'uuid', mapping: 'uuid', type: 'string' },
        { name: 'concept_type_tags', mapping: 'uuid_tags', type:'string'},
        { name: 'pref_url', mapping: 'pref_url', type: 'string' }
    ],
    getSomething: function () {
        if (this.something == null) this.parseSomething();

        return this.something;
    },
    parseSomething: function () {
        this.something = new Array();
        for (var i = 0; i < this.data.something.length; i++) {
            var syn = this.data.tags[i];
            if (syn.length == 1)
                this.something.push(syn);
        }
    }
});

Ext.define('CW.helper.ConceptWikiJSONReader', {
    extend:'Ext.data.reader.Json',
    
    readRecords:function (data) {

        var records = [];
        var count = 0;
        Ext.each(data, function (item) {
           var record = {};
           var pref_label = "";
           var alt_labels = [];
           // iterating over labels to get preferred and alternative labels in relevant language
           Ext.each(item.labels, function (label){
              if (label.language.code == CW.config.Settings.lang_code) {
                if (label.type == "PREFERRED") {
                    pref_label = label.text;
                }
                if (label.type == "ALTERNATIVE") {
                    alt_labels.push(label.text);
                }             
              }
           });
           // iterating over tags to get the different tag uuid types and tag texts
//// NB we do not care aboout these at the moment
            var concept_tag_uuids = [];
//            var concept_tag_labels = [];           
//            Ext.each(item.tags, function (tag){              
//                concept_tag_uuids.push(tag.uuid);         
//            });
           // iterating over urls to get first preferred url
           pref_url = "";
           Ext.each(item.urls, function (url){
              if (url.type == "PREFERRED") {
                    pref_url = url.value;
                    return false; // breaks loop
              }
           });

           // constructing the data record
        var record = Ext.create('CW.model.ConceptWikiLookup', {
          match: item.match.replace(/\<\/em\>/g,"</b>").replace(/\<em\>/g,"<b>"),
          uuid: item.uuid,
          ops_uri: CW.config.Settings.base_ops_uri + item.uuid,
          pref_label: pref_label,
          alt_labels: alt_labels.join("; "),
          concept_type_tags: concept_tag_uuids.join("; "),
          pref_url: pref_url
        });
        
        records.push(record);
        count++;
//        console.log(JSON.stringify(record));


       
    })
     return new Ext.data.ResultSet(
            {
                total  : count,
                count  : count,
                records: records,
                success:true,
                message:'loaded'
            });
    }
});


Ext.define('LSP.controller.CmpdByNameForm', {
    extend: 'Ext.app.Controller',
    // models: ['LDA.model.CompoundModel'],
    // stores: ['LDA.store.CompoundStore'],
    views: ['cmpd_by_name.CmpdByNameSingleDisplayForm'],

    refs: [{
        ref: 'cmpdByNameSingleDisplayForm',
        selector: 'CmpdByNameSingleDisplayForm'
    }, {
        ref: 'compoundImagePanel',
        selector: 'CmpdByNameSingleDisplayForm #compound_form_imagepanel'
    }, {
        ref: 'formView',
        selector: 'CmpdByNameForm'
    }, {
        ref: 'submitButton',
        selector: '#CmpdByNameSubmit_id'
    }, {
        ref: 'lookup',
        selector: 'CmpdByNameForm #compoundByNameLookup'
    }],
    current_uri: null,

    init: function() {
        this.control({
            'CmpdByNameForm button[action=query_cmpd_by_name]': {
                click: this.submitQuery
            },
            'CmpdByNameForm conceptWikiLookup': {
                select: this.enableSubmit
            },
            'CmpdByNameForm': {
                historyToken: this.handleHistoryToken
            },
            'CmpdByNameForm button[action = cbn_linkout]': {
                click: this.firecbnLink
            },
            'CmpdByNameForm button[action=openCSWindow]': {
				        click: this.openChemSpiderWidget
			      },
            'CmpdByNameForm #provId': {
                change: this.onProvChange
            }
        });

	this.compoundWnd = Ext.create('CS.view.CompoundWindow');
    },

    firecbnLink: function() {
        //            http://cbn.zbh.uni-hamburg.de/?ops_uris=http://www.conceptwiki.org/concept/dd758846-1dac-4f0d-a329-06af9a7fa413
        //var store = this.getLDAStoreCompoundStoreStore();
        window.open('http://cbn.zbh.uni-hamburg.de/?ops_uris=' + this.current_uri, '_blank')
    },
    
    openChemSpiderWidget: function(button) {
        if (parseInt(button.chemspiderId) >= 1) {
            this.compoundWnd.showCompound(button.chemspiderId);
        }
    },

    handleHistoryToken: function(historyTokenObject) {
        console.log('CmpdByNameForm: handleHistoryToken()');
        var me = this;
        var compound_panel = me.getFormView().down("CmpdByNameSingleDisplayForm");
        if (historyTokenObject.u) {
            var store = this.getStore("LDA.store.CompoundStore");
            if (historyTokenObject.u != store.proxy.extraParams.uri) {
                // Setting the value in the Concept Wiki dropdown to the one defined by the uuid
                var cw_controller = this.getController("CW.controller.ConceptWikiLookup"); 
                var cw_dropdown = this.getFormView().down('conceptWikiLookup');
                cw_controller.setConcept(historyTokenObject.u,cw_dropdown);
                // Setting the uri for the LDA search
                store.proxy.extraParams.uri = historyTokenObject.u;
                me.current_uri = historyTokenObject.u;
                me.getFormView().setLoading(true);
                store.load(function(records, operation, success) {
                    console.log('LSP.controller.CmpdByNameForm: store is loaded ' + success);
                    if (success) {
                        me.getSubmitButton().enable();
                        compound_panel.setValues(records[0]);
                        compound_panel.recordData = records[0];
                        compound_panel.down("#displayPanel").setVisible(true);
                        compound_panel.down('#msg').setVisible(false);
                        me.getFormView().setLoading(false);
                    } else {
                        Ext.MessageBox.show({
                            title: 'Info',
                            msg: 'We are sorry but the OPS system returned an error.',
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.INFO
                        });
                        me.getSubmitButton().enable();
                        compound_panel.down("#displayPanel").setVisible(false);
                        compound_panel.down('#msg').setVisible(true);
                        me.getFormView().setLoading(false);
                    }
                });
            }
        } else if (historyTokenObject.s) {
            var lookup = this.getLookup();
            lookup.setRawValue(historyTokenObject.s);
            lookup.doQuery(historyTokenObject.s);
        }
    },

    enableSubmit: function(compundLookup) {
        var form = this.getFormView();
        var button = this.getSubmitButton();
        button.enable();
    },

    submitQuery: function(button) {
        button.disable();
	var me = this;
        var form = this.getFormView();
        var compound_uri = form.getValues().compound_uri;
        if (this.current_uri == compound_uri) {
            var compound_panel = me.getFormView().down("CmpdByNameSingleDisplayForm");
            var store = this.getStore("LDA.store.CompoundStore");
            store.proxy.extraParams.uri = this.current_uri;
            me.getFormView().setLoading(true);
            store.load(function(records, operation, success) {
                console.log('LSP.controller.CmpdByNameForm: store is loaded ' + success);
                if (success) {
                    me.getSubmitButton().enable();
                    compound_panel.setValues(records[0]);
                    compound_panel.recordData = records[0];
                    compound_panel.down("#displayPanel").setVisible(true);
                    compound_panel.down('#msg').setVisible(false);
                    me.getFormView().setLoading(false);
                } else {
                    Ext.MessageBox.show({
                        title: 'Info',
                        msg: 'We are sorry but the OPS system returned an error.',
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.INFO
                    });
                    me.getSubmitButton().enable();
                    compound_panel.down("#displayPanel").setVisible(false);
                    compound_panel.down('#msg').setVisible(true);
                    me.getFormView().setLoading(false);
                }
            });
        } else {
            Ext.History.add('!p=CmpdByNameForm&u=' + compound_uri);
        }
    },

    onProvChange: function(field, newVal, oldVal) {
        var dg = this.getCmpdByNameSingleDisplayForm();
        dg.toggleProv(newVal['prov']);
        dg.setValues(dg.recordData);

    }
});

/*########################################################################################
 #
 #  Copyright H. Lundbeck A/S
 #  This file is part of LSP4All.
 #
 #  LSP4All is free software; you can redistribute it and/or modify
 #  it under the terms of the GNU General Public License as published by
 #  the Free Software Foundation; either version 2 of the License, or (at
 #  your option) any later version.
 #
 #  LSP4All IS MADE AVAILABLE FOR DISTRIBUTION WITHOUT ANY FORM OF WARRANTY TO THE
 #  EXTENT PERMITTED BY APPLICABLE LAW.  THE COPYRIGHT HOLDER PROVIDES THE PROGRAM \"AS IS\"
 #  WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT
 #  LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 #  PURPOSE. THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM LIES
 #  WITH THE USER.  SHOULD THE PROGRAM PROVE DEFECTIVE IN ANY WAY, THE USER ASSUMES THE
 #  COST OF ALL NECESSARY SERVICING, REPAIR OR CORRECTION. THE COPYRIGHT HOLDER IS NOT
 #  RESPONSIBLE FOR ANY AMENDMENT, MODIFICATION OR OTHER ENHANCEMENT MADE TO THE PROGRAM
 #  BY ANY USER WHO REDISTRIBUTES THE PROGRAM SO AMENDED, MODIFIED OR ENHANCED.
 #
 #  IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING WILL THE
 #  COPYRIGHT HOLDER BE LIABLE TO ANY USER FOR DAMAGES, INCLUDING ANY GENERAL, SPECIAL,
 #  INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR INABILITY TO USE THE
 #  PROGRAM (INCLUDING BUT NOT LIMITED TO LOSS OF DATA OR DATA BEING RENDERED INACCURATE
 #  OR LOSSES SUSTAINED BY THE USER OR THIRD PARTIES OR A FAILURE OF THE PROGRAM TO
 #  OPERATE WITH ANY OTHER PROGRAMS), EVEN IF SUCH HOLDER HAS BEEN ADVISED OF THE
 #  POSSIBILITY OF SUCH DAMAGES.
 #
 #  You should have received a copy of the GNU General Public License
 #  along with this program; if not, write to the Free Software
 #  Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.
 #
 ########################################################################################*/

Ext.define('LSP.controller.Settings', {
        extend:'Ext.app.Controller',

        views:['Settings'],

        init:function () {
            this.control({
                'settingsform button[action=save_endpoint]':{
                    click:this.saveEndpoint
                }
            });
        },
        saveEndpoint:function (button) {
            // Call to store endpoint in session
            var form = button.up('form');
            var values = form.getValues();
            form.submit({
                url:'/sparql_endpoint/settings.json',
                waitMsg:'Saving end point...',
                success:function (fp, o) {
                    Ext.Msg.alert('Success', 'Endpoint stored');
                }});

        }
    }
);

Ext.define('CW.store.ConceptWikiLookup', {
    extend: 'Ext.data.Store',
    requires: ['CW.model.ConceptWikiLookup', 'CW.config.Settings'],
    model: 'CW.model.ConceptWikiLookup',
	proxy: {
        type: 'jsonp',
        timeout: 5000,
        url: CW.config.Settings.searchByTagUrl,
        reader: Ext.create('CW.helper.ConceptWikiJSONReader')
    },
    constructor: function () {
		console.log('CW.store.ConceptWikiLookup: constructor()');
        this.callParent(arguments);
        // this.setProxy({
        //            type: 'jsonp',
        //            timeout: 5000,
        //            url: CW.config.Settings.searchByTagUrl,
        //            reader: Ext.create('CW.helper.ConceptWikiJSONReader')
        //        });
    }
});

Ext.define('LSP.view.dropdowns.conceptWikiProteinLookup', {
    extend:'Ext.form.ComboBox',
    alias:'widget.conceptWikiProteinLookup',

    store:Ext.create('Ext.data.Store', {
        fields:[
            {type:'string', name:'concept_label'},
            {type:'string', name:'concept_url'},
            {type:'string', name:'define_url'},
            {type:'string', name:'concept_uuid'},
            {type:'string', name:'concept_alt_labels'},
            {type:'string', name:'tag_label'},
            {type:'string', name:'tag_uuid'},
            {type:'string', name:'match'}

        ],
        proxy:{
            type:'ajax',
            api:{
                read:'/concept_wiki_api_calls/protein_lookup.json'
            },
            reader:{
                type:'json'
            }
        }
    }),
    queryMode:'remote',
    valueField:'concept_url',
    displayField:'concept_label',
    name:'protein_uri',
    minChars:4,
    hideTrigger:true,
    forceSelection:true,
    allowBlank:false,
    typeAhead:true,
    emptyText:'Start typing...',
    margin:'5 5 5 5',
    width:700,
    fieldLabel:'Protein name',
    labelWidth:120,
    listConfig:{
        loadingText:'Searching...',
        emptyText:'No matching proteins found.',
        getInnerTpl:function () {
//                    return '<p><font face="verdana" color="grey"><small>Match: {match}</small></font><br/><b>{concept_label}</b> <a href="{define_url}" target="_blank">(definition)</a><br/ ><small>Alt. terms: <i>{concept_alt_labels}</i></small></p>';
            return '<p><span style="font-family: verdana; color: grey; "><small>Match: {match}</small></span><br/><b>{concept_label}</b> <a href="{define_url}" target="_blank">(definition)</a></p>';
        }
    }
});
         
           
/**
 * Created by JetBrains RubyMine.
 * User: jameseales
 * Date: 04/04/2012
 * Time: 11:52
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LSP.model.GuiComponent', {
    extend:'Ext.data.Model',
    fields:['xtype', 'url', 'id', 'text', 'home']
});

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
    anchor:'100% 100%',
    autoScroll:true,
    bodyPadding:'10px',
    layout:'anchor',

    initComponent:function () {
        this.items = [
            {
                xtype:'panel',
                border:0,
                layout:'anchor',
                autoScroll:true,
                itemId:'dp',
                bodyPadding:'20px',
                cls:'target-data-panel',
                hidden:true,
                items:[
                    {
                        xtype:'panel',
                        border:0,
                        anchor:'100%',
                        itemId:'topPanel',
                        layout:'column',
                        autoScroll:true,
                        items:[
                            {
                                xtype:'image',
                                itemId:'target_image',
                                width:150,
                                height:150,
                                src:'./assets/target_placeholder.png'
                            },
                            {
                                xtype:'panel',
                                bodyPadding:30,
                                columnWidth:1.0,
                                border:0,
                                autoScroll:true,
                                itemId:'textDataPanel',
                                layout:'anchor',
                                items:[
                                    {xtype:'displayfield', anchor:'100%', itemId:'prefLabel',renderer: provenanceTargetSummaryRenderer, fieldCls:'target-title'},
                                    {xtype:'button', text:'Pharmacology Data', margin: '15 0 20 0', itemId:'pharmTargetButton', cls:'target-pharm-button'},
                                    {xtype:'displayfield', anchor:'100%', itemId:'target_type', fieldLabel:'Target Type',renderer: provenanceTargetSummaryRenderer, cls:'target-field-label'},
                                    {xtype:'displayfield', anchor:'100%', padding:'10px 0 0 0', itemId:'organism', renderer: provenanceTargetSummaryRenderer,fieldLabel:'Organism', cls:'target-field-label'},
                                    {xtype:'displayfield', anchor:'100%', padding:'10px 0 0 0', itemId:'description', renderer: provenanceTargetSummaryRenderer,fieldLabel:'Description', cls:'target-field-label'},
                                    {xtype:'displayfield', anchor:'100%', padding:'10px 0 0 0', maxWidth:600, itemId:'synonyms', renderer: provenanceTargetSummaryRenderer,fieldLabel:'Synonyms', cls:'target-field-label'},
                                    {xtype:'displayfield', anchor:'100%', padding:'10px 0 0 0', maxWidth:600, itemId:'specific_function',fieldLabel:'Specific Function', renderer: provenanceTargetSummaryRenderer, cls:'target-descriptions'},
                                    {xtype:'displayfield', anchor:'100%', padding:'10px 0 0 0', itemId:'cellular_function', renderer: provenanceTargetSummaryRenderer,fieldLabel:'Cellular Function', cls:'target-field-label'},
                                    {xtype:'displayfield', anchor:'100%', padding:'10px 0 0 0', maxWidth:600, itemId:'keywords', fieldLabel:'Keywords', renderer: provenanceTargetSummaryRenderer,cls:'target-field-label'}            ,
                                    {xtype:'displayfield', anchor:'100%', padding:'10px 0 0 0', maxWidth:600, itemId:'pdb_id_page', renderer: provenanceTargetSummaryRenderer,fieldLabel:'PDB Entry', cls:'target-field-label'},
                                    {xtype:'displayfield', anchor:'100%', padding:'10px 0 0 0', maxWidth:600, itemId:'cellular_location', fieldLabel:'Cellular Location', renderer: provenanceTargetSummaryRenderer,cls:'target-field-label'},

                                    {
                                        xtype:'panel',
                                        border:0,
                                        anchor:'100%',
                                        itemId:'numericDataPanel',
                                        layout:'column',
                                        bodyPadding:30,
                                        items:[
                                            {xtype:'displayfield', itemId:'molecular_weight', columnWidth:0.33, fieldLabel:'Molecular Weight', renderer: provenanceTargetSummaryRenderer,cls:'target-field-bottom', fieldCls:'target-field-bottom-field', labelAlign:'top' },
                                            {xtype:'displayfield', itemId:'number_of_residues', columnWidth:0.33, fieldLabel:'Number of Residues', renderer: provenanceTargetSummaryRenderer,cls:'target-field-bottom', fieldCls:'target-field-bottom-field', labelAlign:'top' },
                                            {xtype:'displayfield', itemId:'theoretical_pi', columnWidth:0.33, fieldLabel:'Theoretical Pi', renderer: provenanceTargetSummaryRenderer,cls:'target-field-bottom', fieldCls:'target-field-bottom-field', labelAlign:'top' },

                                        ]
                                    }
                                ]
                            }

                        ]
                    }
                ]
            },
            {
                xtype:'displayfield',
                border:0,
                padding:'20px',
                itemId:'msg',
//                anchor:'100% 100%',
                region:'center',
                hidden:true,
                fieldCls:'target-message',
                value:'message here'
            }
        ];

        // var store = Ext.create('LDA.store.TargetStore');
        // store.addListener('load', this.showData, this);
        this.callParent(arguments);
    },

    resetAllFields:function () {
        var displayFields = this.query('displayfield');
        Ext.each(displayFields, function (field) {
            field.hide();
        }, this);
        var img = this.down('#target_image');
        img.setSrc('./assets/target_placeholder.png');
        this.doLayout();
    },

    showMessage:function (message) {
        var dp = this.down('#dp');
        var msg = this.down('#msg');
        dp.setVisible(false);
        msg.setValue(message);
        msg.setVisible(true);
    },

    showData:function (store, records, successful) {
		console.log('LSP.view.target_by_name.TargetPanel: showData()');
        if (successful) {

            var td = store.first().data;

            if (records.length > 0 && td.hasOwnProperty('prefLabel')) { // TEMP FIX -- new coreAPI's returning an empty object

                var dp = this.down('#dp');
                var msg = this.down('#msg');
                msg.setVisible(false);
                this.setValues(store.first());
                dp.setVisible(true);

            } else {
                this.showMessage('No records found within OPS for this search');
            }
        } else {
            this.showMessage('Server did not respond');
        }
        this.up('TargetByNameForm').setLoading(false);
        var searchButton = Ext.ComponentQuery.query('#TargetByNameSubmit_id')[0].enable();
    },

    clearDomBelow:function (domElement) {
        if (domElement.hasChildNodes()) {
            while (domElement.childNodes.length > 0) {
                domElement.removeChild(domElement.firstChild);
            }
        }
    },

    // addKeywords not used, just rendered normally
    addKeywords:function (keywords) {
        var bits = keywords.split(',');
        var keywordDisplayField = this.down('#keywords');
        var bodyEl = keywordDisplayField.bodyEl;
        var domElem = bodyEl.dom;
        this.clearDomBelow(domElem);

        var output;
        if (target_name_provenance) {
            var source = recordData.data['keywords_src'];
            var sourceItem = recordData.data['keywords_item']
            var cls = LDA.helper.LDAConstants.LDA_SRC_CLS_MAPPINGS[source];
            cls += 'Icon';
            cls = '/assets/' + cls + '.png';

            output = '{kw} <a href="' + sourceItem + '">' + '<img src="' + cls + '" title=' +  source +  ' height="15" width="15"/>' + '</a>';
        } else {
            output = '{kw}'
        }

        var tpl = Ext.DomHelper.createTemplate({tag:'div', cls:'keyword', html:output});
        Ext.each(bits, function (keyword) {
            tpl.append(bodyEl, {kw:keyword.trim()});
        }, this);
        keywordDisplayField.show();
    },

    addOrganism:function (organism) {
        var organismDisplayField = this.down('#organism');
        var bodyEl = organismDisplayField.bodyEl;
        var domElem = bodyEl.dom;
        this.clearDomBelow(domElem);

        var output;
        if (target_name_provenance) {
            var sourceItem = recordData.data['organism_item'];
            var source = recordData.data['organism_src'];
            var cls = LDA.helper.LDAConstants.LDA_SRC_CLS_MAPPINGS[source];
            cls += 'Icon';
            cls = '/assets/' + cls + '.png';

            output = '{org} <a href="' + sourceItem + '" target="_blank">' + '<img src="' + cls + '" title=' +  source+  ' height="15" width="15"/>' + '</a>';
        } else {
            output = '{org}'
        }

        var tpl = Ext.DomHelper.createTemplate({tag:'div', cls:'organism', html:'output'});
        tpl.append(bodyEl, {org:organism});
        organismDisplayField.show();
    },

    addSynonyms:function (synonyms) {
        var bits = synonyms.split(' , ');
        var synonymsField = this.down('#synonyms');
        var bodyEl = synonymsField.bodyEl;
        var domElem = bodyEl.dom;
        this.clearDomBelow(domElem);

        var output;
        if (target_name_provenance) {
            var source = recordData.data['synonyms_src'];
            var sourceItem = recordData.data['synonyms_item'];
            var cls = LDA.helper.LDAConstants.LDA_SRC_CLS_MAPPINGS[source];
            cls += 'Icon';
            cls = '/assets/' + cls + '.png';

            output = '{syn} <a href="' + sourceItem + '" target="_blank">' + '<img src="' + cls + '" title=' +  source+  ' height="15" width="15"/>' + '</a>';
        } else {
            output = '{syn}'
        }

        var tpl = Ext.DomHelper.createTemplate({tag:'div', cls:'synonym', html:output});
        Ext.each(bits, function (synonym) {
            tpl.append(bodyEl, {syn:synonym});
        }, this);
        synonymsField.show();
    },

    addPDBImage:function (pdbIdPage) {
        //example http://www.pdb.org/pdb/explore/explore.do?structureId=1HOF
        //http://www.rcsb.org/pdb/images/1HOF_asr_r_250.jpg
        //console.log(" pdbIdPage " + pdbIdPage);

        var bits = new String(pdbIdPage);
        var finalPDBValue = new String();
        var pdbID, firstPDB;
        bits = bits.split(",");

        Ext.each(bits, function (item, index) {
            //console.log(" item " + item);
            pdbID = item.split('/').pop();
            if (index == 0) {
                firstPDB = pdbID;
            }
            finalPDBValue +=  '<a target=\'_blank\' href=\'' + item + '\'>' + pdbID + '</a>   '

        }, this);

        //console.log(" pdb " + finalPDBValue);
        var img = this.down('#target_image');
        var pdbField = this.down('#pdb_id_page');
        pdbField.setRawValue(finalPDBValue);
        pdbField.show();
        img.setSrc('http://www.rcsb.org/pdb/images/' + firstPDB + '_asr_r_250.jpg');
        img.show();
    },

    setFieldValue:function (fieldId, value) {
        if (fieldId == 'synonyms') {
        //console.log('synonyms');
            if (value != null) {
                var synonymsfield = this.down('#' + fieldId);
                var syn = new String(value);
                var synonymsValue = syn.replace(new RegExp(" ,", 'g'),",");
                synonymsfield.setValue(synonymsValue);
                synonymsfield.show();
            }
        }
        else if (fieldId == 'keywords') {
            if (value != null) {
                var keywordfield = this.down('#' + fieldId);
                var keywordValue = value.replace(new RegExp(" ,", 'g'),",");
                keywordfield.setValue(keywordValue);
                keywordfield.show();
            }
        }
        else if (fieldId == 'organism') {
            if (value != null) {
                this.addOrganism(value);
            }
        }
        else if (fieldId == 'pdb_id_page') {
			if (value != "" && value != null) {
				this.addPDBImage(value);
			}
        }
        else if (fieldId == 'cellular_location') {
            if (value != null) {
                var cellfield = this.down('#' + fieldId);
                var cellValue = value.replace(new RegExp(" ,", 'g'),",");
                cellfield.setValue(cellValue);
                cellfield.show();
            }
        }
        else {
//            console.log('standard field: ' + fieldId + ' : ' + value);
            var field = this.down('#' + fieldId);
			if (field != null) {
				field.setValue(value);
	            field.show();
			}
        }
    },

    setValues:function (target) {
        this.resetAllFields();
        var td = target.data;
        recordData = target;

        var pharmButton = this.down('#pharmTargetButton');
        pharmButton.hide();
        pharmButton.setHandler(function () {
                Ext.History.add('!p=PharmByTargetNameForm&u=' + target.store.proxy.extraParams.uri);
            }
        );
        pharmButton.show();

        for (var prop in td) {
            if (td.hasOwnProperty(prop)) {
               if (td[prop]){
                   //console.log(prop);
                   this.setFieldValue(prop, td[prop]);
               }

            }
        }
        this.doLayout();
    },

    toggleProv:function (val) {
        target_name_provenance = val;
        console.log(" Show provenance : " + target_name_provenance);
    }

});

var target_name_provenance = false;
var recordData;

function provenanceTargetSummaryRenderer(value, field) {
	//console.log("Target by name provenance renderer");

    var sources = new Array();
    sources['http://www.chemspider.com'] = "ChemSpider";
    sources['http://data.kasabi.com/dataset/chembl-rdf'] = "Chembl";
    sources['http://linkedlifedata.com/resource/drugbank'] = "DrugBank";
    sources['http://www.conceptwiki.org'] = "ConceptWiki";
    sources['http://purl.uniprot.org'] = "UniProt";

    if (target_name_provenance) {

        var recdata = field.itemId;
        var itemdata = recdata + '_item';
        recdata += '_src';

        var source = recordData.data[recdata];
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
        output =  '<div>' + value  + '   <a href="' + recordData.data[itemdata] + '" target="_blank">' + '<img src="' + iconCls + '" title=' + sources[source] +  ' height="15" width="15"/>' + '</a>'+ '</div>';

        return output;

    } else {

        return value;

    }

};

Ext.define('LDA.model.SimModel', {
    extend:'Ext.data.Model',
    fields:['cw_uri', 'cs_uri', 'chembl_uri', 'drugbank_uri',
        'inchi', 'inchi_src',
        'inchi_key', 'inchi_key_src',
        'smiles', 'smiles_src',
        'alogp', 'alogp_src',
        'full_mwt', 'full_mwt_src',
        'hba', 'hba_src',
        'hbd', 'hbd_src',
        'molform', 'molform_src',
        'mw_freebase', 'mw_freebase_src',
        'psa', 'psa_src',
        'rtb', 'rtb_src',
        'biotransformation', 'biotransformation_src',
        'description', 'description_src',
        'proteinBinding', 'proteinBinding_src',
        'toxicity', 'toxicity_src',
        'prefLabel', 'prefLabel_src'
//        '', '_src',
    ]
});

Ext.define('LDA.store.SimSearchLocalStore', {
   extend: 'Ext.data.Store',
   model: 'LDA.model.SimModel',
   storeId: 'simSearchLocalStore',
   proxy: {
        type: 'memory',
        reader: {
            type: 'json'
        }
   }
});

Ext.define('LSP.store.GuiComponents', {
	extend: 'Ext.data.Store',
	id: 'GuiComponents',
	model: 'LSP.model.GuiComponent',
	autoLoad: true,
	data: [{
		"url": "users.json",
		"text": "Users",
		"id": 3,
		"xtype": "dynamicgrid",
		"home": "Users grid"
	},
		{
			"url": "rdf.json",
			"text": "SPARQL",
			"id": 5,
			"xtype": "queryform",
			"home": "SPARQL form"
		}, {
			"url": "",
			"text": "Compound by name",
			"id": 18,
			"xtype": "CmpdByNameForm",
			"home": "Compound by name"
		}, {
			"url": "",
			"text": "Compound by structure",
			"id": 23,
			"xtype": "SimSearchForm",
			"home": "Compound Structure Search"
		}, {
			"url": "",
			"text": "Target by name",
			"id": 24,
			"xtype": "TargetByNameForm",
			"home": "Target by name"
		}, {
			"url": "",
			"text": "X-Target by sequence",
			"id": 25,
			"xtype": "temp",
			"home": ""
		}, {
			"url": "",
			"text": "Pharmacology by Target",
			"id": 26,
			"xtype": "PharmByTargetNameForm",
			"home": "Pharmacology by Target Name"
		}, {
			"url": "",
			"text": "Pharmacology by Compound",
			"id": 27,
			"xtype": "PharmByCmpdNameForm",
			"home": "Pharmacology by Compound name"
		}, {
			"url": "",
			"text": "Pharmacology by Enzyme family",
			"id": 28,
			"xtype": "PharmEnzymeForm",
			"home": "Compounds active against enzyme family"
		}, {
			"url": "",
			"text": "X-Polypharmacology Browser",
			"id": 34,
			"xtype": "temp",
			"home": ""
		}, {
			"url": "",
			"text": "X-Target Dossier",
			"id": 35,
			"xtype": "temp",
			"home": ""
		}, {
			"url": "",
			"text": "X-Chem-Bio Navigator",
			"id": 36,
			"xtype": "temp",
			"home": ""
		}]
});

/*########################################################################################
 #
 #  Copyright H. Lundbeck A/S
 #  This file is part of LSP4All.
 #
 #  LSP4All is free software; you can redistribute it and/or modify
 #  it under the terms of the GNU General Public License as published by
 #  the Free Software Foundation; either version 2 of the License, or (at
 #  your option) any later version.
 #
 #  LSP4All IS MADE AVAILABLE FOR DISTRIBUTION WITHOUT ANY FORM OF WARRANTY TO THE
 #  EXTENT PERMITTED BY APPLICABLE LAW.  THE COPYRIGHT HOLDER PROVIDES THE PROGRAM \"AS IS\"
 #  WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT
 #  LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 #  PURPOSE. THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM LIES
 #  WITH THE USER.  SHOULD THE PROGRAM PROVE DEFECTIVE IN ANY WAY, THE USER ASSUMES THE
 #  COST OF ALL NECESSARY SERVICING, REPAIR OR CORRECTION. THE COPYRIGHT HOLDER IS NOT
 #  RESPONSIBLE FOR ANY AMENDMENT, MODIFICATION OR OTHER ENHANCEMENT MADE TO THE PROGRAM
 #  BY ANY USER WHO REDISTRIBUTES THE PROGRAM SO AMENDED, MODIFIED OR ENHANCED.
 #
 #  IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING WILL THE
 #  COPYRIGHT HOLDER BE LIABLE TO ANY USER FOR DAMAGES, INCLUDING ANY GENERAL, SPECIAL,
 #  INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR INABILITY TO USE THE
 #  PROGRAM (INCLUDING BUT NOT LIMITED TO LOSS OF DATA OR DATA BEING RENDERED INACCURATE
 #  OR LOSSES SUSTAINED BY THE USER OR THIRD PARTIES OR A FAILURE OF THE PROGRAM TO
 #  OPERATE WITH ANY OTHER PROGRAMS), EVEN IF SUCH HOLDER HAS BEEN ADVISED OF THE
 #  POSSIBILITY OF SUCH DAMAGES.
 #
 #  You should have received a copy of the GNU General Public License
 #  along with this program; if not, write to the Free Software
 #  Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.
 #
 ########################################################################################*/

Ext.define('LSP.controller.NavigationTree', {
    extend:'Ext.app.Controller',

    stores:['NavigationTree', 'GuiComponents'],

    views:[
        'Appmoduletree'
    ],

    init:function () {

    }

});
Ext.define('LSP.view.target_by_name.TargetByNameForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.TargetByNameForm',
    closable: true,
    header: false,
    requires: ['LSP.view.dropdowns.conceptWikiProteinLookup',
    // 'LSP.view.dynamicgrid.DynamicGrid',
    'LSP.view.target_by_name.TargetPanel'],
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    initComponent: function() {

        this.items = [{
            xtype: 'label',
            html: '<span style="font-family: verdana; color: grey; ">Hint: Start typing in protein name and species. E.g. \"Adenosine receptor A2a (Homo sapiens)\"</span>',
            labelWidth: 400,
            padding: '5 0 0 140'
        }, {
            xtype: 'container',
            margin: '0 5 5 5',
            name: 'form_fields',
            layout: {
                type: 'column'
            },
            style: 'background-color: #fff;',
            items: [
            Ext.create('CW.view.ConceptWikiLookup', {
                //xtype: 'conceptWikiLookup',
                fieldLabel: 'Target name',
                itemId: 'targetByNameLookup',
                store: Ext.create('CW.store.ConceptWikiLookup', {
                    proxy: {
                        type: 'jsonp',
                        timeout: 5000,
                        url: CW.config.Settings.searchByTagUrl,
                        reader: Ext.create('CW.helper.ConceptWikiJSONReader'),
                        extraParams: {
                            'branch': 3 // Only show species results from swissprot
                        }
                    }
                }),
                name: 'protein_uri',
                cwTagUuid: 'eeaec894-d856-4106-9fa1-662b1dc6c6f1' // This is the ConceptWiki tag uuid for proteins. Must be set to use method!
            }), {
                xtype: 'button',
                padding: '5 5 5 5',
                text: 'Search',
                itemId: 'TargetByNameSubmit_id',
                disabled: true,
                action: 'query_target_by_name'
            },{
                    xtype: 'radiogroup',
                    width: 160,
                    labelWidth: 65,
                    fieldLabel: 'Provenance',
                    itemId: 'provId',
                    margin: '5 0 0 90',

                    items: [{
                        boxLabel: 'On',
                        name: 'prov',
                        inputValue: true
                    }, {
                        boxLabel: 'Off',
                        name: 'prov',
                        inputValue: false,
                        checked: true
                    }]
                }]
        }, {
            xtype: 'TargetPanel',
            flex: 1
        }];
        this.callParent(arguments);
    }
});

Ext.define('LSP.controller.TargetByNameForm', {
    extend: 'Ext.app.Controller',
    // models: ['LDA.model.TargetModel'],
    // stores: ['LDA.store.TargetStore'],
    views: ['target_by_name.TargetByNameForm'],
    current_uri: null,

    refs: [{
        ref: 'targetPanel',
        selector: 'TargetPanel'
    }, {
        ref: 'formView',
        selector: 'TargetByNameForm'
    }, {
        ref: 'submitButton',
        selector: '#TargetByNameSubmit_id'

    }, {
        ref: 'lookup',
        selector: '#targetByNameLookup'
    }],

    init: function() {
        this.control({
            'TargetByNameForm button[action=query_target_by_name]': {
                click: this.submitQuery
            },
            'TargetByNameForm conceptWikiLookup': {
                select: this.enableSubmit
            },
            'TargetByNameForm': {
                historyToken: this.handleHistoryToken
            },
            'TargetByNameForm #provId': {
                change: this.onProvChange
            }
        });
    },

    handleHistoryToken: function(historyTokenObject) {
        console.log('LSP.controller.TargetByNameForm: handleHistoryToken()');
        var me = this;
        var target_panel = me.getFormView().down("TargetPanel");
        if (historyTokenObject.u) {
            this.current_uri = historyTokenObject.u;
            var store = this.getStore("LDA.store.TargetStore");
            if (historyTokenObject.u != store.proxy.extraParams.uri) {
                // Setting the value in the Concept Wiki dropdown to the one defined by the uuid
                var cw_controller = this.getController("CW.controller.ConceptWikiLookup"); 
                var cw_dropdown = this.getFormView().down('conceptWikiLookup');
                cw_controller.setConcept(historyTokenObject.u,cw_dropdown);
                // Setting the uri for the LDA search
                store.proxy.extraParams.uri = historyTokenObject.u;
                me.getFormView().setLoading(true);
                store.load(function(records, operation, success) {
                    if (success) {
                        console.log('LSP.controller.TargetByNameForm: store is loaded ' + success);
                        me.getSubmitButton().enable();
                        target_panel.setValues(records[0]);
                        target_panel.recordData = records[0];
                        target_panel.down("#dp").setVisible(true);
                        target_panel.down('#msg').setVisible(false);
                        me.getFormView().setLoading(false);
                    } else {
                        Ext.MessageBox.show({
                            title: 'Info',
                            msg: 'We are sorry but the OPS system returned an error.',
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.INFO
                        });
                        me.getSubmitButton().enable();
                        target_panel.down("#dp").setVisible(false);
                        me.getFormView().setLoading(false);
                    }
                });
            }
        } else if (historyTokenObject.s) {
            var lookup = this.getLookup();
            lookup.setRawValue(historyTokenObject.s);
            lookup.doQuery(historyTokenObject.s);
        }
    },

    enableSubmit: function() {
        var form = this.getFormView();
        var button = this.getSubmitButton();
        button.enable();
    },

    submitQuery: function(button) {
        button.disable();
        var me = this;
        var form = this.getFormView();
        var target_panel = me.getFormView().down("TargetPanel");
        var target_uri = form.getValues().protein_uri;
        if (this.current_uri == target_uri) {
            var store = this.getStore("LDA.store.TargetStore");
            store.proxy.extraParams.uri = this.current_uri;
            me.getFormView().setLoading(true);
            store.load(function(records, operation, success) {
                if (success) {
                    console.log('LSP.controller.TargetByNameForm: store is loaded ' + success);
                    me.getSubmitButton().enable();
                    target_panel.setValues(records[0]);
                    target_panel.recordData = records[0];
                    target_panel.down("#dp").setVisible(true);
                    target_panel.down('#msg').setVisible(false);
                    me.getFormView().setLoading(false);
                } else {
                    Ext.MessageBox.show({
                        title: 'Info',
                        msg: 'We are sorry but the OPS system returned an error.',
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.INFO
                    });
                    me.getSubmitButton().enable();
                    target_panel.down("#dp").setVisible(false);
                    me.getFormView().setLoading(false);
                }
            });
        } else {
            Ext.History.add('!p=TargetByNameForm&u=' + target_uri);
        }
    },

    onProvChange: function(field, newVal, oldVal) {
        var dg = this.getTargetPanel();
        dg.toggleProv(newVal['prov']);
        dg.setValues(dg.recordData);

    }
});

Ext.define('CW.view.ConceptWikiLookup', {
    extend:'Ext.form.ComboBox',
    alias:'widget.conceptWikiLookup',
    requires:[
        'CW.model.ConceptWikiLookup',
        'CW.helper.ConceptWikiJSONReader',
        'CW.store.ConceptWikiLookup'
    ],
    cwTagUuid: 'pleaseConfigure[cwConceptTagUuid:]',
    store: undefined,
    // search boks configs
    forceSelection:true,
    allowBlank:false,
    typeAhead:true,
    typeAheadDelay: 250,
    queryDelay: 250,
    queryCaching: false,
    queryParam: 'q',
    queryMode:'remote',
    valueField:'ops_uri',
    displayField:'pref_label',
    name: 'ops_uri',  // can be overwritten in view config
    minChars:4,
    hideTrigger:true,
    forceSelection:true,
    allowBlank:false,
    typeAhead:true,
    emptyText:'Start typing...',
    margin:'5 5 5 5',
    width:700,
    fieldLabel: 'Overwrite this in config',
    labelWidth:120,
    listConfig:{
        loadingText:'Searching...',
        emptyText:'Nothing found which matches your text, you may need to enter more text or try something different.',
        getInnerTpl:function () {
            return '<p><span style="font-family: verdana; color: grey; "><small>Match: {match}</small></span><br/><b>{pref_label}</b> <a href="http://ops.conceptwiki.org/wiki/#/concept/{uuid}/view" target="_blank">(definition)</a></p>';
        }                                                                                                                                                                                        
    }
});
         

Ext.define('CW.controller.ConceptWikiLookup', {
    extend:'Ext.app.Controller',
    models: ['CW.model.ConceptWikiLookup'],
    views:['CW.view.ConceptWikiLookup'],
    stores:['CW.store.ConceptWikiLookup'],
    
    init:function () {
        this.control({
            'conceptWikiLookup':{
                afterrender:this.prepProxy
            }
        });
    },

     // Fires when the box is rendered the first time
     prepProxy:function (cw_dropdown_view) {
        // cw_dropdown_view.store.proxy.extraParams = cw_dropdown_view.store.proxy.extraParams + {uuid: cw_dropdown_view.cwTagUuid, limit: 10};
		cw_dropdown_view.store.proxy.setExtraParam('uuid', cw_dropdown_view.cwTagUuid);
		cw_dropdown_view.store.proxy.setExtraParam('limit', 10);
    },
    
   
    setConcept:function (concept_url, cw_lookup) {
	  console.log('CW.controller.ConceptWikiLookup: setConcept()');
      var concept_uuid = concept_url.match(/http:\/\/www.conceptwiki.org\/concept\/([a-f0-9\-]+)/)[1];
      var store = Ext.create('Ext.data.Store', {
        model: 'CW.model.ConceptWikiLookup',
        proxy: {
          type: 'jsonp',
          url: CW.config.Settings.getConceptUrl,
          reader: Ext.create('CW.helper.ConceptWikiJSONGetReader')
      }
      });
      store.load({
          params: {'uuid': concept_uuid },
          callback:function (records, operation, success) {
              if (success) {
                console.log("Success",records[0]);
                cw_lookup.setValue(records[0]);
              }
              else {
              
              }
          }
      },this );
    }
})
;


                

/**
 * @author Ed Spencer (http://sencha.com)
 * Transition plugin for DataViews
 */
Ext.define('Ext.ux.DataView.Animated', {

    /**
     * @property defaults
     * @type Object
     * Default configuration options for all DataViewTransition instances
     */
    defaults: {
        duration  : 750,
        idProperty: 'id'
    },
    
    /**
     * Creates the plugin instance, applies defaults
     * @constructor
     * @param {Object} config Optional config object
     */
    constructor: function(config) {
        Ext.apply(this, config || {}, this.defaults);
    },

    /**
     * Initializes the transition plugin. Overrides the dataview's default refresh function
     * @param {Ext.view.View} dataview The dataview
     */
    init: function(dataview) {
        /**
         * @property dataview
         * @type Ext.view.View
         * Reference to the DataView this instance is bound to
         */
        this.dataview = dataview;
        
        var idProperty = this.idProperty,
            store = dataview.store;
        
        dataview.blockRefresh = true;
        dataview.updateIndexes = Ext.Function.createSequence(dataview.updateIndexes, function() {
            this.getTargetEl().select(this.itemSelector).each(function(element, composite, index) {
                element.id = element.dom.id = Ext.util.Format.format("{0}-{1}", dataview.id, store.getAt(index).internalId);
            }, this);
        }, dataview);
        
        /**
         * @property dataviewID
         * @type String
         * The string ID of the DataView component. This is used internally when animating child objects
         */
        this.dataviewID = dataview.id;
        
        /**
         * @property cachedStoreData
         * @type Object
         * A cache of existing store data, keyed by id. This is used to determine
         * whether any items were added or removed from the store on data change
         */
        this.cachedStoreData = {};
        
        //catch the store data with the snapshot immediately
        this.cacheStoreData(store.data || store.snapshot);

        dataview.on('resize', function() {
            var store = dataview.store;
            if (store.getCount() > 0) {
                // reDraw.call(this, store);
            }
        }, this);
        
        dataview.store.on('datachanged', reDraw, this);
        
        function reDraw(store) {
            var parentEl = dataview.getTargetEl(),
                calcItem = store.getAt(0),
                added    = this.getAdded(store),
                removed  = this.getRemoved(store),
                previous = this.getRemaining(store),
                existing = Ext.apply({}, previous, added);
            
            //hide old items
            Ext.each(removed, function(item) {
                var id = this.dataviewID + '-' + item.internalId;
                Ext.fly(id).animate({
                    remove  : false,
                    duration: duration,
                    opacity : 0,
                    useDisplay: true,
                    callback: function() {
                        Ext.fly(id).setDisplayed(false);
                    }
                });
            }, this);
            
            //store is empty
            if (calcItem == undefined) {
                this.cacheStoreData(store);
                return;
            }
            
            this.cacheStoreData(store);
            
            var el = Ext.get(this.dataviewID + "-" + calcItem.internalId);
            
            //if there is nothing rendered, force a refresh and return. This happens when loading asynchronously (was not
            //covered correctly in previous versions, which only accepted local data)
            if (!el) {
                dataview.refresh();
                return true;
            }
            
            //calculate the number of rows and columns we have
            var itemCount   = store.getCount(),
                itemWidth   = el.getMargin('lr') + el.getWidth(),
                itemHeight  = el.getMargin('bt') + el.getHeight(),
                dvWidth     = parentEl.getWidth(),
                columns     = Math.floor(dvWidth / itemWidth),
                rows        = Math.ceil(itemCount / columns),
                currentRows = Math.ceil(this.getExistingCount() / columns);
            
            //stores the current top and left values for each element (discovered below)
            var oldPositions = {},
                newPositions = {},
                elCache      = {};
            
            //find current positions of each element and save a reference in the elCache
            Ext.iterate(previous, function(id, item) {
                var id = item.internalId,
                    el = elCache[id] = Ext.get(this.dataviewID + '-' + id);
                
                oldPositions[id] = {
                    top : el.getTop()  - parentEl.getTop()  - el.getMargin('t') - parentEl.getPadding('t'),
                    left: el.getLeft() - parentEl.getLeft() - el.getMargin('l') - parentEl.getPadding('l')
                };
            }, this);
            
            //make sure the correct styles are applied to the parent element
            parentEl.applyStyles({
                display : 'block',
                position: 'relative'
            });
            
            //set absolute positioning on all DataView items. We need to set position, left and 
            //top at the same time to avoid any flickering
            Ext.iterate(previous, function(id, item) {
                var oldPos = oldPositions[id],
                    el     = elCache[id];

                if (el.getStyle('position') != 'absolute') {
                    elCache[id].applyStyles({
                        position: 'absolute',
                        left    : oldPos.left + "px",
                        top     : oldPos.top + "px"
                    });
                }
            });
            
            //get new positions
            var index = 0;
            Ext.iterate(store.data.items, function(item) {
                var id = item.internalId,
                    el = elCache[id];
                
                var column = index % columns,
                    row    = Math.floor(index / columns),
                    top    = row    * itemHeight,
                    left   = column * itemWidth;
                
                newPositions[id] = {
                    top : top,
                    left: left
                };
                
                index ++;
            }, this);
            
            //do the movements
            var startTime  = new Date(),
                duration   = this.duration,
                dataviewID = this.dataviewID;
            
            var doAnimate = function() {
                var elapsed  = new Date() - startTime,
                    fraction = elapsed / duration,
                    id;

                if (fraction >= 1) {
                    for (id in newPositions) {
                        Ext.fly(dataviewID + '-' + id).applyStyles({
                            top : newPositions[id].top + "px",
                            left: newPositions[id].left + "px"
                        });
                    }

                    Ext.TaskManager.stop(task);
                } else {
                    //move each item
                    for (id in newPositions) {
                        if (!previous[id]) {
                            continue;
                        }
                        
                        var oldPos  = oldPositions[id],
                            newPos  = newPositions[id],
                            oldTop  = oldPos.top,
                            newTop  = newPos.top,
                            oldLeft = oldPos.left,
                            newLeft = newPos.left,
                            diffTop = fraction * Math.abs(oldTop  - newTop),
                            diffLeft= fraction * Math.abs(oldLeft - newLeft),
                            midTop  = oldTop  > newTop  ? oldTop  - diffTop  : oldTop  + diffTop,
                            midLeft = oldLeft > newLeft ? oldLeft - diffLeft : oldLeft + diffLeft;

                        Ext.fly(dataviewID + '-' + id).applyStyles({
                            top : midTop + "px",
                            left: midLeft + "px"
                        }).setDisplayed(true);
                    }
                }
            };
            
            var task = {
                run     : doAnimate,
                interval: 20,
                scope   : this
            };
            
            Ext.TaskManager.start(task);
            
            //show new items
            Ext.iterate(added, function(id, item) {
                Ext.fly(this.dataviewID + '-' + item.internalId).applyStyles({
                    top    : newPositions[item.internalId].top + "px",
                    left   : newPositions[item.internalId].left + "px"
                }).setDisplayed(true);
                
                Ext.fly(this.dataviewID + '-' + item.internalId).animate({
                    remove  : false,
                    duration: duration,
                    opacity : 1
                });
            }, this);
            
            this.cacheStoreData(store);
        }
    },
    
    /**
     * Caches the records from a store locally for comparison later
     * @param {Ext.data.Store} store The store to cache data from
     */
    cacheStoreData: function(store) {
        this.cachedStoreData = {};
        
        store.each(function(record) {
             this.cachedStoreData[record.internalId] = record;
        }, this);
    },
    
    /**
     * Returns all records that were already in the DataView
     * @return {Object} All existing records
     */
    getExisting: function() {
        return this.cachedStoreData;
    },
    
    /**
     * Returns the total number of items that are currently visible in the DataView
     * @return {Number} The number of existing items
     */
    getExistingCount: function() {
        var count = 0,
            items = this.getExisting();
        
        for (var k in items) {
            count++;
        }
        
        return count;
    },
    
    /**
     * Returns all records in the given store that were not already present
     * @param {Ext.data.Store} store The updated store instance
     * @return {Object} Object of records not already present in the dataview in format {id: record}
     */
    getAdded: function(store) {
        var added = {};
        
        store.each(function(record) {
            if (this.cachedStoreData[record.internalId] == undefined) {
                added[record.internalId] = record;
            }
        }, this);
        
        return added;
    },
    
    /**
     * Returns all records that are present in the DataView but not the new store
     * @param {Ext.data.Store} store The updated store instance
     * @return {Array} Array of records that used to be present
     */
    getRemoved: function(store) {
        var removed = [],
            id;
        
        for (id in this.cachedStoreData) {
            if (store.findBy(function(record) {return record.internalId == id;}) == -1) {
                removed.push(this.cachedStoreData[id]);
            }
        }
        
        return removed;
    },
    
    /**
     * Returns all records that are already present and are still present in the new store
     * @param {Ext.data.Store} store The updated store instance
     * @return {Object} Object of records that are still present from last time in format {id: record}
     */
    getRemaining: function(store) {
        var remaining = {};

        store.each(function(record) {
            if (this.cachedStoreData[record.internalId] != undefined) {
                remaining[record.internalId] = record;
            }
        }, this);
        
        return remaining;
    }
});

Ext.define('LDA.helper.FilterUnitsReader', {
    extend: 'Ext.data.reader.Json',
    requires: ['LDA.helper.LDAConstants'],

    readRecords: function(data) {
        var pt = data['result']['primaryTopic'];
        var activity_type = pt[LDA.helper.LDAConstants.LDA_LABEL]
        var units = pt.unit;
        var records = new Array();

        Ext.each(units, function(unit, index) {
            var about = unit[LDA.helper.LDAConstants.LDA_ABOUT];
            var label = unit[LDA.helper.LDAConstants.LDA_LABEL];
            var record = Ext.create('LDA.model.FilterUnitsModel', {
                activity_type: activity_type,
                unit: label,
                about: about
            });
            records.push(record);
        });

        return new Ext.data.ResultSet({
            total: records.length,
            count: records.length,
            records: records,
            success: true,
            message: 'loaded'
        });
    }
});

/**
 * FiltersFeature is a grid {@link Ext.grid.feature.Feature feature} that allows for a slightly more
 * robust representation of filtering than what is provided by the default store.
 *
 * Filtering is adjusted by the user using the grid's column header menu (this menu can be
 * disabled through configuration). Through this menu users can configure, enable, and
 * disable filters for each column.
 *
 * #Features#
 *
 * ##Filtering implementations:##
 *
 * Default filtering for Strings, Numeric Ranges, Date Ranges, Lists (which can be backed by a
 * {@link Ext.data.Store}), and Boolean. Additional custom filter types and menus are easily
 * created by extending {@link Ext.ux.grid.filter.Filter}.
 *
 * ##Graphical Indicators:##
 *
 * Columns that are filtered have {@link #filterCls a configurable css class} applied to the column headers.
 *
 * ##Automatic Reconfiguration:##
 *
 * Filters automatically reconfigure when the grid 'reconfigure' event fires.
 *
 * ##Stateful:##
 *
 * Filter information will be persisted across page loads by specifying a `stateId`
 * in the Grid configuration.
 *
 * The filter collection binds to the {@link Ext.grid.Panel#beforestaterestore beforestaterestore}
 * and {@link Ext.grid.Panel#beforestatesave beforestatesave} events in order to be stateful.
 *
 * ##GridPanel Changes:##
 *
 * - A `filters` property is added to the GridPanel using this feature.
 * - A `filterupdate` event is added to the GridPanel and is fired upon onStateChange completion.
 *
 * ##Server side code examples:##
 *
 * - [PHP](http://www.vinylfox.com/extjs/grid-filter-php-backend-code.php) - (Thanks VinylFox)
 * - [Ruby on Rails](http://extjs.com/forum/showthread.php?p=77326#post77326) - (Thanks Zyclops)
 * - [Ruby on Rails](http://extjs.com/forum/showthread.php?p=176596#post176596) - (Thanks Rotomaul)
 *
 * #Example usage:#
 *
 *     var store = Ext.create('Ext.data.Store', {
 *         pageSize: 15
 *         ...
 *     });
 *
 *     var filtersCfg = {
 *         ftype: 'filters',
 *         autoReload: false, //don't reload automatically
 *         local: true, //only filter locally
 *         // filters may be configured through the plugin,
 *         // or in the column definition within the headers configuration
 *         filters: [{
 *             type: 'numeric',
 *             dataIndex: 'id'
 *         }, {
 *             type: 'string',
 *             dataIndex: 'name'
 *         }, {
 *             type: 'numeric',
 *             dataIndex: 'price'
 *         }, {
 *             type: 'date',
 *             dataIndex: 'dateAdded'
 *         }, {
 *             type: 'list',
 *             dataIndex: 'size',
 *             options: ['extra small', 'small', 'medium', 'large', 'extra large'],
 *             phpMode: true
 *         }, {
 *             type: 'boolean',
 *             dataIndex: 'visible'
 *         }]
 *     };
 *
 *     var grid = Ext.create('Ext.grid.Panel', {
 *          store: store,
 *          columns: ...,
 *          features: [filtersCfg],
 *          height: 400,
 *          width: 700,
 *          bbar: Ext.create('Ext.PagingToolbar', {
 *              store: store
 *          })
 *     });
 *
 *     // a filters property is added to the GridPanel
 *     grid.filters
 */
Ext.define('Ext.ux.grid.FiltersFeature', {
    extend: 'Ext.grid.feature.Feature',
    alias: 'feature.filters',
    uses: [
        'Ext.ux.grid.menu.ListMenu',
        'Ext.ux.grid.menu.RangeMenu',
        'Ext.ux.grid.filter.BooleanFilter',
        'Ext.ux.grid.filter.DateFilter',
        'Ext.ux.grid.filter.ListFilter',
        'Ext.ux.grid.filter.NumericFilter',
        'Ext.ux.grid.filter.StringFilter'
    ],

    /**
     * @cfg {Boolean} autoReload
     * Defaults to true, reloading the datasource when a filter change happens.
     * Set this to false to prevent the datastore from being reloaded if there
     * are changes to the filters.  See <code>{@link #updateBuffer}</code>.
     */
    autoReload : true,
    /**
     * @cfg {Boolean} encode
     * Specify true for {@link #buildQuery} to use Ext.util.JSON.encode to
     * encode the filter query parameter sent with a remote request.
     * Defaults to false.
     */
    /**
     * @cfg {Array} filters
     * An Array of filters config objects. Refer to each filter type class for
     * configuration details specific to each filter type. Filters for Strings,
     * Numeric Ranges, Date Ranges, Lists, and Boolean are the standard filters
     * available.
     */
    /**
     * @cfg {String} filterCls
     * The css class to be applied to column headers with active filters.
     * Defaults to <tt>'ux-filterd-column'</tt>.
     */
    filterCls : 'ux-filtered-column',
    /**
     * @cfg {Boolean} local
     * <tt>true</tt> to use Ext.data.Store filter functions (local filtering)
     * instead of the default (<tt>false</tt>) server side filtering.
     */
    local : false,
    /**
     * @cfg {String} menuFilterText
     * defaults to <tt>'Filters'</tt>.
     */
    menuFilterText : 'Filters',
    /**
     * @cfg {String} paramPrefix
     * The url parameter prefix for the filters.
     * Defaults to <tt>'filter'</tt>.
     */
    paramPrefix : 'filter',
    /**
     * @cfg {Boolean} showMenu
     * Defaults to true, including a filter submenu in the default header menu.
     */
    showMenu : true,
    /**
     * @cfg {String} stateId
     * Name of the value to be used to store state information.
     */
    stateId : undefined,
    /**
     * @cfg {Number} updateBuffer
     * Number of milliseconds to defer store updates since the last filter change.
     */
    updateBuffer : 500,

    // doesn't handle grid body events
    hasFeatureEvent: false,


    /** @private */
    constructor : function (config) {
        var me = this;

        config = config || {};
        Ext.apply(me, config);

        me.deferredUpdate = Ext.create('Ext.util.DelayedTask', me.reload, me);

        // Init filters
        me.filters = me.createFiltersCollection();
        me.filterConfigs = config.filters;
    },

    attachEvents: function() {
        var me = this,
            view = me.view,
            headerCt = view.headerCt,
            grid = me.getGridPanel();

        me.bindStore(view.getStore(), true);

        // Listen for header menu being created
        headerCt.on('menucreate', me.onMenuCreate, me);

        view.on('refresh', me.onRefresh, me);
        grid.on({
            scope: me,
            beforestaterestore: me.applyState,
            beforestatesave: me.saveState,
            beforedestroy: me.destroy
        });

        // Add event and filters shortcut on grid panel
        grid.filters = me;
        grid.addEvents('filterupdate');
    },

    createFiltersCollection: function () {
        return Ext.create('Ext.util.MixedCollection', false, function (o) {
            return o ? o.dataIndex : null;
        });
    },

    /**
     * @private Create the Filter objects for the current configuration, destroying any existing ones first.
     */
    createFilters: function() {
        var me = this,
            hadFilters = me.filters.getCount(),
            grid = me.getGridPanel(),
            filters = me.createFiltersCollection(),
            model = grid.store.model,
            fields = model.prototype.fields,
            field,
            filter,
            state;

        if (hadFilters) {
            state = {};
            me.saveState(null, state);
        }

        function add (dataIndex, config, filterable) {
            if (dataIndex && (filterable || config)) {
                field = fields.get(dataIndex);
                filter = {
                    dataIndex: dataIndex,
                    type: (field && field.type && field.type.type) || 'auto'
                };

                if (Ext.isObject(config)) {
                    Ext.apply(filter, config);
                }

                filters.replace(filter);
            }
        }

        // We start with filters from our config
        Ext.Array.each(me.filterConfigs, function (filterConfig) {
            add(filterConfig.dataIndex, filterConfig);
        });

        // Then we merge on filters from the columns in the grid. The columns' filters take precedence.
        Ext.Array.each(grid.columns, function (column) {
            if (column.filterable === false) {
                filters.removeAtKey(column.dataIndex);
            } else {
                add(column.dataIndex, column.filter, column.filterable);
            }
        });
        

        me.removeAll();
        if (filters.items) {
            me.initializeFilters(filters.items);
        }

        if (hadFilters) {
            me.applyState(null, state);
        }
    },

    /**
     * @private
     */
    initializeFilters: function(filters) {
        var me = this,
            filtersLength = filters.length,
            i, filter, FilterClass;

        for (i = 0; i < filtersLength; i++) {
            filter = filters[i];
            if (filter) {
                FilterClass = me.getFilterClass(filter.type);
                filter = filter.menu ? filter : new FilterClass(filter);
                me.filters.add(filter);
                Ext.util.Observable.capture(filter, this.onStateChange, this);
            }
        }
    },

    /**
     * @private Handle creation of the grid's header menu. Initializes the filters and listens
     * for the menu being shown.
     */
    onMenuCreate: function(headerCt, menu) {
        var me = this;
        me.createFilters();
        menu.on('beforeshow', me.onMenuBeforeShow, me);
    },

    /**
     * @private Handle showing of the grid's header menu. Sets up the filter item and menu
     * appropriate for the target column.
     */
    onMenuBeforeShow: function(menu) {
        var me = this,
            menuItem, filter;

        if (me.showMenu) {
            menuItem = me.menuItem;
            if (!menuItem || menuItem.isDestroyed) {
                me.createMenuItem(menu);
                menuItem = me.menuItem;
            }

            filter = me.getMenuFilter();

            if (filter) {
                menuItem.setMenu(filter.menu, false);
                menuItem.setChecked(filter.active);
                // disable the menu if filter.disabled explicitly set to true
                menuItem.setDisabled(filter.disabled === true);
            }
            menuItem.setVisible(!!filter);
            this.sep.setVisible(!!filter);
        }
    },


    createMenuItem: function(menu) {
        var me = this;
        me.sep  = menu.add('-');
        me.menuItem = menu.add({
            checked: false,
            itemId: 'filters',
            text: me.menuFilterText,
            listeners: {
                scope: me,
                checkchange: me.onCheckChange,
                beforecheckchange: me.onBeforeCheck
            }
        });
    },

    getGridPanel: function() {
        return this.view.up('gridpanel');
    },

    /**
     * @private
     * Handler for the grid's beforestaterestore event (fires before the state of the
     * grid is restored).
     * @param {Object} grid The grid object
     * @param {Object} state The hash of state values returned from the StateProvider.
     */
    applyState : function (grid, state) {
        var me = this,
            key, filter;
        me.applyingState = true;
        me.clearFilters();
        if (state.filters) {
            for (key in state.filters) {
                if (state.filters.hasOwnProperty(key)) {
                    filter = me.filters.get(key);
                    if (filter) {
                        filter.setValue(state.filters[key]);
                        filter.setActive(true);
                    }
                }
            }
        }
        me.deferredUpdate.cancel();
        if (me.local) {
            me.reload();
        }
        delete me.applyingState;
        delete state.filters;
    },

    /**
     * Saves the state of all active filters
     * @param {Object} grid
     * @param {Object} state
     * @return {Boolean}
     */
    saveState : function (grid, state) {
        var filters = {};
        this.filters.each(function (filter) {
            if (filter.active) {
                filters[filter.dataIndex] = filter.getValue();
            }
        });
        return (state.filters = filters);
    },

    /**
     * @private
     * Handler called by the grid 'beforedestroy' event
     */
    destroy : function () {
        var me = this;
        Ext.destroyMembers(me, 'menuItem', 'sep');
        me.removeAll();
        me.clearListeners();
    },

    /**
     * Remove all filters, permanently destroying them.
     */
    removeAll : function () {
        if(this.filters){
            Ext.destroy.apply(Ext, this.filters.items);
            // remove all items from the collection
            this.filters.clear();
        }
    },


    /**
     * Changes the data store bound to this view and refreshes it.
     * @param {Ext.data.Store} store The store to bind to this view
     */
    bindStore : function(store) {
        var me = this;

        // Unbind from the old Store
        if (me.store && me.storeListeners) {
            me.store.un(me.storeListeners);
        }

        // Set up correct listeners
        if (store) {
            me.storeListeners = {
                scope: me
            };
            if (me.local) {
                me.storeListeners.load = me.onLoad;
            } else {
                me.storeListeners['before' + (store.buffered ? 'prefetch' : 'load')] = me.onBeforeLoad;
            }
            store.on(me.storeListeners);
        } else {
            delete me.storeListeners;
        }
        me.store = store;
    },

    /**
     * @private
     * Get the filter menu from the filters MixedCollection based on the clicked header
     */
    getMenuFilter : function () {
        var header = this.view.headerCt.getMenu().activeHeader;
        return header ? this.filters.get(header.dataIndex) : null;
    },

    /** @private */
    onCheckChange : function (item, value) {
        this.getMenuFilter().setActive(value);
    },

    /** @private */
    onBeforeCheck : function (check, value) {
        return !value || this.getMenuFilter().isActivatable();
    },

    /**
     * @private
     * Handler for all events on filters.
     * @param {String} event Event name
     * @param {Object} filter Standard signature of the event before the event is fired
     */
    onStateChange : function (event, filter) {
        if (event !== 'serialize') {
            var me = this,
                grid = me.getGridPanel();

            if (filter == me.getMenuFilter()) {
                me.menuItem.setChecked(filter.active, false);
            }

            if ((me.autoReload || me.local) && !me.applyingState) {
                me.deferredUpdate.delay(me.updateBuffer);
            }
            me.updateColumnHeadings();

            if (!me.applyingState) {
                grid.saveState();
            }
            grid.fireEvent('filterupdate', me, filter);
        }
    },

    /**
     * @private
     * Handler for store's beforeload event when configured for remote filtering
     * @param {Object} store
     * @param {Object} options
     */
    onBeforeLoad : function (store, options) {
        options.params = options.params || {};
        this.cleanParams(options.params);
        var params = this.buildQuery(this.getFilterData());
        Ext.apply(options.params, params);
    },

    /**
     * @private
     * Handler for store's load event when configured for local filtering
     * @param {Object} store
     */
    onLoad : function (store) {
        store.filterBy(this.getRecordFilter());
    },

    /**
     * @private
     * Handler called when the grid's view is refreshed
     */
    onRefresh : function () {
        this.updateColumnHeadings();
    },

    /**
     * Update the styles for the header row based on the active filters
     */
    updateColumnHeadings : function () {
        var me = this,
            headerCt = me.view.headerCt;
        if (headerCt) {
            headerCt.items.each(function(header) {
                var filter = me.getFilter(header.dataIndex);
                header[filter && filter.active ? 'addCls' : 'removeCls'](me.filterCls);
            });
        }
    },

    /** @private */
    reload : function () {
        var me = this,
            store = me.view.getStore();

        if (me.local) {
            store.clearFilter(true);
            store.filterBy(me.getRecordFilter());
            store.sort();
        } else {
            me.deferredUpdate.cancel();
            if (store.buffered) {
                store.pageMap.clear();
            }
            store.loadPage(1);
        }
    },

    /**
     * Method factory that generates a record validator for the filters active at the time
     * of invokation.
     * @private
     */
    getRecordFilter : function () {
        var f = [], len, i;
        this.filters.each(function (filter) {
            if (filter.active) {
                f.push(filter);
            }
        });

        len = f.length;
        return function (record) {
            for (i = 0; i < len; i++) {
                if (!f[i].validateRecord(record)) {
                    return false;
                }
            }
            return true;
        };
    },

    /**
     * Adds a filter to the collection and observes it for state change.
     * @param {Object/Ext.ux.grid.filter.Filter} config A filter configuration or a filter object.
     * @return {Ext.ux.grid.filter.Filter} The existing or newly created filter object.
     */
    addFilter : function (config) {
        var me = this,
            columns = me.getGridPanel().columns,
            i, columnsLength, column, filtersLength, filter;

        
        for (i = 0, columnsLength = columns.length; i < columnsLength; i++) {
            column = columns[i];
            if (column.dataIndex === config.dataIndex) {
                column.filter = config;
            }
        }
        
        if (me.view.headerCt.menu) {
            me.createFilters();
        } else {
            // Call getMenu() to ensure the menu is created, and so, also are the filters. We cannot call
            // createFilters() withouth having a menu because it will cause in a recursion to applyState()
            // that ends up to clear all the filter values. This is likely to happen when we reorder a column
            // and then add a new filter before the menu is recreated.
            me.view.headerCt.getMenu();
        }
        
        for (i = 0, filtersLength = me.filters.items.length; i < filtersLength; i++) {
            filter = me.filters.items[i];
            if (filter.dataIndex === config.dataIndex) {
                return filter;
            }
        }
    },

    /**
     * Adds filters to the collection.
     * @param {Array} filters An Array of filter configuration objects.
     */
    addFilters : function (filters) {
        if (filters) {
            var me = this,
                i, filtersLength;
            for (i = 0, filtersLength = filters.length; i < filtersLength; i++) {
                me.addFilter(filters[i]);
            }
        }
    },

    /**
     * Returns a filter for the given dataIndex, if one exists.
     * @param {String} dataIndex The dataIndex of the desired filter object.
     * @return {Ext.ux.grid.filter.Filter}
     */
    getFilter : function (dataIndex) {
        return this.filters.get(dataIndex);
    },

    /**
     * Turns all filters off. This does not clear the configuration information
     * (see {@link #removeAll}).
     */
    clearFilters : function () {
        this.filters.each(function (filter) {
            filter.setActive(false);
        });
    },

    /**
     * Returns an Array of the currently active filters.
     * @return {Array} filters Array of the currently active filters.
     */
    getFilterData : function () {
        var filters = [], i, len;

        this.filters.each(function (f) {
            if (f.active) {
                var d = [].concat(f.serialize());
                for (i = 0, len = d.length; i < len; i++) {
                    filters.push({
                        field: f.dataIndex,
                        data: d[i]
                    });
                }
            }
        });
        return filters;
    },

    /**
     * Function to take the active filters data and build it into a query.
     * The format of the query depends on the {@link #encode} configuration:
     *
     *   - `false` (Default) :
     *     Flatten into query string of the form (assuming <code>{@link #paramPrefix}='filters'</code>:
     *
     *         filters[0][field]="someDataIndex"&
     *         filters[0][data][comparison]="someValue1"&
     *         filters[0][data][type]="someValue2"&
     *         filters[0][data][value]="someValue3"&
     *
     *
     *   - `true` :
     *     JSON encode the filter data
     *
     *         {filters:[{"field":"someDataIndex","comparison":"someValue1","type":"someValue2","value":"someValue3"}]}
     *
     * Override this method to customize the format of the filter query for remote requests.
     *
     * @param {Array} filters A collection of objects representing active filters and their configuration.
     * Each element will take the form of {field: dataIndex, data: filterConf}. dataIndex is not assured
     * to be unique as any one filter may be a composite of more basic filters for the same dataIndex.
     *
     * @return {Object} Query keys and values
     */
    buildQuery : function (filters) {
        var p = {}, i, f, root, dataPrefix, key, tmp,
            len = filters.length;

        if (!this.encode){
            for (i = 0; i < len; i++) {
                f = filters[i];
                root = [this.paramPrefix, '[', i, ']'].join('');
                p[root + '[field]'] = f.field;

                dataPrefix = root + '[data]';
                for (key in f.data) {
                    p[[dataPrefix, '[', key, ']'].join('')] = f.data[key];
                }
            }
        } else {
            tmp = [];
            for (i = 0; i < len; i++) {
                f = filters[i];
                tmp.push(Ext.apply(
                    {},
                    {field: f.field},
                    f.data
                ));
            }
            // only build if there is active filter
            if (tmp.length > 0){
                p[this.paramPrefix] = Ext.JSON.encode(tmp);
            }
        }
        return p;
    },

    /**
     * Removes filter related query parameters from the provided object.
     * @param {Object} p Query parameters that may contain filter related fields.
     */
    cleanParams : function (p) {
        // if encoding just delete the property
        if (this.encode) {
            delete p[this.paramPrefix];
        // otherwise scrub the object of filter data
        } else {
            var regex, key;
            regex = new RegExp('^' + this.paramPrefix + '\[[0-9]+\]');
            for (key in p) {
                if (regex.test(key)) {
                    delete p[key];
                }
            }
        }
    },

    /**
     * Function for locating filter classes, overwrite this with your favorite
     * loader to provide dynamic filter loading.
     * @param {String} type The type of filter to load ('Filter' is automatically
     * appended to the passed type; eg, 'string' becomes 'StringFilter').
     * @return {Function} The Ext.ux.grid.filter.Class
     */
    getFilterClass : function (type) {
        // map the supported Ext.data.Field type values into a supported filter
        switch(type) {
            case 'auto':
              type = 'string';
              break;
            case 'int':
            case 'float':
              type = 'numeric';
              break;
            case 'bool':
              type = 'boolean';
              break;
        }
        return Ext.ClassManager.getByAlias('gridfilter.' + type);
    }
});

Ext.define('LSP.view.ux.download.FileDownload', {
    extend: 'Ext.Component',
    alias: 'widget.FileDownload',
    autoEl: {
        tag: 'iframe', 
        cls: 'x-hidden', 
        src: Ext.SSL_SECURE_URL
    },
    stateful: true,
    load: function(config){
        var e = this.getEl();
        e.dom.src = config.url + 
            (config.params ? '?' + Ext.urlEncode(config.params) : '');
        e.dom.onload = function() {
            if(e.dom.contentDocument.body.childNodes[0].wholeText == '404') {
                Ext.Msg.show({
                    title: 'Attachment missing',
                    msg: 'The document you are after can not be found on the server.',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.ERROR   
                })
            }
        }
    }
});

Ext.define('LDA.model.FilterUnitsModel', {
    extend:'Ext.data.Model',
    fields:['activity_type', 'unit', 'about']
});

/* 
 * Purpose: to make text selectable in a Ext JS 4 grid
 *
 * Usage for MVC app:
 * 
 * 1. copy this file to feature/selectable.js
 * 2. add this to your grid config:

 features: [
 {ftype: 'selectable', id: 'selectable'}
 ],

 * Tested with Ext.grid.Panel in Ext JS 4.0.2a MVC app
 */

// append our CSS class to <head>
Ext.getHead().insertHtml("beforeEnd",
    '<style type="text/css">' +
        '.x-selectable, .x-selectable * {' +
        '    -khtml-user-select: text !important;' +
        '    -moz-user-select: text !important;' +
        '}' +
        '</style>'
);

Ext.require('Ext.view.Table', function () {
    Ext.override(Ext.view.Table, {
        afterrender:function () {
            var me = this;

            me.callParent();
            me.mon(me.el, {
                scroll:me.fireBodyScroll,
                scope:me
            });

            // in case the selectable feature is present, don't do me.el.unselectable() 
            if (me.getFeature('selectable') === undefined) {
                me.el.unselectable();
            }
            me.attachEventsForFeatures();
        }
    });
});

Ext.require('Ext.grid.feature.Feature', function () {
    Ext.define('LSP.view.dynamicgrid.feature.selectable', {
        extend:'Ext.grid.feature.Feature',
        alias:'feature.selectable',

        mutateMetaRowTpl:function (metaRowTpl) {
            var i,
                ln = metaRowTpl.length;

            for (i = 0; i < ln; i++) {
                tpl = metaRowTpl[i];
                tpl = tpl.replace(/x-grid-row/, 'x-grid-row x-selectable');
                tpl = tpl.replace(/x-grid-cell-inner x-unselectable/g, 'x-grid-cell-inner');
                tpl = tpl.replace(/unselectable="on"/g, '');
                metaRowTpl[i] = tpl;
            }
        }
    });
});  
/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 02/07/2012
 * Time: 16:53
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LDA.helper.JamesQueryStringEncoder', {
    extend:'Ext.Base',

    toQueryString:function (object) {
        var paramObjects = [],
            params = [],
            i, j, ln, paramObject, value;

        for (i in object) {
            if (object.hasOwnProperty(i)) {
                paramObjects = paramObjects.concat(Ext.Object.toQueryObjects(i, object[i], false));
            }
        }

        for (j = 0, ln = paramObjects.length; j < ln; j++) {
            paramObject = paramObjects[j];
            value = paramObject.value;

            if (Ext.isEmpty(value)) {
                continue;
            }
            else if (Ext.isDate(value)) {
                value = Ext.Date.toString(value);
            }

            params.push(encodeURIComponent(paramObject.name) + '=' + encodeURIComponent(String(value)));
        }

        return params.join('&');
    }
});

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
        var store = structureViewStore;
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
Ext.define('LDA.store.basestores.BaseStore', {
	extend: 'Ext.data.Store',
	requires: ['LDA.helper.LDAConstants'],
	_format: 'json',
	uri: '',
	BASE_URL: '',
	remoteSort: true,
	//gridController: undefined,
	stringEncoder: Ext.create('LDA.helper.JamesQueryStringEncoder'),
	proxy: {
		type: 'jsonp',
		noCache: false,
		startParam: undefined,
		limitParam: undefined,
		pageParam: undefined,
		//gridStore: this,
		//this is the only query param handled natively by the proxy, all others are handled in store config below.
		callbackKey: '_callback',
		listeners: { // configure listener
			exception: function(request, operation, options) {
				//this.gridStore.gridController.getGridView.setLoading(false);
				// this block is reached on any exception
				//Ext.Msg.show({
				//	title: '',
				//	msg: "We are sorry but the OPS system returned an error.",
				//	buttons: Ext.Msg.OK,
				//	icon: Ext.MessageBox.INFO
				//});
			}
		}
	},
	// Allow sorting with less than pageSize of results
	// Supposedly fixed according to http://www.sencha.com/forum/showthread.php?190791-4.1-RC1-Remote-sort-from-a-buffered-store-fails-on-small-data-sets
	// but the behaviour still persists. TODO check EXTJS updates to see if
	// it gets fixed
	prefetchPage: function(page, options) {
        var me = this,
            pageSize = me.pageSize || me.defaultPageSize,
            start = (page - 1) * me.pageSize,
            total = me.totalCount;

        // No more data to prefetch.
	// changed this line by adding check for count greater than page size
        if (total !== undefined && me.getCount() === total && me.getCount() > pageSize) {
            return;
        }

        // Copy options into a new object so as not to mutate passed in objects
        me.prefetch(Ext.applyIf({
            page     : page,
            start    : start,
            limit    : pageSize
        }, options));
    },

	listeners: {
		//this is used to construct the proxy url before the load is done
		beforeprefetch: {

			fn: function() {
				var me = this;
				me.updateProxyURL();
			}
		},
		beforeload: {

			fn: function() {
				var me = this;
				me.updateProxyURL();
			}
		}
	},

	// because prefetchData is stored by index
	// this invalidates all of the prefetchedData
	sort: function() {
		var me = this,
			prefetchData = me.pageMap;

		if (me.buffered) {
			if (me.remoteSort) {
				prefetchData.clear();
				//get the specific store to sort the column
				this.sortColumn(arguments);
				this.currentPage = 1;
				this.guaranteeRange(0, 49);
			} else {
				me.callParent(arguments);
			}
		} else {
			me.callParent(arguments);
		}
	},

	setURI: function(uri) {
		this.uri = uri;
	},

	updateProxyURL: function() {
		this.proxy.url = this.BASE_URL + this.stringEncoder.toQueryString({
			_format: this._format,
			uri: this.uri
		});
		//        console.log('Proxy: ' + Ext.ClassManager.getName(this) + ' URL updated to: ' + this.proxy.url);
	}

});

Ext.define('LDA.store.FilterUnitsStore', {
    extend: 'LDA.store.basestores.BaseStore',
    model: 'LDA.model.FilterUnitsModel',
    storeId: 'FilterUnitsStore',
    BASE_URL: ldaBaseUrl + '/pharmacology/filters/units/',
    activity_type: undefined,

    constructor: function(config, arguments) {
        console.log('LDA.store.FilterUnitsStore: constructor()');
        this.proxy.reader = Ext.create('LDA.helper.FilterUnitsReader');
        this.BASE_URL += config.activity_type + '?';
        this.callParent(arguments);
    }
});

Ext.Loader.setConfig({
	enabled: true
});
Ext.Loader.setPath('Ext.ux.grid', 'ext/examples/ux/grid');
Ext.define('LSP.view.dynamicgrid.DynamicGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.dynamicgrid',
	requires: ['LDA.helper.FilterUnitsReader', 'LDA.store.FilterUnitsStore', 'LDA.model.FilterUnitsModel', 'Ext.grid.RowNumberer', 'Ext.form.*', 'Ext.ux.grid.FiltersFeature', 'Ext.selection.CellModel', 'LSP.view.dynamicgrid.feature.selectable', 'LSP.view.ux.download.FileDownload'],

    viewConfig: {
        enableTextSelection: true
    },


    exportStore: null,
	exportCSVReady: false,
	exportSDFReady: false,
  rowNumberer: true,
	defaultWidth: 200,
	showMenu: function(x, y, record) {
		var cmp = record.data.compound_pref_label;
		var tar = record.data.target_title;
		var smi = record.data.compound_smiles;

		if (tar) {
			var cmpValueMenu = new Ext.menu.Menu({
				items: [{
					xtype: 'textfield',
					value: cmp
				}, {
					xtype: 'textfield',
					value: tar
				}, {
					xtype: 'textfield',
					value: smi
				}]
			});

			var contextMenu = new Ext.menu.Menu({
				items: [{
					text: 'Search for compound by name',
					itemId: 'searchForCompoundByName',
					iconCls: 'menu-search-compound',
					handler: function() {
						//                        console.log('Search for compound by name');
						//                        console.log(cmp);
						Ext.History.add('!p=CmpdByNameForm&s=' + cmp);
					}
				}, {
					text: 'Search for compound by SMILES',
					itemId: 'searchForCompoundBySMILES',
					iconCls: 'menu-search-compound',
					handler: function() {
						//                        console.log('Search for compound by SMILES');
						//                        console.log(cmp);
						Ext.History.add('!p=SimSearchForm&sm=' + smi + '&st=exact');
					}
				}, {
					text: 'Search for target by name',
					itemId: 'searchForTarget',
					iconCls: 'menu-search-target',
					handler: function() {
						//                        console.log('Search for target by name');
						//                        console.log(tar);
						Ext.History.add('!p=TargetByNameForm&s=' + tar);
					}
				}, {
					text: 'Copy Data',
					menu: cmpValueMenu
				}]
			});
			contextMenu.showAt(x, y);
		} else {
			var cmpValueMenu = new Ext.menu.Menu({
				items: [{
					xtype: 'textfield',
					value: cmp
				}, {
					xtype: 'textfield',
					value: smi
				}]
			});

			var contextMenu = new Ext.menu.Menu({
				items: [{
					text: 'Search for compound by name',
					itemId: 'searchForCompoundByName',
					iconCls: 'menu-search-compound',
					handler: function() {
						//                        console.log('Search for compound by name');
						//                        console.log(cmp);
						Ext.History.add('!p=CmpdByNameForm&s=' + cmp);
					}
				}, {
					text: 'Search for compound by SMILES',
					itemId: 'searchForCompoundBySMILES',
					iconCls: 'menu-search-compound',
					handler: function() {
						//                        console.log('Search for compound by SMILES');
						//                        console.log(cmp);
						Ext.History.add('!p=SimSearchForm&sm=' + smi + '&st=exact');
					}
				}, {
					text: 'Copy Data',
					menu: cmpValueMenu
				}]
			});
			contextMenu.showAt(x, y);
		}

	},
	    initComponent:function () {
			console.log('DynamicGrid: initComponent()');
			// initializing features for the grid
	        //var groupingFeature = Ext.create('Ext.grid.feature.Grouping', {
	        //    groupHeaderTpl:'Group: {name} ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})'
	        //});
	        var filters = {
	            ftype:'filters',
	            encode:true, // json encode the filter query
	            local:true   // defaults to false (remote filtering)
	        };
	        // this feature allows for selection of text in the grid by changing the underlaying style for the cell
	        var cellTextSelector = {
	            ftype:'selectable',
	            id:'selectable'
	        };
			//add the top bar here since the child may already have some docked items
		var temp_store = this.getExportStore();

	        var config = {

	            tbar:[{
	                    xtype:'button',
	                    text:'Download tsv file',
	                    tooltip:'Download results as a tab separated file',
	                    itemId:'tsvDownloadProxy_id',
	                    iconCls:'icon-csv',
	                    hidden:false,
                            disabled: true,
                            href: tsv_download_url,
                            renderTo: Ext.getBody()	
	                },
			    // 	                {
			    // 	                    xtype:'exporterbutton',
			    // 	                    formatter:'csv',
			    // 	                    swfPath:'app/view/ux/exporter/downloadify.swf',
			    // 	                    downloadImage:'app/view/ux/exporter/csv_button.png',
			    // 	                    itemId:'csvDownload_id',
			    // 	                    downloadName: 'ops_pharmacology_data.csv',
			    // store: temp_store,
			    // 	                    width:117,
			    // 	                    height:22,
			    // 	                    hidden:false,
			    // 	                    disabled:true
			    // 	                },
	                { xtype:'tbseparator' },
	                {
	                    xtype:'button',
	                    text:'Download SD file ',
	                    tooltip:'Download results in SD file format',
	                    itemId:'sdfDownloadProxy_id',
	                    iconCls:'icon-sdf',
			    // TODO sd file download is disabled for now
	                    hidden:true,
	                    disabled:true
	                },
	                // {
	                //     xtype:'exporterbutton',
	                //     formatter:'sdf',
	                //     swfPath:'app/view/ux/exporter/downloadify.swf',
	                //     downloadImage:'app/view/ux/exporter/sdf_button.png',
	                //     itemId:'sdfDownload_id',
	                //     downloadName: 'ops_pharmacology_data.sdf',	                    
	                //                       width:111,
	                //     height:22,
	                //     hidden:false,
	                //     disabled:true
	                // }
	            ],
	            features:[filters, cellTextSelector]
	        };

	        Ext.apply(this, config);
	        Ext.apply(this.initialConfig, config);
	        this.callParent(arguments);	
	    }
});

/*########################################################################################
 #
 #  Copyright H. Lundbeck A/S
 #  This file is part of LSP4All.
 #
 #  LSP4All is free software; you can redistribute it and/or modify
 #  it under the terms of the GNU General Public License as published by
 #  the Free Software Foundation; either version 2 of the License, or (at
 #  your option) any later version.
 #
 #  LSP4All IS MADE AVAILABLE FOR DISTRIBUTION WITHOUT ANY FORM OF WARRANTY TO THE
 #  EXTENT PERMITTED BY APPLICABLE LAW.  THE COPYRIGHT HOLDER PROVIDES THE PROGRAM \"AS IS\"
 #  WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT
 #  LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 #  PURPOSE. THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM LIES
 #  WITH THE USER.  SHOULD THE PROGRAM PROVE DEFECTIVE IN ANY WAY, THE USER ASSUMES THE
 #  COST OF ALL NECESSARY SERVICING, REPAIR OR CORRECTION. THE COPYRIGHT HOLDER IS NOT
 #  RESPONSIBLE FOR ANY AMENDMENT, MODIFICATION OR OTHER ENHANCEMENT MADE TO THE PROGRAM
 #  BY ANY USER WHO REDISTRIBUTES THE PROGRAM SO AMENDED, MODIFIED OR ENHANCED.
 #
 #  IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING WILL THE
 #  COPYRIGHT HOLDER BE LIABLE TO ANY USER FOR DAMAGES, INCLUDING ANY GENERAL, SPECIAL,
 #  INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR INABILITY TO USE THE
 #  PROGRAM (INCLUDING BUT NOT LIMITED TO LOSS OF DATA OR DATA BEING RENDERED INACCURATE
 #  OR LOSSES SUSTAINED BY THE USER OR THIRD PARTIES OR A FAILURE OF THE PROGRAM TO
 #  OPERATE WITH ANY OTHER PROGRAMS), EVEN IF SUCH HOLDER HAS BEEN ADVISED OF THE
 #  POSSIBILITY OF SUCH DAMAGES.
 #
 #  You should have received a copy of the GNU General Public License
 #  along with this program; if not, write to the Free Software
 #  Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.
 #
 ########################################################################################*/
//TODO move this to a constants file
CSV_EXPORT_LIMIT = 10000;
Ext.define('LSP.controller.grids.DynamicGrid', {
    extend: 'Ext.app.Controller',

    views: ['dynamicgrid.DynamicGrid'],

    models: ['DynamicGrid', 'Unit'],

    refs: [{
        ref: 'gridView',
        selector: 'dynamicgrid'
    }],

    init: function() {
        console.log('DynamicGrid: init()');
        this.control({
            'dynamicgrid': {
                itemdblclick: function(view, record, item, index, e, opts) {
                    if (record.data.cs_compound_uri !== undefined) {
                        var csid = record.data.cs_compound_uri.match(/http:\/\/rdf.chemspider.com\/(\d+)/)[1];
                        if (parseInt(csid) >= 1) {
                            Ext.create('CS.view.CompoundWindow').showCompound(csid);
                        }
                    }
                },
                itemcontextmenu: function(view, record, itemHTMLElement, index, eventObject, eOpts) {
                    eventObject.preventDefault();
                    //                    console.log('itemcontextmenu');
                    this.getGridView().showMenu(eventObject.getX(), eventObject.getY(), record);
                }
            },
            'dynamicgrid toolbar #sdfDownloadProxy_id': {
                click: this.prepSDFile
            }
        })
    },
    onLaunch: function() {},


    testThis: function(args) {},

    setTSVDownloadParams: function() {
        var tsv_download_button = this.getTsvDownloadButton();
        var gridview = this.getGridView();
        var tsv_download_params = new Array();
        Ext.each(this.getFilters(), function(filter, index) {
            if (filter.filterType == "activity") {
                tsv_download_params.push("activity_value_type=" + gridview.store.getActivityConditionParam() + "&activity_type=" + gridview.store.activity_type + "&activity_value=" + gridview.store.activity_value + "&activity_unit=" + gridview.store.activity_unit)
            } else if (filter.filterType == "organism") {
                tsv_download_params.push("assay_organism=" + gridview.store.assay_organism);
            }
        });
        tsv_download_params.push("uri=" + gridview.store.proxy.extraParams.uri + "&total_count=" + gridview.store.getTotalCount() + "&request_type=" + gridview.store.REQUEST_TYPE);
        total_params = tsv_download_params.join("&");
        tsv_download_button.href = tsv_download_url + "?" + total_params
        tsv_download_button.setParams();
    },

    addCompletedActivityFilter: function(button) {
        console.log('DynamicGrid: addCompletedActivityFilter()');
        activity_value = this.getFilterContainer().down('#activity_combobox_id').getValue();
        conditions_value = this.getFilterContainer().down('#conditions_combobox_id').getValue();
        value_value = this.getFilterContainer().down('#value_textfield_id').getValue();
		unit_value = this.getFilterContainer().down('#unit_combobox_id').getValue();
        //unit_value = this.getFilterContainer().down('#unit_combobox_id').getValue();
        // TODO unit value check && unit_value != null
        if (activity_value != null && conditions_value != null && value_value != "" & unit_value != null) {
            filter = Ext.create('LSP.model.Filter', {
                activity: activity_value,
                condition: conditions_value,
                value: value_value,
                unit: unit_value
            });
            filter.filterType = "activity";
            this.getFilters().push(filter);
            // this is the only way I could find to reference the controller from the model and the view
            filter.controller = this;

            filter_view = Ext.create('LSP.view.filter.CompletedActivityFilter', {});
            filter_view.down('#activityLabel_id').setText(activity_value);
            filter_view.down('#conditionsLabel_id').setText(conditions_value);
            filter_view.down('#valueLabel_id').setText(value_value);
			filter_view.down('#unitLabel_id').setText(unit_value);	
            // tell the filter what model it is using so we can get back to the controller when the
            // filter is removed from the view
            filter.filterView = filter_view;
            this.getFormView().down('#completedFilterContainer_id').add(filter_view);
            this.getFormView().down('#completedFilterContainer_id').setVisible(true);
            filter_view.filterModel = filter;
            filter_view.on({
                close: this.removeFilter
            });
            var dg = this.getGridView();
            var store = dg.store;
            store.filters = this.getFilters();
            store.setActivityType(activity_value);
            store.setActivityValue(value_value);
            store.setActivityCondition(conditions_value);
			store.setActivityUnit(unit_value);
            // currently only 1 activity filter can be added at a time
            this.getFormView().down('#addCompletedActivityFilter_id').disable();
            //this.getFormView().down('#activityFilterContainer_id').disable();
            //this.getFormView().down('#activityFilterContainer_id').setVisible(false);
        } else {
            Ext.MessageBox.show({
                title: 'Error',
                msg: 'Filter options cannot be empty.<br\>Please select a value for each of the filter options.',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            });
        }
    },

    addCompletedOrganismFilter: function(button) {
        console.log('DynamicGrid: addCompletedOrganismFilter()');
        organism_value = this.getFilterContainer().down('#organism_combobox_id').getValue();
        //unit_value = this.getFilterContainer().down('#unit_combobox_id').getValue();
        // TODO unit value check && unit_value != null
        if (organism_value != null) {
            filter = Ext.create('LSP.model.Filter', {
                value: organism_value
            });
            filter.filterType = "organism";
            this.getFilters().push(filter);
            // this is the only way I could find to reference the controller from the model and the view
            filter.controller = this;

            filter_view = Ext.create('LSP.view.filter.CompletedOrganismFilter', {});
            filter_view.down('#valueLabel_id').setText("Assay Organism");
            filter_view.down('#conditionsLabel_id').setText("=");
            filter_view.down('#organismType_id').setText(organism_value);
            //filter_view.down('#unitLabel_id').setText(unit_value);
            // tell the filter what model it is using so we can get back to the controller when the
            // filter is removed from the view
            filter.filterView = filter_view;
            this.getFormView().down('#completedFilterContainer_id').add(filter_view);
            this.getFormView().down('#completedFilterContainer_id').setVisible(true);
            filter_view.filterModel = filter;
            filter_view.on({
                close: this.removeFilter
            });
            var dg = this.getGridView();
            var store = dg.store;
            store.filters = this.getFilters();
            store.setAssayOrganism(organism_value);
            // currently only 1 organism filter can be added at a time
            this.getFormView().down('#addCompletedOrganismFilter_id').disable();
            //this.getFormView().down('#organismFilterContainer_id').disable();
            //this.getFormView().down('#organismFilterContainer_id').setVisible(false);
        } else {
            Ext.MessageBox.show({
                title: 'Error',
                msg: 'Filter options cannot be empty.<br\>Please select a value for each of the filter options.',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            });
        }
    },

    removeFilter: function(filter) {
        console.log('DynamicGrid: filterClosed()');
        controller = filter.filterModel.controller;
        var dg = controller.getGridView();
        var store = dg.store;
        //var exportStore = dg.exportStore;
        if (filter.filterModel.filterType == "activity") {
            var index = controller.getFilters().indexOf(filter.filterModel);
            controller.getFilters().splice(index, 1);
            store.filters = controller.getFilters();
            store.setActivityType("");
            store.setActivityValue("");
            store.setActivityCondition("");
			store.setActivityUnit("");
            controller.getFormView().down('#addCompletedActivityFilter_id').enable();
            //controller.getFormView().down('#activityFilterContainer_id').enable();
            //controller.getFormView().down('#activityFilterContainer_id').setVisible(true);
        } else if (filter.filterModel.filterType == "organism") {
            var index = controller.getFilters().indexOf(filter.filterModel);
            controller.getFilters().splice(index, 1);
            store.filters = controller.getFilters();
            store.setAssayOrganism(null);
            controller.getFormView().down('#addCompletedOrganismFilter_id').enable();
            //controller.getFormView().down('#organismFilterContainer_id').enable();
            //controller.getFormView().down('#organismFilterContainer_id').setVisible(true);
        }

    },

    addFilterForm: function(button) {
        console.log('DynamicGrid: addFilterForm()');
        // view = Ext.widget('FilterPanel');
        hide = this.getFilterContainer().hidden;
        if (hide) {
            this.getFilterContainer().setVisible(true);
        } else {
            this.getFilterContainer().setVisible(false);
        }
    },

    prepSDFile: function(sdf_prep_button) {
        Ext.MessageBox.show({
            title: 'Info',
            msg: 'SD file export is not available in this release. The functionality will be available in the next release.',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.INFO
        });
        // var this_controller = this;
        // var update_count = 0;
        // var gridview = sdf_prep_button.up('dynamicgrid');
        // var store_count = gridview.store.totalCount;
        // 
        // if (gridview.exportCSVReady) {
        // 	gridview.up('form').setLoading("Preparing download of " + store_count + " molfiles. Please wait...");
        // 	var exportStore = gridview.getExportStore();
        // 	var items = exportStore.data.items;
        // 	var item_count = items.length;
        // 	var success_count = 0;
        // 	var fail_count = 0;
        // 	sdf_prep_button.setText('SD-file preparing...');
        // 	csid_hash = {};
        // 	csid_molfile_hash = {};
        // 	var total_csid_count = 0;
        // 	Ext.each(items, function(item) {
        // 		var csid = item.data.csid;
        // 		if (!isNaN(parseInt(csid))) {
        // 			total_csid_count++;
        // 			if (item.molfile !== undefined && item.molfile.length > 30) {
        // 				csid_molfile_hash[csid] = item.molfile;
        // 			}
        // 			if (csid_hash[csid] === undefined) {
        // 				csid_hash[csid] = [item.index];
        // 			} else {
        // 				csid_hash[csid].push(item.index);
        // 			}
        // 		}
        // 
        // 	});
        // 	var batch_count = 0;
        // 	var csid_batches = [];
        // 	var local_batch = [];
        // 	var uniq_csid_count = 0;
        // 	for (var csid in csid_hash) {
        // 		local_batch.push(csid);
        // 		batch_count++;
        // 		uniq_csid_count++;
        // 		if (batch_count >= 100) {
        // 			batch_count = 0;
        // 			csid_batches.push(local_batch);
        // 			local_batch = [];
        // 		}
        // 	}
        // 	csid_batches.push(local_batch);
        // 	for (var idx in csid_batches) {
        // 		param_array = ["serfilter:'Compound[CSID|Mol]'"];
        // 		for (var iidx in csid_batches[idx]) {
        // 			param_array.push("'csids[" + iidx + "]':" + csid_batches[idx][iidx]);
        // 		}
        // 		param_json = "{" + param_array.join(',') + "}";
        // 		var compoundStore = Ext.create('CS.store.Compound');
        // 		compoundStore.proxy.timeout = '180000';
        // 		compoundStore.proxy.startParam = undefined;
        // 		compoundStore.proxy.limitParam = undefined;
        // 		compoundStore.proxy.pageParam = undefined;
        // 		compoundStore.load({
        // 			params: Ext.JSON.decode(param_json),
        // 			callback: function(records, operation, success) {
        // 				if (success) {
        // 					Ext.Array.each(records, function(rec, index) {
        // 						// Here we add the molfiles to the exportStore for later export
        // 						var record_csid = rec.data.CSID;
        // 						var record_molfile = rec.data.Mol;
        // 						var csid_records = csid_hash[record_csid]; // record indices with this csid
        // 						var idx_len = csid_records.length;
        // 						for (i = 0; i < idx_len; i++) {
        // 							var row = exportStore.getAt(csid_records[i]);
        // 							if (row.molfile == undefined) {
        // 								row.molfile = record_molfile;
        // 								update_count++;
        // 							}
        // 						}
        // 					});
        // 					this_controller.updateSDFStatus(sdf_prep_button, exportStore, total_csid_count);
        // 				} else {
        // 					gridview.up('form').setLoading(false);
        // 					alert("Error, sorry the structure retrievel failed. Please try again later.");
        // 					// CHEMSIDER JSONP TIMES OUT!!! HANDLER..?
        // 				}
        // 			}
        // 		}, this);
        // 	}
        // } else { // else what..?
        // 	alert("Error!");
        // }


    },


    updateSDFStatus: function(button, store, total_csid_count) {
        var items = store.data.items;
        var item_count = items.length;
        var missing_count = 0;
        var success_count = 0;
        Ext.each(items, function(item) {
            if (item.molfile !== undefined) {
                success_count++;
            }
        });
        button.setText('SD-File ' + (100 * success_count / total_csid_count).toFixed(0) + '% ready');
        if (success_count >= 0.98 * total_csid_count) {
            button.setText('SD-File ready! Click ->');
            button.up('grid').down('#sdfDownload_id').enable();
            button.up('grid').exportSDFReady = true;
            button.up('form').setLoading(false);
        }
    },

    getMolfile: function(csid, row_idxs, grid_store, sdf_prep_button) {
        var me = this;
        var compoundStore = Ext.create('CS.store.Compound');
        var idx_len = row_idxs.length;
        compoundStore.load({
            params: {
                'csids[0]': csid
            },
            callback: function(obsrecords, operation, success) {
                if (success) {
                    var compound = compoundStore.first().raw.Mol;
                    for (i = 0; i < idx_len; i++) {
                        var item = grid_store.getAt(row_idxs[i]);
                        item.molfile = compound;
                    }
                    me.updateSDFStatus(sdf_prep_button, grid_store);
                } else {
                    // CHEMSIDER JSONP TIMES OUT!!! HANDLER..?
                }
            }
        }, this);

    },


    prepGrid: function() {
        console.log(this.$className + ': prepGrid()');
		// reset the filters to empty
		this.filters = new Array();
        var grid_view = this.getGridView();
        var store = grid_view.getStore();
        store.on('prefetch', this.storeLoadComplete, this);
    },

    storeLoadComplete: function(store, records, success) {
        console.log(this.$className + ': storeLoadComplete()');
        grid_view = this.getGridView();
        grid_store = grid_view.getStore();
        if (success) {
            // If some records are coming back then set the tsv download params
            this.setTSVDownloadParams();
            //grid_view.down('#sdfDownload_id').disable();
            //grid_view.down('#sdfDownloadProxy_id').setText('Prepare SD-file download');
            grid_view.down('#sdfDownloadProxy_id').enable();
            grid_view.down('#tsvDownloadProxy_id').enable();
            this.getSubmitButton().enable();
            grid_view.setLoading(false);
            grid_view.setTitle(grid_view.gridBaseTitle + ' - Total Records: ' + grid_store.getTotalCount());
        } else {
            console.log(this.$className + ': possible timeout for with uri ' + grid_store.proxy.url);
            this.getSubmitButton().enable();
            grid_view.setLoading(false);
            grid_view.setTitle(grid_view.gridBaseTitle + ' ---- There was an error retrieving some of the records ----');
            //Ext.MessageBox.show({
            //    title: 'Info',
            //    msg: 'We are sorry but the OPS system returned an error.',
            //    buttons: Ext.MessageBox.OK,
            //    icon: Ext.MessageBox.INFO
            //});
        }
    },

    fetchTotalResults: function() {
        console.log('DynamicGrid: fetchTotalResults() for ' + this.$className);
        try {
            var grid_view = this.getGridView();
            var grid_store = grid_view.getStore();
	    //grid_store.gridController = this;
            var form = this.getFormView();
            var button = this.getSubmitButton();
            this.resetDownload();
            countStore = this.getCountStore();
            countStore.uri = grid_store.proxy.reader.uri;
            // TODO only one filter can be used at the moment, need to change code for multiple
            // at some point
            // Count with filters was slow, easier to grab all the results and count them here
            // code kept in case needed in future
            Ext.each(this.getFilters(), function(filter, index) {
                if (filter.filterType == "activity") {
                    countStore.setActivityType(filter.data.activity);
                    countStore.setActivityValue(filter.data.value);
                    countStore.setActivityCondition(filter.data.condition);
                    countStore.setActivityUnit(filter.data.unit);
                } else if (filter.filterType == "organism") {
                    countStore.setAssayOrganism(filter.data.value);
                }
            });
            //if (this.getFilters().length > 0) {
            //	countStore.filters = this.getFilters();
            //	countStore.setActivityType(this.getFilters()[0].data.activity);
            //	countStore.setActivityValue(this.getFilters()[0].data.value);
            //	countStore.setActivityCondition(this.getFilters()[0].data.condition);
            //}
            //	allResultsStore = Ext.create('LDA.store.CompoundPharmacologyStore');
            //	allResultsStore.proxy.extraParams.uri = grid_store.proxy.extraParams.uri;
            //	allResultsStore.setActivityType(this.filters[0].data.activity);
            //	allResultsStore.setActivityValue(this.filters[0].data.value);
            //	allResultsStore.setActivityCondition(this.filters[0].data.condition);	
            //	allResultsStore.load(function(records, operation, success) {
            //		total = records.length;
            //		grid_store.proxy.reader.total_count = total;
            //	// we have the total number of results now and the proxy reader knows what it is so
            //	// fetch the first page of results
            //	if (total == 0) {
            //		grid_view.setTitle(grid_view.gridBaseTitle + ' - No records found within OPS for this search!');
            //		grid_view.down('#sdfDownload_id').disable();
            //		grid_view.down('#sdfDownloadProxy_id').setText('Prepare SD-file download');
            //		grid_view.down('#sdfDownloadProxy_id').disable();
            //		button.enable();
            //		grid_view.setLoading(false);
            //		Ext.MessageBox.show({
            //			title: 'Info',
            //			msg: 'The OPS system does not contain any data that match this search.',
            //			buttons: Ext.MessageBox.OK,
            //			icon: Ext.MessageBox.INFO
            //		});
            //	} else {
            //		// for pagianted grid use this
            //		// grid_store.load();
            //		grid_store.guaranteeRange(0, 49);
            //	}
            //	});	
            //} else {
            countStore.load(function(records, operation, success) {
                if (success) {
                    total = operation.response.result.primaryTopic[this.countNode];
                    grid_store.proxy.reader.total_count = total;
                    // we have the total number of results now and the proxy reader knows what it is so
                    // fetch the first page of results
                    if (total == 0) {
                        grid_view.setTitle(grid_view.gridBaseTitle + ' - No records found within OPS for this search!');
                        //grid_view.down('#sdfDownload_id').disable();
                        //grid_view.down('#sdfDownloadProxy_id').setText('Prepare SD-file download');
                        grid_view.down('#sdfDownloadProxy_id').disable();
                        grid_view.down('#tsvDownloadProxy_id').disable();
                        button.enable();
                        grid_view.setLoading(false);
                        Ext.MessageBox.show({
                            title: 'Info',
                            msg: 'The OPS system does not contain any data that match this search.',
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.INFO
                        });
                    } else {
                        // for paginated grid use this
                        // grid_store.load();
                        grid_store.guaranteeRange(0, 49);
                    }
                } else {
                    grid_view.setTitle(grid_view.gridBaseTitle + ' - We are sorry but the OPS system returned an error!');
                    //grid_view.down('#sdfDownload_id').disable();
                    //grid_view.down('#sdfDownloadProxy_id').setText('Prepare SD-file download');
                    grid_view.down('#sdfDownloadProxy_id').disable();
                    grid_view.down('#tsvDownloadProxy_id').disable();
                    button.enable();
                    grid_view.setLoading(false);
                    Ext.MessageBox.show({
                        title: 'Info',
                        msg: 'We are sorry but the OPS system returned an error.',
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.INFO
                    });
                }
            });
            //}
        } catch (exception) {
            console.log('DynamicGrid: exception fetching results for ' + this.$className + 'with uri ' + grid_store.proxy.uri);
            Ext.MessageBox.show({
                title: 'Info',
                msg: 'We are sorry but the OPS system returned an error.',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.INFO
            });
        }

    },

    enableSubmit: function(lookup) {
        this.getSubmitButton().enable();
    },
    // 
    resetDownload: function() {
        var gridview = this.getGridView();
        gridview.exportCSVReady = false;
        gridview.exportSDFReady = false;

        gridview.getExportStore().removeAll(true);
        //gridview.down('#csvDownloadProxy_id').setText('Prepare full result set download');
        //gridview.down('#csvDownload_id').disable();
        //gridview.down('#sdfDownloadProxy_id').setText('Prepare SD-file download');
        //gridview.down('#sdfDownload_id').disable();
    },

    onProvChange: function(field, newVal, oldVal) {
        var dg = this.getGridView();
        dg.toggleProv(newVal['prov']);
        dg.getView().refresh();
    },

    getFilters: function() {
        if (this.filters == null) {
            this.filters = new Array();
        }
        return this.filters;
    },

    getRequestType: function() {
        return this.request_type;
    }

});

Ext.define('LSP.view.larkc_sim_search.SimSearchScrollingGrid', {
    extend: 'LSP.view.dynamicgrid.DynamicGrid',
    alias: 'widget.SimSearchScrollingGrid',
    layout: 'fit',
    //         verticalScroller: Ext.create('LDA.helper.DynamicPagingToolbar', {
    // 					itemId: 'pager_id',
    // 					store: 'CompoundPharmacologyPaginatedStore'
    // }),
    //verticalScrollerType: Ext.create('LDA.helper.DynamicPagingToolbar',{itemId: 'pager_id'}),
    disableSelection: true,
    invalidateScrollerOnRefresh: false,
    requires: ['LDA.model.SimModel'],
    //listeners: {
    //    'sortchange': function(ct, column, direction, eOpts ) {
    //		console.log('SimSearchScrollingGrid: sortchange()');
    //		//this.setLoading(true);
    //    }
    //},
    refs: [
    // {
    // 	ref:'pager',
    //         		selector:'#pager_id'
    // }
    ],
    store: Ext.create('LDA.store.SimSearchLocalStore', {}),
    exportStore: null,
    getExportStore: function() {
        if (this.exportStore == null) {
            this.exportStore = Ext.create('LDA.store.SimSearchStore', {});
        }
        return this.exportStore;
    },
    //initComponent: function() {
    //    this.store = Ext.create('Ext.data.Store', {
    //        model: 'LDA.model.SimModel'
    //    });
    //    this.callParent(arguments);
    //},
    columns: [{
        xtype: 'rownumberer',
        width: 40
    }, {
        //TODO: renderer for chemical structure image (from chemspider?)
        header: 'Structure',
        dataIndex: 'cs_uri',
        xtype: 'templatecolumn',
        tpl: '<img width="128" height="128" src="http://www.chemspider.com/ImagesHandler.ashx?id={csid}&w=128&h=128" alt="CSID:{csid}"/>',
        width: 135,
        sortable: false
    }, {
        header: 'Compound Name',
        dataIndex: 'compound_pref_label',
        renderer:structureProvenanceRenderer,
        width: 180,
        tdCls: 'wrap gridDescriptiveRowPadding'
    }, {
        header: 'Molecular Formula',
        dataIndex: 'molform',
        renderer:structureProvenanceRenderer,
        align: 'center',
        tdCls: 'gridRowPadding'
    }, {
        header: 'ALogP',
        dataIndex: 'alogp',
        renderer:structureProvenanceRenderer,
        width: 60,
        align: 'center',
        tdCls: 'gridRowPadding'
    }, {
        header: '# HBA',
        dataIndex: 'hba',
        renderer:structureProvenanceRenderer,
        tooltip: 'Number of Hydrogen Bond Acceptors',
        width: 60,
        align: 'center',
        tdCls: 'gridRowPadding'
    }, {
        header: '# HBD',
        dataIndex: 'hbd',
        renderer:structureProvenanceRenderer,
        tooltip: 'Number of Hydrogen Bond Donors',
        width: 60,
        align: 'center',
        tdCls: 'gridRowPadding'
    }, {
        header: 'Mol Weight',
        dataIndex: 'full_mwt',
        renderer:structureProvenanceRenderer,
        tooltip: 'Molecular Weight',
        width: 70,
        align: 'center',
        tdCls: 'gridRowPadding'
    }, {
        header: 'MW Freebase',
        dataIndex: 'mw_freebase',
        renderer:structureProvenanceRenderer,
        tooltip: 'Molecular Weight (Free Base)',
        align: 'center',
        tdCls: 'gridRowPadding'
    }, {
        header: '# RTB',
        dataIndex: 'rtb',
        renderer:structureProvenanceRenderer,
        tooltip: 'Number of Rotatable Bonds',
        width: 60,
        align: 'center',
        tdCls: 'gridRowPadding'
    }, {
        header: 'Melting Point',
        dataIndex: 'meltingPoint',
        renderer:structureProvenanceRenderer,
        width: 140,
        tdCls: 'wrap gridDescriptiveRowPadding'
    }, {
        header: 'SMILES',
        dataIndex: 'compound_smiles',
        renderer:structureProvenanceRenderer,
        width: 135,
        align: 'center',
        tdCls: 'gridRowPadding'
    }, {
        header: 'InChi',
        dataIndex: 'inchi',
        renderer:structureProvenanceRenderer,
        width: 135,
        align: 'center',
        tdCls: 'gridRowPadding'
    }, {
        header: 'InChi Key',
        dataIndex: 'inchi_key',
        renderer:structureProvenanceRenderer,
        width: 135,
        align: 'center',
        tdCls: 'gridRowPadding'
    }]
    ,

    simSearchProv: false,

    toggleProv:function (val) {
        this.simSearchProv = val;
        console.log(" Show provenance : " + this.simSearchProv);
        this.doLayout();
    },
	showMenu: function(x, y, record) {
		var cmp = record.data.compound_pref_label;
		var tar = record.data.target_title;
		var smi = record.data.compound_smiles;
		var cw_uri = record.data.cw_uri;

		if (tar) {
			var cmpValueMenu = new Ext.menu.Menu({
				items: [{
					xtype: 'textfield',
					value: cmp
				}, {
					xtype: 'textfield',
					value: tar
				}, {
					xtype: 'textfield',
					value: smi
				}]
			});

			var contextMenu = new Ext.menu.Menu({
				items: [{
					text: 'Search for a compound by name',
					itemId: 'searchForCompoundByName',
					iconCls: 'menu-search-compound',
					handler: function() {
						//                        console.log('Search for compound by name');
						//                        console.log(cmp);
						Ext.History.add('!p=CmpdByNameForm&s=' + cmp);
					}
				}, {
					text: 'Search for a compound by SMILES',
					itemId: 'searchForCompoundBySMILES',
					iconCls: 'menu-search-compound',
					handler: function() {
						//                        console.log('Search for compound by SMILES');
						//                        console.log(cmp);
						Ext.History.add('!p=SimSearchForm&sm=' + smi + '&st=exact');
					}
				}, {
					text: 'Search for a target by name',
					itemId: 'searchForTarget',
					iconCls: 'menu-search-target',
					handler: function() {
						//                        console.log('Search for target by name');
						//                        console.log(tar);
						Ext.History.add('!p=TargetByNameForm&s=' + tar);
					}
				}, {
					text: 'Copy Data',
					menu: cmpValueMenu
				}]
			});
			contextMenu.showAt(x, y);
		} else {
			var cmpValueMenu = new Ext.menu.Menu({
				items: [{
					xtype: 'textfield',
					value: cmp
				}, {
					xtype: 'textfield',
					value: smi
				}]
			});

			var contextMenu = new Ext.menu.Menu({
				items: [{
					text: 'Search for a compound by name',
					itemId: 'searchForCompoundByName',
					iconCls: 'menu-search-compound',
					handler: function() {
						//                        console.log('Search for compound by name');
						//                        console.log(cmp);
						Ext.History.add('!p=CmpdByNameForm&s=' + cmp);
					}
				}, {
					text: 'Search for a compound by SMILES',
					itemId: 'searchForCompoundBySMILES',
					iconCls: 'menu-search-compound',
					handler: function() {
						//                        console.log('Search for compound by SMILES');
						//                        console.log(cmp);
						Ext.History.add('!p=SimSearchForm&sm=' + smi + '&st=exact');
					}
				}, {
					text: 'Search for Pharmacology by Compound',
					itemId: 'searchForPharmacologyByCompound',
					iconCls: 'menu-search-pharma-by-compound',
					handler: function() {
						//                        console.log('Search for compound by name');
						//                        console.log(cmp);
                                                if (cw_uri) {
                                                    Ext.History.add('!p=PharmByCmpdNameForm&u=' + cw_uri);
                                                } else {
						    Ext.History.add('!p=PharmByCmpdNameForm&s=' + cmp);
                                                }
					}
				},{
					text: 'Copy Data',
					menu: cmpValueMenu
				}]
			});
			contextMenu.showAt(x, y);
		}

	}
});

function structureProvenanceRenderer(data, cell, record, rowIndex, columnIndex, store) {
	//console.log("Structure provenance renderer");

    //if (LDAProvenanceMode != LDA.helper.LDAConstants.LDA_PROVENANCE_OFF) {
    if (this.simSearchProv) {

        var recdata = this.columns[columnIndex].dataIndex;
        var itemdata = recdata + '_item';
        recdata += '_src';
        var source = record.data[recdata];
        var cls = LDA.helper.LDAConstants.LDA_SRC_CLS_MAPPINGS[source];
        if (!cls) {
            cls = 'defaultValue';
        }
        var iconCls = cls + 'Icon';
        iconCls = '/assets/' + iconCls + '.png';
        //console.log(iconCls);
        cls += LDAProvenanceMode;
        if (LDAProvenanceMode == LDA.helper.LDAConstants.LDA_PROVENANCE_COLOUR) {

            if (record.data[recdata] && data) {

                // return '<div class="' + cls + '">' + data + '</div>' + '<br>' + record.data[recdata];
                return '<div class="' + cls + '">' + data + '</div>' + '<br>' + '<a href="' + record.data[itemdata] + '" target="_blank">' + '<img src="' + iconCls + '" height="15" width="15"/>' + '</a>';

            } else {

                return '<div class="' + cls + '">' + data + '</div>'

            }

        }
        //else if (LDAProvenanceMode == LDA.helper.LDAConstants.LDA_PROVENANCE_ICON) {
        //this needs an img adding in
        //    return '<div class="' + cls + '">' + data + '</div>';
        //} else if (LDAProvenanceMode == LDA.helper.LDAConstants.LDA_PROVENANCE_TEXT) {
        //    return '<div class="' + cls + '">' + data + ' (' + source + ')</div>';
        //}
    } else {
        return data;
    }
    return data;
}
;

var sim_search_type = Ext.create('Ext.data.Store', {
	fields: ['sim_type', 'name'],
	data: [{
		"sim_type": "Tanimoto",
		"name": "Tanimoto"
	}, {
		"sim_type": "Tversky",
		"name": "Tversky"
	}, {
		"sim_type": "Euclidian",
		"name": "Euclidian"
	}]
});

Ext.define('LSP.view.larkc_sim_search.SimSearchForm', {
	extend: 'Ext.form.Panel',
	alias: 'widget.SimSearchForm',
	header: false,
	requires: ['LSP.view.mol_editor_forms.KetcherForm', 'LSP.view.larkc_sim_search.SimSearchScrollingGrid'],
	closable: true,
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	initComponent: function() {
		console.log('LSP.view.larkc_sim_search.SimSearchForm: initComponent()');

		this.items = [{
			xtype: 'form',
			padding: '5 5 5 5',
			border: false,
			//                height:'100%',
			style: 'background-color: #fff;',
			items: [{
				name: 'molfile',
				xtype: 'hidden',
				value: ''
			}, {
				xtype: 'fieldcontainer',
				layout: 'column',
				collapsible: false,
				defaults: {
					anchor: '100%'
				},
				items: [{
					xtype: 'textfield',
					name: 'smiles',
					itemId: 'smilesField',
					emptyText: 'Enter SMILES here or use the molecular editor to draw structure - click button ->',
					fieldLabel: 'Search for compounds similar to SMILES',
					labelWidth: 230,
					width: 650
				}, {
					xtype: 'button',
					action: 'ketcher_editor',
					text: 'Draw structure'
				}, {
					xtype: 'radiogroup',
					width: 160,
					labelWidth: 65,
					fieldLabel: 'Provenance',
					itemId: 'provId',
					margin: '5 5 5 80',

					items: [{
						boxLabel: 'On',
						name: 'prov',
						inputValue: true
					}, {
						boxLabel: 'Off',
						name: 'prov',
						inputValue: false,
						checked: true
					}]
				}, {
					xtype: 'button',
					name: 'provHelp',
					margin: '5 0 0 0',
					iconCls: 'provenanceHelpIcon',
					tooltip: 'Provenance Datasources <br><br><p class="conceptWikiValueColour"> - ConceptWiki </p> ' + '<br><p class="chemspiderValueColour"> - ChemSpider </p>' + '<br><p class="drugbankValueColour"> - Drugbank </p>' + '<br><p class="chemblValueColour"> - Chembl</p>'
				}]
			}, {
				xtype: 'radiogroup',
				fieldLabel: 'Search type',
				itemId: 'searchTypeRadio',
				items: [{
					boxLabel: 'Exact structure search',
					name: 'search_type',
					inputValue: 1,
					checked: true
				}, {
					boxLabel: 'Substructure search',
					name: 'search_type',
					inputValue: 2
				}, {
					boxLabel: 'Structural similarity search',
					name: 'search_type',
					inputValue: 3
				}]
			}, {
				xtype: 'container',
				layout: 'column',
				//fieldLabel:'Search type',
				//itemId:'searchTypeRadioa',
				items: [{
					xtype: 'combobox',
					itemId: 'sim_search_type_id',
					fieldLabel: 'Similarity Threshold Type',
					store: sim_search_type,
					queryMode: 'local',
					displayField: 'sim_type',
					valueField: 'sim_type',
					// labelWidth: 100,
					labelPad: 2,
					padding: '0 2 0 0',
					value: 'Tanimoto'
				}, {
					xtype: 'numberfield',
					itemId: 'tanimoto_threshold_id',
					anchor: '100%',
					name: 'tanimoto_threshold',
					fieldLabel: 'Similarity threshold',
					// step: 5,
					value: 90,
					allowDecimals: false,
					maxValue: 100,
					minValue: 1,
					padding: '0 2 0 0'
				}, {
					xtype: 'numberfield',
					itemId: 'max_records_id',
					anchor: '100%',
					name: 'max_records',
					fieldLabel: 'Maximum records to retrieve',
					step: 20,
					value: 100,
					allowDecimals: false,
					minValue: 20,
					padding: '0 2 0 0'
				}]
			}, {
				xtype: 'button',
				action: 'query',
				itemId: 'sim_sss_start_search_button_id',
				text: 'Start search...'
			}

			]
		}, {
			xtype: 'SimSearchScrollingGrid',
			itemId: 'simSearchGrid',
			title: 'Structure search results',
			gridBaseTitle: 'Structure search results',
			flex: 1
		}];

		this.callParent(arguments);
	},


	setFormData: function(historyTokenObject) {
		//        console.log('SimSearchForm setFormData()');
		//formdata comes directly from form via history
		//load data
		//this needs to be the function that does everything after clicking the button
		//        s = smiles string
		//        st = search type ['exact','substructure','structural']
		if (historyTokenObject.sm) {
			var smilesField = this.down('#smilesField');
			smilesField.setValue(historyTokenObject.sm);
			var searchTypeRadio = this.down('#searchTypeRadio');
			if (historyTokenObject.st) {
				if (historyTokenObject.st == 'exact') {
					searchTypeRadio.setValue({
						search_type: 1
					});
				} else if (historyTokenObject.st == 'sub') {
					searchTypeRadio.setValue({
						search_type: 2
					});
				} else if (historyTokenObject.st == 'sim') {
					searchTypeRadio.setValue({
						search_type: 3
					});
				}
			} else {
				searchTypeRadio.setValue({
					search_type: 1
				});
			}
			this.fireEvent('historyToken', historyTokenObject);
		}


		//        if (historyTokenObject.u) {
		//            //gets ref to
		//            var dg = this.down('#simSearchGrid');
		//            var store = dg.store;
		//            if (historyTokenObject.u != store.proxy.extraParams.compound_uri) {
		//                store.proxy.extraParams.compound_uri = historyTokenObject.u;
		//                store.load({params:{ offset:0, limit:100}});
		//            }
		//        } else if (historyTokenObject.s) {
		//            var lookup = this.down('conceptWikiCompoundLookup');
		//            lookup.setRawValue(historyTokenObject.s);
		//            lookup.doQuery(historyTokenObject.s);
		//        }

	}
});

Ext.define('LSP.controller.SimSearchForm', {
    extend: 'Ext.app.Controller',

    views: ['larkc_sim_search.SimSearchForm', 'mol_editor_forms.KetcherForm', 'dataview.StructureViewer'],
    refs: [{
        ref: 'ssform', // reference to the view
        selector: 'SimSearchForm'
    }, {
        ref: 'strucGrid',
        selector: '#simSearchGrid'
    }, {
        ref: 'submitButton',
        selector: 'SimSearchForm #sim_sss_start_search_button_id'
    }, {
          ref: 'tsvDownloadButton',
          selector: 'SimSearchForm #tsvDownloadProxy_id'
    }, {
	    ref: 'tanimotoThresholdSpinner',
		selector: 'SimSearchForm #tanimoto_threshold_id'
	}, {
	    ref: 'maxRecordsSpinner',
		selector: 'SimSearchForm #max_records_id'
	}, {
		ref: 'SimSearchType',
		selector: 'SimSearchForm #sim_search_type_id'
	}],

    all_records: undefined,

    total_count: 0,

    current_count: 0,

	failed_to_load: 0,
	
	current_smiles: undefined,
	
	current_mode: undefined,

    init: function() {
        console.log('LSP.controller.SimSearchForm: init()');
        this.control({
            'SimSearchForm button[action=ketcher_editor]': {
                click: this.launchKetcher
            },
            'KetcherForm button[action=commit_structure]': {
                click: this.getSmiles
            },
            'SimSearchForm button[action=query]': {
                click: this.submitQuery
            },
            'SimSearchForm': {
                historyToken: this.handleHistoryToken,
                afterrender: this.prepGrid
            },
            'SimSearchForm #provId': {
                change: this.onProvChange
            },
            '#simSearchGrid': {
                itemcontextmenu: function(view, record, itemHTMLElement, index, eventObject, eOpts) {
                    eventObject.preventDefault();
                    //                    console.log('itemcontextmenu');
                    this.getStrucGrid().showMenu(eventObject.getX(), eventObject.getY(), record);
                }
            }
        });


    },    

    setTSVDownloadParams: function() {
        var tsv_download_button = this.getTsvDownloadButton();
        var tsv_download_params = new Array();
        var grid_store = this.getStrucGrid().getStore();
        var items = grid_store.data.items;
        Ext.each(items, function(item, index) {
            tsv_download_params.push("csids[]=" + item.data.csid);
        });
        total_params = tsv_download_params.join("&");
        tsv_download_button.href = cs_download_url + "?" + total_params
        tsv_download_button.setParams();
    },

    prepGrid: function() {
        console.log('LSP.controller.SimSearchForm: prepGrid()');
        var grid = this.getStrucGrid();
        var store = grid.getStore();
		store.removeAll();
        store.on('prefetch', this.storeLoadComplete, this);
    },

    storeLoadComplete: function(store, records, success) {
        console.log('SimSearchForm: storeLoadComplete() ' + this.current_count);
        if (this.current_count == this.total_count) {
            store = Ext.create('Ext.data.store', {
                model: 'LDA.model.SimModel'
            });
            store.add(this.all_records);
            this.getStrucGrid().store = store;
            this.getSubmitButton().enable();
            this.getSsform().doLayout();
            this.getSsform().setLoading(false);
            // TODO should check there are some records first
            this.getStrucGrid().down('#tsvDownloadProxy_id').enable();
            //this.callParent();
        }
    },
    hitCoreAPI: function(csid_list) {
        console.log("SimSearchForm: hitCoreAPI()");
        var me = this;
	this.failed_to_load = 0;
		me.getStrucGrid().getStore().sorters.clear();
        var grid = this.getStrucGrid();
        this.all_records = new Array();
        var csid_store = Ext.create('LDA.store.CompoundStore', {});
        csid_store.proxy.reader = Ext.create('LDA.helper.ChemspiderCompoundReader');
	this.current_count = 0;
        this.total_count = csid_list.length;
        for (var i = 0; i < csid_list.length; i++) {
            csid_store.proxy.extraParams.uri = "http://rdf.chemspider.com/" + csid_list[i];
            csid_store.load(function(records, operation, success) {
                if (success) {
					me.getSsform().setLoading('Fetching compounds....' + me.current_count + ' of ' + me.total_count);
                    // set the index on the record so that the rows will be numbered correctly.
                    // this is a known bug in extjs when adding records dynamically
                    records[0].index = me.current_count;
                    me.current_count++;
                    // There is only 1 compound record returned
                    me.getStrucGrid().getStore().add(records[0]);
                    //me.all_records.push(records[0]);
                    //console.log('Count is now ' + me.current_count);
                    if (me.current_count == me.total_count) {
                        me.getSubmitButton().enable();
                        //me.getSsform().doLayout();
                        me.getSsform().setLoading(false);
                        // TODO should check there are some records first
                        me.getStrucGrid().down('#tsvDownloadProxy_id').enable();
						if (me.failed_to_load > 0) {
							me.getStrucGrid().setTitle(me.getStrucGrid().gridBaseTitle + ' (Failed to load ' + me.failed_to_load + ' records out of ' + me.total_count + ')');
						} else {
							me.getStrucGrid().setTitle(me.getStrucGrid().gridBaseTitle + ' ('  + me.total_count + ' records)');
						}
                        me.setTSVDownloadParams();
                    }
                } else {
                    // keep track of failed requests since they count towards the total
					me.getSsform().setLoading('Fetching compounds....' + me.current_count + ' of ' + me.total_count);
                    me.current_count++;
					me.failed_to_load++;
					if (me.current_count == me.total_count) {
						me.getSubmitButton().enable();
						me.getSsform().setLoading(false);
						me.getStrucGrid().down('#tsvDownloadProxy_id').enable();
						if (me.failed_to_load > 0) {
							me.getStrucGrid().setTitle(me.getStrucGrid().gridBaseTitle + ' (Failed to load ' + me.failed_to_load + ' records out of ' + me.total_count + ')');
						} else {
							me.getStrucGrid().setTitle(me.getStrucGrid().gridBaseTitle + ' ('  + me.total_count + ' records)');
						}					
					}
                }
            });
        }
    },

    handleHistoryToken: function(historyTokenObject) {
        console.log('SimSearchForm: handleHistoryToken() ' + historyTokenObject);
        var me = this;
		me.current_smiles = historyTokenObject.sm;
		me.current_mode = historyTokenObject.st;
        var this_gridview = me.getStrucGrid();
        var current_records = this_gridview.store.getRange();
        //this_gridview.store.remove(current_records);
		this_gridview.store.removeAll();
        // me.getStrucGrid().recordsLoaded = 0;
        var searchEngine = Ext.create('CS.engine.search.Structure', {
            listeners: {
                finished: function(sender, rid) {
                    searchEngine.loadCSIDs(function(csids) {
						if (csids.length == 0) {
							Ext.MessageBox.show({
		                        title: 'Error',
		                        msg: 'Chemspider returned no compounds for this search, please try again with a different structure.',
		                        buttons: Ext.MessageBox.OK,
		                        icon: Ext.MessageBox.ERROR
		                    });
		                    me.getSubmitButton().enable();
	                        me.getSsform().setLoading(false);
						} else {
							me.hitCoreAPI(csids);
						}
                    });
                },
		failed: function(sender, error){
                    Ext.MessageBox.show({
                        title: 'Error',
                        msg: 'There was an error retrieving the list of compounds from Chemspider',
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                        me.getSubmitButton().enable();
                        me.getSsform().setLoading(false);
                        me.getStrucGrid().down('#tsvDownloadProxy_id').disable();
		}
            }
        });

        var grid_title = '';
        var search_type = '';
        var params = {};
        var values = this.getSsform().getValues();
        params['searchOptions.Molecule'] = values.smiles;
        if (values.search_type == '1') { //  Exact structure search
            grid_title = 'Exact structure match';
            search_type = 'exact';
        } else if (values.search_type == '2') { //  SubStructure search
            grid_title = 'Substructure structure';
            search_type = 'substructure';
        } else if (values.search_type == '3') { //  Similarity search
            grid_title = 'Similarity search';
            search_type = 'similarity';
            //  In the future this parameters should be taken from the UI.
            //  But right now in order to make Similarity search more realistic they are entered manually.
			var threshold = this.getTanimotoThresholdSpinner().value;
			params['searchOptions.Threshold'] = threshold/100;
            // params['searchOptions.Threshold'] = 0.99;
            // params['searchOptions.SimilarityType'] = 'Tanimoto';
            params['searchOptions.SimilarityType'] = this.getSimSearchType().value;
        } else {
            //  Unsupported search type...
        }
	// there can also be 'ChEBI' and 'MeSH'
	params['scopeOptions.DataSources[0]'] = 'DrugBank';
	params['scopeOptions.DataSources[1]'] = 'ChEMBL';
	params['scopeOptions.DataSources[2]'] = 'PDB';
        this.getStrucGrid().setTitle(grid_title);
        this.getSsform().setLoading('Fetching compounds....');
		searchEngine.setLimit(this.getMaxRecordsSpinner().value);
        searchEngine.doSearch(search_type, params);
    },

    // Launch ketcher window
    launchKetcher: function(button) {
        // Launch the window
        var view = Ext.widget('KetcherForm');
        // Check to see if we already have a structure to modify and load it if we do
        fields = this.getSsform().form.getFields().items;
        var molfile = '';
        fields.forEach(function(item) {
            if (item.name == 'molfile') {
                molfile = item.getValue();
                var temp = 12;
            }
        });
        if (molfile != '') {
            document.getElementById('ketcher_box_id').contentWindow.ketcher.setMolecule(molfile);
        }
    },

    // Grep smiles from ketcher window and store in smiles field in form
    getSmiles: function(button) {
        var ketcher_window = document.getElementById('ketcher_box_id');
        // smiles is used for query
        smiles = ketcher_window.contentWindow.ketcher.getSmiles();
        // molfile is stored in hidden field for use when updating existing structure
        molfile = ketcher_window.contentWindow.ketcher.getMolfile();
        // We get all fields in form so that we can update the right one
        fields = this.getSsform().form.getFields().items;
        fields.forEach(function(item) {
            if (item.name == 'smiles') {
                item.setValue(smiles)
            } else if (item.name == 'molfile') {
                item.setValue(molfile)
            }
        });
        button.up('KetcherForm').close();
    },

    submitQuery: function(button) {
        console.log(' SimSearchForm: submitQuery()');
		var me = this;
        button.disable();
        var form = button.up('form');
        var values = form.getValues();
        if (values.smiles.length < 4) {
            button.enable();
            return;
        }

        var searchType = 'exact';
        if (values.search_type == 2) {
            searchType = 'sub';
        } else if (values.search_type == 3) {
            searchType = 'sim';
        }
		// history cannot cope with token being the same as it was before
		if (me.current_smiles == values.smiles && me.current_mode == searchType) {
			var this_gridview = me.getStrucGrid();
		    var current_records = this_gridview.store.getRange();
			this_gridview.store.removeAll();
		    var searchEngine = Ext.create('CS.engine.search.Structure', {
		    	listeners: {
		        	finished: function(sender, rid) {
		            	searchEngine.loadCSIDs(function(csids) {
							if (csids.length == 0) {
								Ext.MessageBox.show({
				                	title: 'Error',
				                    msg: 'Chemspider returned no compounds for this search, please try again with a different structure.',
				                    buttons: Ext.MessageBox.OK,
				                    icon: Ext.MessageBox.ERROR
				                });
				                me.getSubmitButton().enable();
			                    me.getSsform().setLoading(false);
							} else {
								me.hitCoreAPI(csids);
							}
		                });
		        	},
					failed: function(sender, error){
		            	Ext.MessageBox.show({
		                	title: 'Error',
		                    msg: 'There was an error retrieving the list of compounds from Chemspider',
		                    buttons: Ext.MessageBox.OK,
		                    icon: Ext.MessageBox.ERROR
		              	});
		                me.getSubmitButton().enable();
		                me.getSsform().setLoading(false);
		                me.getStrucGrid().down('#tsvDownloadProxy_id').disable();
					}
		        }
			});
		    var grid_title = '';
		    var params = {};
		    var values = this.getSsform().getValues();
		    params['searchOptions.Molecule'] = values.smiles;
	        if (values.search_type == '1') { //  Exact structure search
	            grid_title = 'Exact structure match';
	            search_type = 'exact';
	        } else if (values.search_type == '2') { //  SubStructure search
	            grid_title = 'Substructure structure';
	            search_type = 'substructure';
	        } else if (values.search_type == '3') { //  Similarity search
	            grid_title = 'Similarity search';
	            search_type = 'similarity';
	            //  In the future this parameters should be taken from the UI.
	            //  But right now in order to make Similarity search more realistic they are entered manually.
				var threshold = this.getTanimotoThresholdSpinner().value;
				params['searchOptions.Threshold'] = threshold/100;
	            // params['searchOptions.Threshold'] = 0.99;
	            // params['searchOptions.SimilarityType'] = 'Tanimoto';
	            params['searchOptions.SimilarityType'] = this.getSimSearchType().value;
	        } else {
	            //  Unsupported search type...
	        }
			// there can also be 'ChEBI' and 'MeSH'
			params['scopeOptions.DataSources[0]'] = 'DrugBank';
			params['scopeOptions.DataSources[1]'] = 'ChEMBL';
			params['scopeOptions.DataSources[2]'] = 'PDB';
		    me.getStrucGrid().setTitle(grid_title);
		    me.getSsform().setLoading('Fetching compounds....');
			searchEngine.setLimit(this.getMaxRecordsSpinner().value);
		    searchEngine.doSearch(search_type, params);
		} else {
			Ext.History.add('!p=SimSearchForm&sm=' + values.smiles + '&st=' + searchType);
		}
    },

    onProvChange: function(field, newVal, oldVal) {
        var dg = this.getStrucGrid();
        dg.toggleProv(newVal['prov']);
        dg.getView().refresh();
    }
});

/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 12/07/2012
 * Time: 14:10
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LSP.view.pharm_by_target_name2.PharmByTargetNameScrollingGrid', {
        extend:'LSP.view.dynamicgrid.DynamicGrid',
        alias:'widget.PharmByTargetNameScrollingGrid',
        layout:'fit',
        // verticalScrollerType:Ext.create('LDA.helper.DynamicPagingToolbar', {itemId:'pager_id'}),
        disableSelection:true,
        invalidateScrollerOnRefresh:false,
        requires:[
        ],
        listeners:{
            'sortchange':function (ct, column, direction, eOpts) {
                console.log('PharmByTargetNameGrid: sortchange()');
                this.setLoading(true);
            }
        },
        store:'TargetPharmacologyPaginatedStore',
        exportStore:null,
        getExportStore:function () {
            if (this.exportStore == null) {
                this.exportStore = Ext.create('LDA.store.TargetPharmacologyPaginatedStore', {});
            }
            return this.exportStore;
        },
        columns://TODO: removed this rendering because it stops the download as csv from working (this.geCell(record,index) fails with undefined error)
        // defaults:{
        //                 renderer:function (value, metaData, record, rowIndex, colIndex, store, view) {
        //                     if (LDAProvenanceMode != LDA_PROVENANCE_OFF) {
        //                         var data = this.columns[colIndex].dataIndex;
        //                         data += '_src';
        //                         var source = record.data[data];
        //                         var cls = LDA_SRC_CLS_MAPPINGS[source];
        //                         if (!cls) {
        //                             cls = 'defaultValue';
        //                         }
        //                         //                    console.log(data + ' : ' + source + ' : ' + cls);
        //                         cls += LDAProvenanceMode;
        //                         if (LDAProvenanceMode == LDA_PROVENANCE_COLOUR) {
        //                             return '<div class="' + cls + '">' + value + '</div>';
        //                         } else if (LDAProvenanceMode == LDA_PROVENANCE_ICON) {
        //                             //this needs an img adding in
        //                             return '<div class="' + cls + '">' + value + '</div>';
        //                         } else if (LDAProvenanceMode == LDA_PROVENANCE_TEXT) {
        //                             return '<div class="' + cls + '">' + value + ' (' + source + ')</div>';
        //                         }
        //                     } else {
        //                         return value;
        //                     }
        //                 }
        //             },

            [
                {
                    xtype:'rownumberer',
                    width:40
                },
                {
                    //TODO: renderer for chemical structure image (from chemspider?)
                    header:'Structure',
                    dataIndex:'cs_compound_uri',
                    xtype:'templatecolumn',
                    width:135,
                    tpl:'<img width="128" height="128" src="http://www.chemspider.com/ImagesHandler.ashx?id={csid}&w=128&h=128" alt="CSID:{csid}"/>',
                    sortable:false
                },
                {
                    header:'Compound Name',
                    dataIndex:'compound_pref_label',
                    width: 180,
                    renderer:targetProvenanceRenderer,
                    //align:'center',
                    tdCls: 'wrap gridDescriptiveRowPadding'

                },
                {
                    header:'Target Name',
                    dataIndex:'target_pref_label',
                    width: 180,
                    renderer:targetProvenanceRenderer,
                    //align:'center',
                    tdCls: 'wrap gridDescriptiveRowPadding'
                },
                {
                    header:'Target Organism',
                    dataIndex:'target_organism',
                    width: 130,
                    renderer:targetProvenanceRenderer,
                    align:'center',
                    tdCls: 'gridRowPadding'
                },
                {
                    header:'Assay Organism',
                    dataIndex:'assay_organism',
                    tooltip: 'Name of the organism for the assay system (e.g., the organism, tissue or cell line in ' +
                        'which an assay was performed). May differ from the target organism (e.g., for a human protein' +
                        ' expressed in non-human cells, or pathogen-infected human cells)',
                    renderer:targetProvenanceRenderer,
                    align:'center',
                    tdCls: 'gridRowPadding'

                },
                {
                    header:'Assay Description',
                    dataIndex:'assay_description',
                    width: 150,
                    tdCls: 'wrap gridDescriptiveRowPadding',
                    renderer:targetProvenanceRenderer
                    //align:'center'
                },
                {
                    header:'Activity Type',
                    dataIndex:'activity_activity_type',
                    width: 72,
                    renderer:targetProvenanceRenderer,
                    align:'center',
                    tdCls: 'gridRowPadding'

                },
                {
                    header:'Relation',
                    dataIndex:'activity_relation',
                    width: 52,
                    renderer:targetProvenanceRenderer,
                    align:'center',
                    tdCls: 'gridRowPadding'

                },
                {
                    header:'Value',
                    dataIndex:'activity_standard_value',
                    width: 60,
                    renderer:targetProvenanceRenderer,
                    align:'center',
                    tdCls: 'gridRowPadding'
                },
                {
                    header:'Units',
                    dataIndex:'activity_standard_units',
                    width: 60,
                    renderer:targetProvenanceRenderer,
                    align:'center',
                    tdCls: 'gridRowPadding'

                },
                {
                    header:'Mol Weight',
                    dataIndex:'compound_full_mwt',
                    width: 80,
                    renderer:targetProvenanceRenderer,
                    align:'center',
                    tdCls: 'gridRowPadding'

                },
                {
                    header:'SMILES',
                    dataIndex:'compound_smiles',
                    renderer:targetProvenanceRenderer,
                    align:'center',
                    tdCls: 'gridRowPadding'

                },
                {
                    header:'InChi',
                    dataIndex:'compound_inchi',
                    renderer:targetProvenanceRenderer,
                    align:'center',
                    tdCls: 'gridRowPadding'

                },
                {
                    header:'InChi Key',
                    dataIndex:'compound_inchikey',
                    renderer:targetProvenanceRenderer,
                    align:'center',
                    tdCls: 'gridRowPadding'

                }
            ],

        target_prov: false,

        toggleProv:function (val) {
            this.target_prov = val;
            console.log(" Show target provenance : " + this.target_prov);
            this.doLayout();
        }

    }
);

function targetProvenanceRenderer(data, cell, record, rowIndex, columnIndex, store) {
	//console.log("Target Pharmacology provenance renderer");

    //if (LDAProvenanceMode != LDA.helper.LDAConstants.LDA_PROVENANCE_OFF) {
    if (this.target_prov) {

        var recdata = this.columns[columnIndex].dataIndex;
        var itemdata = recdata + '_item';
        recdata += '_src';
        var source = record.data[recdata];
        var cls = LDA.helper.LDAConstants.LDA_SRC_CLS_MAPPINGS[source];
        if (!cls) {
            cls = 'defaultValue';
        }
        var iconCls = cls + 'Icon';
        iconCls = '/assets/' + iconCls + '.png';
        //console.log(iconCls);
        cls += LDAProvenanceMode;
        if (LDAProvenanceMode == LDA.helper.LDAConstants.LDA_PROVENANCE_COLOUR) {

            if (record.data[recdata] && data) {

                // return '<div class="' + cls + '">' + data + '</div>' + '<br>' + record.data[recdata];
                return '<div class="' + cls + '">' + data + '</div>' + '<br>' + '<a href="' + record.data[itemdata] + '" target="_blank">' + '<img src="' + iconCls + '" height="15" width="15"/>' + '</a>';

            } else {

                return '<div class="' + cls + '">' + data + '</div>'

            }

        }
        //else if (LDAProvenanceMode == LDA.helper.LDAConstants.LDA_PROVENANCE_ICON) {
        //this needs an img adding in
        //    return '<div class="' + cls + '">' + data + '</div>';
        //} else if (LDAProvenanceMode == LDA.helper.LDAConstants.LDA_PROVENANCE_TEXT) {
        //    return '<div class="' + cls + '">' + data + ' (' + source + ')</div>';
        //}
    } else {
        return data;
    }
    return data;
}
;

//{
//    header:'Chemspider ID',
//    dataIndex:'cs_compound_uri',
//	sortable:false,
//    renderer:targetProvenanceRenderer,
//    align: 'center'
//},
Ext.define('LSP.view.pharm_by_enzyme_family.PharmByEnzymeFamilyScrollingGrid', {
    extend:'LSP.view.dynamicgrid.DynamicGrid',
        alias:'widget.PharmByEnzymeFamilyScrollingGrid',
        layout:'fit',
 	//verticalScrollerType: Ext.create('LDA.helper.DynamicPagingToolbar',{itemId: 'pager_id'}),
        disableSelection: true,
        invalidateScrollerOnRefresh: false,
        requires:[

        ],
		listeners: {
		    'sortchange': function(ct, column, direction, eOpts ) {
				console.log('PharmByEnzymeFamilyScrollingGrid: sortchange()');
				this.setLoading(true);
		    }
		},
        store:'EnzymeFamilyPaginatedStore',
	exportStore: null,
	getExportStore: function() {
		if (this.exportStore == null) {
			this.exportStore = Ext.create('LDA.store.EnzymeFamilyPaginatedStore', {});
		}
		return this.exportStore;		
	},
        columns:{
            defaults:{
            },

            items:[
				{
					xtype: 'rownumberer',
					width: 40
				},
                {
                    header:'Structure',
                    dataIndex:'cs_compound_uri',
					xtype: 'templatecolumn',
					tpl:'<img width="128" height="128" src="http://www.chemspider.com/ImagesHandler.ashx?id={csid}&w=128&h=128" alt="CSID:{csid}"/>',
                    width:135,
                    sortable:false
                },
                {
                    header:'Compound Name',
                    dataIndex:'compound_pref_label',
                    width: 180,
                    renderer: enzymeProvenanceRenderer,
                    tdCls: 'wrap gridDescriptiveRowPadding'
                },
                {
                    header:'Target Name',
                    dataIndex:'target_title',
                    width: 180,
                    renderer: enzymeProvenanceRenderer,
                    tdCls: 'wrap gridDescriptiveRowPadding'
                },
                {
                    header:'Target Organism',
                    dataIndex:'target_organism',
                    renderer: enzymeProvenanceRenderer,
                    align:'center',
                    tdCls: 'gridRowPadding'
                },
                {
                    header:'Assay Organism',
                    dataIndex:'assay_organism',
                    renderer: enzymeProvenanceRenderer,
                    align:'center',
                    tdCls: 'gridRowPadding'
                },
                {
                    header:'Assay Description',
                    dataIndex:'assay_description',
                    width:200,
                    renderer:enzymeProvenanceRenderer,
                    tdCls:'wrap gridDescriptiveRowPadding'
                },
                {
                    header:'Activity Type',
                    dataIndex:'activity_activity_type',
                    renderer: enzymeProvenanceRenderer,
                    width: 72,
                    align:'center',
                    tdCls: 'gridRowPadding'
                },
                {
                    header:'Relation',
                    dataIndex:'activity_relation',
                    renderer: enzymeProvenanceRenderer,
                    width: 52,
                    align:'center',
                    tdCls: 'gridRowPadding'
                },
                {
                    header:'Value',
                    dataIndex:'activity_standard_value',
                    renderer: enzymeProvenanceRenderer,
                    width: 60,
                    align:'center',
                    tdCls: 'gridRowPadding'
                },
                {
                    header:'Units',
                    dataIndex:'activity_standard_units',
                    renderer: enzymeProvenanceRenderer,
                    width: 60,
                    align:'center',
                    tdCls: 'gridRowPadding'
                },
                {
                    header:'Mol Weight',
                    dataIndex:'compound_full_mwt',
                    renderer: enzymeProvenanceRenderer,
                    align:'center',
                    width: 80,
                    tdCls: 'gridRowPadding'
                },{
                    header:'SMILES',
                    dataIndex:'compound_smiles',
                    renderer: enzymeProvenanceRenderer,
                    align:'center',
                    tdCls: 'gridRowPadding'
                },
                {
                    header:'InChi',
                    dataIndex:'compound_inchi',
                    renderer: enzymeProvenanceRenderer,
                    align:'center',
                    tdCls: 'gridRowPadding'
                },
                {
                    header:'InChi Key',
                    dataIndex:'compound_inchikey',
                    renderer: enzymeProvenanceRenderer,
                    align:'center',
                    tdCls: 'gridRowPadding'
                }
            ]

        },

        enzyme_prov: false,

        toggleProv:function (val) {
            this.enzyme_prov = val;
            console.log(" Show provenance : " + this.enzyme_prov );
            this.doLayout();
        }
    }
);

function enzymeProvenanceRenderer (data, cell, record, rowIndex, columnIndex, store) {
	//console.log("Enzyme Pharmacology provenance renderer");

    //if (LDAProvenanceMode != LDA.helper.LDAConstants.LDA_PROVENANCE_OFF) {
    if (this.enzyme_prov) {

        var recdata = this.columns[columnIndex].dataIndex;
        var itemdata = recdata + '_item';
        recdata += '_src';
        var source = record.data[recdata];
        var cls = LDA.helper.LDAConstants.LDA_SRC_CLS_MAPPINGS[source];
        if (!cls) {
            cls = 'defaultValue';
        }
        var iconCls = cls + 'Icon';
        iconCls = '/assets/' + iconCls + '.png';
        //console.log(iconCls);
        cls += LDAProvenanceMode;
        if (LDAProvenanceMode == LDA.helper.LDAConstants.LDA_PROVENANCE_COLOUR) {

            if (record.data[recdata] && data){

                if (this.columns[columnIndex].dataIndex == 'target_title') {

                    var output = new String();
                    var targetNames = data.split(',');
                    //console.log( ' concat uisl ' + record.data['target_concatenated_uris']);
                    var targetURIs = record.data['target_concatenated_uris'].split(',');
                    var targetBaseURL = 'https://www.ebi.ac.uk/chembl/target/inspect/';
                    Ext.each(targetNames, function (target, index) {

                        var url = targetURIs[index];
                        if (url) {
                            //console.log( ' url ' + url);
                            //var targetId = url.split('/').pop();
                            var linkOut = targetBaseURL + url.split('/').pop();
                            //console.log( "  TARGET NAME " + index + ' ' + target + ' ' +targetURIs[index]  );
                            output += '<div class="' + cls + '">' + target + '</div>' + '<br>' + '<a href="' + linkOut + '" target="_blank">' + '<img src="' + iconCls + '" height="15" width="15"/>' + '</a>';

                        } else {

                            var onlyTarget = targetURIs[0].split('/').pop();
                            var linkOutfirst = targetBaseURL + onlyTarget;
                            output += '<div class="' + cls + '">' + target + '</div>' + '<br>' + '<a href="' + linkOutfirst + '" target="_blank">' + '<img src="' + iconCls + '" height="15" width="15"/>' + '</a>';
                        }

                    });
                    return output;

                }

                // return '<div class="' + cls + '">' + data + '</div>' + '<br>' + record.data[recdata];
                return '<div class="' + cls + '">' + data + '</div>' + '<br>' + '<a href="' + record.data[itemdata] +'" target="_blank">' +'<img src="' + iconCls + '" height="15" width="15"/>' + '</a>';

            } else {

                return '<div class="' + cls + '">' + data + '</div>'

            }

        }
        //else if (LDAProvenanceMode == LDA.helper.LDAConstants.LDA_PROVENANCE_ICON) {
        //this needs an img adding in
        //    return '<div class="' + cls + '">' + data + '</div>';
        //} else if (LDAProvenanceMode == LDA.helper.LDAConstants.LDA_PROVENANCE_TEXT) {
        //    return '<div class="' + cls + '">' + data + ' (' + source + ')</div>';
        //}
    } else {
        return data;
    }
    return data;
};


//{
//    header:'Chemspider ID',
//    dataIndex:'cs_compound_uri',
//	sortable:false
//},

Ext.define('LSP.view.pharm_by_cmpd_name2.PharmByCmpdNameScrollingGrid', {
        extend:'LSP.view.dynamicgrid.DynamicGrid',
        alias:'widget.PharmByCmpdNameScrollingGrid',
        layout:'fit',
        //         verticalScroller: Ext.create('LDA.helper.DynamicPagingToolbar', {
        // 					itemId: 'pager_id',
        // 					store: 'CompoundPharmacologyPaginatedStore'
        // }),
        // verticalScrollerType:Ext.create('LDA.helper.DynamicPagingToolbar', {itemId:'pager_id'}),
        disableSelection:true,
        invalidateScrollerOnRefresh:false,
        requires:[],
        listeners:{
            'sortchange':function (ct, column, direction, eOpts) {
                console.log('PharmByCmpdNameScrollingGrid: sortchange()');
                this.setLoading(true);
            }
        },
        refs:[
            // {
            // 	ref:'pager',
            //         		selector:'#pager_id'
            // }
        ],
        store:'CompoundPharmacologyPaginatedStore',
        exportStore:null,
        getExportStore:function () {
            if (this.exportStore == null) {
                this.exportStore = Ext.create('LDA.store.CompoundPharmacologyPaginatedStore', {});
            }
            return this.exportStore;
        },
        // dockedItems: [{
        //         xtype: 'dynamicpagingtoolbar',
        // 		itemId: 'pager_id',
        //         dock: 'bottom',
        // 		store: 'CompoundPharmacologyPaginatedStore',
        //         displayInfo: true
        //     }],

        columns:[
            {
                xtype:'rownumberer',
                width:40
            },
            {
                //TODO: renderer for chemical structure image (from chemspider?)
                header:'Structure',
                dataIndex:'cs_compound_uri',
                xtype:'templatecolumn',
                width:135,
                tpl:'<img width="128" height="128" src="http://www.chemspider.com/ImagesHandler.ashx?id={csid}&w=128&h=128" alt="CSID:{csid}"/>',
                sortable:false
            },
            {
                header:'Compound Name',
                dataIndex:'compound_pref_label',
                renderer:compoundProvenanceRenderer,
                align:'center',
                tdCls: 'gridRowPadding'

            },
            {
                header:'Target Name',
                width: 180,
                dataIndex:'target_title',
                renderer:compoundProvenanceRenderer,
                tdCls: 'wrap gridDescriptiveRowPadding'
                //align:'center'
            },
            {
                header:'Target Organism',
                dataIndex:'target_organism',
                renderer:compoundProvenanceRenderer,
                align:'center',
                tdCls: 'gridRowPadding'

            },
            {
                header:'Assay Organism',
                dataIndex:'assay_organism',
                renderer: compoundProvenanceRenderer,
                tooltip: 'Name of the organism for the assay system (e.g., the organism, tissue or cell line in ' +
                    'which an assay was performed). May differ from the target organism (e.g., for a human protein' +
                    ' expressed in non-human cells, or pathogen-infected human cells)',
                align:'center',
                tdCls: 'gridRowPadding'
            },
            {
                header:'Assay Description',
                dataIndex:'assay_description',
                width: 200,
                renderer:compoundProvenanceRenderer,
                tdCls: 'wrap gridDescriptiveRowPadding'
                //align:'center'
            },
            {
                header:'Activity Type',
                dataIndex:'activity_activity_type',
                width: 72,
                renderer:compoundProvenanceRenderer,
                align:'center',
                tdCls: 'gridRowPadding'

            },
            {
                header:'Relation',
                width: 52,
                dataIndex:'activity_relation',
                renderer:compoundProvenanceRenderer,
                align:'center',
                tdCls: 'gridRowPadding'

            },
            {
                header:'Value',
                dataIndex:'activity_standard_value',
                width: 60,
                renderer:compoundProvenanceRenderer,
                align:'center',
                tdCls: 'gridRowPadding'

            },
            {
                header:'Units',
                dataIndex:'activity_standard_units',
                width: 60,
                renderer:compoundProvenanceRenderer,
                align:'center',
                tdCls: 'gridRowPadding'

            },
            {
                header:'SMILES',
                dataIndex:'compound_smiles',
                renderer:compoundProvenanceRenderer,
                align:'center',
                tdCls: 'gridRowPadding'

            },
            {
                header:'InChi',
                dataIndex:'compound_inchi',
                renderer:compoundProvenanceRenderer,
                align:'center',
                tdCls: 'gridRowPadding'

            },

            {
                header:'InChi Key',
                dataIndex:'compound_inchikey',
                renderer:compoundProvenanceRenderer,
                align:'center',
                tdCls: 'gridRowPadding'

            }
        ],

        compound_prov: false,

        toggleProv:function (val) {
            this.compound_prov = val;
            console.log(" Show provenance : " + this.compound_prov);
            this.doLayout();
        }
    }
);

function compoundProvenanceRenderer(data, cell, record, rowIndex, columnIndex, store) {
	//console.log("Compound Pharmacology provenance renderer");

    //if (LDAProvenanceMode != LDA.helper.LDAConstants.LDA_PROVENANCE_OFF) {
    if (this.compound_prov) {

        var recdata = this.columns[columnIndex].dataIndex;
        var itemdata = recdata + '_item';
        recdata += '_src';
        var source = record.data[recdata];
        var cls = LDA.helper.LDAConstants.LDA_SRC_CLS_MAPPINGS[source];
        if (!cls) {
            cls = 'defaultValue';
        }
        var iconCls = cls + 'Icon';
        iconCls = '/assets/' + iconCls + '.png';
        //console.log(iconCls);
        cls += LDAProvenanceMode;
        if (LDAProvenanceMode == LDA.helper.LDAConstants.LDA_PROVENANCE_COLOUR) {

            if (record.data[recdata] && data) {

                if (this.columns[columnIndex].dataIndex == 'target_title') {

                    var output = new String();
                    var targetNames = data.split(',');
                    //console.log( ' concat uisl ' + record.data['target_concatenated_uris']);
                    var targetURIs = record.data['target_concatenated_uris'].split(',');
                    var targetBaseURL = 'https://www.ebi.ac.uk/chembl/target/inspect/';
                    Ext.each(targetNames, function (target, index) {

                        var url = targetURIs[index];
                        if (url) {
                            //console.log( ' url ' + url);
                            //var targetId = url.split('/').pop();
                            var linkOut = targetBaseURL + url.split('/').pop();
                            //console.log( "  TARGET NAME " + index + ' ' + target + ' ' +targetURIs[index]  );
                            output += '<div class="' + cls + '">' + target + '</div>' + '<br>' + '<a href="' + linkOut + '" target="_blank">' + '<img src="' + iconCls + '" height="15" width="15"/>' + '</a>';

                        } else {

                            var onlyTarget = targetURIs[0].split('/').pop();
                            var linkOutfirst = targetBaseURL + onlyTarget;
                            output += '<div class="' + cls + '">' + target + '</div>' + '<br>' + '<a href="' + linkOutfirst + '" target="_blank">' + '<img src="' + iconCls + '" height="15" width="15"/>' + '</a>';
                        }

                    });
                    return output;

                }


                // return '<div class="' + cls + '">' + data + '</div>' + '<br>' + record.data[recdata];
                return '<div class="' + cls + '">' + data + '</div>' + '<br>' + '<a href="' + record.data[itemdata] + '" target="_blank">' + '<img src="' + iconCls + '" height="15" width="15"/>' + '</a>';

            } else {

                return '<div class="' + cls + '">' + data + '</div>'

            }

        }
        //else if (LDAProvenanceMode == LDA.helper.LDAConstants.LDA_PROVENANCE_ICON) {
        //this needs an img adding in
        //    return '<div class="' + cls + '">' + data + '</div>';
        //} else if (LDAProvenanceMode == LDA.helper.LDAConstants.LDA_PROVENANCE_TEXT) {
        //    return '<div class="' + cls + '">' + data + ' (' + source + ')</div>';
        //}
    } else {
        return data;
    }
    return data;
}
;


//{
//    header:'Chemspider ID',
//    dataIndex:'cs_compound_uri',
//    sortable:false,
//    renderer: compoundProvenanceRenderer,
//    align: 'center'
//},

var target_condition = Ext.create('Ext.data.Store', {
	fields: ['symbol', 'name'],
	data: [{
		"symbol": "=",
		"name": "="
	}, {
		"symbol": ">",
		"name": ">"
	}, {
		"symbol": "<",
		"name": "<"
	}, {
		"symbol": "<=",
		"name": "<="
	}, {
		"symbol": ">=",
		"name": ">="
	}]
});
Ext.define('LSP.view.pharm_by_target_name2.PharmByTargetNameForm', {
	extend: 'Ext.form.Panel',
	alias: 'widget.PharmByTargetNameForm',
	closable: true,
	// requires: ['LSP.view.dynamicgrid.DynamicGrid'],
    header: false,
    layout: {
		type: 'vbox',
		align: 'stretch'
	},
	// Use a PagingGridScroller (this is interchangeable with a PagingToolbar)
	verticalScrollerType: 'paginggridscroller',
	// do not reset the scrollbar when the view refreshs
	invalidateScrollerOnRefresh: false,
	// infinite scrolling does not support selection
	disableSelection: true,
	initComponent: function() {
		console.log('PharmByTargetNameForm: constructor()');
		this.items = [{
			xtype: 'label',
			html: '<span style="font-family: verdana; color: grey; ">Hint: Type in protein name and species. E.g. \"ADA protein human\"</span>',
			labelWidth: 400,
			padding: '5 0 0 140'
		}, {
			xtype: 'container',
			margin: '0 5 5 5',
			name: 'form_fields',
			layout: {
				type: 'column'
			},
			style: 'background-color: #fff;',
			items: [
			Ext.create('CW.view.ConceptWikiLookup', {
				xtype: 'conceptWikiLookup',
				fieldLabel: 'Protein name',
				itemId: 'pharmByProteinCWLookup',
				store: Ext.create('CW.store.ConceptWikiLookup', {
					proxy: {
						type: 'jsonp',
				        timeout: 5000,
				        url: CW.config.Settings.searchByTagUrl,
				        reader: Ext.create('CW.helper.ConceptWikiJSONReader'),
						extraParams: {
							'branch': 3 // Only show species results from swissprot
						}
					}
				}),
				name: 'protein_uri',
				cwTagUuid: 'eeaec894-d856-4106-9fa1-662b1dc6c6f1' // This is the ConceptWiki tag uuid for proteins. Must be set to use method!
			}),
			{
				xtype: 'button',
				itemId: 'pharmByTargetSubmit_id',
				padding: '5 5 5 5',
				text: 'Search...',
				disabled: true,
				name: 'query_summit_button',
				action: 'query_pharm_by_target_name'
			}]
		}, {
			xtype: 'container',
			margin: '0 5 5 5',
			name: 'filter_fields',
			layout: {
				type: 'column'
			},
			style: 'background-color: #fff;',
			items: [{
				xtype: 'button',
				itemId: 'addFilterButton_id',
				iconCls: 'icon-new',
				padding: '5 5 5 5',
				tooltip: 'Show or hide filter selector',
				action: 'add_filter_form'
			}, {
                xtype: 'label',
                forId: 'addFilterButton_id',
                text: 'Filter',
                margin: '5 5 5 5'
            }, {
				xtype: 'radiogroup',
				width: 200,
				fieldLabel: 'Provenance',
				itemId: 'provId',
				margin: '5 5 5 65',

				items: [{
					boxLabel: 'On',
					name: 'prov',
					inputValue: true
				}, {
					boxLabel: 'Off',
					name: 'prov',
					inputValue: false,
					checked: true
				}]
			}, {
				xtype: 'button',
				name: 'provHelp',
                margin: '5 0 0 0',
                iconCls: 'provenanceHelpIcon',
				tooltip: 'Provenance Datasources <br><br><p class="conceptWikiValueColour"> - ConceptWiki </p> ' + '<br><p class="chemspiderValueColour"> - ChemSpider </p>' + '<br><p class="drugbankValueColour"> - Drugbank </p>' + '<br><p class="chemblValueColour"> - Chembl</p>'
			}]
		}, {
            xtype: 'container',
            margin: '0 5 5 5',
            name: 'filter_selector_container',
	    itemId: 'filterSelectorContainer_id',
	    hidden: true,
            layout: {
                type: 'vbox'
            },
            style: 'background-color: #fff;',
            items: [{xtype: 'container',
            margin: '0 5 5 5',
            name: 'activity_selector_container',
	    itemId: 'activitySelectorContainer_id',
	    hidden: false,
            layout: {
                type: 'hbox'
            },
            style: 'background-color: #fff;',
            items: [{
		xtype: 'combobox',
		itemId: 'activity_combobox_id',
		fieldLabel: 'Activity Type',
		store: Ext.create('LDA.store.FilterActivityStore', {}),
		queryMode: 'remote',
		displayField: 'activity_type',
		valueField: 'activity_type',
		labelWidth: 100,
		labelPad: 2,
		padding: '0 2 0 0',
		emptyText: 'Use drop down...',
		editable: false
	}, {
		xtype: 'combobox',
		itemId: 'conditions_combobox_id',
		fieldLabel: 'Conditions',
		store: target_condition,
		queryMode: 'local',
		displayField: 'symbol',
		valueField: 'name',
		labelWidth: 70,
		labelPad: 2,
		padding: '0 2 0 0',
		emptyText: 'Use drop down...',
		editable: false
	}, {
		xtype: 'textfield',
		itemId: 'value_textfield_id',
		name: 'value',
		fieldLabel: 'Value',
		allowBlank: false,
		labelWidth: 50,
		labelPad: 2,
		padding: '0 2 0 0',
		emptyText: 'Enter a value...'
		// requires a non-empty value
	}, {
		xtype: 'combobox',
		itemId: 'unit_combobox_id',
		fieldLabel: 'Unit',
		store: Ext.create('Ext.data.Store', {
			model: 'LSP.model.unit',
			fields: ['unit', 'name']
		}),
		queryMode: 'local',
		displayField: 'unit',
		valueField: 'name',
		labelWidth: 50,
		labelPad: 2,
		padding: '0 10 0 0',
		emptyText: 'Use drop down...',
		editable: false
	}, {
		xtype: 'button',
		itemId: 'addCompletedActivityFilter_id',
		iconCls: 'icon-new',
		padding: '5 5 5 5',
		tooltip: 'Add this activity filter',
		action: 'add_completed_activity_filter'
	}]}, {
            xtype: 'OrganismFilterForm',
            itemId: 'organismFilterContainer_id',
            margin: '0 5 5 5',
            name: 'organism_filter_fields',
            hidden: false
}]}, {
			xtype: 'container',
			itemId: 'completedFilterContainer_id',
			margin: '0 5 5 5',
			name: 'completed_filter_container',
			hidden: true
		}, {
			xtype: 'PharmByTargetNameScrollingGrid',
			itemId: 'pharmByTargetNameGrid',
			title: 'Pharmacology by Target name search results',
			gridBaseTitle: 'Pharmacology by Target name search results',
			flex: 1
		}];
		this.callParent(arguments);
	}
});

Ext.define('LSP.model.Organism', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'name',     type: 'string'},
        {name: 'abbr',      type: 'string'}
    ]
});
var assay_organism = Ext.create('Ext.data.Store', {
     model: 'LSP.model.Organism',
     proxy: {
         type: 'ajax',
         url: '/core_api_calls/organisms.json',
         model: 'LSP.model.Organism',
         reader: {
             type: 'json'
         }
     }
 });
//var assay_organism = Ext.create('Ext.data.Store', {
//	fields: ['abbr', 'name'],
//	data: [{
//		"abbr": "Homo sapiens",
//		"name": "Homo sapiens"
//	}, {
//		"abbr": "Mus musculus",
//		"name": "Mus musculus"
//	}, {
//		"abbr": "Rattus norvegicus",
//		"name": "Rattus norvegicus"
//	}, {
//		"abbr": "Cavia porcellus",
//		"name": "Cavia porcellus"
//	}, {
//		"abbr": "Equus caballus",
//		"name": "Equus caballus"
//	}, {
//		"abbr": "Ovis aries",
//		"name": "Ovis aries"
//	}]
//});
Ext.define('LSP.view.filter.OrganismFilterForm', {
	extend: 'Ext.container.Container',
	alias: 'widget.OrganismFilterForm',
	closable: true,
	layout: {
		type: 'hbox'
	},
	refs: [{
		ref: 'organism_combobox',
		selector: '#organism_combobox_id'
	}, {
		ref: 'organism_textfield',
		selector: '#organism_textfield_id'
	}],
	headerPosition: 'right',
	frame: true,
	padding: '0 0 5 0',
	items: [{
		xtype: 'combobox',
		itemId: 'organism_combobox_id',
		fieldLabel: 'Assay Organism',
		store: assay_organism,
		queryMode: 'remote',
		displayField: 'abbr',
		valueField: 'name',
		labelWidth: 100,
		width: 400,
		labelPad: 2,
		padding: '0 2 0 0',
		emptyText: 'Enter the name of an organism...',
    		minChars:3,
    		hideTrigger:true,
    		listConfig:{
        		emptyText:'No organisms found which match your text, try entering some different text.'
		}
	}, {
		xtype: 'button',
		itemId: 'addCompletedOrganismFilter_id',
		iconCls: 'icon-new',
		padding: '5 5 5 5',
		tooltip: 'Add this organism filter',
		action: 'add_completed_organism_filter'
	}]
});

Ext.define('LDA.model.FilterActivityModel', {
    extend:'Ext.data.Model',
    fields:['activity_type', 'about']
});

Ext.define('LDA.store.FilterActivityStore', {
    extend:'LDA.store.basestores.BaseStore',
    model:'LDA.model.FilterActivityModel',
    storeId:'FilterActivityStore',
    BASE_URL: ldaBaseUrl + '/pharmacology/filters/activities?',

    constructor:function (config, arguments) {
		console.log('LDA.store.FilterActivityStore: constructor()');
        this.proxy.reader = Ext.create('LDA.helper.FilterActivityReader');
        this.callParent(arguments);
    }
});

Ext.define('LSP.controller.PharmByTargetNameForm', {
    extend: 'LSP.controller.grids.DynamicGrid',

    views: ['pharm_by_target_name2.PharmByTargetNameForm', 'pharm_by_target_name2.PharmByTargetNameScrollingGrid'],
    // views:['pharm_by_target_name2.PharmByTargetNameForm', 'pharm_by_target_name2.PharmByTargetNameGrid'],
    // stores: ['LDA.store.TargetPharmacologyPaginatedStore'],
    refs: [{
        ref: 'gridView', // reference to the view
        selector: '#pharmByTargetNameGrid'
    }, {
        ref: 'formView',
        selector: 'PharmByTargetNameForm'
    }, {
        ref: 'lookup',
        selector: 'conceptWikiProteinLookup'
    }, {
        ref: 'submitButton',
        selector: '#pharmByTargetSubmit_id'

    }, {
        ref: 'filterContainer',
        selector: 'PharmByTargetNameForm #filterSelectorContainer_id'
    }, {
		ref: 'unitsCombo',
		selector: 'PharmByTargetNameForm #unit_combobox_id'
    }, {
          ref: 'tsvDownloadButton',
          selector: 'PharmByTargetNameForm #tsvDownloadProxy_id'
        }],
    filters: undefined,
    current_uri: undefined,

    init: function() {
        console.log('PharmByTargetNameForm: init()');
        this.control({
            'PharmByTargetNameForm button[action=query_pharm_by_target_name]': {
                click: this.submitQuery
            },
            'PharmByTargetNameForm conceptWikiLookup': {
                select: this.enableSubmit
            },
            'PharmByTargetNameForm': {
                afterrender: this.prepGrid,
                historyToken: this.handleHistoryToken
            },
            'PharmByTargetNameForm button[action=add_filter_form]': {
                click: this.addFilterForm
            },
            'PharmByTargetNameForm button[action=add_completed_organism_filter]': {
                click: this.addCompletedOrganismFilter
            },
            'PharmByTargetNameForm button[action=add_completed_activity_filter]': {
                click: this.addCompletedActivityFilter
            },
            'PharmByTargetNameForm #provId': {
                change: this.onProvChange
            },
            'PharmByTargetNameForm #activity_combobox_id': {
                select: this.comboSelect,
                scope: this
            }
        });
    },

   comboSelect: function(combo, records, eOpts) {
	var activity = records[0].get('activity_type');
	// only fetch new units if the selected activity is different than before
	if (this.current_activity_combo_select != activity) {
		var units_store = this.getUnitsCombo().getStore();
		this.getUnitsCombo().clearValue();
		units_store.removeAll();
		this.current_activity_combo_select = activity;
		var filter_units_store = Ext.create('LDA.store.FilterUnitsStore',{activity_type: activity});
        	filter_units_store.load(function(records, operation, success) {
				store_records = records;
				store_operation = operation;
				store_success = operation.success;
				if (store_success) {
				    Ext.each(records, function (record, index) {
                                        unit = Ext.create('LSP.model.Unit', {unit: record.data.unit, name: record.data.unit});
                                        units_store.add(unit);		
				    });
				}
        	});
	}
   },

    handleHistoryToken: function(historyTokenObject) {
        if (historyTokenObject.u) {
            var dg = this.getGridView();
            var store = dg.store;
            if (historyTokenObject.u != store.proxy.extraParams.uri) {
                // Setting the value in the Concept Wiki dropdown to the one defined by the uuid
                var cw_controller = this.getController("CW.controller.ConceptWikiLookup"); 
                var cw_dropdown = this.getFormView().down('conceptWikiLookup');
                cw_controller.setConcept(historyTokenObject.u,cw_dropdown);
                // Setting the uri for the LDA search
                this.current_uri = historyTokenObject.u;
                store.proxy.extraParams.uri = historyTokenObject.u;
                store.proxy.reader.uri = historyTokenObject.u;
                //store.setURI(historyTokenObject.u);
                dg.setLoading(true);
                this.fetchTotalResults();
                // store.load();
            }
        } else if (historyTokenObject.s) {
            var lookup = this.getLookup();
            lookup.setRawValue(historyTokenObject.s);
            lookup.doQuery(historyTokenObject.s);
        }
    },

    getCountStore: function() {
        return Ext.create('LDA.store.TargetPharmacologyCountStore');
    },

    submitQuery: function(button) {
		var dg = this.getGridView();
		var store = dg.store;
		// remove the sort column if there was any
        store.sort_column = undefined;
        var form = button.up('form');
        button.disable();
        var values = form.getValues();
        if (this.current_uri == values.protein_uri) {
            store.proxy.extraParams.uri = this.current_uri;
            store.proxy.reader.uri = this.current_uri;
            //store.setURI(this.current_uri);
            dg.setLoading(true);
            //loading the store is done after the total results are fetched
            this.fetchTotalResults();
        } else {
            Ext.History.add('!p=PharmByTargetNameForm&u=' + values.protein_uri);
        }
    }

});

Ext.define('LDA.helper.FilterActivityReader', {
    extend: 'Ext.data.reader.Json',
    requires: ['LDA.helper.LDAConstants'],

    readRecords: function(data) {
        var pt = data['result']['primaryTopic'];
        var activities = pt['normalised_activity_type'];
        var records = new Array();

        Ext.each(activities, function(match, index) {
            var about = match[LDA.helper.LDAConstants.LDA_ABOUT];
            var label = match[LDA.helper.LDAConstants.LDA_LABEL];
            var record = Ext.create('LDA.model.FilterActivityModel', {
                activity_type: label,
                about: about
            });
            records.push(record);
        });

        return new Ext.data.ResultSet({
            total: records.length,
            count: records.length,
            records: records,
            success: true,
            message: 'loaded'
        });
    }
});

// The data store containing the list of states
var activity_type = Ext.create('LDA.store.FilterActivityStore', {});
var condition = Ext.create('Ext.data.Store', {
	fields: ['symbol', 'name'],
	data: [{
		"symbol": "=",
		"name": "="
	}, {
		"symbol": ">",
		"name": ">"
	}, {
		"symbol": "<",
		"name": "<"
	}, {
		"symbol": "<=",
		"name": "<="
	}, {
		"symbol": ">=",
		"name": ">="
	}
	// TODO this part of the ui is conflating ideas I think. all is for the relation part of the results not the activity type
	//, {
	//	"symbol": "all",
	//	"name": "all"
	//}
	]
});
// no need for the units at the moment, it is handled automatically by the api depending on whether
// it is Potency or IC50 (the only allowed values at the moment)
var unit = Ext.create('Ext.data.Store', {
	fields: ['unit', 'name']
});
Ext.define('LSP.view.filter.ActivityFilterForm', {
	extend: 'Ext.container.Container',
	alias: 'widget.ActivityFilterForm',
	closable: true,
	layout: {
		type: 'hbox'
	},
	refs:[
            {
                ref:'activity_combobox', // reference to the view
                selector:'#activity_combobox_id'
            },
            {
                ref:'conditions_combobox',
                selector:'#conditions_combobox_id'
            },
            {
                ref:'value_textfield',
                selector:'#value_textfield_id'
            },
            //{
            //    ref:'unit_combobox',
            //    selector:'#unit_combobox_id'
            //}
        ],
	headerPosition: 'right',
	frame: true,
	padding: '0 0 5 0',
	items: [{
		xtype: 'combobox',
		itemId: 'activity_combobox_id',
		fieldLabel: 'Activity Type',
		store: activity_type,
		queryMode: 'remote',
		displayField: 'activity_type',
		valueField: 'activity_type',
		labelWidth: 100,
		labelPad: 2,
		padding: '0 2 0 0'
	}, {
		xtype: 'combobox',
		itemId: 'conditions_combobox_id',
		fieldLabel: 'Conditions',
		store: condition,
		queryMode: 'local',
		displayField: 'symbol',
		valueField: 'name',
		labelWidth: 70,
		labelPad: 2,
		padding: '0 2 0 0'
	}, {
		xtype: 'textfield',
		itemId: 'value_textfield_id',
		name: 'value',
		fieldLabel: 'Value',
		allowBlank: false,
		labelWidth: 50,
		labelPad: 2,
		padding: '0 2 0 0'
		// requires a non-empty value
	}, {
		xtype: 'combobox',
		itemId: 'unit_combobox_id',
		fieldLabel: 'Unit',
		store: Ext.create('Ext.data.Store', {
			model: 'LSP.model.unit',
			fields: ['unit', 'name']
		}),
		queryMode: 'local',
		displayField: 'unit',
		valueField: 'name',
		labelWidth: 50,
		labelPad: 2,
		padding: '0 10 0 0'
	}, {
		xtype: 'button',
		itemId: 'addCompletedActivityFilter_id',
		iconCls: 'icon-new',
		padding: '5 5 5 5',
		tooltip: 'Add this activity filter',
		action: 'add_completed_activity_filter'
	}]
});

/*########################################################################################
 #
 #  Copyright H. Lundbeck A/S
 #  This file is part of LSP4All.
 #
 #  LSP4All is free software; you can redistribute it and/or modify
 #  it under the terms of the GNU General Public License as published by
 #  the Free Software Foundation; either version 2 of the License, or (at
 #  your option) any later version.
 #
 #  LSP4All IS MADE AVAILABLE FOR DISTRIBUTION WITHOUT ANY FORM OF WARRANTY TO THE
 #  EXTENT PERMITTED BY APPLICABLE LAW.  THE COPYRIGHT HOLDER PROVIDES THE PROGRAM \"AS IS\"
 #  WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT
 #  LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 #  PURPOSE. THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM LIES
 #  WITH THE USER.  SHOULD THE PROGRAM PROVE DEFECTIVE IN ANY WAY, THE USER ASSUMES THE
 #  COST OF ALL NECESSARY SERVICING, REPAIR OR CORRECTION. THE COPYRIGHT HOLDER IS NOT
 #  RESPONSIBLE FOR ANY AMENDMENT, MODIFICATION OR OTHER ENHANCEMENT MADE TO THE PROGRAM
 #  BY ANY USER WHO REDISTRIBUTES THE PROGRAM SO AMENDED, MODIFIED OR ENHANCED.
 #
 #  IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING WILL THE
 #  COPYRIGHT HOLDER BE LIABLE TO ANY USER FOR DAMAGES, INCLUDING ANY GENERAL, SPECIAL,
 #  INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR INABILITY TO USE THE
 #  PROGRAM (INCLUDING BUT NOT LIMITED TO LOSS OF DATA OR DATA BEING RENDERED INACCURATE
 #  OR LOSSES SUSTAINED BY THE USER OR THIRD PARTIES OR A FAILURE OF THE PROGRAM TO
 #  OPERATE WITH ANY OTHER PROGRAMS), EVEN IF SUCH HOLDER HAS BEEN ADVISED OF THE
 #  POSSIBILITY OF SUCH DAMAGES.
 #
 #  You should have received a copy of the GNU General Public License
 #  along with this program; if not, write to the Free Software
 #  Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.
 #
 ########################################################################################*/

Ext.define('LSP.view.Enzymetree', {
    extend:'Ext.tree.Panel',
    alias:'widget.enzymeTree',


    requires:[
        'Ext.data.*',
        'Ext.grid.*',
        'Ext.tree.*'
    ],


    singleExpand:true,
    //simpleSelect: true,
    multiSelect:false,
    rootVisible:false,
    useArrows:true,
    frame:true,
    height:550,
    autoScroll:true,
    columns:[
        {
            xtype:'treecolumn', //this is so we know which column will show the tree
            text:'EC number',
            sortable:true,
            dataIndex:'ec_number',
            width:160
        },
        {
            text:'Enzyme family name',
            dataIndex:'name',
            width:290
        }
    ],


    initComponent:function () {
	    console.log('EnzymeTree: initComponent()');
        var config = {
            store:{
                fields:[
                    {name:'ec_number', type:'string', sortDir:'ASC'},
                    {name:'name', type:'string'}
                ],
                proxy:{
                    type:'ajax',
                    api:{
                        read:'enzymes.json'
                    },
                    reader:{
                        type:'json',
                        root:'objects',
                        totalProperty:'totalCount'
                    }
                },
                sorters:[
                    {
                        property:'ec_number',
                        direction:'ASC'
                    }
                ],
                sortOnLoad:true
            }
            // autoLoad: 'enzymes.json',
            // folderSort: true
        };

        Ext.apply(this, config);
        Ext.apply(this.initialConfig, config);
        this.callParent(arguments);
    }
});
// The data store containing the list of states
//var compound_activity_type = Ext.create('LDA.store.FilterActivityStore', {});
var compound_condition = Ext.create('Ext.data.Store', {
	fields: ['symbol', 'name'],
	data: [{
		"symbol": "=",
		"name": "="
	}, {
		"symbol": ">",
		"name": ">"
	}, {
		"symbol": "<",
		"name": "<"
	}, {
		"symbol": "<=",
		"name": "<="
	}, {
		"symbol": ">=",
		"name": ">="
	}
	// TODO this part of the ui is conflating ideas I think. all is for the relation part of the results not the activity type
	//, {
	//	"symbol": "all",
	//	"name": "all"
	//}
	]
});
Ext.define('LSP.view.pharm_by_cmpd_name2.PharmByCmpdNameForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.PharmByCmpdNameForm',
    closable: true,
    requires: ['LSP.view.filter.ActivityFilterForm', 'LSP.view.filter.OrganismFilterForm'],
    header: false,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    // Use a PagingGridScroller (this is interchangeable with a PagingToolbar)
    // verticalScrollerType: 'dynamicpagingtoolbar',
    // do not reset the scrollbar when the view refreshs
    invalidateScrollerOnRefresh: false,
    // infinite scrolling does not support selection
    disableSelection: true,
    initComponent: function() {
        console.log('PharmByCmpdNameForm: initComponent()');
        this.items = [{
            xtype: 'label',
            html: '<span style="font-family: verdana; color: grey; ">Hint: Type in compound name. E.g. \"Aspirin\"</span>',
            labelWidth: 400,
            padding: '5 0 0 140'
        }, {
            xtype: 'container',
            margin: '0 5 5 5',
            name: 'form_fields',
            layout: {
                type: 'column'
            },
            style: 'background-color: #fff;',
            items: [{
                name: 'cmpd_uuid',
                xtype: 'hidden',
                value: ''
            },
            Ext.create('CW.view.ConceptWikiLookup', {
                           xtype: 'conceptWikiLookup',
                           fieldLabel: 'Compound name',
                           itemId: 'pharmByCompoundCWLookup',
                           store: Ext.create('CW.store.ConceptWikiLookup', {
                               proxy: {
                                   type: 'jsonp',
                                   timeout: 5000,
                                   url: CW.config.Settings.searchByTagUrl,
                                   reader: Ext.create('CW.helper.ConceptWikiJSONReader'),
                                   extraParams: {
                                       'branch': 4 // Only show species results from swissprot
                                   }
                               }
                           }),
                           name: 'compound_uri',
                           cwTagUuid: '07a84994-e464-4bbf-812a-a4b96fa3d197' // This is the ConceptWiki tag uuid for proteins. Must be set to use method!
                       }), {
                xtype: 'button',
                itemId: 'pharmByCmpdSubmit_id',
                padding: '5 5 5 5',
                text: 'Search...',
                disabled: true,
                action: 'query_pharm_by_cmpd_name'
            }]
        }, {
            xtype: 'container',
            margin: '0 5 5 5',
            name: 'filter_fields',
            layout: {
                type: 'column'
            },
            style: 'background-color: #fff;',
            items: [{
                xtype: 'button',
                itemId: 'addFilterButton_id',
                iconCls: 'icon-new',
                padding: '5 5 5 5',
                tooltip: 'Show or hide filter selector',
                action: 'add_filter_form'
            }, {
                xtype: 'label',
                forId: 'addFilterButton_id',
                text: 'Filter',
                margin: '5 5 5 5'
            }, {
                xtype: 'radiogroup',
                width: 200,
                fieldLabel: 'Provenance',
                itemId: 'provId',
                margin: '5 5 5 65',

                items: [{
                    boxLabel: 'On',
                    name: 'prov',
                    inputValue: true
                }, {
                    boxLabel: 'Off',
                    name: 'prov',
                    inputValue: false,
                    checked: true
                }]
            }, {
                xtype: 'button',
                name: 'provHelp',
                margin: '5 0 0 0',
                iconCls: 'provenanceHelpIcon',
                tooltip: 'Provenance Datasources <br><br><p class="conceptWikiValueColour"> - ConceptWiki </p> ' + '<br><p class="chemspiderValueColour"> - ChemSpider </p>' + '<br><p class="drugbankValueColour"> - Drugbank </p>' + '<br><p class="chemblValueColour"> - Chembl</p>'
            }]
        },  {
            xtype: 'container',
            margin: '0 5 5 5',
            name: 'filter_selector_container',
	    itemId: 'filterSelectorContainer_id',
	    hidden: true,
            layout: {
                type: 'vbox'
            },
            style: 'background-color: #fff;',
            items: [

{xtype: 'container',
            margin: '0 5 5 5',
            name: 'activity_selector_container',
	    itemId: 'activitySelectorContainer_id',
	    hidden: false,
            layout: {
                type: 'hbox'
            },
            style: 'background-color: #fff;',
            items: [
{
		xtype: 'combobox',
		itemId: 'activity_combobox_id',
		fieldLabel: 'Activity Type',
		store: Ext.create('LDA.store.FilterActivityStore', {}),
		queryMode: 'remote',
		displayField: 'activity_type',
		valueField: 'activity_type',
		labelWidth: 100,
		labelPad: 2,
		padding: '0 2 0 0',
		emptyText: 'Use drop down...',
		editable: false
	}, {
		xtype: 'combobox',
		itemId: 'conditions_combobox_id',
		fieldLabel: 'Conditions',
		store: compound_condition,
		queryMode: 'local',
		displayField: 'symbol',
		valueField: 'name',
		labelWidth: 70,
		labelPad: 2,
		padding: '0 2 0 0',
		emptyText: 'Use drop down...',
		editable: false
	}, {
		xtype: 'textfield',
		itemId: 'value_textfield_id',
		name: 'value',
		fieldLabel: 'Value',
		allowBlank: false,
		labelWidth: 50,
		labelPad: 2,
		padding: '0 2 0 0',
		emptyText: 'Enter a value...'
		// requires a non-empty value
	}, {
		xtype: 'combobox',
		itemId: 'unit_combobox_id',
		fieldLabel: 'Unit',
		store: Ext.create('Ext.data.Store', {
			model: 'LSP.model.unit',
			fields: ['unit', 'name']
		}),
		queryMode: 'local',
		displayField: 'unit',
		valueField: 'name',
		labelWidth: 50,
		labelPad: 2,
		padding: '0 10 0 0',
		emptyText: 'Use drop down...',
		editable: false
	}, {
		xtype: 'button',
		itemId: 'addCompletedActivityFilter_id',
		iconCls: 'icon-new',
		padding: '5 5 5 5',
		tooltip: 'Add this activity filter',
		action: 'add_completed_activity_filter'
	}]},{
            xtype: 'OrganismFilterForm',
            itemId: 'organismFilterContainer_id',
            margin: '0 5 5 5',
            name: 'organism_filter_fields',
            hidden: false
}]}, {
            xtype: 'container',
            itemId: 'completedFilterContainer_id',
            margin: '0 5 5 5',
            name: 'completed_filter_container',
            hidden: true
        }, {
            xtype: 'PharmByCmpdNameScrollingGrid',
            itemId: 'pharmByCmpdNameGrid',
            title: 'Pharmacology by Compound name search results',
            gridBaseTitle: 'Pharmacology by Compound name search results',
            flex: 1
        }];
        this.callParent(arguments);
    }

});

Ext.define('LSP.controller.PharmByCmpdNameForm', {
	extend: 'LSP.controller.grids.DynamicGrid',
	views: ['pharm_by_cmpd_name2.PharmByCmpdNameForm', 'pharm_by_cmpd_name2.PharmByCmpdNameScrollingGrid'],
	// stores: ['LDA.store.CompoundPharmacologyPaginatedStore', 'LDA.store.CompoundPharmacologyStore'],
	// views:['pharm_by_cmpd_name2.PharmByCmpdNameForm', 'pharm_by_cmpd_name2.PharmByCmpdNameGrid'],
	refs: [{
		ref: 'gridView',
		// reference to the view
		selector: '#pharmByCmpdNameGrid'
	}, {
		ref: 'formView',
		selector: 'PharmByCmpdNameForm'
	}, {
		ref: 'submitButton',
		selector: '#pharmByCmpdSubmit_id'
	}, {
		ref: 'nextRecordsButton',
		selector: 'PharmByCmpdNameForm dynamicgrid3 #nextRecords'
	}, {
		ref: 'lookup',
		selector: 'PharmByCmpdNameForm #pharmByCompoundCWLookup'
	}, {
		ref: 'filterContainer',
		selector: 'PharmByCmpdNameForm #filterSelectorContainer_id'
	}, {
		ref: 'unitsCombo',
		selector: 'PharmByCmpdNameForm #unit_combobox_id'
	}, {
          ref: 'tsvDownloadButton',
          selector: 'PharmByCmpdNameForm #tsvDownloadProxy_id'
        }],
	filters: undefined,
	current_uri: undefined,
	current_activity_combo_select: undefined,

	init: function() {
		console.log('PharmByCmpdNameForm: init()');
		this.control({
			'PharmByCmpdNameForm button[action=query_pharm_by_cmpd_name]': {
				click: this.submitQuery
			},
			'PharmByCmpdNameForm conceptWikiLookup': {
				select: this.enableSubmit
			},
			'PharmByCmpdNameForm': {
				historyToken: this.handleHistoryToken,
				afterrender: this.prepGrid
			},
			'PharmByCmpdNameForm button[action=add_filter_form]': {
				click: this.addFilterForm
			},
			'PharmByCmpdNameForm button[action=add_completed_organism_filter]': {
				click: this.addCompletedOrganismFilter
			},
			'PharmByCmpdNameForm button[action=add_completed_activity_filter]': {
				click: this.addCompletedActivityFilter
			},
            'PharmByCmpdNameForm #provId' : {
                change: this.onProvChange
            },
            'PharmByCmpdNameForm #activity_combobox_id': {
                select: this.comboSelect,
                scope: this
            }
		});
	},
	
   comboSelect: function(combo, records, eOpts) {
	var activity = records[0].get('activity_type');
	// only fetch new units if the selected activity is different than before
	if (this.current_activity_combo_select != activity) {
		var units_store = this.getUnitsCombo().getStore();
		this.getUnitsCombo().clearValue();
		units_store.removeAll();
		this.current_activity_combo_select = activity;
		var filter_units_store = Ext.create('LDA.store.FilterUnitsStore',{activity_type: activity});
        	filter_units_store.load(function(records, operation, success) {
				store_records = records;
				store_operation = operation;
				store_success = operation.success;
				if (store_success) {
				    Ext.each(records, function (record, index) {
                                        unit = Ext.create('LSP.model.Unit', {unit: record.data.unit, name: record.data.unit});
                                        units_store.add(unit);		
				    });
				}
        	});
	}
   },

	prepCSVFile: function(csv_prep_button) {
		console.log('PharmByCmpdNameForm: prepCSVFile()');
		this.callParent(csv_prep_button);
	},

	handleHistoryToken: function(historyTokenObject) {
		console.log('PharmByCmpdNameForm: handleHistoryToken()');
		if (historyTokenObject.u) {
			var dg = this.getGridView();
			var store = dg.store;
			if (historyTokenObject.u != store.proxy.extraParams.uri) {
			  // Setting the value in the Concept Wiki dropdown to the one defined by the uuid
        var cw_controller = this.getController("CW.controller.ConceptWikiLookup"); 
        var cw_dropdown = this.getFormView().down('conceptWikiLookup');
        cw_controller.setConcept(historyTokenObject.u,cw_dropdown);
        // Setting the uri for the LDA search
				this.current_uri = historyTokenObject.u;
				store.proxy.extraParams.uri = historyTokenObject.u;
				store.proxy.reader.uri = historyTokenObject.u;
				// This was originally set so that the TSV download could retrieve the uri
				// However, it causes the store to send 2 uri params, no idea why. Possibly
				// the store sends any configs that are not defaults as params?. The uri is stored in the
				// proxy extraParams so use that.
				//store.setURI(historyTokenObject.u);
				dg.setLoading(true);
				//loading the store is done after the total results are fetched
				this.fetchTotalResults();
				// store.load();
			}
		} else if (historyTokenObject.s) {
			var lookup = this.getLookup();
			lookup.setRawValue(historyTokenObject.s);
			lookup.doQuery(historyTokenObject.s);
		}
	},

	getCountStore: function() {
		return Ext.create('LDA.store.CompoundPharmacologyCountStore');
	},

	submitQuery: function(button) {
		console.log('PharmByCmpdNameForm: submitQuery()');
		var dg = this.getGridView();
		var store = dg.store;
		// remove the sort column if there was any
        store.sort_column = undefined;
		var form = button.up('form');
		button.disable();
		var values = form.getValues();
		if (this.current_uri == values.compound_uri) {
			store.proxy.extraParams.uri = this.current_uri;
			store.proxy.reader.uri = this.current_uri;
			//store.setURI(this.current_uri);
			dg.setLoading(true);
			//loading the store is done after the total results are fetched
			this.fetchTotalResults();
		} else {
			Ext.History.add('!p=PharmByCmpdNameForm&u=' + values.compound_uri);
		}
	}

});



/*########################################################################################
 #
 #  Copyright H. Lundbeck A/S
 #  This file is part of LSP4All.
 #
 #  LSP4All is free software; you can redistribute it and/or modify
 #  it under the terms of the GNU General Public License as published by
 #  the Free Software Foundation; either version 2 of the License, or (at
 #  your option) any later version.
 #
 #  LSP4All IS MADE AVAILABLE FOR DISTRIBUTION WITHOUT ANY FORM OF WARRANTY TO THE
 #  EXTENT PERMITTED BY APPLICABLE LAW.  THE COPYRIGHT HOLDER PROVIDES THE PROGRAM \"AS IS\"
 #  WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT
 #  LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 #  PURPOSE. THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM LIES
 #  WITH THE USER.  SHOULD THE PROGRAM PROVE DEFECTIVE IN ANY WAY, THE USER ASSUMES THE
 #  COST OF ALL NECESSARY SERVICING, REPAIR OR CORRECTION. THE COPYRIGHT HOLDER IS NOT
 #  RESPONSIBLE FOR ANY AMENDMENT, MODIFICATION OR OTHER ENHANCEMENT MADE TO THE PROGRAM
 #  BY ANY USER WHO REDISTRIBUTES THE PROGRAM SO AMENDED, MODIFIED OR ENHANCED.
 #
 #  IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING WILL THE
 #  COPYRIGHT HOLDER BE LIABLE TO ANY USER FOR DAMAGES, INCLUDING ANY GENERAL, SPECIAL,
 #  INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR INABILITY TO USE THE
 #  PROGRAM (INCLUDING BUT NOT LIMITED TO LOSS OF DATA OR DATA BEING RENDERED INACCURATE
 #  OR LOSSES SUSTAINED BY THE USER OR THIRD PARTIES OR A FAILURE OF THE PROGRAM TO
 #  OPERATE WITH ANY OTHER PROGRAMS), EVEN IF SUCH HOLDER HAS BEEN ADVISED OF THE
 #  POSSIBILITY OF SUCH DAMAGES.
 #
 #  You should have received a copy of the GNU General Public License
 #  along with this program; if not, write to the Free Software
 #  Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.
 #
 ########################################################################################*/

Ext.define('LSP.view.tree_selector_forms.EnzymeTreeForm', {
    extend:'Ext.window.Window',
    alias:'widget.EnzymeTreeForm',

    requires:['Ext.form.Panel', 'LSP.view.Enzymetree'],

    title:'Select an enzyme family',
    layout:'fit',
    modal:true,
    autoShow:true,
    height:600,
    width:500,

    items:[
        {
            xtype:'form',
            padding:'0 0 0 0',
            border:false,
            style:'background-color: #fff;',

            items:[
                {
                    xtype:'enzymeTree'
                }
            ]
        }
    ],

    buttons:[
        {
            text:'Use selection',
            action:'get_enzyme'
        },
        {
            text:'Cancel',
            action:'hide_enzyme_form'
        }
    ],

    initComponent:function () {
		console.log('EnzymeTreeForm: initComponent()');
        this.callParent(arguments);
    }
})
;

var enzyme_condition = Ext.create('Ext.data.Store', {
	fields: ['symbol', 'name'],
	data: [{
		"symbol": "=",
		"name": "="
	}, {
		"symbol": ">",
		"name": ">"
	}, {
		"symbol": "<",
		"name": "<"
	}, {
		"symbol": "<=",
		"name": "<="
	}, {
		"symbol": ">=",
		"name": ">="
	}]
});
Ext.define('LSP.view.pharm_by_enzyme_family.PharmEnzymeForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.PharmEnzymeForm',
    closable: true,
    header: false,
    requires: ['LSP.view.tree_selector_forms.EnzymeTreeForm', 'LSP.view.dynamicgrid.DynamicGrid'],
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    initComponent: function() {
        console.log('PharmEnzymeForm: initComponent()');
        this.items = [{
            xtype: 'container',
            height: 34,
            name: 'form_fields',
            //      width: 600,
            layout: {
                type: 'column'
            },
            items: [{
                xtype: 'displayfield',
                name: 'enzyme_family',
                margin: '5 5 5 5',
                width: 400,
                value: 'No enzyme class selected - press button ->',
                fieldLabel: 'Enzyme family class',
                labelWidth: 130
            }, {
                xtype: 'button',
                padding: '5 5 5 5',
                margin: '5 5 5 5',
                text: 'Browse EC codes',
                action: 'enz_tree'
            }, {
                name: 'enz_name',
                xtype: 'hidden',
                value: ''
            }, {
                name: 'ec_number',
                xtype: 'hidden',
                value: ''
            }]
        }, {
            xtype: 'button',
            action: 'query',
            margin: '5 0 0 320',
            maxWidth: 300,
            itemId: 'submitEnzymePharm_id',
            text: 'Start search...',
            disabled: true

        }, {
            xtype: 'container',
            margin: '0 5 5 5',
            name: 'filter_fields',
            layout: {
                type: 'column'
            },
            style: 'background-color: #fff;',
            items: [{
                xtype: 'button',
                itemId: 'addFilterButton_id',
                iconCls: 'icon-new',
                padding: '5 5 5 5',
                tooltip: 'Show or hide filter selector',
                action: 'add_filter_form'
            }, {
                xtype: 'label',
                forId: 'addFilterButton_id',
                text: 'Filter',
                margin: '5 5 5 5'
            }, {
                xtype: 'radiogroup',
                width: 200,
                fieldLabel: 'Provenance',
                itemId: 'provId',
                margin: '5 5 5 65',

                items: [{
                    boxLabel: 'On',
                    name: 'prov',
                    inputValue: true
                }, {
                    boxLabel: 'Off',
                    name: 'prov',
                    inputValue: false,
                    checked: true
                }]
            }, {
                xtype: 'button',
                name: 'provHelp',
                margin: '5 0 0 0',
                iconCls: 'provenanceHelpIcon',
                tooltip: 'Provenance Datasources <br><br><p class="conceptWikiValueColour"> - ConceptWiki </p> ' + '<br><p class="chemspiderValueColour"> - ChemSpider </p>' + '<br><p class="drugbankValueColour"> - Drugbank </p>' + '<br><p class="chemblValueColour"> - Chembl</p>'
            }]
        }, {
            xtype: 'container',
            margin: '0 5 5 5',
            name: 'filter_selector_container',
            itemId: 'filterSelectorContainer_id',
            hidden: true,
            layout: {
                type: 'vbox'
            },
            style: 'background-color: #fff;',
            items: [{xtype: 'container',
            margin: '0 5 5 5',
            name: 'activity_selector_container',
	    itemId: 'activitySelectorContainer_id',
	    hidden: false,
            layout: {
                type: 'hbox'
            },
            style: 'background-color: #fff;',
            items: [{
		xtype: 'combobox',
		itemId: 'activity_combobox_id',
		fieldLabel: 'Activity Type',
		store: Ext.create('LDA.store.FilterActivityStore', {}),
		queryMode: 'remote',
		displayField: 'activity_type',
		valueField: 'activity_type',
		labelWidth: 100,
		labelPad: 2,
		padding: '0 2 0 0',
		emptyText: 'Use drop down...',
		editable: false
	}, {
		xtype: 'combobox',
		itemId: 'conditions_combobox_id',
		fieldLabel: 'Conditions',
		store: enzyme_condition,
		queryMode: 'local',
		displayField: 'symbol',
		valueField: 'name',
		labelWidth: 70,
		labelPad: 2,
		padding: '0 2 0 0',
		emptyText: 'Use drop down...',
		editable: false
	}, {
		xtype: 'textfield',
		itemId: 'value_textfield_id',
		name: 'value',
		fieldLabel: 'Value',
		allowBlank: false,
		labelWidth: 50,
		labelPad: 2,
		padding: '0 2 0 0',
		emptyText: 'Enter a value...'
		// requires a non-empty value
	}, {
		xtype: 'combobox',
		itemId: 'unit_combobox_id',
		fieldLabel: 'Unit',
		store: Ext.create('Ext.data.Store', {
			model: 'LSP.model.unit',
			fields: ['unit', 'name']
		}),
		queryMode: 'local',
		displayField: 'unit',
		valueField: 'name',
		labelWidth: 50,
		labelPad: 2,
		padding: '0 10 0 0',
		emptyText: 'Use drop down...',
		editable: false
	}, {
		xtype: 'button',
		itemId: 'addCompletedActivityFilter_id',
		iconCls: 'icon-new',
		padding: '5 5 5 5',
		tooltip: 'Add this activity filter',
		action: 'add_completed_activity_filter'
	}]}, {
                xtype: 'OrganismFilterForm',
                itemId: 'organismFilterContainer_id',
                margin: '0 5 5 5',
                name: 'organism_filter_fields',
                hidden: false
            }]
        }, {
            xtype: 'container',
            itemId: 'completedFilterContainer_id',
            margin: '0 5 5 5',
            name: 'completed_filter_container',
            hidden: true
        }, {
            // xtype:'PharmByEnzymeFamilyGrid',
            xtype: 'PharmByEnzymeFamilyScrollingGrid',
            itemId: 'pharmByEnzymeFamilyGrid',
            title: 'Pharmacology by Enzyme Family search results',
            gridBaseTitle: 'Pharmacology by Enzyme Family search results',
            flex: 1
        }];
        this.callParent(arguments);
    }
});

Ext.define('LSP.controller.PharmByEnzymeFamily', {
        extend:'LSP.controller.grids.DynamicGrid',

    views:['pharm_by_enzyme_family.PharmEnzymeForm','pharm_by_enzyme_family.PharmByEnzymeFamilyScrollingGrid'],
    // views:['pharm_by_enzyme_family.PharmEnzymeForm','pharm_by_enzyme_family.PharmByEnzymeFamilyGrid', 'tree_selector_forms.EnzymeTreeForm'],

    // stores:['LDA.store.EnzymeFamilyPaginatedStore'],

    refs:[
        {
            ref:'gridView', // reference to the view
            selector:'#pharmByEnzymeFamilyGrid'
        },
        {
            ref:'formView',
            selector:'PharmEnzymeForm'
        },
        {
            ref:'submitButton',
            selector:'#submitEnzymePharm_id'
        
        }, {
		ref: 'filterContainer',
		selector: 'PharmEnzymeForm #filterSelectorContainer_id'
	}, {
		ref: 'unitsCombo',
		selector: 'PharmEnzymeForm #unit_combobox_id'
        }, {
          ref: 'tsvDownloadButton',
          selector: 'PharmEnzymeForm #tsvDownloadProxy_id'
        }],
    filters: undefined,
	current_uri: undefined,

    init:function () {
	    console.log('PharmByEnzymeFamily: init()');
        this.control({
            'PharmEnzymeForm button[action=enz_tree]':{
                click:this.launchEnzyme
            },
            'EnzymeTreeForm button[action=get_enzyme]':{
                click:this.getEnzyme
            },
            'EnzymeTreeForm button[action=hide_enzyme_form]':{
                click:this.hideEnzyme
            },
            'PharmEnzymeForm #submitEnzymePharm_id':{
                click:this.submitQuery
            },
            'PharmEnzymeForm':{
                afterrender:this.prepGrid,
                historyToken:this.handleHistoryToken
            },
            'PharmEnzymeForm button[action=add_filter_form]': {
            click: this.addFilterForm
            },
            'PharmEnzymeForm button[action=add_completed_organism_filter]': {
                click: this.addCompletedOrganismFilter
            },
            'PharmEnzymeForm button[action=add_completed_activity_filter]': {
                click: this.addCompletedActivityFilter
            },
            'PharmEnzymeForm #provId' : {
                change: this.onProvChange
            },
            'PharmEnzymeForm #activity_combobox_id': {
                select: this.comboSelect,
                scope: this
            }
        });
    },

   comboSelect: function(combo, records, eOpts) {
	var activity = records[0].get('activity_type');
	// only fetch new units if the selected activity is different than before
	if (this.current_activity_combo_select != activity) {
		var units_store = this.getUnitsCombo().getStore();
		this.getUnitsCombo().clearValue();
		units_store.removeAll();
		this.current_activity_combo_select = activity;
		var filter_units_store = Ext.create('LDA.store.FilterUnitsStore',{activity_type: activity});
        	filter_units_store.load(function(records, operation, success) {
				store_records = records;
				store_operation = operation;
				store_success = operation.success;
				if (store_success) {
				    Ext.each(records, function (record, index) {
                                        unit = Ext.create('LSP.model.Unit', {unit: record.data.unit, name: record.data.unit});
                                        units_store.add(unit);		
				    });
				}
        	});
	}
   },

    handleHistoryToken:function (historyTokenObject) {
 	    console.log('PharmByEnzymeFamily: handleHistoryToken()');
        if (historyTokenObject.ec) {
			this.current_uri = "http://purl.uniprot.org/enzyme/" + historyTokenObject.ec;
            var dg = this.getGridView();
            var store = dg.getStore();
            dg.setLoading(true);
            //store.setURI("http://purl.uniprot.org/enzyme/" + historyTokenObject.ec);
	    store.proxy.extraParams.uri = "http://purl.uniprot.org/enzyme/" + historyTokenObject.ec;
			//use the reader uri when retrieving the count after store load
			store.proxy.reader.uri = "http://purl.uniprot.org/enzyme/" + historyTokenObject.ec;
            this.fetchTotalResults();
        }
    },

	getCountStore: function() {
		return Ext.create('LDA.store.EnzymeFamilyCountStore');
	},


    // Launch Enzyme class selection window
    launchEnzyme:function (button) {
	    console.log('PharmByEnzymeFamily: launchEnzyme()');
	    // Launch the window
	    var view = Ext.ComponentQuery.query('EnzymeTreeForm')[0];
	    if (view) {
	        console.log('enzyme show');
	        view.show();
	    } else {
	        console.log('enzyme create');
	        view = Ext.widget('EnzymeTreeForm');
	        view.show();
	    }
	},

    hideEnzyme:function (button) {
	    console.log('PharmByEnzymeFamily: hideEnzyme()');
	    var view = Ext.ComponentQuery.query('EnzymeTreeForm')[0];
	    if (view) {
	        console.log('enzyme hide');
	        view.hide();
	    }
	},


	    // Get selection from the enzyme tree window
	    getEnzyme:function (button) {
			console.log('PharmByEnzymeFamily: getEnzyme()');
	        var tree = button.up().up().down('enzymeTree');
	        var selected = tree.getView().getSelectionModel().getSelection();
	        var sel_data = selected[0].data;

//	        if (sel_data.leaf) {
//	            Ext.Msg.show({
//	                title:'Incorrect selection',
//	                msg:'Please select an enzyme class (folder).',
//	                buttons:Ext.MessageBox.OK,
//	                icon:Ext.MessageBox.INFO
//	            });
//	        } else {
	            var disp_field = this.getFormView().getForm().findField('enzyme_family');
	            disp_field.setValue('<b>' + sel_data.ec_number + ' : ' + sel_data.name + '</b>');
	            var ec_num_field = this.getFormView().getForm().findField('ec_number');
	            ec_num_field.setValue(sel_data.ec_number);
	            var enz_name_field = this.getFormView().getForm().findField('enz_name');
	            enz_name_field.setValue(sel_data.name);
	            this.hideEnzyme('');
		    this.getSubmitButton().enable();
//	        }
	    },

	    submitQuery:function (button) {
		console.log('PharmByEnzymeFamily: submitQuery()');
		var dg = this.getGridView();
		var store = dg.store;
		// remove the sort column if there was any
        store.sort_column = undefined;
	        var form = button.up('form');
	        button.disable();
	        var values = form.getValues();
			if (this.current_uri == "http://purl.uniprot.org/enzyme/" + values.ec_number) {
				store.proxy.extraParams.uri = this.current_uri;
				store.proxy.reader.uri = this.current_uri;
				//store.setURI("http://purl.uniprot.org/enzyme/" + this.current_uri);
				dg.setLoading(true);
				//loading the store is done after the total results are fetched
				this.fetchTotalResults();
			} else {
		        Ext.History.add('!p=PharmEnzymeForm&ec=' + values.ec_number);
			}
	    }
	
})
;

/**
 *
 *  Base64 encode / decode
 *  http://www.webtoolkit.info/
 *
 **/

(function () {

    // private property
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    // private method for UTF-8 encoding
    function utf8Encode(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    }

    Ext.define("Ext.ux.exporter.Base64", {
        statics:{
            //This was the original line, which tries to use Firefox's built in Base64 encoder, but this kept throwing exceptions....
            // encode : (typeof btoa == 'function') ? function(input) { return btoa(input); } : function (input) {
            encode:function (input) {
                var output = "";
                var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
                var i = 0;
                input = utf8Encode(input);
                while (i < input.length) {
                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);
                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;
                    if (isNaN(chr2)) {
                        enc3 = enc4 = 64;
                    } else if (isNaN(chr3)) {
                        enc4 = 64;
                    }
                    output = output +
                        keyStr.charAt(enc1) + keyStr.charAt(enc2) +
                        keyStr.charAt(enc3) + keyStr.charAt(enc4);
                }
                return output;
            }}
    });
})();
/**
 * @class Ext.ux.Exporter.Button
 * @extends Ext.Component
 * @author Nige White, with modifications from Ed Spencer, with modifications from iwiznia.
 * Specialised Button class that allows downloading of data via data: urls.
 * Internally, this is just a link.
 * Pass it either an Ext.Component subclass with a 'store' property, or just a store or nothing and it will try to grab the first parent of this button that is a grid or tree panel:
 * new Ext.ux.Exporter.Button({component: someGrid});
 * new Ext.ux.Exporter.Button({store: someStore});
 * @cfg {Ext.Component} component The component the store is bound to
 * @cfg {Ext.data.Store} store The store to export (alternatively, pass a component with a getStore method)
 */
Ext.define("Ext.ux.exporter.Button", {
    extend:"Ext.Component",
    alias:"widget.exporterbutton",
    html:'<p></p>',
    config:{
        swfPath:'/flash/downloadify.swf',
        downloadImage:'/images/ext_reports/download.png',
        width:62,
        height:22,
        downloadName:"download"
    },

    constructor:function (config) {
        config = config || {};

        this.initConfig();
        Ext.ux.exporter.Button.superclass.constructor.call(this, config);

        var self = this;
        // this.store.on("load", function () { // We wait for the combo to be rendered, so we can look up to grab the component containing it
        //     self.setComponent(self.up("dynamicgrid3"), config);
        // }, this, {delay:1000});
      this.on("afterrender", function() { // We wait for the combo to be rendered, so we can look up to grab the component containing it
          self.setComponent(self.store || self.component || self.up("gridpanel") || self.up("treepanel"), config);
      });
    },

    setComponent:function (component, config) {
        this.component = component;
        this.store = !component.is ? component : component.getStore(); // only components or stores, if it doesn't respond to is method, it's a store
        this.setDownloadify(config);
    },

    setDownloadify:function (config) {
        var self = this;
        Downloadify.create(this.el.down('p').id, {
            filename:function () {
                return self.getDownloadName() + "." + Ext.ux.exporter.Exporter.getFormatterByName(self.formatter).extension;
            },
            data:function () {
                return Ext.ux.exporter.Exporter.exportAny(self.component, self.formatter, config);
            },
            onComplete:function () {
                alert('Your File Has Been Saved!');
            },
            onCancel:function () {
                alert('You have cancelled the saving of this file.');
            },
            onError:function () {
                alert('You must put something in the File Contents or there will be nothing to save!');
            },
            transparent:false,
            swf:this.getSwfPath(),
            downloadImage:this.getDownloadImage(),
            width:this.getWidth(),
            height:this.getHeight(),
            transparent:true,
            append:true
        });
    }
});
/**
 * @class Ext.ux.grid.menu.ListMenu
 * @extends Ext.menu.Menu
 * This is a supporting class for {@link Ext.ux.grid.filter.ListFilter}.
 * Although not listed as configuration options for this class, this class
 * also accepts all configuration options from {@link Ext.ux.grid.filter.ListFilter}.
 */
Ext.define('Ext.ux.grid.menu.ListMenu', {
    extend: 'Ext.menu.Menu',

    /**
     * @cfg {String} labelField
     * Defaults to 'text'.
     */
    labelField :  'text',
    /**
     * @cfg {String} paramPrefix
     * Defaults to 'Loading...'.
     */
    loadingText : 'Loading...',
    /**
     * @cfg {Boolean} loadOnShow
     * Defaults to true.
     */
    loadOnShow : true,
    /**
     * @cfg {Boolean} single
     * Specify true to group all items in this list into a single-select
     * radio button group. Defaults to false.
     */
    single : false,

    constructor : function (cfg) {
        var me = this,
            options,
            i,
            len,
            value;
            
        me.selected = [];
        me.addEvents(
            /**
             * @event checkchange
             * Fires when there is a change in checked items from this list
             * @param {Object} item Ext.menu.CheckItem
             * @param {Object} checked The checked value that was set
             */
            'checkchange'
        );

        me.callParent([cfg = cfg || {}]);

        if(!cfg.store && cfg.options) {
            options = [];
            for(i = 0, len = cfg.options.length; i < len; i++){
                value = cfg.options[i];
                switch(Ext.type(value)){
                    case 'array':  options.push(value); break;
                    case 'object': options.push([value.id, value[me.labelField]]); break;
                    case 'string': options.push([value, value]); break;
                }
            }

            me.store = Ext.create('Ext.data.ArrayStore', {
                fields: ['id', me.labelField],
                data:   options,
                listeners: {
                    load: me.onLoad,
                    scope:  me
                }
            });
            me.loaded = true;
            me.autoStore = true;
        } else {
            me.add({
                text: me.loadingText,
                iconCls: 'loading-indicator'
            });
            me.store.on('load', me.onLoad, me);
        }
    },

    destroy : function () {
        var me = this,
            store = me.store;
            
        if (store) {
            if (me.autoStore) {
                store.destroyStore();
            } else {
                store.un('unload', me.onLoad, me);
            }
        }
        me.callParent();
    },

    /**
     * Lists will initially show a 'loading' item while the data is retrieved from the store.
     * In some cases the loaded data will result in a list that goes off the screen to the
     * right (as placement calculations were done with the loading item). This adapter will
     * allow show to be called with no arguments to show with the previous arguments and
     * thus recalculate the width and potentially hang the menu from the left.
     */
    show : function () {
        if (this.loadOnShow && !this.loaded && !this.store.loading) {
            this.store.load();
        }
        this.callParent();
    },

    /** @private */
    onLoad : function (store, records) {
        var me = this,
            gid, itemValue, i, len,
            listeners = {
                checkchange: me.checkChange,
                scope: me
            };

        Ext.suspendLayouts();
        me.removeAll(true);

        gid = me.single ? Ext.id() : null;
        for (i = 0, len = records.length; i < len; i++) {
            itemValue = records[i].get('id');
            me.add(Ext.create('Ext.menu.CheckItem', {
                text: records[i].get(me.labelField),
                group: gid,
                checked: Ext.Array.contains(me.selected, itemValue),
                hideOnClick: false,
                value: itemValue,
                listeners: listeners
            }));
        }

        me.loaded = true;
        Ext.resumeLayouts(true);
        me.fireEvent('load', me, records);
    },

    /**
     * Get the selected items.
     * @return {Array} selected
     */
    getSelected : function () {
        return this.selected;
    },

    /** @private */
    setSelected : function (value) {
        value = this.selected = [].concat(value);

        if (this.loaded) {
            this.items.each(function(item){
                item.setChecked(false, true);
                for (var i = 0, len = value.length; i < len; i++) {
                    if (item.value == value[i]) {
                        item.setChecked(true, true);
                    }
                }
            }, this);
        }
    },

    /**
     * Handler for the 'checkchange' event from an check item in this menu
     * @param {Object} item Ext.menu.CheckItem
     * @param {Object} checked The checked value that was set
     */
    checkChange : function (item, checked) {
        var value = [];
        this.items.each(function(item){
            if (item.checked) {
                value.push(item.value);
            }
        },this);
        this.selected = value;

        this.fireEvent('checkchange', item, checked);
    }
});

/**
 * @class Ext.ux.grid.menu.RangeMenu
 * @extends Ext.menu.Menu
 * Custom implementation of {@link Ext.menu.Menu} that has preconfigured items for entering numeric
 * range comparison values: less-than, greater-than, and equal-to. This is used internally
 * by {@link Ext.ux.grid.filter.NumericFilter} to create its menu.
 */
Ext.define('Ext.ux.grid.menu.RangeMenu', {
    extend: 'Ext.menu.Menu',

    /**
     * @cfg {String} fieldCls
     * The Class to use to construct each field item within this menu
     * Defaults to:<pre>
     * fieldCls : Ext.form.field.Number
     * </pre>
     */
    fieldCls : 'Ext.form.field.Number',

    /**
     * @cfg {Object} fieldCfg
     * The default configuration options for any field item unless superseded
     * by the <code>{@link #fields}</code> configuration.
     * Defaults to:<pre>
     * fieldCfg : {}
     * </pre>
     * Example usage:
     * <pre><code>
fieldCfg : {
    width: 150,
},
     * </code></pre>
     */

    /**
     * @cfg {Object} fields
     * The field items may be configured individually
     * Defaults to <tt>undefined</tt>.
     * Example usage:
     * <pre><code>
fields : {
    gt: { // override fieldCfg options
        width: 200,
        fieldCls: Ext.ux.form.CustomNumberField // to override default {@link #fieldCls}
    }
},
     * </code></pre>
     */

    /**
     * @cfg {Object} itemIconCls
     * The itemIconCls to be applied to each comparator field item.
     * Defaults to:<pre>
itemIconCls : {
    gt : 'ux-rangemenu-gt',
    lt : 'ux-rangemenu-lt',
    eq : 'ux-rangemenu-eq'
}
     * </pre>
     */
    itemIconCls : {
        gt : 'ux-rangemenu-gt',
        lt : 'ux-rangemenu-lt',
        eq : 'ux-rangemenu-eq'
    },

    /**
     * @cfg {Object} fieldLabels
     * Accessible label text for each comparator field item. Can be overridden by localization
     * files. Defaults to:<pre>
fieldLabels : {
     gt: 'Greater Than',
     lt: 'Less Than',
     eq: 'Equal To'
}</pre>
     */
    fieldLabels: {
        gt: 'Greater Than',
        lt: 'Less Than',
        eq: 'Equal To'
    },

    /**
     * @cfg {Object} menuItemCfgs
     * Default configuration options for each menu item
     * Defaults to:<pre>
menuItemCfgs : {
    emptyText: 'Enter Filter Text...',
    selectOnFocus: true,
    width: 125
}
     * </pre>
     */
    menuItemCfgs : {
        emptyText: 'Enter Number...',
        selectOnFocus: false,
        width: 155
    },

    /**
     * @cfg {Array} menuItems
     * The items to be shown in this menu.  Items are added to the menu
     * according to their position within this array. Defaults to:<pre>
     * menuItems : ['lt','gt','-','eq']
     * </pre>
     */
    menuItems : ['lt', 'gt', '-', 'eq'],


    constructor : function (config) {
        var me = this,
            fields, fieldCfg, i, len, item, cfg, Cls;

        me.callParent(arguments);

        fields = me.fields = me.fields || {};
        fieldCfg = me.fieldCfg = me.fieldCfg || {};
        
        me.addEvents(
            /**
             * @event update
             * Fires when a filter configuration has changed
             * @param {Ext.ux.grid.filter.Filter} this The filter object.
             */
            'update'
        );
      
        me.updateTask = Ext.create('Ext.util.DelayedTask', me.fireUpdate, me);
    
        for (i = 0, len = me.menuItems.length; i < len; i++) {
            item = me.menuItems[i];
            if (item !== '-') {
                // defaults
                cfg = {
                    itemId: 'range-' + item,
                    enableKeyEvents: true,
                    hideLabel: false,
                    fieldLabel: me.iconTpl.apply({
                        cls: me.itemIconCls[item] || 'no-icon',
                        text: me.fieldLabels[item] || '',
                        src: Ext.BLANK_IMAGE_URL
                    }),
                    labelSeparator: '',
                    labelWidth: 29,
                    labelStyle: 'position: relative;',
                    listeners: {
                        scope: me,
                        change: me.onInputChange,
                        keyup: me.onInputKeyUp,
                        el: {
                            click: function(e) {
                                e.stopPropagation();
                            }
                        }
                    },
                    activate: Ext.emptyFn,
                    deactivate: Ext.emptyFn
                };
                Ext.apply(
                    cfg,
                    // custom configs
                    Ext.applyIf(fields[item] || {}, fieldCfg[item]),
                    // configurable defaults
                    me.menuItemCfgs
                );
                Cls = cfg.fieldCls || me.fieldCls;
                item = fields[item] = Ext.create(Cls, cfg);
            }
            me.add(item);
        }
    },

    /**
     * @private
     * called by this.updateTask
     */
    fireUpdate : function () {
        this.fireEvent('update', this);
    },
    
    /**
     * Get and return the value of the filter.
     * @return {String} The value of this filter
     */
    getValue : function () {
        var result = {}, key, field;
        for (key in this.fields) {
            field = this.fields[key];
            if (field.isValid() && field.getValue() !== null) {
                result[key] = field.getValue();
            }
        }
        return result;
    },
  
    /**
     * Set the value of this menu and fires the 'update' event.
     * @param {Object} data The data to assign to this menu
     */	
    setValue : function (data) {
        var me = this,
            key,
            field;

        for (key in me.fields) {
            
            // Prevent field's change event from tiggering a Store filter. The final upate event will do that
            field = me.fields[key];
            field.suspendEvents();
            field.setValue(key in data ? data[key] : '');
            field.resumeEvents();
        }

        // Trigger the filering of the Store
        me.fireEvent('update', me);
    },

    /**  
     * @private
     * Handler method called when there is a keyup event on an input
     * item of this menu.
     */
    onInputKeyUp: function(field, e) {
        if (e.getKey() === e.RETURN && field.isValid()) {
            e.stopEvent();
            this.hide();
        }
    },

    /**
     * @private
     * Handler method called when the user changes the value of one of the input
     * items in this menu.
     */
    onInputChange: function(field) {
        var me = this,
            fields = me.fields,
            eq = fields.eq,
            gt = fields.gt,
            lt = fields.lt;

        if (field == eq) {
            if (gt) {
                gt.setValue(null);
            }
            if (lt) {
                lt.setValue(null);
            }
        }
        else {
            eq.setValue(null);
        }

        // restart the timer
        this.updateTask.delay(this.updateBuffer);
    }
}, function() {

    /**
     * @cfg {Ext.XTemplate} iconTpl
     * A template for generating the label for each field in the menu
     */
    this.prototype.iconTpl = Ext.create('Ext.XTemplate',
        '<img src="{src}" alt="{text}" class="' + Ext.baseCSSPrefix + 'menu-item-icon ux-rangemenu-icon {cls}" />'
    );

});

/**
 * @class Ext.ux.Exporter.Formatter
 * @author Ed Spencer (http://edspencer.net)
 * @cfg {Ext.data.Store} store The store to export
 */
Ext.define("Ext.ux.exporter.Formatter", {
    /**
     * Performs the actual formatting. This must be overridden by a subclass
     */
    format:Ext.emptyFn,
    constructor:function (config) {
        config = config || {};

        Ext.applyIf(config, {

        });
    }
});
/**
 * @class Ext.ux.grid.filter.Filter
 * @extends Ext.util.Observable
 * Abstract base class for filter implementations.
 */
Ext.define('Ext.ux.grid.filter.Filter', {
    extend: 'Ext.util.Observable',

    /**
     * @cfg {Boolean} active
     * Indicates the initial status of the filter (defaults to false).
     */
    active : false,
    /**
     * True if this filter is active.  Use setActive() to alter after configuration.
     * @type Boolean
     * @property active
     */
    /**
     * @cfg {String} dataIndex
     * The {@link Ext.data.Store} dataIndex of the field this filter represents.
     * The dataIndex does not actually have to exist in the store.
     */
    dataIndex : null,
    /**
     * The filter configuration menu that will be installed into the filter submenu of a column menu.
     * @type Ext.menu.Menu
     * @property
     */
    menu : null,
    /**
     * @cfg {Number} updateBuffer
     * Number of milliseconds to wait after user interaction to fire an update. Only supported
     * by filters: 'list', 'numeric', and 'string'. Defaults to 500.
     */
    updateBuffer : 500,

    constructor : function (config) {
        Ext.apply(this, config);

        this.addEvents(
            /**
             * @event activate
             * Fires when an inactive filter becomes active
             * @param {Ext.ux.grid.filter.Filter} this
             */
            'activate',
            /**
             * @event deactivate
             * Fires when an active filter becomes inactive
             * @param {Ext.ux.grid.filter.Filter} this
             */
            'deactivate',
            /**
             * @event serialize
             * Fires after the serialization process. Use this to attach additional parameters to serialization
             * data before it is encoded and sent to the server.
             * @param {Array/Object} data A map or collection of maps representing the current filter configuration.
             * @param {Ext.ux.grid.filter.Filter} filter The filter being serialized.
             */
            'serialize',
            /**
             * @event update
             * Fires when a filter configuration has changed
             * @param {Ext.ux.grid.filter.Filter} this The filter object.
             */
            'update'
        );
        Ext.ux.grid.filter.Filter.superclass.constructor.call(this);

        this.menu = this.createMenu(config);
        this.init(config);
        if(config && config.value){
            this.setValue(config.value);
            this.setActive(config.active !== false, true);
            delete config.value;
        }
    },

    /**
     * Destroys this filter by purging any event listeners, and removing any menus.
     */
    destroy : function(){
        if (this.menu){
            this.menu.destroy();
        }
        this.clearListeners();
    },

    /**
     * Template method to be implemented by all subclasses that is to
     * initialize the filter and install required menu items.
     * Defaults to Ext.emptyFn.
     */
    init : Ext.emptyFn,

    /**
     * @private @override
     * Creates the Menu for this filter.
     * @param {Object} config Filter configuration
     * @return {Ext.menu.Menu}
     */
    createMenu: function(config) {
        return Ext.create('Ext.menu.Menu', config);
    },

    /**
     * Template method to be implemented by all subclasses that is to
     * get and return the value of the filter.
     * Defaults to Ext.emptyFn.
     * @return {Object} The 'serialized' form of this filter
     * @methodOf Ext.ux.grid.filter.Filter
     */
    getValue : Ext.emptyFn,

    /**
     * Template method to be implemented by all subclasses that is to
     * set the value of the filter and fire the 'update' event.
     * Defaults to Ext.emptyFn.
     * @param {Object} data The value to set the filter
     * @methodOf Ext.ux.grid.filter.Filter
     */
    setValue : Ext.emptyFn,

    /**
     * Template method to be implemented by all subclasses that is to
     * return <tt>true</tt> if the filter has enough configuration information to be activated.
     * Defaults to <tt>return true</tt>.
     * @return {Boolean}
     */
    isActivatable : function(){
        return true;
    },

    /**
     * Template method to be implemented by all subclasses that is to
     * get and return serialized filter data for transmission to the server.
     * Defaults to Ext.emptyFn.
     */
    getSerialArgs : Ext.emptyFn,

    /**
     * Template method to be implemented by all subclasses that is to
     * validates the provided Ext.data.Record against the filters configuration.
     * Defaults to <tt>return true</tt>.
     * @param {Ext.data.Record} record The record to validate
     * @return {Boolean} true if the record is valid within the bounds
     * of the filter, false otherwise.
     */
    validateRecord : function(){
        return true;
    },

    /**
     * Returns the serialized filter data for transmission to the server
     * and fires the 'serialize' event.
     * @return {Object/Array} An object or collection of objects containing
     * key value pairs representing the current configuration of the filter.
     * @methodOf Ext.ux.grid.filter.Filter
     */
    serialize : function(){
        var args = this.getSerialArgs();
        this.fireEvent('serialize', args, this);
        return args;
    },

    /** @private */
    fireUpdate : function(){
        if (this.active) {
            this.fireEvent('update', this);
        }
        this.setActive(this.isActivatable());
    },

    /**
     * Sets the status of the filter and fires the appropriate events.
     * @param {Boolean} active        The new filter state.
     * @param {Boolean} suppressEvent True to prevent events from being fired.
     * @methodOf Ext.ux.grid.filter.Filter
     */
    setActive : function(active, suppressEvent){
        if(this.active != active){
            this.active = active;
            if (suppressEvent !== true) {
                this.fireEvent(active ? 'activate' : 'deactivate', this);
            }
        }
    }
});

/**
 * @class Ext.ux.Exporter.SDFFormatter
 * @extends Ext.ux.Exporter.Formatter
 * Specialised Format class for outputting .sdf files
 * Written by Sune Askj�r
 */
Ext.define("Ext.ux.exporter.sdfFormatter.SdfFormatter", {
    extend:"Ext.ux.exporter.Formatter",
    contentType:'data:text/plain;base64,',
    extension:"sdf",

    format:function (store, config) {
        var me = this;
        var sd_rows = [];
        store.each(function (record, index) {
            if(record.molfile !== undefined){
            sd_rows.push(this.buildRecord(config.columns, record, record.molfile));
            }
        }, this);

        return sd_rows.join("\n") + "\n";
    },

    buildRecord:function (columns, row, molfile) {
        var cols = [];
        var csid = row.data.csid;
        Ext.each(columns, function (column) {
            var data_record = ">  <";
            // todo: check hidden props
            if (!column.hidden && column.text != '&#160') {
                var data = row.data[column.dataIndex];
                // the cell has a custom object instead of a string, use its text attribute
                if (data.text !== undefined) {
                    data = data.text;
                }
                var stripped = this.stripTags(data);
                var escapedText = this.escapeTextSeperator(stripped);
                data_record = data_record + this.stripTags(column.text) + "> (" + csid + ")\n";
                data_record = data_record + escapedText + "\n";
                if (escapedText !== "") {
                    cols.push(data_record);
                }
            }
        }, this);
        return molfile + cols.join("\n") + "\n$$$$";
    },

    /**
     * Little helper function to strip tags from a string.
     * @param strMod
     * @return strMod
     */
    stripTags:function (strMod) {
        if (typeof(strMod) === "string") {
            strMod = strMod.replace(/<(.|\n)*?>/gi, '');
        }
        var tarea = document.createElement('textarea');
        tarea.innerHTML = strMod;
        return tarea.value;
    },

    /**
     * Little helper function to escape CSV Text Seperator.
     * @param strMod
     * @return strMod
     */
    escapeTextSeperator:function (strMod) {
        if (typeof(strMod) === "string") {
            strMod = strMod.replace(/"/gi, '""');
        }
        var tarea = document.createElement('textarea');
        tarea.innerHTML = strMod;
        return tarea.value;
    }
});
/**
 * @class Ext.ux.Exporter.CSVFormatter
 * @extends Ext.ux.Exporter.Formatter
 * Specialised Format class for outputting .csv files
 */
Ext.define("Ext.ux.exporter.csvFormatter.CsvFormatter", {
    extend:"Ext.ux.exporter.Formatter",
    contentType:'data:text/csv;base64,',
    separator:"\t",
    extension:"csv",

    format:function (store, config) {
        this.columns = config.columns || (store.fields ? store.fields.items : store.model.prototype.fields.items);
        return this.getHeaders() + "\n" + this.getRows(store);
    },
    getHeaders:function (store) {
        var columns = [], title;
        Ext.each(this.columns, function (col) {
            var title;
            if (col.text != undefined) {
                title = col.text;
            } else if (col.name) {
                title = col.name.replace(/_/g, " ");
                title = Ext.String.capitalize(title);
            }

            if (col.text != '&#160') {
                columns.push(title);
            }
        }, this);
        return columns.join(this.separator);
    },
    getRows:function (store) {
        var rows = [];
        store.each(function (record, index) {
            rows.push(this.geCell(record, index));
        }, this);

        return rows.join("\n");
    },
    geCell:function (record, index) {
        var cells = [];
        Ext.each(this.columns, function (col) {
            var name = col.name || col.dataIndex;
            if (name) {
                if (Ext.isFunction(col.renderer)) {
                    var value = col.renderer(record.get(name), null, record);
                } else {
                    var value = record.get(name);
                }
                cells.push(value);
            }
        });

        return cells.join(this.separator);
    }
});

/**
 * @class Ext.ux.Exporter.ExcelFormatter
 * @extends Ext.ux.Exporter.Formatter
 * Specialised Format class for outputting .xls files
 */
Ext.define("Ext.ux.exporter.excelFormatter.ExcelFormatter", {
    extend:"Ext.ux.exporter.Formatter",
    uses:[
        "Ext.ux.exporter.excelFormatter.Cell",
        "Ext.ux.exporter.excelFormatter.Style",
        "Ext.ux.exporter.excelFormatter.Worksheet",
        "Ext.ux.exporter.excelFormatter.Workbook"
    ],
    contentType:'data:application/vnd.ms-excel;base64,',
    extension:"xls",

    format:function (store, config) {
        var workbook = new Ext.ux.exporter.excelFormatter.Workbook(config);
        workbook.addWorksheet(store, config || {});

        return workbook.render();
    }
});
/**
 * @class Ext.ux.grid.filter.BooleanFilter
 * @extends Ext.ux.grid.filter.Filter
 * Boolean filters use unique radio group IDs (so you can have more than one!)
 * <p><b><u>Example Usage:</u></b></p>
 * <pre><code>
var filters = Ext.create('Ext.ux.grid.GridFilters', {
    ...
    filters: [{
        // required configs
        type: 'boolean',
        dataIndex: 'visible'

        // optional configs
        defaultValue: null, // leave unselected (false selected by default)
        yesText: 'Yes',     // default
        noText: 'No'        // default
    }]
});
 * </code></pre>
 */
Ext.define('Ext.ux.grid.filter.BooleanFilter', {
    extend: 'Ext.ux.grid.filter.Filter',
    alias: 'gridfilter.boolean',

	/**
	 * @cfg {Boolean} defaultValue
	 * Set this to null if you do not want either option to be checked by default. Defaults to false.
	 */
	defaultValue : false,
	/**
	 * @cfg {String} yesText
	 * Defaults to 'Yes'.
	 */
	yesText : 'Yes',
	/**
	 * @cfg {String} noText
	 * Defaults to 'No'.
	 */
	noText : 'No',

    /**
     * @private
     * Template method that is to initialize the filter and install required menu items.
     */
    init : function (config) {
        var gId = Ext.id();
		this.options = [
			Ext.create('Ext.menu.CheckItem', {text: this.yesText, group: gId, checked: this.defaultValue === true}),
			Ext.create('Ext.menu.CheckItem', {text: this.noText, group: gId, checked: this.defaultValue === false})];

		this.menu.add(this.options[0], this.options[1]);

		for(var i=0; i<this.options.length; i++){
			this.options[i].on('click', this.fireUpdate, this);
			this.options[i].on('checkchange', this.fireUpdate, this);
		}
	},

    /**
     * @private
     * Template method that is to get and return the value of the filter.
     * @return {String} The value of this filter
     */
    getValue : function () {
		return this.options[0].checked;
	},

    /**
     * @private
     * Template method that is to set the value of the filter.
     * @param {Object} value The value to set the filter
     */
	setValue : function (value) {
		this.options[value ? 0 : 1].setChecked(true);
	},

    /**
     * @private
     * Template method that is to get and return serialized filter data for
     * transmission to the server.
     * @return {Object/Array} An object or collection of objects containing
     * key value pairs representing the current configuration of the filter.
     */
    getSerialArgs : function () {
		var args = {type: 'boolean', value: this.getValue()};
		return args;
	},

    /**
     * Template method that is to validate the provided Ext.data.Record
     * against the filters configuration.
     * @param {Ext.data.Record} record The record to validate
     * @return {Boolean} true if the record is valid within the bounds
     * of the filter, false otherwise.
     */
    validateRecord : function (record) {
		return record.get(this.dataIndex) == this.getValue();
	}
});

/**
 * @class Ext.ux.grid.filter.DateFilter
 * @extends Ext.ux.grid.filter.Filter
 * Filter by a configurable Ext.picker.DatePicker menu
 * <p><b><u>Example Usage:</u></b></p>
 * <pre><code>
var filters = Ext.create('Ext.ux.grid.GridFilters', {
    ...
    filters: [{
        // required configs
        type: 'date',
        dataIndex: 'dateAdded',

        // optional configs
        dateFormat: 'm/d/Y',  // default
        beforeText: 'Before', // default
        afterText: 'After',   // default
        onText: 'On',         // default
        pickerOpts: {
            // any DatePicker configs
        },

        active: true // default is false
    }]
});
 * </code></pre>
 */
Ext.define('Ext.ux.grid.filter.DateFilter', {
    extend: 'Ext.ux.grid.filter.Filter',
    alias: 'gridfilter.date',
    uses: ['Ext.picker.Date', 'Ext.menu.Menu'],

    /**
     * @cfg {String} afterText
     * Defaults to 'After'.
     */
    afterText : 'After',
    /**
     * @cfg {String} beforeText
     * Defaults to 'Before'.
     */
    beforeText : 'Before',
    /**
     * @cfg {Object} compareMap
     * Map for assigning the comparison values used in serialization.
     */
    compareMap : {
        before: 'lt',
        after:  'gt',
        on:     'eq'
    },
    /**
     * @cfg {String} dateFormat
     * The date format to return when using getValue.
     * Defaults to 'm/d/Y'.
     */
    dateFormat : 'm/d/Y',

    /**
     * @cfg {Date} maxDate
     * Allowable date as passed to the Ext.DatePicker
     * Defaults to undefined.
     */
    /**
     * @cfg {Date} minDate
     * Allowable date as passed to the Ext.DatePicker
     * Defaults to undefined.
     */
    /**
     * @cfg {Array} menuItems
     * The items to be shown in this menu
     * Defaults to:<pre>
     * menuItems : ['before', 'after', '-', 'on'],
     * </pre>
     */
    menuItems : ['before', 'after', '-', 'on'],

    /**
     * @cfg {Object} menuItemCfgs
     * Default configuration options for each menu item
     */
    menuItemCfgs : {
        selectOnFocus: true,
        width: 125
    },

    /**
     * @cfg {String} onText
     * Defaults to 'On'.
     */
    onText : 'On',

    /**
     * @cfg {Object} pickerOpts
     * Configuration options for the date picker associated with each field.
     */
    pickerOpts : {},

    /**
     * @private
     * Template method that is to initialize the filter and install required menu items.
     */
    init : function (config) {
        var me = this,
            pickerCfg, i, len, item, cfg;

        pickerCfg = Ext.apply(me.pickerOpts, {
            xtype: 'datepicker',
            minDate: me.minDate,
            maxDate: me.maxDate,
            format:  me.dateFormat,
            listeners: {
                scope: me,
                select: me.onMenuSelect
            }
        });

        me.fields = {};
        for (i = 0, len = me.menuItems.length; i < len; i++) {
            item = me.menuItems[i];
            if (item !== '-') {
                cfg = {
                    itemId: 'range-' + item,
                    text: me[item + 'Text'],
                    menu: Ext.create('Ext.menu.Menu', {
                        items: [
                            Ext.apply(pickerCfg, {
                                itemId: item,
                                listeners: {
                                    select: me.onPickerSelect,
                                    scope: me
                                }
                            }),
                        ]
                    }),
                    listeners: {
                        scope: me,
                        checkchange: me.onCheckChange
                    }
                };
                item = me.fields[item] = Ext.create('Ext.menu.CheckItem', cfg);
            }
            //me.add(item);
            me.menu.add(item);
        }
        me.values = {};
    },

    onCheckChange : function (item, checked) {
        var me = this,
            picker = item.menu.items.first(),
            itemId = picker.itemId,
            values = me.values;

        if (checked) {
            values[itemId] = picker.getValue();
        } else {
            delete values[itemId]
        }
        me.setActive(me.isActivatable());
        me.fireEvent('update', me);
    },

    /**
     * @private
     * Handler method called when there is a keyup event on an input
     * item of this menu.
     */
    onInputKeyUp : function (field, e) {
        var k = e.getKey();
        if (k == e.RETURN && field.isValid()) {
            e.stopEvent();
            this.menu.hide();
        }
    },

    /**
     * Handler for when the DatePicker for a field fires the 'select' event
     * @param {Ext.picker.Date} picker
     * @param {Object} date
     */
    onMenuSelect : function (picker, date) {
        var fields = this.fields,
            field = this.fields[picker.itemId];

        field.setChecked(true);

        if (field == fields.on) {
            fields.before.setChecked(false, true);
            fields.after.setChecked(false, true);
        } else {
            fields.on.setChecked(false, true);
            if (field == fields.after && this.getFieldValue('before') < date) {
                fields.before.setChecked(false, true);
            } else if (field == fields.before && this.getFieldValue('after') > date) {
                fields.after.setChecked(false, true);
            }
        }
        this.fireEvent('update', this);

        picker.up('menu').hide();
    },

    /**
     * @private
     * Template method that is to get and return the value of the filter.
     * @return {String} The value of this filter
     */
    getValue : function () {
        var key, result = {};
        for (key in this.fields) {
            if (this.fields[key].checked) {
                result[key] = this.getFieldValue(key);
            }
        }
        return result;
    },

    /**
     * @private
     * Template method that is to set the value of the filter.
     * @param {Object} value The value to set the filter
     * @param {Boolean} preserve true to preserve the checked status
     * of the other fields.  Defaults to false, unchecking the
     * other fields
     */
    setValue : function (value, preserve) {
        var key;
        for (key in this.fields) {
            if(value[key]){
                this.getPicker(key).setValue(value[key]);
                this.fields[key].setChecked(true);
            } else if (!preserve) {
                this.fields[key].setChecked(false);
            }
        }
        this.fireEvent('update', this);
    },

    /**
     * @private
     * Template method that is to return <tt>true</tt> if the filter
     * has enough configuration information to be activated.
     * @return {Boolean}
     */
    isActivatable : function () {
        var key;
        for (key in this.fields) {
            if (this.fields[key].checked) {
                return true;
            }
        }
        return false;
    },

    /**
     * @private
     * Template method that is to get and return serialized filter data for
     * transmission to the server.
     * @return {Object/Array} An object or collection of objects containing
     * key value pairs representing the current configuration of the filter.
     */
    getSerialArgs : function () {
        var args = [];
        for (var key in this.fields) {
            if(this.fields[key].checked){
                args.push({
                    type: 'date',
                    comparison: this.compareMap[key],
                    value: Ext.Date.format(this.getFieldValue(key), this.dateFormat)
                });
            }
        }
        return args;
    },

    /**
     * Get and return the date menu picker value
     * @param {String} item The field identifier ('before', 'after', 'on')
     * @return {Date} Gets the current selected value of the date field
     */
    getFieldValue : function(item){
        return this.values[item];
    },

    /**
     * Gets the menu picker associated with the passed field
     * @param {String} item The field identifier ('before', 'after', 'on')
     * @return {Object} The menu picker
     */
    getPicker : function(item){
        return this.fields[item].menu.items.first();
    },

    /**
     * Template method that is to validate the provided Ext.data.Record
     * against the filters configuration.
     * @param {Ext.data.Record} record The record to validate
     * @return {Boolean} true if the record is valid within the bounds
     * of the filter, false otherwise.
     */
    validateRecord : function (record) {
        var key,
            pickerValue,
            val = record.get(this.dataIndex),
            clearTime = Ext.Date.clearTime;

        if(!Ext.isDate(val)){
            return false;
        }
        val = clearTime(val, true).getTime();

        for (key in this.fields) {
            if (this.fields[key].checked) {
                pickerValue = clearTime(this.getFieldValue(key), true).getTime();
                if (key == 'before' && pickerValue <= val) {
                    return false;
                }
                if (key == 'after' && pickerValue >= val) {
                    return false;
                }
                if (key == 'on' && pickerValue != val) {
                    return false;
                }
            }
        }
        return true;
    },

    onPickerSelect: function(picker, date) {
        // keep track of the picker value separately because the menu gets destroyed
        // when columns order changes.  We return this value from getValue() instead
        // of picker.getValue()
        this.values[picker.itemId] = date;
        this.fireEvent('update', this);
    }
});

/**
 * @class Ext.ux.grid.filter.StringFilter
 * @extends Ext.ux.grid.filter.Filter
 * Filter by a configurable Ext.form.field.Text
 * <p><b><u>Example Usage:</u></b></p>
 * <pre><code>
var filters = Ext.create('Ext.ux.grid.GridFilters', {
    ...
    filters: [{
        // required configs
        type: 'string',
        dataIndex: 'name',

        // optional configs
        value: 'foo',
        active: true, // default is false
        iconCls: 'ux-gridfilter-text-icon' // default
        // any Ext.form.field.Text configs accepted
    }]
});
 * </code></pre>
 */
Ext.define('Ext.ux.grid.filter.StringFilter', {
    extend: 'Ext.ux.grid.filter.Filter',
    alias: 'gridfilter.string',

    /**
     * @cfg {String} iconCls
     * The iconCls to be applied to the menu item.
     * Defaults to <tt>'ux-gridfilter-text-icon'</tt>.
     */
    iconCls : 'ux-gridfilter-text-icon',

    emptyText: 'Enter Filter Text...',
    selectOnFocus: true,
    width: 125,

    /**
     * @private
     * Template method that is to initialize the filter and install required menu items.
     */
    init : function (config) {
        Ext.applyIf(config, {
            enableKeyEvents: true,
            iconCls: this.iconCls,
            hideLabel: true,
            listeners: {
                scope: this,
                keyup: this.onInputKeyUp,
                el: {
                    click: function(e) {
                        e.stopPropagation();
                    }
                }
            }
        });

        this.inputItem = Ext.create('Ext.form.field.Text', config);
        this.menu.add(this.inputItem);
        this.updateTask = Ext.create('Ext.util.DelayedTask', this.fireUpdate, this);
    },

    /**
     * @private
     * Template method that is to get and return the value of the filter.
     * @return {String} The value of this filter
     */
    getValue : function () {
        return this.inputItem.getValue();
    },

    /**
     * @private
     * Template method that is to set the value of the filter.
     * @param {Object} value The value to set the filter
     */
    setValue : function (value) {
        this.inputItem.setValue(value);
        this.fireEvent('update', this);
    },

    /**
     * @private
     * Template method that is to return <tt>true</tt> if the filter
     * has enough configuration information to be activated.
     * @return {Boolean}
     */
    isActivatable : function () {
        return this.inputItem.getValue().length > 0;
    },

    /**
     * @private
     * Template method that is to get and return serialized filter data for
     * transmission to the server.
     * @return {Object/Array} An object or collection of objects containing
     * key value pairs representing the current configuration of the filter.
     */
    getSerialArgs : function () {
        return {type: 'string', value: this.getValue()};
    },

    /**
     * Template method that is to validate the provided Ext.data.Record
     * against the filters configuration.
     * @param {Ext.data.Record} record The record to validate
     * @return {Boolean} true if the record is valid within the bounds
     * of the filter, false otherwise.
     */
    validateRecord : function (record) {
        var val = record.get(this.dataIndex);

        if(typeof val != 'string') {
            return (this.getValue().length === 0);
        }

        return val.toLowerCase().indexOf(this.getValue().toLowerCase()) > -1;
    },

    /**
     * @private
     * Handler method called when there is a keyup event on this.inputItem
     */
    onInputKeyUp : function (field, e) {
        var k = e.getKey();
        if (k == e.RETURN && field.isValid()) {
            e.stopEvent();
            this.menu.hide();
            return;
        }
        // restart the timer
        this.updateTask.delay(this.updateBuffer);
    }
});

/**
 * @class Ext.ux.grid.filter.NumericFilter
 * @extends Ext.ux.grid.filter.Filter
 * Filters using an Ext.ux.grid.menu.RangeMenu.
 * <p><b><u>Example Usage:</u></b></p>
 * <pre><code>
var filters = Ext.create('Ext.ux.grid.GridFilters', {
    ...
    filters: [{
        type: 'numeric',
        dataIndex: 'price'
    }]
});
 * </code></pre>
 * <p>Any of the configuration options for {@link Ext.ux.grid.menu.RangeMenu} can also be specified as
 * configurations to NumericFilter, and will be copied over to the internal menu instance automatically.</p>
 */
Ext.define('Ext.ux.grid.filter.NumericFilter', {
    extend: 'Ext.ux.grid.filter.Filter',
    alias: 'gridfilter.numeric',
    uses: ['Ext.form.field.Number'],

    /**
     * @private @override
     * Creates the Menu for this filter.
     * @param {Object} config Filter configuration
     * @return {Ext.menu.Menu}
     */
    createMenu: function(config) {
        var me = this,
            menu;
        menu = Ext.create('Ext.ux.grid.menu.RangeMenu', config);
        menu.on('update', me.fireUpdate, me);
        return menu;
    },

    /**
     * @private
     * Template method that is to get and return the value of the filter.
     * @return {String} The value of this filter
     */
    getValue : function () {
        return this.menu.getValue();
    },

    /**
     * @private
     * Template method that is to set the value of the filter.
     * @param {Object} value The value to set the filter
     */
    setValue : function (value) {
        this.menu.setValue(value);
    },

    /**
     * @private
     * Template method that is to return <tt>true</tt> if the filter
     * has enough configuration information to be activated.
     * @return {Boolean}
     */
    isActivatable : function () {
        var values = this.getValue(),
            key;
        for (key in values) {
            if (values[key] !== undefined) {
                return true;
            }
        }
        return false;
    },

    /**
     * @private
     * Template method that is to get and return serialized filter data for
     * transmission to the server.
     * @return {Object/Array} An object or collection of objects containing
     * key value pairs representing the current configuration of the filter.
     */
    getSerialArgs : function () {
        var key,
            args = [],
            values = this.menu.getValue();
        for (key in values) {
            args.push({
                type: 'numeric',
                comparison: key,
                value: values[key]
            });
        }
        return args;
    },

    /**
     * Template method that is to validate the provided Ext.data.Record
     * against the filters configuration.
     * @param {Ext.data.Record} record The record to validate
     * @return {Boolean} true if the record is valid within the bounds
     * of the filter, false otherwise.
     */
    validateRecord : function (record) {
        var val = record.get(this.dataIndex),
            values = this.getValue(),
            isNumber = Ext.isNumber;
        if (isNumber(values.eq) && val != values.eq) {
            return false;
        }
        if (isNumber(values.lt) && val >= values.lt) {
            return false;
        }
        if (isNumber(values.gt) && val <= values.gt) {
            return false;
        }
        return true;
    }
});

/**
 * @class Ext.ux.grid.filter.ListFilter
 * @extends Ext.ux.grid.filter.Filter
 * <p>List filters are able to be preloaded/backed by an Ext.data.Store to load
 * their options the first time they are shown. ListFilter utilizes the
 * {@link Ext.ux.grid.menu.ListMenu} component.</p>
 * <p>Although not shown here, this class accepts all configuration options
 * for {@link Ext.ux.grid.menu.ListMenu}.</p>
 *
 * <p><b><u>Example Usage:</u></b></p>
 * <pre><code>
var filters = Ext.create('Ext.ux.grid.GridFilters', {
    ...
    filters: [{
        type: 'list',
        dataIndex: 'size',
        phpMode: true,
        // options will be used as data to implicitly creates an ArrayStore
        options: ['extra small', 'small', 'medium', 'large', 'extra large']
    }]
});
 * </code></pre>
 *
 */
Ext.define('Ext.ux.grid.filter.ListFilter', {
    extend: 'Ext.ux.grid.filter.Filter',
    alias: 'gridfilter.list',

    /**
     * @cfg {Array} options
     * <p><code>data</code> to be used to implicitly create a data store
     * to back this list when the data source is <b>local</b>. If the
     * data for the list is remote, use the <code>{@link #store}</code>
     * config instead.</p>
     * <br><p>Each item within the provided array may be in one of the
     * following formats:</p>
     * <div class="mdetail-params"><ul>
     * <li><b>Array</b> :
     * <pre><code>
options: [
    [11, 'extra small'],
    [18, 'small'],
    [22, 'medium'],
    [35, 'large'],
    [44, 'extra large']
]
     * </code></pre>
     * </li>
     * <li><b>Object</b> :
     * <pre><code>
labelField: 'name', // override default of 'text'
options: [
    {id: 11, name:'extra small'},
    {id: 18, name:'small'},
    {id: 22, name:'medium'},
    {id: 35, name:'large'},
    {id: 44, name:'extra large'}
]
     * </code></pre>
     * </li>
     * <li><b>String</b> :
     * <pre><code>
     * options: ['extra small', 'small', 'medium', 'large', 'extra large']
     * </code></pre>
     * </li>
     */
    /**
     * @cfg {Boolean} phpMode
     * <p>Adjust the format of this filter. Defaults to false.</p>
     * <br><p>When GridFilters <code>@cfg encode = false</code> (default):</p>
     * <pre><code>
// phpMode == false (default):
filter[0][data][type] list
filter[0][data][value] value1
filter[0][data][value] value2
filter[0][field] prod

// phpMode == true:
filter[0][data][type] list
filter[0][data][value] value1, value2
filter[0][field] prod
     * </code></pre>
     * When GridFilters <code>@cfg encode = true</code>:
     * <pre><code>
// phpMode == false (default):
filter : [{"type":"list","value":["small","medium"],"field":"size"}]

// phpMode == true:
filter : [{"type":"list","value":"small,medium","field":"size"}]
     * </code></pre>
     */
    phpMode : false,
    /**
     * @cfg {Ext.data.Store} store
     * The {@link Ext.data.Store} this list should use as its data source
     * when the data source is <b>remote</b>. If the data for the list
     * is local, use the <code>{@link #options}</code> config instead.
     */

    /**
     * @private
     * Template method that is to initialize the filter.
     * @param {Object} config
     */
    init : function (config) {
        this.dt = Ext.create('Ext.util.DelayedTask', this.fireUpdate, this);
    },

    /**
     * @private @override
     * Creates the Menu for this filter.
     * @param {Object} config Filter configuration
     * @return {Ext.menu.Menu}
     */
    createMenu: function(config) {
        var menu = Ext.create('Ext.ux.grid.menu.ListMenu', config);
        menu.on('checkchange', this.onCheckChange, this);
        return menu;
    },

    /**
     * @private
     * Template method that is to get and return the value of the filter.
     * @return {String} The value of this filter
     */
    getValue : function () {
        return this.menu.getSelected();
    },
    /**
     * @private
     * Template method that is to set the value of the filter.
     * @param {Object} value The value to set the filter
     */
    setValue : function (value) {
        this.menu.setSelected(value);
        this.fireEvent('update', this);
    },

    /**
     * @private
     * Template method that is to return <tt>true</tt> if the filter
     * has enough configuration information to be activated.
     * @return {Boolean}
     */
    isActivatable : function () {
        return this.getValue().length > 0;
    },

    /**
     * @private
     * Template method that is to get and return serialized filter data for
     * transmission to the server.
     * @return {Object/Array} An object or collection of objects containing
     * key value pairs representing the current configuration of the filter.
     */
    getSerialArgs : function () {
        return {type: 'list', value: this.phpMode ? this.getValue().join(',') : this.getValue()};
    },

    /** @private */
    onCheckChange : function(){
        this.dt.delay(this.updateBuffer);
    },


    /**
     * Template method that is to validate the provided Ext.data.Record
     * against the filters configuration.
     * @param {Ext.data.Record} record The record to validate
     * @return {Boolean} true if the record is valid within the bounds
     * of the filter, false otherwise.
     */
    validateRecord : function (record) {
        var valuesArray = this.getValue();
        return Ext.Array.indexOf(valuesArray, record.get(this.dataIndex)) > -1;
    }
});

/**
 * @class Ext.ux.Exporter.ExcelFormatter.Workbook
 * @extends Object
 * Represents an Excel workbook
 */
Ext.define("Ext.ux.exporter.excelFormatter.Workbook", {

    constructor:function (config) {
        config = config || {};

        Ext.apply(this, config, {
            /**
             * @property title
             * @type String
             * The title of the workbook (defaults to "Workbook")
             */
            title:"Workbook",

            /**
             * @property worksheets
             * @type Array
             * The array of worksheets inside this workbook
             */
            worksheets:[],

            /**
             * @property compileWorksheets
             * @type Array
             * Array of all rendered Worksheets
             */
            compiledWorksheets:[],

            /**
             * @property cellBorderColor
             * @type String
             * The colour of border to use for each Cell
             */
            cellBorderColor:"#e4e4e4",

            /**
             * @property styles
             * @type Array
             * The array of Ext.ux.Exporter.ExcelFormatter.Style objects attached to this workbook
             */
            styles:[],

            /**
             * @property compiledStyles
             * @type Array
             * Array of all rendered Ext.ux.Exporter.ExcelFormatter.Style objects for this workbook
             */
            compiledStyles:[],

            /**
             * @property hasDefaultStyle
             * @type Boolean
             * True to add the default styling options to all cells (defaults to true)
             */
            hasDefaultStyle:true,

            /**
             * @property hasStripeStyles
             * @type Boolean
             * True to add the striping styles (defaults to true)
             */
            hasStripeStyles:true,

            windowHeight:9000,
            windowWidth:50000,
            protectStructure:false,
            protectWindows:false
        });

        if (this.hasDefaultStyle) this.addDefaultStyle();
        if (this.hasStripeStyles) this.addStripedStyles();

        this.addTitleStyle();
        this.addHeaderStyle();
    },

    render:function () {
        this.compileStyles();
        this.joinedCompiledStyles = this.compiledStyles.join("");

        this.compileWorksheets();
        this.joinedWorksheets = this.compiledWorksheets.join("");

        return this.tpl.apply(this);
    },

    /**
     * Adds a worksheet to this workbook based on a store and optional config
     * @param {Ext.data.Store} store The store to initialize the worksheet with
     * @param {Object} config Optional config object
     * @return {Ext.ux.Exporter.ExcelFormatter.Worksheet} The worksheet
     */
    addWorksheet:function (store, config) {
        var worksheet = new Ext.ux.exporter.excelFormatter.Worksheet(store, config);

        this.worksheets.push(worksheet);

        return worksheet;
    },

    /**
     * Adds a new Ext.ux.Exporter.ExcelFormatter.Style to this Workbook
     * @param {Object} config The style config, passed to the Style constructor (required)
     */
    addStyle:function (config) {
        var style = new Ext.ux.exporter.excelFormatter.Style(config || {});

        this.styles.push(style);

        return style;
    },

    /**
     * Compiles each Style attached to this Workbook by rendering it
     * @return {Array} The compiled styles array
     */
    compileStyles:function () {
        this.compiledStyles = [];

        Ext.each(this.styles, function (style) {
            this.compiledStyles.push(style.render());
        }, this);

        return this.compiledStyles;
    },

    /**
     * Compiles each Worksheet attached to this Workbook by rendering it
     * @return {Array} The compiled worksheets array
     */
    compileWorksheets:function () {
        this.compiledWorksheets = [];

        Ext.each(this.worksheets, function (worksheet) {
            this.compiledWorksheets.push(worksheet.render());
        }, this);

        return this.compiledWorksheets;
    },

    tpl:new Ext.XTemplate(
        '<?xml version="1.0" encoding="utf-8"?>',
        '<ss:Workbook xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:o="urn:schemas-microsoft-com:office:office">',
        '<o:DocumentProperties>',
        '<o:Title>{title}</o:Title>',
        '</o:DocumentProperties>',
        '<ss:ExcelWorkbook>',
        '<ss:WindowHeight>{windowHeight}</ss:WindowHeight>',
        '<ss:WindowWidth>{windowWidth}</ss:WindowWidth>',
        '<ss:ProtectStructure>{protectStructure}</ss:ProtectStructure>',
        '<ss:ProtectWindows>{protectWindows}</ss:ProtectWindows>',
        '</ss:ExcelWorkbook>',
        '<ss:Styles>',
        '{joinedCompiledStyles}',
        '</ss:Styles>',
        '{joinedWorksheets}',
        '</ss:Workbook>'
    ),

    /**
     * Adds the default Style to this workbook. This sets the default font face and size, as well as cell borders
     */
    addDefaultStyle:function () {
        var borderProperties = [
            {name:"Color", value:this.cellBorderColor},
            {name:"Weight", value:"1"},
            {name:"LineStyle", value:"Continuous"}
        ];

        this.addStyle({
            id:'Default',
            attributes:[
                {
                    name:"Alignment",
                    properties:[
                        {name:"Vertical", value:"Top"},
                        {name:"WrapText", value:"1"}
                    ]
                },
                {
                    name:"Font",
                    properties:[
                        {name:"FontName", value:"arial"},
                        {name:"Size", value:"10"}
                    ]
                },
                {name:"Interior"},
                {name:"NumberFormat"},
                {name:"Protection"},
                {
                    name:"Borders",
                    children:[
                        {
                            name:"Border",
                            properties:[
                                {name:"Position", value:"Top"}
                            ].concat(borderProperties)
                        },
                        {
                            name:"Border",
                            properties:[
                                {name:"Position", value:"Bottom"}
                            ].concat(borderProperties)
                        },
                        {
                            name:"Border",
                            properties:[
                                {name:"Position", value:"Left"}
                            ].concat(borderProperties)
                        },
                        {
                            name:"Border",
                            properties:[
                                {name:"Position", value:"Right"}
                            ].concat(borderProperties)
                        }
                    ]
                }
            ]
        });
    },

    addTitleStyle:function () {
        this.addStyle({
            id:"title",
            attributes:[
                {name:"Borders"},
                {name:"Font"},
                {
                    name:"NumberFormat",
                    properties:[
                        {name:"Format", value:"@"}
                    ]
                },
                {
                    name:"Alignment",
                    properties:[
                        {name:"WrapText", value:"1"},
                        {name:"Horizontal", value:"Center"},
                        {name:"Vertical", value:"Center"}
                    ]
                }
            ]
        });
    },

    addHeaderStyle:function () {
        this.addStyle({
            id:"headercell",
            attributes:[
                {
                    name:"Font",
                    properties:[
                        {name:"Bold", value:"1"},
                        {name:"Size", value:"10"}
                    ]
                },
                {
                    name:"Interior",
                    properties:[
                        {name:"Pattern", value:"Solid"},
                        {name:"Color", value:"#A3C9F1"}
                    ]
                },
                {
                    name:"Alignment",
                    properties:[
                        {name:"WrapText", value:"1"},
                        {name:"Horizontal", value:"Center"}
                    ]
                }
            ]
        });
    },

    /**
     * Adds the default striping styles to this workbook
     */
    addStripedStyles:function () {
        this.addStyle({
            id:"even",
            attributes:[
                {
                    name:"Interior",
                    properties:[
                        {name:"Pattern", value:"Solid"},
                        {name:"Color", value:"#CCFFFF"}
                    ]
                }
            ]
        });

        this.addStyle({
            id:"odd",
            attributes:[
                {
                    name:"Interior",
                    properties:[
                        {name:"Pattern", value:"Solid"},
                        {name:"Color", value:"#CCCCFF"}
                    ]
                }
            ]
        });

        Ext.each(['even', 'odd'], function (parentStyle) {
            this.addChildNumberFormatStyle(parentStyle, parentStyle + 'date', "[ENG][$-409]dd\-mmm\-yyyy;@");
            this.addChildNumberFormatStyle(parentStyle, parentStyle + 'int', "0");
            this.addChildNumberFormatStyle(parentStyle, parentStyle + 'float', "0.00");
        }, this);
    },

    /**
     * Private convenience function to easily add a NumberFormat style for a given parentStyle
     * @param {String} parentStyle The ID of the parentStyle Style
     * @param {String} id The ID of the new style
     * @param {String} value The value of the NumberFormat's Format property
     */
    addChildNumberFormatStyle:function (parentStyle, id, value) {
        this.addStyle({
            id:id,
            parentStyle:"even",
            attributes:[
                {
                    name:"NumberFormat",
                    properties:[
                        {name:"Format", value:value}
                    ]
                }
            ]
        });
    }
});
/**
 * @class Ext.ux.Exporter.ExcelFormatter.Cell
 * @extends Object
 * Represents a single cell in a worksheet
 */

Ext.define("Ext.ux.exporter.excelFormatter.Cell", {
    constructor:function (config) {
        Ext.applyIf(config, {
            type:"String"
        });

        Ext.apply(this, config);

        Ext.ux.exporter.excelFormatter.Cell.superclass.constructor.apply(this, arguments);
    },

    render:function () {
        return this.tpl.apply(this);
    },

    tpl:new Ext.XTemplate(
        '<ss:Cell ss:StyleID="{style}">',
        '<ss:Data ss:Type="{type}"><![CDATA[{value}]]></ss:Data>',
        '</ss:Cell>'
    )
});
/**
 * @class Ext.ux.Exporter.ExcelFormatter.Worksheet
 * @extends Object
 * Represents an Excel worksheet
 * @cfg {Ext.data.Store} store The store to use (required)
 */
Ext.define("Ext.ux.exporter.excelFormatter.Worksheet", {

    constructor:function (store, config) {
        config = config || {};

        this.store = store;

        Ext.applyIf(config, {
            hasTitle:true,
            hasHeadings:true,
            stripeRows:true,

            title:"Workbook",
            columns:store.fields == undefined ? {} : store.fields.items
        });

        Ext.apply(this, config);

        Ext.ux.exporter.excelFormatter.Worksheet.superclass.constructor.apply(this, arguments);
    },

    /**
     * @property dateFormatString
     * @type String
     * String used to format dates (defaults to "Y-m-d"). All other data types are left unmolested
     */
    dateFormatString:"Y-m-d",

    worksheetTpl:new Ext.XTemplate(
        '<ss:Worksheet ss:Name="{title}">',
        '<ss:Names>',
        '<ss:NamedRange ss:Name="Print_Titles" ss:RefersTo="=\'{title}\'!R1:R2" />',
        '</ss:Names>',
        '<ss:Table x:FullRows="1" x:FullColumns="1" ss:ExpandedColumnCount="{colCount}" ss:ExpandedRowCount="{rowCount}">',
        '{columns}',
        '<ss:Row ss:Height="38">',
        '<ss:Cell ss:StyleID="title" ss:MergeAcross="{colCount - 1}">',
        '<ss:Data xmlns:html="http://www.w3.org/TR/REC-html40" ss:Type="String">',
        '<html:B><html:U><html:Font html:Size="15">{title}',
        '</html:Font></html:U></html:B></ss:Data><ss:NamedCell ss:Name="Print_Titles" />',
        '</ss:Cell>',
        '</ss:Row>',
        '<ss:Row ss:AutoFitHeight="1">',
        '{header}',
        '</ss:Row>',
        '{rows}',
        '</ss:Table>',
        '<x:WorksheetOptions>',
        '<x:PageSetup>',
        '<x:Layout x:CenterHorizontal="1" x:Orientation="Landscape" />',
        '<x:Footer x:Data="Page &amp;P of &amp;N" x:Margin="0.5" />',
        '<x:PageMargins x:Top="0.5" x:Right="0.5" x:Left="0.5" x:Bottom="0.8" />',
        '</x:PageSetup>',
        '<x:FitToPage />',
        '<x:Print>',
        '<x:PrintErrors>Blank</x:PrintErrors>',
        '<x:FitWidth>1</x:FitWidth>',
        '<x:FitHeight>32767</x:FitHeight>',
        '<x:ValidPrinterInfo />',
        '<x:VerticalResolution>600</x:VerticalResolution>',
        '</x:Print>',
        '<x:Selected />',
        '<x:DoNotDisplayGridlines />',
        '<x:ProtectObjects>False</x:ProtectObjects>',
        '<x:ProtectScenarios>False</x:ProtectScenarios>',
        '</x:WorksheetOptions>',
        '</ss:Worksheet>'
    ),

    /**
     * Builds the Worksheet XML
     * @param {Ext.data.Store} store The store to build from
     */
    render:function (store) {
        return this.worksheetTpl.apply({
            header:this.buildHeader(),
            columns:this.buildColumns().join(""),
            rows:this.buildRows().join(""),
            colCount:this.columns.length,
            rowCount:this.store.getCount() + 2,
            title:this.title
        });
    },

    buildColumns:function () {
        var cols = [];

        Ext.each(this.columns, function (column) {
            cols.push(this.buildColumn());
        }, this);

        return cols;
    },

    buildColumn:function (width) {
        return Ext.String.format('<ss:Column ss:AutoFitWidth="1" ss:Width="{0}" />', width || 164);
    },

    buildRows:function () {
        var rows = [];

        this.store.each(function (record, index) {
            rows.push(this.buildRow(record, index));
        }, this);

        return rows;
    },

    buildHeader:function () {
        var cells = [];

        Ext.each(this.columns, function (col) {
            var title;

            //if(col.dataIndex) {
            if (col.text != undefined) {
                title = col.text;
            } else if (col.name) {
                //make columns taken from Record fields (e.g. with a col.name) human-readable
                title = col.name.replace(/_/g, " ");
                title = Ext.String.capitalize(title);
            }

            cells.push(Ext.String.format('<ss:Cell ss:StyleID="headercell"><ss:Data ss:Type="String">{0}</ss:Data><ss:NamedCell ss:Name="Print_Titles" /></ss:Cell>', title));
            //}
        }, this);

        return cells.join("");
    },

    buildRow:function (record, index) {
        var style,
            cells = [];
        if (this.stripeRows === true) style = index % 2 == 0 ? 'even' : 'odd';

        Ext.each(this.columns, function (col) {
            var name = col.name || col.dataIndex;

            if (name) {
                //if given a renderer via a ColumnModel, use it and ensure data type is set to String
                if (Ext.isFunction(col.renderer)) {
                    var value = col.renderer(record.get(name), null, record),
                        type = "String";
                } else {
                    var value = record.get(name),
                        type = this.typeMappings[col.type || record.fields.get(name).type.type];
                }

                cells.push(this.buildCell(value, type, style).render());
            }
        }, this);

        return Ext.String.format("<ss:Row>{0}</ss:Row>", cells.join(""));
    },

    buildCell:function (value, type, style) {
        if (type == "DateTime" && Ext.isFunction(value.format)) value = value.format(this.dateFormatString);

        return new Ext.ux.exporter.excelFormatter.Cell({
            value:value,
            type:type,
            style:style
        });
    },

    /**
     * @property typeMappings
     * @type Object
     * Mappings from Ext.data.Record types to Excel types
     */
    typeMappings:{
        'int':"Number",
        'string':"String",
        'float':"Number",
        'date':"DateTime"
    }
});
/**
 * @class Ext.ux.Exporter.ExcelFormatter.Style
 * @extends Object
 * Represents a style declaration for a Workbook (this is like defining CSS rules). Example:
 *
 * new Ext.ux.Exporter.ExcelFormatter.Style({
 *   attributes: [
 *     {
 *       name: "Alignment",
 *       properties: [
 *         {name: "Vertical", value: "Top"},
 *         {name: "WrapText", value: "1"}
 *       ]
 *     },
 *     {
 *       name: "Borders",
 *       children: [
 *         name: "Border",
 *         properties: [
 *           {name: "Color", value: "#e4e4e4"},
 *           {name: "Weight", value: "1"}
 *         ]
 *       ]
 *     }
 *   ]
 * })
 *
 * @cfg {String} id The ID of this style (required)
 * @cfg {Array} attributes The attributes for this style
 * @cfg {String} parentStyle The (optional parentStyle ID)
 */
Ext.define("Ext.ux.exporter.excelFormatter.Style", {
    constructor:function (config) {
        config = config || {};

        Ext.apply(this, config, {
            parentStyle:'',
            attributes:[]
        });

        Ext.ux.exporter.excelFormatter.Style.superclass.constructor.apply(this, arguments);

        if (this.id == undefined) throw new Error("An ID must be provided to Style");

        this.preparePropertyStrings();
    },

    /**
     * Iterates over the attributes in this style, and any children they may have, creating property
     * strings on each suitable for use in the XTemplate
     */
    preparePropertyStrings:function () {
        Ext.each(this.attributes, function (attr, index) {
            this.attributes[index].propertiesString = this.buildPropertyString(attr);
            this.attributes[index].children = attr.children || [];

            Ext.each(attr.children, function (child, childIndex) {
                this.attributes[index].children[childIndex].propertiesString = this.buildPropertyString(child);
            }, this);
        }, this);
    },

    /**
     * Builds a concatenated property string for a given attribute, suitable for use in the XTemplate
     */
    buildPropertyString:function (attribute) {
        var propertiesString = "";

        Ext.each(attribute.properties || [], function (property) {
            propertiesString += Ext.String.format('ss:{0}="{1}" ', property.name, property.value);
        }, this);

        return propertiesString;
    },

    render:function () {
        return this.tpl.apply(this);
    },

    tpl:new Ext.XTemplate(
        '<tpl if="parentStyle.length == 0">',
        '<ss:Style ss:ID="{id}">',
        '</tpl>',
        '<tpl if="parentStyle.length != 0">',
        '<ss:Style ss:ID="{id}" ss:Parent="{parentStyle}">',
        '</tpl>',
        '<tpl for="attributes">',
        '<tpl if="children.length == 0">',
        '<ss:{name} {propertiesString} />',
        '</tpl>',
        '<tpl if="children.length > 0">',
        '<ss:{name} {propertiesString}>',
        '<tpl for="children">',
        '<ss:{name} {propertiesString} />',
        '</tpl>',
        '</ss:{name}>',
        '</tpl>',
        '</tpl>',
        '</ss:Style>'
    )
});
Ext.define('CS.view.CompoundWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.cs.compound.window',

    title: 'ChemSpider compound details...',
    layout: {
        type: 'table',
        columns: 2
    },
    defaults: { 
        frame: true, 
        margin: '5 5 5 5'
    },
    modal: false,
    resizable: false,
    autoShow: false,
    closeAction: 'hide',
    height: 650,
    width: 800,
    initComponent: function () {
        //  create component for displaying general compound information
        this.compoundInfo = Ext.create('CS.view.Compound', {
            title: 'Properties',
            height: 270,
            frame: true,
            colspan: 2
        });
        //  component will display compound synonyms
        this.synonyms = Ext.create('CS.view.Synonyms', { 
            id: 'csWindowSynonyms', 
            title: 'Synonyms',
            height: 300,
            width: 385,
            frame: true
        });
        //  component will display compound darasources
        this.datasources = Ext.create('CS.view.DataSources', { 
            id: 'csWindowDataSources',
            title: 'Data Sources',
            height: 300,
            width: 385,
            frame: true
        });

        //  create data store for getting access to compound's data
        this.compoundStore = Ext.create('CS.store.Compound');

        //  create 'Loading...' mask for displaying during the loading process
        this.loadingMask = new Ext.LoadMask(this, { msg: "Loading..." });

        this.items = [
            this.compoundInfo,
            this.synonyms,
            this.datasources
        ];

        this.buttons = [{
            text: 'Close',
            scope: this,
            handler: this.close
        }];

        this.callParent(arguments);
    },

    showCompound: function (csid) {
        var oThis = this;

        this.compoundStore.load({
            params: { 'csids[0]': csid, serfilter: 'Compound[CSID|Name|MF|Mol|MM|Synonyms|References|Blobs|Identifiers]' },
            callback: function (records, operation, success) {
                if(success) {
                    var compound = oThis.compoundStore.first();

                    oThis.compoundInfo.loadData(compound);
                    oThis.synonyms.loadData(compound);
                    oThis.datasources.loadData(compound);
                }
                else {
                    Ext.MessageBox.show({
                        title: 'Error',
                        msg: 'Cannot get compoun details for CSID - ' + csid + ': ' + operation.error,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                }

                oThis.loadingMask.hide();
            }
        });

        this.show();

        this.loadingMask.show();
    }
});

Ext.define('CS.config.Settings', {
    singleton: true,
//    baseUrl: 'http://cs.beta.rsc-us.org'
    baseUrl: 'http://www.chemspider.com'
});

Ext.define('CS.view.BaseProperties', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.cs.baseproperties',
    requires: ['CS.config.Settings'],
    autoScroll: true,
    layout: 'fit',
    border: 0,
    constructor: function () {
        this.callParent(arguments);

        this.tpl = new Ext.XTemplate(
            '<tpl for=".">',
                '<div class="base_props">',
                    '<div class="name">{Name}</div>',
                    '<div class="mf">{MF:this.formatFormula}</div>',
                    '<div class="prop"><span class="name">ChemSpider ID:</span> <a href="' + CS.config.Settings.baseUrl + '/{CSID}" target="chemspider">{CSID}</a></div>',
                    '<div class="prop"><span class="name">Monoisotopic mass:</span> {MM}</div>',
                    '<tpl for="Identifiers">',
                        '<tpl if="this.isSMILES(values)">',
                            '<div class="prop"><span class="name">SMILES:</span> {Value}</div>',
                        '</tpl>',
                        '<tpl if="this.isStdInChi(values)">',
                            '<div class="prop"><span class="name">Std. InChI:</span> {Value}</div>',
                        '</tpl>',
                        '<tpl if="this.isStdInChiKey(values)">',
                            '<div class="prop"><span class="name">Std. InChIKey:</span> {Value}</div>',
                        '</tpl>',
                    '</tpl>',
                '</div>',
            '</tpl>',
            {
                formatFormula: function (mf) {
                    return mf.replace(/_{/g, '<sub>').replace(/}/g, '</sub>');
                },
                isSMILES: function (values) {
                    return values.IdentifierType == 1;
                },
                isStdInChi: function (values) {
                    return values.IdentifierType == 0 && values.Version == "v1.02s";
                },
                isStdInChiKey: function (values) {
                    return values.IdentifierType == 2 && values.Version == "v1.02s";
                }
            }
        );
    },
    loadData: function (json) {
        this.update(json);
    }
});

Ext.define('CS.view.Molecule2D', {
    extend: 'Ext.Component',
    alias: 'widget.cs.molecule2D',
    autoEl: {
        tag: 'img',
        src: Ext.BLANK_IMAGE_URL
    },
    width: 200,
    height: 200,
    csid: 0,
    onRender: function () {
        this.autoEl = Ext.apply({}, this.initialConfig, this.autoEl);
        this.callParent(arguments);
    },
    setSrc: function (src) {
        if (this.rendered)
            this.el.dom.src = src;
        else
            this.src = src;
    },
    getSrc: function (src) {
        return this.el.dom.src || this.src;
    },
    load: function (csid) {
        this.setSrc(CS.config.Settings.baseUrl + '/ImagesHandler.ashx?id=' + csid + '&w=' + this.width + '&h=' + this.height);
    }
});

Ext.define('CS.view.Molecule3D', {
    extend: 'Ext.Component',
    alias: 'widget.cs.molecule3D',
    width: 200,
    height: 200,
    mol: '',
    autoEl: {
        tag: 'applet',
        code: 'JmolApplet',
        codebase: 'lib/third/jmol',
        archive: 'JmolApplet0.jar',
        mayscript: 'true',
        hspace: 0,
        vspace: 0,
        align: 'middle',
        children: [
            {
                tag: 'param',
                name: 'progressbar',
                value: 'true'
            },
            {
                tag: 'param',
                name: 'bgcolor',
                value: 'white'
            }
        ]
    },
    onRender: function () {
        this.autoEl = Ext.apply({ name: this.id }, this.initialConfig, this.autoEl);
        this.callParent(arguments);

        if (this.mol != '') {
            Ext.defer(function (mol) { this.setMol(mol); }, 200, this, [this.mol]);
        }
    },
    setMol: function (mol) {
        this.getEl().dom.loadInlineString(mol, "", false);
    }
});

Ext.define('CS.view.Compound', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.cs.compound',
    requires: [
        'CS.view.BaseProperties',
        'CS.view.Molecule2D',
        'CS.view.Molecule3D'
    ],
    autoScroll: true,
    border: 0,
    layout: 'hbox',
    bodyStyle: 'background-color: #fff;',
    constructor: function () {
        this.callParent(arguments);
/*
        this.molTabs = Ext.create('Ext.tab.Panel', {
            activeTab: 0,
            width: 210,
            height: 235,
            tabPosition: 'bottom',
            items: [
                    {
                        id: 'tab-mol-2D',
                        title: '2D',
                        items: {
                            xtype: 'cs.molecule2D',
                            id: this.getMol2DId()
                        }
                    },
                    {
                        id: 'tab-mol-3D',
                        title: '3D',
                        items: {
                            xtype: 'cs.molecule3D',
                            id: this.getMol3DId()
                        }
                    }
                ]
        });

        this.molTabs.on('tabchange', function (tab, panel) {
            //  If Jmol tab active...
            if (this.is3DTabActive()) {
                Ext.Function.defer(function (id) {
                    var mol3D = Ext.getCmp(id);
                    mol3D.setMol(this.mol);
                }, 200, this, [this.getMol3DId()]);
            }
        }, this);

        this.add(this.molTabs);
*/
        this.add(
            {
                items: {
                    xtype: 'cs.molecule2D',
                    id: this.getMol2DId(),
                    height: 223
                }
            }
        );

        this.add(
            {
                flex: 1,
                items: {
                    xtype: 'cs.baseproperties',
                    id: this.getBasePropsId(),
                    height: 223
                }
            }
        );
    },
    is3DTabActive: function () {
        return this.molTabs.getActiveTab().id == 'tab-mol-3D';
    },
    getMol2DId: function () {
        return this.id + '_Mol2D';
    },
    getMol3DId: function () {
        return this.id + '_Mol3D';
    },
    getBasePropsId: function () {
        return this.id + '_BaseProps';
    },
    loadData: function (compound) {
        Ext.getCmp(this.getMol2DId()).load(compound.data.CSID);
//        if (this.is3DTabActive()) Ext.getCmp(this.getMol3DId()).setMol(compound.data.Mol);
        Ext.getCmp(this.getBasePropsId()).loadData(compound.data);

        this.mol = compound.data.Mol;
    }
});

Ext.define('CS.view.Synonyms', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.cs.synonyms',
    height: 250,
    cls: 'text-class',
    frame: false,
    border: '0 0 0 0',
    autoScroll: false,
    collapsible: false,
    closable: false,
    bodyStyle: 'background-color: #fff; padding-left: .5em;',
    tpl: new Ext.XTemplate(
        '<tpl if="this.hasSynonyms(values)">',
            '<ul>',
                '<tpl for="Synonyms">',
                    '<li>{Name}</li>',
                '</tpl>',
            '</ul>',
        '</tpl>',
        '<tpl if="!this.hasSynonyms(values)">',
            '<i>No synonyms</i>',
        '</tpl>',
        {
            hasSynonyms: function (values) {
                return values.Synonyms.length > 0;
            }
        }
    ),

    loadData: function (compound) {
        this.update('<i>Loading...</i>');

        //  clear existing tabs...
        this.removeAll();

        if (compound.hasApprovedSynonyms()) 
            this.addTab("Approved", compound.getApprovedSynonyms());

        if (compound.hasConfirmedSynonyms()) 
            this.addTab("Confirmed", compound.getConfirmedSynonyms());

        if (compound.hasDeletedSynonyms()) 
            this.addTab("Deleted", compound.getDeletedSynonyms());

        if (compound.hasRejectedSynonyms()) 
            this.addTab("Rejected", compound.getRejectedSynonyms());

        if (compound.hasUncertaintSynonyms()) 
            this.addTab("Uncertain", compound.getUncertaintSynonyms());

        this.update('');
    },
    addTab: function (name, data) {
        this.add({
            title: name,
            items: {
                xtype: 'panel',
                id: this.id + '_panel' + this.items.getCount(),
                border: 0,
                padding: 0,
                tpl: new Ext.XTemplate(
                    '<ul class="zebra" style="overflow:auto; height:100%;">',
                        '<tpl for=".">',
                            '<li>{Name}</li>',
                        '</tpl>',
                    '</ul>'
                ),
                data: data
            }
        });
    }
});

Ext.define('CS.view.DataSources', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.cs.datasources',
    height: 250,
    border: '0 0 0 0',
    loadData: function (compound) {
        var oThis = this;

        this.removeAll();

        var references = new Ext.util.HashMap();
        for (var i = 0; i < compound.data.References.length; i++) {
            var ref = compound.data.References[i];
            if (ref.Text != null && ref.Text != '') {
                if (!references.containsKey(ref.Source))
                    references.add(ref.Source, new Array());

                references.get(ref.Source).push(ref);
            }
        }

        references.each(function (key, value, length) {
            oThis.add({
                title: key,
                items: {
                    xtype: 'panel',
                    id: oThis.id + '_panel' + oThis.items.getCount(),
                    border: 0,
                    tpl: new Ext.XTemplate(
                        '<ul class="zebra" style="overflow:auto; height:100%;">',
                            '<tpl for=".">',
                                '<li>',
                                    '<tpl if="this.hasLink(values)">',
                                        '<a href="{Link}" target="datasources">{Text}</a>',
                                    '</tpl>',
                                    '<tpl if="!this.hasLink(values)">',
                                        '{Text}',
                                    '</tpl>',
                                '</li>',
                            '</tpl>',
                        '</ul>',
                        {
                            hasLink: function (values) {
                                return values.Link != null && values.Link.length > 0;
                            }
                        }
                    ),
                    data: value
                }
            });
        });
    }
});

Ext.define('CS.model.Compound', {
    extend: 'Ext.data.Model',
    id: 'CSID',
    spectra: null,
    cifs: null,
    images: null,
    uncertaintSyns: null,
    rejectedSyns: null,
    deletedSyns: null,
    confirmedSyns: null,
    approvedSyns: null,
    fields: [
        { name: 'CSID', mapping: 'CSID' },
        { name: 'Name', mapping: 'Name' },
        { name: 'MF', mapping: 'MF' },
        { name: 'AM', mapping: 'AM' },
        { name: 'MW', mapping: 'MW' },
        { name: 'MM', mapping: 'MM' },
        { name: 'Mol', mapping: 'Mol' },
        { name: 'Identifiers', mapping: 'Identifiers' },
        { name: 'Synonyms', mapping: 'Synonyms' },
        { name: 'References', mapping: 'References' },
        { name: 'Blobs', mapping: 'Blobs' }
    ],
    hasSynonyms: function () {
        return this.data != null && this.data.Synonyms.length > 0;
    },
    hasReferences: function () {
        return this.data != null && this.data.References.length > 0;
    },
    hasSpectra: function () {
        if (this.spectra == null) this.parseBlobs();

        return this.spectra.length > 0;
    },
    hasImages: function () {
        if (this.images == null) this.parseBlobs();

        return this.images.length > 0;
    },
    hasCIFs: function () {
        if (this.cifs == null) this.parseBlobs();

        return this.cifs.length > 0;
    },
    getSpectra: function () {
        if (this.spectra == null) this.parseBlobs();

        return this.spectra;
    },
    getImages: function () {
        if (this.images == null) this.parseBlobs();

        return this.images;
    },
    getCIFs: function () {
        if (this.cifs == null) this.parseBlobs();

        return this.cifs;
    },
    parseBlobs: function () {
        this.spectra = new Array();
        this.cifs = new Array();
        this.images = new Array();

        for (var i = 0; i < this.data.Blobs.length; i++) {
            var blob = this.data.Blobs[i];
            if (blob.BlobType == 0) this.spectra.push(blob);
            else if (blob.BlobType == 1) this.images.push(blob);
            else if (blob.BlobType == 2) this.cifs.push(blob);
        }
    },
    hasUncertaintSynonyms: function () {
        if (this.uncertaintSyns == null) this.parseSynonyms();

        return this.uncertaintSyns.length > 0;
    },
    hasRejectedSynonyms: function () {
        if (this.rejectedSyns == null) this.parseSynonyms();

        return this.rejectedSyns.length > 0;
    },
    hasDeletedSynonyms: function () {
        if (this.deletedSyns == null) this.parseSynonyms();

        return this.deletedSyns.length > 0;
    },
    hasConfirmedSynonyms: function () {
        if (this.confirmedSyns == null) this.parseSynonyms();

        return this.confirmedSyns.length > 0;
    },
    hasApprovedSynonyms: function () {
        if (this.approvedSyns == null) this.parseSynonyms();

        return this.approvedSyns.length > 0;
    },
    getUncertaintSynonyms: function () {
        if (this.uncertaintSyns == null) this.parseSynonyms();

        return this.uncertaintSyns;
    },
    getRejectedSynonyms: function () {
        if (this.rejectedSyns == null) this.parseSynonyms();

        return this.rejectedSyns;
    },
    getDeletedSynonyms: function () {
        if (this.deletedSyns == null) this.parseSynonyms();

        return this.deletedSyns;
    },
    getConfirmedSynonyms: function () {
        if (this.confirmedSyns == null) this.parseSynonyms();

        return this.confirmedSyns;
    },
    getApprovedSynonyms: function () {
        if (this.approvedSyns == null) this.parseSynonyms();

        return this.approvedSyns;
    },
    parseSynonyms: function () {
        this.uncertaintSyns = new Array();
        this.rejectedSyns = new Array();
        this.deletedSyns = new Array();
        this.confirmedSyns = new Array();
        this.approvedSyns = new Array();

        /*
        * Reliability:
        * 0 - Uncertaint,
        * 1 - Rejected,
        * 2 - Deleted,
        * 3 - Confirmed,
        * 4 - Approved
        */
        for (var i = 0; i < this.data.Synonyms.length; i++) {
            var syn = this.data.Synonyms[i];

            if (syn.Reliability == 0)
                this.uncertaintSyns.push(syn);
            else if (syn.Reliability == 1)
                this.rejectedSyns.push(syn);
            else if (syn.Reliability == 2)
                this.deletedSyns.push(syn);
            else if (syn.Reliability == 3)
                this.confirmedSyns.push(syn);
            else if (syn.Reliability == 4)
                this.approvedSyns.push(syn);
        }
    }
});

Ext.define('CS.store.Compound', {
    extend: 'Ext.data.Store',
    requires: ['CS.model.Compound', 'CS.config.Settings'],
    model: 'CS.model.Compound',
    constructor: function () {
        this.callParent(arguments);

        this.setProxy({
            type: 'jsonp',
            timeout: 60000,
            url: CS.config.Settings.baseUrl + '/JSON.ashx?op=GetRecordsAsCompounds'
        });
    }
});

/*########################################################################################
 #
 #  Copyright H. Lundbeck A/S
 #  This file is part of LSP4All.
 #
 #  LSP4All is free software; you can redistribute it and/or modify
 #  it under the terms of the GNU General Public License as published by
 #  the Free Software Foundation; either version 2 of the License, or (at
 #  your option) any later version.
 #
 #  LSP4All IS MADE AVAILABLE FOR DISTRIBUTION WITHOUT ANY FORM OF WARRANTY TO THE
 #  EXTENT PERMITTED BY APPLICABLE LAW.  THE COPYRIGHT HOLDER PROVIDES THE PROGRAM \"AS IS\"
 #  WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT
 #  LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 #  PURPOSE. THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM LIES
 #  WITH THE USER.  SHOULD THE PROGRAM PROVE DEFECTIVE IN ANY WAY, THE USER ASSUMES THE
 #  COST OF ALL NECESSARY SERVICING, REPAIR OR CORRECTION. THE COPYRIGHT HOLDER IS NOT
 #  RESPONSIBLE FOR ANY AMENDMENT, MODIFICATION OR OTHER ENHANCEMENT MADE TO THE PROGRAM
 #  BY ANY USER WHO REDISTRIBUTES THE PROGRAM SO AMENDED, MODIFIED OR ENHANCED.
 #
 #  IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING WILL THE
 #  COPYRIGHT HOLDER BE LIABLE TO ANY USER FOR DAMAGES, INCLUDING ANY GENERAL, SPECIAL,
 #  INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR INABILITY TO USE THE
 #  PROGRAM (INCLUDING BUT NOT LIMITED TO LOSS OF DATA OR DATA BEING RENDERED INACCURATE
 #  OR LOSSES SUSTAINED BY THE USER OR THIRD PARTIES OR A FAILURE OF THE PROGRAM TO
 #  OPERATE WITH ANY OTHER PROGRAMS), EVEN IF SUCH HOLDER HAS BEEN ADVISED OF THE
 #  POSSIBILITY OF SUCH DAMAGES.
 #
 #  You should have received a copy of the GNU General Public License
 #  along with this program; if not, write to the Free Software
 #  Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.
 #
 ########################################################################################*/

Ext.define('LSP.view.usergrid.UserGrid', {
    extend:'Ext.form.Panel',
    alias:'widget.usergrid',

    initComponent:function () {

        this.items = [
            grid = Ext.widget('dynamicgrid')
        ];
        grid.buttonRender(['new', 'edit', 'filter', 'delete', 'load', 'exporter']);
        this.callParent(arguments);
    }
});

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

Ext.define('LSP.view.dropdowns.conceptWikiCompoundLookup', {
    extend:'Ext.form.ComboBox',
    alias:'widget.conceptWikiCompoundLookup',

    store:Ext.create('Ext.data.Store', {
        fields:[
            {type:'string', name:'concept_label'},
            {type:'string', name:'concept_url'},
            {type:'string', name:'define_url'},
            {type:'string', name:'concept_uuid'},
            {type:'string', name:'concept_alt_labels'},
            {type:'string', name:'tag_label'},
            {type:'string', name:'tag_uuid'},
            {type:'string', name:'match'}


        ],
        proxy:{
            type:'ajax',
            api:{
                read:'/concept_wiki_api_calls/compound_lookup.json'
            },
            reader:{
                type:'json'
            }
        }
    }),
    queryMode:'remote',
    valueField:'concept_url',
    displayField:'concept_label',
    name:'compound_uri',
    minChars:4,
    hideTrigger:true,
    forceSelection:true,
    allowBlank:false,
    typeAhead:true,
    emptyText:'Start typing...',
    margin:'5 5 5 5',
    width:700,
    fieldLabel:'Compound name',
    labelWidth:120,
    listConfig:{
        loadingText:'Searching...',
        emptyText:'No matching compounds found.',
        getInnerTpl:function () {
//                    return '<p><font face="verdana" color="grey"><small>Match: {match}</small></font><br/><b>{concept_label}</b> <a href="{define_url}" target="_blank">(definition)</a><br/ ><small>Alt. terms: <i>{concept_alt_labels}</i></small></p>';
            return '<p><span style="font-family: verdana; color: grey; "><small>Match: {match}</small></span><br/><b>{concept_label}</b> <a href="{define_url}" target="_blank">(definition)</a></p>';  // version without alternative labels for compounds

        }
    }
});

Ext.define('LSP.view.cmpd_by_name.CmpdByNameForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.CmpdByNameForm',
    closable: true,
    header: false,
    requires: ['LSP.view.dropdowns.conceptWikiCompoundLookup', 'LSP.view.dynamicgrid.DynamicGrid', 'LSP.view.cmpd_by_name.CmpdByNameSingleDisplayForm'],
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [{
                xtype: 'label',
                html: '<span style="font-family: verdana; color: grey; ">Hint: Type in compound name. E.g. \"Aspirin\"</span>',
                labelWidth: 400,
                padding: '5 0 0 140'
            }, {
                xtype: 'container',
                margin: '0 5 5 5',
                name: 'form_fields',
                layout: {
                    type: 'column'
                },
                style: 'background-color: #fff;',
                items: [
                Ext.create('CW.view.ConceptWikiLookup', {
                    xtype: 'conceptWikiLookup',
                    fieldLabel: 'Compound name',
                    itemId: 'compoundByNameLookup',
                    store: Ext.create('CW.store.ConceptWikiLookup', {
                        proxy: {
                            type: 'jsonp',
                            timeout: 5000,
                            url: CW.config.Settings.searchByTagUrl,
                            reader: Ext.create('CW.helper.ConceptWikiJSONReader'),
                            extraParams: {
                                'branch': 4 // Only show species results from swissprot
                            }
                        }
                    }),
                    name: 'compound_uri',
                    cwTagUuid: '07a84994-e464-4bbf-812a-a4b96fa3d197' // This is the ConceptWiki tag uuid for proteins. Must be set to use method!
                }), {
                    xtype: 'button',
                    padding: '5 5 5 5',
                    text: 'Search',
                    itemId: 'CmpdByNameSubmit_id',
                    disabled: true,
                    action: 'query_cmpd_by_name'
                },
                    {
                        xtype: 'radiogroup',
                        width: 160,
                        labelWidth: 65,
                        fieldLabel: 'Provenance',
                        itemId: 'provId',
                        margin: '5 0 0 90',

                        items: [{
                            boxLabel: 'On',
                            name: 'prov',
                            inputValue: true
                        }, {
                            boxLabel: 'Off',
                            name: 'prov',
                            inputValue: false,
                            checked: true
                        }]
                    }

                ]
            }, {
                xtype: 'CmpdByNameSingleDisplayForm',
                flex: 1
            }]
        });
        this.callParent(arguments);
    }
});

Ext.define('LSP.view.dropdowns.conceptWikiLookup', {
    extend:'Ext.form.ComboBox',
    alias:'widget.conceptWikiLookup',

    store:Ext.create('Ext.data.Store', {
        fields:[
            {type:'string', name:'concept_label'},
            {type:'string', name:'concept_url'},
            {type:'string', name:'concept_uuid'},
            {type:'string', name:'concept_alt_labels'},
            {type:'string', name:'tag_label'},
            {type:'string', name:'tag_uuid'}


        ],
        proxy:{
            type:'ajax',
            api:{
                read:'/concept_wiki_api_calls/concept_lookup.json'
            },
            reader:{
                type:'json'
            }
        }
    }),
    queryMode:'remote',
    valueField:'concept_url',
    displayField:'concept_label',
    name:'concept_uri',
    minChars:4,
    hideTrigger:true,
    forceSelection:true,
    typeAhead:true,
    emptyText:'Start typing...',
    margin:'5 5 5 5',
    width:70,
    typeAheadDelay:150,
    queryDelay:700,
    fieldLabel:'Concept name',
    labelWidth:120,
    listConfig:{
        loadingText:'Searching...',
        emptyText:'No matching concepts found.',
        getInnerTpl:function () {
            return '<p><b>{concept_label}</b> <a href="{concept_url}" target="_blank">(definition)</a> <i>({tag_label})</i><br/ ><small><i>{concept_alt_labels}</i></small></p>';
        }

    }
});
Ext.define('LSP.view.concept.SummeryForm', {
    extend:'Ext.form.Panel',
    alias:'widget.SummeryForm',
    closable:true,
    requires:[
        'LSP.view.dropdowns.conceptWikiLookup'
    ],
    initComponent:function () {
        var me = this;
        me.items = [
            {
                xtype:'container',
                height:'6%',
                margin:'5 5 5 5',
                name:'form_fields',
                layout:{
                    type:'column'
                },
                items:[
                    {
                        xtype:'conceptWikiLookup'
                    },
                    {
                        xtype:'button',
                        padding:'5 5 5 5',
                        text:'Look up',
                        action:'look_up_concept'
                    },
                    {
                        name:'utf8',
                        xtype:'hidden',
                        value:'&#x2713;'
                    },
                    {
                        name:'authenticity_token',
                        xtype:'hidden',
                        value:$$('meta[name=csrf-token]')[0].readAttribute('content')
                    }
                ]},
            object_grid = Ext.widget('dynamicgrid2'),
            subject_grid = Ext.widget('dynamicgrid2')
        ];
        object_grid.setTitle('Concept Properties');
        object_grid.setHeight('47%');
        subject_grid.setTitle('Concept Relations');
        subject_grid.setHeight('47%');
        me.callParent(arguments);
    }
});
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

Ext.define('LSP.view.dropdowns.pmidLookup', {
    extend:'Ext.form.ComboBox',
    alias:'widget.pmidLookup',

    store:Ext.create('Ext.data.Store', {
        fields:[
            {type:'string', name:'pmid'},
            {type:'string', name:'pmid_uri'}
        ],
        proxy:{
            type:'ajax',
            api:{
                read:'core_api_calls/pmid_lookup.json'
            },
            reader:{
                type:'json'
            }
        }
    }),
    queryMode:'remote',
    valueField:'pmid_uri',
    displayField:'pmid',
    name:'pmid_uri',
    minChars:2,
    hideTrigger:true,
    forceSelection:true,
    typeAhead:true,
    emptyText:'Start typing Pubmed id...',
    margin:'5 5 5 5',
    width:600,
    queryDelay:700,
    fieldLabel:'Pubmed id',
    labelWidth:120,
    listConfig:{
        loadingText:'Searching...',
        emptyText:'No matching pubmed ids found.'
    }
});

Ext.define('LSP.view.textmining.pmidTextMiningHitsForm', {
    extend:'Ext.form.Panel',
    alias:'widget.pmidTextMiningHits',
    requires:[
        'LSP.view.dropdowns.pmidLookup'
    ],
    closable:true,
    height:560,
    width:606,
    bodyPadding:10,
    layout:{
        type:'vbox',
        align:'stretch'
    },
    initComponent:function () {
        var me = this;

        Ext.applyIf(me, {
            items:[
                {
                    xtype:'container',
                    activeItem:0,
                    layout:{
                        type:'column'
                    },
                    items:[
                        {
                            xtype:'pmidLookup',
                            margin:'0 10 0 10',
                            labelWidth:75,
                            width:650
                        },
                        {
                            xtype:'button',
                            text:'Search...',
                            action:'query',
                            disabled:true,
                            width:120
                        }
                    ]
                },
                {
                    xtype:'fieldset',
                    height:200,
                    layout:'anchor',
                    defaults:{labelWidth:75},
                    title:'Bibliographic information',
                    items:[
                        {
                            xtype:'displayfield',
                            fieldLabel:'Title',
                            name:'title',
                            anchor:'100%'
                        },
                        {
                            xtype:'textarea',
                            height:150,
                            readOnly:true,
                            fieldLabel:'Abstract',
                            name:'abstract',
                            anchor:'100%'
                        }
                    ]
                },
                {
                    xtype:'dynamicgrid2',
                    title:'Text mined concepts',
                    gridBaseTitle:'Text mined concepts',
                    name:'textmining_hits',
                    flex:1
                }
            ]
        });

        me.callParent(arguments);
    }
});
Ext.define('LSP.view.dropdowns.wikiPathwaysCompoundLookup', {
    extend:'Ext.form.ComboBox',
    alias:'widget.wikiPathwaysCompoundLookup',

    store:Ext.create('Ext.data.Store', {
        fields:[
            {type:'string', name:'compound_name'},
            {type:'string', name:'compound_uri'}
        ],
        proxy:{
            type:'ajax',
            api:{
                read:'/core_api_calls/wiki_pathway_compound_lookup.json'
            },
            reader:{
                type:'json'
            }
        }
    }),
    queryMode:'remote',
//      valueField:'cmpd_uri',
    valueField:'compound_uri',
    displayField:'compound_name',
    name:'compound_uri',
    minChars:4,
    hideTrigger:true,
    forceSelection:true,
    typeAhead:true,
    emptyText:'Start typing...',
    margin:'5 5 5 5',
    width:700,
    queryDelay:700,
    fieldLabel:'Compound name',
    labelWidth:120,
    listConfig:{
        loadingText:'Searching...'
    }
});

Ext.define('LSP.view.pathways.pathwayByCompoundForm', {
    extend:'Ext.form.Panel',
    alias:'widget.pathwayByCompoundForm',
    requires:[
        'LSP.view.dropdowns.wikiPathwaysCompoundLookup'
    ],
    closable:true,
    height:560,
    width:606,
    bodyPadding:10,
    layout:{
        type:'vbox',
        align:'stretch'
    },
    initComponent:function () {
        var me = this;

        Ext.applyIf(me, {
            items:[
                {
                    xtype:'container',
                    activeItem:0,
                    layout:{
                        type:'column'
                    },
                    items:[
                        {
                            xtype:'wikiPathwaysCompoundLookup',
                            margin:'0 10 0 10',
                            labelWidth:100,
                            width:650
                        },
                        {
                            xtype:'button',
                            text:'Search...',
                            disabled:true,
                            action:'query',
                            width:120
                        }
                    ]
                },
                {
                    xtype:'dynamicgrid2',
                    title:'Pathways including compound',
                    gridBaseTitle:'Pathways including compound',
                    name:'pathway_by_cmpd_grid',
                    flex:1,
                    dockedItems:[
                        {
                            xtype:'toolbar',
                            dock:'top',
                            items:[
                                {
                                    xtype:'button',
                                    text:'View pathway in WikiPathways applet (Google Chrome only)',
                                    action:'wp_view'
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }
});

Ext.define('LSP.view.dropdowns.wikiPathwaysProteinLookup', {
    extend:'Ext.form.ComboBox',
    alias:'widget.wikiPathwaysProteinLookup',

    store:Ext.create('Ext.data.Store', {
        fields:[
            {type:'string', name:'wp_protein_name'},
            {type:'string', name:'wp_protein_uri'}
        ],
        proxy:{
            type:'ajax',
            api:{
                read:'/core_api_calls/wiki_pathway_protein_lookup.json'
            },
            reader:{
                type:'json'
            }
        }
    }),
    queryMode:'remote',
//      valueField:'wp_protein_uri',
    valueField:'wp_protein_uri',
    displayField:'wp_protein_name',
    name:'wp_protein_uri',
    minChars:4,
    hideTrigger:true,
    forceSelection:true,
    typeAhead:true,
    emptyText:'Start typing...',
    margin:'5 5 5 5',
    width:700,
    queryDelay:700,
    fieldLabel:'Protein name',
    labelWidth:120,
    listConfig:{
        loadingText:'Searching...'
    }
});

Ext.define('LSP.view.pathways.pathwayByProteinForm', {
    extend:'Ext.form.Panel',
    alias:'widget.pathwayByProteinForm',
    requires:[
        'LSP.view.dropdowns.wikiPathwaysProteinLookup'
    ],
    closable:true,
    height:560,
    width:606,
    bodyPadding:10,
    layout:{
        type:'vbox',
        align:'stretch'
    },
    initComponent:function () {
        var me = this;

        Ext.applyIf(me, {
            items:[
                {
                    xtype:'container',
                    activeItem:0,
                    layout:{
                        type:'column'
                    },
                    items:[
                        {
                            xtype:'wikiPathwaysProteinLookup',
                            margin:'0 10 0 10',
                            labelWidth:100,
                            width:650
                        },
                        {
                            xtype:'button',
                            text:'Search...',
                            action:'query',
                            disabled:true,
                            width:120
                        }
                    ]
                },
                {
                    xtype:'dynamicgrid2',
                    title:'Pathways including protein',
                    gridBaseTitle:'Pathways including protein',
                    name:'pathway_by_protein_grid',
                    flex:1,
                    dockedItems:[
                        {
                            xtype:'toolbar',
                            dock:'top',
                            items:[
                                {
                                    xtype:'button',
                                    text:'View pathway in WikiPathways applet (Google Chrome only)',
                                    action:'wp_view'
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }
});

Ext.define('LSP.view.Viewer', {
    extend:'Ext.tab.Panel',
    alias:'widget.viewer',

    requires:[
		'LSP.view.dynamicgrid.DynamicGrid',
        'LSP.view.usergrid.UserGrid',
        'LSP.view.sparqlform.Queryform',
        'LSP.view.larkc_sim_search.SimSearchForm',
        'LSP.view.cmpd_by_name.CmpdByNameForm',
        'LSP.view.target_by_name.TargetByNameForm',
        'LSP.view.pharm_by_cmpd_name2.PharmByCmpdNameForm',
        'LSP.view.pharm_by_target_name2.PharmByTargetNameForm',
        'LSP.view.concept.SummeryForm',
        'LSP.view.placeholder.temp',
        'LSP.view.pharm_by_enzyme_family.PharmEnzymeForm',
        'LSP.view.textmining.pmidTextMiningHitsForm',
        'LSP.view.pathways.pathwayByCompoundForm',
        'LSP.view.pathways.pathwayByProteinForm',
    ],

    activeItem:0,
    margins:'0 4 4 4',
    //cls: 'preview',

    initComponent:function () {
		console.log('Viewer: initComponent()');
        this.callParent(arguments);
        this.on('tabchange', function (tabPanel, newCard, oldCard) {
            //this handles the user selecting a tab and updates the history token appropriately
            Ext.History.add('!p=' + newCard.xtype);
        });
    }
});

/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 24/04/2012
 * Time: 12:11
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LSP.view.feedback.FeedbackPanel', {
    extend:'Ext.panel.Panel',
    alias:'widget.FeedbackPanel',
    layout:'anchor',
    bodyCls:'fb-panel',
    border:false,

    items:[
        {
            xtype:'displayfield',
            value:'<br>',
            itemId:'spacer1'
        },
        {
            xtype:'displayfield',
            anchor:'100%',
            itemId:'fpUserMessage1',
            fieldCls:'fb-message',
            //value:'Please provide your feedback here. Unfortunately we can\'t promise to respond to every piece of feedback but we will read them.'
            value:'You can use this form to give us feedback or report any problems you encounter.  Please note that we read everything, but can\'t always respond.'
        },
        {
            xtype:'displayfield',
            value:'<br>',
            itemId:'spacer2'
        },
        {
            xtype:'textfield',
            anchor:'100%',
            vtype:'email',
            cls:'fb-email',
            labelAlign:'top',
            itemId:'fpUserEmail',
            fieldLabel:'Your contact email',
            allowBlank:false

        },

        {
            xtype:'textarea',
            anchor:'100% 60%',
            labelAlign:'top',
            itemId:'fpFeedbackText',
            fieldLabel:'Your feedback',
            allowBlank:false
        },
        {
            xtype:'button',
            cls:'fb-button',
            text:'Submit',
            handler:function () {

                var userEmailField = Ext.ComponentQuery.query('#fpUserEmail')[0];
                if (!userEmailField.isValid()) {
                    Ext.Msg.show({
                        title:'Missing Information',
                        msg:'Please supply a contact email address',
                        buttons:Ext.MessageBox.OK,
                        icon:Ext.MessageBox.INFO
                    });
                    return;
                }
                var feedbackTextArea = Ext.ComponentQuery.query('#fpFeedbackText')[0];
                if (!feedbackTextArea.isValid()) {
                    Ext.Msg.show({
                        title:'Missing Information',
                        msg:'Please supply some feedback text',
                        buttons:Ext.MessageBox.OK,
                        icon:Ext.MessageBox.INFO
                    });
                    return;
                }
                var feedbackData = Ext.create('LSP.model.Feedback', {
                    userEmail:userEmailField.getValue(),
                    feedbackText:feedbackTextArea.getValue(),
                    technicalInfo:Ext.History.getToken()
                });
                var fp = this.up('FeedbackPanel');
                fp.setLoading(true);
                Ext.Ajax.request({
                    url:'feedback.json',
                    method:'POST',
                    params:feedbackData.data,
                    success:function (response) {
                        fp.setLoading(false);
                        var jsonObj = Ext.decode(response.responseText);
                        Ext.Msg.show({
                            title:'Feedback sent',
                            msg:jsonObj.message,
                            buttons:Ext.MessageBox.OK,
                            icon:Ext.MessageBox.INFO
                        });

                    },
                    failure:function (response) {
                        fp.setLoading(false);
                        Ext.Msg.show({
                            title:'Error',
                            msg:'Your feedback could not be sent',
                            buttons:Ext.MessageBox.OK,
                            icon:Ext.MessageBox.INFO
                        });
                    }
                });
            }
        }
    ]
});
Ext.define('LSP.view.Navigator', {
    extend:'Ext.Panel',
    alias:'widget.navigator',

    requires:[
        'LSP.view.Appmoduletree',
        'Ext.layout.container.Accordion',
        'LSP.view.feedback.FeedbackPanel'
    ],

    collapsible:true,
    margins:'0 0 4 4',
    layout:'accordion',
    layoutConfig:{
        animate:true
    },

    initComponent:function () {
        this.items = [
            {
                title:'Navigation',
                autoScroll:true,
                layout:'fit',
                border:false,
                iconCls:'nav',
                items:[
                    {
                        xtype:'appmoduletree',
                        id:'appModuleTree'
                    }
                ]
            },
            //Removed this because it isn't actually used any more
//            {
//                title:'Settings',
//                border:false,
//                autoScroll:true,
//                iconCls:'settings',
//                items:[
//                    {
//                        xtype:'settingsform',
//                        id:'appSettings'
//                    }
//                ]
//            },
            {
                title:'Feedback',
                border:false,
                autoScroll:true,
                iconCls:'fb-accordion',
                bodyBorder:false,
                items:[
                    {
                        xtype:'FeedbackPanel'
                    }
                ]
            }
        ];

        this.callParent(arguments);
    }
});
/*########################################################################################
 #
 #  Copyright H. Lundbeck A/S
 #  This file is part of LSP4All.
 #
 #  LSP4All is free software; you can redistribute it and/or modify
 #  it under the terms of the GNU General Public License as published by
 #  the Free Software Foundation; either version 2 of the License, or (at
 #  your option) any later version.
 #
 #  LSP4All IS MADE AVAILABLE FOR DISTRIBUTION WITHOUT ANY FORM OF WARRANTY TO THE
 #  EXTENT PERMITTED BY APPLICABLE LAW.  THE COPYRIGHT HOLDER PROVIDES THE PROGRAM \"AS IS\"
 #  WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT
 #  LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 #  PURPOSE. THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM LIES
 #  WITH THE USER.  SHOULD THE PROGRAM PROVE DEFECTIVE IN ANY WAY, THE USER ASSUMES THE
 #  COST OF ALL NECESSARY SERVICING, REPAIR OR CORRECTION. THE COPYRIGHT HOLDER IS NOT
 #  RESPONSIBLE FOR ANY AMENDMENT, MODIFICATION OR OTHER ENHANCEMENT MADE TO THE PROGRAM
 #  BY ANY USER WHO REDISTRIBUTES THE PROGRAM SO AMENDED, MODIFIED OR ENHANCED.
 #
 #  IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING WILL THE
 #  COPYRIGHT HOLDER BE LIABLE TO ANY USER FOR DAMAGES, INCLUDING ANY GENERAL, SPECIAL,
 #  INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR INABILITY TO USE THE
 #  PROGRAM (INCLUDING BUT NOT LIMITED TO LOSS OF DATA OR DATA BEING RENDERED INACCURATE
 #  OR LOSSES SUSTAINED BY THE USER OR THIRD PARTIES OR A FAILURE OF THE PROGRAM TO
 #  OPERATE WITH ANY OTHER PROGRAMS), EVEN IF SUCH HOLDER HAS BEEN ADVISED OF THE
 #  POSSIBILITY OF SUCH DAMAGES.
 #
 #  You should have received a copy of the GNU General Public License
 #  along with this program; if not, write to the Free Software
 #  Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.
 #
 ########################################################################################*/

Ext.define('LSP.view.user.Loginbutton', {
    extend:'Ext.Button',
    alias:'widget.loginbutton',

    size:'small',
    text:'Log in',

    initComponent:function () {
        this.callParent(arguments);
    }
});
/*######################################################################################
 #
 #  Copyright H. Lundbeck A/S
 #  This file is part of LSP4All.
 #
 #  LSP4All is free software; you can redistribute it and/or modify
 #  it under the terms of the GNU General Public License as published by
 #  the Free Software Foundation; either version 2 of the License, or (at
 #  your option) any later version.
 #
 #  LSP4All IS MADE AVAILABLE FOR DISTRIBUTION WITHOUT ANY FORM OF WARRANTY TO THE
 #  EXTENT PERMITTED BY APPLICABLE LAW.  THE COPYRIGHT HOLDER PROVIDES THE PROGRAM \"AS IS\"
 #  WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT
 #  LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 #  PURPOSE. THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM LIES
 #  WITH THE USER.  SHOULD THE PROGRAM PROVE DEFECTIVE IN ANY WAY, THE USER ASSUMES THE
 #  COST OF ALL NECESSARY SERVICING, REPAIR OR CORRECTION. THE COPYRIGHT HOLDER IS NOT
 #  RESPONSIBLE FOR ANY AMENDMENT, MODIFICATION OR OTHER ENHANCEMENT MADE TO THE PROGRAM
 #  BY ANY USER WHO REDISTRIBUTES THE PROGRAM SO AMENDED, MODIFIED OR ENHANCED.
 #
 #  IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING WILL THE
 #  COPYRIGHT HOLDER BE LIABLE TO ANY USER FOR DAMAGES, INCLUDING ANY GENERAL, SPECIAL,
 #  INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR INABILITY TO USE THE
 #  PROGRAM (INCLUDING BUT NOT LIMITED TO LOSS OF DATA OR DATA BEING RENDERED INACCURATE
 #  OR LOSSES SUSTAINED BY THE USER OR THIRD PARTIES OR A FAILURE OF THE PROGRAM TO
 #  OPERATE WITH ANY OTHER PROGRAMS), EVEN IF SUCH HOLDER HAS BEEN ADVISED OF THE
 #  POSSIBILITY OF SUCH DAMAGES.
 #
 #  You should have received a copy of the GNU General Public License
 #  along with this program; if not, write to the Free Software
 #  Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.
 #
 ########################################################################################*/

Ext.define('LSP.view.user.Logoutbutton', {
    extend:'Ext.Button',
    alias:'widget.logoutbutton',

    size:'small',
    text:'Log out',

    initComponent:function () {
        this.callParent(arguments);
    }
});
/*######################################################################################
 #
 #  Copyright H. Lundbeck A/S
 #  This file is part of LSP4All.
 #
 #  LSP4All is free software; you can redistribute it and/or modify
 #  it under the terms of the GNU General Public License as published by
 #  the Free Software Foundation; either version 2 of the License, or (at
 #  your option) any later version.
 #
 #  LSP4All IS MADE AVAILABLE FOR DISTRIBUTION WITHOUT ANY FORM OF WARRANTY TO THE
 #  EXTENT PERMITTED BY APPLICABLE LAW.  THE COPYRIGHT HOLDER PROVIDES THE PROGRAM \"AS IS\"
 #  WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT
 #  LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 #  PURPOSE. THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM LIES
 #  WITH THE USER.  SHOULD THE PROGRAM PROVE DEFECTIVE IN ANY WAY, THE USER ASSUMES THE
 #  COST OF ALL NECESSARY SERVICING, REPAIR OR CORRECTION. THE COPYRIGHT HOLDER IS NOT
 #  RESPONSIBLE FOR ANY AMENDMENT, MODIFICATION OR OTHER ENHANCEMENT MADE TO THE PROGRAM
 #  BY ANY USER WHO REDISTRIBUTES THE PROGRAM SO AMENDED, MODIFIED OR ENHANCED.
 #
 #  IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING WILL THE
 #  COPYRIGHT HOLDER BE LIABLE TO ANY USER FOR DAMAGES, INCLUDING ANY GENERAL, SPECIAL,
 #  INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR INABILITY TO USE THE
 #  PROGRAM (INCLUDING BUT NOT LIMITED TO LOSS OF DATA OR DATA BEING RENDERED INACCURATE
 #  OR LOSSES SUSTAINED BY THE USER OR THIRD PARTIES OR A FAILURE OF THE PROGRAM TO
 #  OPERATE WITH ANY OTHER PROGRAMS), EVEN IF SUCH HOLDER HAS BEEN ADVISED OF THE
 #  POSSIBILITY OF SUCH DAMAGES.
 #
 #  You should have received a copy of the GNU General Public License
 #  along with this program; if not, write to the Free Software
 #  Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.
 #
 ########################################################################################*/

Ext.define('LSP.view.user.Newbutton', {
    extend:'Ext.Button',
    alias:'widget.usernewbutton',

    size:'small',
    text:'Create account',

    initComponent:function () {
        this.callParent(arguments);
    }
});
/*########################################################################################
 #
 #  Copyright H. Lundbeck A/S
 #  This file is part of LSP4All.
 #
 #  LSP4All is free software; you can redistribute it and/or modify
 #  it under the terms of the GNU General Public License as published by
 #  the Free Software Foundation; either version 2 of the License, or (at
 #  your option) any later version.
 #
 #  LSP4All IS MADE AVAILABLE FOR DISTRIBUTION WITHOUT ANY FORM OF WARRANTY TO THE
 #  EXTENT PERMITTED BY APPLICABLE LAW.  THE COPYRIGHT HOLDER PROVIDES THE PROGRAM \"AS IS\"
 #  WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT
 #  LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 #  PURPOSE. THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM LIES
 #  WITH THE USER.  SHOULD THE PROGRAM PROVE DEFECTIVE IN ANY WAY, THE USER ASSUMES THE
 #  COST OF ALL NECESSARY SERVICING, REPAIR OR CORRECTION. THE COPYRIGHT HOLDER IS NOT
 #  RESPONSIBLE FOR ANY AMENDMENT, MODIFICATION OR OTHER ENHANCEMENT MADE TO THE PROGRAM
 #  BY ANY USER WHO REDISTRIBUTES THE PROGRAM SO AMENDED, MODIFIED OR ENHANCED.
 #
 #  IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING WILL THE
 #  COPYRIGHT HOLDER BE LIABLE TO ANY USER FOR DAMAGES, INCLUDING ANY GENERAL, SPECIAL,
 #  INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR INABILITY TO USE THE
 #  PROGRAM (INCLUDING BUT NOT LIMITED TO LOSS OF DATA OR DATA BEING RENDERED INACCURATE
 #  OR LOSSES SUSTAINED BY THE USER OR THIRD PARTIES OR A FAILURE OF THE PROGRAM TO
 #  OPERATE WITH ANY OTHER PROGRAMS), EVEN IF SUCH HOLDER HAS BEEN ADVISED OF THE
 #  POSSIBILITY OF SUCH DAMAGES.
 #
 #  You should have received a copy of the GNU General Public License
 #  along with this program; if not, write to the Free Software
 #  Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.
 #
 ########################################################################################*/

/* replace with the settings panel options later on */
iconSize = 'small';

Ext.define('LSP.view.Viewport', {
    extend:'Ext.container.Viewport',
    alias:'widget.lspviewport',

    requires:[
        'LSP.view.Viewer',
        'LSP.view.Navigator',
        'LSP.view.Settings',
        'LSP.view.user.Loginbutton',
        'LSP.view.user.Logoutbutton',
        'LSP.view.user.Newbutton',
        'Ext.layout.container.Border',
        'Ext.toolbar.Spacer',
        'LSP.store.GuiComponents'
    ],
	listeners: {
		afterrender: {
			//check for an initial history token
			fn: function() {
				console.log("Viewport: afterrender()");
				var currentToken = Ext.History.getToken();
				if (currentToken) {
					if (currentToken.length > 0) {
						this.handleHistoryToken(currentToken);
					}
				}
			}
		}
		},

    layout:'border',

    //gets a record from GuiComponents store by its xtype
    getFormByXtype:function (token) {
        return Ext.data.StoreManager.lookup('GuiComponents').findRecord("xtype", token);
    },

//    getObjectFromString:function (queryString) {
//        var qBits = queryString.split('&');
//        console.log(qBits);
//        var obj = new Object();
//        Ext.each(qBits, function (item, index) {
//            console.log(item);
//            if (item.length > 0) {
//                var smallBits = item.split('=');
//                if (smallBits.length == 1) {
//                    obj[smallBits[0]] = '';
//                } else if (smallBits.l == 2) {
//                    obj[smallBits[0]] = smallBits[1];
//                }
//            }
//
//        });
////        console.dir(obj);
//        return obj;
//    },

//all UI changes should come through this function
    handleHistoryToken:function (token) {
		console.log("Viewport: handleHistoryToken()");
        //not null
        if (token) {
            //must start with ! (shebang/hashbang can help with googlebot indexing, some people hate this kind of thing, personally i don't care)
            if (token.indexOf('!') == 0) {
//            console.log('Viewport History change: ' + token);
                //cut off shebang
//                var historyTokenObject = Ext.Object.fromQueryString(token.substring(1));
                var historyTokenObject = this.parseHistoryToken(unescape(token).substring(1));
//                console.dir(historyTokenObject);
                if (historyTokenObject.p) {
                    var form = this.getFormByXtype(historyTokenObject.p);
                    if (form) {
                        this.changeView(form, historyTokenObject);
                    }
                }
            }
        }
    },

    parseHistoryToken:function (stringToParse) {
		console.log("Viewport: parseHistoryToken()");
        var obj = {};
        var andBits = stringToParse.split('&');
        Ext.each(andBits, function (bit) {
            var firstEquals = bit.indexOf('=');
            if (firstEquals != -1) {
                var key = bit.substring(0, firstEquals);
                var value = bit.substring(firstEquals + 1, bit.length)
                obj[key] = value;
            }
        });
        return obj;
    },

//this handles the changing of central ui panel
    changeView:function (record, formData) {
		console.log("Viewport: changeView()");
        var view;
        Ext.getCmp('centerView').items.each(function (curItem) {
            if (curItem.gridId == record.data.id) {
                view = curItem;
                return;
            }
        });
        if (!view) {
            view = Ext.widget(record.data.xtype);
            view.setTitle(record.data.home);
            view.url = record.data.url;
            view.gridId = record.data.id;
            Ext.getCmp('centerView').add(view);
        }
        var centreView = Ext.getCmp('centerView');
        centreView.suspendEvents(false);
        centreView.setActiveTab(view);
        centreView.resumeEvents();

        //this handles any formData provided by the History token
        //e.g. record = 'CmpdByNameForm'
        // formData = 'http://www.conceptwiki.org/concept/59aabd64-bee9-45b7-bbe0-9533f6a1f6bc'
        //it is the individual forms responsibility to process the formData string
        if (formData) {
            if (view.setFormData) {
                view.setFormData(formData);
            } else {
                view.fireEvent('historyToken', formData);
            }
        }
    },


    initComponent:function () {
		console.log("Viewport: initComponent()");
        //set provenance to default of icon mode
        LDAProvenanceMode = LDA.helper.LDAConstants.LDA_PROVENANCE_COLOUR;
        //init history, needs to be done first
        Ext.History.init();
        //add event listener for History 'change' event
        //listener sends new history token to handleHistoryToken function with Viewport scope
        Ext.History.on('change', function (token) {
            if (token) {
                this.handleHistoryToken(token);
            }
        }, this);

        var ops_logo = Ext.create('Ext.Img', {src:'./assets/ops_logo.png', bodyStyle:{background:'transparent'}, width:77, height:50});
        this.items = [
            {
                region:'north',
                id:'northView',
                height:60,
                border:false,
                bodyStyle:{
                    background:'transparent'
                },
                layout:{
                    type:'hbox',
                    padding:'5',
                    align:'middle'
                },
                items:[
                    ops_logo,
                    {
                        id:'lsp-header',
                        xtype:'box',
                        html:'<h1>Open PHACTS Explorer</h1>'
                    },
                    {
                        xtype:'tbspacer',
                        flex:1
                    },
                    {
                        xtype:'displayfield',
                        value:'Testing connection to OPS API...',
                        width:400,
                        name:'ops_api_staus',
                        id:'ops_api_staus_id',
						hidden: true
                    },
                    {
                        xtype:'tbspacer',
                        flex:1
                    },
                    {
                        xtype:'loginbutton',
                        id:'loginButton',
                        hidden:true
                    },
                    {
                        xtype:'usernewbutton',
                        id:'userNewButton',
                        hidden:true
                    },
                    {
                        xtype:'logoutbutton',
                        id:'logoutButton',
                        hidden:true
                    }
                ]
            },
            {
                region:'center',
                id:'centerView',
                xtype:'viewer'
            },
            {
                region:'west',
                id:'westView',
                width:225,
                xtype:'navigator'
            }
        ];
        this.callParent(arguments);
    }
})
;



