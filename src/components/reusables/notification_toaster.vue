<template>
  <Transition :name="transitionName">
    <div 
      v-if="visible" 
      class="toaster-notification"
      :class="[positionClass, typeClass]"
      :style="{ '--toaster-duration': `${duration}ms` }"
      role="alert"
    >
      <div class="toaster-content">
        <div v-if="icon || $slots.icon" class="toaster-icon-wrap">
          <!-- @slot Slot to override the default notification icon -->
          <slot name="icon">
            <img :src="icon" alt="Toast Icon" class="toaster-icon-img" />
          </slot>
        </div>
        <div class="toaster-text-wrap">
          <!-- @slot Slot for custom message text -->
          <slot name="toaster_message_text">
            <p class="toaster-message">{{ message }}</p>
          </slot>
        </div>
        <div v-if="dismissible" class="toaster-dismiss-wrapper">
          <CustomButton
            class          = "toaster-dismiss-btn"
            text           = ""
            iconSize       = "1.25rem"
            width          = "28px"
            height         = "28px"
            iconColor      = "var(--toaster-text-color)"
            bgColor        = "transparent"
            hoverIconColor = "var(--toaster-text-color)"
            pressAnimation = "scale"
            :iconSrc       = "img_close"
            @click         = "closeToast"
          />
        </div>
      </div>
      <div v-if="showProgressBar" class="toaster-progress-bar">
        <div class="toaster-progress-fill"></div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
/**
  * @file        notification_toaster.vue
  * @brief       A customizable toast notification component supporting multiple positions, types, auto-dismiss timers, progress bars, and custom buttons.
  * @displayName Notification Toaster
*/

import { computed, watch } from 'vue'
import CustomButton from '@/components/reusables/custom_button.vue'
import img_close from '@/assets/svg/close-svgrepo-com.svg'

const props = defineProps({
  /**
    * Controls the visibility state of the notification toast.
    * @public
    */
  modelValue: {
    type    : Boolean,
    required: true
  },
  /**
    * Text message to display inside the notification.
    * @public
    */
  message: {
    type    : String,
    default : 'Default toaster notification!'
  },
  /**
    * Source path or URL for the notification icon.
    * @public
    */
  icon: {
    type    : String,
    default : '@/assets/img/characters/ninten_head_sprite.png'
  },
  /**
    * Screen position where the toaster appears.
    * @public
    */
  position: {
    type    : String,
    default : 'top-right',
    validator: (val) => ['top-right', 'top-left', 'top-center', 'bottom-right', 'bottom-left', 'bottom-center'].includes(val)
  },
  /**
    * Visual type/theme of the notification.
    * @public
    */
  type: {
    type    : String,
    default : 'info',
    validator: (val) => ['info', 'success', 'warning', 'error'].includes(val)
  },
  /**
    * Duration in milliseconds before the toast automatically dismisses.
    * @public
    */
  duration: {
    type    : Number,
    default : 4000
  },
  /**
    * Controls whether the animated countdown progress bar is visible.
    * @public
    */
  showProgressBar: {
    type    : Boolean,
    default : true
  },
  /**
    * Controls whether the manual close/dismiss button is displayed.
    * @public
    */
  dismissible: {
    type    : Boolean,
    default : true
  }
})

const emit = defineEmits(['update:modelValue', 'close'])

/**
  * Computed wrapper for v-model visibility binding.
  * @private
  */
const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

let timer = null

/**
  * Starts the auto-dismiss timer based on the configured duration.
  * @private
  */
const startTimer = () => {
  if (props.duration > 0) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      closeToast()
    }, props.duration)
  }
}

/**
  * Closes the toast notification and triggers cleanup events.
  * @private
  */
const closeToast = () => {
  clearTimeout(timer)
  visible.value = false
  emit('close')
}

watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    startTimer()
  }
}, { immediate: true })

/**
  * Computes the CSS position class name.
  * @private
  */
const positionClass = computed(() => `toaster-${props.position}`)

/**
  * Computes the CSS theme type class name.
  * @private
  */
const typeClass     = computed(() => `toaster-${props.type}`)

/**
  * Computes the transition animation name based on screen position.
  * @private
  */
const transitionName = computed(() => {
  if (props.position.includes('top')) return 'slide-down'
  return 'slide-up'
})
</script>

<style scoped>
.toaster-notification {
  position              : fixed;
  z-index               : 9999;
  display               : flex;
  flex-direction        : column;
  background            : var(--toaster-bg-main);
  border                : 2px solid var(--toaster-border-color);
  border-radius         : 10px;
  padding               : 12px 16px;
  max-width             : 380px;
  box-sizing            : border-box;
  overflow              : hidden;
  font-family           : system-ui, -apple-system, sans-serif;
}

.toaster-content {
  display               : flex;
  align-items           : center;
  gap                   : 12px;
  width                 : 100%;
}

.toaster-icon-wrap {
  display               : flex;
  align-items           : center;
  justify-content       : center;
  flex-shrink           : 0;
}

.toaster-icon-img {
  width                 : 60px;
  height                : 60px;
  object-fit            : contain;
  display               : block;
}

.toaster-text-wrap {
  display               : flex;
  align-items           : center;
  flex                  : 1;
  min-width             : 0;
}

.toaster-message {
  margin                : 0;
  font-size             : var(--toaster-font-size);
  font-weight           : 600;
  color                 : var(--toaster-text-color);
  word-break            : break-word;
}

.toaster-dismiss-wrapper {
  display               : flex;
  align-items           : center;
  justify-content       : center;
  flex-shrink           : 0;
  margin-left           : 4px;
}

.toaster-dismiss-btn {
  border                : none !important;
  border-radius         : 6px !important;
}

.toaster-progress-bar {
  position              : absolute;
  bottom                : 0;
  left                  : 0;
  width                 : 100%;
  height                : 3px;
  background            : var(--toaster-progress-bg);
}

.toaster-progress-fill {
  height                : 100%;
  width                 : 100%;
  background            : var(--toaster-accent);
  animation             : progress-shrink linear var(--toaster-duration) forwards;
}

@keyframes progress-shrink {
  from { width: 100%; }
  to { width: 0%; }
}

.toaster-top-right {
  top                   : 20px;
  right                 : 20px;
}

.toaster-top-left {
  top                   : 20px;
  left                  : 20px;
}

.toaster-top-center {
  top                   : 20px;
  left                  : 50%;
  transform             : translateX(-50%);
}

.toaster-bottom-right {
  bottom                : 20px;
  right                 : 20px;
}

.toaster-bottom-left {
  bottom                : 20px;
  left                  : 20px;
}

.toaster-bottom-center {
  bottom                : 20px;
  left                  : 50%;
  transform             : translateX(-50%);
}

.toaster-success {
  background            : var(--toaster-success-bg);
  border-color          : var(--toaster-success-border);
}

.toaster-success .toaster-progress-fill {
  background            : var(--toaster-success-border);
}

.toaster-warning {
  background            : var(--toaster-warning-bg);
  border-color          : var(--toaster-warning-border);
}

.toaster-warning .toaster-progress-fill {
  background            : var(--toaster-warning-border);
}

.toaster-error {
  background            : var(--toaster-error-bg);
  border-color          : var(--toaster-error-border);
}

.toaster-error .toaster-progress-fill {
  background            : var(--toaster-error-border);
}

.slide-down-enter-active,
.slide-down-leave-active,
.slide-up-enter-active,
.slide-up-leave-active {
  transition            : all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity               : 0;
  transform             : translateY(-20px);
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity               : 0;
  transform             : translateY(20px);
}

.toaster-top-center.slide-down-enter-from,
.toaster-top-center.slide-down-leave-to {
  transform             : translate(-50%, -20px);
}

.toaster-bottom-center.slide-up-enter-from,
.toaster-bottom-center.slide-up-leave-to {
  transform             : translate(-50%, 20px);
}
</style>