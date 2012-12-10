Ext.define('LDA.helper.PathwayReader', {
    extend:'Ext.data.reader.Json',
    requires:['LDA.helper.LDAConstants'],

    readRecords:function (data) {
	    var identifier, title, description, inDataset, organismAbout, organismLabel, pathwayOntology;
        var pt = data['result']['primaryTopic'];
        var identifier = em.identifier;
        var title = em.title;
        var description = em.description.
        var inDataset = em.inDataset;
        var organsimAbout = em.organism["_about"];
        var organismLabel = em.organism["label"];
        var pathwayOntology = em.pathwayOntology;

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