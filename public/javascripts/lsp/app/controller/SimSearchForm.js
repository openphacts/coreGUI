Ext.define('LSP.controller.SimSearchForm', {
    extend: 'Ext.app.Controller',

    views: ['larkc_sim_search.SimSearchForm','mol_editor_forms.KetcherForm', 'dataview.StructureViewer'],

    refs: [
        {
            ref: 'ssform',  // reference to the view
            selector: 'SimSearchForm'
        }
    ],

    init: function() {
        this.control({
            'SimSearchForm button[action=ketcher_editor]': {
                click: this.launchKetcher
            },
            'KetcherForm button[action=commit_structure]': {
                click: this.getSmiles
            },
            'SimSearchForm button[action=query]': {
                click: this.submitQuery
            },
            'SimSearchForm button[action=data_view]': {
                click: this.launchDataView
            }
        });
    },
    // Launch ketcher window
    launchKetcher: function(button) {
        // Launch the window
        var view = Ext.widget('KetcherForm');    
        // Check to see if we already have a structure to modify and load it if we do
        fields = this.getSsform().form.getFields().items;
        var molfile = '';
        fields.forEach(function(item) { if(item.name == 'molfile'){molfile = item.getValue(); var temp = 12;}});
        if(molfile != ''){
          document.getElementById('ketcher_box_id').contentWindow.ketcher.setMolecule(molfile);
        }
    },
    
    // Grep smiles from ketcher window and store in smiles field in form
    getSmiles: function(button) {
          var ketcher_window = document.getElementById('ketcher_box_id');
          // smiles is used for query
          smiles = ketcher_window.contentWindow.ketcher.getSmiles();
          // molfile is stored in hidden field for use when updating existing structure
          molfile = ketcher_window.contentWindow.ketcher.getMolfile();
          // We get all fields in form so that we can update the right one
          fields = this.getSsform().form.getFields().items;
          fields.forEach(function(item) { if(item.name == 'smiles'){item.setValue(smiles)} else if(item.name == 'molfile'){item.setValue(molfile)} });
          button.up('KetcherForm').close();
    },
    
    submitQuery: function(button) {
        var form    = button.up('form'),
        values = form.getValues();
        //console.log(values.endpoint);

        var grid = form.query('dynamicgrid2')[0];
        grid.store.proxy.actionMethods = {read: 'POST'};
        grid.store.proxy.extraParams = values;
        grid.store.proxy.api.read = '/core_api_calls/search_by_smiles.json';
        grid.store.load({params: { offset: 0, limit: 100}});
        grid.store.on('load',function(){form.doLayout()});
        var grid_title = '';
        if (values.search_type == '1') {grid_title = 'Exact structure match'};
        if (values.search_type == '2') {grid_title = 'Substructure structure'};
        if (values.search_type == '3') {grid_title = 'Similarity search'};
        grid.setTitle(grid_title);
    },
    
    launchDataView: function(button) {
        var grid = button.up('dynamicgrid2');
        structureViewStore = grid.store;
        var view = Ext.widget('StructureViewer');    
   //     console.log(grid.store);  
    
    }
        
    }
);
