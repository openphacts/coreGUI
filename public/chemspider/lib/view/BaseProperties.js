Ext.define('CS.view.BaseProperties', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.cs.baseproperties',
    autoScroll: true,
    layout: 'fit',
    border: 0,
    constructor: function () {
        this.callParent(arguments);

        this.tpl = new Ext.XTemplate(
            '<tpl for=".">',
                '<div class="base_props">',
                    '<div class="name">{Name}</div>',
                    '<div class="mf">{MF:this.formatFormula}</div>',
                    '<div class="prop"><span class="name">ChemSpider ID:</span> <a href="' + CS.config.Settings.baseUrl + '/{CSID}" target="chemspider">{CSID}</a></div>',
                    '<div class="prop"><span class="name">Monoisotopic mass:</span> {MM}</div>',
                    '<tpl for="Identifiers">',
                        '<tpl if="this.isSMILES(values)">',
                            '<div class="prop"><span class="name">SMILES:</span> {Value}</div>',
                        '</tpl>',
                        '<tpl if="this.isStdInChi(values)">',
                            '<div class="prop"><span class="name">Std. InChI:</span> {Value}</div>',
                        '</tpl>',
                        '<tpl if="this.isStdInChiKey(values)">',
                            '<div class="prop"><span class="name">Std. InChIKey:</span> {Value}</div>',
                        '</tpl>',
                    '</tpl>',
                '</div>',
            '</tpl>',
            {
                formatFormula: function (mf) {
                    return mf.replace(/_{/g, '<sub>').replace(/}/g, '</sub>');
                },
                isSMILES: function (values) {
                    return values.IdentifierType == 1;
                },
                isStdInChi: function (values) {
                    return values.IdentifierType == 0 && values.Version == "v1.02s";
                },
                isStdInChiKey: function (values) {
                    return values.IdentifierType == 2 && values.Version == "v1.02s";
                }
            }
        );
    },
    loadData: function (json) {
        this.update(json);
    }
});
