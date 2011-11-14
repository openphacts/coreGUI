Ext.application({
    name: 'LSP',

    appFolder: '/javascripts/lsp/app',

    // Define all the controllers that should initialize at boot up of your application
    controllers: [
        'Users',
        'DynamicGrid',
        'Grid',
        'NavigationTree',
        'Queryform',
        'SimSearchForm',
        'CmpdByNameForm',
 	'TargetByNameForm',
	'PharmByTargetNameForm',
	'PharmByCmpdNameForm',
	'PharmEnzymeForm',
	'SummeryForm',
	'Settings'
    ],
    
    autoCreateViewport: true,
    
    launch: function() {
        if (LSPSharedData.user) {
          Ext.getCmp('loginButton').setVisible(false);
        }
        else {
          Ext.getCmp('logoutButton').setVisible(false);
        }
    }
});
