/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 29/06/2012
 * Time: 11:31
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LDA.helper.TargetPharmacologyCountReader', {
    extend:'Ext.data.reader.Json',
    requires:['LDA.helper.LDAConstants'],
    readRecords:function (data) {

        var countVal = data['result']['primaryTopic'][LDA.helper.LDAConstants.LDA_TARGET_PHARMACOLOGY_COUNT];
        var uriVal = data['result']['primaryTopic'][LDA.helper.LDAConstants.LDA_ABOUT];
        var record = Ext.create('LDA.model.PharmacologyCountModel', {count:countVal, uri:uriVal});

//        console.log('LDA.model.PharmacologyCountModel: TargetPharmacologyCount');
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