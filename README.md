# Princeton Research Data Service
Drupal site for Princeton Research Data Service

## Local Development
Add the following to `sites/defaults/settings.php`
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
```

## Deploying to the server

We utilize capistrano to deploy the code out to the server.  To deploy code to an existing server run
`cap <server set> deploy ` (for example `cap production deploy`).

To import a database run `cap <server set> drupal:database:import_dump SQL_DIR=<path to dump> SQL_FILE=<dump file name>`

To install code on a blank sever you must deploy and upload a database, so you need to pass the database bump variables to the deploy command `cap <server set> deploy SQL_DIR=<path to dump> SQL_FILE=<dump file name>`

To see a list of al available command run `cap -T`