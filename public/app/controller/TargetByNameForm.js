Ext.define('LSP.controller.TargetByNameForm', {
        extend:'Ext.app.Controller',
        models:['LDA.model.TargetModel'],
        stores:['LDA.store.TargetStore'],
        views:['target_by_name.TargetByNameForm', 'target_by_name.TargetPanel'],

        refs:[
            {
                ref:'targetPanel',
                selector:'TargetPanel'
            },
            {
                ref:'formView',
                selector:'TargetByNameForm'
            },
            {
                ref:'submitButton',
                selector:'#TargetByNameSubmit_id'

            },
            {
                ref:'lookup',
                selector:'#targetByNameLookup'
            }
        ],

        init:function () {
            this.control({
                'TargetByNameForm button[action=query_target_by_name]':{
                    click:this.submitQuery
                },
                'TargetByNameForm conceptWikiProteinLookup':{
                    select:this.enableSubmit
                },
                'TargetByNameForm':{
                    historyToken:this.handleHistoryToken
                }
            });
        },

        handleHistoryToken:function (historyTokenObject) {
			console.log('LSP.controller.TargetByNameForm: handleHistoryToken()');
			var me = this;
			var target_panel = me.getFormView().down("TargetPanel")
            if (historyTokenObject.u) {
                var store = this.getLDAStoreTargetStoreStore();
                if (historyTokenObject.u != store.proxy.extraParams.uri) {
                    store.proxy.extraParams.uri = historyTokenObject.u;
                    me.getFormView().setLoading(true);
                    store.load(function(records, operation, success) {
						console.log('LSP.controller.TargetByNameForm: store is loaded ' + success);
						if (success) {
							me.getSubmitButton().enable();
							target_panel.setValues(records[0]);
							target_panel.down("#dp").setVisible(true);
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

        enableSubmit:function () {
            var form = this.getFormView();
            var button = this.getSubmitButton();
            button.enable();
        },

        submitQuery:function (button) {
            button.disable();
            var form = this.getFormView();
            var target_uri = form.getValues().protein_uri;
            Ext.History.add('!p=TargetByNameForm&u=' + target_uri);
        }
    }
);
