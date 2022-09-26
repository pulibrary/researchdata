# Upgrading PHP

1. In .lando.yml, upgrade to the desired PHP version
1. `lando restart`
1. In your browser, go to http://researchdata.lndo.site/
1. If you see deprecation errors caused by drupal or its modules, upgrading the composer packages may resolve it:
    1. `lando composer outdated "drupal/*:"`
	1. For any of the outdated composer packages that are giving deprecation warnings, `lando composer upgrade [packagename]`
	1. `lando drush updatedb`
	1. `lando drush config:export`
1. Commit your changes.
1. Upgrade PHP on the staging server via princeton_ansible.
1. Deploy to staging.
