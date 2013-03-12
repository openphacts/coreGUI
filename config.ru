# This file is used by Rack-based servers to start the application.

require ::File.expand_path('../config/environment',  __FILE__)

#password protect delayed job web ui
if Rails.env.production?
  DelayedJobWeb.use Rack::Auth::Basic do |username, password|
    username == AppSettings.config["dj"]["user"] && password == AppSettings.config["dj"]["password"]
  end
end

run LSP4All::Application
