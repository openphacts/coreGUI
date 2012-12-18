class CreateUserApplications < ActiveRecord::Migration
  def self.up
#no need for this migration 
  end

  def self.down
    execute ('drop view feature_relationship_view')
  end
end
