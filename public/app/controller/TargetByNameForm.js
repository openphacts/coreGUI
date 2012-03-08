Ext.define('LSP.controller.TargetByNameForm', {
        extend:'Ext.app.Controller',
        models:['Target'],
        stores:['Targets'],
        views:['target_by_name.TargetPanel'],

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

            store.proxy.extraParams.protein_uri = target_uri;
            store.load({
                scope:this,
                callback:function (records, operation, success) {
                    if (success) {
                        console.log('successful response from server');
                        if (records.length > 0) {
                            console.log('more than zero records returned records.length=' + records.length);
                            tp.showRecord(records[0]);
                        } else {
                            console.log('zero records returned records.length=' + records.length);
                            tp.showNoDataMessage();
                        }
                    }
                    else {
                        console.log('unsuccessful response from server');
                        tp.showErrorMessage();
                    }
                }
            });
            tp.endLoading();
            button.enable();
        }


    }
)
;
