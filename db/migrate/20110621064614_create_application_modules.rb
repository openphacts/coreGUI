class CreateApplicationModules < ActiveRecord::Migration
  def self.up
    create_table :application_modules do |t|      
      t.string  :name,                :null => false
      t.string  :home
      t.string  :url
      t.string  :icon
      t.string  :description
      t.references :application_type, :null => false

      t.timestamps
    end
  end

  def self.down
    drop_table :application_modules
  end
end
