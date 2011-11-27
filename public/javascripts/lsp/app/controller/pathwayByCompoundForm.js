Ext.define('LSP.controller.pathwayByCompoundForm', {
extend: 'Ext.app.Controller',

    views: ['LSP.view.pathways.pathwayByCompoundForm','LSP.view.pathways.wikiPathwaysWindow'],
    stores: ['LSP.store.DynamicGrid'],
    
    refs: [
        {
            ref: 'pwbycmpdForm',
            selector: 'pathwayByCompoundForm'
        }
    ],
    
    init: function() {
        this.control({
            'pathwayByCompoundForm button[action=query]': {
                click: this.submitQuery                               
            },
            'pathwayByCompoundForm button[action=wp_view]': {
                click: this.launchWPApplet                               
            }
        });
    },
    
    // Launch WikiPathways applet window
    launchWPApplet: function(button) {
        var form = button.up('form');
        var grid = form.query('dynamicgrid2')[0];
        var selection = grid.getSelectionModel().getSelection()[0];
        console.log(selection);
        if (selection) {
            //TODO get the "WP88" like id and save to a var before fireing
           // Launch the window
            var view = Ext.widget('wikiPathwaysWindow',{wpathway_id: "WP88"});    
          }            
    },
    
    submitQuery: function(button) {
        var form = button.up('form');
        console.log(form);
        values = form.getValues();
        console.log(values);
        var grid = form.query('dynamicgrid2')[0];
        grid.store.proxy.extraParams = values;
        grid.store.proxy.api.read = 'core_api_calls/wiki_pathways_by_compound.json';
        grid.store.load();
        grid.store.on('load',function(){form.doLayout()});
    }}
);
