Ext.define('LDA.store.SimSearchLocalStore', {
	extend: 'Ext.data.Store',
	model: 'LDA.model.SimModel',
	storeId: 'simSearchLocalStore',
	typeName: undefined,
	proxy: {
		type: 'memory',
		reader: {
			type: 'json'
		}
	},

	setTypeName: function(type) {
		this.typeName = type;
	},

	getTypeName: function() {
		return this.typeName;
	}
});
