/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 29/06/2012
 * Time: 11:24
 * To change this template use File | Settings | File Templates.
 */

Ext.define('LDA.store.TargetPharmacologyPaginatedStore', {
    extend:'LDA.store.basestores.PaginatedFilteringStore',
    model:'LDA.model.PharmacologyPaginatedModel',
    storeId:'TargetPharmacologyPaginatedStore',
    BASE_URL:'http://ops.few.vu.nl/target/pharmacology/pages?',

    constructor:function (config, arguments) {
		console.log('TargetPharmacologyPaginatedStore: constructor()');
        this.proxy.reader = Ext.create('LDA.helper.TargetPharmacologyPaginatedReader');
        this.callParent(arguments);
    },
	
	// Set up the sort properties, check the direction of sort and prepend with
	// '-' if required
	sortColumn:function(arguments) {
		console.log('TargetPharmacologyPaginatedStore: sortColumn()');
		var sort_column = arguments[0].property;
		var sort_direction = arguments[0].direction;
		if (sort_direction == "DESC") {
			sort_column = "-" + sort_column;
		}
		this.setSortColumn(sort_column);
	}
});