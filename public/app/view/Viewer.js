Ext.define('LSP.view.Viewer', {
    extend:'Ext.tab.Panel',
    alias:'widget.viewer',
    xtype: 'plain-tabs',
    plain: true,
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
        'LSP.view.api_status.Status',
        'LSP.view.background_tasks.BackgroundTasksForm'
    ],

    activeItem:0,
    margins:'0 4 4 4',
    //cls: 'preview',
    items: [{
            xtype: 'homepanel'
        }],

    initComponent:function () {
		console.log('Viewer: initComponent()');
        this.callParent(arguments);
        this.on('tabchange', function (tabPanel, newCard, oldCard) {
            //this handles the user selecting a tab and updates the history token appropriately
            Ext.History.add('!p=' + newCard.xtype);
        });
    }
});
