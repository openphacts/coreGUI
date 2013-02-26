Ext.define('LDA.helper.IMSReader', {
    extend: 'Ext.data.reader.Json',

    readRecords: function(data) {
        var status = data[0].status;
        var records = new Array();
        
        records.push(Ext.create('LDA.model.IMSModel', {status: status}));

        return new Ext.data.ResultSet({
            total: records.length,
            count: records.length,
            records: records,
            success: true,
            message: 'loaded'
        });
    }
});
