/**
 * @class Ext.ux.Exporter.SDFFormatter
 * @extends Ext.ux.Exporter.Formatter
 * Specialised Format class for outputting .sdf files
 * Written by Sune Askj�r
 */
Ext.define("Ext.ux.exporter.sdfFormatter.SdfFormatter", {
    extend:"Ext.ux.exporter.Formatter",
    contentType:'data:text/plain;base64,',
    extension:"sdf",

    format:function (store, config) {
        var me = this;
        var sd_rows = [];
        store.each(function (record, index) {
            sd_rows.push(this.buildRecord(config.columns, record, record.molfile));
        }, this);

        return sd_rows.join("\n") + "\n";
    },

    buildRecord:function (columns, row, molfile) {
        var cols = [];
        var csid = row.raw.csid_uri.match(/http:\/\/rdf.chemspider.com\/(\d+)/)[1];
        Ext.each(columns, function (column) {
            var data_record = ">  <";
            // todo: check hidden props
            if (!column.hidden && column.text != '&#160') {
                var data = row.data[column.dataIndex];
                // the cell has a custom object instead of a string, use its text attribute
                if (data.text !== undefined) {
                    data = data.text;
                }
                var stripped = this.stripTags(data);
                var escapedText = this.escapeTextSeperator(stripped);
                data_record = data_record + this.stripTags(column.text) + "> (" + csid + ")\n"
                data_record = data_record + escapedText + "\n"
                if (escapedText !== "") {
                    cols.push(data_record);
                }
            }
        }, this);
        return molfile + cols.join("\n") + "\n$$$$";
    },

    /**
     * Little helper function to strip tags from a string.
     * @param strMod
     * @return strMod
     */
    stripTags:function (strMod) {
        if (typeof(strMod) === "string") {
            strMod = strMod.replace(/<(.|\n)*?>/gi, '');
        }
        var tarea = document.createElement('textarea');
        tarea.innerHTML = strMod;
        return tarea.value;
    },

    /**
     * Little helper function to escape CSV Text Seperator.
     * @param strMod
     * @return strMod
     */
    escapeTextSeperator:function (strMod) {
        if (typeof(strMod) === "string") {
            strMod = strMod.replace(/"/gi, '""');
        }
        var tarea = document.createElement('textarea');
        tarea.innerHTML = strMod;
        return tarea.value;
    }
});