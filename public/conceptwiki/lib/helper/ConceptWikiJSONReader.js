Ext.define('CW.helper.ConceptWikiJSONReader', {
    extend:'Ext.data.reader.Json',
    
    readRecords:function (data) {
        var records = [];
        var count = 0;
        var results = data['result']['primaryTopic']['result'];
        var uuid, textMatch, prefLabel, altLabel, altLabels, matches, prefUrl;
        altLabels = [];
        Ext.each(results, function(result, index) {
            uuid = result['_about'];
            textMatch = result.match;
            prefLabel = result.prefLabel;
            altLabels.push(result.altLabel);
            prefUrl="";
            Ext.each(result['exactMatch'], function(match, jindex) {
                if (match.matchType == "PREFERRED") {
                      prefUrl = match.url;
                      return false; // breaks loop
                }
            });

        // constructing the data record
        var record = Ext.create('CW.model.ConceptWikiLookup', {
          match: textMatch.replace(/\<\/em\>/g,"</b>").replace(/\<em\>/g,"<b>"),
          uuid: uuid,
          ops_uri: CW.config.Settings.base_ops_uri + uuid,
          pref_label: prefLabel,
          alt_labels: alt_labels.join("; "),
          pref_url: prefUrl
        });
        
        records.push(record);
        count++;
     });
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

