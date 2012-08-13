Ext.define('LDA.helper.EnzymeFamilyCountReader', {
    extend:'Ext.data.reader.Json',
    requires:['LDA.helper.LDAConstants'],
//    alias:'reader.ldajson',

    readRecords:function (data) {
//        console.log('readRecords');
//        console.log(data);

        var countVal = data['result']['primaryTopic'][LDA_COMPOUND_PHARMACOLOGY_COUNT];
        var uriVal = data['result']['primaryTopic'][LDA_ABOUT];

//        var record = new Ext.data.Model(undefined, undefined, {count:countVal}, convertedValues = {});
        var record = Ext.create('LDA.model.PharmacologyCountModel', {count:countVal, uri:uriVal});

       console.log('LDA.model.PharmacologyCountModel: CompoundPharmacologyCount');
//        console.log(JSON.stringify(record));
		total_count = this.total_count;
		if (total_count == null) {
			total_count = 50; //default number of records to retrieve. Pagination details will be fetched separately be the controller
		}
        return new Ext.data.ResultSet(
            {
                total:total_count,
                count:countVal,
                records:[record],
                success:true,
                message:'loaded'
            });
    }
});