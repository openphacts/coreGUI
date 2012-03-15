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

            }
        ],

        init:function () {
            this.control({
                'TargetByNameForm button[action=query_target_by_name]':{
                    click:this.submitQuery
                },
                'TargetByNameForm conceptWikiProteinLookup':{
                    select:this.enableSubmit
                }
            });
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

            var store = this.getTargetsStore();
//            var tp = this.getTargetPanel();
//            store.addListener('load', tp.showData, tp);

            store.proxy.extraParams.protein_uri = target_uri;
            store.load();
//                {
//                    scope:this,
//                    callback:function (records, operation, success) {
//                        if (success) {
//                            if (records.length > 0) {
//                                tp.showData(records[0]);
//                            } else {
//                                tp.showMessage('No records found within OPS for this search');
//                            }
//                        }
//                        else {
//                            tp.showMessage('Error contacting OPS core API');
//                        }
//                    }
//                }
//            );
            tp.endLoading();
            button.enable();
        }


    }
);
