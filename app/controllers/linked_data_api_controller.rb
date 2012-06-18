class LinkedDataApiController < ApplicationController


  def compound
    options = Hash.new
    options[:uri] = params['uri']
    req = LinkedDataAPICall.new('compound')
    results = req.request_compound(options)
    render :json => results
  end

  def target
    #doesnt work yet
    #options = Hash.new
    #options[:uri] = params['uri']
    #req = LinkedDataAPICall.new('target')
    #results = req.request_target(options)
    #render :json => results
  end

  def compound_pharmacology_paginated
    options = Hash.new
    options[:uri] = params['uri']
    options[:_page] = params['_page']
    req = LinkedDataAPICall.new('compound/pharmacology/pages')
    results = req.request_compound_pharmacology_paginated(options)
    render :json => results
  end

  def compound_pharmacology
    options = Hash.new
    options[:uri] = params['uri']
    req = LinkedDataAPICall.new('compound/pharmacology')
    results = req.request_compound_pharmacology(options)
    render :json => results
  end

  def target_pharmacology
    #doesnt work yet
  end

  def compound_pharmacology_count
    options = Hash.new
    options[:uri] = params['uri']
    req = LinkedDataAPICall.new('compound/pharmacology/count')
    results = req.request_compound_pharmacology_count(options)
    render :json => results
  end

end
