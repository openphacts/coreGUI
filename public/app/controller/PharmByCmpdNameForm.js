Ext.define('LSP.controller.PharmByCmpdNameForm', {
    extend: 'Ext.app.Controller',
    views: ['pharm_by_cmpd_name2.PharmByCmpdNameForm'],

    refs: [
        {
            ref: 'gridView',  // reference to the view
            selector: '#pharmByCmpdGrid_id'
        },
        {
            ref: 'formView',
            selector: 'PharmByCmpdNameForm',
        },
        {
            ref: 'submitButton',
            selector: '#pharmByCmpdSubmit_id',
        
        },
    ],
    
    init: function() {
       
        this.control({
            'PharmByCmpdNameForm button[action=query_pharm_by_cmpd_name]': {
                click: this.submitQuery                
            },
            'PharmByCmpdNameForm conceptWikiCompoundLookup': {
                select: this.enableSubmit
            },             
        });
    },
    
    
   onLaunch: function() {
         this.control(
                      {
                        'PharmByCmpdNameForm' : {
                          afterrender: this.prepGrid       
                        },            
                      });                
     },
   
   prepGrid: function() {
      var grid_controller = this.getController('LSP.controller.grids.DynamicGrid');
      var grid_view = this.getGridView();
      var add_next_button = Ext.ComponentQuery.query('PharmByCmpdNameForm dynamicgrid3 #nextRecords')[0];   
      add_next_button.on('click', function() {
        var form_values = add_next_button.up('form').getValues();
        grid_controller.addNextRecords(grid_view,form_values);
      });
   },
    
   createGridColumns: function() {
      var grid_controller = this.getController('LSP.controller.grids.DynamicGrid');
      console.log(grid_controller);
      var this_gridview = this.getGridView();
      grid_controller.storeLoad(this_gridview);
   },
 
    enableSubmit: function(compoundLookup) {
        var form = this.getFormView();
        var button = form.query('button[action=query_pharm_by_cmpd_name]')[0];
        button.enable();
    },
 
    submitQuery: function(button) {
        var form = button.up('form');
        button.disable();
        var values = form.getValues();
        var grid = this.getGridView();
        grid_controller = this.getController('LSP.controller.grids.DynamicGrid');
        grid.store.proxy.actionMethods = {read: 'POST'};
 //values.compound_uri = 'http://chem2bio2rdf.org/chembl/resource/chembl_compounds/276734' //   http://chem2bio2rdf.org/chembl/resource/chembl_compounds/276734
        grid.store.proxy.extraParams = values;
//        grid.store.proxy.api.read = '/core_api_calls/pharm_by_compound_name.json';
        grid.store.proxy.api.read = grid.readUrl;
        grid.store.load({params: { offset: 0, limit: 100}});
        grid.store.on('load',function(){
          grid_controller.storeLoad(grid);
          form.doLayout();
          button.enable();
        });
        
        
    }
    
    
    }
);
