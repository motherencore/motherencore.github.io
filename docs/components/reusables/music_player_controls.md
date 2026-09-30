## Overview

Music player control panel component featuring mechanical-style buttons for playback navigation, recording, and state management.

**Source File:** [music_player_controls.vue](../../../src/components/reusables/music_player_controls.vue)

## Imported Components

- [CustomButton](custom_button.md)

## Imported Composables

- *None specified*

## Imported Assets

- [prevSvg](../../../src/assets/svg/player-prev.svg)
- [playSvg](../../../src/assets/svg/player-play.svg)
- [pauseSvg](../../../src/assets/svg/player-pause.svg)
- [stopSvg](../../../src/assets/svg/player-stop.svg)
- [nextSvg](../../../src/assets/svg/player-next.svg)
- [recSvg](../../../src/assets/svg/player-rec.svg)

## Props

| Prop Name | Type | Default | Possible Values | Description |
| :-------- | :--- | :------ | :-------------- | :---------- |
| `isPlaying` | boolean | `false` | - | Indicates whether the player is currently active and playing media. |
| `isRecording` | boolean | `false` | - | Indicates whether the player is currently recording. |
| `prevIconColor` | string | `'var(--music-player-color-bg-secondary)'` | - | Icon color for previous button. |
| `prevHoverIconColor` | string | `'var(--music-player-color-bg-secondary)'` | - | Hover icon color for previous button. |
| `prevBgColor` | string | `'var(--music-player-color-surface)'` | - | Background color for previous button. |
| `prevHoverBgColor` | string | `'var(--color-custom-button-hover)'` | - | Hover background color for previous button. |
| `playIconColor` | string | `'var(--music-player-color-bg-secondary)'` | - | Icon color for play button. |
| `playHoverIconColor` | string | `'var(--music-player-color-bg-secondary)'` | - | Hover icon color for play button. |
| `playBgColor` | string | `'var(--music-player-color-playbt-paused)'` | - | Background color for play button. |
| `playHoverBgColor` | string | `'var(--color-custom-button-hover)'` | - | Hover background color for play button. |
| `stopIconColor` | string | `'var(--music-player-color-bg-secondary)'` | - | Icon color for stop button. |
| `stopHoverIconColor` | string | `'var(--music-player-color-bg-secondary)'` | - | Hover icon color for stop button. |
| `stopBgColor` | string | `'var(--music-player-color-surface)'` | - | Background color for stop button. |
| `stopHoverBgColor` | string | `'var(--color-custom-button-hover)'` | - | Hover background color for stop button. |
| `nextIconColor` | string | `'var(--music-player-color-bg-secondary)'` | - | Icon color for next button. |
| `nextHoverIconColor` | string | `'var(--music-player-color-bg-secondary)'` | - | Hover icon color for next button. |
| `nextBgColor` | string | `'var(--music-player-color-surface)'` | - | Background color for next button. |
| `nextHoverBgColor` | string | `'var(--color-custom-button-hover)'` | - | Hover background color for next button. |
| `recIconColor` | string | `'var(--music-player-color-bg-secondary)'` | - | Icon color for record button. |
| `recHoverIconColor` | string | `'var(--music-player-color-bg-secondary)'` | - | Hover icon color for record button. |
| `recBgColor` | string | `'#e74c3c'` | - | Background color for record button. |
| `recHoverBgColor` | string | `'var(--color-custom-button-hover)'` | - | Hover background color for record button. |

## Computed Properties & Methods

- *None specified*

## Slots

- *None specified*

## Internal Methods

- *None specified*
