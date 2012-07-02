/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 29/06/2012
 * Time: 11:06
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LDA.store.basestores.PaginatedFilteringStore', {
    extend:'LDA.store.basestores.FilteringStore',
    _page:'',

    setPage:function (pageNumber) {
        if (typeof pageNumber == 'number') {
            this._page = pageNumber;
        }
    },

    updateProxyURL:function () {
        this.proxy.url = this.BASE_URL +
            Ext.Object.toQueryString(
                {
                    _page:this._page,
                    assay_organism:this.assay_organism,
                    activity_type:this.activity_type,
                    activity_value:this.activity_value,
                    _format:this._format,
                    uri:this.uri
                });
//        console.log('Proxy: ' + Ext.ClassManager.getName(this) + ' URL updated to: ' + this.proxy.url);
    }

});
