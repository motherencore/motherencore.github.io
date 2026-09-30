<template>
  <div class="top-buttons-bar">
    <CustomButton
      class             = "top-mech-btn"
      :iconSrc          = "prevSvg"
      iconSize          = "16px"
      :iconColor        = "prevIconColor"
      :hoverIconColor   = "prevHoverIconColor"
      :bgColor          = "prevBgColor"
      :hoverBgColor     = "prevHoverBgColor"
      padding           = "0"
      width             = "100%"
      height            = "34px"
      aria-label        = "Previous track"
      @click            = "$emit('prev')"
    />

    <CustomButton
      class             = "top-mech-btn play-mech-btn"
      :class            = "{ 'is-playing': isPlaying }"
      :iconSrc          = "isPlaying ? pauseSvg : playSvg"
      iconSize          = "16px"
      :iconColor        = "playIconColor"
      :hoverIconColor   = "playHoverIconColor"
      :bgColor          = "isPlaying ? 'var(--music-player-color-playbt-playing)' : playBgColor"
      :hoverBgColor     = "playHoverBgColor"
      padding           = "0"
      width             = "100%"
      height            = "34px"
      :aria-label       = "isPlaying ? 'Pause' : 'Play'"
      @click            = "$emit('togglePlay')"
    />

    <CustomButton
      class             = "top-mech-btn"
      :iconSrc          = "stopSvg"
      iconSize          = "16px"
      :iconColor        = "stopIconColor"
      :hoverIconColor   = "stopHoverIconColor"
      :bgColor          = "stopBgColor"
      :hoverBgColor     = "stopHoverBgColor"
      padding           = "0"
      width             = "100%"
      height            = "34px"
      aria-label        = "Stop playback"
      @click            = "$emit('stop')"
    />

    <CustomButton
      class             = "top-mech-btn"
      :iconSrc          = "nextSvg"
      iconSize          = "16px"
      :iconColor        = "nextIconColor"
      :hoverIconColor   = "nextHoverIconColor"
      :bgColor          = "nextBgColor"
      :hoverBgColor     = "nextHoverBgColor"
      padding           = "0"
      width             = "100%"
      height            = "34px"
      aria-label        = "Next track"
      @click            = "$emit('next')"
    />

    <CustomButton
      class             = "top-mech-btn rec-mech-btn"
      :class            = "{ active: isRecording }"
      :iconSrc          = "recSvg"
      iconSize          = "16px"
      :iconColor        = "recIconColor"
      :hoverIconColor   = "recHoverIconColor"
      :bgColor          = "recBgColor"
      :hoverBgColor     = "recHoverBgColor"
      padding           = "0"
      width             = "100%"
      height            = "34px"
      aria-label        = "Record audio"
      @click            = "$emit('record')"
    />
  </div>
</template>

<script setup>
/**
  * @file        music_player_controls.vue
  * @brief       Music player control panel component featuring mechanical-style buttons for playback navigation, recording, and state management.
  * @displayName Music Player Controls
*/

import CustomButton from '@/components/reusables/custom_button.vue'

import prevSvg      from '@/assets/svg/player-prev.svg'
import playSvg      from '@/assets/svg/player-play.svg'
import pauseSvg     from '@/assets/svg/player-pause.svg'
import stopSvg      from '@/assets/svg/player-stop.svg'
import nextSvg      from '@/assets/svg/player-next.svg'
import recSvg       from '@/assets/svg/player-rec.svg'

defineProps({
  /** Indicates whether the player is currently active and playing media. 
    * @public
  */
  isPlaying: {
    type: Boolean,
    default: false
  },
  /** Indicates whether the player is currently recording. 
    * @public
  */
  isRecording: {
    type: Boolean,
    default: false
  },
  /** Icon color for previous button. 
    * @public
  */
  prevIconColor: {
    type: String,
    default: 'var(--music-player-color-bg-secondary)'
  },
  /** Hover icon color for previous button. 
    * @public
  */
  prevHoverIconColor: {
    type: String,
    default: 'var(--music-player-color-bg-secondary)'
  },
  /** Background color for previous button. 
    * @public
  */
  prevBgColor: {
    type: String,
    default: 'var(--music-player-color-surface)'
  },
  /** Hover background color for previous button. 
    * @public
  */
  prevHoverBgColor: {
    type: String,
    default: 'var(--color-custom-button-hover)'
  },
  /** Icon color for play button. 
    * @public
  */
  playIconColor: {
    type: String,
    default: 'var(--music-player-color-bg-secondary)'
  },
  /** Hover icon color for play button. 
    * @public
  */
  playHoverIconColor: {
    type: String,
    default: 'var(--music-player-color-bg-secondary)'
  },
  /** Background color for play button. 
    * @public
  */
  playBgColor: {
    type: String,
    default: 'var(--music-player-color-playbt-paused)'
  },
  /** Hover background color for play button. 
    * @public
  */
  playHoverBgColor: {
    type: String,
    default: 'var(--color-custom-button-hover)'
  },
  /** Icon color for stop button. 
    * @public
  */
  stopIconColor: {
    type: String,
    default: 'var(--music-player-color-bg-secondary)'
  },
  /** Hover icon color for stop button. 
    * @public
  */
  stopHoverIconColor: {
    type: String,
    default: 'var(--music-player-color-bg-secondary)'
  },
  /** Background color for stop button. 
    * @public
  */
  stopBgColor: {
    type: String,
    default: 'var(--music-player-color-surface)'
  },
  /** Hover background color for stop button. 
    * @public
  */
  stopHoverBgColor: {
    type: String,
    default: 'var(--color-custom-button-hover)'
  },
  /** Icon color for next button. 
    * @public
  */
  nextIconColor: {
    type: String,
    default: 'var(--music-player-color-bg-secondary)'
  },
  /** Hover icon color for next button. 
    * @public
  */
  nextHoverIconColor: {
    type: String,
    default: 'var(--music-player-color-bg-secondary)'
  },
  /** Background color for next button. 
    * @public
  */
  nextBgColor: {
    type: String,
    default: 'var(--music-player-color-surface)'
  },
  /** Hover background color for next button. 
    * @public
  */
  nextHoverBgColor: {
    type: String,
    default: 'var(--color-custom-button-hover)'
  },
  /** Icon color for record button. 
    * @public
  */
  recIconColor: {
    type: String,
    default: 'var(--music-player-color-bg-secondary)'
  },
  /** Hover icon color for record button. 
    * @public
  */
  recHoverIconColor: {
    type: String,
    default: 'var(--music-player-color-bg-secondary)'
  },
  /** Background color for record button. 
    * @public
  */
  recBgColor: {
    type: String,
    default: '#e74c3c'
  },
  /** Hover background color for record button. 
    * @public
  */
  recHoverBgColor: {
    type: String,
    default: 'var(--color-custom-button-hover)'
  }
})

/** Emitted player control navigation events.
  * @public
*/
defineEmits(['prev', 'togglePlay', 'stop', 'next', 'record'])
</script>

<style scoped>
.top-buttons-bar {
  display               : flex;
  justify-content       : center;
  gap                   : 6px;
  width                 : 100%;
  background            : var(--music-player-color-bg-dark);
  border                : var(--music-player-border);
  border-radius         : 8px;
  box-sizing            : border-box;
  overflow              : visible;
}

.top-mech-btn {
  flex                  : 1;
  min-width             : 0;
}
</style>