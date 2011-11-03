class CreateRoleUsers < ActiveRecord::Migration
  def self.up
    create_table :role_users do |t|    
      t.references  :user, :null => false
      t.references  :role, :null => false

      t.timestamps
    end
  end

  def self.down
    drop_table :role_users
  end
end
