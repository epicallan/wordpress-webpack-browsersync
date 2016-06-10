<?php
define( 'THEME_VERSION', '0.0.1' );
if ( !function_exists( 'theme_setup' ) ) {

// Register Theme Features
   function theme_setup() {

      // Add theme support for document Title tag
      add_theme_support( 'title-tag' );
   }

   add_action( 'after_setup_theme', 'theme_setup' );

}
// Register Scripts
function theme_scripts() {
  wp_enqueue_style('theme.style', get_bloginfo('template_directory').'/build/style.css', array(),THEME_VERSION);
  wp_enqueue_script('theme.js', get_bloginfo('template_directory').'/build/main.js', array(),THEME_VERSION);
}

add_action( 'wp_enqueue_scripts', 'theme_scripts' );
