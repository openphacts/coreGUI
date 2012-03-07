/**
 * @class Ext.ux.Exporter.SDFFormatter
 * @extends Ext.ux.Exporter.Formatter
 * Specialised Format class for outputting .sdf files
 */
Ext.define("Ext.ux.exporter.sdfFormatter.SdfFormatter", {
    extend: "Ext.ux.exporter.Formatter",
    contentType: 'data:text/plain;base64,',
    extension: "sdf",
    
    format: function (store, config)  {
    var me = this;
    var items = store.data.items;
 //   var cols = this.buildColumns(config.columns);
    this.getMolData(config.columns, items, function(sd_string){ console.log(sd_string); console.log(this); console.log(me); return sd_string })
  },

 fileDone: function (fromServer, callback){
    if (fromServer.response == 1)
    {
        //call the callback with the id
        callback(fromServer.sd_string);   
    }   
    else
    {
        //You have to remember to call the callback no matter what
        //or the caller won't know when it's complete
        callback(null);  //or some other "didn't get a valid response" value
    } 
  },

 getMolData: function(columns, items, callback){
    var compoundStore = Ext.create('CS.store.Compound');
    var item_count = items.length;
    var success_count = 0;
    var fail_count = 0;
    var sd_file = [];
    var me = this;
    Ext.each(items, function(item) {
      var sd_sting = "";
      var csid = item.raw.csid_uri.match(/http:\/\/rdf.chemspider.com\/(\d+)/)[1];
      if (!isNaN(parseInt(csid))){
        compoundStore.load({
              params: { 'csids[0]': csid },
              callback: function (records, operation, success) {
                  if(success){
                      success_count++;
                      compound = compoundStore.first().raw.Mol;
                      var record = me.buildrecord(columns, item, compound);
                      sd_file.push(record);
                      if (fail_count + success_count >= item_count){
                        var sd_reply = {};
                        sd_reply.sd_string = sd_file.join('\n');
                        sd_reply.sd_done = true;
                        sd_reply.response = 1;
                        me.fileDone(sd_reply,callback);
                      }
                  }
                  else {
                    fail_count++;
                  }
              }
          },this);   
      }
      else {fail_count++}  
    }, this);
    
   },
  
//   buildRows: function(columns, items) {
//     var rows = [];
//     Ext.each(items, function(row) {
//       var csid = row.raw.csid_uri.match(/http:\/\/rdf.chemspider.com\/(\d+)/)[1];
//       var molfile = this.getMolfile(csid);
//       console.log(molfile);
//       rows.push(this.buildRow(columns, row));
//     }, this);
//     return rows.join("\n");
//   },
  buildrecord: function(columns, row, molfile) {
    var cols = [];
    Ext.each(columns, function(column) {
      var data_record = ">  <";
      // todo: check hidden props
      if (!column.hidden) {
        var data = row.data[column.dataIndex];
        // the cell has a custom object instead of a string, use its text attribute
        if (data.text !== undefined) {
          data = data.text;
        }
        var stripped = this.stripTags(data);
        var escapedText = this.escapeTextSeperator(stripped);
        data_record = data_record + this.stripTags(column.text) + ">\n"
        data_record = data_record + escapedText + "\n"
        cols.push(data_record);
      }
    }, this);
    
    return molfile + "\n" + cols.join("\n") + "\n$$$$\n";
  },
  /**
   * Little helper function to get molfile from Chemspider by csid.
   * @param csid
   * @return molfile
   */
   getMolfile: function(csid){
    var compoundStore = Ext.create('CS.store.Compound');
    var compound = "";
    got_structure = false
    compoundStore.load({
            async: false,
            params: { 'csids[0]': csid },
            callback: function (records, operation, success) {
                if(success) {
                console.log(records);
                    compound = compoundStore.first().raw.Mol;
                    got_structure = true;
 //                   console.log(compound);
                }
                else {
                  console.log("Error in getting csid = " + csid);
                  got_structure = 'never';
                }
            }
        },this);
    
    return compound;
   },
  
  /**
   * Little helper function to strip tags from a string.
   * @param strMod
   * @return strMod
   */
  stripTags: function(strMod){
    if (typeof(strMod) === "string") {
      strMod = strMod.replace(/<(.|\n)*?>/gi, '');
    }
    var	tarea = document.createElement('textarea');
    tarea.innerHTML = strMod;
    return tarea.value;
  },

  /**
   * Little helper function to escape CSV Text Seperator.
   * @param strMod
   * @return strMod
   */
  escapeTextSeperator: function(strMod){
    if (typeof(strMod) === "string") {
      strMod = strMod.replace(/"/gi, '""');
    }
    var	tarea = document.createElement('textarea');
    tarea.innerHTML = strMod;
    return tarea.value;
  }
});