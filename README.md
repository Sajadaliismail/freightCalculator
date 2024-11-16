# Rate Calc Plugin

The **Rate Calc Plugin** is a WordPress plugin that integrates a React app for rate calculation into your website. The plugin allows the upload of CSV files (e.g., `extraZones.csv`, `importZones.csv`, `rateCards.csv`) from the WordPress admin panel and displays the React app through a shortcode.

## Features

- Embed a React app for rate calculation into your WordPress site.
- Upload CSV files through the WordPress admin panel for dynamic content handling.
- Easy configuration via a simple shortcode.
- Admin interface for file management (upload and overwrite CSV files).

## Installation

### Step 1: Install the Plugin

1. Download the plugin or clone the repository to your local machine.
2. In your WordPress installation, navigate to **Plugins > Add New**.
3. Click on **Upload Plugin** and select the plugin zip file (if you downloaded a zipped version).
4. Click **Install Now** and then **Activate** the plugin.

Alternatively, you can manually upload the plugin directory (`rate-calc-plugin`) to the `/wp-content/plugins/` directory of your WordPress installation.

### Step 2: Add the Shortcode to Your Website

To display the React app on your site, add the following shortcode to any page or post where you want to display the rate calculator:

```text
[react_app]
```

This shortcode will render the React app inside a `div` with the `id="root"`.

### Step 3: Upload CSV Files

1. In the WordPress dashboard, go to **CSV File Manager** in the admin menu (located on the left sidebar).
2. You'll be able to upload three CSV files:
   - `extraZones.csv`
   - `importZones.csv`
   - `rateCards.csv`

These files will be uploaded to the plugin's `build/` directory, and they will overwrite existing files with the same names.

## Admin CSV File Manager

The plugin provides an **Admin CSV File Manager** page under the WordPress admin panel to manage the CSV files:

1. Go to **CSV File Manager** in the left sidebar menu.
2. On the CSV File Manager page, you will see the option to upload three different CSV files:
   - **extraZones.csv**
   - **importZones.csv**
   - **rateCards.csv**

Each file upload will replace any existing file with the same name in the `build/` directory, ensuring that the latest data is available.

### CSV File Upload Process

- **File Types**: Only CSV files are accepted for upload. Any non-CSV file will result in an error message.
- **File Overwriting**: Uploaded files will overwrite any existing files with the same names in the plugin's `build/` directory.
- **Error Handling**: If there is an issue with the upload (e.g., wrong file type or upload failure), an error message will be displayed.

## Plugin Settings

- **React App Scripts**: The plugin automatically enqueues the necessary React app scripts and styles on the frontend.
- **CSV File Manager**: An admin page is provided for uploading CSV files. Only authorized users (those with `manage_options` capability) can upload files.
- **File Types**: Only CSV files are accepted for upload. Any non-CSV file will result in an error message.

## Troubleshooting

### Q1: I can't see the React app on the page.

- Make sure that you've added the shortcode `[react_app]` to the page.
- Check the browser's developer tools (Console and Network tab) to ensure that the React app's JavaScript and CSS files are loading correctly.

### Q2: What happens if I upload the same CSV files again?

- The plugin will overwrite any existing CSV files with the same names in the `build/` directory.

### Q3: Can I modify the React app?

- Yes, the React app is included in the plugin's `/build/` directory. You can modify the React app and recompile it to update the frontend.

## License

This plugin is licensed under the GPL2 license.

## Author

- **Author Name**: SajadAli
- **Author URI**: [https://sajadaliismail.live](https://sajadaliismail.live)
