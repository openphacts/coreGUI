class CreateUserApplications < ActiveRecord::Migration
  def self.up
    # Create View
    execute("CREATE OR REPLACE VIEW user_applications AS 
         SELECT am.id, am.id AS application_module_id, am.ancestry, am.home, am.description, am.name, am.url, 
                CASE
                    WHEN am.icon IS NULL THEN at.default_css_class
                    ELSE am.icon
                END AS icon, at.name AS application_type, r.id AS role_id, r.name AS role_name, u.id AS user_id, u.login, rp.priv_create, rp.priv_read, rp.priv_update, rp.priv_destroy, am.ancestry_depth
           FROM users u
      JOIN role_users ru ON ru.user_id = u.id
   JOIN roles r ON r.id = ru.role_id
   JOIN role_profiles rp ON rp.role_id = r.id
   JOIN application_modules am ON am.id = rp.application_module_id
   LEFT JOIN application_types at ON at.id = am.application_type_id
  WHERE NOT (EXISTS ( SELECT NULL::unknown AS unknown
   FROM role_profiles rp1
   JOIN role_users ru1 ON rp1.role_id = ru1.role_id
  WHERE rp1.application_module_id = rp.application_module_id AND ru1.user_id = u.id AND (rp1.priv_read IS NOT NULL OR rp1.priv_create IS NOT NULL OR rp1.priv_update IS NOT NULL OR rp1.priv_destroy IS NOT NULL) AND rp1.role_id <> r.id))
UNION 
         SELECT am.id, am.id AS application_module_id, am.ancestry, am.home, am.description, am.name, am.url, 
                CASE
                    WHEN am.icon IS NULL THEN at.default_css_class
                    ELSE am.icon
                END AS icon, at.name AS application_type, r.id AS role_id, r.name AS role_name, NULL::unknown AS user_id, 'Public'::character varying(255) AS login, rp.priv_create, rp.priv_read, rp.priv_update, rp.priv_destroy, am.ancestry_depth
           FROM roles r
      JOIN role_profiles rp ON rp.role_id = r.id
   JOIN application_modules am ON am.id = rp.application_module_id
   JOIN application_types at ON at.id = am.application_type_id
  WHERE r.name::text = 'Public'::text;")
  end

  def self.down
    execute ('drop view feature_relationship_view')
  end
end
