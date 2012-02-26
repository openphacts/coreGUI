Ext.define('LSP.controller.SimSearchForm', {
    extend: 'Ext.app.Controller',

    views: ['larkc_sim_search.SimSearchForm', 'mol_editor_forms.KetcherForm', 'dataview.StructureViewer'],

    refs: [
        {
            ref: 'ssform',  // reference to the view
            selector: 'SimSearchForm'
        },
        {
            ref: 'strucGrid',
            selector: 'SimSearchForm dynamicgrid3'
        }
    ],

    init: function () {
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
    launchKetcher: function (button) {
        // Launch the window
        var view = Ext.widget('KetcherForm');
        // Check to see if we already have a structure to modify and load it if we do
        fields = this.getSsform().form.getFields().items;
        var molfile = '';
        fields.forEach(function (item) { if (item.name == 'molfile') { molfile = item.getValue(); var temp = 12; } });
        if (molfile != '') {
            document.getElementById('ketcher_box_id').contentWindow.ketcher.setMolecule(molfile);
        }
    },

    // Grep smiles from ketcher window and store in smiles field in form
    getSmiles: function (button) {
        var ketcher_window = document.getElementById('ketcher_box_id');
        // smiles is used for query
        smiles = ketcher_window.contentWindow.ketcher.getSmiles();
        // molfile is stored in hidden field for use when updating existing structure
        molfile = ketcher_window.contentWindow.ketcher.getMolfile();
        // We get all fields in form so that we can update the right one
        fields = this.getSsform().form.getFields().items;
        fields.forEach(function (item) { if (item.name == 'smiles') { item.setValue(smiles) } else if (item.name == 'molfile') { item.setValue(molfile) } });
        button.up('KetcherForm').close();
    },

    submitQuery: function (button) {
        var form = button.up('form');
        var this_controller = this;
        values = form.getValues();
        //console.log(values.endpoint);
        csid_string = "";
        var searchEngine = Ext.create('CS.engine.search.Structure', {
            listeners: {
                finished: function (sender, rid) {
                    searchEngine.loadCSIDs(function (csids) {
                        this_controller.hitCoreAPI(csids);
                        alert('Found Chemspider IDs (' + csids.length + '): ' + csids);
                    });
                }
            }
        });

        var grid_title = '';
        var search_type = '';
        var params = {};
        params['searchOptions.Molecule'] = values.smiles;

        if (values.search_type == '1') {    //  Exact structure search
            grid_title = 'Exact structure match';
            search_type = 'exact';
        }
        else if (values.search_type == '2') {   //  SubStructure search
            grid_title = 'Substructure structure';
            search_type = 'substructure';
        }
        else if (values.search_type == '3') {   //  Similarity search
            grid_title = 'Similarity search'
            search_type = 'similarity';
            //  In the future this parameters should be taken from the UI. 
            //  But right now in order to make Similarity search more realistic they are entered manually.
            params['searchOptions.Threshold'] = 0.99;
            params['searchOptions.SimilarityType'] = 'Tanimoto';
        }
        else {
            //  Unsupported search type...
        }
        this.getStrucGrid().setTitle(grid_title);
        searchEngine.doSearch(search_type, params);
    },

    hitCoreAPI: function (csid_string) {
      console.log(csid_string);
      grid = this.getStrucGrid();
      grid.store.proxy.actionMethods = {read: 'POST'};
      grid.store.proxy.extraParams = {csids: csid_string.join(',')};
      grid.store.proxy.api.read = '/core_api_calls/chemspider_info.json';
      grid.store.load({params: { offset: 0, limit: 100}});
      grid.store.on('load',function(){
          grid.doLayout();
      });
    },

    launchDataView: function (button) {
        var grid = button.up('dynamicgrid2');
        structureViewStore = grid.store;
        var view = Ext.widget('StructureViewer');
        //     console.log(grid.store);  

    }

}
);
