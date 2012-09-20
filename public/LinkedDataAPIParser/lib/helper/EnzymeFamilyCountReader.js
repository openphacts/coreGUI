Ext.define('LDA.helper.EnzymeFamilyCountReader', {
    extend:'Ext.data.reader.Json',
    requires:['LDA.helper.LDAConstants'],
//    alias:'reader.ldajson',

    readRecords:function (data) {
	       console.log('LDA.model.EnzymeFamilyCountReader: readRecords()');
//        console.log('readRecords');
//        console.log(data);

        var countVal = data['result']['primaryTopic'][LDA.helper.LDAConstants.LDA_ENZYME_FAMILY_COUNT];
        var uriVal = data['result']['primaryTopic'][LDA.helper.LDAConstants.LDA_ABOUT];

//        var record = new Ext.data.Model(undefined, undefined, {count:countVal}, convertedValues = {});
        var record = Ext.create('LDA.model.PharmacologyCountModel', {count:countVal, uri:uriVal});

//        console.log(JSON.stringify(record));
        return new Ext.data.ResultSet(
            {
                total:1,
                count:1,
                records:[record],
                success:true,
                message:'loaded'
            });
    }
});