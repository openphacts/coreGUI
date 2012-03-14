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
    layout:'anchor',

    initComponent:function () {
        this.items = [
            {
                xtype:'panel',
                anchor:'100% 100%',
                layout:'anchor',
                autoScroll:true,
                itemId:'dp',
                hidden:true,
                items:[
                    {xtype:'displayfield', anchor:'100%', itemId:'target_name', fieldLabel:'Target Name'},
                    {xtype:'displayfield', anchor:'100%', itemId:'target_type', fieldLabel:'Target Type'},
                    {xtype:'displayfield', anchor:'100%', itemId:'organism', fieldLabel:'Organism'},
                    {xtype:'displayfield', anchor:'100%', itemId:'description', fieldLabel:'Description'},
                    {xtype:'displayfield', anchor:'100%', itemId:'synonyms', fieldLabel:'Synonyms'},
                    {xtype:'displayfield', anchor:'100%', itemId:'specificFunction', fieldLabel:'Specific Function'},
                    {xtype:'displayfield', anchor:'100%', itemId:'cellularLocation', fieldLabel:'Cellular Location'},
                    {xtype:'displayfield', anchor:'100%', itemId:'molecularWeight', fieldLabel:'Molecular Weight'},
                    {xtype:'displayfield', anchor:'100%', itemId:'numberOfResidues', fieldLabel:'Number of Residues'},
                    {xtype:'displayfield', anchor:'100%', itemId:'keywords', fieldLabel:'Keywords'}            ,
                    {xtype:'displayfield', anchor:'100%', itemId:'pdbIdPage', fieldLabel:'PDB ID Page'},
                    {xtype:'displayfield', anchor:'100%', itemId:'theoreticalPi', fieldLabel:'Theoretical Pi'}
                ]
            },
            {
                xtype:'displayfield',
                itemId:'msg',
                anchor:'100% 100%',
                hidden:true,
                value:'message here'
            }
        ]

        var store = Ext.data.StoreManager.lookup('Targets');
        store.addListener('load', this.showData, this);
        this.callParent(arguments);
    },

    hideAllFields:function () {
        var displayFields = this.query('displayfield');
        Ext.each(displayFields, function (field) {
            field.hide();
        }, this);
        this.doLayout();
    },

    showMessage:function (message) {
        var dp = this.down('#dp');
        var msg = this.down('#msg');
        dp.setVisible(false);
        msg.setValue(message);
        msg.setVisible(true);
    },

    showData:function (store, records, succesful) {
//        console.log(store);
//        console.log(records);
//        console.log(succesful);
        if (succesful) {
            var dp = this.down('#dp');
            var msg = this.down('#msg');
            msg.setVisible(false);
//                console.log(store.first());
            this.setValues(store.first());
            dp.setVisible(true);
        }
    },

    clearDomBelow:function (domElement) {
        if (domElement.hasChildNodes()) {
            while (domElement.childNodes.length > 0) {
                domElement.removeChild(domElement.firstChild);
            }
        }
    },

    addKeywords:function (keywords) {
        var bits = keywords.split('; ');
        var keywordDisplayField = this.down('#keywords');
        var bodyEl = keywordDisplayField.bodyEl;
        var domElem = bodyEl.dom;
        this.clearDomBelow(domElem);
        var tpl = Ext.DomHelper.createTemplate({tag:'div', class:'keyword', html:'{kw}'});
        Ext.each(bits, function (keyword) {
            tpl.append(bodyEl, {kw:keyword});
        }, this);
        keywordDisplayField.show();
    },

    addOrganism:function (organism) {
        var organismDisplayField = this.down('#organism');
        var bodyEl = organismDisplayField.bodyEl;
        var domElem = bodyEl.dom;
        this.clearDomBelow(domElem);
        var tpl = Ext.DomHelper.createTemplate({tag:'div', class:'organism', html:'{org}'});
        tpl.append(bodyEl, {org:organism});
        organismDisplayField.show();
    },

    addSynonyms:function (synonyms) {
        var bits = synonyms.split('; ');
        var synonymsField = this.down('#synonyms');
        var bodyEl = synonymsField.bodyEl;
        var domElem = bodyEl.dom;
        this.clearDomBelow(domElem);
        var tpl = Ext.DomHelper.createTemplate({tag:'div', class:'synonym', html:'{syn}'});
        Ext.each(bits, function (synonym) {
            tpl.append(bodyEl, {syn:synonym});
        }, this);
        synonymsField.show();
    },

    setFieldValue:function (fieldId, value) {
        if (fieldId == 'synonyms') {
//            console.log('synonyms');
            this.addSynonyms(value);
        }
        else if (fieldId == 'keywords') {
//            console.log('keywords');
            this.addKeywords(value);
        }
        else if (fieldId == 'organism') {
//            console.log('organism');
            this.addOrganism(value);
        }
        else {
//            console.log('standard field');
            var field = this.down('#' + fieldId);
            field.setValue(value);
            field.show();
        }
    },


    setValues:function (target) {
        this.hideAllFields();
        var td = target.data;

        for (var prop in td) {
            if (td.hasOwnProperty(prop)) {
//                console.log(prop);
                this.setFieldValue(prop, td[prop]);
            }
        }

//        if (td.target_name) {
//            this.setFieldValue('#tn', td.target_name);
//        }
//
//        if (td.target_type) {
//            this.setFieldValue('#tt', td.target_type);
//        }
//
//        var typeField = this.down('#tt');
//        typeField.setValue(td.target_type);
//
//        var descField = this.down('#desc');
//        descField.setValue(td.description);
//
//        var keyField = this.down('#key');
//        this.addKeywords(td.keywords, keyField);
//
//        var orgField = this.down('#org');
//        this.addOrganism(td.organism, orgField);
//
//        var synField = this.down('#syn');
//        this.addSynonyms(td.synonyms, synField);
//
//        if (td.cellularLocation) {
//            var cellLoc = this.down('#cl');
//            cellLoc.setValue(td.cellularLocation);
//            cellLoc.show();
//        }


        this.doLayout();
    },

    startLoading:function () {
        this.setLoading(true);
    },

    endLoading:function () {
        this.setLoading(false);
    }

});