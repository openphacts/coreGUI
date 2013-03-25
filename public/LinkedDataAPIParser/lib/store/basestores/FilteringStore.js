Ext.define('LDA.store.basestores.FilteringStore', {
    extend:'LDA.store.basestores.BaseStore',
    assay_organism:'',
    activity_type:'',
    activity_value:'',
    activity_condition:'',
	activity_unit:'',
	sort_column:'',
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

    updateProxyURL:function () {
        this.proxy.url = this.BASE_URL +
            this.stringEncoder.toQueryString(
                {
                    assay_organism:this.assay_organism,
                    activity_type:this.activity_type,
                    //activity_value:this.activity_value,
                    //activity_condition:this.activity_condition,
                    _format:this._format,
                    uri:this.uri
                });

        this.setAllConditions();
        console.log('Proxy: ' + Ext.ClassManager.getName(this) + ' URL updated to: ' + this.proxy.url);
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

	getActivityConditionParam: function() {
		switch(this.activity_condition)
		{
		case '>':
	  	  return  'minEx-activity_value';
		  break;
		case '<':
		  return 'maxEx-activity_value';
	  	  break;
		case '=':
		  return 'activity_value';
		  break;
		case '<=':
		  return 'max-activity_value';
		  break;
		case '>=':
		  return 'min-activity_value';
		  break;
		}	
	}

});
