Ext.define('LSP.model.Organism', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'name',     type: 'string'},
        {name: 'abbr',      type: 'string'}
    ]
});
var assay_organism = Ext.create('Ext.data.Store', {
     model: 'LSP.model.Organism',
     proxy: {
         type: 'ajax',
         url: '/core_api_calls/organisms.json',
         model: 'LSP.model.Organism',
         reader: {
             type: 'json'
         }
     }
 });
//var assay_organism = Ext.create('Ext.data.Store', {
//	fields: ['abbr', 'name'],
//	data: [{
//		"abbr": "Homo sapiens",
//		"name": "Homo sapiens"
//	}, {
//		"abbr": "Mus musculus",
//		"name": "Mus musculus"
//	}, {
//		"abbr": "Rattus norvegicus",
//		"name": "Rattus norvegicus"
//	}, {
//		"abbr": "Cavia porcellus",
//		"name": "Cavia porcellus"
//	}, {
//		"abbr": "Equus caballus",
//		"name": "Equus caballus"
//	}, {
//		"abbr": "Ovis aries",
//		"name": "Ovis aries"
//	}]
//});
Ext.define('LSP.view.filter.OrganismFilterForm', {
	extend: 'Ext.container.Container',
	alias: 'widget.OrganismFilterForm',
	closable: true,
	layout: {
		type: 'hbox'
	},
	refs: [{
		ref: 'organism_combobox',
		selector: '#organism_combobox_id'
	}, {
		ref: 'organism_textfield',
		selector: '#organism_textfield_id'
	}],
	headerPosition: 'right',
	frame: true,
	padding: '0 0 5 0',
	items: [{
		xtype: 'combobox',
		itemId: 'organism_combobox_id',
		fieldLabel: 'Assay Organism',
		store: assay_organism,
		queryMode: 'remote',
		displayField: 'abbr',
		valueField: 'name',
		labelWidth: 100,
		width: 400,
		labelPad: 2,
		padding: '0 2 0 0',
		emptyText: 'Enter the name of an organism...',
    		minChars:3,
    		hideTrigger:true,
    		listConfig:{
        		emptyText:'No organisms found which match your text, try entering some different text.'
		}
	}, {
		xtype: 'button',
		itemId: 'addCompletedOrganismFilter_id',
		iconCls: 'icon-new',
		padding: '5 5 5 5',
		tooltip: 'Add this organism filter',
		action: 'add_completed_organism_filter'
	}]
});
