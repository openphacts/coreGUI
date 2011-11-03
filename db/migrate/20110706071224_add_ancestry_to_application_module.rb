class AddAncestryToApplicationModule < ActiveRecord::Migration
  def self.up
    add_column :application_modules, :ancestry,       :string
    add_column :application_modules, :ancestry_depth, :integer, :default => 0
    add_index :application_modules, :ancestry
  end

  def self.down
    remove_column :application_modules, :ancestry
    remove_column :application_modules, :ancestry_depth
    remove_index :application_modules, :ancestry
  end
end
