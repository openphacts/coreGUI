Ext.define('LDA.helper.FilterActivityReader', {
    extend: 'Ext.data.reader.Json',
    requires: ['LDA.helper.LDAConstants'],

    readRecords: function(data) {
        var pt = data['result']['primaryTopic'];
        var activities = pt['normalised_activity_type'];
        var records = new Array();

        Ext.each(activities, function(match, index) {
            var about = match[LDA.helper.LDAConstants.LDA_ABOUT];
            var label = match[LDA.helper.LDAConstants.LDA_LABEL];
            var record = Ext.create('LDA.model.FilterActivityModel', {
                activity_type: label,
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
