Ext.define('LSP.view.filter.CompletedActivityFilter', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.CompletedActivityFilter',
	closable: true,
	headerPosition: 'right',
	height: 30,
	width: 270,
	filterModel:null,
	layout: {
		type: 'hbox'
	},
	frame: true,
	margin: '0 0 5 0',
	items: [{
		xtype: 'label',
		itemId: 'activityLabel_id',
		padding: '0 5 0 0'
	}, {
		xtype: 'label',
		itemId: 'conditionsLabel_id',
		padding: '0 5 0 0'
	}, {
		xtype: 'label',
		itemId: 'valueLabel_id',
		padding: '0 5 0 0'
	}, {
		xtype: 'label',
		itemId: 'unitLabel_id'
	}
	]
});
