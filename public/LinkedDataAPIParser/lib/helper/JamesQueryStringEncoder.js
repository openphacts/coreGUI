/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 02/07/2012
 * Time: 16:53
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LDA.helper.JamesQueryStringEncoder', {
    extend:'Ext.Base',

    toQueryString:function (object) {
        var paramObjects = [],
            params = [],
            i, j, ln, paramObject, value;

        for (i in object) {
            if (object.hasOwnProperty(i)) {
                paramObjects = paramObjects.concat(Ext.Object.toQueryObjects(i, object[i], false));
            }
        }

        for (j = 0, ln = paramObjects.length; j < ln; j++) {
            paramObject = paramObjects[j];
            value = paramObject.value;

            if (Ext.isEmpty(value)) {
                continue;
            }
            else if (Ext.isDate(value)) {
                value = Ext.Date.toString(value);
            }

            params.push(encodeURIComponent(paramObject.name) + '=' + encodeURIComponent(String(value)));
        }

        return params.join('&');
    }
});
