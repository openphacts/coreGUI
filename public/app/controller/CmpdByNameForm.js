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

            }
        ],

        init:function () {
            this.control({
                'CmpdByNameForm button[action=query_cmpd_by_name]':{
                    click:this.submitQuery
                },
                'CmpdByNameForm conceptWikiCompoundLookup':{
                    select:this.enableSubmit
                }
            });
        },

        enableSubmit:function (compundLookup) {
            var form = this.getFormView();
            var button = this.getSubmitButton();
            button.enable();
        },

        submitQuery:function (button) {
            var me = this;
            var form = button.up('form');
            button.disable();
            var tp = this.getCmpdByNameSingleDisplayForm();
            tp.startLoading();
            var values = form.getValues();
            //var grid = this.getGridView();

            var store = this.getCompoundsStore();
            store.proxy.extraParams.compound_uri = values;

            store.load({
                scope:this,
                callback:function (records, operation, success) {
                    if (success) {
                        if (records.length > 0) {
                            var csid = records[0].data.csid_uri.match(/http:\/\/rdf.chemspider.com\/(\d+)/)[1];
                            me.getCompoundImagePanel().setSrc('http://www.chemspider.com/ImagesHandler.ashx?id=' + csid);
                            tp.showRecord(records[0]);
                        } else {
                            tp.showNoDataMessage();
                        }
                    }
                    else {
                        tp.showErrorMessage();
                    }
                }
            });
            tp.endLoading();
            button.enable();


        }
    }
);
