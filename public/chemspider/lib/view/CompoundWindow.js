Ext.define('CS.view.CompoundWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.cs.compound.window',

    title: 'ChemSpider compound details...',
    layout: {
        type: 'table',
        columns: 2
    },
    defaults: { 
        frame: true, 
        margin: '5 5 5 5'
    },
    modal: false,
    resizable: false,
    autoShow: false,
    closeAction: 'hide',
    height: 650,
    width: 800,
    initComponent: function () {
        //  create component for displaying general compound information
        this.compoundInfo = Ext.create('CS.view.Compound', {
            title: 'Properties',
            height: 270,
            frame: true,
            colspan: 2
        });
        //  component will display compound synonyms
        this.synonyms = Ext.create('CS.view.Synonyms', { 
            id: 'csWindowSynonyms', 
            title: 'Synonyms',
            height: 300,
            width: 385,
            frame: true
        });
        //  component will display compound darasources
        this.datasources = Ext.create('CS.view.DataSources', { 
            id: 'csWindowDataSources',
            title: 'Data Sources',
            height: 300,
            width: 385,
            frame: true
        });

        //  create data store for getting access to compound's data
        this.compoundStore = Ext.create('CS.store.Compound');

        //  create 'Loading...' mask for displaying during the loading process
        this.loadingMask = new Ext.LoadMask(this, { msg: "Loading..." });

        this.items = [
            this.compoundInfo,
            this.synonyms,
            this.datasources
        ];

        this.buttons = [{
            text: 'Close',
            scope: this,
            handler: this.close
        }];

        this.callParent(arguments);
    },

    showCompound: function (csid) {
        var oThis = this;

        this.compoundStore.load({
            params: { 'csids[0]': csid },
            callback: function (records, operation, success) {
                if(success) {
                    var compound = oThis.compoundStore.first();

                    oThis.compoundInfo.loadData(compound);
                    oThis.synonyms.loadData(compound);
                    oThis.datasources.loadData(compound);
                }
                else {
                    Ext.MessageBox.show({
                        title: 'Error',
                        msg: 'Cannot get compoun details for CSID - ' + csid + ': ' + operation.error,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                }

                oThis.loadingMask.hide();
            }
        });

        this.show();

        this.loadingMask.show();
    },
});
