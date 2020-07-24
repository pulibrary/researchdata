# Princeton Research Data Service
Drupal site for Princeton Research Data Service

## Local Development

   **Note: depends on Lando 3.0.7 or higher https://github.com/lando/lando/releases**
1. `git clone git@github.com:pulibrary/research-data.git`
1. `cp sites/default/default.settings.php sites/default/settings.php`
1. Add the following to `sites/defaults/settings.php`
    ```
    if (file_exists($app_root . '/sites/settings.local.php')) {
      include $app_root . '/sites/settings.local.php';
    }

    $databases['default']['default'] = array (
      'database' => 'drupal9',
      'username' => 'postgres',
      'password' => '',
      'prefix' => '',
      'host' => 'database',
      'port' => '5432',
      'namespace' => 'Drupal\\Core\\Database\\Driver\\pgsql',
      'driver' => 'pgsql',
    );
    $settings['config_sync_directory'] = 'sites/default/files/config_<Hash Salt>';

    $settings['hash_salt'] = '<Hash Salt>'

    ```
1. `mkdir .ssh` # excluded from version control
1. `cp $HOME/.ssh/id_rsa .ssh/.`
1. `cp $HOME/.ssh/id_rsa.pub .ssh/.` // key should be registered in princeton_ansible deploy role
1. `cp drush/sites/example.site.yml drush/sites/research-data.site.yml`
1. Uncomment the alias blocks and adjust the config values in the `drush/sites/research-data.site.yml` file to match the current remote and local drupal environments.
1. `lando start`
1. `lando drush @research-data.prod sql-dump --structure-tables-list='watchdog,sessions,cas_data_login,history,captcha_sessions,cache,cache_*' --result-file=/tmp/dump.sql; scp pulsys@prds-staging1:/tmp/dump.sql .`
1. `lando db-import dump.sql`
1. `lando drush rsync @research-data.prod:%files @research-data.local:%files`
1. Create a `drush/drush.yml`  file with the following:
   ```
   options:
     uri: https://research-data.lndo.site
   ```
1. `lando drush uli --name=your-netid`

### PRDS theme
If you are using Chrome, go into the Network tab in devtools and select "Disable cache"
1. `cd themes/custom/prds`
1. `lando npm install`
1. `lando gulp compile` to generate css and js for the theme (or `lando gulp task-name` for specific task defined in `themes/custom/prds/gulpfile.js`)

### Use composer to apply patches
Refer to [cweagans/composer-patches](https://github.com/cweagans/composer-patches).

## Deploying to the server
We utilize capistrano to deploy the code out to the server.  To deploy code to an existing server run
`cap <server set> deploy ` (for example `cap production deploy`).

To import a database run `cap <server set> drupal:database:import_dump SQL_DIR=<path to dump> SQL_FILE=<dump file name>`

To install code on a blank sever you must deploy and upload a database, so you need to pass the database bump variables to the deploy command `cap <server set> deploy SQL_DIR=<path to dump> SQL_FILE=<dump file name>`

To see a list of al available command run `cap -T`