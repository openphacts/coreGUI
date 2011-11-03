class CreateRoleProfiles < ActiveRecord::Migration
  def self.up
    create_table :role_profiles do |t|
      t.integer     :priv_create
      t.integer     :priv_read
      t.integer     :priv_update
      t.integer     :priv_destroy
    
      t.references  :application_module, :null => false
      t.references  :role,               :null => false

      t.timestamps
    end
  end

  def self.down
    drop_table :role_profiles
  end
end
