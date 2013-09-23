Ext.define('LSP.view.filter.CompletedPChemblFilterForm', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.CompletedPChemblFilter',
	closable: true,
	headerPosition: 'right',
	height: 28,
	width: 200,
	filterModel:null,
	layout: {
		type: 'hbox'
	},
	frame: true,
	margin: '0 0 5 0',
	items: [
        {
		   xtype: 'label',
		   itemId: 'pchemblLabel_id',
		   padding: '0 5 0 0',
	    },
		{
		    xtype: 'label',
			itemId: 'valueLabel_id',
			padding: '0 5 0 0'
		}
	]
});
