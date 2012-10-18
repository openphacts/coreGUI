/*
// Filter model holds the values that the user selected in the filter form view
// as well as references to the controller and view used when removing the filter
*/
Ext.define('LSP.model.Filter', {
	extend: 'Ext.data.Model',
	fields: ['activity', 'condition', 'value', 'unit', 'filterView', 'controller'],
	filterType: undefined, //set to whatever type you are adding eg, activity or organism
	getConditions: function() {

	}
});
