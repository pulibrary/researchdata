# Upgrading Drupal via Composer
   See for more information: https://www.drupal.org/docs/updating-drupal/updating-drupal-core-via-composer
  It is preferred for you to run this on your local system and to deploy the upgrade to the servers, but there are instructions for running it on a server also.

## Check for upgrades

Check https://researchdata.princeton.edu/admin/reports/updates to see if there are updates pending for core. 

## On Your local System

1. Checkout a new branch.
1. Pull the production database (This assumes you have followed the configuration steps in the README.md
   ```
   lando drush @researchdata.prod sql-dump --structure-tables-list='watchdog,sessions,cas_data_login,history,captcha_sessions,cache,cache_*' --result-file=/tmp/dump.sql
   scp pulsys@prds-prod1:/tmp/dump.sql .
   lando db-import dump.sql
   lando drush cache:rebuild
   ```

1. Run `lando drush config:status`.  If config:status tell you the DB and the code are out of sync run `lando drush config:export` and commit any changes.
1. Run `lando drush uli --name=[your netid]`.  Use the link to log in to the drupal UI.
1. In the drupal UI, go to the Available updates report (at http://researchdata.lndo.site/admin/reports/updates).  Click on the recommended drupal core version number to look at the release notes.  Scan for any potential breaking changes.
1. Update Drupal
   ```
   lando composer outdated "drupal/*"
   lando composer update drupal/core-recommended --with-all-dependencies
   ```

   you may also want to update more components than just the recommended
   ```
   lando composer update drupal --with-all-dependencies
   ```

1. Check if updates to .htaccess or robots.txt conflict.  Usually these changes should also be discarded, but you should look at them to determine if they need to be kept.
   ```
   git diff .htaccess 
   git diff robots.txt 
   git checkout .htaccess 
   git checkout robots.txt 
   ```

1. You may need to run an updatedb and a cache rebuild. These do no harm if they are no needed, but if an updatedb is needed locally it will likely also be needed on the servers after a deploy (and is included in the capistrano deploy):
   ```
   lando drush updatedb
   lando drush cache:rebuild
   ```
1. Run `lando drush config-export` to add any config changes introduced by the DB update to the site's config .yml files in "sites/default/config/". Run a git commit to add those changes to your branch. 
1. Check the UI running locally for any issues.
1. Check the [http://researchdata.lndo.site/admin/reports/status](status page). 


## On the server (This is not recommended but can be done in a pinch...)

```
composer outdated "drupal/*"
composer update drupal/core-recommended --with-all-dependencies
git checkout README.md
```
Also check if updates to .htaccess or robots.txt conflict

As needed:
```
drush updatedb
drush cache:rebuild
```

