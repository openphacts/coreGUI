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
                                    {xtype:'displayfield', anchor:'100%', itemId:'label', fieldCls:'target-title'},
                                    {xtype:'button', text:'Pharmacology Data', itemId:'pharmTargetButton', cls:'target-pharm-button'},
                                    {xtype:'displayfield', anchor:'100%', itemId:'target_type', fieldLabel:'Target Type', cls:'target-field-label'},
                                    {xtype:'displayfield', anchor:'100%', itemId:'organism', fieldLabel:'Organism', cls:'target-field-label'},
                                    {xtype:'displayfield', anchor:'100%', itemId:'description', fieldLabel:'Description', cls:'target-field-label'},
                                    {xtype:'displayfield', anchor:'100%', itemId:'synonyms', fieldLabel:'Synonyms', cls:'target-field-label'},

                                    {xtype:'displayfield', anchor:'100%', itemId:'specific_function', fieldLabel:'Specific Function', cls:'target-field-label'},
                                    {xtype:'displayfield', anchor:'100%', itemId:'cellular_function', fieldLabel:'Cellular Function', cls:'target-field-label'},
                                    {xtype:'displayfield', anchor:'100%', itemId:'keywords', fieldLabel:'Keywords', cls:'target-field-label'}            ,
                                    {xtype:'displayfield', anchor:'100%', itemId:'pdb_id_page', fieldLabel:'PDB Entry', cls:'target-field-label'},
                                    {
                                        xtype:'panel',
                                        border:0,
                                        anchor:'100%',
                                        itemId:'numericDataPanel',
                                        layout:'column',
                                        bodyPadding:30,
                                        items:[
                                            {xtype:'displayfield', itemId:'molecular_weight', columnWidth:0.33, fieldLabel:'Molecular Weight', cls:'target-field-bottom', fieldCls:'target-field-bottom-field', labelAlign:'top' },
                                            {xtype:'displayfield', itemId:'number_of_residues', columnWidth:0.33, fieldLabel:'Number of Residues', cls:'target-field-bottom', fieldCls:'target-field-bottom-field', labelAlign:'top' },
                                            {xtype:'displayfield', itemId:'theoretical_pi', columnWidth:0.33, fieldLabel:'Theoretical Pi', cls:'target-field-bottom', fieldCls:'target-field-bottom-field', labelAlign:'top' }
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

            if (records.length > 0 && td.hasOwnProperty('target_name')) { // TEMP FIX -- new coreAPI's returning an empty object

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

    addKeywords:function (keywords) {
        var bits = keywords.split(',');
        var keywordDisplayField = this.down('#keywords');
        var bodyEl = keywordDisplayField.bodyEl;
        var domElem = bodyEl.dom;
        this.clearDomBelow(domElem);
        var tpl = Ext.DomHelper.createTemplate({tag:'div', cls:'keyword', html:'{kw}'});
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
        var tpl = Ext.DomHelper.createTemplate({tag:'div', cls:'organism', html:'{org}'});
        tpl.append(bodyEl, {org:organism});
        organismDisplayField.show();
    },

    addSynonyms:function (synonyms) {
        var bits = synonyms.split(' , ');
        var synonymsField = this.down('#synonyms');
        var bodyEl = synonymsField.bodyEl;
        var domElem = bodyEl.dom;
        this.clearDomBelow(domElem);
        var tpl = Ext.DomHelper.createTemplate({tag:'div', cls:'synonym', html:'{syn}'});
        Ext.each(bits, function (synonym) {
            tpl.append(bodyEl, {syn:synonym});
        }, this);
        synonymsField.show();
    },

    addPDBImage:function (pdbIdPage) {
        //example http://www.pdb.org/pdb/explore/explore.do?structureId=1HOF
//        http://www.rcsb.org/pdb/images/1HOF_asr_r_250.jpg
        var stringURL = new String(pdbIdPage);
        var img = this.down('#target_image');
        var pdbID = stringURL.substr(stringURL.lastIndexOf('=') + 1);
        var pdbField = this.down('#pdbIdPage');
        pdbField.setRawValue('<a target=\'_blank\' href=\'' + pdbIdPage + '\'>' + pdbID + '</a>');
        pdbField.show();
        img.setSrc('http://www.rcsb.org/pdb/images/' + pdbID + '_asr_r_250.jpg');
        img.show();
    },

    setFieldValue:function (fieldId, value) {
        if (fieldId == 'synonyms') {
//            console.log('synonyms');
	    if (value != null) {
            	this.addSynonyms(value);
	    }
        }
        else if (fieldId == 'keywords') {
//            console.log('keywords');
	    if (value != null) {
	    	this.addKeywords(value);
	    }
        }
        else if (fieldId == 'organism') {
//            console.log('organism');
	    if (value != null) {
            	this.addOrganism(value);
	    }
        }
        else if (fieldId == 'pdb_id_page') {
			if (value != "" && value != null) {
				this.addPDBImage(value);
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

        var pharmButton = this.down('#pharmTargetButton');
        pharmButton.hide();
        pharmButton.setHandler(function () {
                Ext.History.add('!p=PharmByTargetNameForm&u=' + target.store.proxy.extraParams.uri);
            }
        );
        pharmButton.show();

        for (var prop in td) {
            if (td.hasOwnProperty(prop)) {
               console.log(prop);
                this.setFieldValue(prop, td[prop]);
            }
        }
        this.doLayout();
    }

});
