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
            var store = this.getLDAStoreTargetStoreStore();
            if (historyTokenObject.u != store.proxy.extraParams.uri) {
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
            var store = this.getLDAStoreTargetStoreStore();
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
