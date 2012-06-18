class LinkedDataApiController < ApplicationController


  def compound
    options = Hash.new
    options[:uri] = params['uri']
    req = LinkedDataAPICall.new('compound')
    results = req.request_compound(options)
  end

  def target

  end

  def compound_pharmacology_paginated
    options = Hash.new
    options[:uri] = params['uri']
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

  end

end
