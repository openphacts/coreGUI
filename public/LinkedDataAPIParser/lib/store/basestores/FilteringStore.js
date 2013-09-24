Ext.define('LDA.store.basestores.FilteringStore', {
    extend:'LDA.store.basestores.BaseStore',
    assay_organism:'',
    target_organism: '',
    activity_type:'',
    activity_value:'',
    activity_condition:'',
	activity_unit:'',
	sort_column:'',
	pchembl_value : '',
	pchembl_condition: '',
    filters: new Array(),
	
	// Set up the sort properties, check the direction of sort and prepend with
	// '-' if required
	sortColumn:function(arguments) {
		console.log('LDA.store.basestores.FilteringStore: sortColumn()');
		var sort_column = "?" + LDA.helper.LDAConstants.LDADataItems[arguments[0].property];
		var sort_direction = arguments[0].direction;
		if (sort_direction == "DESC") {
			sort_column = "DESC(" + sort_column + ")";
		}
		this.setSortColumn(sort_column);
	},

	setSortColumn:function(sortColumn) {
		this.sort_column = sortColumn;
	},

    setAssayOrganism:function (assayOrganism) {
        this.assay_organism = assayOrganism;
    },

   setTargetOrganism: function(targetOrganism) {
       this.target_organism = targetOrganism;
   },

    setActivityType:function (activityType) {
	//TODO fix LDA_PERMITTED_ACTIVITY_TYPES
        //if (LDA_PERMITTED_ACTIVITY_TYPES.indexOf(activityType) != -1) {
            this.activity_type = activityType;
        //}
    },

    setActivityValue:function (activityValue) {
	//TODO check for valid value, it's going to be a string really
        //if (typeof activityValue == 'number') {
            this.activity_value = activityValue;
        //}
    },

    setActivityCondition:function (activityCondition) {
	//TODO check whether condition is valid
            this.activity_condition = activityCondition;
    },

    setActivityUnit:function (activityUnit) {
	//TODO check whether condition is valid
            this.activity_unit = activityUnit;
    },

   setPChemblValue: function(pchemblValue) {
       this.pchembl_value = pchemblValue;
   },
   setPChemblCondition: function(pChemblCondition) {
       this.pchembl_condition = pChemblCondition;	
   },

    updateProxyURL:function () {
        this.proxy.url = this.BASE_URL +
            this.stringEncoder.toQueryString(
                {
                    assay_organism:this.assay_organism,
                    activity_type:this.activity_type,
                    target_organism: this.target_organism,
                    //activity_value:this.activity_value,
                    //activity_condition:this.activity_condition,
                    _format:this._format,
                    uri:this.uri,
                    app_key: this.app_key,
                    app_id: this.app_id
                });

        this.setAllConditions();
        this.setPChemblConditions();
        console.log('Proxy: ' + Ext.ClassManager.getName(this) + ' URL updated to: ' + this.proxy.url);
    },

    setPChemblConditions: function() {
 	// add the conditions property to the url
    console.log('setPchembl conditions');
	switch(this.pchembl_condition)
	{
	case '>':
  	  this.proxy.url = this.proxy.url + '&' + encodeURIComponent('minEx-pChembl') + '=' + encodeURIComponent(String(this.pchembl_value));
	  break;
	case '<':
	  this.proxy.url = this.proxy.url + '&' + encodeURIComponent('maxEx-pChembl') + '=' + encodeURIComponent(String(this.pchembl_value));
  	  break;
	case '=':
	  this.proxy.url = this.proxy.url + '&' + encodeURIComponent('pChembl') + '=' + encodeURIComponent(String(this.pchembl_value));
	  break;
	case '<=':
	  this.proxy.url = this.proxy.url  + '&' + encodeURIComponent('max-pChembl') + '=' + encodeURIComponent(String(this.pchembl_value));
	  break;
	case '>=':
	  this.proxy.url = this.proxy.url + '&' + encodeURIComponent('min-pChembl') + '=' + encodeURIComponent(String(this.pchembl_value));
	  break;
	}
    },

    setAllConditions: function() {
 	// add the conditions property to the url
	switch(this.activity_condition)
	{
	case '>':
  	  this.proxy.url = this.proxy.url + '&' + encodeURIComponent('minEx-activity_value') + '=' + encodeURIComponent(String(this.activity_value))
						+ '&' + encodeURIComponent('activity_unit') + '=' + encodeURIComponent(String(this.activity_unit));
	  break;
	case '<':
	  this.proxy.url = this.proxy.url + '&' + encodeURIComponent('maxEx-activity_value') + '=' + encodeURIComponent(String(this.activity_value))
				+ '&' + encodeURIComponent('activity_unit') + '=' + encodeURIComponent(String(this.activity_unit));
  	  break;
	case '=':
	  this.proxy.url = this.proxy.url + '&' + encodeURIComponent('activity_value') + '=' + encodeURIComponent(String(this.activity_value))
			+ '&' + encodeURIComponent('activity_unit') + '=' + encodeURIComponent(String(this.activity_unit));
	  break;
	case '<=':
	  this.proxy.url = this.proxy.url  + '&' + encodeURIComponent('max-activity_value') + '=' + encodeURIComponent(String(this.activity_value))
			+ '&' + encodeURIComponent('activity_unit') + '=' + encodeURIComponent(String(this.activity_unit));
	  break;
	case '>=':
	  this.proxy.url = this.proxy.url + '&' + encodeURIComponent('min-activity_value') + '=' + encodeURIComponent(String(this.activity_value))
			+ '&' + encodeURIComponent('activity_unit') + '=' + encodeURIComponent(String(this.activity_unit));
	  break;
	}
    },

    getAllConditionsEncoded: function() {
 	// add the conditions property to the url
	switch(this.activity_condition)
	{
	case '>':
  	  return  'activity_type=' + encodeURIComponent(this.activity_type) + '&activity_value_type=' + encodeURIComponent('minEx-activity_value') + '&activity_value=' + encodeURIComponent(String(this.activity_value));
	  break;
	case '<':
	  return 'activity_type=' + encodeURIComponent(this.activity_type) + '&activity_value_type=' + encodeURIComponent('maxEx-activity_value') + '&activity_value=' + encodeURIComponent(String(this.activity_value));
  	  break;
	case '=':
	  return 'activity_type=' + encodeURIComponent(this.activity_type) + '&activity_value_type=' + encodeURIComponent('activity_value') + '&activity_value=' + encodeURIComponent(String(this.activity_value));
	  break;
	case '<=':
	  return 'activity_type=' + encodeURIComponent(this.activity_type) + '&activity_value_type=' + encodeURIComponent('max-activity_value') + '&activity_value=' + encodeURIComponent(String(this.activity_value));
	  break;
	case '>=':
	  return 'activity_type=' + encodeURIComponent(this.activity_type) + '&activity_value_type=' + encodeURIComponent('min-activity_value') + '&activity_value=' + encodeURIComponent(String(this.activity_value));
	  break;
	}
    },

	getPChemblConditionParam: function() {
		switch(this.activity_condition)
		{
		case '>':
	  	  return  'minEx-pChembl';
		  break;
		case '<':
		  return 'maxEx-pChembl';
	  	  break;
		case '=':
		  return 'pChembl';
		  break;
		case '<=':
		  return 'max-pChembl';
		  break;
		case '>=':
		  return 'min-pChembl';
		  break;
		}	
	}

});
