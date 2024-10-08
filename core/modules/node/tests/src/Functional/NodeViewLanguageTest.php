<?php

declare(strict_types=1);

namespace Drupal\Tests\node\Functional;

use Drupal\language\Entity\ConfigurableLanguage;

/**
 * Tests the node language extra field display.
 *
 * @group node
 */
class NodeViewLanguageTest extends NodeTestBase {

  /**
   * {@inheritdoc}
   */
  protected static $modules = ['node', 'datetime', 'language'];

  /**
   * {@inheritdoc}
   */
  protected $defaultTheme = 'stark';

  /**
   * Tests the language extra field display.
   */
  public function testViewLanguage(): void {
    // Add Spanish language.
    ConfigurableLanguage::createFromLangcode('es')->save();

    // Set language field visible.
    \Drupal::service('entity_display.repository')
      ->getViewDisplay('node', 'page', 'full')
      ->setComponent('langcode')
      ->save();

    // Create a node in Spanish.
    $node = $this->drupalCreateNode(['langcode' => 'es']);

    $this->drupalGet($node->toUrl());
    $this->assertSession()->pageTextContains('Spanish');
  }

}
