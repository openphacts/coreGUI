Ext.define('LSP.view.background_tasks.BackgroundTasksForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.BackgroundTasksForm',
    itemId: 'tasks_container',
    closable: true,
    header: false,
    layout:'fit',
    border:false,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function() {
        this.addEvents('taskadded');
        this.callParent(arguments);
    },

    items: []
});
