set :branch, ENV["BRANCH"] || "main"

server "prds-staging2", user: fetch(:user), roles: %w{app drupal_primary}

#set :search_api_solr_host, 'lib-solr-staging.princeton.edu'
#set :search_api_solr_path, '/solr/recap-staging'
