Ext.define('CS.applet.JSpecView', {
    extend: 'Ext.Component',
    alias: 'widget.jspecview',
    backgroundcolor: '#ffffff',
    layout: 'fit',
    gridon: false,
    reverseplot: false,
    border: 0,
    specId: 0,
    autoEl: {
        tag: 'object'
    },
    onRender: function () {
        if (Ext.isIE) {
            // IE specific code here
            this.autoEl = Ext.apply({
                classid: 'clsid:8AD9C840-044E-11D1-B3E9-00805F499D93',
                codebase: 'http://java.sun.com/products/plugin/autodl/jinstall-1_5_0-windows-i586.cab#Version=1,5,0,0',
                children: [
                    {
                        tag: 'param',
                        name: 'code',
                        value: 'jspecview.applet.JSVApplet.class'
                    },
                    {
                        tag: 'param',
                        name: 'archive',
                        value: 'lib/third/jspecview/jspecview.jar'
                    },
                    {
                        tag: 'param',
                        name: 'script',
                        value: 'load ' + CS.config.Settings.baseUrl + '/FilesHandler.ashx?type=blob&disp=1&id=' + this.specId + '; reverseplot ' + this.reverseplot + '; gridon ' + this.gridon + '; backgroundcolor ' + this.backgroundcolor + ';'
                    },
                    {
                        tag: 'param',
                        name: 'scriptable',
                        value: 'true'
                    },
                    {
                        tag: 'param',
                        name: 'mayscript',
                        value: 'true'
                    }
                ]
            }, this.initialConfig, this.autoEl);

        }
        else {
            this.autoEl = Ext.apply({
                classid: 'java:jspecview.applet.JSVApplet.class',
                type: 'application/x-java-applet;version=1.5',
                archive: '/lib/third/jspecview/jspecview.jar',
                children: [
                    {
                        tag: 'param',
                        name: 'script',
                        value: 'load ' + CS.config.Settings.baseUrl + '/FilesHandler.ashx?type=blob&disp=1&id=' + this.specId + '; reverseplot ' + this.reverseplot + '; gridon ' + this.gridon + '; backgroundcolor ' + this.backgroundcolor + ';'
                    },
                    {
                        tag: 'param',
                        name: 'mayscript',
                        value: 'true'
                    }
                ]
            }, this.initialConfig, this.autoEl);
        }

        this.callParent(arguments);
    },
    resize: function (width, height) {
        if (this.getEl() != null) {
            this.getEl().dom.style.width = width + "px";
            this.getEl().dom.style.height = height + "px";
        }
    }
});
