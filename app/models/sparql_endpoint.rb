########################################################################################
#  
#  Copyright H. Lundbeck A/S
#  This file is part of LSP4All.
#  
#  LSP4All is free software; you can redistribute it and/or modify
#  it under the terms of the GNU General Public License as published by
#  the Free Software Foundation; either version 2 of the License, or (at
#  your option) any later version.
#  
#  LSP4All IS MADE AVAILABLE FOR DISTRIBUTION WITHOUT ANY FORM OF WARRANTY TO THE 
#  EXTENT PERMITTED BY APPLICABLE LAW.  THE COPYRIGHT HOLDER PROVIDES THE PROGRAM \"AS IS\" 
#  WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT  
#  LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR 
#  PURPOSE. THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM LIES
#  WITH THE USER.  SHOULD THE PROGRAM PROVE DEFECTIVE IN ANY WAY, THE USER ASSUMES THE
#  COST OF ALL NECESSARY SERVICING, REPAIR OR CORRECTION. THE COPYRIGHT HOLDER IS NOT 
#  RESPONSIBLE FOR ANY AMENDMENT, MODIFICATION OR OTHER ENHANCEMENT MADE TO THE PROGRAM 
#  BY ANY USER WHO REDISTRIBUTES THE PROGRAM SO AMENDED, MODIFIED OR ENHANCED.
#  
#  IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING WILL THE 
#  COPYRIGHT HOLDER BE LIABLE TO ANY USER FOR DAMAGES, INCLUDING ANY GENERAL, SPECIAL,
#  INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR INABILITY TO USE THE
#  PROGRAM (INCLUDING BUT NOT LIMITED TO LOSS OF DATA OR DATA BEING RENDERED INACCURATE
#  OR LOSSES SUSTAINED BY THE USER OR THIRD PARTIES OR A FAILURE OF THE PROGRAM TO 
#  OPERATE WITH ANY OTHER PROGRAMS), EVEN IF SUCH HOLDER HAS BEEN ADVISED OF THE 
#  POSSIBILITY OF SUCH DAMAGES.
#  
#  You should have received a copy of the GNU General Public License
#  along with this program; if not, write to the Free Software
#  Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.
#  
########################################################################################


require 'sparql/client'
require 'rdf'

class SparqlEndpoint

 # include ActiveModel::Validations
 # include ActiveModel::Conversion
  extend ActiveModel::Naming

  def initialize(endpoint_url = 'http://10.11.92.222:8202/sparql')
    @url = endpoint_url
    @endpoint = SPARQL::Client.new(@url)
  end
 
  def find(limit ,options)
    if limit.nil? then limit = 10 end
    if options[:select].nil? then
       query = @endpoint.select
    else
       query = @endpoint.select(options[:select])
    end   
    query.where(options[:conditions]) unless options[:conditions].nil?
    
     unless options[:conditions].nil? then
     options[:conditions].each do |statement|
        query.where(statement)
      end
    end
    
    
    if limit == :all then
      # no limit added
    elsif limit == :first then     
      query.limit(1) 
    else 
      query.limit(limit)
    end   

    unless options[:prefix].nil? then
     options[:prefix].each do |prefix|
        query.prefix(prefix)
      end
    end 
    
    unless options[:optional].nil? then   
      options[:optional].each do |ops|
        query.optional(ops)
      end
    end  
    
    query.from(options[:from]) unless options[:from].nil?
    query.order(options[:order]) unless options[:order].nil?
    query.filter(options[:filter]) unless options[:filter].nil?
    query.offset(options[:offset]) unless options[:offset].nil?
 
    puts "#{Time.now} - Remote SPARQL endpoint #{@url} posted with query:\n#{query}\n"
    solutions = query.execute
    puts "#{Time.now} - ENDPOINT #{@url} returned #{solutions.size} results"                                           
    results = Array.new
    solutions.each do |solution|                                                             
       results.push(solution.to_hash)                                                                                                        
    end
    results
  end
       
  def find_by_sparql(query)
     puts "#{Time.now} - Remote SPARQL Endpoint #{@url} posted with query:\n#{query}\n"
     solutions = @endpoint.query(query)
     puts "#{Time.now} - ENDPOINT #{@url} returned #{solutions.size} results" 
     results = Array.new
     solutions.each do |solution| 
     
       rdf = solution.to_hash
       rdf.each {|key, value| rdf[key] = value.to_s}                                                        
       results.push(rdf)                                                                                                        
     end
     results
  end
 
  def find_rdfs_label(url)
     query_str = "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> " + 
                 "SELECT ?label " +
                 "WHERE { <#{url}> rdfs:label ?label .} " +
                 "LIMIT 1"
     
     puts "#{Time.now} - Remote SPARQL Endpoint #{@url} posted with query:\n#{query_str}\n"
     solutions = @endpoint.query(query_str)
     puts "#{Time.now} - ENDPOINT #{@url} returned #{solutions.size} result" 
     #puts solutions.first.inspect
     #return solutions.first.value
     results = Array.new
     solutions.each do |solution| 
       rdf = solution.to_hash
       rdf.each {|key, value| results.push(value.to_s)}                                                        
       #results.push(rdf)                                                                                                        
     end
     results.first             
  end
 
 
  def lookup_subject(subject_uri)
     query = "SELECT  DISTINCT ?p ?o
              WHERE {
                <#{subject_uri}> ?p ?o
              }"
     puts "#{Time.now} - Remote SPARQL @endpoint #{@endpoint} posted with query:\n#{query}\n"
     
     solutions = @endpoint.query(query)
     puts "#{Time.now} - ENDPOINT #{@endpoint} returned #{solutions.size} results" 
     results = Array.new
     solutions.each do |solution| 
     
       rdf = solution.to_hash
       rdf.each {|key, value| rdf[key] = value.to_s}                                                        
       results.push(rdf)                                                                                                        
     end
     results
  end    
  
  
  
  def persisted?
    false
  end
end

                            