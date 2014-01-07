Ext.define('LDA.helper.FilterActivityReader', {
    extend: 'Ext.data.reader.Json',
    requires: ['LDA.helper.LDAConstants'],

    readRecords: function(data) {
        var records = new Array();

        Ext.each(data['result']['items'], function(match, index) {
            var about = match[LDA.helper.LDAConstants.LDA_ABOUT];
            var about_split = about.split('/');
            var api_label = about_split[about_split.length - 1];
            var split_api_label = api_label.split('#');
            var actual_activity = split_api_label[split_api_label.length -1];
            var label = match[LDA.helper.LDAConstants.LDA_LABEL];
            var record = Ext.create('LDA.model.FilterActivityModel', {
                activity_type: label,
                about: actual_activity
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
