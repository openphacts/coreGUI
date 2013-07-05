Ext.define('LSP.view.feedback.HomePanel', {
    extend:'Ext.panel.Panel',
    alias:'widget.homepanel',
    title: 'Home',
    bodyPadding: 60,
    padding: '0 0 0 100',
    html : '<div class="welcome-text-heading">Welcome to the Open PHACTS Explorer</div><br><br><p><div class="welcome-text">We are pleased to present the first public release of the beta Open PHACTS Explorer.</div></p><br><p><div class="welcome-text">The Open PHACTS Explorer allows multiple sources of publicly-available pharmacological and physicochemical data to be intuitively queried, and makes data provenance accessible at every step. The Open PHACTS Explorer was built to answer critical pharmacological questions as defined by academic and pharmaceutical industry scientists.</div></p><br><p><div class="welcome-text">For more information visit the Open PHACTS Explorer <a href="http://www.openphacts.org/explorer">homepage</a></div></p><br><br><iframe  width="640" height="360" src="http://www.youtube.com/embed/BK3fkEFkOy0?feature=player_embedded" frameborder="0" allowfullscreen></iframe><br><br><p><div class="welcome-text">This is the first public release of the Open PHACTS Explorer, and we look forward to and value your feedback and comments.</div></p><br><br><div class="welcome-text centre"><ul class="inline-list"><li><a href="http://www.openphacts.org/tutorials" target="_blank">tutorials</a></li><li><a href="http://www.openphacts.org/explorer-release-notes" target="_blank">release notes</a></li><li><a href="http://www.openphacts.org/explorer/160" target="_blank">feedback</a></li><li><a href="http://www.openphacts.org/known-issues-with-beta-open-phacts-explorer-" target="_blank">known issues</a></li><li><a href="http://www.openphacts.org/the-project">About us & Acknowledgments</a></li></ul></div>',
items: [{
        xtype: 'container',
        layout : {
            type : 'hbox',
            pack : 'end'
        },
        items: [{
            xtype: 'label',
            forId: 'version_label_id',
            text: explorer_version,
            margin: '0 0 0 10',
            cls: 'grey'
        }]
        }]
});
