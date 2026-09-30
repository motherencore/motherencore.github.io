<template>
  <div 
    class="external-side-volume" 
    :class="[`layout-${volumeLayout}`, `orientation-${orientation}`]"
    :style="computedStyles"
  >
    <CustomButton
      class            = "mute-toggle-btn" 
      :class           = "{ active: isMuted }"
      :icon-src        = "isMuted ? imgVolumeMute : imgVolume"
      padding          = "4px"
      icon-size        = "1.3em"
      :bg-color        = "isMuted ? muteActiveBg : muteBg"
      :hover-bg-color  = "isMuted ? muteActiveHoverBg : muteHoverBg"
      :icon-color      = "isMuted ? muteActiveIconColor : muteIconColor"
      :hover-icon-color= "isMuted ? muteActiveHoverIconColor : muteHoverIconColor"
      @click           = "$emit('toggleMute')"
    />

    <div v-if="!isCurrentHorizontal" class="volume-control-container">
      <div v-if="volumeLayout === 'wheel'" class="thumbwheel" @wheel.prevent="$emit('wheelVolume', $event)">
        <div class="wheel-ridges"></div>
      </div>

      <div v-else-if="volumeLayout === 'bar'" class="vertical-slider-track">
        <input 
          type          ="range" 
          min           ="0" 
          max           ="100" 
          step          ="1"
          :value        ="volume" 
          class         ="vertical-range-input"
          :style        ="{ '--volume-percent': volume + '%' }"
          @input        ="$emit('volumeChange', $event)"
        />
      </div>
    </div>

    <div v-if="isCurrentHorizontal" class="mobile-slider-track">
      <input 
        type          ="range" 
        min           ="0" 
        max           ="100" 
        step          ="1"
        :value        ="volume" 
        class         ="mobile-range-input"
        :style        ="{ '--volume-percent': volume + '%' }"
        @input        ="$emit('volumeChange', $event)"
      />
    </div>
  </div>
</template>

<script setup>
/**
  * @file        music_player_volume_control.vue
  * @brief       Music player volume control component supporting horizontal/vertical layouts, thumbwheels, slider bars, and mute state toggling.
  * @displayName Music Player Volume Control
*/

import { computed } from 'vue'
import CustomButton from '@/components/reusables/custom_button.vue'

import imgVolume      from '@/assets/svg/volume-fill.svg'
import imgVolumeMute  from '@/assets/svg/volume-mute-fill.svg'

const props = defineProps({
  /**
    * Layout style of the volume control.
    * @public
    */
  volumeLayout: {
    type   : String,
    default: 'bar'
  },
  /**
    * Current volume level percentage.
    * @public
    */
  volume: {
    type   : Number,
    default: 50
  },
  /**
    * Indicates whether audio is currently muted.
    * @public
    */
  isMuted: {
    type   : Boolean,
    default: false
  },
  /**
    * Orientation and layout direction of the volume control panel.
    * @public
    */
  orientation: {
    type     : String,
    default  : 'vertical',
    validator: (value) => ['horizontal', 'vertical', 'horizontal-flipped', 'vertical-flipped'].includes(value)
  },
  /**
    * Background color of the main volume container.
    * @public
    */
  bgColor: {
    type   : String,
    default: 'var(--music-player-volume-controls-bg)'
  },
  /**
    * Border color of the volume container and tracks.
    * @public
    */
  borderColor: {
    type   : String,
    default: 'var(--music-player-volume-controls-border)'
  },
  /**
    * Border radius for components.
    * @public
    */
  borderRadius: {
    type   : String,
    default: 'var(--music-player-border-radius)'
  },
  /**
    * Slider color used for active fills and ranges.
    * @public
    */
  sliderColor: {
    type   : String,
    default: 'var(--music-player-volume-controls-slider)'
  },
  /**
    * Text color used for labels and secondary elements.
    * @public
    */
  textColor: {
    type   : String,
    default: 'var(--music-player-volume-controls-text)'
  },
  /**
    * Container background color used for tracks and thumbs.
    * @public
    */
  containerColor: {
    type   : String,
    default: 'var(--music-player-volume-controls-container)'
  },
  /**
    * Track color used for inactive slider ranges.
    * @public
    */
  trackColor: {
    type   : String,
    default: 'var(--music-player-volume-controls-track)'
  },
  /**
    * Highlight color used for active states.
    * @public
    */
  highlightColor: {
    type   : String,
    default: 'var(--music-player-volume-controls-highlight)'
  },
  /**
    * Background color of the mute button.
    * @public
    */
  muteBg: {
    type   : String,
    default: 'var(--music-player-volume-controls-mute-bg)'
  },
  /**
    * Hover background color of the mute button.
    * @public
    */
  muteHoverBg: {
    type   : String,
    default: 'var(--music-player-volume-controls-mute-hover-bg)'
  },
  /**
    * Active background color of the mute button.
    * @public
    */
  muteActiveBg: {
    type   : String,
    default: 'var(--music-player-volume-controls-mute-active-bg)'
  },
  /**
    * Active hover background color of the mute button.
    * @public
    */
  muteActiveHoverBg: {
    type   : String,
    default: 'var(--music-player-volume-controls-mute-active-hover-bg)'
  },
  /**
    * Icon color of the mute button.
    * @public
    */
  muteIconColor: {
    type   : String,
    default: 'var(--music-player-volume-controls-mute-icon-color)'
  },
  /**
    * Hover icon color of the mute button.
    * @public
    */
  muteHoverIconColor: {
    type   : String,
    default: 'var(--music-player-volume-controls-mute-hover-icon-color)'
  },
  /**
    * Active icon color of the mute button.
    * @public
    */
  muteActiveIconColor: {
    type   : String,
    default: 'var(--music-player-volume-controls-mute-active-icon-color)'
  },
  /**
    * Active hover icon color of the mute button.
    * @public
    */
  muteActiveHoverIconColor: {
    type   : String,
    default: 'var(--music-player-volume-controls-mute-active-hover-icon-color)'
  }
})

defineEmits(['wheelVolume', 'volumeChange', 'toggleMute'])

/**
  * Evaluates whether the current orientation includes a horizontal format.
  * @private
  * @returns {boolean} True if horizontal layout is active.
  */
const isCurrentHorizontal = computed(() => {
  return props.orientation.includes('horizontal')
})

/**
  * Consolidates component styling props into CSS custom properties.
  * @private
  */
const computedStyles = computed(() => ({
  '--vol-bg'             : props.bgColor,
  '--vol-border'         : props.borderColor,
  '--vol-radius'         : props.borderRadius,
  '--vol-slider'         : props.sliderColor,
  '--vol-text'           : props.textColor,
  '--vol-container'      : props.containerColor,
  '--vol-track'          : props.trackColor,
  '--vol-highlight'      : props.highlightColor
}))
</script>

<style scoped>
.external-side-volume {
  display               : flex;
  background            : var(--vol-bg);
  border                : var(--vol-border);
  border-radius         : var(--vol-radius);
  padding               : 6px;
  box-sizing            : border-box;
  flex-shrink           : 0;
  gap                   : 4px;
}

.external-side-volume.orientation-vertical {
  flex-direction        : column;
  align-items           : center;
}

.external-side-volume.orientation-vertical-flipped {
  flex-direction        : column-reverse;
  align-items           : center;
}

.external-side-volume.orientation-vertical.layout-wheel,
.external-side-volume.orientation-vertical-flipped.layout-wheel {
  height                : 88px;
}

.external-side-volume.orientation-vertical.layout-bar,
.external-side-volume.orientation-vertical-flipped.layout-bar {
  height                : 150px;
}

.external-side-volume.orientation-vertical .volume-control-container,
.external-side-volume.orientation-vertical-flipped .volume-control-container {
  flex-direction        : column;
  align-items           : center;
  gap                   : 2px;
  flex                  : 1;
}

.external-side-volume.orientation-horizontal,
.external-side-volume.orientation-horizontal-flipped {
  width                 : 100%;
  height                : auto !important;
  flex-direction        : row;
  align-items           : center;
  padding               : 8px 12px;
  gap                   : 10px;
}

.external-side-volume.orientation-horizontal-flipped {
  flex-direction        : row-reverse;
}

.external-side-volume.orientation-horizontal .mobile-slider-track,
.external-side-volume.orientation-horizontal-flipped .mobile-slider-track {
  display               : flex;
  flex                  : 1;
  height                : 26px;
  background            : var(--vol-container);
  border                : var(--vol-border);
  border-radius         : 6px;
  align-items           : center;
  padding               : 0 8px;
  box-sizing            : border-box;
}

.external-side-volume.orientation-horizontal .mobile-range-input,
.external-side-volume.orientation-horizontal-flipped .mobile-range-input {
  -webkit-appearance    : none;
  appearance            : none;
  width                 : 100%;
  height                : 6px;
  background            : linear-gradient(to right, var(--vol-slider) var(--volume-percent, 0%), var(--vol-track) var(--volume-percent, 0%));
  border-radius         : 3px;
  outline               : none;
  cursor                : pointer;
}

.external-side-volume.orientation-horizontal .mobile-range-input::-webkit-slider-thumb,
.external-side-volume.orientation-horizontal-flipped .mobile-range-input::-webkit-slider-thumb {
  -webkit-appearance    : none;
  appearance            : none;
  width                 : 14px;
  height                : 14px;
  border-radius         : 3px;
  background            : var(--vol-slider);
  border                : var(--vol-border);
}

.external-side-volume.orientation-horizontal .mobile-range-input::-moz-range-thumb,
.external-side-volume.orientation-horizontal-flipped .mobile-range-input::-moz-range-thumb {
  width                 : 14px;
  height                : 14px;
  border                : var(--vol-border);
  border-radius         : var(--vol-radius);
  background            : var(--vol-slider);
}

.thumbwheel {
  width                 : 26px;
  height                : 36px;
  background            : var(--vol-container);
  border                : var(--vol-border);
  border-radius         : var(--vol-radius);
  cursor                : ns-resize;
  position              : relative;
  overflow              : hidden;
}

.wheel-ridges {
  position              : absolute;
  top                   : 0;
  bottom                : 0;
  left                  : 0;
  right                 : 0;
  background            : repeating-linear-gradient(0deg, var(--vol-bg), var(--vol-bg) 2px, var(--vol-border) 3px, var(--vol-bg) 4px);
}

.vertical-slider-track {
  width                 : 24px;
  height                : 90px;
  background            : var(--vol-container);
  border                : var(--vol-border);
  border-radius         : var(--vol-radius);
  position              : relative;
  display               : flex;
  justify-content       : center;
  align-items           : center;
  overflow              : hidden;
}

.vertical-range-input {
  -webkit-appearance    : none;
  appearance            : none;
  width                 : 86px;
  height                : 6px;
  background            : linear-gradient(to right, var(--vol-slider) var(--volume-percent, 0%), var(--vol-track) var(--volume-percent, 0%));
  border-radius         : 3px;
  transform             : rotate(-90deg);
  cursor                : pointer;
  outline               : none;
}

.vertical-range-input::-webkit-slider-thumb {
  -webkit-appearance    : none;
  appearance            : none;
  width                 : 14px;
  height                : 14px;
  border-radius         : 3px;
  background            : var(--vol-slider);
  border                : var(--vol-border);
}

.vertical-range-input::-moz-range-thumb {
  width                 : 14px;
  height                : 14px;
  border-radius         : 3px;
  background            : var(--vol-slider);
  border                : var(--vol-border);
}

.mute-toggle-btn {
  flex-shrink           : 0;
  width                 : 28px;
  height                : 28px;
}

@media (max-width: 480px) {
  .external-side-volume:not([class*="orientation-"]) {
    width               : 100%;
    height              : auto !important;
    flex-direction      : row;
    align-items         : center;
    padding             : 8px 12px;
    box-sizing          : border-box;
    gap                 : 10px;
  }
}
</style>