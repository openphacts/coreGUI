Ext.define('LDA.helper.FilterUnitsReader', {
    extend: 'Ext.data.reader.Json',
    requires: ['LDA.helper.LDAConstants'],

    readRecords: function(data) {
        var pt = data['result']['primaryTopic'];
        var activity_type = pt[LDA.helper.LDAConstants.LDA_LABEL]
        var units = pt.unit;
        var records = new Array();

        Ext.each(units, function(unit, index) {
            var about = unit[LDA.helper.LDAConstants.LDA_ABOUT];
            var label = unit[LDA.helper.LDAConstants.LDA_LABEL];
            var record = Ext.create('LDA.model.FilterUnitsModel', {
                activity_type: activity_type,
                unit: label,
                about: about
            });
            records.push(record);
        });

        return new Ext.data.ResultSet({
            total: records.length,
            count: records.length,
            records: records,
            success: true,
            message: 'loaded'
        });
    }
});
