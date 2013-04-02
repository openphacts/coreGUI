Ext.define('LSP.controller.Status', {
    extend: 'Ext.app.Controller',
    views: ['api_status.Status'],
    refs: [{
	    ref: 'CWImage',
	    selector: '#status_form_cw_image'
    }, {
	    ref: 'LDAImage',
	    selector: '#status_form_lda_image'
    }, {
	    ref: 'CSImage',
	    selector: '#status_form_cs_image'
    }, {
	    ref: 'IMSImage',
	    selector: '#status_form_ims_image'
    }],

    init: function() {
var me=this;
 var updateAPIStatus = function () {
             me.testCompoundWiki();
        me.testLDA();
        me.testChemspider();
        me.testIMS();
 };
var task = Ext.TaskManager.start({
     run: updateAPIStatus,
     interval: 600000
 });

    },

   testIMS: function() {
     var me = this;
     var ims_store = Ext.create('LDA.store.IMSStore', {});
     ims_store.load(function(records, operation, success) {
     if (records[0].data.status == 'true') {
         console.log('IMS fetch success ' + records[0]);
         me.getIMSImage().setSrc('./assets/tick.png');
         me.getIMSImage().setVisible(true);
      } else {
         console.log('IMS fetch boom');
         me.getIMSImage().setSrc('./assets/cancel.png');
         me.getIMSImage().setVisible(true);
      }
      });
   },

   testChemspider: function() {
       var me = this;
       var searchEngine = Ext.create('CS.engine.search.Structure', {
            listeners: {
                finished: function(sender, csids) {
                if (csids.length == 0) {
		    console.log('CS fetch boom');
                    me.getCSImage().setSrc('./assets/cancel.png');
                    me.getCSImage().setVisible(true);
		} else {
		    console.log('CS fetch success ' + csids[0]);
                    me.getCSImage().setSrc('./assets/tick.png');
                    me.getCSImage().setVisible(true);
		}
                },
		failed: function(sender, error) {
                    console.log('CS fetch boom');
                    me.getCSImage().setSrc('./assets/cancel.png');
                    me.getCSImage().setVisible(true);
		}
            }
        });
        var params = {};
        params['searchOptions.Molecule'] = 'CC(=O)Oc1ccccc1C(=O)O';
	// there can also be 'ChEBI' and 'MeSH'
	//TODO add data sources back in when ops dev api can handle it
        //params['scopeOptions.DataSources[0]'] = 'DrugBank';
	//params['scopeOptions.DataSources[1]'] = 'ChEMBL';
	//params['scopeOptions.DataSources[2]'] = 'PDB';
        searchEngine.doSearch('exact', params);

    },

    testLDA: function() {
      var aspirin_uri = 'http://www.conceptwiki.org/concept/dd758846-1dac-4f0d-a329-06af9a7fa413';
      var compound_store = Ext.create("LDA.store.CompoundStore", {});
      var me = this;
      compound_store.proxy.extraParams.uri = aspirin_uri;
      compound_store.proxy.reader.uri = aspirin_uri;
      compound_store.load({
          callback:function (records, operation, success) {
              if (success) {
                console.log("Compound Store Success",records[0]);
                me.getLDAImage().setSrc('./assets/tick.png');
                me.getLDAImage().setVisible(true);
              }
              else {
                console.log("LDA boom");
                me.getLDAImage().setSrc('./assets/cancel.png');
                me.getLDAImage().setVisible(true);
              }
          }
      },this );
    },

    testCompoundWiki: function() {
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
//remove branch until the dev api can handle it
//'branch' :'4', 
'app_key': app_key, 'app_id': app_id, '_format' : 'json' },
          callback:function (records, operation, success) {
              if (success) {
                console.log("Success",records[0]);
                me.getCWImage().setSrc('./assets/tick.png');
                me.getCWImage().setVisible(true);
              }
              else {
                console.log("CW boom");
                me.getCWImage().setSrc('./assets/cancel.png');
                me.getCWImage().setVisible(true);
              }
          }
      },this );
    },

    csFetch: function(csid_list) {
        var me = this;
        var csid_store = Ext.create('LDA.store.CompoundStore', {});
        csid_store.proxy.reader = Ext.create('LDA.helper.ChemspiderCompoundReader');
        for (var i = 0; i < csid_list.length; i++) {
            csid_store.proxy.extraParams.uri = "http://rdf.chemspider.com/" + csid_list[i];
            csid_store.load(function(records, operation, success) {
                if (success) {
                    console.log('CS fetch success ' + records[0]);
                    me.getCSImage().setSrc('./assets/tick.png');
                    me.getCSImage().setVisible(true);
                } else {
                    console.log('CS fetch boom');
                    me.getCSImage().setSrc('./assets/cancel.png');
                    me.getCSImage().setVisible(true);
                }
            });
        }
    }
});
