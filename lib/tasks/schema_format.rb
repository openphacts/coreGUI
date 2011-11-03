# Thanks to 'Arsen7' for this script found at http://stackoverflow.com/questions/4698467/schema-sql-not-creating-even-after-setting-schema-format-sql
def dump_structure_if_sql
  Rake::Task['db:structure:dump'].invoke if ActiveRecord::Base.schema_format == :sql
end
Rake::Task['db:migrate'     ].enhance do dump_structure_if_sql end
Rake::Task['db:migrate:up'  ].enhance do dump_structure_if_sql end
Rake::Task['db:migrate:down'].enhance do dump_structure_if_sql end
Rake::Task['db:rollback'    ].enhance do dump_structure_if_sql end
Rake::Task['db:forward'     ].enhance do dump_structure_if_sql end

Rake::Task['db:structure:dump'].enhance do
  # If not reenabled, then in db:migrate:redo task the dump would be called only once,
  # and would contain only the state after the down-migration.
  Rake::Task['db:structure:dump'].reenable
end 

# The 'db:setup' task needs to be rewritten.
Rake::Task['db:setup'].clear.enhance(['environment']) do # see the .clear method invoked?
  Rake::Task['db:create'].invoke
  Rake::Task['db:schema:load'].invoke if ActiveRecord::Base.schema_format == :ruby
  Rake::Task['db:structure:load'].invoke if ActiveRecord::Base.schema_format == :sql
  Rake::Task['db:seed'].invoke
end