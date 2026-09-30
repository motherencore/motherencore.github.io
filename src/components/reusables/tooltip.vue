<template>
  <Transition name="tooltip-fade">
    <span
      v-if="show"
      class="custom-tooltip"
      :class="`position-${position}`"
      :style="computedStyles"
      role="tooltip"
    >
      <!-- @slot tooltip-text - The text displayed in the tool tip -->
      <slot name="tooltip-text">{{ text }}</slot>
      <img
        :src="tooltipArrow"
        class="tooltip-arrow"
        alt=""
      />
    </span>
  </Transition>
</template>

<script setup>
/**
  * @file        tooltip.vue
  * @brief       A customizable tooltip component supporting multiple positions, transition durations, and custom styling.
  * @displayName Tooltip
*/

import { computed } from 'vue'
import tooltipArrow from '@/assets/svg/triangle-down-filled.svg'

const props = defineProps({
  /**
    * Controls whether the tooltip is visible.
    * @public
    */
  show: {
    type    : Boolean,
    default : false
  },
  /**
    * Text content displayed inside the tooltip when slot is empty.
    * @public
    */
  text: {
    type    : String,
    default : ''
  },
  /**
    * Position of the tooltip relative to the target element ('top', 'bottom', 'left', 'right').
    * @public
    */
  position: {
    type     : String,
    default  : 'top',
    validator: (value) => ['top', 'bottom', 'left', 'right'].includes(value)
  },
  /**
    * Transition animation duration in milliseconds.
    * @public
    */
  duration: {
    type    : Number,
    default : 300 
  },
  /**
    * Background color of the tooltip container.
    * @public
    */
  backgroundColor: {
    type    : String,
    default : '#ffffff'
  },
  /**
    * Border color of the tooltip container.
    * @public
    */
  borderColor: {
    type    : String,
    default : '#000000'
  },
  /**
    * Border width of the tooltip container.
    * @public
    */
  borderWidth: {
    type    : String,
    default : '3px'
  },
  /**
    * Text color of the tooltip.
    * @public
    */
  textColor: {
    type    : String,
    default : 'var(--color-primary)'
  }
})

const computedStyles = computed(() => ({
  '--tooltip-bg'           : props.backgroundColor,
  '--tooltip-border-color' : props.borderColor,
  '--tooltip-border-width' : props.borderWidth,
  '--tooltip-text-color'   : props.textColor,
  '--tooltip-duration'     : `${props.duration}ms`
}))
</script>

<style scoped>
.custom-tooltip {
  position             : absolute;
  border-radius        : 12px;
  font-family          : var(--font-p, sans-serif);
  font-weight          : bold;
  font-size            : 14px;
  padding              : 8px 16px;
  white-space          : nowrap;
  pointer-events       : none;
  z-index              : 100;

  background-color     : var(--tooltip-bg);
  border-color         : var(--tooltip-border-color);
  border-width         : var(--tooltip-border-width);
  border-style         : solid;
  color                : var(--tooltip-text-color);
}

.position-top {
  bottom               : calc(100% + 12px);
  left                 : 50%;
  transform            : translateX(-50%);
}

.position-bottom {
  top                  : calc(100% + 12px);
  left                 : 50%;
  transform            : translateX(-50%);
}

.position-left {
  right                : calc(100% + 12px);
  top                  : 50%;
  transform            : translateY(-50%);
}

.position-right {
  left                 : calc(100% + 12px);
  top                  : 50%;
  transform            : translateY(-50%);
}

/* Arrow Orientations */
.position-top .tooltip-arrow {
  top                  : 100%;
  left                 : 50%;
  transform            : translateX(-50%) translateY(-2px);
}

.position-bottom .tooltip-arrow {
  bottom               : 100%;
  left                 : 50%;
  transform            : translateX(-50%) translateY(2px) rotate(180deg);
}

.position-left .tooltip-arrow {
  left                 : 100%;
  top                  : 50%;
  transform            : translateY(-50%) translateX(-2px) rotate(-90deg);
}

.position-right .tooltip-arrow {
  right                : 100%;
  top                  : 50%;
  transform            : translateY(-50%) translateX(2px) rotate(90deg);
}

.tooltip-arrow {
  position             : absolute;
  width                : 14px;
  height               : auto;
  pointer-events       : none;
}

.tooltip-fade-enter-active,
.tooltip-fade-leave-active {
  transition           : opacity var(--tooltip-duration) ease, 
                         transform var(--tooltip-duration) cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.position-top.tooltip-fade-enter-from,
.position-top.tooltip-fade-leave-to {
  opacity              : 0;
  transform            : translateX(-50%) translateY(8px) scale(0.95);
}

.position-bottom.tooltip-fade-enter-from,
.position-bottom.tooltip-fade-leave-to {
  opacity              : 0;
  transform            : translateX(-50%) translateY(-8px) scale(0.95);
}

.position-left.tooltip-fade-enter-from,
.position-left.tooltip-fade-leave-to {
  opacity              : 0;
  transform            : translateY(-50%) translateX(8px) scale(0.95);
}

.position-right.tooltip-fade-enter-from,
.position-right.tooltip-fade-leave-to {
  opacity              : 0;
  transform            : translateY(-50%) translateX(-8px) scale(0.95);
}

@media (max-width: 768px) {
  .custom-tooltip {
    font-size          : 12px;
    padding            : 6px 12px;
    border-radius      : 8px;
  }

  .tooltip-arrow {
    width              : 10px;
  }
}
</style>