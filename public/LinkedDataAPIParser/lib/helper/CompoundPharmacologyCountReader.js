/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 25/06/2012
 * Time: 15:06
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LDA.helper.CompoundPharmacologyCountReader', {
    extend:'Ext.data.reader.Json',
    requires:['LDA.helper.LDAConstants'],
//    alias:'reader.ldajson',

    readRecords:function (data) {
//        console.log('readRecords');
//        console.log(data);

        var countVal = data['result']['primaryTopic'][LDA.helper.LDAConstants.LDA_COMPOUND_PHARMACOLOGY_COUNT];
        var uriVal = data['result']['primaryTopic'][LDA.helper.LDAConstants.LDA_ABOUT];

//        var record = new Ext.data.Model(undefined, undefined, {count:countVal}, convertedValues = {});
        var record = Ext.create('LDA.model.PharmacologyCountModel', {count:countVal, uri:uriVal});

       console.log('LDA.model.PharmacologyCountModel: CompoundPharmacologyCount');
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