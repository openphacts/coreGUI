Ext.define('LSP.view.filter.CompletedFilter', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.CompletedFilter',
	closable: true,
	headerPosition: 'right',
	height: 30,
	width: 200,
	layout: {
		type: 'hbox'
	},
	frame: true,
	// padding: '0 0 5 0',
	items: [{
		xtype: 'label',
		itemId: 'activityLabel_id'
	}, {
		xtype: 'label',
		itemId: 'conditionsLabel_id'
	}, {
		xtype: 'label',
		itemId: 'valueLabel_id'
	}, {
		xtype: 'label',
		itemId: 'unitLabel_id'
	}]
});
