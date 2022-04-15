# Princeton Research Data Service
Drupal site for Princeton Research Data Service

## Local Development

   **Note: depends on Lando 3.0.7 or higher https://github.com/lando/lando/releases**
1. `git clone git@github.com:pulibrary/researchdata.git`
1. `cp sites/default/default.settings.php sites/default/settings.php`
1. Add the following to `sites/defaults/settings.php`.  You will get the values for `hash_salt` and `config_sync_directory` later, after the `lando drush rsync` step.  The `config_sync_directory` will be the newly created directory `sites/default/files/config_longhash`, where longhash is a long hash.  You can use that longhash as the `hash_salt` value.
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

    $settings['hash_salt'] = '<Hash Salt>'

    $settings['config_sync_directory'] = '<Config Sync Directory>';

    ```
1. `mkdir .ssh` # excluded from version control
1. `cp $HOME/.ssh/id_rsa .ssh/.`
1. `cp $HOME/.ssh/id_rsa.pub .ssh/.` // key should be registered in princeton_ansible deploy role
1. `cp drush/sites/example.site.yml drush/sites/researchdata.site.yml`
1. Uncomment the alias blocks and adjust the config values in the `drush/sites/researchdata.site.yml` file to match the current remote and local drupal environments.
1. `lando start`
1. `lando drush @researchdata.prod sql-dump --structure-tables-list='watchdog,sessions,cas_data_login,history,captcha_sessions,cache,cache_*' --result-file=/tmp/dump.sql; scp pulsys@prds-prod1:/tmp/dump.sql .`
1. `lando db-import dump.sql`
1. `lando drush rsync @researchdata.prod:%files @researchdata.local:%files`
1. Create a `drush/drush.yml`  file with the following:
   ```
   options:
     uri: http://researchdata.lndo.site
   ```
1. `lando drush uli --name=your-netid`

### Configuration Syncing

Each time you pull from master it is a good idea to check the status of your site.  To check and see if you need to get changes run
```
lando drush config:status
```
If everything is up to date you will see
```
[notice] No differences between DB and sync directory.
```

If there are changes you need to import you will see something like **(note: Only in sync dir in the State)**
```
 ---------------------------------------------------- ------------------ 
  Name                                                 State             
 ---------------------------------------------------- ------------------ 
  core.entity_form_display.node.a_z_resource.default   Only in sync dir  
```

If there are changes you need to export you will see something like **(note: Only in DB in the State)**
```
---------------------------------------------------- ------------ 
  Name                                                 State       
 ---------------------------------------------------- ------------ 
  core.entity_form_display.node.a_z_resource.default   Only in DB  
```

#### Importing Configuration
Most of the time you will want to import the entire configuration.  The only time this would not be the case is if you have some states that are `Only in DB` and some the are `Only in sync dir` (You made changes and another developer have made changes).  To import the entire configuration run `lando drush config:import` or `lando drush config:import -y`.  If you run without the -y you will see a list of the changes being made before they get applied like below:
```
+------------+----------------------------------------------------+-----------+
| Collection | Config                                             | Operation |
+------------+----------------------------------------------------+-----------+
|            | field.storage.node.field_resource_link             | Create    |
|            | node.type.a_z_resource                             | Create    |
|            | field.field.node.a_z_resource.field_resource_link  | Create    |
```

If you have both exports and imports see the section below.

#### Exporting Configuration
Most of the time you will want to export the entire configuration.  The only time this would not be the case is if you have some states that are `Only in DB` and some the are `Only in sync dir` (You made changes and another developer have made changes).  To export the entire configuration run `lando drush config:export` or `lando drush config:export -y`.  If you run without the -y you will see a list of the changes being made before they get applied like below:
```
 [notice] Differences of the active config to the export directory:
+------------+----------------------------------------------------+-----------+
| Collection | Config                                             | Operation |
+------------+----------------------------------------------------+-----------+
|            | field.storage.node.field_resource_link             | Create    |
|            | node.type.a_z_resource                             | Create    |
|            | field.field.node.a_z_resource.
+------------+----------------------------------------------------+-----------+


 The .yml files in your export directory (sites/default/config) will be deleted and replaced with the active config. (yes/no) [yes]:
 > yes

 [success] Configuration successfully exported to sites/default/config.
 ```

If you have both exports and imports see the section below.

### Both Exporting and Importing Configuration
You made changes and another developer have made changes, and now the configuration must be merged.

We will use git to combine the two configurations.  
1. Check to make sure everything is committed in git with `git status`.  Commit any untracked changes.
1. Export you local changes on top of the existing git changes.
   ```
   lando drush config:export
   ```
1. Double check you do not want keep any of the changes
   ```
   git status
   git diff <modified file>
   ```
   for any file you want to keep the changes in
   ```
   git add <modified file>
   ```
   commit those changes so they do not get loast with either a `git commit` or `git commit --amend`
1. restore the lost changes tracked by git
   ```
   git reset HEAD .
   git checkout .
   ```
1. Import the changes both tracked and untracked
   ```
   lando drush config:import
   ```
1. Check your config status
   ```
   lando drush config:status
   ```
1. Commit your changes to git with a branch and a PR.


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

## Testing via Cypress
Tests are located in `themes/custom/prds/cypress`
1. `cd themes/custom/prds`
1. `npm install`
1. Add the token from Percy located in Project settings.
1. `npx percy exec -- cypress open`
1. In the Cypress dashboard, click on the `drupal.js` test to run the tests.
