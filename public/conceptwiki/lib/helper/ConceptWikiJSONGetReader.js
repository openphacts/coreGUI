Ext.define('CW.helper.ConceptWikiJSONGetReader', {
    extend:'Ext.data.reader.Json',
    
    readRecords:function (data) {
        var records = [];
        var count = 0;
        var result = data['result']['primaryTopic'];
        var uuid, textMatch, prefLabel, altLabel, altLabels, matches, prefUrl;
        altLabels = [];
            uuid = result['_about'].split('/').pop();
            // The preferred altLabel & prefLabel have been extracted already as first class objects
            prefLabel = result.prefLabel;
            prefUrl="";
            Ext.each(result['exactMatch'], function(match, jindex) {
                if (match.matchType == "PREFERRED") {
                      prefUrl = match.url;
                      return false; // breaks loop
                }
			});
        Ext.each(result["altLabel_en"], function(item, jindex) {
		altLabels.push(item);
		});
        // constructing the data record
        var record = Ext.create('CW.model.ConceptWikiLookup', {
          uuid: uuid,
          ops_uri: CW.config.Settings.base_ops_uri + uuid,
          pref_label: prefLabel,
          alt_labels: altLabels.join("; "),
          pref_url: prefUrl
        });

        records.push(record);
        count++;
     return new Ext.data.ResultSet(
            {
                total  : count,
                count  : count,
                records: records,
                success:true,
                message:'loaded'
            });
    }
});

