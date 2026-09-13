<template>
  <div class="music-player walkman">
    <div class="walkman-chassis">
      <div class="walkman-top-panel">
        <div class="model-badge">
          <span class="brand-name">WALKMAN</span>
        </div>
        <CustomButton 
          v-if              = "hasSpecialTapeAccess" 
          class             = "tape-toggle-btn" 
          :class            = "{ active: showImageTape }"
          :icon-src         = "starIcon"
          :bg-color         = "showImageTape ? walkmanButtonActiveBg : walkmanButtonBg"
          :hover-bg-color   = "showImageTape ? walkmanButtonActiveHoverBg : walkmanButtonHoverBg"
          :icon-color       = "showImageTape ? walkmanButtonActiveIconColor : walkmanButtonIconColor"
          :hover-icon-color = "showImageTape ? walkmanButtonActiveHoverIconColor : walkmanButtonHoverIconColor"
          height            = "24px"
          width             = "24px"
          padding           = "2px"
          icon-size         = "14px"
          @click            = "$emit('toggleTapeStyle')"
        />
      </div>

      <div class="walkman-control-board">
        <div class="lcd-panel">
          <div class="lcd-screen-inner">
            <div class="lcd-top-row">
              <span class="lcd-status-tag">{{ isPlaying ? 'PLAY' : 'STOP' }}</span>
              <span class="lcd-track-num">TRK {{ currentTrackIndex + 1 }}</span>
              <span class="lcd-time-display">{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</span>
            </div>
            <input 
              type          = "range" 
              min           = "0" 
              :max          = "duration || 0" 
              step          = "0.1"
              :value        = "currentTime" 
              @input        = "$emit('seek', $event)"
              class         = "lcd-progress-slider"
            />
          </div>
        </div>
      </div>

      <div class="cassette-door" :class="{ spinning: isPlaying }">
        <div v-if="showImageTape && hasSpecialTapeAccess" class="custom-image-tape-container">
          <img :src="specialTapeImg" alt="Custom Cassette" class="custom-cassette-img" />
        </div>
        <div v-else class="cassette-shell">
          <div class="cassette-label-header">
            <span class="label-brand">ENCORE MIXTAPE</span>
            <span class="label-type">VOL.II</span>
          </div>

          <div class="cassette-window">
            <div class="reel left-reel">
              <div class="reel-hub"></div>
            </div>
            <div class="reel right-reel">
              <div class="reel-hub"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
  * @file        music_player_walkman.vue
  * @brief       Walkman-style music player component featuring an LCD screen, track progress scrubber, custom cassette display toggle with an SVG icon, and animated tape reels.
  * @displayName Music Player Walkman
*/

import { ref, onMounted, onUnmounted } from 'vue'
import CustomButton from '@/components/reusables/custom_button.vue'
import starIcon     from '@/assets/svg/star-rounded.svg'

defineProps({
  /**
    * Indicates whether media is currently playing.
    * @public
    */
  isPlaying: {
    type: Boolean,
    default: false
  },
  /**
    * Controls whether to display the custom image cassette instead of the default shell.
    * @public
    */
  showImageTape: {
    type: Boolean,
    default: false
  },
  /**
    * Index of the currently playing track.
    * @public
    */
  currentTrackIndex: {
    type: Number,
    default: 0
  },
  /**
    * Current playback time in seconds.
    * @public
    */
  currentTime: {
    type: Number,
    default: 0
  },
  /**
    * Total duration of the current track in seconds.
    * @public
    */
  duration: {
    type: Number,
    default: 0
  },
  /**
    * Image URL for the special custom tape design.
    * @public
    */
  specialTapeImg: {
    type: String,
    default: ''
  },
  /**
    * Utility function to format timestamp numbers into displayable time strings.
    * @public
    */
  formatTime: {
    type: Function,
    required: true
  },
  /**
    * Background color of the walkman player container.
    * @public
    */
  bgColor: {
    type: String,
    default: 'var(--music-player-color-primary)'
  },
  /**
    * Border style of the walkman player.
    * @public
    */
  border: {
    type: String,
    default: 'var(--music-player-border)'
  },
  /**
    * Border radius for the walkman container and panels.
    * @public
    */
  borderRadius: {
    type: String,
    default: 'var(--music-player-border-radius)'
  },
  /**
    * Main chassis background color.
    * @public
    */
  chassisBg: {
    type: String,
    default: 'var(--music-player-color-bg-main)'
  },
  /**
    * Brand text accent color.
    * @public
    */
  brandColor: {
    type: String,
    default: 'var(--music-player-color-accent-light)'
  },
  /**
    * Cassette door background color.
    * @public
    */
  doorBg: {
    type: String,
    default: 'var(--music-player-color-surface)'
  },
  /**
    * Cassette shell background color.
    * @public
    */
  shellBg: {
    type: String,
    default: 'var(--music-player-color-bg-secondary)'
  },
  /**
    * Cassette label text color.
    * @public
    */
  labelColor: {
    type: String,
    default: 'var(--music-player-color-placeholder-green)'
  },
  /**
    * Cassette window background color.
    * @public
    */
  windowBg: {
    type: String,
    default: 'var(--music-player-color-bg-dark)'
  },
  /**
    * Reel dashed border color.
    * @public
    */
  reelColor: {
    type: String,
    default: 'var(--music-player-color-accent-light)'
  },
  /**
    * Reel hub background color.
    * @public
    */
  reelHubBg: {
    type: String,
    default: 'var(--music-player-color-bg-main)'
  },
  /**
    * LCD panel background color.
    * @public
    */
  lcdBg: {
    type: String,
    default: 'var(--music-player-color-bg-dark)'
  },
  /**
    * LCD text and accent color.
    * @public
    */
  lcdColor: {
    type: String,
    default: 'var(--music-player-color-accent)'
  },
  /**
    * Background color of the special tape toggle button.
    * @public
    */
  walkmanButtonBg: {
    type: String,
    default: 'var(--music-player-walkman-button-bg)'
  },
  /**
    * Hover background color of the special tape toggle button.
    * @public
    */
  walkmanButtonHoverBg: {
    type: String,
    default: 'var(--music-player-walkman-button-hover-bg)'
  },
  /**
    * Active background color of the special tape toggle button.
    * @public
    */
  walkmanButtonActiveBg: {
    type: String,
    default: 'var(--music-player-walkman-button-active-bg)'
  },
  /**
    * Active hover background color of the special tape toggle button.
    * @public
    */
  walkmanButtonActiveHoverBg: {
    type: String,
    default: 'var(--music-player-walkman-button-active-hover-bg)'
  },
  /**
    * Icon color of the special tape toggle button.
    * @public
    */
  walkmanButtonIconColor: {
    type: String,
    default: 'var(--music-player-walkman-button-icon-color)'
  },
  /**
    * Hover icon color of the special tape toggle button.
    * @public
    */
  walkmanButtonHoverIconColor: {
    type: String,
    default: 'var(--music-player-walkman-button-hover-icon-color)'
  },
  /**
    * Active icon color of the special tape toggle button.
    * @public
    */
  walkmanButtonActiveIconColor: {
    type: String,
    default: 'var(--music-player-walkman-button-active-icon-color)'
  },
  /**
    * Active hover icon color of the special tape toggle button.
    * @public
    */
  walkmanButtonActiveHoverIconColor: {
    type: String,
    default: 'var(--music-player-walkman-button-active-hover-icon-color)'
  }
})

defineEmits(['toggleTapeStyle', 'seek'])

/**
  * Tracks whether the user has unlocked special tape access in session storage.
  * @private
  */
const hasSpecialTapeAccess = ref(false)

/**
  * Checks session storage for special tape access permissions.
  * @private
  */
const checkSessionAccess = () => {
  hasSpecialTapeAccess.value = sessionStorage.getItem('unlocked_special_tape') === 'true'
}

onMounted(() => {
  checkSessionAccess()
  window.addEventListener('session-storage-updated', checkSessionAccess)
  window.addEventListener('storage', checkSessionAccess)
})

onUnmounted(() => {
  window.removeEventListener('session-storage-updated', checkSessionAccess)
  window.removeEventListener('storage', checkSessionAccess)
})
</script>

<style scoped>
.music-player.walkman {
  display               : flex;
  flex-direction        : column;
  width                 : 100%;
  background            : v-bind(bgColor);
  border                : v-bind(border);
  border-radius         : v-bind(borderRadius);
  padding               : 12px;
  box-sizing            : border-box;
  color                 : var(--music-player-color-bg-dark);
  font-family           : system-ui, -apple-system, sans-serif;
  user-select           : none;
}

.walkman-chassis {
  background            : v-bind(chassisBg);
  border                : v-bind(border);
  border-radius         : v-bind(borderRadius);
  padding               : 12px;
  display               : flex;
  flex-direction        : column;
  gap                   : 10px;
}

.walkman-top-panel {
  display               : flex;
  justify-content       : space-between;
  align-items           : center;
}

.model-badge {
  display               : flex;
  flex-direction        : column;
  align-items           : flex-start;
}

.brand-name {
  font-weight           : 900;
  font-size             : 0.75rem;
  letter-spacing        : 2px;
  color                 : v-bind(brandColor);
  font                  : var(--music_player-font-h1);
}

.tape-toggle-btn {
  flex-shrink           : 0;
}

.cassette-door {
  position              : relative;
  background            : v-bind(doorBg);
  border                : v-bind(border);
  border-radius         : v-bind(borderRadius);
  padding               : 8px;
  display               : flex;
  justify-content       : center;
  align-items           : center;
  height                : 80px;
  box-sizing            : border-box;
  overflow              : hidden;
}

.custom-image-tape-container {
  width                 : 100%;
  height                : 100%;
  display               : flex;
  justify-content       : center;
  align-items           : center;
  position              : relative;
}

.custom-cassette-img {
  width                 : 100%;
  height                : 100%;
  object-fit            : cover;
  display               : block;
}

.cassette-shell {
  width                 : 100%;
  background            : v-bind(shellBg);
  border-radius         : 4px;
  padding               : 8px;
  box-sizing            : border-box;
  display               : flex;
  flex-direction        : column;
  gap                   : 6px;
}

.cassette-label-header {
  display               : flex;
  justify-content       : space-between;
  font                  : var(--music_player-font-p);
  font-size             : 0.5rem;
  font-weight           : 700;
  color                 : v-bind(labelColor);
  border-bottom         : 1px solid v-bind(brandColor);
  padding-bottom        : 2px;
}

.cassette-window {
  background            : v-bind(windowBg);
  height                : 42px;
  border-radius         : 4px;
  display               : flex;
  justify-content       : space-around;
  align-items           : center;
  position              : relative;
  overflow              : hidden;
}

.reel {
  width                 : 28px;
  height                : 28px;
  border                : 3px dashed v-bind(reelColor);
  border-radius         : 50%;
  display               : flex;
  justify-content       : center;
  align-items           : center;
  animation             : spin 2s linear infinite;
  animation-play-state  : paused;
}

.cassette-door.spinning .reel {
  animation-play-state  : running;
}

.reel-hub {
  width                 : 8px;
  height                : 8px;
  background            : v-bind(reelHubBg);
  border-radius         : 50%;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.walkman-control-board {
  display               : flex;
  flex-direction        : column;
}

.lcd-panel {
  background            : v-bind(lcdBg);
  border                : v-bind(border);
  border-radius         : v-bind(borderRadius);
  padding               : 6px 10px;
}

.lcd-screen-inner {
  display               : flex;
  flex-direction        : column;
  gap                   : 4px;
}

.lcd-top-row {
  display               : flex;
  justify-content       : space-between;
  font                  : var(--music_player-font-p);
  font-size             : 0.7rem;
  font-weight           : 700;
}

.lcd-status-tag, .lcd-track-num, .lcd-time-display{
  color                 : v-bind(lcdColor);
}

.lcd-progress-slider {
  width                 : 100%;
  accent-color          : v-bind(lcdColor);
  cursor                : pointer;
  height                : 4px;
}

@media (max-height: 700px) {
  .cassette-window {
    height              : 30px;
  }
  .reel {
    width               : 20px;
    height              : 20px;
    border-width        : 2px;
  }
}
</style>