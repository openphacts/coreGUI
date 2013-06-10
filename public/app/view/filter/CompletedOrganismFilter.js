Ext.define('LSP.view.filter.CompletedOrganismFilter', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.CompletedOrganismFilter',
	closable: true,
	headerPosition: 'right',
	height: 28,
	width: 400,
	filterModel:null,
	layout: {
		type: 'hbox'
	},
	frame: true,
	margin: '0 0 5 0',
	items: [
{
		xtype: 'label',
		itemId: 'valueLabel_id',
		padding: '0 5 0 0'
	}, {
		xtype: 'label',
		itemId: 'conditionsLabel_id',
		padding: '0 5 0 0'
	},{
		xtype: 'label',
		itemId: 'organismType_id',
		padding: '0 5 0 0'
	}
	]
});
