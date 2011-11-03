class LarkcWorkflow
  require 'net/http'
  require 'uri'
  LARKC_WORKFLOW_PORT = "http://localhost:8182/rdf/workflows"
  ENDPOINT_ID = "urn:eu.larkc.endpoint.sparql.ep1"
  RETRIEVE_PORT = "http://localhost:8182/rdf/workflows/hexcode/endpoint?urn=urn:eu.larkc.endpoint.sparql.ep1" 

  def initialize(larkc_url = LARKC_WORKFLOW_PORT)
     @larkc = URI.parse(larkc_url)
     @response = nil
     @hex_code = nil
     @endpoint = nil
  end
  
  def post_workflow(workflow)
    # if workflow is as file we read the file
    if workflow =~ /\.ttl/ then
       file_name = workflow
       if File.exist?(file_name) then
          f = File.open(file_name, 'r')
          workflow_str = f.read
          f.close
       else 
        raise "No such .ttl-file to read!"
       end 
     else
        workflow_str = workflow
    end  
    @responce = Net::HTTP.post_form(@larkc, {'workflow' => workflow_str})
  end
  
  def get_endpoint
     if @responce.body =~ /^([0-9a-f-]+)\s?\z/ then
        @hex_code = $1
        url = RETRIEVE_PORT.gsub(/hexcode/,@hex_code)
        reply = Net::HTTP.get_print URI.parse(url)
        if reply =~ /^(http:\/\/\S+\/sparql)/  then
        @endpoint = $1
        end  
     end
  end 
end




WORKFLOW = "@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix larkc: <http://larkc.eu/schema#> .

# !!! Important: make sure to replace every occurrence of <OPSPWD> 
# with the path on your system 
#Define a plugin

_:reasoner a <urn:eu.larkc.plugin.SparqlQueryEvaluationReasoner> .
_:rdfreader a <urn:eu.larkc.plugin.RDFReader.RDFReader> .
_:rdfreader larkc:connectsTo _:reasoner .
_:rdfreader larkc:hasParameter _:rdfreaderparam .
_:rdfreaderparam larkc:defaultoutputname larkc:defaultgraph .

#Adding File - PDSP:

_:fileidentifier a <urn:eu.larkc.plugin.newfileidentifier.NewFileIdentifier> .
_:fileidentifier larkc:connectsTo _:rdfreader .
_:fileidentifier larkc:hasParameter _:param .
_:param larkc:filePath \"c:/OPS/openphacts/datasets/pdspki/pdsp-v2.ttl\" .

#Adding File - Kegg
_:fileidentifier2 a <urn:eu.larkc.plugin.newfileidentifier.NewFileIdentifier> .
_:fileidentifier2 larkc:connectsTo _:rdfreader .
_:fileidentifier2 larkc:hasParameter _:param2 .
_:param2 larkc:filePath \"c:/OPS/openphacts/datasets/chem2bio2rdf/kegg.nt\" .

#Adding File - Brenda
_:fileidentifier3 a <urn:eu.larkc.plugin.newfileidentifier.NewFileIdentifier> .
_:fileidentifier3 larkc:connectsTo _:rdfreader .
_:fileidentifier3 larkc:hasParameter _:param3 .
_:param3 larkc:filePath \"c:/OPS/openphacts/datasets/brenda/brenda.ttl\" .


#Adding File - Uniprot enzyme
_:fileidentifier4 a <urn:eu.larkc.plugin.newfileidentifier.NewFileIdentifier> .
_:fileidentifier4 larkc:connectsTo _:rdfreader .
_:fileidentifier4 larkc:hasParameter _:param4 .
_:param4 larkc:filePath \"c:/OPS/openphacts/datasets/uniprotrdf/enzyme.ttl\" .

#Adding File - KEGG-CS mapping
_:fileidentifier5 a <urn:eu.larkc.plugin.newfileidentifier.NewFileIdentifier> .
_:fileidentifier5 larkc:connectsTo _:rdfreader .
_:fileidentifier5 larkc:hasParameter _:param5 .
_:param5 larkc:filePath \"c:/OPS/openphacts/datasets/OPS-DS-TTL/KEGG.ttl\" .

#Adding File - PDSP-CS mapping
_:fileidentifier6 a <urn:eu.larkc.plugin.newfileidentifier.NewFileIdentifier> .
_:fileidentifier6 larkc:connectsTo _:rdfreader .
_:fileidentifier6 larkc:hasParameter _:param6 .
_:param6 larkc:filePath \"c:/OPS/openphacts/datasets/OPS-DS-TTL/PDSP.ttl\" .

#Adding File - ChEMBL-CS mapping
_:fileidentifier7 a <urn:eu.larkc.plugin.newfileidentifier.NewFileIdentifier> .
_:fileidentifier7 larkc:connectsTo _:rdfreader .
_:fileidentifier7 larkc:hasParameter _:param7 .
_:param7 larkc:filePath \"c:/OPS/openphacts/datasets/OPS-DS-TTL/ChEMBL.ttl\" .


#Define ChemCallout plugin
_:chemcallout a <urn:eu.ops.plugin.chemcallout.ChemCallout> .
_:path larkc:hasInput _:chemcallout .
_:chemcallout larkc:connectsTo _:reasoner .
_:chemcallout larkc:hasParameter _:chemparam .
_:chemparam larkc:defaultoutputname larkc:defaultgraph .

#Define the endpoint for this workflow.
<urn:eu.larkc.endpoint.sparql.ep1> a <urn:eu.larkc.endpoint.sparql> .
#Endpoints are connected to paths in the workflow. Specify the path the above endpoint refers to.
<urn:eu.larkc.endpoint.sparql.ep1> larkc:links _:path .
_:path a larkc:Path .
#Connect the input of the path to a plugin
_:path larkc:hasInput _:reasoner .
#Connect the output of the path to a plugin
_:path larkc:hasOutput _:reasoner ."

ttl_file = 'C:\OPS\openphacts\ops-platform\larkc-workflow\datasetsworkflow.ttl'

larkc = LarkcWorkflow.new()
#hex_key = larkc.post_workflow(WORKFLOW)
hex_key = larkc.post_workflow(ttl_file)
endpoint = larkc.get_endpoint
puts endpoint.inspect.first