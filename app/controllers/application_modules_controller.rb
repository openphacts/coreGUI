########################################################################################
#  
#  Copyright H. Lundbeck A/S
#  This file is part of LSP4All.
#  
#  LSP4All is free software; you can redistribute it and/or modify
#  it under the terms of the GNU General Public License as published by
#  the Free Software Foundation; either version 2 of the License, or (at
#  your option) any later version.
#  
#  LSP4All IS MADE AVAILABLE FOR DISTRIBUTION WITHOUT ANY FORM OF WARRANTY TO THE 
#  EXTENT PERMITTED BY APPLICABLE LAW.  THE COPYRIGHT HOLDER PROVIDES THE PROGRAM \"AS IS\" 
#  WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT  
#  LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR 
#  PURPOSE. THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM LIES
#  WITH THE USER.  SHOULD THE PROGRAM PROVE DEFECTIVE IN ANY WAY, THE USER ASSUMES THE
#  COST OF ALL NECESSARY SERVICING, REPAIR OR CORRECTION. THE COPYRIGHT HOLDER IS NOT 
#  RESPONSIBLE FOR ANY AMENDMENT, MODIFICATION OR OTHER ENHANCEMENT MADE TO THE PROGRAM 
#  BY ANY USER WHO REDISTRIBUTES THE PROGRAM SO AMENDED, MODIFIED OR ENHANCED.
#  
#  IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING WILL THE 
#  COPYRIGHT HOLDER BE LIABLE TO ANY USER FOR DAMAGES, INCLUDING ANY GENERAL, SPECIAL,
#  INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR INABILITY TO USE THE
#  PROGRAM (INCLUDING BUT NOT LIMITED TO LOSS OF DATA OR DATA BEING RENDERED INACCURATE
#  OR LOSSES SUSTAINED BY THE USER OR THIRD PARTIES OR A FAILURE OF THE PROGRAM TO 
#  OPERATE WITH ANY OTHER PROGRAMS), EVEN IF SUCH HOLDER HAS BEEN ADVISED OF THE 
#  POSSIBILITY OF SUCH DAMAGES.
#  
#  You should have received a copy of the GNU General Public License
#  along with this program; if not, write to the Free Software
#  Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.
#  
########################################################################################


class ApplicationModulesController < ApplicationController

  def index

    respond_to do |format|
      format.html # index.html.erb
      format.xml { render :xml => "" }
      format.json {

        nodes = Array.new
        if params[:type] == "grid"
          puts("type=grid")
          nodes = YAML.load_file(File.join(Rails.root,'config','application_modules.yml'))
          # leafNodes = ApplicationModule.all(:joins => :application_type, :conditions => ["application_types.name = 'grid'"])
          # leafNodes.each { |d|
          #   nodes.push({:text => d.name, :id => d.id, :url => d.url, :home => d.home, :xtype => d.xtype})
          # }
        elsif params[:node] == "root"
          puts("node=root")
          nodes = YAML.load_file(File.join(Rails.root,'config','user_applications.yml'))
          # application_modules = UserApplication.root_applications
          # unless application_modules.nil?
          #   application_modules.each { |d|
          #     nodes.push({:text => d.name, :id => d.id, :url => d.url, :home => d.home, :application_type => d.application_type, :xtype => d.application_module.xtype, :leaf => d.application_module.has_children? ? false : true, :cls => d.application_module.has_children? ? 'folder' : 'file'})
          #   }
          # end
        else
          puts("node=id")
          node = ApplicationModule.find(params[:node])
          node.children.each { |d|
            nodes.push({:text => d.name, :id => d.id, :url => d.url, :home => d.home, :application_type => d.application_type.name, :xtype => d.xtype, :leaf => d.has_children? ? false : true, :cls => d.has_children? ? 'folder' : 'file'})
          }
        end

        render :json => nodes.to_json

      }
    end
  end

  def new

  end

  def create

  end

  def show

  end

  def edit

  end

  def update

  end

end
