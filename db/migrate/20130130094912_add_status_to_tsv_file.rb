class AddStatusToTsvFile < ActiveRecord::Migration
  def change
    add_column :tsv_files, :status, :string, :default => "processing"
  end
end
