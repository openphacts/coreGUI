Ext.define('CS.model.Compound', {
    extend: 'Ext.data.Model',
    id: 'CSID',
    spectra: null,
    cifs: null,
    images: null,
    uncertaintSyns: null,
    rejectedSyns: null,
    deletedSyns: null,
    confirmedSyns: null,
    approvedSyns: null,
    fields: [
        { name: 'CSID', mapping: 'CSID' },
        { name: 'Name', mapping: 'Name' },
        { name: 'MF', mapping: 'MF' },
        { name: 'AM', mapping: 'AM' },
        { name: 'MW', mapping: 'MW' },
        { name: 'Mol', mapping: 'Mol' },
        { name: 'Identifiers', mapping: 'Identifiers' },
        { name: 'Synonyms', mapping: 'Synonyms' },
        { name: 'References', mapping: 'References' },
        { name: 'Blobs', mapping: 'Blobs' }
    ],
    hasSynonyms: function () {
        return this.data != null && this.data.Synonyms.length > 0;
    },
    hasReferences: function () {
        return this.data != null && this.data.References.length > 0;
    },
    hasSpectra: function () {
        if (this.spectra == null) this.parseBlobs();

        return this.spectra.length > 0;
    },
    hasImages: function () {
        if (this.images == null) this.parseBlobs();

        return this.images.length > 0;
    },
    hasCIFs: function () {
        if (this.cifs == null) this.parseBlobs();

        return this.cifs.length > 0;
    },
    getSpectra: function () {
        if (this.spectra == null) this.parseBlobs();

        return this.spectra;
    },
    getImages: function () {
        if (this.images == null) this.parseBlobs();

        return this.images;
    },
    getCIFs: function () {
        if (this.cifs == null) this.parseBlobs();

        return this.cifs;
    },
    parseBlobs: function () {
        this.spectra = new Array();
        this.cifs = new Array();
        this.images = new Array();

        for (var i = 0; i < this.data.Blobs.length; i++) {
            var blob = this.data.Blobs[i];
            if (blob.BlobType == 0) this.spectra.push(blob);
            else if (blob.BlobType == 1) this.images.push(blob);
            else if (blob.BlobType == 2) this.cifs.push(blob);
        }
    },
    hasUncertaintSynonyms: function () {
        if (this.uncertaintSyns == null) this.parseSynonyms();

        return this.uncertaintSyns.length > 0;
    },
    hasRejectedSynonyms: function () {
        if (this.rejectedSyns == null) this.parseSynonyms();

        return this.rejectedSyns.length > 0;
    },
    hasDeletedSynonyms: function () {
        if (this.deletedSyns == null) this.parseSynonyms();

        return this.deletedSyns.length > 0;
    },
    hasConfirmedSynonyms: function () {
        if (this.confirmedSyns == null) this.parseSynonyms();

        return this.confirmedSyns.length > 0;
    },
    hasApprovedSynonyms: function () {
        if (this.approvedSyns == null) this.parseSynonyms();

        return this.approvedSyns.length > 0;
    },
    getUncertaintSynonyms: function () {
        if (this.uncertaintSyns == null) this.parseSynonyms();

        return this.uncertaintSyns;
    },
    getRejectedSynonyms: function () {
        if (this.rejectedSyns == null) this.parseSynonyms();

        return this.rejectedSyns;
    },
    getDeletedSynonyms: function () {
        if (this.deletedSyns == null) this.parseSynonyms();

        return this.deletedSyns;
    },
    getConfirmedSynonyms: function () {
        if (this.confirmedSyns == null) this.parseSynonyms();

        return this.confirmedSyns;
    },
    getApprovedSynonyms: function () {
        if (this.approvedSyns == null) this.parseSynonyms();

        return this.approvedSyns;
    },
    parseSynonyms: function () {
        this.uncertaintSyns = new Array();
        this.rejectedSyns = new Array();
        this.deletedSyns = new Array();
        this.confirmedSyns = new Array();
        this.approvedSyns = new Array();

        /*
        * Reliability:
        * 0 - Uncertaint,
        * 1 - Rejected,
        * 2 - Deleted,
        * 3 - Confirmed,
        * 4 - Approved
        */
        for (var i = 0; i < this.data.Synonyms.length; i++) {
            var syn = this.data.Synonyms[i];

            if (syn.Reliability == 0)
                this.uncertaintSyns.push(syn);
            else if (syn.Reliability == 1)
                this.rejectedSyns.push(syn);
            else if (syn.Reliability == 2)
                this.deletedSyns.push(syn);
            else if (syn.Reliability == 3)
                this.confirmedSyns.push(syn);
            else if (syn.Reliability == 4)
                this.approvedSyns.push(syn);
        }
    }
});
