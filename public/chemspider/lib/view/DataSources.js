Ext.define('CS.view.DataSources', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.cs.datasources',
    height: 250,
    border: '0 0 0 0',
    loadData: function (compound) {
        var oThis = this;

        this.removeAll();

        var references = new Ext.util.HashMap();
        for (var i = 0; i < compound.data.References.length; i++) {
            var ref = compound.data.References[i];
            if (ref.Text != null && ref.Text != '') {
                if (!references.containsKey(ref.Source))
                    references.add(ref.Source, new Array());

                references.get(ref.Source).push(ref);
            }
        }

        references.each(function (key, value, length) {
            oThis.add({
                title: key,
                items: {
                    xtype: 'panel',
                    id: 'ds' + key,
                    border: 0,
                    tpl: new Ext.XTemplate(
                        '<ul class="zebra" style="overflow:auto; height:100%;">',
                            '<tpl for=".">',
                                '<li>',
                                    '<tpl if="this.hasLink(values)">',
                                        '<a href="{Link}" target="datasources">{Text}</a>',
                                    '</tpl>',
                                    '<tpl if="!this.hasLink(values)">',
                                        '{Text}',
                                    '</tpl>',
                                '</li>',
                            '</tpl>',
                        '</ul>',
                        {
                            hasLink: function (values) {
                                return values.Link != null && values.Link.length > 0;
                            }
                        }
                    ),
                    data: value
                }
            });
        });
    }
});
