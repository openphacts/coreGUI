require 'linked_data_api_response_parser'
require 'net/http'
require 'uri'
class LinkedDataAPICall
  # To change this template use File | Settings | File Templates.

  API_BASE_URL = "http://ops.few.vu.nl/"

  def initialize(url, open_timeout = 60, read_timeout = 60)
    # Configuring the connection
    @uri = URI.parse(API_BASE_URL + url)
    @http = Net::HTTP.new(@uri.host, @uri.port)
    @http.open_timeout = open_timeout # in seconds
    @http.read_timeout = read_timeout # in seconds

    # For timing the transaction
    @request_time = nil
    @response_time = nil
    @query_time = nil
    @success = false
    @http_error = nil

    @results = nil
  end

  def success
    @success
  end

  def http_error
    @http_error
  end

  def request_compound_pharmacology_paginated(options)
    http_resp = request(options)
    json_resp = LinkedDataAPIResponseParser.parse_paginated_pharmacology_by_compound(http_resp.body)
    return json_resp
  end

  def request_compound_pharmacology(options)
    http_resp = request(options)
    json_resp = LinkedDataAPIResponseParser.parse_pharmacology_by_compound(http_resp.body)
    return json_resp
  end

  def request_compound_pharmacology_count(options)
    http_resp = request(options)
    json_resp = LinkedDataAPIResponseParser.parse_pharmacology_by_compound_count(http_resp.body)
    return json_resp
  end

  def request_compound(options)
    http_resp = request(options)
    json_resp = LinkedDataAPIResponseParser.parse_compound(http_resp.body)
    return json_resp
  end

  def request_target(options)
    http_resp = request(options)
    json_resp = LinkedDataAPIResponseParser.parse_target(http_resp.body)
    return json_resp
  end

  def request(options)
    puts "\nIssues call to coreAPI on #{@uri.inspect} with options: #{options.inspect}\n"

    #uri = URI('http://example.com/index.html')
    #params = { :limit => 10, :page => 3 }
    #uri.query = URI.encode_www_form(params)
    #
    #res = Net::HTTP.get_response(uri)
    #puts res.body if res.is_a?(Net::HTTPSuccess)


    @uri.query = URI.encode_www_form(options)
    request = Net::HTTP::Get.new(@uri.request_uri)
    request["Content-Type"] = "application/json"

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


    # Tweak headers, removing this will default to application/x-www-form-urlencoded
    #request["Content-Type"] = "application/json"
    #request.form_data = options

    ##response = nil

    ##begin
    ##  @http.start do |http|
    ##    response = http.request(request)
    ##  end
    ##rescue Timeout::Error
    ##  query_time = Time.now - start_time
    ##  puts "Timeout after #{query_time} seconds"
    ##  raise Timeout::Error
    ##end
    #


    status = case response.code.to_i
               when 100..199 then
                 @http_error = "HTTP {status.to_s}-error"
                 puts @http_error
                 return nil
               when 200 then #HTTPOK =>  Success
                 @success = true
                 #parsed_response = LinkedDataAPIResponseParser.parse_response(response)
                 #@results = Array.new
                 #parsed_response.each do |solution|
                 #  rdf = solution.to_hash
                 #  rdf.each { |key, value| rdf[key] = value.to_s }
                 #  @results.push(rdf)
                 #end
                 return response
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