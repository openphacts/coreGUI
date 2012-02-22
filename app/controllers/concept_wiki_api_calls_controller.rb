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
      results = api_call.search_by_tag('07a84994-e464-4bbf-812a-a4b96fa3d197',substring, options)  # this is the 'Pharmacologic Substance'Amino Acid, Peptide, or Protein' tag
      render :json => results.to_json, :layout => false
  end
  
  def protein_lookup(substring = params[:query])
      options = Hash.new
      options[:limit] =  params[:limit]
      options[:offset] = params[:offset]
      api_call = ConceptWikiApiCall.new
      results = api_call.search_by_tag('eeaec894-d856-4106-9fa1-662b1dc6c6f1',substring, options)  # this is the 'Amino Acid, Peptide, or Protein' tag
      render :json => results.to_json, :layout => false
  end
  
  def non_species_specific_lookup(substring = params[:query])
      options = Hash.new
      options[:limit] =  params[:limit]
      options[:offset] = params[:offset]
      api_call = ConceptWikiApiCall.new
      results = api_call.search_by_tag('504ea493-f757-4921-b699-3843fcacae1d',substring, options)  # this is the 'Amino Acid, Peptide, or Protein' tag
      render :json => results.to_json, :layout => false
  end
  
  
end
