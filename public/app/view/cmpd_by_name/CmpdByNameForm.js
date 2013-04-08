Ext.define('LSP.view.cmpd_by_name.CmpdByNameForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.CmpdByNameForm',
    closable: true,
    header: false,
    requires: ['LSP.view.dropdowns.conceptWikiCompoundLookup', 'LSP.view.dynamicgrid.DynamicGrid', 'LSP.view.cmpd_by_name.CmpdByNameSingleDisplayForm'],
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [{
                xtype: 'label',
                html: '<span style="font-family: verdana; color: grey; ">Hint: Type in compound name. E.g. \"Aspirin\"</span>',
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
                    xtype: 'conceptWikiLookup',
                    fieldLabel: 'Compound name',
                    itemId: 'compoundByNameLookup',
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
                                'branch': 4, // Only show species results from swissprot
                                _format: 'json',
                                'app_id': app_id,
                                'app_key': app_key
                            }
                        }
                    }),
                    name: 'compound_uri',
                    cwTagUuid: '07a84994-e464-4bbf-812a-a4b96fa3d197' // This is the ConceptWiki tag uuid for proteins. Must be set to use method!
                }), {
                    xtype: 'button',
                    padding: '5 5 5 5',
                    text: 'Search',
                    itemId: 'CmpdByNameSubmit_id',
                    disabled: true,
                    action: 'query_cmpd_by_name'
                },
                    {
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
                    }

                ]
            }, {
                xtype: 'CmpdByNameSingleDisplayForm',
                flex: 1
            }]
        });
        this.callParent(arguments);
    }
});
