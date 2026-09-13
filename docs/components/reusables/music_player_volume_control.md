## Overview

Music player volume control component supporting horizontal/vertical layouts, thumbwheels, slider bars, and mute state toggling.

**Source File:** [music_player_volume_control.vue](../../../src/components/reusables/music_player_volume_control.vue)

## Imported Components

- [CustomButton](custom_button.md)

## Imported Composables

- *None specified*

## Imported Assets

- [imgVolume](../../../src/assets/svg/volume-fill.svg)
- [imgVolumeMute](../../../src/assets/svg/volume-mute-fill.svg)

## Props

| Prop Name | Type | Default | Possible Values | Description |
| :-------- | :--- | :------ | :-------------- | :---------- |
| `volumeLayout` | string | `'bar'` | - | Layout style of the volume control. |
| `volume` | number | `50` | - | Current volume level percentage. |
| `isMuted` | boolean | `false` | - | Indicates whether audio is currently muted. |
| `orientation` | string | `'vertical'` | horizontal, vertical, horizontal-flipped, vertical-flipped | Orientation and layout direction of the volume control panel. |
| `bgColor` | string | `'var(--music-player-volume-controls-bg)'` | - | Background color of the main volume container. |
| `borderColor` | string | `'var(--music-player-volume-controls-border)'` | - | Border color of the volume container and tracks. |
| `borderRadius` | string | `'var(--music-player-border-radius)'` | - | Border radius for components. |
| `sliderColor` | string | `'var(--music-player-volume-controls-slider)'` | - | Slider color used for active fills and ranges. |
| `textColor` | string | `'var(--music-player-volume-controls-text)'` | - | Text color used for labels and secondary elements. |
| `containerColor` | string | `'var(--music-player-volume-controls-container)'` | - | Container background color used for tracks and thumbs. |
| `trackColor` | string | `'var(--music-player-volume-controls-track)'` | - | Track color used for inactive slider ranges. |
| `highlightColor` | string | `'var(--music-player-volume-controls-highlight)'` | - | Highlight color used for active states. |
| `muteBg` | string | `'var(--music-player-volume-controls-mute-bg)'` | - | Background color of the mute button. |
| `muteHoverBg` | string | `'var(--music-player-volume-controls-mute-hover-bg)'` | - | Hover background color of the mute button. |
| `muteActiveBg` | string | `'var(--music-player-volume-controls-mute-active-bg)'` | - | Active background color of the mute button. |
| `muteActiveHoverBg` | string | `'var(--music-player-volume-controls-mute-active-hover-bg)'` | - | Active hover background color of the mute button. |
| `muteIconColor` | string | `'var(--music-player-volume-controls-mute-icon-color)'` | - | Icon color of the mute button. |
| `muteHoverIconColor` | string | `'var(--music-player-volume-controls-mute-hover-icon-color)'` | - | Hover icon color of the mute button. |
| `muteActiveIconColor` | string | `'var(--music-player-volume-controls-mute-active-icon-color)'` | - | Active icon color of the mute button. |
| `muteActiveHoverIconColor` | string | `'var(--music-player-volume-controls-mute-active-hover-icon-color)'` | - | Active hover icon color of the mute button. |

## Computed Properties & Methods

- `isCurrentHorizontal`: Evaluates whether the current orientation includes a horizontal format.

## Slots

- *None specified*

## Internal Methods

- *None specified*
