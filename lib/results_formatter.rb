class ResultsFormatter

# This formatting function manipulates the resultset based on query variable name "csid_uri" which is tested for a substring match with "Chemical-Structure"
  # from where the CSID is grapped and used to construct columns for displaying the picture and the csid hyperlink to the Chemspider page. 
  def self.format_chemspider_results(input_arr)
    if input_arr.length >= 1 and input_arr.first.has_key?(:csid_uri) then
      output_arr = Array.new
      input_arr.each do |record|
         uri = record[:csid_uri]
         csid = record[:csid]
         cs_image = nil
         if uri =~ /http:\/\/rdf.chemspider.com\/(\d+)/ then
           csid = $1
           cs_image = '<img width="128" height="128" src="http://www.chemspider.com/ImagesHandler.ashx?id=' + csid + '&w=128&h=128" alt="CSID:' + csid + '"/>'
         end
         record[:csid] = csid
         record[:chemspider_id] = '<a href ="http://inchi.chemspider.com/Chemical-Structure.' + csid + '.html' + '" target="_blank">' + csid + '</a>'
         record[:structure] = cs_image
         puts record.inspect
      end
    end
    return input_arr
  end
  
  # Here we look for a return variable called ?pubmed_id and format it to be a hyperlink to resolve the id
  def self.format_pubmed_id(input_arr)
    if not :pubmed_id.nil? && input_arr.first.has_key?(:pubmed_id) then 
      input_arr.each do |record|
        pubmed_id = record[:pubmed_id]
        if not pubmed_id.nil? then
          record[:pubmed_id] = '<a href ="http://www.ncbi.nlm.nih.gov/pubmed/' + pubmed_id + '" target="_blank">' + pubmed_id + '</a>'
        end
      end 
    end 
    return input_arr
  end
  
  ##
  # This function formats SPARQL query results to json column objects for ExtJS dynamicgrid widget
  #
  def self.construct_column_objects(input_arr)

    if input_arr.length > 0 and input_arr.first.is_a?(Hash) then
      header_keys = input_arr.first.keys     
      header_strings = header_keys.collect{|sym| sym.to_s}
      
      # we devide header variable names into url+label pairs or singletons 
      url_label_pairs = Hash.new
      singleton_vars = Hash.new
      tpl_headers = Array.new
      header_idx = 0
      header_strings.each do |header|
          if header =~ /(\w+)_(url|label)/ then        
            if $2 == 'url' then
              if not url_label_pairs.has_key?($1) then
                url_label_pairs[$1] = Array.new(2)
              end 
              url_label_pairs[$1][0] = header_idx   
              tpl_headers.push($1)
            elsif $2 == 'label' then
              if not url_label_pairs.has_key?($1) then
                url_label_pairs[$1] = Array.new(2)
              end 
              url_label_pairs[$1][1] = header_idx
            end
          else
            singleton_vars[header] = header_idx
          end
          puts url_label_pairs.keys
          header_idx += 1
      end
      columns = Array.new

      url_label_pairs.each_pair do |key, idx_pair|
         col = Hash.new
         col[:text] = key
         col[:xtype] = 'templatecolumn'  
         col[:tpl] = '<a href ="{' + header_strings[idx_pair.last.to_i] + '}" target="_blank">{' + header_strings[idx_pair.first.to_i] + '}</a>'
         col[:hidden] = false
         col[:groupable] = true
         columns.push(col)
         columns.push(:text => header_strings[idx_pair.first.to_i], :dataIndex => header_strings[idx_pair.first.to_i], :hidden => true)
         columns.push(:text => header_strings[idx_pair.last.to_i], :dataIndex => header_strings[idx_pair.last.to_i], :hidden => true)
      end
      singleton_vars.each do |key, idx|
          col = Hash.new
          col[:text] = key.gsub(/_/,' ').capitalize
          col[:dataIndex] = key
          col[:hidden] = false
          col[:filter] = {:type => 'string'}
          col[:width] = 150
          if key =~ /structure/ then
            col[:width] = 200
          end
          if key =~ /ic50/ then
             col[:type] = 'float'
             col[:filter] = {:type => 'numeric'}             
          end
          columns.push(col)
       
      end                      
      fields = header_strings + tpl_headers
      field_aofh = Array.new
      fields.each do |field|
         type = 'auto'
         if field =~ /ic50/ then
            type = 'float'
         end
         if field == 'csid' then
            type = 'int'
         end
         field_aofh.push({:name => field, :type => type})
      end 
      @col_objs = {
            :objects => input_arr,
            :totalCount => input_arr.size,
            :metaData => { :fields => field_aofh, :root => 'objects' },
            :columns => columns }
      return @col_objs
    else
        return {  :objects => input_arr,
                  :totalCount => [],
                  :metaData => { :fields => [], :root => 'objects' },
                  :columns => [] }
    end       
  end
  

end