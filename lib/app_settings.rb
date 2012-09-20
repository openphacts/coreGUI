# Constants which can be loaded from file. Loading takes place
# in application.rb using
# require 'lib/app_settings'
# AppSettings.config = YAML.load_file("config/app_settings.yml")[Rails.env]
# settings are in config/app_settings.yml
class AppSettings
  def self.config
    @@config ||= {}
  end

  def self.config=(hash)
    @@config = hash
  end
end
