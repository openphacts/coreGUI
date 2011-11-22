class ConceptWikiApiCallsController < ApplicationController

  def concept_lookup(substring = params[:query])
      options = Hash.new
      options[:limit] =  params[:limit]
      options[:offset] = params[:offset]
      api_call = ConceptWikiApiCall.new
      results = api_call.search_concept(substring, options)
      render :json => results.to_json, :layout => false
  end

  # the different tag uuid semantic types from ConceptWiki are found here https://wiki.openphacts.org/index.php/ConceptWiki_semantic_types
  def compound_lookup(substring = params[:query])
      options = Hash.new
      options[:limit] =  params[:limit]
      options[:offset] = params[:offset]
      api_call = ConceptWikiApiCall.new
      results = api_call.search_by_tag('7efb2a9c-f5e1-44c9-b5d4-3a364ce1bada',substring, options)  # this is the 'Pharmacologic Substance'Amino Acid, Peptide, or Protein' tag
      render :json => results.to_json, :layout => false
  end
  
  def protein_lookup(substring = params[:query])
      options = Hash.new
      options[:limit] =  params[:limit]
      options[:offset] = params[:offset]
      api_call = ConceptWikiApiCall.new
      results = api_call.search_by_tag('047a9f9a-5c5b-461e-a5ae-76ec68afda02',substring, options)  # this is the 'Amino Acid, Peptide, or Protein' tag
      render :json => results.to_json, :layout => false
  end
  
  
end
