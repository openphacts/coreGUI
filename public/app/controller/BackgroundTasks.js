Ext.define('LSP.controller.BackgroundTasks', {
    extend: 'Ext.app.Controller',
    views: ['background_tasks.BackgroundTasksForm'],
    	refs: [{
		ref: 'tasksContainer',
		selector: '#tasks_container'
	}],
    task_list: new Array(),

    init: function() {
        this.control({
            '#background_tasks_form': {
                taskadded: this.addNewTask
                }
        });
    },

   addNewTask: function(uuid) {
       console.log('adding task with uuid : ' + uuid);
       this.task_list.push(uuid);
       var task = Ext.create('LSP.view.background_tasks.BackgroundTask', {});
       task.down('#type').setText(uuid);
       task.down('#percentage').setText('blah');
       task.down('#status').setText('blah');
       this.getTasksContainer().add(task);
       var tsv_status_store = Ext.create('LDA.store.TSVStatusStore', {});
       tsv_status_store.setTask(task);
       tsv_status_store.load(
           {params: {
               uuid : uuid
           },
       callback: function(records, operation, success) {
           if (success) {
               console.log('success tsv status');
               status = records[0].data.status;
               percentage = records[0].data.percentage;
               this.getTask().down('#percentage').setText(percentage);
               this.getTask().down('#status').setText(status);               
           } else {
               console.log('fail tsv status');
           }
       }});
   }
});
