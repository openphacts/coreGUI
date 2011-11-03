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


namespace :db do
  namespace :seed do
    
    desc "Create seed data from relevant tabels"
    task :write => :environment do 

      dir = RAILS_ROOT + '/db'
      FileUtils.chdir(dir)
    
      puts "Writing seed application data file..."
        f = File.open("seeds_appmodel_data.rb", 'w+') 
        at = ApplicationType.find(:all,:order => :id)
        f.puts "\nApplicationType.delete_all"
        at.each do |a|
          f.puts "atn = ApplicationType.new"
          f.puts "atn.id = #{a.id}"
          f.puts "atn.name = '#{a.name}'"
          f.puts "atn.default_css_class = '#{a.default_css_class}'"
          f.puts "atn.save!"
        end
        
        am = ApplicationModule.find(:all, :order => :id)
        f.puts "\nApplicationModule.delete_all"
        am.each do |a|
          f.puts "amn = ApplicationModule.new"
          f.puts "amn.id = #{a.id}"
          f.puts "amn.name = '#{a.name}'"
          f.puts "amn.application_type_id = #{a.application_type_id}"
          f.puts "amn.xtype = '#{a.xtype}'"
          f.puts "amn.home = '#{a.home}'"
          f.puts "amn.url = '#{a.url}'"
          f.puts "amn.ancestry = '#{a.ancestry}'"
          f.puts "amn.ancestry_depth = #{a.ancestry_depth}"
          f.puts "amn.save!"
        end
        
        ro = Role.find(:all, :order => :id)
        f.puts "\nRole.delete_all"
        ro.each do |r|
          f.puts "rn = Role.new"
          f.puts "rn.id = #{r.id}"
          f.puts "rn.name = '#{r.name}'"
          f.puts "rn.save!"
        end
        
        rp = RoleProfile.find(:all, :order => :id)
        f.puts "\nRoleProfile.delete_all"
        rp.each do |r|
           f.puts "rn = RoleProfile.new"
           f.puts "rn.id = #{r.id}"
           f.puts "rn.role_id = #{r.role_id}"
           f.puts "rn.application_module_id = #{r.application_module_id}"
           f.puts "rn.priv_create = #{r.priv_create}"
           f.puts "rn.priv_read = #{r.priv_read}"
           f.puts "rn.priv_update = #{r.priv_update}"
           f.puts "rn.priv_destroy = #{r.priv_destroy}"
           f.puts "rn.save!"
        end
        
        # TODO: Somehow add the Administrator user in a secure way
        f.puts "User.delete_all"  
        f.puts "User.new(:id => 1, :login => 'admin', :password => 'admin', :password_confirmation => 'admin', :email => 'lsp4all@lsp4all.com').save!"
        
        ru = RoleUser.find(:all, :order => :id)
        f.puts "\nRoleUser.delete_all"
        ru.each do |r|
           f.puts "rn = RoleUser.new"
           f.puts "rn.id = #{r.id}"
           f.puts "rn.user_id = #{r.user_id}"
           f.puts "rn.role_id = #{r.role_id}"
           f.puts "rn.save!"
        end


	     f.close
       puts "Finished writing seed application data file"
    end
    
  end
end