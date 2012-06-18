class LinkedDataAPIResponseParser
  # To change this template use File | Settings | File Templates.
  RESULT_JSON = 'application/json'.freeze
  IN_DATASET_PROP = "inDataset"
  CONCEPT_URI_PROP= "_about"

  # Methods below lifted from sparql-client.rb by Arto Bendiken, Ben Lavender and others
  # @see http://sparql.rubyforge.org/client/

  ##
  # @param  [Net::HTTPSuccess] response
  # @param  [Hash{Symbol => Object}] options
  # @return [Object]
  #def self.parse_response(response, options = {})
  #  case content_type = options[:content_type] || response.content_type
  #    when RESULT_JSON
  #      self.parse_paginated_pharmacology_by_compound(response.body)
  #  end
  #end

  def self.parse_compound(response)
    finalResultHash = Hash.new
    jsonObj = JSON.parse(response)

    resultArray = Array.new




    finalResultHash['ops_records'] = resultArray

    return finalResultHash
  end

  def self.parse_pharmacology_by_compound(response)
      finalResultHash = Hash.new
      resultArray = Array.new
      jsonObj = JSON.parse(response)
      jsonObj['result']['items'].each { |item|
        b = Hash.new

        b['type'] = item['type']
        b['type_src'] =item[IN_DATASET_PROP]
        b['relation'] = item['relation']
        b['relation_src']=item[IN_DATASET_PROP]
        b['standard_value'] = item['standardValue']
        b['standard_value_src']= item[IN_DATASET_PROP]
        b['standard_units'] = item['standardUnits']
        b['standard_units_src']=item[IN_DATASET_PROP]

        b['compound_uri'] = item['forMolecule'][CONCEPT_URI_PROP]
        b['compound_uri_src'] = item['forMolecule'][IN_DATASET_PROP]

        #There is also target full_mwt, prefLabel, inchi, inchiKey, smiles, drugType, genericName
        #but these are in an array called exactMatch which has a loosely defined structure
        if item['onAssay']['target'].is_a? Array
          b['target_uris'] = item['onAssay']['target'][0]['concatenatedURIs']
          b['target_name'] = item['onAssay']['target'][0]['title']
          b['target_organism'] = item['onAssay']['target'][0]['organism']
        else
          b['target_uris'] = item['onAssay']['target']['concatenatedURIs']
          b['target_name'] = item['onAssay']['target']['title']
          b['target_organism'] = item['onAssay']['target']['organism']
        end
        b['target_uris_src'] = item['onAssay'][IN_DATASET_PROP]
        b['target_name_src'] = item['onAssay'][IN_DATASET_PROP]
        b['target_organism_src'] = item['onAssay'][IN_DATASET_PROP]

        b['assay_uri'] = item['onAssay'][CONCEPT_URI_PROP]
        b['assay_uri_src'] = item['onAssay'][IN_DATASET_PROP]


        resultArray.push(b)
      }

      finalResultHash['objects'] = resultArray
      return finalResultHash
    end

  def self.parse_paginated_pharmacology_by_compound(response)
    finalResultHash = Hash.new
    resultArray = Array.new
    jsonObj = JSON.parse(response)
    jsonObj['result']['items'].each { |item|
      b = Hash.new

      b['type'] = item['type']
      b['type_src'] =item[IN_DATASET_PROP]
      b['relation'] = item['relation']
      b['relation_src']=item[IN_DATASET_PROP]
      b['standard_value'] = item['standardValue']
      b['standard_value_src']= item[IN_DATASET_PROP]
      b['standard_units'] = item['standardUnits']
      b['standard_units_src']=item[IN_DATASET_PROP]

      b['compound_uri'] = item['forMolecule'][CONCEPT_URI_PROP]
      b['compound_uri_src'] = item['forMolecule'][IN_DATASET_PROP]

      #There is also target full_mwt, prefLabel, inchi, inchiKey, smiles, drugType, genericName
      #but these are in an array called exactMatch which has a loosely defined structure
      if item['onAssay']['target'].is_a? Array
        b['target_uris'] = item['onAssay']['target'][0]['concatenatedURIs']
        b['target_name'] = item['onAssay']['target'][0]['title']
        b['target_organism'] = item['onAssay']['target'][0]['organism']
      else
        b['target_uris'] = item['onAssay']['target']['concatenatedURIs']
        b['target_name'] = item['onAssay']['target']['title']
        b['target_organism'] = item['onAssay']['target']['organism']
      end
      b['target_uris_src'] = item['onAssay'][IN_DATASET_PROP]
      b['target_name_src'] = item['onAssay'][IN_DATASET_PROP]
      b['target_organism_src'] = item['onAssay'][IN_DATASET_PROP]

      b['assay_uri'] = item['onAssay'][CONCEPT_URI_PROP]
      b['assay_uri_src'] = item['onAssay'][IN_DATASET_PROP]


      resultArray.push(b)
    }

    finalResultHash['objects'] = resultArray
    return finalResultHash
  end

  ##
  # @param  [Hash{String => String}] value
  # @return [RDF::Value]
  # @see    http://www.w3.org/TR/rdf-sparql-json-res/#variable-binding-results
  def self.parse_json_value(value, nodes = {})
    case value['type'].to_sym
      when :bnode
        nodes[id = value['value']] ||= RDF::Node.new(id)
      when :uri
        RDF::URI.new(value['value'])
      when :literal
        RDF::Literal.new(value['value'], :language => value['xml:lang'])
      when :'typed-literal'
        RDF::Literal.new(value['value'], :datatype => value['datatype'])
      else
        nil
    end
  end

  ##
  # @param  [String, REXML::Element] xml
  # @return [Enumerable<RDF::Query::Solution>]
  # @see    http://www.w3.org/TR/rdf-sparql-json-res/#results
  def self.parse_xml_bindings(xml, nodes = {})
    xml.force_encoding(::Encoding::UTF_8) if xml.respond_to?(:force_encoding)
    require 'rexml/document' unless defined?(::REXML::Document)
    xml = REXML::Document.new(xml).root unless xml.is_a?(REXML::Element)

    case
      when boolean = xml.elements['boolean']
        boolean.text == 'true'
      when results = xml.elements['results']
        results.elements.map do |result|
          row = {}
          result.elements.each do |binding|
            name = binding.attributes['name'].to_sym
            value = binding.select { |node| node.kind_of?(::REXML::Element) }.first
            row[name] = parse_xml_value(value, nodes)
          end
          RDF::Query::Solution.new(row)
        end
    end
  end

  ##
  # @param  [REXML::Element] value
  # @return [RDF::Value]
  # @see    http://www.w3.org/TR/rdf-sparql-json-res/#variable-binding-results
  def self.parse_xml_value(value, nodes = {})
    case value.name.to_sym
      when :bnode
        nodes[id = value.text] ||= RDF::Node.new(id)
      when :uri
        RDF::URI.new(value.text)
      when :literal
        RDF::Literal.new(value.text, {
            :language => value.attributes['xml:lang'],
            :datatype => value.attributes['datatype'],
        })
      else
        nil
    end
  end

  ##
  # @param  [Net::HTTPSuccess] response
  # @param  [Hash{Symbol => Object}] options
  # @return [RDF::Enumerable]
  def parse_rdf_serialization(response, options = {})
    options = {:content_type => response.content_type} if options.empty?
    if reader = RDF::Reader.for(options)
      reader.new(response.body)
    end
  end

  ##
  # A mapping of blank node results for this client
  # @private
  def self.nodes
    @nodes ||= {}
  end
end