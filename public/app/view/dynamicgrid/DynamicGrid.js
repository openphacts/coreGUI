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
		var tar = record.data.target_title;
                var cw_tar = record.data.target_pref_label_item
		var smi = record.data.compound_smiles;
                var cw_comp = record.data.cw_compound_uri;

		if (tar) {
			var cmpValueMenu = new Ext.menu.Menu({
				items: [{
					xtype: 'textfield',
					value: cmp
				}, {
					xtype: 'textfield',
					value: tar
				}, {
					xtype: 'textfield',
					value: smi
				}]
			});

			var contextMenu = new Ext.menu.Menu({
				items: [{
					text: 'Search for compound by name',
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
					text: 'Search for target by name',
					itemId: 'searchForTarget',
					iconCls: 'menu-search-target',
					handler: function() {
						//                        console.log('Search for target by name');
						//                        console.log(tar);
                                                if (cw_tar == "") {
                                                    Ext.History.add('!p=TargetByNameForm&s=' + tar);
                                                } else {
						    Ext.History.add('!p=TargetByNameForm&u=' + cw_tar);
                                                }
					}
				}, {
					text: 'Copy Data',
					menu: cmpValueMenu
				}]
			});
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
					text: 'Search for compound by name',
					itemId: 'searchForCompoundByName',
					iconCls: 'menu-search-compound',
					handler: function() {
						//                        console.log('Search for compound by name');
						//                        console.log(cmp);
						Ext.History.add('!p=CmpdByNameForm&s=' + cmp);
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
