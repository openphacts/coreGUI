Ext.define('LSP.view.background_tasks.BackgroundTask', {
    extend: 'Ext.form.Panel',
    alias: 'widget.BackgroundTask',
    closable: true,
    header: false,
    layout:'fit',
    margin: 2,
    border: 1,
style: {
    borderColor: 'lightblue',
    borderStyle: 'solid'
},
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [{
            xtype: 'container',
            margin: '0 5 5 5',
            name: 'form_fields',
            layout: {
                type: 'hbox'
            },
            //style: 'background-color: #fff;',
            items: [{
                     xtype: 'label',
                     itemId: 'type',
                     text: 'Type',
                     margin: '0 0 0 10'
                   }]}, {
                     xtype: 'progressbar',
                     itemId: 'progress',
                     margin: '2'
                   }]
});
