Ext.define('LSP.store.GuiComponents', {
	extend: 'Ext.data.Store',
	id: 'GuiComponents',
	model: 'LSP.model.GuiComponent',
	autoLoad: true,
	data: [{
		"url": "users.json",
		"text": "Users",
		"id": 3,
		"xtype": "dynamicgrid",
		"home": "Users grid"
	},
		{
			"url": "rdf.json",
			"text": "SPARQL",
			"id": 5,
			"xtype": "queryform",
			"home": "SPARQL form"
		}, {
			"url": "",
			"text": "Compound by name",
			"id": 18,
			"xtype": "CmpdByNameForm",
			"home": "Compound by name"
		}, {
			"url": "",
			"text": "Compound by structure",
			"id": 23,
			"xtype": "SimSearchForm",
			"home": "Compound Structure Search"
		}, {
			"url": "",
			"text": "Target by name",
			"id": 24,
			"xtype": "TargetByNameForm",
			"home": "Target by name"
		}, {
			"url": "",
			"text": "X-Target by sequence",
			"id": 25,
			"xtype": "temp",
			"home": ""
		}, {
			"url": "",
			"text": "Pharmacology by Target",
			"id": 26,
			"xtype": "PharmByTargetNameForm",
			"home": "Pharmacology by Target Name"
		}, {
			"url": "",
			"text": "Pharmacology by Compound",
			"id": 27,
			"xtype": "PharmByCmpdNameForm",
			"home": "Pharmacology by Compound name"
		}, {
			"url": "",
			"text": "Pharmacology by Enzyme family",
			"id": 28,
			"xtype": "PharmEnzymeForm",
			"home": "Compounds active against enzyme family"
		}, {
			"url": "",
			"text": "X-Polypharmacology Browser",
			"id": 34,
			"xtype": "temp",
			"home": ""
		}, {
			"url": "",
			"text": "X-Target Dossier",
			"id": 35,
			"xtype": "temp",
			"home": ""
		}, {
			"url": "",
			"text": "X-Chem-Bio Navigator",
			"id": 36,
			"xtype": "temp",
			"home": ""
		}]
});
