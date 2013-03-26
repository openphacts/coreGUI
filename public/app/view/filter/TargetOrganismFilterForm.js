var target_organism = Ext.create('Ext.data.Store', {
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
Ext.define('LSP.view.filter.TargetOrganismFilterForm', {
	extend: 'Ext.container.Container',
	alias: 'widget.TargetOrganismFilterForm',
	closable: true,
	layout: {
		type: 'hbox'
	},
	refs: [{
		ref: 'target_organism_combobox',
		selector: '#target_organism_combobox_id'
	}, {
		ref: 'target_organism_textfield',
		selector: '#target_organism_textfield_id'
	}],
	headerPosition: 'right',
	frame: true,
	padding: '0 0 5 0',
	items: [{
		xtype: 'combobox',
		itemId: 'target_organism_combobox_id',
		fieldLabel: 'Target Organism',
		store: target_organism,
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
		itemId: 'addCompletedTargetOrganismFilter_id',
		iconCls: 'icon-new',
		padding: '5 5 5 5',
		tooltip: 'Add this target organism filter',
		action: 'add_completed_target_organism_filter'
	}]
});
