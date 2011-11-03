# Thanks to 'Arsen7' for this script found at http://stackoverflow.com/questions/4698467/schema-sql-not-creating-even-after-setting-schema-format-sql
import File.expand_path(File.dirname(__FILE__)+"/schema_format.rb")

# Loads the *_structure.sql file into current environment's database.
# This is a slightly modified copy of the 'test:clone_structure' task.
def db_load_structure(filename)
  abcs = ActiveRecord::Base.configurations
  case abcs[Rails.env]['adapter']
  when /mysql/
    ActiveRecord::Base.establish_connection(Rails.env)
    ActiveRecord::Base.connection.execute('SET foreign_key_checks = 0')
    IO.readlines(filename).join.split("\n\n").each do |table|
      ActiveRecord::Base.connection.execute(table)
    end
  when /postgresql/
    ENV['PGHOST']     = abcs[Rails.env]['host'] if abcs[Rails.env]['host']
    ENV['PGPORT']     = abcs[Rails.env]['port'].to_s if abcs[Rails.env]['port']
    ENV['PGPASSWORD'] = abcs[Rails.env]['password'].to_s if abcs[Rails.env]['password']
    `psql -U "#{abcs[Rails.env]['username']}" -f #{filename} #{abcs[Rails.env]['database']} #{abcs[Rails.env]['template']}`
  when /sqlite/
    dbfile = abcs[Rails.env]['database'] || abcs[Rails.env]['dbfile']
    `sqlite3 #{dbfile} < #{filename}`
  when 'sqlserver'
    `osql -E -S #{abcs[Rails.env]['host']} -d #{abcs[Rails.env]['database']} -i #{filename}`
    # There was a relative path. Is that important? : db\\#{Rails.env}_structure.sql`
  when 'oci', 'oracle'
    ActiveRecord::Base.establish_connection(Rails.env)
    IO.readlines(filename).join.split(";\n\n").each do |ddl|
      ActiveRecord::Base.connection.execute(ddl)
    end
  when 'firebird'
    set_firebird_env(abcs[Rails.env])
    db_string = firebird_db_string(abcs[Rails.env])
    sh "isql -i #{filename} #{db_string}"
  else
    raise "Task not supported by '#{abcs[Rails.env]['adapter']}'"
  end
end

namespace :db do
  namespace :structure do
    desc "Load development_structure.sql file into the current environment's database"
    task :load => :environment do
      file_env = 'development' # From which environment you want the structure?
                               # You may use a parameter or define different tasks.
      db_load_structure "#{Rails.root}/db/#{file_env}_structure.sql"
    end
  end
end