// The data store containing the list of states
var activity_type = Ext.create('LDA.store.FilterActivityStore', {});
var condition = Ext.create('Ext.data.Store', {
	fields: ['symbol', 'name'],
	data: [{
		"symbol": "=",
		"name": "="
	}, {
		"symbol": ">",
		"name": ">"
	}, {
		"symbol": "<",
		"name": "<"
	}, {
		"symbol": "<=",
		"name": "<="
	}, {
		"symbol": ">=",
		"name": ">="
	}
	// TODO this part of the ui is conflating ideas I think. all is for the relation part of the results not the activity type
	//, {
	//	"symbol": "all",
	//	"name": "all"
	//}
	]
});
// no need for the units at the moment, it is handled automatically by the api depending on whether
// it is Potency or IC50 (the only allowed values at the moment)
var unit = Ext.create('Ext.data.Store', {
	fields: ['unit', 'name']
});
Ext.define('LSP.view.filter.ActivityFilterForm', {
	extend: 'Ext.container.Container',
	alias: 'widget.ActivityFilterForm',
	closable: true,
	layout: {
		type: 'hbox'
	},
	refs:[
            {
                ref:'activity_combobox', // reference to the view
                selector:'#activity_combobox_id'
            },
            {
                ref:'conditions_combobox',
                selector:'#conditions_combobox_id'
            },
            {
                ref:'value_textfield',
                selector:'#value_textfield_id'
            },
            //{
            //    ref:'unit_combobox',
            //    selector:'#unit_combobox_id'
            //}
        ],
	headerPosition: 'right',
	frame: true,
	padding: '0 0 5 0',
	items: [{
		xtype: 'combobox',
		itemId: 'activity_combobox_id',
		fieldLabel: 'Activity Type',
		store: activity_type,
		queryMode: 'remote',
		displayField: 'activity_type',
		valueField: 'activity_type',
		labelWidth: 100,
		labelPad: 2,
		padding: '0 2 0 0'
	}, {
		xtype: 'combobox',
		itemId: 'conditions_combobox_id',
		fieldLabel: 'Conditions',
		store: condition,
		queryMode: 'local',
		displayField: 'symbol',
		valueField: 'name',
		labelWidth: 70,
		labelPad: 2,
		padding: '0 2 0 0'
	}, {
		xtype: 'textfield',
		itemId: 'value_textfield_id',
		name: 'value',
		fieldLabel: 'Value',
		allowBlank: false,
		labelWidth: 50,
		labelPad: 2,
		padding: '0 2 0 0'
		// requires a non-empty value
	}, {
		xtype: 'combobox',
		itemId: 'unit_combobox_id',
		fieldLabel: 'Unit',
		store: Ext.create('Ext.data.Store', {
			model: 'LSP.model.unit',
			fields: ['unit', 'name']
		}),
		queryMode: 'local',
		displayField: 'unit',
		valueField: 'name',
		labelWidth: 50,
		labelPad: 2,
		padding: '0 10 0 0'
	}, {
		xtype: 'button',
		itemId: 'addCompletedActivityFilter_id',
		iconCls: 'icon-new',
		padding: '5 5 5 5',
		tooltip: 'Add this activity filter',
		action: 'add_completed_activity_filter'
	}]
});
