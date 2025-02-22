# Universal Chapter Auto-Loader

This userscript automatically loads the next chapter for various novel reading sites with toggle, state saving chapters from local storage and user options.

## Features

- Auto-loads next chapter for various novel reading sites
- Saves chapter state in local storage
- Toggle chapter loading on/off
- Customize chapter styles
- Customize chapter options (next chapter link, settings button)
- Save chapter options in local storage
- Save chapter options in user options

## Installation

1. Install the userscript manager [Tampermonkey](https://www.tampermonkey.net/) or [Greasemonkey](https://www.greasespot.net/).
2. Install the userscript from the [releases page](https://github.com/StarlessNight13/novel-chapter-auto-loader/releases).
3. Enable the userscript in the userscript manager.

## Usage

1. Open the novel reading site you want to use.
2. The userscript will automatically load the next chapter.
3. You can toggle the chapter loading on/off by clicking the toggle button.
4. You can customize the chapter styles by clicking the settings button.
5. You can customize the chapter options by clicking the settings button.
6. The chapter options will be saved in local storage.
7. The chapter options will be saved in user options.

## Customization

You can customize the chapter styles by editing the `getStyles.ts` file in the `src/lib` directory.

You can customize the chapter options by editing the `SiteConfig` interface in the `src/config/site-config.ts` file.

## License

This project is licensed under the MIT License.
