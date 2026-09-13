## Overview

Walkman-style music player component featuring an LCD screen, track progress scrubber, custom cassette display toggle with an SVG icon, and animated tape reels.

**Source File:** [music_player_walkman.vue](../../../src/components/reusables/music_player_walkman.vue)

## Imported Components

- [CustomButton](custom_button.md)

## Imported Composables

- *None specified*

## Imported Assets

- [starIcon](../../../src/assets/svg/star-rounded.svg)

## Props

| Prop Name | Type | Default | Possible Values | Description |
| :-------- | :--- | :------ | :-------------- | :---------- |
| `isPlaying` | boolean | `false` | - | Indicates whether media is currently playing. |
| `showImageTape` | boolean | `false` | - | Controls whether to display the custom image cassette instead of the default shell. |
| `currentTrackIndex` | number | `0` | - | Index of the currently playing track. |
| `currentTime` | number | `0` | - | Current playback time in seconds. |
| `duration` | number | `0` | - | Total duration of the current track in seconds. |
| `specialTapeImg` | string | `''` | - | Image URL for the special custom tape design. |
| `formatTime` | func | `''` | - | Utility function to format timestamp numbers into displayable time strings. |
| `bgColor` | string | `'var(--music-player-color-primary)'` | - | Background color of the walkman player container. |
| `border` | string | `'var(--music-player-border)'` | - | Border style of the walkman player. |
| `borderRadius` | string | `'var(--music-player-border-radius)'` | - | Border radius for the walkman container and panels. |
| `chassisBg` | string | `'var(--music-player-color-bg-main)'` | - | Main chassis background color. |
| `brandColor` | string | `'var(--music-player-color-accent-light)'` | - | Brand text accent color. |
| `doorBg` | string | `'var(--music-player-color-surface)'` | - | Cassette door background color. |
| `shellBg` | string | `'var(--music-player-color-bg-secondary)'` | - | Cassette shell background color. |
| `labelColor` | string | `'var(--music-player-color-placeholder-green)'` | - | Cassette label text color. |
| `windowBg` | string | `'var(--music-player-color-bg-dark)'` | - | Cassette window background color. |
| `reelColor` | string | `'var(--music-player-color-accent-light)'` | - | Reel dashed border color. |
| `reelHubBg` | string | `'var(--music-player-color-bg-main)'` | - | Reel hub background color. |
| `lcdBg` | string | `'var(--music-player-color-bg-dark)'` | - | LCD panel background color. |
| `lcdColor` | string | `'var(--music-player-color-accent)'` | - | LCD text and accent color. |
| `walkmanButtonBg` | string | `'var(--music-player-walkman-button-bg)'` | - | Background color of the special tape toggle button. |
| `walkmanButtonHoverBg` | string | `'var(--music-player-walkman-button-hover-bg)'` | - | Hover background color of the special tape toggle button. |
| `walkmanButtonActiveBg` | string | `'var(--music-player-walkman-button-active-bg)'` | - | Active background color of the special tape toggle button. |
| `walkmanButtonActiveHoverBg` | string | `'var(--music-player-walkman-button-active-hover-bg)'` | - | Active hover background color of the special tape toggle button. |
| `walkmanButtonIconColor` | string | `'var(--music-player-walkman-button-icon-color)'` | - | Icon color of the special tape toggle button. |
| `walkmanButtonHoverIconColor` | string | `'var(--music-player-walkman-button-hover-icon-color)'` | - | Hover icon color of the special tape toggle button. |
| `walkmanButtonActiveIconColor` | string | `'var(--music-player-walkman-button-active-icon-color)'` | - | Active icon color of the special tape toggle button. |
| `walkmanButtonActiveHoverIconColor` | string | `'var(--music-player-walkman-button-active-hover-icon-color)'` | - | Active hover icon color of the special tape toggle button. |

## Computed Properties & Methods

- *None specified*

## Slots

- *None specified*

## Internal Methods

- `hasSpecialTapeAccess`: Tracks whether the user has unlocked special tape access in session storage.
- `checkSessionAccess`: Checks session storage for special tape access permissions.
