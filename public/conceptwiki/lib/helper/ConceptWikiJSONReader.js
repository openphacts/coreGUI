Ext.define('CW.helper.ConceptWikiJSONReader', {
    extend:'Ext.data.reader.Json',
    
    readRecords:function (data) {

        var records = [];
        var count = 0;
        Ext.each(data, function (item) {
           var record = {};
           var pref_label = "";
           var alt_labels = [];
           // iterating over labels to get preferred and alternative labels in relevant language
           Ext.each(item.labels, function (label){
              if (label.language.code == CW.config.Settings.lang_code) {
                if (label.type == "PREFERRED") {
                    pref_label = label.text;
                }
                if (label.type == "ALTERNATIVE") {
                    alt_labels.push(label.text);
                }             
              }
           });
           // iterating over tags to get the different tag uuid types and tag texts
//// NB we do not care aboout these at the moment
            var concept_tag_uuids = [];
//            var concept_tag_labels = [];           
//            Ext.each(item.tags, function (tag){              
//                concept_tag_uuids.push(tag.uuid);         
//            });
           // iterating over urls to get first preferred url
           pref_url = "";
           Ext.each(item.urls, function (url){
              if (url.type == "PREFERRED") {
                    pref_url = url.value;
                    return false; // breaks loop
              }
           });

           // constructing the data record
        var record = Ext.create('CW.model.ConceptWikiLookup', {
          match: item.match.replace(/\<\/em\>/g,"</b>").replace(/\<em\>/g,"<b>"),
          uuid: item.uuid,
          ops_uri: CW.config.Settings.base_ops_uri + item.uuid,
          pref_label: pref_label,
          alt_labels: alt_labels.join("; "),
          concept_type_tags: concept_tag_uuids.join("; "),
          pref_url: pref_url
        });
        
        records.push(record);
        count++;
        console.log(JSON.stringify(record));


       
    })
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