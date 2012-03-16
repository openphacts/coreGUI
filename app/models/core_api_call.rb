require 'coreapi_response_parser'
require 'net/http'
require 'uri'

class CoreApiCall
  include ActiveModel::Validations
  extend ActiveModel::Naming
                                    
  CORE_API_URL = "http://ops.few.vu.nl:9184/opsapi"
    
  def initialize(url = CORE_API_URL, open_timeout = 60, read_timeout = 60)
     # Configuring the connection
     @uri = URI.parse(url)
     @http = Net::HTTP.new(@uri.host, @uri.port)
     @http.open_timeout = open_timeout # in seconds
     @http.read_timeout = read_timeout # in seconds

     # For timing the transaction   
     @request_time = nil
     @response_time = nil
     @query_time = nil 
     @success = false
     @http_error = nil
     
     response = nil
     @api_method = nil    
     @limit = 100
     @offset = 0
     
     @results = nil     
  end
  
  def success
     @success
  end
  
  def http_error
     @http_error
  end
  
  def request(api_method, options)
     @method = api_method
     if @method.nil? then raise "No method API method selected! Please specify a OPS coreAPI method" end
     options[:method] = @method
     
     if options[:limit].nil? then
       options[:limit] = @limit
     end
     if options[:offset].nil? then
       options[:offset] = @offset
     end   
     # we store the settings for a possible later call 
     if not options[:named_graph_uri].nil? then
        @named_graph_uri = options[:named_graph_uri]
     end 
     if not options[:default_graph_uri] then
        @default_graph_uri = options[:default_graph_uri]
     end
     puts "\nIssues call to coreAPI on #{@uri.inspect} with options: #{options.inspect}\n"
 
     request = Net::HTTP::Post.new(@uri.path)
      # Tweak headers, removing this will default to application/x-www-form-urlencoded
      request["Content-Type"] = "application/json"
      request.form_data = options
      
      response = nil
      start_time = Time.now
      begin
        @http.start do |http|
          response = http.request(request)
        end
      rescue Timeout::Error
        query_time = Time.now - start_time
        puts "Timeout after #{query_time} seconds"
        raise Timeout::Error
      end

      @query_time = Time.now - start_time

       puts "Call took #{@query_time} seconds"

       status = case response.code.to_i
          when 100..199 then
            @http_error = "HTTP {status.to_s}-error"
            puts @http_error
            return nil        
          when 200 then #HTTPOK =>  Success
            @success = true
            parsed_response = CoreApiResponseParser.parse_response(response)
            @results = Array.new
            parsed_response.each do |solution|  
               rdf = solution.to_hash
               rdf.each {|key, value| rdf[key] = value.to_s}                                                        
               @results.push(rdf)
            end
            return @results                                             
          when 201..407 then           
            @http_error = "HTTP {status.to_s}-error"
            puts @http_error
            return nil            
          when 408 then
            @http_error = "HTTP post to core API timed out"
            puts @http_error
            return nil  
          when 409..600 then
            puts @http_error
            @http_error = "HTTP {status.to_s}-error"
            return nil
       end   
 #    rescue StandardError => the_exception
 #         raise "OPS API error #{the_exception} - #{the_exception.backtrace.inspect.to_s}"
 #    end
  end
      
end
