Ext.define('LSP.controller.PharmByTargetNameForm', {
    extend: 'Ext.app.Controller',

    views: ['pharm_by_target_name2.PharmByTargetNameForm'],

    init: function() {
        this.control({
            'PharmByTargetNameForm button[action=query_pharm_by_target_name]': {
                click: this.submitQuery                
            },
            'PharmByTargetNameForm conceptWikiProteinLookup': {
                select: this.enableSubmit
            }
        });
    },
    
    enableSubmit: function(proteinLookup) {
        var form = proteinLookup.up('form');
        var button = form.query('button[action=query_pharm_by_target_name]')[0];
        button.enable();
    },
    
    submitQuery: function(button) {
        var form = button.up('form');
        button.disable();
        values = form.getValues();
values.protein_uri = 'http://www.conceptwiki.org/concept/458eaa59-79a5-448f-9085-9664f6f643af';
        var grid = form.query('dynamicgrid3')[0];
        grid.store.proxy.actionMethods = {read: 'POST'};
        grid.store.proxy.extraParams = values;
        grid.store.proxy.api.read = '/core_api_calls/pharm_by_protein_name.json';
        grid.store.load({params: { offset: 0, limit: 500}});
        grid.store.on('load',function(){form.doLayout();button.enable();});
    }
    
    
    }
);
