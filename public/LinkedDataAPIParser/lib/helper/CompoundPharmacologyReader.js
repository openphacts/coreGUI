/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 25/06/2012
 * Time: 15:05
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LDA.helper.CompoundPharmacologyReader', {
    extend:'Ext.data.reader.Json',
    requires:['LDA.helper.LDAConstants'],
//    alias:'reader.ldajson',

    readRecords:function (data) {
        var records = new Array();

        var record = Ext.create('LDA.model.PharmacologyModel', {});

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