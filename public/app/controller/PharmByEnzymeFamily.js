Ext.define('LSP.controller.PharmByEnzymeFamily', {
        extend:'LSP.controller.grids.DynamicGrid',

    views:['pharm_by_enzyme_family.PharmEnzymeForm','pharm_by_enzyme_family.PharmByEnzymeFamilyScrollingGrid'],
    // views:['pharm_by_enzyme_family.PharmEnzymeForm','pharm_by_enzyme_family.PharmByEnzymeFamilyGrid', 'tree_selector_forms.EnzymeTreeForm'],

    // stores:['LDA.store.EnzymeFamilyPaginatedStore'],

    refs:[
        {
            ref:'gridView', // reference to the view
            selector:'#pharmByEnzymeFamilyGrid'
        },
        {
            ref:'formView',
            selector:'PharmEnzymeForm'
        },
        {
            ref:'submitButton',
            selector:'#submitEnzymePharm_id'
        
        }, {
		ref: 'filterContainer',
		selector: 'PharmEnzymeForm #filterSelectorContainer_id'
	}
    ],
    filters: undefined,
	current_uri: undefined,

    init:function () {
	    console.log('PharmByEnzymeFamily: init()');
        this.control({
            'PharmEnzymeForm button[action=enz_tree]':{
                click:this.launchEnzyme
            },
            'EnzymeTreeForm button[action=get_enzyme]':{
                click:this.getEnzyme
            },
            'EnzymeTreeForm button[action=hide_enzyme_form]':{
                click:this.hideEnzyme
            },
            'PharmEnzymeForm #submitEnzymePharm_id':{
                click:this.submitQuery
            },
            'PharmEnzymeForm':{
                afterrender:this.prepGrid,
                historyToken:this.handleHistoryToken
            },
            'PharmEnzymeForm button[action=add_filter_form]': {
            click: this.addFilterForm
            },
            'PharmEnzymeForm button[action=add_completed_organism_filter]': {
                click: this.addCompletedOrganismFilter
            },
            'PharmEnzymeForm button[action=add_completed_activity_filter]': {
                click: this.addCompletedActivityFilter
            },
            'PharmEnzymeForm #provId' : {
                change: this.onProvChange
            },
            '#pharmByEnzymeFamilyGrid #csvDownloadProxy_id': {
                click: this.prepCSVFile//,
                //scope: this
            }
        });
    },


    handleHistoryToken:function (historyTokenObject) {
 	    console.log('PharmByEnzymeFamily: handleHistoryToken()');
        if (historyTokenObject.ec) {
			this.current_uri = "http://purl.uniprot.org/enzyme/" + historyTokenObject.ec;
            var dg = this.getGridView();
            var store = dg.getStore();
            dg.setLoading(true);
            //store.setURI("http://purl.uniprot.org/enzyme/" + historyTokenObject.ec);
	    store.proxy.extraParams.uri = "http://purl.uniprot.org/enzyme/" + historyTokenObject.ec;
			//use the reader uri when retrieving the count after store load
			store.proxy.reader.uri = "http://purl.uniprot.org/enzyme/" + historyTokenObject.ec;
            this.fetchTotalResults();
        }
    },

	getCountStore: function() {
		return Ext.create('LDA.store.EnzymeFamilyCountStore');
	},


    // Launch Enzyme class selection window
    launchEnzyme:function (button) {
	    console.log('PharmByEnzymeFamily: launchEnzyme()');
	    // Launch the window
	    var view = Ext.ComponentQuery.query('EnzymeTreeForm')[0];
	    if (view) {
	        console.log('enzyme show');
	        view.show();
	    } else {
	        console.log('enzyme create');
	        view = Ext.widget('EnzymeTreeForm');
	        view.show();
	    }
	},

    hideEnzyme:function (button) {
	    console.log('PharmByEnzymeFamily: hideEnzyme()');
	    var view = Ext.ComponentQuery.query('EnzymeTreeForm')[0];
	    if (view) {
	        console.log('enzyme hide');
	        view.hide();
	    }
	},


	    // Get selection from the enzyme tree window
	    getEnzyme:function (button) {
			console.log('PharmByEnzymeFamily: getEnzyme()');
	        var tree = button.up().up().down('enzymeTree');
	        var selected = tree.getView().getSelectionModel().getSelection();
	        var sel_data = selected[0].data;

//	        if (sel_data.leaf) {
//	            Ext.Msg.show({
//	                title:'Incorrect selection',
//	                msg:'Please select an enzyme class (folder).',
//	                buttons:Ext.MessageBox.OK,
//	                icon:Ext.MessageBox.INFO
//	            });
//	        } else {
	            var disp_field = this.getFormView().getForm().findField('enzyme_family');
	            disp_field.setValue('<b>' + sel_data.ec_number + ' : ' + sel_data.name + '</b>');
	            var ec_num_field = this.getFormView().getForm().findField('ec_number');
	            ec_num_field.setValue(sel_data.ec_number);
	            var enz_name_field = this.getFormView().getForm().findField('enz_name');
	            enz_name_field.setValue(sel_data.name);
	            this.hideEnzyme('');
		    this.getSubmitButton().enable();
//	        }
	    },

	    submitQuery:function (button) {
		console.log('PharmByEnzymeFamily: submitQuery()');
	        var form = button.up('form');
	        button.disable();
	        var values = form.getValues();
			if (this.current_uri == "http://purl.uniprot.org/enzyme/" + values.ec_number) {
				var dg = this.getGridView();
				var store = dg.store;
				store.proxy.extraParams.uri = this.current_uri;
				store.proxy.reader.uri = this.current_uri;
				//store.setURI("http://purl.uniprot.org/enzyme/" + this.current_uri);
				dg.setLoading(true);
				//loading the store is done after the total results are fetched
				this.fetchTotalResults();
			} else {
		        Ext.History.add('!p=PharmEnzymeForm&ec=' + values.ec_number);
			}
	    }
	
})
;
