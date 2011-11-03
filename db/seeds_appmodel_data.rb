
ApplicationType.delete_all
atn = ApplicationType.new
atn.id = 1
atn.name = 'root'
atn.default_css_class = ''
atn.save!
atn = ApplicationType.new
atn.id = 2
atn.name = 'grid'
atn.default_css_class = 'icon-grid'
atn.save!
atn = ApplicationType.new
atn.id = 3
atn.name = 'rcmenu'
atn.default_css_class = 'icon-rightclick'
atn.save!
atn = ApplicationType.new
atn.id = 4
atn.name = 'folder'
atn.default_css_class = ''
atn.save!
atn = ApplicationType.new
atn.id = 5
atn.name = 'rcmenu_item'
atn.default_css_class = 'icon-menu'
atn.save!
atn = ApplicationType.new
atn.id = 6
atn.name = 'rcmenu_filter_column'
atn.default_css_class = 'icon-columns'
atn.save!
atn = ApplicationType.new
atn.id = 7
atn.name = 'app'
atn.default_css_class = ''
atn.save!
atn = ApplicationType.new
atn.id = 8
atn.name = 'application_module'
atn.default_css_class = ''
atn.save!
atn = ApplicationType.new
atn.id = 9
atn.name = 'rcmenu_sub'
atn.default_css_class = ''
atn.save!

ApplicationModule.delete_all
amn = ApplicationModule.new
amn.id = 1
amn.name = 'Application structure'
amn.application_type_id = 1
amn.xtype = ''
amn.home = ''
amn.url = ''
amn.ancestry = ''
amn.ancestry_depth = 0
amn.save!
amn = ApplicationModule.new
amn.id = 2
amn.name = 'Administration'
amn.application_type_id = 8
amn.xtype = ''
amn.home = ''
amn.url = ''
amn.ancestry = '1'
amn.ancestry_depth = 1
amn.save!
amn = ApplicationModule.new
amn.id = 3
amn.name = 'Users'
amn.application_type_id = 2
amn.xtype = 'dynamicgrid'
amn.home = 'Users grid'
amn.url = 'users.json'
amn.ancestry = '1/2'
amn.ancestry_depth = 2
amn.save!
amn = ApplicationModule.new
amn.id = 4
amn.name = 'Searching'
amn.application_type_id = 8
amn.xtype = ''
amn.home = ''
amn.url = ''
amn.ancestry = '1'
amn.ancestry_depth = 1
amn.save!
amn = ApplicationModule.new
amn.id = 5
amn.name = 'SPARQL'
amn.application_type_id = 2
amn.xtype = 'queryform'
amn.home = 'SPARQL form'
amn.url = 'rdf.json'
amn.ancestry = '1/4'
amn.ancestry_depth = 2
amn.save!
amn = ApplicationModule.new
amn.id = 14
amn.name = 'rc'
amn.application_type_id = 3
amn.xtype = ''
amn.home = ''
amn.url = ''
amn.ancestry = '1/2/3'
amn.ancestry_depth = 3
amn.save!
amn = ApplicationModule.new
amn.id = 16
amn.name = 'Compound'
amn.application_type_id = 8
amn.xtype = ''
amn.home = ''
amn.url = ''
amn.ancestry = '1/17'
amn.ancestry_depth = 2
amn.save!
amn = ApplicationModule.new
amn.id = 17
amn.name = 'OPS'
amn.application_type_id = 8
amn.xtype = ''
amn.home = ''
amn.url = ''
amn.ancestry = '1'
amn.ancestry_depth = 1
amn.save!
amn = ApplicationModule.new
amn.id = 18
amn.name = 'Compound by name'
amn.application_type_id = 2
amn.xtype = 'CmpdByNameForm'
amn.home = 'Compound by name'
amn.url = ''
amn.ancestry = '1/17/16'
amn.ancestry_depth = 3
amn.save!
amn = ApplicationModule.new
amn.id = 19
amn.name = 'Target'
amn.application_type_id = 8
amn.xtype = ''
amn.home = ''
amn.url = ''
amn.ancestry = '1/17'
amn.ancestry_depth = 2
amn.save!
amn = ApplicationModule.new
amn.id = 21
amn.name = 'Pharmacology'
amn.application_type_id = 8
amn.xtype = ''
amn.home = ''
amn.url = ''
amn.ancestry = '1/17'
amn.ancestry_depth = 2
amn.save!
amn = ApplicationModule.new
amn.id = 23
amn.name = 'Compound by structure'
amn.application_type_id = 2
amn.xtype = 'SimSearchForm'
amn.home = 'Compound Structure Search'
amn.url = ''
amn.ancestry = '1/17/16'
amn.ancestry_depth = 3
amn.save!
amn = ApplicationModule.new
amn.id = 24
amn.name = 'Target by name'
amn.application_type_id = 2
amn.xtype = 'TargetByNameForm'
amn.home = 'Target by name'
amn.url = ''
amn.ancestry = '1/17/19'
amn.ancestry_depth = 3
amn.save!
amn = ApplicationModule.new
amn.id = 25
amn.name = 'X-Target by sequence'
amn.application_type_id = 2
amn.xtype = 'temp'
amn.home = ''
amn.url = ''
amn.ancestry = '1/17/19'
amn.ancestry_depth = 3
amn.save!
amn = ApplicationModule.new
amn.id = 26
amn.name = 'Pharmacology by Target'
amn.application_type_id = 2
amn.xtype = 'PharmByTargetNameForm'
amn.home = 'Pharmacology by Target Name'
amn.url = ''
amn.ancestry = '1/17/21'
amn.ancestry_depth = 3
amn.save!
amn = ApplicationModule.new
amn.id = 27
amn.name = 'Pharmacology by Compound'
amn.application_type_id = 2
amn.xtype = 'PharmByCmpdNameForm'
amn.home = 'Pharmacology by Compound name'
amn.url = ''
amn.ancestry = '1/17/21'
amn.ancestry_depth = 3
amn.save!
amn = ApplicationModule.new
amn.id = 28
amn.name = 'Pharmacology by Enzyme family'
amn.application_type_id = 2
amn.xtype = 'PharmEnzymeForm'
amn.home = 'Compounds active against enzyme family'
amn.url = ''
amn.ancestry = '1/17/21'
amn.ancestry_depth = 3
amn.save!
amn = ApplicationModule.new
amn.id = 31
amn.name = 'Concept'
amn.application_type_id = 8
amn.xtype = ''
amn.home = ''
amn.url = ''
amn.ancestry = '1/17'
amn.ancestry_depth = 2
amn.save!
amn = ApplicationModule.new
amn.id = 32
amn.name = 'Summery'
amn.application_type_id = 2
amn.xtype = 'SummeryForm'
amn.home = 'Concept properties and relations'
amn.url = ''
amn.ancestry = '1/17/31'
amn.ancestry_depth = 3
amn.save!
amn = ApplicationModule.new
amn.id = 33
amn.name = 'Exemplars'
amn.application_type_id = 8
amn.xtype = ''
amn.home = ''
amn.url = ''
amn.ancestry = '1/17'
amn.ancestry_depth = 2
amn.save!
amn = ApplicationModule.new
amn.id = 34
amn.name = 'X-Polypharmacology Browser'
amn.application_type_id = 2
amn.xtype = 'temp'
amn.home = ''
amn.url = ''
amn.ancestry = '1/17/33'
amn.ancestry_depth = 3
amn.save!
amn = ApplicationModule.new
amn.id = 35
amn.name = 'X-Target Dossier'
amn.application_type_id = 2
amn.xtype = 'temp'
amn.home = ''
amn.url = ''
amn.ancestry = '1/17/33'
amn.ancestry_depth = 3
amn.save!
amn = ApplicationModule.new
amn.id = 36
amn.name = 'X-Chem-Bio Navigator'
amn.application_type_id = 2
amn.xtype = 'temp'
amn.home = ''
amn.url = ''
amn.ancestry = '1/17/33'
amn.ancestry_depth = 3
amn.save!

Role.delete_all
rn = Role.new
rn.id = 1
rn.name = 'Administrators'
rn.save!
rn = Role.new
rn.id = 2
rn.name = 'Users'
rn.save!
rn = Role.new
rn.id = 3
rn.name = 'Public'
rn.save!

RoleProfile.delete_all
rn = RoleProfile.new
rn.id = 2
rn.role_id = 1
rn.application_module_id = 2
rn.priv_create = 1
rn.priv_read = 1
rn.priv_update = 1
rn.priv_destroy = 1
rn.save!
rn = RoleProfile.new
rn.id = 3
rn.role_id = 1
rn.application_module_id = 4
rn.priv_create = 1
rn.priv_read = 1
rn.priv_update = 1
rn.priv_destroy = 1
rn.save!
rn = RoleProfile.new
rn.id = 4
rn.role_id = 2
rn.application_module_id = 4
rn.priv_create = 1
rn.priv_read = 1
rn.priv_update = 1
rn.priv_destroy = 0
rn.save!
rn = RoleProfile.new
rn.id = 5
rn.role_id = 3
rn.application_module_id = 4
rn.priv_create = 0
rn.priv_read = 1
rn.priv_update = 0
rn.priv_destroy = 0
rn.save!
rn = RoleProfile.new
rn.id = 6
rn.role_id = 3
rn.application_module_id = 17
rn.priv_create = 0
rn.priv_read = 1
rn.priv_update = 0
rn.priv_destroy = 0
rn.save!
rn = RoleProfile.new
rn.id = 7
rn.role_id = 3
rn.application_module_id = 18
rn.priv_create = 0
rn.priv_read = 1
rn.priv_update = 0
rn.priv_destroy = 0
rn.save!
User.delete_all
User.new(:id => 1, :login => 'admin', :password => 'admin', :password_confirmation => 'admin', :email => 'lsp4all@lsp4all.com').save!

RoleUser.delete_all
rn = RoleUser.new
rn.id = 1
rn.user_id = 1
rn.role_id = 1
rn.save!
rn = RoleUser.new
rn.id = 2
rn.user_id = 3
rn.role_id = 2
rn.save!
rn = RoleUser.new
rn.id = 3
rn.user_id = 4
rn.role_id = 2
rn.save!
rn = RoleUser.new
rn.id = 4
rn.user_id = 5
rn.role_id = 2
rn.save!
rn = RoleUser.new
rn.id = 5
rn.user_id = 7
rn.role_id = 1
rn.save!
rn = RoleUser.new
rn.id = 6
rn.user_id = 12
rn.role_id = 1
rn.save!
