## Overview

Main music player component handling YouTube playback, state management, layouts, and subcomponent coordination.

**Source File:** [music_player.vue](../../../src/components/reusables/music_player.vue)

## Imported Components

- [ToasterNotification](notification_toaster.md)
- [CustomButton](custom_button.md)
- [PlayerControls](music_player_controls.md)
- [WalkmanDevice](music_player_walkman.md)
- [PlaylistView](music_player_playlist.md)
- [VolumeControl](music_player_volume_control.md)
- [FloatingNotes](music_player_floating_notes.md)

## Imported Composables

- *None specified*

## Imported Assets

- [musicNoteSvg](../../../src/assets/svg/music-note-4-svgrepo-com.svg)
- [triangleLeftSvg](../../../src/assets/svg/triangle-left-12-filled.svg)
- [triangleUpSvg](../../../src/assets/svg/triangle-up-12-filled.svg)
- [nintenBoppinIcon](../../../src/assets/img/characters/Ninten_Boppin.gif)
- [ninten67Icon](../../../src/assets/img/funny/Ninten_67.gif)
- [ferris_special_tape](../../../src/assets/img/funny/ferris_special_mixtape.png)

## Props

| Prop Name | Type | Default | Possible Values | Description |
| :-------- | :--- | :------ | :-------------- | :---------- |
| `playlistId` | string | `''` | - | The YouTube playlist ID or full playlist URL. |
| `pageSize` | number | `7` | - | The number of tracks to display per page in the playlist view. |
| `footerBehavior` | string | `'center'` | - | Determines how the player reacts when overlapping the page footer. |
| `volumeLayout` | string | `'wheel'` | - | The layout style used for the volume control component. |
| `minimizedBehavior` | string | `'default'` | - | Defines the behavior style when the player is minimized. |
| `orientation` | string | `'horizontal'` | - | Sets the outer layout orientation of the player. |

## Computed Properties & Methods

- *None specified*

## Slots

- *None specified*

## Internal Methods

- `formatTime`: Formats track duration seconds into a human-readable mm:ss string.
- `extractPlaylistId`: Extracts a clean YouTube playlist identifier or URL string.
- `updateFooterPosition`: Calculates footer overlap and updates player positioning dynamically on scroll.
- `initPlayer`: Injects the YouTube iframe API script into the document IF missing.
- `createPlayer`: Instantiates the YouTube player object and registers event handlers.
- `syncState`: Syncs the player state and asynchronously fetches track metadata titles in batches.
- `startInterval`: Starts an interval timer to update playback progress tracking.
- `stopInterval`: Clears the active progress tracking interval timer.
- `togglePlay`: Toggles playback state between playing and paused.
- `stopPlayer`: Stops playback completely and resets current seek positions.
- `changeTrack`: Changes to the next or previous track in the playlist index.
- `playTrack`: Jumps to and plays a specific track index within the playlist.
- `onSeek`: Seeks playback to a specific timestamp based on input events.
- `onVolumeChange`: Updates the audio player volume level from slider inputs.
- `onWheelVolume`: Adjusts volume levels incrementally using mouse scroll wheel delta values.
- `toggleMute`: Toggles audio muting state and retains previous active volume levels.
- `toggleTapeStyle`: Toggles tape image display state and special style palette.
- `handleRecClick`: Handles recording button interactions and triggers secret easter eggs upon threshold hits.
- `handleSpecialTapeUpdate`: Handles real-time updates when the special tape option changes.
- `onCompactLeave`: Resets inline element transition styles when closing the compact player button.
