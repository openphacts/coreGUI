CREATE TABLE `application_modules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `home` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `application_type_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `ancestry` varchar(255) DEFAULT NULL,
  `ancestry_depth` int(11) DEFAULT '0',
  `xtype` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_application_modules_on_ancestry` (`ancestry`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `application_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `default_css_class` varchar(255) DEFAULT '',
  `description` varchar(255) DEFAULT '',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `role_profiles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `priv_create` int(11) DEFAULT NULL,
  `priv_read` int(11) DEFAULT NULL,
  `priv_update` int(11) DEFAULT NULL,
  `priv_destroy` int(11) DEFAULT NULL,
  `application_module_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `role_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `description` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `schema_migrations` (
  `version` varchar(255) NOT NULL,
  UNIQUE KEY `unique_schema_migrations` (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `tsv_files` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) DEFAULT NULL,
  `percentage` int(11) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `user_sessions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `session_id` varchar(255) NOT NULL,
  `data` text,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `index_user_sessions_on_session_id` (`session_id`),
  KEY `index_user_sessions_on_updated_at` (`updated_at`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(255) NOT NULL DEFAULT '',
  `name` varchar(255) DEFAULT '',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `email` varchar(255) NOT NULL DEFAULT '',
  `crypted_password` varchar(255) NOT NULL DEFAULT '',
  `password_salt` varchar(255) NOT NULL DEFAULT '',
  `persistence_token` varchar(255) NOT NULL DEFAULT '',
  `single_access_token` varchar(255) NOT NULL DEFAULT '',
  `perishable_token` varchar(255) NOT NULL DEFAULT '',
  `login_count` int(11) NOT NULL DEFAULT '0',
  `failed_login_count` int(11) NOT NULL DEFAULT '0',
  `last_request_at` datetime DEFAULT NULL,
  `current_login_at` datetime DEFAULT NULL,
  `last_login_at` datetime DEFAULT NULL,
  `current_login_ip` varchar(255) DEFAULT NULL,
  `last_login_ip` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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