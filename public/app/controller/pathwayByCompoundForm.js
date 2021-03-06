Ext.define('LSP.controller.pathwayByCompoundForm', {
        extend:'Ext.app.Controller',

        views:['pathways.pathwayByCompoundForm', 'pathways.wikiPathwaysWindow'],
        stores:['DynamicGrid'],

        refs:[
            {
                ref:'pwbycmpdForm',
                selector:'pathwayByCompoundForm'
            }
        ],

        init:function () {
            this.control({
                'pathwayByCompoundForm button[action=query]':{
                    click:this.submitQuery
                },
                'pathwayByCompoundForm button[action=wp_view]':{
                    click:this.launchWPApplet
                },
                'pathwayByCompoundForm wikiPathwaysCompoundLookup':{
                    select:this.enableSubmit
                }

            });
        },


        enableSubmit:function (wikiPathwaysCompoundLookup) {
            var form = wikiPathwaysCompoundLookup.up('form');
            var button = form.query('button[action=query]')[0];
            button.enable();
        },


        // Launch WikiPathways applet window
        launchWPApplet:function (button) {
            var form = button.up('form');
            var grid = form.query('dynamicgrid2')[0];
            var selection = grid.getSelectionModel().getSelection()[0];
            if (selection) {
                //TODO get the "WP88" like id and save to a var before fireing
                // Launch the window
                var view = Ext.widget('wikiPathwaysWindow', {wpathway_id:selection.data.Pathway_id});
            }
        },

        submitQuery:function (button) {
            var form = button.up('form');
            button.disable();
            var values = form.getValues();
            var grid = form.query('dynamicgrid2')[0];
            grid.store.proxy.extraParams = values;
            grid.store.proxy.api.read = 'core_api_calls/wiki_pathways_by_compound.json';
            grid.store.load();
            grid.store.on('load', function (this_store, records, success) {
                alert(success);
                form.doLayout();
                button.enable();
            });
        }}
);
