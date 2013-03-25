Ext.define('LDA.helper.TSVCreateReader', {
    extend: 'Ext.data.reader.Json',

    readRecords: function(data) {
        var uuid = data[0].uuid;
        var records = new Array();
        
        records.push(Ext.create('LDA.model.TSVCreateModel', {uuid: uuid}));

        return new Ext.data.ResultSet({
            total: records.length,
            count: records.length,
            records: records,
            success: true,
            message: 'loaded'
        });
    }
});
