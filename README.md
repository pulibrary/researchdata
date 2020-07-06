# Princeton Research Data Service
Drupal site for Princeton Research Data Service

## Local Development
Add the following to `sites/defaults/settings.php`
```
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
$settings['trusted_host_patterns'] = [
  '^'.getenv('LANDO_APP_NAME').'\.lndo\.site$'
];
```