class AddXtypeToApplicationModule < ActiveRecord::Migration
  def self.up
    add_column :application_modules, :xtype, :string
  end

  def self.down
    remove_column :application_modules, :xtype
  end
end
