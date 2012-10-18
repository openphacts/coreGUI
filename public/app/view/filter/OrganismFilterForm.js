var assay_organism = Ext.create('Ext.data.Store', {
	fields: ['abbr', 'name'],
	data: [{
		"abbr": "Homo Sapiens",
		"name": "Homo Sapiens"
	}, {
		"abbr": "Mus Musculus",
		"name": "Mus Musculus"
	}, {
		"abbr": "Rattus norvegicus",
		"name": "Rattus norvegicus"
	}, {
		"abbr": "Cavia porcellus",
		"name": "Cavia porcellus"
	}, {
		"abbr": "Equus caballus",
		"name": "Equus caballus"
	}]
});
Ext.define('LSP.view.filter.OrganismFilterForm', {
	extend: 'Ext.container.Container',
	alias: 'widget.OrganismFilterForm',
	closable: true,
	layout: {
		type: 'hbox'
	},
	refs:[
            {
                ref:'organism_combobox',
                selector:'#organism_combobox_id'
            },
            {
                ref:'organism_textfield',
                selector:'#organism_textfield_id'
            }
        ],
	headerPosition: 'right',
	frame: true,
	padding: '0 0 5 0',
	items: [
{
		xtype: 'combobox',
		itemId: 'organism_combobox_id',
		fieldLabel: 'Assay Organism',
		store: assay_organism,
		queryMode: 'local',
		displayField: 'abbr',
		valueField: 'name',
		labelWidth: 100,
		labelPad: 2,
		padding: '0 2 0 0'
	}
	, {
		xtype: 'button',
		itemId: 'addCompletedOrganismFilter_id',
		iconCls: 'icon-new',
		padding: '5 5 5 5',
		tooltip: 'Add this organism filter',
		action: 'add_completed_organism_filter'
	}]
});
