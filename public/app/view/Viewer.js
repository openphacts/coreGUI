Ext.define('LSP.view.Viewer', {
    extend:'Ext.tab.Panel',
    alias:'widget.viewer',

    requires:[
		'LSP.view.dynamicgrid.DynamicGrid',
        'LSP.view.usergrid.UserGrid',
        'LSP.view.sparqlform.Queryform',
        'LSP.view.larkc_sim_search.SimSearchForm',
        'LSP.view.cmpd_by_name.CmpdByNameForm',
        'LSP.view.target_by_name.TargetByNameForm',
        'LSP.view.pharm_by_cmpd_name2.PharmByCmpdNameForm',
        'LSP.view.pharm_by_target_name2.PharmByTargetNameForm',
        'LSP.view.concept.SummeryForm',
        'LSP.view.placeholder.temp',
        'LSP.view.pharm_by_enzyme_family.PharmEnzymeForm',
        'LSP.view.textmining.pmidTextMiningHitsForm',
        'LSP.view.pathways.pathwayByCompoundForm',
        'LSP.view.pathways.pathwayByProteinForm',
    ],
	listeners: {
	        remove: {
			// if all the tabs have been removed then add an empty history token in
			// case the user wants to reopen the last closed tab again, seems a bit ugly 
			// doing it like this but can't think of any other way at the moment
	            fn: function() {
					if (this.items.length == 0) {
						Ext.History.add('');
					}
				}
	        }
	},
    activeItem:0,
    margins:'0 4 4 4',
    //cls: 'preview',

    initComponent:function () {
		console.log('Viewer: initComponent()');
        this.callParent(arguments);
        this.on('tabchange', function (tabPanel, newCard, oldCard) {
            //this handles the user selecting a tab and updates the history token appropriately
            Ext.History.add('!p=' + newCard.xtype);
        });
    }
});
