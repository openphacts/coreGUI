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

# Our controller that both creates the SPARQL and formats the result as it comes back
class SparqlEndpointController < ApplicationController

  def index
    puts "index"
  end

  def query
     query_str = params[:query]
     puts query_str
     @endpoint = SparqlEndpoint.new(session[:endpoint])             
     results = @endpoint.find_by_sparql(query_str)
     render :json => construct_column_objects(results).to_json, :layout => false
  end
 
   # This function sould return compound name and target url as cmpd_name and cmdpurl, e.i. call query variables ?cmpd_name and ?cmpdurl 
  def cmpd_name_lookup(name_lookup = params[:query])
      query_str = "PREFIX brenda: <http://brenda-enzymes.info/>\n"
      query_str += "PREFIX pdsp: <http://wiki.openphacts.org/index.php/PDSP_DB#>\n"
      query_str += "PREFIX cspr: <http://rdf.chemspider.com/#>\n"   
      query_str += "SELECT DISTINCT ?cmpd_name ?cmpdurl WHERE {\n"
      query_str += "{ ?cmpdurl brenda:has_inhibitor ?cmpd_name } UNION { ?cmpdurl pdsp:has_test_ligand_name ?cmpd_name } UNION {?csid cspr:exturl ?cmpdurl . \n"
      query_str += "?csid cspr:synonym ?cmpd_name}. \n" 
      query_str += "FILTER regex(?cmpd_name, \"#{name_lookup}\", \"i\") }\n"
      query_str += "Limit 100"
 
      @endpoint = SparqlEndpoint.new(session[:endpoint])             
      results = @endpoint.find_by_sparql(query_str)
      render :json => construct_column_objects(results).to_json, :layout => false
  end
                      
  # This function sould return target name and target url as target_name and targeturl, e.i. call query variables ?target_name and ?targeturl 
  def target_name_lookup(name_lookup = params[:query])
      query_str = "PREFIX brenda: <http://brenda-enzymes.info/>\n"
      query_str += "PREFIX pdsp: <http://wiki.openphacts.org/index.php/PDSP_DB#> \n"
      query_str += "SELECT DISTINCT ?target_name ?targeturl WHERE {{{ ?targeturl brenda:recommended_name ?target_name } UNION { ?targeturl pdsp:has_receptor_name ?target_name } }\n"
      query_str += "FILTER regex(?target_name, \"#{name_lookup}\", \"i\") }\n"
      query_str += "Limit 100"
 
      @endpoint = SparqlEndpoint.new(session[:endpoint])             
      results = @endpoint.find_by_sparql(query_str)
      render :json => construct_column_objects(results).to_json, :layout => false
  end


  # This function is for looking up concepts and getting predicates and objects. Not relevant for lashup demo....
  def concept_name_lookup(url_lookup = params[:query])
      query_str = "SELECT ?concept ?object WHERE {\n"
      query_str += "?concept ?predicate ?object  \n"
   #   query_str += "OPTIONAL {?concept <http://www.w3.org/2000/01/rdf-schema#label> ?label } .\n"   # currently no label in ldc!!!
   #   query_str += "OPTIONAL {?concept ?predicate ?label } .\n"
      query_str += "FILTER regex(?object, \"#{url_lookup}\", \"i\")}\n"
   #   query_str += "FILTER regex(?object, \"#{url_lookup}\", \"i\")}\n"
      query_str += "Limit 50"
 
      @endpoint = SparqlEndpoint.new(session[:endpoint])             
      results = @endpoint.find_by_sparql(query_str)
      render :json => construct_column_objects(results).to_json, :layout => false
  end

  
  # here we get the cmpdurl from the cmpd_name_lookup and do a query to get smiles, name, chemspider id, inchi, inchikey for the compound/small molecule
  # NB see function "format_chemspider_results" below for formatting for Chemsider ID to structure image and hyperlink. 
  # For this special formating to work the chemcallout subject variable must be called ?csid_uri and the returned identifier must contain the substring "Chemical-Structure"
  # If the Chemcallout return value is changes the to return a different string the "format_chemspider_results" function must also be changed accordingly! 
  def cmpd_by_name(cmpd_url = params[:cmpd_uuid])
    if "#{cmpd_url}".index("brenda") then
        query_str = "PREFIX brenda: <http://brenda-enzymes.info/> \n"
        query_str += "PREFIX pdsp: <http://wiki.openphacts.org/index.php/PDSP_DB#>\n"
        query_str += "PREFIX cspr: <http://rdf.chemspider.com/#> \n"
        query_str += "SELECT DISTINCT ?compound_name ?ic50 ?species WHERE { { \n"
        query_str += "<#{cmpd_url}> brenda:has_inhibitor ?compound_name . ?cmpd_url brenda:has_inhibitor ?compound_name"
        query_str += "; brenda:has_ic50_value_of ?ic50 ; brenda:species ?species_uri . ?species_uri <http://w3.org/2000/01/rdf-schema#label> ?species }}"
    else
    	query_str = "PREFIX brenda: <http://brenda-enzymes.info/> \n"
    	query_str += "PREFIX pdsp: <http://wiki.openphacts.org/index.php/PDSP_DB#>\n"
    	query_str += "PREFIX cspr: <http://rdf.chemspider.com/#> \n"
    	query_str += "SELECT DISTINCT ?compound_name ?csid ?csid_uri ?compound_inchi ?compound_inchi_key ?compound_smiles ?compound_synonym WHERE {  \n"
    	query_str += "<#{cmpd_url}> pdsp:has_test_ligand_name ?compound_name . ?cmpd_url pdsp:has_test_ligand_name ?compound_name . \n"
    	query_str += "?csid_uri cspr:exturl ?cmpd_url . ?csid_uri cspr:csid ?csid ;"
    	query_str += "cspr:inchi ?compound_inchi ; cspr:inchikey ?compound_inchi_key ; cspr:synonym ?compound_synonym ; "
    	query_str += "cspr:smiles ?compound_smiles } "
    end
    @endpoint = SparqlEndpoint.new(session[:endpoint])             
    results = @endpoint.find_by_sparql(query_str)
    render :json => construct_column_objects(format_chemspider_results(results)).to_json, :layout => false
  end
  
  
  # Same as above but for target. 
  def target_by_name(target_url = params[:target_uuid],  target_name = params[:target_name])
    if "#{target_url}".index("brenda") then
  	  query_str = "PREFIX brenda: <http://brenda-enzymes.info/> \n"
 	   query_str += "PREFIX pdsp: <http://wiki.openphacts.org/index.php/PDSP_DB#>\n"
 	   query_str += "PREFIX cspr: <http://rdf.chemspider.com/#> \n"
 	   query_str += "SELECT * WHERE { <#{target_url}> brenda:recommended_name ?target_name . ?target_url brenda:recommended_name ?target_name .  "
 	   query_str += "?target_url brenda:systematic_name ?systematic_name ; brenda:cas_registry_number ?cas_no ; brenda:species ?species_uri ; brenda:has_ec_number ?uniprot_id . ?species_uri <http://w3.org/2000/01/rdf-schema#label> ?species } LIMIT 100"
    	@endpoint = SparqlEndpoint.new(session[:endpoint])
    	results = @endpoint.find_by_sparql(query_str)
    	render :json => construct_column_objects(format_chemspider_results(results)).to_json, :layout => false
    else
	query_str = "PREFIX brenda: <http://brenda-enzymes.info/> \n"
           query_str += "PREFIX pdsp: <http://wiki.openphacts.org/index.php/PDSP_DB#>\n"
           query_str += "PREFIX cspr: <http://rdf.chemspider.com/#> \n"
           query_str += "SELECT * WHERE {  "
           query_str += "<#{target_url}> pdsp:has_receptor_name ?target_name  . "
	   query_str += "?target_url pdsp:has_receptor_name ?target_name . "
           query_str += "OPTIONAL {?target_url pdsp:has_unigene_id ?unigene_id ; pdsp:has_nsc_number ?nsc} . OPTIONAL { ?target_url  pdsp:has_smiles_code ?smiles } ?target_url  pdsp:pubmed_id ?pubmed_id } limit 100"
        @endpoint = SparqlEndpoint.new(session[:endpoint])
        results = @endpoint.find_by_sparql(query_str)
        render :json => construct_column_objects(format_pubmed_id(results)).to_json, :layout => false
	# render :json => construct_column_objects(format_chemspider_results(results)).to_json, :layout => false
    end 

# For Brenda this looks like:
# SELECT * WHERE {?s  <http://brenda-enzymes.info/recommended_name> ?recomended_name .
# OPTIONAL { ?s <http://brenda-enzymes.info/systematic_name> ?sys } .
# OPTIONAL {?s <http://brenda-enzymes.info/has_ec_number> ?ec_number } .
# OPTIONAL {?s <http://brenda-enzymes.info/cas_registry_number> ?cas_number } .
# }
# Must also cover PDSP too!

  end 
  
  # Results for form for answering question 15 like question.
#  def pharm_enzyme_fam  
 #    species = [params[:species_1],params[:species_2],params[:species_3],params[:species_4]]
  #    species.compact!
   #   pharm_enzyme_query = "PREFIX brenda: <http://brenda-enzymes.info/>\n" 
   #   pharm_enzyme_query +=  "PREFIX uniprot: <http://purl.uniprot.org/enzymes/>\n" 
    #  pharm_enzyme_query += "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n" 
    #  pharm_enzyme_query += "select  ?ic50 ?inhibitor ?species ?target_name ?enzyme_class_name where {\n"
    #  pharm_enzyme_query += "?ic50experiment brenda:has_ic50_value_of ?ic50 .\n"
    #  pharm_enzyme_query += "OPTIONAL { ?brenda_entry brenda:recommended_name ?target_name } .\n"
    #  pharm_enzyme_query += "OPTIONAL {?uniprot_entry <http://purl.uniprot.org/core/name> ?enzyme_class_name} .\n"
     # 
     # if not params[:min_filter] == "" and not params[:max_filter] == "" then  
     #   pharm_enzyme_query += "filter(?ic50 > #{params[:min_filter]} && ?ic50 < #{params[:max_filter]}) .\n" 
     # elsif not params[:min_filter] == "" and params[:max_filter] == "" then  
     #   pharm_enzyme_query += "filter(?ic50 > #{params[:min_filter]}) .\n"
     # elsif params[:min_filter] == "" and not params[:max_filter] == "" then
     #   pharm_enzyme_query += "filter(?ic50 < #{params[:max_filter]}) .\n" 
     # end
     # pharm_enzyme_query += "?ic50experiment brenda:has_inhibitor ?inhibitor .\n" 
      #pharm_enzyme_query += "?ic50experiment brenda:species ?species_code .\n"
      #pharm_enzyme_query += "?species_code <http://w3.org/2000/01/rdf-schema#label> ?species .\n" 
      #if species.length >= 1 then
      #  pharm_enzyme_query += "filter(?species = \"#{species.join('" || ?species = "')}\") .\n"
      #end
      #pharm_enzyme_query += "?brenda_entry brenda:is_inhibited_by ?ic50experiment .\n" 
     # #pharm_enzyme_query += "?brenda_entry brenda:has_ec_number ?uniprot_entry_url .\n" 
      #pharm_enzyme_query += "?uniprot_entry_url rdfs:subClassOf ?uniprot_top_level_entry .\n"
     # pharm_enzyme_query += "?uniprot_top_level_entry <http://purl.uniprot.org/core/name> \"#{params[:enz_name]}\"}" 
                          
    # @endpoint = SparqlEndpoint.new(session[:endpoint]) 
    # results = @endpoint.find_by_sparql(pharm_enzyme_query)
    # render :json => construct_column_objects(format_chemspider_results(results)).to_json, :layout => false  
 # end
  
  def pharm_enzyme_fam  
     species = [params[:species_1],params[:species_2],params[:species_3]]
      species.compact!
      pharm_enzyme_query = "PREFIX brenda: <http://brenda-enzymes.info/>\n" 
      pharm_enzyme_query +=  "PREFIX uniprot: <http://purl.uniprot.org/enzymes/>\n" 
      pharm_enzyme_query += "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n" 
      pharm_enzyme_query += "select  ?ic50_milli_molar?inhibitor ?species ?target_name ?enzyme_class_name where {\n"
      pharm_enzyme_query += "?ic50experiment brenda:has_ic50_value_of ?ic50_milli_molar.\n"
      if not params[:min_filter] == "" and not params[:max_filter] == "" then  
        pharm_enzyme_query += "filter(?ic50_milli_molar> #{params[:min_filter]} && ?ic50_milli_molar< #{params[:max_filter]}) .\n" 
      elsif not params[:min_filter] == "" and params[:max_filter] == "" then  
        pharm_enzyme_query += "filter(?ic50_milli_molar> #{params[:min_filter]}) .\n"
      elsif params[:min_filter] == "" and not params[:max_filter] == "" then
        pharm_enzyme_query += "filter(?ic50_milli_molar< #{params[:max_filter]}) .\n" 
      end
      pharm_enzyme_query += "?ic50experiment brenda:has_inhibitor ?inhibitor .\n" 
      pharm_enzyme_query += "?ic50experiment brenda:species ?species_code .\n"
      pharm_enzyme_query += "?species_code <http://w3.org/2000/01/rdf-schema#label> ?species .\n" 
      if species.length >= 1 then
        pharm_enzyme_query += "filter(?species = \"#{species.join('" || ?species = "')}\") .\n"
      end
      pharm_enzyme_query += "?brenda_entry brenda:is_inhibited_by ?ic50experiment .\n" 
      pharm_enzyme_query += "?brenda_entry brenda:has_ec_number ?uniprot_entry_url .\n" 
      pharm_enzyme_query += "?uniprot_entry_url rdfs:subClassOf ?uniprot_top_level_entry .\n"
      pharm_enzyme_query += "?uniprot_top_level_entry <http://purl.uniprot.org/core/name> \"#{params[:enz_name]}\" .\n" 
      pharm_enzyme_query += "?brenda_entry brenda:recommended_name ?target_name .\n"
      pharm_enzyme_query += "?uniprot_entry_url <http://purl.uniprot.org/core/name> ?enzyme_class_name }\n"
      pharm_enzyme_query += "LIMIT 1000"                    

     @endpoint = SparqlEndpoint.new(session[:endpoint]) 
     results = @endpoint.find_by_sparql(pharm_enzyme_query)
     render :json => construct_column_objects(format_chemspider_results(results)).to_json, :layout => false  
  end

  # Main search for pharmacology by compound name. The input parameter is the cmpd_url returned by cmdp_name_lookup
  def pharm_by_cmpd_name(cmpd_url = params[:cmpd_uuid], cmpd_name = params[:cmpd_name])
     if "#{cmpd_url}".index("brenda") then
             query_str = "PREFIX brenda: <http://brenda-enzymes.info/> \n"
             query_str += "SELECT * WHERE { <#{cmpd_url}> brenda:has_inhibitor ?compound_name . ?compound_uri brenda:has_inhibitor ?compound_name; "
	     query_str += " brenda:has_ic50_value_of ?ic50 ; brenda:species ?species_uri . ?species_uri <http://w3.org/2000/01/rdf-schema#label> ?species }"
     else
             query_str = 'PREFIX pdsp: <http://wiki.openphacts.org/index.php/PDSP_DB#>'
             query_str += "SELECT * WHERE { <#{cmpd_url}> pdsp:has_test_ligand_name ?compound_name . ?cmpd_url pdsp:has_test_ligand_name ?compound_name  ;  pdsp:has_receptor_name ?target_name; pdsp:species ?species_code ; "
             query_str += 'pdsp:pubmed_id ?pubmed_id ; pdsp:has_ki_value ?ki_entry . ?ki_entry <http://www.w3.org/1999/02/22-rdf-syntax-ns#value> ?ki_value ; pdsp:unit ?ki_unit} limit 100'
     end
 
     @endpoint = SparqlEndpoint.new(session[:endpoint]) 
     results = @endpoint.find_by_sparql(query_str)
     render :json => construct_column_objects(format_chemspider_results(format_pubmed_id(results))).to_json, :layout => false  
  end
  
  # Main search for pharmacology by target name. The input parameter is the target_url returned by target_name_lookup
  # NB: the SPARQL query can for now be identical to the one for pharm_by_cmpd_name as both the url for Brenda and PDSP are both the experiment url and not target or compound classes as such
  def pharm_by_target_name(target_url = params[:target_uuid], target_name = params[:target_name])
     if "#{target_url}".index("brenda") then
	     query_str = "PREFIX brenda: <http://brenda-enzymes.info/> \n"
             query_str += "SELECT * WHERE { <#{target_url}> brenda:recommended_name ?target_name . ?target_uri brenda:recommended_name ?target_name; brenda:has_ec_number ?ec_no ;"
             query_str += " brenda:is_inhibited_by ?ic50experiment . ?ic50experiment brenda:has_inhibitor ?inhibitor ; brenda:has_ic50_value_of ?ic50_milli_molar ; brenda:species ?species_code . ?species_code <http://w3.org/2000/01/rdf-schema#label> ?species } limit 100"
     else
	     query_str = 'PREFIX pdsp: <http://wiki.openphacts.org/index.php/PDSP_DB#>'
	     query_str += "SELECT * WHERE {?target_uri pdsp:has_receptor_name \"#{target_url}\"  ;  pdsp:species ?species_code ;  pdsp:has_test_ligand_name ?inhibitor ; "
             query_str += 'OPTIONAL {?target_uri pdsp:pubmed_id ?pubmed_id ; pdsp:has_ki_value ?ki_entry . ?ki_entry <http://www.w3.org/1999/02/22-rdf-syntax-ns#value> ?ki_value ; pdsp:unit ?ki_unit}} limit 100'
     end      
     @endpoint = SparqlEndpoint.new(session[:endpoint]) 
     results = @endpoint.find_by_sparql(query_str)
     render :json => construct_column_objects(format_chemspider_results(format_pubmed_id(results))).to_json, :layout => false  
  end
  
  # Currently not in use...
  def similar2smiles(smiles = params[:smiles])
     @endpoint = SparqlEndpoint.new(session[:endpoint]) 
     sim2smiles_query = 'SELECT * WHERE { ?csid_uri <http://wiki.openphacts.org/index.php/ext_function#has_similar> "' + smiles + '"}'
     results = @endpoint.find_by_sparql(sim2smiles_query)
     render :json => construct_column_objects(format_chemspider_results(format_pubmed_id(results))).to_json, :layout => false
  end
  
  # Query for the substructure/exact and similarity search by smiles string from the drawn structure
  # search_types: 1 = exact match, 2 = substructure search, 3 = similarity search
  def search_by_smiles(smiles = params[:smiles], search_type = params[:search_type].to_i)  
     endpoint = SparqlEndpoint.new(session[:endpoint]) 
     ss_query = 'PREFIX cspr: <http://rdf.chemspider.com/#> PREFIX pdsp: <http://wiki.openphacts.org/index.php/PDSP_DB#>'
     if search_type == 1 then
        ss_query += 'SELECT * WHERE {{ ?csid_uri <http://wiki.openphacts.org/index.php/ext_function#has_exact_structure_match> "' + smiles + '"} . '
     elsif search_type == 2 then
        ss_query += 'SELECT * WHERE {{ ?csid_uri <http://wiki.openphacts.org/index.php/ext_function#has_substructure_match> "' + smiles + '"} . '
     elsif search_type == 3 then
        ss_query += 'SELECT * WHERE {{ ?csid_uri <http://wiki.openphacts.org/index.php/ext_function#has_similar> "' + smiles + '"} . '
     end
	ss_query += 'OPTIONAL { ?csid_uri cspr:inchi ?compound_inchi ; cspr:inchikey ?compound_inchi_key; cspr:synonym ?compound_name ; cspr:smiles ?compound_smiles ; '
	ss_query += ' cspr:exturl ?exturl . ?exturl pdsp:has_receptor_name ?receptor_name ; pdsp:has_test_ligand_id ?test_ligand_id ; pdsp:has_test_ligand_name ?test_ligand_name;'
        ss_query += ' pdsp:has_cas_num ?cas_no ; pdsp:has_unigene_id ?unigene_id ; pdsp:ligand_displaced ?ligand_displaced ; pdsp:species ?species ; pdsp:source ?source ; pdsp:has_ki_value ?ki_entry . '
        ss_query += ' ?ki_entry pdsp:unit ?ki_unit ; <http://www.w3.org/1999/02/22-rdf-syntax-ns#value> ?ki_value}} limit 100'
     results = endpoint.find_by_sparql(ss_query)
     render :json => construct_column_objects(format_chemspider_results(results)).to_json, :layout => false
   end
 
  def concept_object_summery(concept_url = params[:concept_uuid])
     puts concept_url
     concept_object_query = "SELECT ?property_type ?property_value WHERE { <#{concept_url}> ?property_type ?property_value}"
     endpoint = SparqlEndpoint.new(session[:endpoint]) 
     results = endpoint.find_by_sparql(concept_object_query)
     render :json => construct_column_objects(results).to_json, :layout => false
  end
 
   def concept_subject_summery(concept_url = params[:concept_uuid])
     puts concept_url
     concept_subject_query = "SELECT ?related_resource ?relation WHERE { ?related_resource ?relation <#{concept_url}>}"  # Add obtion line with entity_label
     endpoint = SparqlEndpoint.new(session[:endpoint]) 
     results = endpoint.find_by_sparql(concept_subject_query)
     render :json => construct_column_objects(results).to_json, :layout => false
  end
 
  # This formatting function manipulates the resultset based on query variable name "csid_uri" which is tested for a substring match with "Chemical-Structure"
  # from where the CSID is grapped and used to construct columns for displaying the picture and the csid hyperlink to the Chemspider page. 
  def format_chemspider_results(input_arr)
    if input_arr.length >= 1 and input_arr.first.has_key?(:csid_uri) then
      output_arr = Array.new
      input_arr.each do |record|
         uri = record[:csid_uri]
         csid = record[:csid]
         cs_image = nil
         if uri =~ /http:\/\/rdf.chemspider.com\/(\d+)/ then
           csid = $1
           cs_image = '<img src="http://www.chemspider.com/ImagesHandler.ashx?id=' + csid + '&w=200&h=160" alt="CSID:' + csid + '"/>'
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
  def format_pubmed_id(input_arr)
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
  def construct_column_objects(input_arr)

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
  
  # This is where we store the endpoint url
  def settings
     endpoint = params[:endpoint]  
     session[:endpoint] = endpoint
     settings_arr = Array.new
     fields = Array.new
     endpoint = session[:endpoint]
     if endpoint.nil? then
        endpoint = "Not yet configured!"
     end
     settings_arr.push({:endpoint => endpoint})
     fields.push('endpoint') 
     settings_objs = {
            :success => true,
            :objects => settings_arr,
            :metaData => { :fields => fields, :root => 'objects' }}
     
     render :json => settings_objs.to_json, :layout => false  
  end
    
end
