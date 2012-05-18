Ext.define('LSP.controller.CmpdByNameForm', {
        extend:'Ext.app.Controller',
        models:['Compound'],
        stores:['Compounds'],
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
            console.log('CmpdByNameForm handleHistoryToken')
            if (historyTokenObject.u) {
                var store = this.getCompoundsStore();
                if (historyTokenObject.u != store.proxy.extraParams.compound_uri) {
                    store.proxy.extraParams.compound_uri = historyTokenObject.u;
                    this.getFormView().setLoading();
                    store.load();
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
