class TsvFile < ActiveRecord::Base

  attr_accessible :uuid, :percentage, :status

  # Use with delayed job to process tsv downloads in the background
  def process params
    domain = AppSettings.config["tsv"]["tsv_url"]
    path = AppSettings.config["tsv"][params[:request_type] + "_path"]
    url_params = "uri=" + CGI::escape(params[:uri]) + "&_format=tsv"
    params[:activity_type] ? url_params += "&activity_type=" + CGI::escape(params[:activity_type]) + "&activity_unit=" + CGI::escape(params[:activity_unit]) + "&" + CGI::escape(params[:activity_value_type]) + "=" + CGI::escape(params[:activity_value]) : ''
    params[:assay_organism] ? url_params += "&assay_organism=" + CGI::escape(params[:assay_organism]) : ''
    number_of_pages = (params[:total_count].to_i / 250) + 1
    i = 1
    file = File.new(File.join(Rails.root, "filestore", self.uuid), "w")
    # download the tsv file 250 records at a time
    all_headers = []
    begin
      FasterCSV.open(file.path, "w", {:col_sep=>"\t", :headers=>true}) do |tab|
        while i <= number_of_pages
          url_path = "#{path}?".concat(url_params).concat("&_page=#{i}&_pageSize=250")
          response = Net::HTTP.get(domain, url_path)
          tab_data = FasterCSV.parse(response, {:col_sep => "\t", :headers => true})
          # only need the header line from the first response
          if i == 1 
            all_headers = tab_data.headers
            tab << all_headers
          end
          tab_data.each do |row|
            current_row = []
            all_headers.each {|header| header != nil ? current_row << row.values_at(header) : ''}
            tab << current_row
          end
          self.update_attributes(:percentage => 100 - 100/i)
          i+=1
        end
      end
      self.update_attributes(:percentage => 100, :status => "finished")
    rescue Exception => e
      self.update_attributes(:status => "failed")
      logger.error "An error occurred retrieving response for url_path: "  + e.to_s
      # TODO send an error response?
    end
  end
  handle_asynchronously :process

end
