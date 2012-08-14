/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 29/06/2012
 * Time: 11:06
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LDA.store.basestores.PaginatedFilteringStore', {
    extend:'LDA.store.basestores.FilteringStore',
	pageSize: 50,
	buffered: true,
	    proxy:{
	        type:'jsonp',
	        noCache:false,
	        startParam:undefined,
	limitParam:'_pageSize',
	pageParam:'_page',
	        //this is the only query param handled natively by the proxy, all others are handled in store config below.
	        callbackKey:'_callback'
	    },

    updateProxyURL:function () {
        this.proxy.url = this.BASE_URL +
            this.stringEncoder.toQueryString(
                {
                    // _page:this._page,
                    // _pageSize:this._pageSize,
                    assay_organism:this.assay_organism,
                    activity_type:this.activity_type,
                    activity_value:this.activity_value,
                    _format:this._format,
                    uri:this.uri
                });
        console.log('Proxy: ' + Ext.ClassManager.getName(this) + ' URL updated to: ' + this.proxy.url);
    },
    /**
     * Due to the asynchronous nature of the Linked Data API the total count is returned
     * by a separate call. The total can then be set using this function.
     */
    setTotalCount: function(count) {
        this.totalCount = count;
    }

});
