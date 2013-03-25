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

    result = jsonObj['result']
    exactMatch = result['primaryTopic']['exactMatch']
    csData = exactMatch[1]
    chemblData = exactMatch[2]
    drugBankData = exactMatch[3]

    b = Hash.new

    b['label'] = result['label']
    b['label_src'] = result[IN_DATASET_PROP]

    b['csid_uri'] = csData[CONCEPT_URI_PROP]
    b['csid_uri_src'] = csData[IN_DATASET_PROP]

    b['inchi'] = csData['inchi']
    b['inchi_src'] = csData[IN_DATASET_PROP]

    b['inchiKey'] = csData['inchiKey']
    b['inchiKey'] = csData[IN_DATASET_PROP]

    b['smiles'] = csData['smiles']
    b['smiles_src'] = csData[IN_DATASET_PROP]

    b['alogp'] = chemblData['alogp']
    b['alogp_src'] = chemblData[IN_DATASET_PROP]

    b['full_mwt'] = chemblData['full_mwt']
    b['full_mwt_src'] = chemblData[IN_DATASET_PROP]

    b['hba'] = chemblData['hba']
    b['hba_src'] = chemblData[IN_DATASET_PROP]

    b['hbd'] = chemblData['hbd']
    b['hbd_src'] = chemblData[IN_DATASET_PROP]

    b['molform']= chemblData['molform']
    b['molform_src'] = chemblData[IN_DATASET_PROP]

    b['mw_freebase'] = chemblData['mw_freebase']
    b['mw_freebase_src'] = chemblData[IN_DATASET_PROP]

    b['psa'] = chemblData['psa']
    b['psa_src'] = chemblData[IN_DATASET_PROP]

    b['rtb'] = chemblData['rtb']
    b['rtb_src'] = chemblData[IN_DATASET_PROP]

    b['biotransformation'] = drugBankData['biotransformation']
    b['biotransformation_src'] = drugBankData[IN_DATASET_PROP]

    b['description'] = drugBankData['description']
    b['description_src'] = drugBankData[IN_DATASET_PROP]

    b['proteinBinding'] = drugBankData['proteinBinding']
    b['proteinBinding_src'] = drugBankData[IN_DATASET_PROP]

    b['toxicity'] = drugBankData['toxicity']
    b['toxicity_src'] = drugBankData[IN_DATASET_PROP]

    resultArray.push(b)

    finalResultHash['objects'] = resultArray

    return finalResultHash
  end

  def self.parse_pharmacology_by_compound_count(response)
    res = Hash.new
    jsonObj = JSON.parse(response)
    res['count'] = jsonObj['result']['primaryTopic']['compoundPharmacologyTotalResults']
    return res
  end

  def self.parse_pharmacology_by_compound(response)
    finalResultHash = Hash.new
    resultArray = Array.new
    jsonObj = JSON.parse(response)

    #drugBankData = jsonObj['result']['primaryTopic']['exactMatch'][0]
    #chemspiderData = jsonObj['result']['primaryTopic']['exactMatch'][1]
    chemblData = jsonObj['result']['primaryTopic']['exactMatch'][2]

    jsonObj['result']['primaryTopic']['exactMatch'][2]['activity'].each { |item|
      b = Hash.new

      b['type'] = item['type']
      b['type_src'] =chemblData[IN_DATASET_PROP]
      b['relation'] = item['relation']
      b['relation_src']=chemblData[IN_DATASET_PROP]
      b['standard_value'] = item['standardValue']
      b['standard_value_src']= chemblData[IN_DATASET_PROP]
      b['standard_units'] = item['standardUnits']
      b['standard_units_src']=chemblData[IN_DATASET_PROP]

      b['compound_uri'] = item['forMolecule']
      b['compound_uri_src'] = chemblData[IN_DATASET_PROP]

      #There is also target full_mwt, prefLabel, inchi, inchiKey, smiles, drugType, genericName
      #but these are in an array called exactMatch which has a loosely defined structure
      if item['onAssay'] != nil
        if item['onAssay']['target'] != nil
          if item['onAssay']['target'].is_a? Array
            b['target_uris'] = item['onAssay']['target'][0]['concatenatedURIs']
            b['target_name'] = item['onAssay']['target'][0]['title']
            b['target_organism'] = item['onAssay']['target'][0]['organism']
          else
            b['target_uri'] = item['onAssay']['target'][CONCEPT_URI_PROP]
            b['target_name'] = item['onAssay']['target']['title']
            b['target_organism'] = item['onAssay']['target']['organism']
          end
        end
      end

      b['target_uris_src'] = chemblData[IN_DATASET_PROP]
      b['target_name_src'] = chemblData[IN_DATASET_PROP]
      b['target_organism_src'] = chemblData[IN_DATASET_PROP]

      if item['onAssay'] != nil
        b['assay_uri'] = item['onAssay'][CONCEPT_URI_PROP]
        b['assay_uri_src'] = chemblData[IN_DATASET_PROP]
      end
      #this is missing
      #b['assay_uri_src'] = item['onAssay'][IN_DATASET_PROP]


      resultArray.push(b)
    }

    finalResultHash['objects'] = resultArray
    return finalResultHash
  end

  def self.parse_target(response)
    finalResultHash = Hash.new
    resultArray = Array.new
    jsonObj = JSON.parse(response)
    puts jsonObj


    resultArray.push(b)
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
end