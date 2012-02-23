Ext.define('CS.view.search.Structure', {
    extend: 'CS.view.search.Base',
    alias: 'widget.structuresearch',
    bodyStyle: 'padding: 5px;',
    height: 34,
    onRender: function () {
        this.callParent(arguments);

        this.add({
            border: false,
            items: {
                xtype: 'button',
                id: 'structureSearchBtn',
                text: 'Structure Search',
                width: 80,
                scope: this,
                handler: function (btn, evn) {
                    this.getWindow().show();
                }
            }
        });
    },
    initComponent: function () {
        var oThis = this;
        this.searchEngine = Ext.create('CS.engine.search.Structure', {
            listeners: {
                finished: function (sender, rid) {
                    oThis.rid = rid;
                    oThis.showSearchResults();
                }
            }
        });

        this.callParent(arguments);
    },
    doSearch: function () {
        var activeTab = this.tabs.getActiveTab().id;

        var smiles;
        if (activeTab == 'jchempaint-tab') {
            smiles = Ext.getCmp('jChemPaint').getSmiles();
        }
        else if (activeTab == 'jme-tab') {
            smiles = Ext.getCmp('jme').getSmiles();
        }
        else if (activeTab == 'ketcher-tab') {
            smiles = Ext.getCmp('ketcher').getSmiles();
        }

        this.getWindow().hide();

        if (smiles != '') {
            var searchType = '';
            var params = {};
            params['searchOptions.Molecule'] = smiles;

            if (Ext.getCmp('exactSearch').checked) {
                searchType = 'exact';
            }
            else if (Ext.getCmp('substructureSearch').checked) {
                searchType = 'substructure';
            }
            else if (Ext.getCmp('similaritySearch').checked) {
                searchType = 'similarity';
                params['searchOptions.Threshold'] = 0.99;
                params['searchOptions.SimilarityType'] = 'Tanimoto';
            }
            else {
                Ext.MessageBox.show({
                    title: 'Error',
                    msg: 'Similarity search: Unknown structure search type',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }

            if (searchType != '')
                this.searchEngine.doSearch(searchType, params);
        }
        else {
            Ext.Msg.show({
                title: 'Forgot to draw molecule?',
                msg: 'Please draw molecule at first and try again!',
                buttons: Ext.Msg.OK,
                scope: this,
                fn: function () {
                    this.getWindow().show();
                },
                icon: Ext.MessageBox.INFO
            });
        }
    },
    getWindow: function () {
        if (this.wnd == null) {
            this.tabs = new Ext.TabPanel({
                activeTab: 0,
                deferredRender: false,
                items: [
                    {
                        id: 'ketcher-tab',
                        title: 'Ketcher',
                        items: Ext.create('CS.applet.Ketcher', { id: 'ketcher', width: 680, height: 520 })
                    },
                    {
                        id: 'jchempaint-tab',
                        title: 'JChemPaint',
                        items: Ext.create('CS.applet.JChemPaint', { id: 'jChemPaint', width: 680, height: 520 })
                    },
                    {
                        id: 'jme-tab',
                        title: 'JME',
                        items: Ext.create('CS.applet.JME', { id: 'jme', width: 680, height: 520 })
                    }
                ]
            });

            this.wnd = new Ext.Window({
                width: 700,
                height: 630,
                closeAction: 'hide',
                title: 'Draw structure',
                border: true,
                shadow: true,
                items: [
                    this.tabs,
                    {
                        xtype: 'radiogroup',
                        id: 'searchType',
                        width: 450,
                        items: [
                            {
                                id: 'exactSearch',
                                name: 'searchType',
                                boxLabel: 'Exact search',
                                inputValue: 'exact',
                                checked: true
                            },
                            {
                                id: 'substructureSearch',
                                name: 'searchType',
                                boxLabel: 'Substructure search',
                                inputValue: 'substructure'
                            },
                            {
                                id: 'similaritySearch',
                                name: 'searchType',
                                boxLabel: 'Similarity search',
                                inputValue: 'similarity'
                            }
                        ]
                    }
                ],
                bbar: [
                    '->',
                    {
                        text: 'Search',
                        scope: this,
                        handler: function () {
                            this.doSearch();
                        }
                    },
                    {
                        text: 'Close',
                        scope: this,
                        handler: function () {
                            this.getWindow().hide();
                        }
                    }
                ]
            });
        }

        return this.wnd;
    }
});
