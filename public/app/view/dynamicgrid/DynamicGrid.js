Ext.Loader.setConfig({
	enabled: true
});
Ext.Loader.setPath('Ext.ux.grid', 'ext/examples/ux/grid');
Ext.define('LSP.view.dynamicgrid.DynamicGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.dynamicgrid',
	requires: ['Ext.grid.RowNumberer', 'Ext.form.*', 'Ext.ux.grid.FiltersFeature', 'Ext.selection.CellModel', 'LSP.view.dynamicgrid.feature.selectable'],

	rowNumberer: true,
	defaultWidth: 200,
	showMenu: function(x, y, record) {
		var cmp = record.data.compound_pref_label;
		var tar = record.data.target_title;
		var smi = record.data.compound_smiles;

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
					text: 'Search for target by name',
					itemId: 'searchForTarget',
					iconCls: 'menu-search-target',
					handler: function() {
						//                        console.log('Search for target by name');
						//                        console.log(tar);
						Ext.History.add('!p=TargetByNameForm&s=' + tar);
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
	        var groupingFeature = Ext.create('Ext.grid.feature.Grouping', {
	            groupHeaderTpl:'Group: {name} ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})'
	        });
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
	        var config = {

	            tbar:[
	                {
	                    xtype:'exporterbutton',
	                    formatter:'csv',
	                    swfPath:'app/view/ux/exporter/downloadify.swf',
	                    downloadImage:'app/view/ux/exporter/csv_button.png',
	                    itemId:'csvDownload_id',
	                    width:117,
	                    height:22,
	                    hidden:false
	                },
	                { xtype:'tbseparator' },
	                {
	                    xtype:'button',
	                    text:'Prepare SD-file download',
	                    tooltip:'Starts a two steep process to download the SD-file. This may take a while...',
	                    itemId:'sdfDownloadProxy_id',
	                    iconCls:'icon-sdf',
	                    hidden:false,
	                    disabled:true
	                },
	                {
	                    xtype:'exporterbutton',
	                    formatter:'sdf',
	                    swfPath:'app/view/ux/exporter/downloadify.swf',
	                    downloadImage:'app/view/ux/exporter/sdf_button.png',
	                    itemId:'sdfDownload_id',
	                    width:111,
	                    height:22,
	                    hidden:false,
	                    disabled:true
	                }
	            ],
	            features:[groupingFeature, filters, cellTextSelector]
	        };

	        Ext.apply(this, config);
	        Ext.apply(this.initialConfig, config);
	        this.callParent(arguments);	
	    }
});
