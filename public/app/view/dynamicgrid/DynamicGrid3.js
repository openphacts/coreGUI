Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('Ext.ux.grid', 'ext/examples/ux/grid');
Ext.define('LSP.view.dynamicgrid.DynamicGrid3', {
    extend: 'Ext.grid.Panel',  
    alias: 'widget.dynamicgrid3',
    requires: [
		'Ext.grid.RowNumberer',
		'Ext.form.*',
		'Ext.ux.grid.FiltersFeature',
		'LSP.view.dynamicgrid.feature.selectable'
	   ],
	  autoScroll: true,
    layout: 'fit',
    gridBaseTitle: '',
    readUrl: '',
    limit: 100,
    recordsLoaded: 0,
    initComponent: function(){
        
        // initializing features for the grid
        var groupingFeature = Ext.create('Ext.grid.feature.Grouping',{
        groupHeaderTpl: 'Group: {name} ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})'
        });        
        var filters = {
          ftype: 'filters',
          encode: true, // json encode the filter query
          local: true   // defaults to false (remote filtering)
        };
        // this feature allows for selection of text in the grid by changing the underlaying style for the cell
        var cellTextSelector = {
          ftype: 'selectable', 
          id: 'selectable'
        };  
        var config = {
            
            store: Ext.create('LSP.store.DynamicGrid'),
    
            tbar : [
                      {
                        xtype: 'button',
                        text: 'Retrieve next 100 records',
                        tooltip: 'On each click 100 additional records\nare added to the resultset',
                        itemId: 'nextRecords',
                        iconCls: 'icon-new',
                        disabled: true
                      },
//                       {
//               					xtype: 'exporterbutton',
//               					name: 'exporter-button',
//               					itemId: 'exporter_button_id',
//                         text: 'Download to Excel',
//                         iconCls: 'icon-csv',
//                       },
//                       {
//               					xtype: 'sdfexporterbutton',
//               					itemId: 'sdf_exporter_button_id',
//                         text: 'Download SDF-file',
//                         iconCls: 'icon-sdf',
//                         hidden: true,
//                       }
                    ],
            columns:[{name: 'temp', hidden:true}],  
            rowNumberer: false,
            defaultWidth : 200,
            features: [groupingFeature, filters, cellTextSelector]
        };
          
        Ext.apply(this, config);  
        Ext.apply(this.initialConfig, config);
        this.callParent(arguments);
    }  

});