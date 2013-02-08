Ext.define('LDA.helper.PathwayReader', {
    extend:'Ext.data.reader.Json',
    requires:['LDA.helper.LDAConstants'],

    readRecords:function (data) {
	var identifier, title, description, inDataset, organismAbout, organismLabel, pathwayOntology;
        var pt = data['result']['primaryTopic'];
        identifier = pt.identifier;
        title = pt.title;
        description = pt.description;
        inDataset = pt.inDataset;
        organism = pt.organism;
        var organismAbout, organismLabel, pathwayOntology;
        if (organism) {
            organsimAbout = pt.organism["_about"];
            organismLabel = pt.organism["label"];
            pathwayOntology = pt.pathwayOntology;
        }

        var record = Ext.create('LDA.model.PathwayModel', {
            identifier:identifier,
            title: title,
            description: description,
            inDataset: inDataset,
            organismAbout: organismAbout,
            organismLabel: organismLabel,
            pathwayOntology: pathwayOntology
        });

        return new Ext.data.ResultSet(
            {
                total:1,
                count:1,
                records:[record],
                success:true,
                message:'loaded'
            });
    }
});
