Checking out this code
======================

To check out this code from GitHub install Git on your development machine and add
your public RSA key to your GitHub account.
Then on the command line type
$ git clone git@github.com:openphacts/coreGUI/whatever_branch_you_are_interested_in

Licence
=======

GPL http://www.gnu.org/licenses/gpl.html

Git Flow
========

It may help to use the [Git Flow](https://github.com/nvie/gitflow "Git flow branching model for git") tool or concepts to develop feature branches etc.

Setting it up
=============

Deployment
----------

To set up the environment go to the genericGUI page on our OpenPHACTS wiki at
wiki.openphacts.org and follow the instructions there.
In case of problems please send [feedback](http://www.openphacts.org/explorer/160 "openPHACTS feedback")or contact pmu@openphacts.org

Set the mailer constants, database file and application specific urls
---------------------------------------------------------------------

Copy the file config/app\_settings.yml\_example to config/app\_settings.yml and change
the default values to whatever is appropriate for your application.  
Change config.action\_mailer.perform_deliveries = false to true in config/environments/development.rb
if you want it to send feedback emails in development mode.  
Copy config/database.example.yml to config/database.yml and enter your database details as appropriate.

Development
-----------

The openPHACTS explorer uses [ExtJS](http://www.sencha.com/products/extjs "ExtJS framework from Sencha") and [Ruby on Rails](http://www.rubyonrails.org "Ruby on Rails web framework"). 
We recommend you look at some tutorials eg http://developer.sencha.com/pathway/ext-js-4 and http://guides.rubyonrails.org
to help you get started.

### Adding a new tab and form to the Navigation tree

To add a new tab to the Navigation tree you need to change LSP.store.NavigationTree store in the 
main public/app folder. A node has leaf set to "true" if it has no children. Set 
leaf to "false" and add an array of children if the node has any leaf nodes. Refer to the embedded
JSON in the Navigation Tree store to see the the default tree that is rendered. 
The xtype defines what form will be loaded when the node is clicked on.

When the tree is clicked on the GuiComponents store is asked to return data about that form. Add some
details about the new form to the json data in store/GuiComponent.js 
      
In case you are only building a stand alone widget that goes on an existing page
you can skip the above steps and just create the javascript view, controller,
model and store as needed and make sure that the they reference each other and that
the view defines the widget alias. Then all you need to put it in a page is to add
it to an items: tag usings xtype: my_widget_name or Ext.Widget('my_widget_name').

### Adding images
The OPS Explorer uses the rails asset pipeline to load images. Any new ones should be added
to app/assets/images and referred to as /assets/image.png etc in any css
      
### Adding a controller method that accepts Ajax post or get

Once you have the view up it is time to get some data into it. This is done by
having the widget get data from the server via a Ajax call. These are either set
up as a ExtJS proxy on the ExtJs model where it is stored in a ExtJS store for
later use (preferred method) or alternatively as a Ajax query from inside the 
controller. This later option is only preferred for simple data that is not 
needed outside the scope of a single function.

  1.  If you need a new Rails method implement this in the appropriate rails 
      controller or find the url for the method needed.
  2.  Configure you Ajax proxy or url method to hit this controller method and 
      make it fire/load the call.
  3.  If you defining a new controller method you need to configure the rails 
      routes file \config\routes.rb so that ExtJS accepts gets or posts on these
      methods. 
      
Use Firebug to track how this goes and for debugging any errors that might remain.             

### Debugging the OPS GUI

When developing the Javascript code for the GUI an essential tool to use is the 
FireBug extension to Firefox. This tool (and others like it for Chrome) lets you
see all communication between the web front end and the server. In addition,
during development mode it allows for inspection of DOM objects and debugging of
the Javascript code. 

For debugging the Ruby on Rails server part the best way is simply to look at the
/log/development.log file and the console (see further down under Rails for details).
For Ruby/Rails syntax use interactive rails console, start with 'rails c' from inside the project
directory, this uses ruby IRB but includes all the rails specific code. 
