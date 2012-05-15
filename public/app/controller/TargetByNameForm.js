Ext.define('LSP.controller.TargetByNameForm', {
        extend:'Ext.app.Controller',
        models:['Target'],
        stores:['Targets'],
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
            if (historyTokenObject.u) {
                var store = this.getTargetsStore();
                if (historyTokenObject.u != store.proxy.extraParams.protein_uri) {
                    store.proxy.extraParams.protein_uri = historyTokenObject.u;
                    store.load();
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
            var tp = this.getTargetPanel();
            tp.startLoading();

            var form = this.getFormView();
            var target_uri = form.getValues().protein_uri;

            Ext.History.add('!p=TargetByNameForm&u=' + target_uri);
        }
    }
)
;
