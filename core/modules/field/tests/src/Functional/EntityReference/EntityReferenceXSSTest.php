<?php

declare(strict_types=1);

namespace Drupal\Tests\field\Functional\EntityReference;

use Drupal\Core\Entity\Entity\EntityFormDisplay;
use Drupal\Core\Entity\Entity\EntityViewDisplay;
use Drupal\Tests\BrowserTestBase;
use Drupal\Tests\field\Traits\EntityReferenceFieldCreationTrait;

/**
 * Tests possible XSS security issues in entity references.
 *
 * @group entity_reference
 */
class EntityReferenceXSSTest extends BrowserTestBase {

  use EntityReferenceFieldCreationTrait;

  /**
   * {@inheritdoc}
   */
  protected static $modules = ['node'];

  /**
   * {@inheritdoc}
   */
  protected $defaultTheme = 'stark';

  /**
   * Tests markup is escaped in the entity reference select and label formatter.
   */
  public function testEntityReferenceXSS(): void {
    $this->drupalCreateContentType(['type' => 'article']);

    // Create a node with markup in the title.
    $node_type_one = $this->drupalCreateContentType();
    $node = [
      'type' => $node_type_one->id(),
      'title' => '<em>I am kitten</em>',
    ];
    $referenced_node = $this->drupalCreateNode($node);

    $node_type_two = $this->drupalCreateContentType(['name' => '<em>bundle with markup</em>']);
    $this->drupalCreateNode([
      'type' => $node_type_two->id(),
      'title' => 'My bundle has markup',
    ]);

    $this->createEntityReferenceField('node', 'article', 'entity_reference_test', 'Entity Reference test', 'node', 'default', ['target_bundles' => [$node_type_one->id(), $node_type_two->id()]]);

    EntityFormDisplay::load('node.article.default')
      ->setComponent('entity_reference_test', ['type' => 'options_select'])
      ->save();
    EntityViewDisplay::load('node.article.default')
      ->setComponent('entity_reference_test', ['type' => 'entity_reference_label'])
      ->save();

    // Create a node and reference the node with markup in the title.
    $this->drupalLogin($this->drupalCreateUser([
      'create article content',
    ]));
    $this->drupalGet('node/add/article');
    $this->assertSession()->assertEscaped($referenced_node->getTitle());
    $this->assertSession()->assertEscaped($node_type_two->label());

    $edit = [
      'title[0][value]' => $this->randomString(),
      'entity_reference_test' => $referenced_node->id(),
    ];
    $this->submitForm($edit, 'Save');
    $this->assertSession()->assertEscaped($referenced_node->getTitle());

    // Test the options_buttons type.
    EntityFormDisplay::load('node.article.default')
      ->setComponent('entity_reference_test', ['type' => 'options_buttons'])
      ->save();
    $this->drupalGet('node/add/article');
    $this->assertSession()->assertEscaped($referenced_node->getTitle());
    // options_buttons does not support optgroups.
    $this->assertSession()->pageTextNotContains('bundle with markup');
  }

}
