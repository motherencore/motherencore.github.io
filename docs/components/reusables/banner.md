## Overview

Hero banner component featuring background image, logo display, dynamically rendered call-to-action buttons via array props, and a secret directional scrolling animation defined via session variable.

**Source File:** [banner.vue](../../../src/components/reusables/banner.vue)

## Imported Components

- [CustomButton](custom_button.md)

## Imported Composables

- *None specified*

## Imported Assets

- [img_gameLogo](../../../src/assets/img/logos/Encore_Logo.png)
- [img_defaultBanner](../../../src/assets/img/banner/web_site_banner_day_sky.png)
- [charactersImage](../../../src/assets/img/banner/ninten_and_lloyd.png)
- [layer1_sky](../../../src/assets/img/banner/banner_layer_1.png)
- [layer2_mtItoi](../../../src/assets/img/banner/banner_layer_2.png)
- [layer3_mtItoiClouds](../../../src/assets/img/banner/banner_layer_3.png)
- [layer4_hill](../../../src/assets/img/banner/banner_layer_4.png)
- [layer5_foreground](../../../src/assets/img/banner/banner_layer_5.png)
- [dowload_icon](../../../src/assets/svg/download.svg)

## Props

| Prop Name | Type | Default | Possible Values | Description |
| :-------- | :--- | :------ | :-------------- | :---------- |
| `enableParallax` | boolean | `true` | - | Controls whether multi-layer parallax imagery is enabled. |
| `imageSrc` | string | `''` | - | Default background image source URL. |
| `imageAlt` | string | `'Hero banner background'` | - | Accessibility description text for the background image. |
| `subtitle` | string | `'[Default Banner Text]'` | - | Subtitle tha appears below logo. |
| `isScrollable` | boolean\|string | `false` | - | Determine if scrolling background animations are enabled. |
| `scrollDirection` | string | `'horizontal'` | none, horizontal, vertical, both | Direction trajectory for background scrolling animation. |
| `sessionKey` | string | `''` | - | Browser session storage lookup key for conditional alternative asset displays. |
| `alternativeImages` | array | `[]` | - | List of alternative background images for scroll mode. |
| `alternativeScrollDirection` | string | `'both'` | - | Scroll animation direction when an alternative session state is active. |
| `imageChangeInterval` | number | `12500` | - | Time interval in milliseconds between background image transitions. |
| `showLogo` | boolean | `true` | - | Controls whether the brand logo image container is visible. |
| `showCtaButton` | boolean | `true` | - | Controls whether the call-to-action button elements are visible. |
| `buttons` | array | `[]` | - | Array of button configuration objects for dynamic rendering. |
| `vignetteStyle` | string | `'style_1'` | style_1, style_2, style_3, style_4 | Predefined vignette style key or custom CSS background value. |
| `allowDrag` | boolean | `true` | - | Toggles image drag functionality on the banner logo. |
| `allowSaveAs` | boolean | `false` | - | Controls whether the right-click context menu ("Save image as...") is allowed on the logo. |
| `disableSelect` | boolean | `true` | - | Disables text and element selection on the banner logo. |
| `parallaxLayers` | array | `[   { src: layer1_sky           , speed: 0.0,  scale: 1.0 },    { src: layer2_mtItoi        , speed: 0.08, scale: 1.0 },    { src: layer3_mtItoiClouds  , speed: 0.15, scale: 1.0 },    { src: layer4_hill          , speed: 0.30, scale: 1.0 },    { src: layer5_foreground    , speed: 0.55, scale: 1.0 }, ]` | - | Array of custom background layers for multi-layer parallax scrolling. |

## Computed Properties & Methods

- `formattedSubtitle`: Computed subtitle sow it adress the single ponctuation problem in some languages
- `userSelectValue`: Computed CSS user-select property value based on selection protection configuration.
- `activeImageSrc`: Computed property that resolves the current background image URL.
- `isScrollableActive`: Computed property to determine if the background scroll animation is active.
- `activeScrollDirection`: Computed property that resolves the current active scroll direction style.
- `resolvedVignette`: Computed property to map the vignetteStyle prop key to a style string, or fallback to raw CSS.
- `cssVignetteBackground`: Resolved vignette background style computed from resolvedVignette.

## Slots

- `content`: Docstrings Missing.

## Internal Methods

- `handleScroll`: Handles window scroll updates for page-level parallax translations.
- `getRandomAlternative`: Selects a random alternative background image from the configured array.
- `handleContextMenu`: Handles right-click events according to the `allowSaveAs` property configuration.
- `checkSessionState`: Checks and updates the active session state based on session storage value changes.
- `handleStorageChange`: Event listener handler for window storage updates across windows/tabs.
