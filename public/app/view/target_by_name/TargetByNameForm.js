Ext.define('LSP.view.target_by_name.TargetByNameForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.TargetByNameForm',
    closable: true,
    header: false,
    requires: ['LSP.view.dropdowns.conceptWikiProteinLookup',
    // 'LSP.view.dynamicgrid.DynamicGrid',
    'LSP.view.target_by_name.TargetPanel'],
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    initComponent: function() {

        this.items = [{
            xtype: 'label',
            html: '<span style="font-family: verdana; color: grey; ">Hint: Start typing in protein name and species. E.g. \"Adenosine receptor A2a (Homo sapiens)\"</span>',
            labelWidth: 400,
            padding: '5 0 0 140'
        }, {
            xtype: 'container',
            margin: '0 5 5 5',
            name: 'form_fields',
            layout: {
                type: 'column'
            },
            style: 'background-color: #fff;',
            items: [
            Ext.create('CW.view.ConceptWikiLookup', {
                //xtype: 'conceptWikiLookup',
                fieldLabel: 'Target name',
                itemId: 'targetByNameLookup',
                store: Ext.create('CW.store.ConceptWikiLookup', {
                    proxy: {
                        type: 'jsonp',
                        timeout: 5000,
                        url: CW.config.Settings.searchByTagUrl,
                        reader: Ext.create('CW.helper.ConceptWikiJSONReader'),
                        noCache: false,
                        limitParam: undefined,
                        startParam: undefined,
                        pageParam: undefined,
		        callbackKey: '_callback',
                        extraParams: {
                            'branch': 3, // Only show species results from swissprot
                            _format: 'json',
                            'app_id': app_id,
                            'app_key': app_key
                        }
                    }
                }),
                name: 'protein_uri',
                cwTagUuid: 'eeaec894-d856-4106-9fa1-662b1dc6c6f1' // This is the ConceptWiki tag uuid for proteins. Must be set to use method!
            }), {
                xtype: 'button',
                padding: '5 5 5 5',
                text: 'Search',
                itemId: 'TargetByNameSubmit_id',
                disabled: true,
                action: 'query_target_by_name'
            },{
                    xtype: 'radiogroup',
                    width: 160,
                    labelWidth: 65,
                    fieldLabel: 'Provenance',
                    itemId: 'provId',
                    margin: '5 0 0 90',

                    items: [{
                        boxLabel: 'On',
                        name: 'prov',
                        inputValue: true
                    }, {
                        boxLabel: 'Off',
                        name: 'prov',
                        inputValue: false,
                        checked: true
                    }]
                }]
        }, {
            xtype: 'TargetPanel',
            flex: 1
        }];
        this.callParent(arguments);
    }
});
