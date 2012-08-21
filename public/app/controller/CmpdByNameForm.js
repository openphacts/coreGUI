Ext.define('LSP.controller.CmpdByNameForm', {
        extend:'Ext.app.Controller',
        models:['LDA.model.CompoundModel'],
        stores:['LDA.store.CompoundStore'],
        views:['cmpd_by_name.CmpdByNameSingleDisplayForm'],

        refs:[
            {
                ref:'cmpdByNameSingleDisplayForm',
                selector:'CmpdByNameSingleDisplayForm'
            },
            {
                ref:'compoundImagePanel',
                selector:'CmpdByNameSingleDisplayForm #compound_form_imagepanel'
            },
            {
                ref:'formView',
                selector:'CmpdByNameForm'
            },
            {
                ref:'submitButton',
                selector:'#CmpdByNameSubmit_id'
            },
            {
                ref:'lookup',
                selector:'#compoundByNameLookup'
            }
        ],

        init:function () {
            this.control({
                'CmpdByNameForm button[action=query_cmpd_by_name]':{
                    click:this.submitQuery
                },
                'CmpdByNameForm conceptWikiCompoundLookup':{
                    select:this.enableSubmit
                },
                'CmpdByNameForm':{
                    historyToken:this.handleHistoryToken
                }
            });
        },

        handleHistoryToken:function (historyTokenObject) {
            console.log('CmpdByNameForm: handleHistoryToken()');
			var me = this;
			var target_panel = me.getFormView().down("CmpdByNameSingleDisplayForm");
            if (historyTokenObject.u) {
                var store = this.getLDAStoreCompoundStoreStore();
                if (historyTokenObject.u != store.proxy.extraParams.uri) {
                    store.proxy.extraParams.uri = historyTokenObject.u;
                    me.getFormView().setLoading(true);
                    store.load(function(records, operation, success) {
						console.log('LSP.controller.CmpdByNameForm: store is loaded ' + success);
						if (success) {
							me.getSubmitButton().enable();
							target_panel.setValues(records[0]);
							target_panel.down("#displayPanel").setVisible(true);
							target_panel.down('#msg').setVisible(false);
							me.getFormView().setLoading(false);
				        } else {
				            me.getFormView().down("TargetPanel").showMessage('Server did not respond');
				        }
					});
                }
            } else if (historyTokenObject.s) {
                var lookup = this.getLookup();
                lookup.setRawValue(historyTokenObject.s);
                lookup.doQuery(historyTokenObject.s);
            }
        },

        enableSubmit:function (compundLookup) {
            var form = this.getFormView();
            var button = this.getSubmitButton();
            button.enable();
        },

        submitQuery:function (button) {
            button.disable();
            var form = this.getFormView();
            var compound_uri = form.getValues().compound_uri;
            Ext.History.add('!p=CmpdByNameForm&u=' + compound_uri);
        }
    }
);
