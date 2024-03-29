# config valid for current version and patch releases of Capistrano
lock "~> 3.16"

set :application, "researchdata"
set :repo_url, "https://github.com/pulibrary/researchdata.git"

set :keep_releases, 5

set :deploy_to, "/var/www/researchdata"

set :drush_researchdata_aliases, "/home/deploy/drush.yml"
set :drush_researchdata_site, "/home/deploy/prod.site.yml"
set :drupal_settings, "/home/deploy/settings.php"
set :drupal_site, "default"
set :drupal_file_public_path, "sites/default/files"
set :drupal_file_private_path, "sites/default/files/private"
set :cas_cert_location, "/etc/ssl/certs/ssl-cert-snakeoil.pem"

set :user, "deploy"

# Default value for :format is :airbrussh.
# set :format, :airbrussh

# You can configure the Airbrussh format using :format_options.
# These are the defaults.
# set :format_options, command_output: true, log_file: "log/capistrano.log", color: :auto, truncate: :auto

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# append :linked_files, "config/database.yml"

# Default value for linked_dirs is []
# append :linked_dirs, "log", "tmp/pids", "tmp/cache", "tmp/sockets", "public/system"

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for local_user is ENV['USER']
# set :local_user, -> { `git config user.name`.chomp }

# Default value for keep_releases is 5
# set :keep_releases, 5

# Uncomment the following to require manually verifying the host key before first deploy.
# set :ssh_options, verify_host_key: :secure

namespace :drupal do

  desc "Include creation of additional Drupal specific shared folders"
  task :prepare_shared_paths do
      on release_roles :app do
          execute :mkdir, '-p', "#{shared_path}/tmp"
          execute :mkdir, '-p', "#{shared_path}/node_modules"
          execute :mkdir, '-p', "#{shared_path}/modules"
          execute :mkdir, '-p', "#{shared_path}/files"
          execute :sudo, "/bin/chown -R nginx #{shared_path}/"
      end
  end

  desc "Link settings.php"
  task :link_settings do
    on roles(:app) do |host|
      execute "cd #{release_path}/sites/#{fetch(:drupal_site)} && ln -sf #{fetch(:drupal_settings)} settings.php"
      # execute "cd #{release_path}/drush && ln -sf #{fetch(:drush_researchdata_aliases)} drushrc.php"
      # execute "cd #{release_path}/drush/sites && ln -sf #{fetch(:drush_researchdata_site)} drushrc.php"
      info "linked settings into #{release_path}/sites/#{fetch(:drupal_site)} site"
    end
  end

  desc "Link shared drupal files"
  task :link_files do
    on roles(:app) do |host|
      execute "cd #{release_path}/themes/custom/prds && ln -sf #{shared_path}/node_modules node_modules"
      execute "cd #{release_path}/sites/default && ln -sf #{shared_path}/files files"
      execute "cd #{release_path} && ln -sf #{shared_path}/modules sites/default/modules"
      info "linked node modules, composer modules and files into #{fetch(:drupal_site)} site"
    end
  end

  desc "Install using composer"
  task :composer_install do
    on roles(:app) do |host|
      execute "cd #{release_path} && composer install --no-dev"
      execute :sudo, "/bin/chown -R nginx /home/deploy/.drush/cache; true"
      info "ran composer install"
    end
  end

  desc "Install Assets"
  task :install_assets do
    on roles(:app) do |host|
      # execute "cd #{release_path}/themes/custom/prds && npm install"
      # execute "cd #{release_path}/themes/custom/prds && gulp deploy"
      # info "Installed Assets"
    end
  end

  desc "Clear the drupal cache"
  task :cache_clear do
      on release_roles :drupal_primary do
        within release_path do
            execute "sudo -u nginx #{release_path}/vendor/bin/drush cache-rebuild; true"
            info "cleared the drupal cache"
        end
      end
  end

  desc "Update file permissions to follow best security practice: https://drupal.org/node/244924"
  task :set_permissions_for_runtime do
      on release_roles :app do
          execute :find, "#{release_path}", '-type f -exec', :chmod, "640 {} ';'"
          execute :find, "#{release_path}", '-type d -exec', :chmod, "2750 {} ';'"
          execute :find, "#{shared_path}/tmp", '-type d -exec', :chmod, "2770 {} ';'"
          execute "chmod a+x #{release_path}/vendor/drush/drush/drush"
          execute "chmod a+x #{release_path}/vendor/bin/*"
      end
  end

  desc "Set the site offline"
  task :site_offline do
      on release_roles :app do
          within release_path do
              execute "sudo -u nginx #{release_path}/vendor/bin/drush sset system.maintenance_mode 1; true"
              execute "sudo -u nginx #{release_path}/vendor/bin/drush cr; true"
          end
          info "set site to offline"
      end
  end

  desc "Set the site online"
  task :site_online do
      on release_roles :app do
        within release_path do
          execute "sudo -u nginx #{release_path}/vendor/bin/drush sset system.maintenance_mode 0"
          execute "sudo -u nginx #{release_path}/vendor/bin/drush cr; true"
        end
        info "set site to online"
      end
  end

  desc "change the owner of the directory to nginx for nginx"
  task :update_directory_owner do
      on release_roles :app do
        execute :sudo, "/bin/chown -R nginx #{release_path}"
        deploy_directory = capture "ls #{ deploy_to }"
        if deploy_directory.include?("current")
          execute :sudo, "/bin/chown -R nginx #{deploy_to}/current/"
        end
      end
  end

  desc "change the owner of the directory to deploy"
  task :update_directory_owner_deploy do
      on release_roles :app do
        current_release_path = capture "readlink #{ deploy_to }/current"
        current_release = current_release_path.split('/').last
        release_paths = capture "ls #{ deploy_to }/releases/"
        release_paths.split(release_paths[14]).each do |release|
          next if release == current_release
          execute :sudo, "/bin/chown -R deploy #{deploy_to}/releases/#{release}"
          execute :chmod, "-R u+w #{deploy_to}/releases/#{release}"
        end
      end
  end

  desc "Restart the nginx process"
  task :restart_nginx do
      on release_roles :drupal_primary do
        info "starting restart on primary"
        execute :sudo, "/usr/sbin/service nginx restart"
        info "completed restart on primary"
      end
  end

  desc "Stop the nginx process"
  task :stop_nginx do
      on release_roles :app do
        execute :sudo, "/usr/sbin/service nginx stop"
      end
  end

  desc "Start the nginx process"
  task :start_nginx do
      on release_roles :app do
        execute :sudo, "/usr/sbin/service nginx start"
      end
  end

  desc "Revert the features to the code"
  task :config_import do
      on release_roles :drupal_primary do
          execute "sudo -u nginx #{release_path}/vendor/bin/drush -r #{release_path} -y config:import"
          info "imported the drupal config"
      end
  end

  desc "Upload the files tar and install it FILES_DIR/FILES_GZ"
  task :upload_files do
    on release_roles :drupal_primary do
      gz_file_name = ENV["FILES_GZ"]
      tar_file_name = gz_file_name.sub('.gz','')
      upload! File.join(ENV['FILES_DIR'], gz_file_name), "/tmp/#{gz_file_name}"
      execute "mv /tmp/#{gz_file_name} #{shared_path}/files"
      execute "gzip -d #{shared_path}/files/#{gz_file_name}"
      execute "cd #{shared_path}/files && tar -xvf #{tar_file_name}"
      execute "cd #{shared_path}/files && rm -f #{tar_file_name}"
      execute :sudo, "/bin/chown -R nginx #{shared_path}/files"
    end
  end

  namespace :database do

    desc "Run Drush SQL Client against a local sql file SQL_DIR/SQL_FILE"
    task :import_dump do
      invoke "drupal:site_offline"
      invoke "drupal:stop_nginx"
      invoke "drupal:database:upload_and_import"
      invoke "drupal:database:update_db_variables"
      invoke "drupal:start_nginx"
      invoke "drupal:site_online"
      invoke "drupal:database:clear_search_index"
      invoke "drupal:database:update_search_index"
    end

    desc "Upload the dump file and import it"
    task :upload_and_import do
      on release_roles :drupal_primary do
        upload! ENV["SQL_DIR"] + ENV["SQL_FILE"], '/tmp/'+ENV["SQL_FILE"]
        execute "mkdir /home/deploy/.drush/cache/factory; true"
        within release_path do
            execute "sudo -u nginx #{release_path}/vendor/bin/drush sql-cli < /tmp/"+ENV["SQL_FILE"]
        end
      end
    end

    desc "Update variables on a dump import"
    task :update_db_variables do
      on release_roles :drupal_primary do
        # todo vset is now config-set
        # should be something like cset cas.settings server.cert
        # execute "drush -r #{release_path} vset --exact cas_cert #{fetch(:cas_cert_location)}"
      end
    end

    desc "Clear the solr index"
    task :clear_search_index do
        on release_roles :drupal_primary do
            within release_path do
               execute "sudo -u nginx #{release_path}/vendor/bin/drush search-api:clear"
            end
        end
    end

    desc "Update the solr index"
    task :update_search_index do
        on release_roles :drupal_primary do
            within release_path do
                execute "sudo -u nginx #{release_path}/vendor/bin/drush search-api:index"
            end
        end
    end

    desc "Update the drupal database"
    task :update do
        on release_roles :drupal_primary do
            within release_path do
                execute "sudo -u nginx #{release_path}/vendor/bin/drush updatedb -y"
            end
        end
    end
  end
end

namespace :deploy do
  desc "Set file system variables"
  task :after_deploy_check do
      invoke "drupal:prepare_shared_paths"
  end

  desc "Set file system variables"
  task :after_deploy_updated do
      invoke "drupal:link_settings"
      invoke "drupal:link_files"
      invoke "drupal:composer_install"
      if ( ENV["SQL_FILE"] != nil)
        invoke "drupal:database:upload_and_import"
      end
      invoke "drupal:install_assets"
      invoke "drupal:set_permissions_for_runtime"
      invoke "drupal:update_directory_owner"
  end

  desc "stop nginx before realease"
  task :before_release do
    invoke "drupal:stop_nginx"
  end

  desc "Reset directory permissions and Restart nginx"
  task :after_release do
      invoke! "drupal:update_directory_owner"
      invoke "drupal:start_nginx"
      invoke "drupal:cache_clear"
      invoke "drupal:config_import"
      invoke "drupal:database:update"
      invoke! "drupal:cache_clear"
  end

  before 'symlink:release' , "deploy:before_release"

  after :check, "deploy:after_deploy_check"

  #after :started, "drupal:site_offline"

  after :updated, "deploy:after_deploy_updated"

  before :finishing, "drupal:update_directory_owner_deploy"
  after 'symlink:release' , "deploy:after_release"
end
