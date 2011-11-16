require 'results_formatter'
class CoreApiCallsController < ApplicationController

  
  def cmpd_name_lookup(substring = params[:query])
      options = Hash.new
      api_method = 'compoundLookup'
      options[:substring] = substring 
      options[:limit] =  params[:limit]
      options[:offset] = params[:offset]
      api_call = CoreApiCall.new
      results = api_call.request( api_method, options)
      render :json => ResultsFormatter.construct_column_objects(results).to_json, :layout => false
  end
  
  # Main search for pharmacology by compound name. The input parameter is the cmpd_url returned by cmdp_name_lookup
  def pharm_by_cmpd_name(cmpd_uri = params[:cmpd_uuid], cmpd_name = params[:cmpd_name])
      options = Hash.new
      api_method = 'compoundPharmacology'
      options[:uri] = '<' + cmpd_uri + '>'
      options[:limit] =  params[:limit]
      options[:offset] = params[:offset]
      api_call = CoreApiCall.new
      results = api_call.request( api_method, options)
      if results.nil? then "Then what?" end
      render :json => ResultsFormatter.construct_column_objects(ResultsFormatter.format_chemspider_results(ResultsFormatter.format_pubmed_id(results))).to_json, :layout => false    
  end
  
  # Query for the substructure/exact and similarity search by smiles string from the drawn structure
  # search_types: 1 = exact match, 2 = substructure search, 3 = similarity search
  def search_by_smiles(smiles = params[:smiles], search_type = params[:search_type].to_i)  
     if search_type == 1 then
      api_method = 'chemicalExactStructureSearch'
     elsif search_type == 2 then
      api_method = 'chemicalSubstructureSearch'
     elsif search_type == 3 then
      api_method = 'chemicalSimilaritySearch'
     end
      options = Hash.new
      options[:smiles] = smiles
      options[:limit] =  params[:limit]
      options[:offset] = params[:offset]
      api_call = CoreApiCall.new
      results = api_call.request( api_method, options)
      if results.nil? then "Then what? Error handling" end
      render :json => ResultsFormatter.construct_column_objects(ResultsFormatter.format_chemspider_results(results)).to_json, :layout => false    
   end
 
  
  
  
  # Temporary methods implemented via SPARQL
  
  ##
  # Custom method for question 15 type query
  # @param  [Hash{Symbol => Object}] options these are :max_filter, min_filter, enz_name, [species_1, species_2, species_3]
  # @return [JSON] render results as JSON
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
      pharm_enzyme_query += "?uniprot_entry_url <http://purl.uniprot.org/core/name> ?enzyme_class_name }"

      api_method = 'sparql'
      options = Hash.new
      options[:query] =  pharm_enzyme_query
      options[:limit] =  params[:limit]
      options[:offset] = params[:offset]
      api_call = CoreApiCall.new
      results = api_call.request( api_method, options)
      render :json => ResultsFormatter.construct_column_objects(ResultsFormatter.format_chemspider_results(results)).to_json, :layout => false     
  end 


end
