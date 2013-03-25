Ext.define('LDA.helper.TSVStatusReader', {
    extend: 'Ext.data.reader.Json',

    readRecords: function(data) {
        var status = data[0].status;
        var percentage = data[0].percentage;
        var records = new Array();
        
        records.push(Ext.create('LDA.model.TSVStatusModel', {status: status, percentage: percentage}));

        return new Ext.data.ResultSet({
            total: records.length,
            count: records.length,
            records: records,
            success: true,
            message: 'loaded'
        });
    }
});
