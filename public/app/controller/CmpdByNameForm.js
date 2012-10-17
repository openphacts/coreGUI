Ext.define('LSP.controller.CmpdByNameForm', {
    extend: 'Ext.app.Controller',
    models: ['LDA.model.CompoundModel'],
    stores: ['LDA.store.CompoundStore'],
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
        selector: '#compoundByNameLookup'
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
            'CmpdByNameForm #provId': {
                change: this.onProvChange
            }
        });
    },

    firecbnLink: function() {
        //            http://cbn.zbh.uni-hamburg.de/?ops_uris=http://www.conceptwiki.org/concept/dd758846-1dac-4f0d-a329-06af9a7fa413
        //var store = this.getLDAStoreCompoundStoreStore();
        window.open('http://cbn.zbh.uni-hamburg.de/?ops_uris=' + this.current_uri, '_blank')
    },

    handleHistoryToken: function(historyTokenObject) {
        console.log('CmpdByNameForm: handleHistoryToken()');
        var me = this;
        var compound_panel = me.getFormView().down("CmpdByNameSingleDisplayForm");
        if (historyTokenObject.u) {
            var store = this.getStore("LDA.store.CompoundStore");
            if (historyTokenObject.u != store.proxy.extraParams.uri) {
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
