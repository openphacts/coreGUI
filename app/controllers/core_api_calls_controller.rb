require 'results_formatter'
class CoreApiCallsController < ApplicationController
  
  def cmpd_name_lookup(substring = params[:query])
      options = Hash.new
      api_method = 'compoundLookup'
      options[:substring] = substring 
      options[:limit] =  params[:limit] || 100
      options[:offset] = params[:offset] || 0
      api_call = CoreApiCall.new
      results = api_call.request( api_method, options)
      render :json => ResultsFormatter.construct_column_objects(results).to_json, :layout => false
  end
  
  def protein_lookup(substring = params[:query])
      options = Hash.new
      api_method = 'proteinLookup'
      options[:substring] = substring 
      options[:limit] =  params[:limit] || 100
      options[:offset] = params[:offset] || 0
      api_call = CoreApiCall.new
      results = api_call.request( api_method, options)
      render :json => ResultsFormatter.construct_column_objects(results).to_json, :layout => false
  end
  
  def compound_info(cmpd_uri = params[:compound_uri])
    options = Hash.new
    api_method = 'compoundInfo'
    options[:uri] = '<' + cmpd_uri + '>'
    options[:limit] =  params[:limit]
    options[:offset] = params[:offset]
    api_call = CoreApiCall.new
    results = api_call.request( api_method, options)
    render :json => ResultsFormatter.construct_column_objects(ResultsFormatter.format_chemspider_results(results)).to_json, :layout => false
  end
  
  def protein_info(prot_uri = params[:protein_uri])
    options = Hash.new
    api_method = 'proteinInfo'
    options[:uri] = '<' + prot_uri + '>' 
    options[:limit] =  params[:limit]
    options[:offset] = params[:offset]
    api_call = CoreApiCall.new
    results = api_call.request( api_method, options)
    render :json => ResultsFormatter.construct_column_objects(results).to_json, :layout => false
  end
  
  
  # Main search for pharmacology by compound name. The input parameter is the cmpd_url returned by cmdp_name_lookup
  def pharm_by_compound_name(cmpd_uri = params[:compound_uri])
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
  
  # Main search for pharmacology by compound name. The input parameter is the cmpd_url returned by cmdp_name_lookup
  def pharm_by_protein_name(prot_uri = params[:protein_uri])
      options = Hash.new
      api_method = 'proteinPharmacology'
      options[:uri] = '<' + prot_uri + '>'
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
 
  # check to see if endpoint is responding
   def check
      api_method = 'sparql'
      options = Hash.new
      options[:query] =  "select * where {?s ?p ?o}"
      options[:limit] =  1
      options[:offset] = 0
      api_call = CoreApiCall.new
      begin
      results = api_call.request( api_method, options)
        if results.nil? then 
          render :json => {:success => false}.to_json, :layout => false     
       elsif results.length >= 1 then
          render :json => {:success => true}.to_json, :layout => false
       end
      rescue 
         render :json => {:success => false}.to_json, :layout => false    
      end 
   end
  
   def sparql(query = params[:query])
      api_method = 'sparql'
      options = Hash.new
      options[:query] =  params[:query]
      options[:limit] =  params[:limit]
      options[:offset] = params[:offset]
      api_call = CoreApiCall.new
      results = api_call.request( api_method, options)
      render :json => ResultsFormatter.construct_column_objects(results).to_json, :layout => false   
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
      pharm_enzyme_query += "?species_code rdfs:label ?species .\n" 
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


  def pmid_lookup(pmid_query = params[:query])
  
      query_str = "PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> \n"
      query_str += "PREFIX pubmed:<http://www.ncbi.nlm.nih.gov/pubmed/> \n"
      query_str += "PREFIX bibo:<http://purl.org/ontology/bibo/>\n"
      query_str += "select ?pmid_uri where {\n"
      query_str += "?pmid_uri rdf:type bibo:Document .\n"
      query_str += "FILTER regex(str(?pmid_uri), \"http://www.ncbi.nlm.nih.gov/pubmed/#{pmid_query}\") } \n"
    
      api_method = 'sparql'
      options = Hash.new
      options[:query] =  query_str
      options[:limit] =  params[:limit]
      options[:offset] = params[:offset]
      api_call = CoreApiCall.new
      results = api_call.request( api_method, options)
      results.each do |record|
      
         if record[:pmid_uri] =~ /pubmed\/(\d+)/ then
           pubmed_id = $1
         else
           pubmed_id = nil
         end
         record[:pmid] = pubmed_id
      end   
      render :json => results.to_json, :layout => false     
  end 


  # Text mining stuff
  def pmid2title(pmid_uri = params[:pubmed_uri])
  
      query_str = "PREFIX dc-term:<http://purl.org/dc/terms/> \n"
      query_str += "PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#> \n"
      query_str += "PREFIX bibo:<http://purl.org/ontology/bibo/> \n"
      query_str += "PREFIX xsd:<http://www.w3.org/2001/XMLSchema#> \n"
      query_str += "SELECT ?title WHERE { \n"
      query_str += "?sentence dc-term:isPartOf <#{pmid_uri}> . \n"
      query_str += "?sentence rdfs:label ?title . \n"
      query_str += "?sentence bibo:number \"0\"^^xsd:integer . \n"
      query_str += " } "

puts query_str    

      api_method = 'sparql'
      options = Hash.new
      options[:query] =  query_str
      options[:limit] =  params[:limit]
      options[:offset] = params[:offset]
      api_call = CoreApiCall.new
      results = api_call.request( api_method, options).first
      render :json => results.to_json, :layout => false     
  end

  def pmid2abstract(pmid_uri = params[:pubmed_uri])
      query_str = "PREFIX dc-term:<http://purl.org/dc/terms/> \n"
      query_str +="PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#> \n"
      query_str +="PREFIX bibo:<http://purl.org/ontology/bibo/> \n"
      query_str +="SELECT ?abstract WHERE { \n"
      query_str +="?sentence dc-term:isPartOf <#{pmid_uri}> . \n"
      query_str +="?sentence rdfs:label ?abstract . \n"
      query_str +="?sentence bibo:number ?sentenceNumber . \n"
      query_str +="FILTER (?sentenceNumber > 0) . \n"
      query_str +=" } ORDER BY ?sentenceNumber \n"
 
      api_method = 'sparql'
      options = Hash.new
      options[:query] =  query_str
      options[:limit] =  params[:limit]
      options[:offset] = params[:offset]
      api_call = CoreApiCall.new
      sentences = api_call.request( api_method, options)
      abstract = Array.new
      sentences.each do |record|
         abstract.push(record[:abstract])
      end
      render :json => {:abstract => abstract.join(" ")}.to_json, :layout => false     
   end

   def pmid2concepts(pmid_uri = params[:pubmed_uri])
      query_str = "PREFIX skos:<http://www.w3.org/2004/02/skos/core#> \n"
      query_str +="PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#> \n"
      query_str +="PREFIX bibo:<http://purl.org/ontology/bibo/>  \n"
      query_str +="PREFIX cwt:<http://conceptwiki.org/index.php/Term:> \n"
      query_str +="PREFIX uima:<http://clerezza.apache.org/2010/22/uima-entities#> \n"
      query_str +="SELECT ?match ?concept_label ?begin ?end ?concept_url  WHERE {  \n"
      query_str +="?hit cwt:occurs_in <#{pmid_uri}> . \n"
      query_str +="?hit rdfs:label ?match .  \n"
      query_str +="?concept_hit bibo:annotates ?hit .  \n"
      query_str +="?concept_hit skos:prefLabel ?concept_label . \n"
      query_str +="?concept_hit skos:exactMatch ?concept_url . \n" 
      query_str +="?hit uima:atPosition ?pos .  \n"
      query_str +="?pos uima:begin ?begin .  \n"
      query_str +="?pos uima:end ?end .  \n"
      query_str +="}"
 
      api_method = 'sparql'
      options = Hash.new
      options[:query] =  query_str
      options[:limit] =  params[:limit]
      options[:offset] = params[:offset]
      api_call = CoreApiCall.new
      hits = api_call.request( api_method, options)
      render :json => ResultsFormatter.construct_column_objects(hits).to_json, :layout => false
   end   

   # WikiPathways related queries
   
   # All compounds in WP   
   def wiki_pathway_compound_lookup(wp_cmpd_query = params[:query])
 
      query_str = "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> \n"
      query_str += "PREFIX biopax: <http://www.biopax.org/release/biopax-level3.owl#> \n"
      query_str += "PREFIX dc: <http://purl.org/dc/terms/> \n"
      query_str += "SELECT DISTINCT ?compound_uri ?compound_name \n"
      query_str += "WHERE { \n"
      query_str += "?compound_uri a biopax:SmallMolecule \n"
      query_str += "; rdfs:label ?compound_name \n"
      query_str += "; dc:isPartOf ?pathway_revision .\n"
      query_str += "?pathway_uri dc:hasVersion ?pathway_revision ;\n"
      query_str += "FILTER (regex(?compound_name, \"#{wp_cmpd_query}\", \"i\")) } \n"
puts query_str    
      api_method = 'sparql'
      options = Hash.new
      options[:query] =  query_str
      options[:limit] =  params[:limit]
      options[:offset] = params[:offset]
      api_call = CoreApiCall.new
      results = api_call.request( api_method, options)
      results.each do |record|
  puts record.inspect  #NB Some compounds to NOT have a real uri! just "http://identifiers.org/#/WikiPathways/Other/" or similar
      end   
      render :json => results.to_json, :layout => false     
  end 

  def wiki_pathways_by_compound(compound_uri = params[:compound_uri])
  
      query_str = "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> \n"
      query_str += "PREFIX biopax: <http://www.biopax.org/release/biopax-level3.owl#> \n"
      query_str += "PREFIX dc: <http://purl.org/dc/terms/>  \n"
      query_str += "select DISTINCT ?compound_name ?pathway_uri ?protein_name ?pathway_description  \n"
      query_str += "where { \n"
      query_str += "<#{compound_uri}> rdfs:label ?compound_name \n"
      query_str += "; dc:isPartOf ?pathway_revision . \n"
      query_str += "?pathway_uri dc:hasVersion ?pathway_revision . \n"
      query_str += "?datanode dc:isPartOf ?pathwayrevision \n"
      query_str += "; a ?protein_name_uri \n"
      query_str += "; rdfs:label ?pathway_description . \n"
      query_str += "?datanote_type_uri rdfs:label ?protein_name} \n"
puts query_str    
      api_method = 'sparql'
      options = Hash.new
      options[:query] =  query_str
      options[:limit] =  params[:limit]
      options[:offset] = params[:offset]
      api_call = CoreApiCall.new
      results = api_call.request( api_method, options)
      
      results.each do |record|
        wp_uri = record[:pathway_uri]
        if wp_uri =~ /\/Pathway\/(WP\d+)\// then
           record[:Pathway_id] = $1
        end  
      end   
      render :json => ResultsFormatter.construct_column_objects(results).to_json, :layout => false       
  end    

end
