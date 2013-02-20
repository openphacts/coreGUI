Ext.Loader.setConfig({
	enabled: true
});
Ext.Loader.setPath('Ext.ux.grid', 'ext/examples/ux/grid');
Ext.define('LSP.view.dynamicgrid.DynamicGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.dynamicgrid',
	requires: ['LDA.helper.FilterUnitsReader', 'LDA.store.FilterUnitsStore', 'LDA.model.FilterUnitsModel', 'Ext.grid.RowNumberer', 'Ext.form.*', 'Ext.ux.grid.FiltersFeature', 'Ext.selection.CellModel', 'LSP.view.dynamicgrid.feature.selectable', 'LSP.view.ux.download.FileDownload'],

    viewConfig: {
        enableTextSelection: true
    },


    exportStore: null,
	exportCSVReady: false,
	exportSDFReady: false,
  rowNumberer: true,
	defaultWidth: 200,
	showMenu: function(x, y, record) {
		var cmp = record.data.compound_pref_label;
                var target_organisms = record.data.target_organisms;
                var tar;
                if (target_organisms) {
	            tar = record.data.target_organisms[0];
                }
                var cw_tar = record.data.target_pref_label_item
		var smi = record.data.compound_smiles;
                var cw_comp = record.data.cw_compound_uri;
                var cs_compound_uri = record.data.cs_compound_uri;
                var cs_menu_item;
                if (cs_compound_uri != null) {
                    cs_menu_item = Ext.create('Ext.menu.Item', {text: 'View chemspider info', iconCls: 'menu-search-compound', handler: function() {
                        var csid = cs_compound_uri.match(/http:\/\/rdf.chemspider.com\/(\d+)/)[1];
                        if (parseInt(csid) >= 1) {
                            Ext.create('CS.view.CompoundWindow').showCompound(csid);
                        }

                    }}); 
                }
                var menu_item;
                if (target_organisms) {
                if (record.data.target_organisms.length >1) {
                    target_items = new Array();
                    target_text_items = new Array();

                    Ext.each(record.data.target_organisms, function (item, index) {
                        target_items.push({
			                text: item.organism,
					iconCls: 'menu-search-target',
					handler: function() {
                                           Ext.History.add('!p=TargetByNameForm&s=' + item.organism);
					}
				    });
                        target_text_items.push({xtype: 'textfield', value: item.organism});
                    });
                    var target_menu = Ext.create('Ext.menu.Menu', {text: 'View target info', items: target_items});
                    var target_text = Ext.create('Ext.menu.Menu', {text: 'View target info', items: target_text_items});
                    menu_item = Ext.create('Ext.menu.Item', {text: 'View target info', iconCls: 'menu-search-target', menu: target_menu});
                    text_menu_item = Ext.create('Ext.menu.Item', {text: 'Copy target data', menu: target_text_items});        
                } else {
                    menu_item = Ext.create('Ext.menu.Item', {text: 'View target info', iconCls: 'menu-search-target', handler: function() {Ext.History.add('!p=TargetByNameForm&s=' + record.data.target_organisms[0].organism)}}); 
                    text_menu_item = Ext.create('Ext.menu.Item', {text: 'Copy target data', menu: record.data.target_organisms[0].organism});
                }
                }

		if (tar) {
			var cmpValueMenu = new Ext.menu.Menu({
				items: [{
					xtype: 'textfield',
					value: cmp
				}, 
                                 text_menu_item, 
                                {
					xtype: 'textfield',
					value: smi
				}]
			});

			var contextMenu = new Ext.menu.Menu({
				items: [{
					text: 'View compound info',
					itemId: 'searchForCompoundByName',
					iconCls: 'menu-search-compound',
					handler: function() {
						//                        console.log('Search for compound by name');
						//                        console.log(cmp);
						Ext.History.add('!p=CmpdByNameForm&u=' + cw_comp);
					}
				}, //{
                                //   text: 'View target info',
                                //   iconCls: 'menu-search-target',
                                //   menu: target_menu
                                //},
                                   menu_item,
                                   {
					text: 'Search for compound by SMILES',
					itemId: 'searchForCompoundBySMILES',
					iconCls: 'menu-search-compound',
					handler: function() {
						//                        console.log('Search for compound by SMILES');
						//                        console.log(cmp);
						Ext.History.add('!p=SimSearchForm&sm=' + smi + '&st=exact');
					}
				}, {
					text: 'Copy Data',
					menu: cmpValueMenu
				}]
			});
                        if (cs_menu_item != null) {
                          contextMenu.insert(contextMenu.items.length -1 , cs_menu_item);
                        }
			contextMenu.showAt(x, y);
		} else {
			var cmpValueMenu = new Ext.menu.Menu({
				items: [{
					xtype: 'textfield',
					value: cmp
				}, {
					xtype: 'textfield',
					value: smi
				}]
			});

			var contextMenu = new Ext.menu.Menu({
				items: [{
					text: 'View compound info',
					itemId: 'searchForCompoundByName',
					iconCls: 'menu-search-compound',
					handler: function() {
						//                        console.log('Search for compound by name');
						//                        console.log(cmp);
						Ext.History.add('!p=CmpdByNameForm&u=' + cw_comp);
					}
				}, {
					text: 'Search for compound by SMILES',
					itemId: 'searchForCompoundBySMILES',
					iconCls: 'menu-search-compound',
					handler: function() {
						//                        console.log('Search for compound by SMILES');
						//                        console.log(cmp);
						Ext.History.add('!p=SimSearchForm&sm=' + smi + '&st=exact');
					}
				}, {
					text: 'Copy Data',
					menu: cmpValueMenu
				}]
			});                        
                        if (cs_menu_item != null) {
                          contextMenu.insert(contextMenu.items.length -1 , cs_menu_item);
                        }
			contextMenu.showAt(x, y);
		}

	},
	    initComponent:function () {
			console.log('DynamicGrid: initComponent()');
			// initializing features for the grid
	        //var groupingFeature = Ext.create('Ext.grid.feature.Grouping', {
	        //    groupHeaderTpl:'Group: {name} ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})'
	        //});
	        var filters = {
	            ftype:'filters',
	            encode:true, // json encode the filter query
	            local:true   // defaults to false (remote filtering)
	        };
	        // this feature allows for selection of text in the grid by changing the underlaying style for the cell
	        var cellTextSelector = {
	            ftype:'selectable',
	            id:'selectable'
	        };
			//add the top bar here since the child may already have some docked items
		var temp_store = this.getExportStore();

	        var config = {

	            tbar:[{
	                    xtype:'button',
	                    text:'Download tsv file',
	                    tooltip:'Download results as a tab separated file',
	                    itemId:'tsvDownloadProxy_id',
	                    iconCls:'icon-csv',
	                    hidden:false,
                            disabled: true,
                            href: tsv_download_url,
                            renderTo: Ext.getBody()	
	                },
			    // 	                {
			    // 	                    xtype:'exporterbutton',
			    // 	                    formatter:'csv',
			    // 	                    swfPath:'app/view/ux/exporter/downloadify.swf',
			    // 	                    downloadImage:'app/view/ux/exporter/csv_button.png',
			    // 	                    itemId:'csvDownload_id',
			    // 	                    downloadName: 'ops_pharmacology_data.csv',
			    // store: temp_store,
			    // 	                    width:117,
			    // 	                    height:22,
			    // 	                    hidden:false,
			    // 	                    disabled:true
			    // 	                },
	                { xtype:'tbseparator' },
	                {
	                    xtype:'button',
	                    text:'Download SD file ',
	                    tooltip:'Download results in SD file format',
	                    itemId:'sdfDownloadProxy_id',
	                    iconCls:'icon-sdf',
			    // TODO sd file download is disabled for now
	                    hidden:true,
	                    disabled:true
	                },
	                // {
	                //     xtype:'exporterbutton',
	                //     formatter:'sdf',
	                //     swfPath:'app/view/ux/exporter/downloadify.swf',
	                //     downloadImage:'app/view/ux/exporter/sdf_button.png',
	                //     itemId:'sdfDownload_id',
	                //     downloadName: 'ops_pharmacology_data.sdf',	                    
	                //                       width:111,
	                //     height:22,
	                //     hidden:false,
	                //     disabled:true
	                // }
	            ],
	            features:[filters, cellTextSelector]
	        };

	        Ext.apply(this, config);
	        Ext.apply(this.initialConfig, config);
	        this.callParent(arguments);	
	    }
});
