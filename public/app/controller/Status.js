Ext.define('LSP.controller.Status', {
    extend: 'Ext.app.Controller',
    views: ['api_status.Status'],
    refs: [
        {
            ref: 'CWImage',
            selector: '#status_form_cw_image'
        },
        {
            ref: 'LDAImage',
            selector: '#status_form_lda_image'
        },
        {
            ref: 'CSImage',
            selector: '#status_form_cs_image'
        },
        {
            ref: 'IMSImage',
            selector: '#status_form_ims_image'
        }
    ],

    cw_status: false,

    changeCWStatus: function(status) {

        this.cw_status = status;

    },

    init: function () {
        var me = this;
        var updateAPIStatus = function () {
            me.testConceptWiki();
            var lda_status = me.testLDA();
            console.log('*** STATUS *** LDA ' + lda_status);
            var cp_status = me.testChemspider();
            console.log('*** STATUS *** ChemSpider' + cp_status);
            var ims_status = me.testIMS();
            console.log('*** STATUS *** IMS' + ims_status);
        };

        var task = Ext.TaskManager.start({
            run: updateAPIStatus,
            interval: 600000
        });

        console.log('*** STATUS *** Concept Wiki ' + me.cw_status);

    },

    testIMS: function () {
        var me = this;
        var ims_store = Ext.create('LDA.store.IMSStore', {});
        var ims_status = false;
        ims_store.load(function (records, operation, success) {
            if (records[0].data.status == 'true') {
                console.log('IMS fetch success ' + records[0]);
                me.getIMSImage().setSrc('./assets/tick.png');
                me.getIMSImage().setVisible(true);
                ims_status = true;
            } else {
                console.log('IMS fetch boom');
                me.getIMSImage().setSrc('./assets/cancel.png');
                me.getIMSImage().setVisible(true);
                ims_status = false;
            }
        });
        return ims_status;
    },

    testChemspider: function () {
        var me = this;
        var chemspider_status = false;
        var searchEngine = Ext.create('CS.engine.search.Structure', {
            listeners: {
                finished: function (sender, rid) {
                    searchEngine.loadCSIDs(function (csids) {
                        if (csids.length == 0) {
                            console.log('CS fetch boom');
                            me.getCSImage().setSrc('./assets/cancel.png');
                            me.getCSImage().setVisible(true);
                            chemspider_status = false;
                        } else {
                            chemspider_status = me.csFetch(csids);
                        }
                    });
                },
                failed: function (sender, error) {
                    console.log('CS fetch boom');
                    me.getCSImage().setSrc('./assets/cancel.png');
                    me.getCSImage().setVisible(true);
                    chemspider_status = false;
                }
            }
        });
        var params = {};
        params['searchOptions.Molecule'] = 'CC(=O)Oc1ccccc1C(=O)O';
        // there can also be 'ChEBI' and 'MeSH'
        params['scopeOptions.DataSources[0]'] = 'DrugBank';
        params['scopeOptions.DataSources[1]'] = 'ChEMBL';
        params['scopeOptions.DataSources[2]'] = 'PDB';
        searchEngine.doSearch('exact', params);
        return chemspider_status;
    },

    testLDA: function () {
        var aspirin_uri = 'http://www.conceptwiki.org/concept/dd758846-1dac-4f0d-a329-06af9a7fa413';
        var compound_store = Ext.create("LDA.store.CompoundStore", {});
        var me = this;
        var lda_status = false;
        compound_store.proxy.extraParams.uri = aspirin_uri;
        compound_store.proxy.reader.uri = aspirin_uri;
        compound_store.load({
            callback: function (records, operation, success) {
                if (success) {
                    console.log("Compound Store Success", records[0]);
                    me.getLDAImage().setSrc('./assets/tick.png');
                    me.getLDAImage().setVisible(true);
                    lda_status = true;

                }
                else {
                    console.log("LDA boom");
                    me.getLDAImage().setSrc('./assets/cancel.png');
                    me.getLDAImage().setVisible(true);
                    lda_status = false;

                }
            }
        }, this);
        return lda_status;
    },

    testConceptWiki: function () {
        var cw_uuid = '07a84994-e464-4bbf-812a-a4b96fa3d197';
        var cw_lookup = Ext.create('CW.store.ConceptWikiLookup', {});
        var conceptwiki_status = false;
        cw_lookup.proxy.setExtraParam('uuid', cw_uuid);
        cw_lookup.proxy.setExtraParam('limit', 1);
        var me = this;
        var result = cw_lookup.load({
            params: {'q': 'aspi', 'branch': '4' },
            callback: function (records, operation, success) {
                if (success) {
                    console.log("Success", records[0]);
                    //me.getCWImage().setSrc('./assets/tick.png');
                    //me.getCWImage().setVisible(true);
                    me.changeCWStatus(true);
                    console.log("** STATUS CHANGED **" + me.cw_status);
                }
                else {
                    console.log("CW boom");
                    //me.getCWImage().setSrc('./assets/cancel.png');
                    //me.getCWImage().setVisible(true);
                    me.changeCWStatus(false);
                    console.log("** STATUS CHANGED **");
                }
            }
        }, this);
        console.log(" RESULT " + result);
        //return conceptwiki_status;
    },

    csFetch: function (csid_list) {
        var me = this;
        var fetch_status = false;
        var csid_store = Ext.create('LDA.store.CompoundStore', {});
        csid_store.proxy.reader = Ext.create('LDA.helper.Chems' +
            'piderCompoundReader');
        for (var i = 0; i < csid_list.length; i++) {
            csid_store.proxy.extraParams.uri = "http://rdf.chemspider.com/" + csid_list[i];
            csid_store.load(function (records, operation, success) {
                if (success) {
                    console.log('CS fetch success ' + records[0]);
                    me.getCSImage().setSrc('./assets/tick.png');
                    me.getCSImage().setVisible(true);
                    fetch_status = true;
                } else {
                    console.log('CS fetch boom');
                    me.getCSImage().setSrc('./assets/cancel.png');
                    me.getCSImage().setVisible(true);
                    fetch_status = false;
                }
            });
        }
        return fetch_status;
    }
});
