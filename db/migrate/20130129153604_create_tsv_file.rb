class CreateTsvFile < ActiveRecord::Migration
  def up
    create_table :tsv_files do |t|      
      t.string :uuid
      t.integer :percentage, :default => 0
      t.timestamps
    end
  end

  def down
    drop_table :tsv_files
  end
end
