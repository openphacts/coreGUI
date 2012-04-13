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

            Ext.History.add('TargetByNameForm=' + target_uri);
        }
    }
);
