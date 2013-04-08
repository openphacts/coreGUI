Ext.define('LSP.view.Viewer', {
    extend:'Ext.tab.Panel',
    alias:'widget.viewer',

    requires:[
		'LSP.view.dynamicgrid.DynamicGrid',
        'LSP.view.usergrid.UserGrid',
        'LSP.view.sparqlform.Queryform',
        'LSP.view.larkc_sim_search.SimSearchForm',
        'LSP.view.cmpd_by_name.CmpdByNameForm',
        'xLSP.view.target_by_name.TargetByNameForm',
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
    items: [
        {
            title: 'Home',
            bodyPadding: 60,
            padding: '0 0 0 100',
            html : '<div class="welcome-text-heading">Welcome to the Open PHACTS Explorer</div>'  +
                '<br><br><p><div class="welcome-text">We are pleased to present the first public release of the beta Open PHACTS Explorer.</div></p>' +
                '<br><p><div class="welcome-text">The Open PHACTS Explorer allows multiple sources of publicly-available pharmacological and ' +
                'physicochemical data to be intuitively queried, and makes data provenance accessible at every step. The ' +
                'Open PHACTS Explorer was built to answer critical pharmacological questions as defined by academic and ' +
                'pharmaceutical industry scientists.</div></p>' +
                '<br><p><div class="welcome-text">For more information visit the Open PHACTS Explorer <a href="http://www.openphacts.org/explorer">homepage</a></div></p>'
                + '<br><br><iframe  width="640" height="360" src="http://www.youtube.com/embed/BK3fkEFkOy0?feature=player_embedded" frameborder="0" allowfullscreen></iframe>' +
                '<br><br><p><div class="welcome-text">This is the first public release of the Open PHACTS Explorer, and we look forward to and value your feedback and comments.</div></p>' +
                '<br><br><p><div class="welcome-text-linkout"><a href="http://www.openphacts.org/the-project">About us & Acknowledgments</a></div></p>'


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
