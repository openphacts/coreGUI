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


class EnzymesController < ApplicationController
  
  def index

    app_key = AppSettings.config["keys"]["app_key"]
    app_id = AppSettings.config["keys"]["app_id"]
    api_version = AppSettings.config["tsv"]["api_version"]
    
    respond_to do |format|
      format.xml  { render :xml => "" }
      format.json {
        
        nodes = Array.new
      
        if params[:node] == "root"

          domain = AppSettings.config["tsv"]["tsv_url"]
          path = AppSettings.config["enzyme"]["root_url"]
          url_params = "_format=json&app_id=" + app_id + "&app_key=" + app_key + "&root=enzyme"
          if api_version == ""
            url_path = "#{path}?".concat(url_params)
          else
            url_path = "/#{api_version}#{path}?".concat(url_params)
          end
          begin
            puts "root: " + url_path
            response = Net::HTTP.get(domain, url_path)
          rescue Exception => e
            logger.error "Error retrieving enzymes for : "  + domain + url_path + " : " + e.to_s
          end
          unless response.nil?
            json = JSON.parse(response)
            json["result"]["primaryTopic"]["hasPart"]["rootNode"].each { |d|
              nodes.push( { :name => d["prefLabel"], :ec_number => d["_about"].split("/").last, :id => d["_about"].split("/").last, :leaf => d["_about"][-1,1].eql?("-") ? false : true, :cls => d["_about"][-1,1].eql?("-") ? 'folder' : 'file' } )
            }
          end
        else
          domain = AppSettings.config["tsv"]["tsv_url"]
          path = AppSettings.config["enzyme"]["class_url"]
          url_params = "uri=" + CGI::escape("http://purl.uniprot.org/enzyme/" + params["node"]) + "&_format=json&app_id=" + app_id + "&app_key=" + app_key
          if api_version == ""
            url_path = "#{path}?".concat(url_params)
          else
            url_path = "/#{api_version}#{path}?".concat(url_params)
          end
          begin
            puts "child: " + url_path
            response = Net::HTTP.get(domain, url_path)
          rescue Exception => e
            logger.error "Error retrieving enzymes for : "  + domain + url_path + " : " + e.to_s
          end 
          unless response.nil?
            json = JSON.parse(response)
            #check whether there is one or multiple sub enzymes, the response format changes
            #depending on this ie is it 'has_member' => [{....}] or just 'has_member' => {....}
            if json["result"]["primaryTopic"]["childNode"].class.eql?(Hash)             
              about = json["result"]["primaryTopic"]["childNode"]["_about"]
              name = json["result"]["primaryTopic"]["childNode"]["prefLabel"]
              nodes.push( { :name => name, :ec_number => about.split("/").last, :id => about.split("/").last, :leaf => about[-1,1].eql?("-") ? false : true, :cls => about[-1,1].eql?("-") ? 'folder' : 'file' } )
            else
            json["result"]["primaryTopic"]["childNode"].each { |d|
              nodes.push( { :name => d["prefLabel"], :ec_number => d["_about"].split("/").last, :id => d["_about"].split("/").last, :leaf => d["_about"][-1,1].eql?("-") ? false : true, :cls => d["_about"][-1,1].eql?("-") ? 'folder' : 'file' } )
            }
          end
          end
        end

        render :json => construct_column_objects(nodes).to_json       
      }
    end
  end
  
  def construct_column_objects(input_arr)
    
    col_objs = {
            :objects => input_arr,
            :totalCount => input_arr.size} #,
            #:metaData => { :fields => ["EC number", "Enzyme name"], :root => 'objects' },
            #:columns => [{ :xtype => 'treecolumn', :text => 'EC number', :dataIndex => 'ec_number'}, {:text => 'Enzyme name', :dataIndex => 'name'}]}
           
  end
  
  def new
    
  end
  
  def create
    
  end
  
  def show
    
  end

  def edit
    
  end
  
  def update
    
  end
  
end
