/**
 * Created by JetBrains RubyMine.
 * User: jameseales
 * Date: 06/03/2012
 * Time: 15:21
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LSP.model.Target', {
    extend: 'Ext.data.Model',
    autoLoad: true,
    fields: ['target_name', 'target_type','description','keywords','organism','synonyms']
});