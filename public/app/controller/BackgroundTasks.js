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

   removeTask: function() {
       runner = this.getTaskRunner();
       if (runner) {
           runner.destroy();
       }
       this.close();
   },

   addNewTask: function(uuid, type) {
       console.log('adding task with uuid : ' + uuid);
       var me= this;
       this.task_list.push(uuid);
       var resource_type = type;
       var task = Ext.create('LSP.view.background_tasks.BackgroundTask', {});
       task.down('#type').setText(type + "....creating");
       task.down('#type').setHeight('auto');
       task.down('#cancel_button').on({
          click: {fn: me.removeTask, scope: task}
       });
       this.getTasksContainer().add(task);
       var tsv_status_store = Ext.create('LDA.store.TSVStatusStore', {});
       tsv_status_store.setUUID(uuid);
       tsv_status_store.setTask(task);
       tsv_status_store.setTasksContainer(this.getTasksContainer());
       var checkTSVStatus = function() {
       this.load(
           {params: {
               uuid : this.getUUID()
           },
       callback: function(records, operation, success) {
           if (success) {
               console.log('success tsv status');
               status = records[0].data.status;
               percentage = records[0].data.percentage;
               if (percentage != '0') {
                   this.getTask().down('#progress').updateProgress(percentage/100, '', true);
                   this.getTask().down('#type').setText(resource_type + "....creating(" + percentage + "%)");
               }
               if (status == 'finished') {
                   this.getTask().down('#progress').hide();
                   this.getTask().down('#type').setText(type + "...ready for download");
                   this.getTaskRunner().destroy();
                   tsv_download_button = Ext.create('Ext.Button', {
                       text:'Download tsv file',
                       tooltip:'Download results as a tab separated file',
                       itemId:'tsvDownloadProxy_' + this.getUUID(),
                       iconCls:'icon-csv',
                       hidden:false,
                       disabled: false,
                       margin: '2',
                       href: tsv_download_url,
                       renderTo: Ext.getBody()
                   });
                   tsv_download_button.href = tsv_download_url + "uuid=" + this.getUUID();
                   tsv_download_button.setParams();
                   this.getTask().add(tsv_download_button);
               } else if (status == 'failed') {
	               this.getTask().down('#progress').hide();
                   this.getTask().down('#type').setText(type + "...FAILED");
                   this.getTaskRunner().destroy(); 
               }              
           } else {
               console.log('fail tsv status');
           }
       }})
   };
   var runner = new Ext.util.TaskRunner();
   tsv_status_store.setTaskRunner(runner);
   var taskrunner = runner.start({
      run: checkTSVStatus,
       interval: 5000,
       scope: tsv_status_store
    });
   task.setTaskRunner(runner);       
   }
});
