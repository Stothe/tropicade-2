<?php
/**
 * Plugin Name:       Tropicade ROM Manager
 * Description:       Beta version. Block renders the Rom List on the front end
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Version:           0.0.5
 * Author:            @Stothe
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       tropicade-2
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
if( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

class Tropicade2 {
  function __construct() {
    add_action('init', array($this, 'adminAssets'));
  }

  function adminAssets() {
    register_block_type(__DIR__, array(
      'render_callback' => array($this, 'theHTML')
    ));
  }

  function theHTML($attributes) {
    if (!is_admin()) {
      wp_enqueue_script('frontendForm', plugin_dir_url(__FILE__) . 'build/frontend.js', array('wp-element', 'wp-components', 'wp-blocks', 'wp-editor'), null, true);
    }    

    ob_start(); ?>
    <div class="form-goes-here"></div>
    <?php return ob_get_clean();
  }
}

$tropicade2 = new Tropicade2();