class TsvFile < ActiveRecord::Base

  attr_accessible :uuid, :percentage, :status

  # Use with delayed job to process tsv downloads in the background
  def process params
    app_key = AppSettings.config["keys"]["app_key"]
    app_id = AppSettings.config["keys"]["app_id"]
    domain = AppSettings.config["tsv"]["tsv_url"]
    path = AppSettings.config["tsv"][params[:request_type] + "_path"]
    app_version = AppSettings.config["tsv"]["api_version"]
    url_path = ''
    url_params = "https://" + domain + "/" + app_version + path + "?uri=" + CGI::escape(params[:uri]) + "&_format=tsv" + "&app_id=" + app_id + "&app_key=" + app_key
    params[:activity_type] != "" ? url_params += "&activity_type=" + CGI::escape(params[:activity_type]) + "&activity_unit=" + CGI::escape(params[:activity_unit]) + "&" + CGI::escape(params[:activity_value_type]) + "=" + CGI::escape(params[:activity_value]) : ''
    params[:pchembl_value_type] != "" ? url_params += "&" + CGI::escape(params[:pchembl_value_type]) + "=" + CGI::escape(params[:pchembl_value]) : ''
    params[:assay_organism] != "" ? url_params += "&assay_organism=" + CGI::escape(params[:assay_organism]) : ''
    params[:target_organism] != "" ? url_params += "&target_organism=" + CGI::escape(params[:target_organism]) : ''
    number_of_pages = (params[:total_count].to_i / 250) + 1
    i = 1
    file = File.new(File.join(Rails.root, "filestore", self.uuid), "w")
    # download the tsv file 250 records at a time
    all_headers = []
    begin
      FasterCSV.open(file.path, "w", {:col_sep=>"\t", :headers=>true}) do |tab|
        while i <= number_of_pages
          url_path = url_params + "&_page=#{i}&_pageSize=250"
          logger.info "Retrieving: " + url_path.to_s
          uri = URI.parse(url_path)
          http = Net::HTTP.new(uri.host, uri.port)
          http.use_ssl = true
          http.verify_mode = OpenSSL::SSL::VERIFY_NONE
          response = http.get(uri.request_uri)
          tab_data = FasterCSV.parse(response.body, {:col_sep => "\t", :headers => true, :quote_char => "\a"})
          # only need the header line from the first response
          if i == 1 
            all_headers = tab_data.headers
            all_headers.delete(nil)
            tab << all_headers
          end
          tab_data.each do |row|
            current_row = []
            all_headers.each {|header| current_row << row.values_at(header)}
            tab << current_row
          end
          self.update_attributes(:percentage => 100/number_of_pages.to_f * i)
          i+=1
        end
      end
      self.update_attributes(:percentage => 100, :status => "finished")
    rescue Exception => e
      self.update_attributes(:status => "failed")
      logger.error "An error occurred retrieving response for #{url_path}: " + e.to_s
      # TODO send an error response?
    end
  end
  handle_asynchronously :process
  
  # Use with delayed job to process chemspider tsv downloads in the background
  def process_chemspider params
    # no guarantee you will get all the headers so here is a complete list, might change in the future so be aware
    app_key = AppSettings.config["keys"]["app_key"]
    app_id = AppSettings.config["keys"]["app_id"]
    app_version = AppSettings.config["tsv"]["api_version"]
    all_headers = []
    domain = AppSettings.config["tsv"]["tsv_url"]
    path = "/compound"
    url_path = ''
    file = File.new(File.join(Rails.root, "filestore", self.uuid), "w")
    first = true
    i = 1
    total = JSON.parse(params[:csids]).size
    FasterCSV.open(file.path, "w", {:col_sep=>"\t", :headers=>true}) do |tab|
      #tab << all_headers
      JSON.parse(params[:csids]).each do |csid|
        
        url_params = "https://" + domain + "/" + app_version + path + "?uri=" + CGI::escape("http://ops.rsc.org/#{csid}") + "&_format=tsv&app_id=" + app_id + "&app_key=" + app_key

        begin
          logger.info "Retrieving: " + url_params.to_s
          uri = URI.parse(url_params)
          http = Net::HTTP.new(uri.host, uri.port)
          http.use_ssl = true
          http.verify_mode = OpenSSL::SSL::VERIFY_NONE
          response = http.get(uri.request_uri)
          tab_data = FasterCSV.parse(response.body, {:col_sep => "\t", :headers=>true})
          if i == 1 
            all_headers = tab_data.headers
            all_headers.delete(nil)
            tab << all_headers
          end
          tab_data.each do |row|
            current_row = []
            all_headers.each {|header| current_row << row.values_at(header)}
            tab << current_row
          end
          first = false
        rescue Exception => e
          logger.error "An error occurred retrieving response for #{url_path} : "  + e.to_s
        end
        pct = 100/total.to_f * i
        self.update_attributes(:percentage => pct)
        i += 1
      end  
    end
    self.update_attributes(:percentage => 100, :status => "finished")
  end
  handle_asynchronously :process_chemspider

end
