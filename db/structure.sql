CREATE TABLE "application_modules" ("id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(255) NOT NULL, "home" varchar(255), "url" varchar(255), "icon" varchar(255), "description" varchar(255), "application_type_id" integer NOT NULL, "created_at" datetime NOT NULL, "updated_at" datetime NOT NULL, "ancestry" varchar(255), "ancestry_depth" integer DEFAULT 0, "xtype" varchar(255));
CREATE TABLE "application_types" ("id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(255) DEFAULT '' NOT NULL, "default_css_class" varchar(255) DEFAULT '', "description" varchar(255) DEFAULT '', "created_at" datetime NOT NULL, "updated_at" datetime NOT NULL);
CREATE TABLE "delayed_jobs" ("id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, "priority" integer DEFAULT 0, "attempts" integer DEFAULT 0, "handler" text, "last_error" text, "run_at" datetime, "locked_at" datetime, "failed_at" datetime, "locked_by" varchar(255), "queue" varchar(255), "created_at" datetime NOT NULL, "updated_at" datetime NOT NULL);
CREATE TABLE "role_profiles" ("id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, "priv_create" integer, "priv_read" integer, "priv_update" integer, "priv_destroy" integer, "application_module_id" integer NOT NULL, "role_id" integer NOT NULL, "created_at" datetime NOT NULL, "updated_at" datetime NOT NULL);
CREATE TABLE "role_users" ("id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, "user_id" integer NOT NULL, "role_id" integer NOT NULL, "created_at" datetime NOT NULL, "updated_at" datetime NOT NULL);
CREATE TABLE "roles" ("id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(255) DEFAULT '' NOT NULL, "description" varchar(255), "created_at" datetime NOT NULL, "updated_at" datetime NOT NULL);
CREATE TABLE "schema_migrations" ("version" varchar(255) NOT NULL);
CREATE TABLE "tsv_files" ("id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, "uuid" varchar(255), "percentage" integer DEFAULT 0, "created_at" datetime NOT NULL, "updated_at" datetime NOT NULL, "status" varchar(255) DEFAULT 'processing');
CREATE TABLE "user_sessions" ("id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, "session_id" varchar(255) NOT NULL, "data" text, "created_at" datetime NOT NULL, "updated_at" datetime NOT NULL);
CREATE TABLE "users" ("id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, "login" varchar(255) DEFAULT '' NOT NULL, "name" varchar(255) DEFAULT '', "created_at" datetime NOT NULL, "updated_at" datetime NOT NULL, "email" varchar(255) DEFAULT '' NOT NULL, "crypted_password" varchar(255) DEFAULT '' NOT NULL, "password_salt" varchar(255) DEFAULT '' NOT NULL, "persistence_token" varchar(255) DEFAULT '' NOT NULL, "single_access_token" varchar(255) DEFAULT '' NOT NULL, "perishable_token" varchar(255) DEFAULT '' NOT NULL, "login_count" integer DEFAULT 0 NOT NULL, "failed_login_count" integer DEFAULT 0 NOT NULL, "last_request_at" datetime, "current_login_at" datetime, "last_login_at" datetime, "current_login_ip" varchar(255), "last_login_ip" varchar(255));
CREATE INDEX "delayed_jobs_priority" ON "delayed_jobs" ("priority", "run_at");
CREATE INDEX "index_application_modules_on_ancestry" ON "application_modules" ("ancestry");
CREATE INDEX "index_user_sessions_on_session_id" ON "user_sessions" ("session_id");
CREATE INDEX "index_user_sessions_on_updated_at" ON "user_sessions" ("updated_at");
CREATE UNIQUE INDEX "unique_schema_migrations" ON "schema_migrations" ("version");
INSERT INTO schema_migrations (version) VALUES ('20110609111549');

INSERT INTO schema_migrations (version) VALUES ('20110609111824');

INSERT INTO schema_migrations (version) VALUES ('20110616081628');

INSERT INTO schema_migrations (version) VALUES ('20110621064542');

INSERT INTO schema_migrations (version) VALUES ('20110621064614');

INSERT INTO schema_migrations (version) VALUES ('20110621065015');

INSERT INTO schema_migrations (version) VALUES ('20110621065126');

INSERT INTO schema_migrations (version) VALUES ('20110621065316');

INSERT INTO schema_migrations (version) VALUES ('20110706071224');

INSERT INTO schema_migrations (version) VALUES ('20110706095944');

INSERT INTO schema_migrations (version) VALUES ('20110708075544');

INSERT INTO schema_migrations (version) VALUES ('20130129153604');

INSERT INTO schema_migrations (version) VALUES ('20130130094912');

INSERT INTO schema_migrations (version) VALUES ('20130130102856');