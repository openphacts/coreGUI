/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 20/06/2012
 * Time: 10:48
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LSP.controller.LDAParserController', {
    extend:'Ext.app.Controller',
    requires:['LDA.view.LDAParserView'],
    refs:[
        {
            ref:'parserview',
            selector:'LDAParserView'
        },
        {
            ref:'rta',
            selector:'#textarea1'
        },
        {
            ref:'pta',
            selector:'#textarea2'
        }
    ],

    init:function () {
        var me = this;
        me.control(
            {
                'LDAParserView button':{
                    click:this.buttonClick
                }
//                },
//                'LDAParserView button[action=logstorec]':{
//                    click:this.logStoreDetails
//                },
//                'LDAParserView button[action=loadcpc]':{
//                    click:this.loadLDAData
//                },
//                'LDAParserView button[action=logstorecpc]':{
//                    click:this.logStoreDetails
//                }
            }
        );
    },

    buttonClick:function (button, event, eOpts) {
        var action = button.action;
        var bits = action.split('_');
        if (bits.length == 2) {
            var cmd = bits[0];
            var data = bits[1];
            if (cmd == 'load') {
                this.loadLDAData(data);
            } else if (cmd == 'log') {
                this.logStoreDetails(data);
            }

        }
    },


    logStoreDetails:function (data) {
//        console.log('logStoreDetails()');
        var grid = this.getParserview().down('#lda' + data + 'g');
        var store = grid.store;
        var logArea = Ext.ComponentQuery.query('#logarea')[0];
        var sbuff = '';
        logArea.setValue('');
        Ext.each(store.data.items, function (record, index, allRecords) {
            console.log(record.id);

            sbuff = '';
            sbuff = sbuff.concat(record.id + '\n');
            Ext.iterate(record.data,
                function (key, value, originalObject) {
                    console.log(key + ': ' + value);
                    sbuff = sbuff.concat(key + ': ' + value + '\n');
                }
            );
            var currValue = logArea.getValue();
            logArea.setValue(currValue.concat('\n' + sbuff + '\n'));
        });
    },


    loadLDAData:function (data) {
//        console.log('loadLDAData()');
        var grid = this.getParserview().down('#lda' + data + 'g');
        var uriField = this.getParserview().down('#lda' + data + 'u');
        var uri = uriField.getValue();
        var store = grid.getStore();

        grid.setLoading(true);
        store.setURI(uri);
        store.load(function () {
            grid.setLoading(false);
        });


//        store.load(function (records, operation, success) {
//            console.log('store loaded');
//            Ext.each(records, function (record, index, allRecords) {
//                console.log(record.id);
//                Ext.iterate(record.raw,
//                    function (key, value, originalObject) {
//                        console.log(key + ': ' + value);
//                    }
//                );
//            })
//        });


//        console.log(this);

//        Ext.data.JsonP.request(
//            {
//                callbackKey:'_callback',
//                url:'http://ops.few.vu.nl/compound/pharmacology?uri=http%3A%2F%2Fwww.conceptwiki.org%2Fconcept%2F38932552-111f-4a4e-a46a-4ed1d7bdf9d5&_format=json',
//
//                success:function (response) {
//                    me.getRta().setValue(JSON.stringify(response, undefined, 2));
//                    console.log(response);
//                    me.processLDAJSON(response, me.getPta());
//                }
//            }
//
//        );

//        Ext.data.JsonP.request(
//            {
//                callbackKey:'_callback',
//                url:'http://ops.few.vu.nl/compound/pharmacology/pages?uri=http%3A%2F%2Fwww.conceptwiki.org%2Fconcept%2F38932552-111f-4a4e-a46a-4ed1d7bdf9d5&_format=json',
//
//                success:function (response) {
//                    me.getRta().setValue(JSON.stringify(response, undefined, 2));
//                    console.log(response);
//                    me.processLDAJSON(response, me.getPta());
//                }
//            }
//
//        );

//        Ext.data.JsonP.request(
//            {
//                callbackKey:'_callback',
//                url:'http://ops.few.vu.nl/compound/pharmacology/count?uri=http%3A%2F%2Fwww.conceptwiki.org%2Fconcept%2F38932552-111f-4a4e-a46a-4ed1d7bdf9d5&_format=json',
//
//                success:function (response) {
//                    me.getRta().setValue(JSON.stringify(response, undefined, 2));
//                    console.log(response);
//                    me.processLDAJSON(response, me.getPta());
//                }
//            }
//
//        );

//        var my_reader = Ext.create('app.lib.CompoundPharmacologyCountReader');
//
//        var store = Ext.create('Ext.data.Store', {
//            model:'User',
//            proxy:{
//                type:'jsonp',
//                noCache:false,
//                startParam:undefined,
//                limitParam:undefined,
//                pageParam:undefined,
//                callbackKey:'_callback',
//                url:'http://ops.few.vu.nl/compound/pharmacology/count?uri=http%3A%2F%2Fwww.conceptwiki.org%2Fconcept%2F38932552-111f-4a4e-a46a-4ed1d7bdf9d5&_format=json',
//                reader:my_reader
//            }
//        });
//


//        Ext.data.JsonP.request(
//            {
//                callbackKey:'_callback',
//                url:'http://ops.few.vu.nl/compound?uri=http%3A%2F%2Fwww.conceptwiki.org%2Fconcept%2F38932552-111f-4a4e-a46a-4ed1d7bdf9d5&_format=json',
//
//                success:function (response) {
//                    me.getRta().setValue(JSON.stringify(response, undefined, 2));
//                    console.log(response);
//                    me.processLDAJSON(response, me.getPta());
//                }
//            }
//
//        );

//        Ext.Ajax.request({
//                url:'raw_compound_pharmacology.json',
//
//                success:function (response) {
//                    me.getRta().setValue(response.responseText);
//                    me.processLDAJSON(response.responseText, me.getPta());
//                }
//            }
//        );
    },

    processLDAJSON:function (ldaJson, pta) {

        var resArr = new Array();

        Ext.each(ldaJson['result']['primaryTopic']['exactMatch'][2]['activity'],
            function (activity, index, array) {
                var pObj = new Object();
                pObj['type'] = activity.type;
                pObj['relation'] = activity.relation;
                pObj['standard_value'] = activity.standardValue;
                pObj['standard_units'] = activity.standardUnits;
                resArr.push(pObj);
            }
        );

        console.log(resArr);

//        pta.setValue(Ext.encode(resArr));
        pta.setValue(JSON.stringify(resArr, undefined, 2));

    }


});