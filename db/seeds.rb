# Seed file will seed database with the application model data and other data needed to run the interface
# Please note that all existing data in database models below will be destroyed!

# For populating Enzyme data
Enzyme.delete_all

# Defining the root node
enz = Enzyme.new
enz.id = 1    # using this syntax to overwrite the id auto increment
enz.ancestry_depth = 0
enz.save!

# Reading enzyme number classes from file - this is the branches
enzclass = File.open("#{Rails.root}/db/enzyme/enzclass.txt",'r')
puts "Loading Enzyme class seed data..."
while line = enzclass.gets
  if line =~ /^(\d)\.\s?(\d+|-)\.\s?(\d+|-)\.-\s+(.+)\./ then
     ec_1 = $1
     ec_2 = $2
     ec_3 = $3
     ec = "#{ec_1}.#{ec_2}.#{ec_3}.-"
     pref_label = $4
     id_code = nil
     ans_code = nil
     dept = nil
     if not ec_3 == '-' then
      id_code = [sprintf("1%d",ec_1),sprintf("%02d",ec_2),sprintf("%02d",ec_3)]
      ans_code = '1/' + id_code[0] + '/' + id_code[0] + id_code[1]
      dept = 3    
     elsif not ec_2 == '-' then
      id_code = [sprintf("1%d",ec_1),sprintf("%02d",ec_2)]
      ans_code = '1/' + id_code[0]
      dept = 2    
     else
      id_code = [sprintf("1%d",ec_1)]
      ans_code = '1' 
      dept = 1
     end
     # Creating the new record
     enz = Enzyme.new
     enz.id = id_code.join    # using this syntax to overwrite the id auto increment
     enz.ec_number = ec
     enz.name = pref_label
     enz.ancestry = ans_code
     enz.ancestry_depth = dept
     enz.save!
     end
  
end
enzclass.close

 # Now all the enzyme leafs are added
enzleaf = File.open("#{Rails.root}/db/enzyme/enzyme.dat",'r')
puts "Loading Enzyme leaf seed data..."
while line = enzleaf.gets
  if line =~ /^ID\s+((\d)\.(\d+)\.(\d+)\.(\d+))$/ then
     ec = $1
     ecb = [$2,$3,$4,$5]
     until line =~ /^\/\/$/ do
        line = enzleaf.gets
        if line =~ /^DE\s+(.+)\.$/ then
          pref_label = $1
          if pref_label =~ /entry/ then break end
          id_code = [sprintf("1%d",ecb[0]),sprintf("%02d",ecb[1]),sprintf("%02d",ecb[2]),sprintf("%03d",ecb[3])]
          ans_code = '1/' + id_code[0] + '/' + id_code[0] + id_code[1] + '/' + id_code[0] + id_code[1] + id_code[2]
           # Creating the new record
           enz = Enzyme.new
           enz.id = id_code.join    # using this syntax to overwrite the id auto increment
           enz.ec_number = ec
           enz.name = pref_label
           enz.ancestry = ans_code
           enz.ancestry_depth = 4
           enz.save!
        end
     end
  end
end
enzleaf.close

