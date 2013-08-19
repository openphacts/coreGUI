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
    lda_status: false,
    cs_status: false,
    ims_status: false,

    changeCWStatus: function(status) {
        // whenver the status changes we update the api status widget
        this.cw_status = status;
        this.changeStatusColour();
    },

    changeLDAStatus: function(status) {
        // whenver the status changes we update the api status widget
        this.lda_status = status;
        this.changeStatusColour();
    },

    changeCSStatus: function(status) {
        // whenver the status changes we update the api status widget
        this.cs_status = status;
        this.changeStatusColour();
    },

    changeIMSStatus: function(status) {
        // whenver the status changes we update the api status widget
        this.ims_status = status;
        this.changeStatusColour();
    },

    changeStatusColour: function() {
        var status_indicator = Ext.ComponentQuery.query('#explorer_api_status_id')[0];
        var cw_img, lda_img, cs_img, ims_img;
        // If any of the status indicators are false then change the overall status to be orange
        // If they are all false then change the overall to red
        var green_img = "<img src='/assets/success_status.png'/>";
        var red_img = "<img src='/assets/red_status.png'/>"
        this.cw_status == true ? cw_img = green_img : cw_img = red_img;
        this.lda_status == true ? lda_img = green_img : lda_img = red_img;
        this.cs_status == true ? cs_img = green_img : cs_img = red_img;
        this.ims_status == true ? ims_img = green_img : ims_img = red_img;
        var cw_tooltip = '<tr><td>ConceptWiki</td><td> ' + cw_img + '</td></tr>';
        var cs_tooltip = '<tr><td>Chemspider</td><td>' + cs_img + '</td></tr>';
        var ims_tooltip = '<tr><td>IMS</td><td>' + ims_img + '</td></tr>';
        var lda_tooltip = '<tr><td>LDA</td><td>' + lda_img + '</td></tr>';

        var tooltip = '<table>' + cw_tooltip + ims_tooltip + cs_tooltip + lda_tooltip + '</table>';
        if (!this.cw_status || !this.lda_status || !this.cs_status || !this.ims_status) {
            //one or more apis are red
            status_indicator.setIconCls('icon-amber-status');
            status_indicator.setTooltip(tooltip);
        } else if (!this.cw_status && !this.lda_status && !this.cs_status && !this.ims_status) {
            //every api shows red
            status_indicator.setIconCls('icon-red-status');
            status_indicator.setTooltip(tooltip);
        } else {
            //every api returns green
            status_indicator.setIconCls('icon-success-status');
            status_indicator.setTooltip(tooltip);
        }
    },

    init: function () {
        var me = this;
        var updateAPIStatus = function () {
            me.testConceptWiki();
            me.testIMS();
            me.testChemspider();
            me.testLDA();
        };

        var task = Ext.TaskManager.start({
            run: updateAPIStatus,
            interval: 600000
        });

    },

    testIMS: function () {
        var me = this;
        var ims_store = Ext.create('LDA.store.IMSStore', {});
        var ims_status = false;
        ims_store.load(function (records, operation, success) {
            if (records[0].data.status == 'true') {
                me.ims_status != true ? me.changeIMSStatus(true) : '';
                console.log("IMS ** STATUS CHANGED **" + me.ims_status);
            } else {
                me.ims_status != false ? me.changeIMSStatus(false) : '';
                console.log("IMS ** STATUS CHANGED **" + me.ims_status);
            }
        });
    },

    testChemspider: function () {
        var me = this;
        var chemspider_status = false;
        var searchEngine = Ext.create('CS.engine.search.Structure', {
            listeners: {
                finished: function(sender, csids) {
                    if (csids.length == 0) {
                        me.cs_status != false ? me.changeCSStatus(false) : '';
                        console.log("CS ** STATUS CHANGED **" + me.cs_status);
		    } else {
                        me.cs_status != true ? me.changeCSStatus(true) : '';
                        console.log("CW ** STATUS CHANGED **" + me.cw_status);
                    }
                },
                failed: function (sender, error) {
                    me.cs_status != false ? me.changeCSStatus(false) : '';
                    console.log("CS ** STATUS CHANGED **" + me.cs_status);
                }
            }
        });
        // tell the search not to set the limit since the api does not like it
        // set for exact searches
        searchEngine.setLimit(1);
        var params = {};
        params['searchOptions.Molecule'] = 'CC(=O)Oc1ccccc1C(=O)O';
	// there can also be 'ChEBI' and 'MeSH'
	//TODO add data sources back in when ops dev api can handle it
        //params['scopeOptions.DataSources[0]'] = 'DrugBank';
	//params['scopeOptions.DataSources[1]'] = 'ChEMBL';
	//params['scopeOptions.DataSources[2]'] = 'PDB';
        searchEngine.doSearch('exact', params);
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
                    me.lda_status != true ? me.changeLDAStatus(true) : '';
                    console.log("LDA ** STATUS CHANGED **" + me.lda_status);
                } else {
                    me.lda_status != false ? me.changeLDAStatus(false) : '';
                    console.log("LDA ** STATUS CHANGED **" + me.lda_status);

                }
            }
        }, this);
    },

    testConceptWiki: function () {
        var cw_uuid = '07a84994-e464-4bbf-812a-a4b96fa3d197';
        var cw_lookup = Ext.create('CW.store.ConceptWikiLookup', {});
        // remove params that dev api cannot handle
        cw_lookup.proxy.noCache = false;
        cw_lookup.proxy.pageParam = '';
        cw_lookup.proxy.startParam = '';
	    cw_lookup.proxy.setExtraParam('uuid', cw_uuid);
	    cw_lookup.proxy.setExtraParam('limit', 1);
	    cw_lookup.proxy.callbackKey = '_callback';
        var me = this;
        cw_lookup.load({
          params: {'q': 'aspi', 
'branch' :'4', 
'app_key': app_key, 'app_id': app_id, '_format' : 'json' },
          callback:function (records, operation, success) {
              if (success) {
                me.cw_status != true ? me.changeCWStatus(true) : '';
                console.log("CW ** STATUS CHANGED **" + me.cw_status);
              } else {
                me.cw_status != false ? me.changeCWStatus(false) : '';
                console.log("CW ** STATUS CHANGED **" + me.cw_status);
              }
          }
      },this );
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
                    me.cs_status != true ? me.changeCSStatus(true) : '';
                    console.log("CS ** STATUS CHANGED **" + me.cs_status);
                } else {
                    me.cs_status != true ? me.changeCSStatus(true) : '';
                    console.log("CS ** STATUS CHANGED **" + me.cs_status);
                }
            });
        }
    }
});
