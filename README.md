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