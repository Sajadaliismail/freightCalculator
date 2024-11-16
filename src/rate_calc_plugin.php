<?php
/*
Plugin Name: Rate Calc Plugin
Plugin URI: https://freight-calculator-six.vercel.app/
Description: A plugin to display a React app for rate calculation.
Version: 1.0
Author: SajadAli
Author URI: https://sajadaliismail.live
License: GPL2
*/
function react_app_plugin_enqueue_assets() {
    wp_enqueue_script(
        'react-app-script', 
        plugin_dir_url(__FILE__) . 'build/static/js/main.495206fa.js', 
        array(), 
        null, 
        true  
    );
    wp_enqueue_style(
        'react-app-style', 
        plugin_dir_url(__FILE__) . 'build/static/css/main.dfdaf2eb.css'
    );
}
add_action('wp_enqueue_scripts', 'react_app_plugin_enqueue_assets');

function react_app_plugin_display() {
    return '<div id="root"></div>';
}
add_shortcode('react_app', 'react_app_plugin_display');

