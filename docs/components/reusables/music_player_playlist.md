## Overview

Music player playlist component displaying paginated track listings, current track states, loading indicators, and pagination navigation controls.

**Source File:** [music_player_playlist.vue](../../../src/components/reusables/music_player_playlist.vue)

## Imported Components

- [SocialMediaButton](social_media_button.md)
- [CustomButton](custom_button.md)

## Imported Composables

- *None specified*

## Imported Assets

- [previous_icon](../../../src/assets/svg/triangle-left-12-filled.svg)
- [next_icon](../../../src/assets/svg/triangle-right-12-filled.svg)

## Props

| Prop Name | Type | Default | Possible Values | Description |
| :-------- | :--- | :------ | :-------------- | :---------- |
| `isLoadingTracks` | boolean | `false` | - | Indicates whether the track list is currently in a loading state. |
| `paginatedTracks` | array | `[]` | - | Array of tracks to display for the current page view. |
| `currentTrackIndex` | number | `-1` | - | Index of the track that is currently playing globally. |
| `currentPage` | number | `1` | - | The current active pagination page number. |
| `totalPages` | number | `1` | - | Total number of available pages. |
| `getGlobalIndex` | func | `''` | - | Helper function to calculate the global track index from a local page index. |
| `pageSize` | number | `7` | - | Number of items to display per page, controlling container height dynamically. |
| `bgColor` | string | `'var(--music-player-playlist-bg)'` | - | Background color of the main playlist container. |
| `borderColor` | string | `'var(--music-player-playlist-border)'` | - | Border style/color used for container elements and track rows. |
| `borderRadius` | string | `'var(--music-player-playlist-border-radius)'` | - | Border radius for rounded container corners. |
| `headerBgColor` | string | `'var(--music-player-playlist-header-bg)'` | - | Background color of the header section. |
| `headerTextColor` | string | `'var(--music-player-playlist-header-text)'` | - | Text/title color inside the header section. |
| `itemBgColor` | string | `'var(--music-player-playlist-item-bg)'` | - | Default background color for list tracks. |
| `itemActiveBgColor` | string | `'var(--music-player-playlist-item-active-bg)'` | - | Background color for the currently playing track. |
| `itemActiveTextColor` | string | `'var(--music-player-playlist-item-active-text)'` | - | Text color for the currently playing track. |
| `textColor` | string | `'var(--music-player-playlist-text-color)'` | - | General text color inside track items. |
| `numberColor` | string | `'var(--music-player-playlist-number-color)'` | - | Color for track numbers in normal state. |
| `numberActiveColor` | string | `'var(--music-player-playlist-number-active-color)'` | - | Color for track numbers when active. |
| `loadingBgColor` | string | `'var(--music-player-playlist-loading-bg)'` | - | Background color of the loading state box. |
| `loadingTextColor` | string | `'var(--music-player-playlist-loading-text)'` | - | Text color of the loading state message. |
| `pageInfoColor` | string | `'var(--music-player-playlist-page-info-color)'` | - | Text color for the page pagination counter info. |
| `playlistButtonBg` | string | `'var(--music-player-playlist-button-bg)'` | - | Background color of pagination buttons. |
| `playlistButtonHoverBg` | string | `'var(--music-player-playlist-button-hover-bg)'` | - | Hover background color of pagination buttons. |
| `playlistButtonIconColor` | string | `'var(--music-player-playlist-button-icon-color)'` | - | Icon color of pagination buttons. |
| `playlistButtonHoverIconColor` | string | `'var(--music-player-playlist-button-hover-icon-color)'` | - | Hover icon color of pagination buttons. |

## Computed Properties & Methods

- *None specified*

## Slots

- *None specified*

## Internal Methods

- *None specified*
