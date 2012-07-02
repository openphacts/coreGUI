/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 29/06/2012
 * Time: 11:32
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LDA.helper.TargetPharmacologyReader', {
    extend:'Ext.data.reader.Json',
    requires:['LDA.helper.LDAConstants'],
    readRecords:function (data) {
        var records = new Array();

        var record = Ext.create('LDA.model.PharmacologyModel', {});

        records.push(record);

        return new Ext.data.ResultSet(
            {
                total:records.length,
                count:records.length,
                records:records,
                success:true,
                message:'loaded'
            });
    }
});
