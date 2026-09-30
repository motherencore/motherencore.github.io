<template>
  <div v-if="isOpen" class="modal-overlay" @click="$emit('close')">
    <div class="modal-content" @click.stop>
      
      <div class="close-btn-wrapper">
        <CustomButton
          class          = "close-btn"
          text           = ""
          iconSize       = "var(--media-modal-button-icon-size)"
          width          = "var(--media-modal-button-size)"
          height         = "var(--media-modal-button-size)"
          iconColor      = "var(--media-modal-arrow-icon)"
          bgColor        = "var(--media-modal-button-bg)"
          hoverIconColor = "var(--media-modal-arrow-icon-hover)"
          hoverBgColor   = "var(--media-modal-button-bg-hover)"
          pressAnimation = "scale"
          :iconSrc       = "img_close"
          @click         = "handleClose"
        />
      </div>
      
      <div v-if="showNav" class="modal-arrow left">
        <CustomButton
          text           = ""
          iconSize       = "var(--media-modal-button-icon-size)"
          width          = "var(--media-modal-button-size)"
          height         = "var(--media-modal-button-size)"
          iconColor      = "var(--media-modal-arrow-icon)"
          bgColor        = "var(--media-modal-button-bg)"
          hoverIconColor = "var(--media-modal-arrow-icon-hover)"
          hoverBgColor   = "var(--media-modal-button-bg-hover)"
          pressAnimation = "push"
          :iconSrc       = "img_left_arrow"
          @click         = "$emit('prev')"
        />
      </div>

      <div class="media-wrapper">
        <img 
          v-if="mediaItem?.type === 'image'" 
          :src="mediaItem.src" 
          :alt="mediaItem.alt || 'Enlarged gallery preview'" 
          class="modal-media" 
        />
        <video 
          v-else-if="mediaItem?.type === 'video'" 
          ref="videoRef"
          :src="mediaItem.src" 
          controls 
          autoplay 
          playsinline
          class="modal-media"
        ></video>
      </div>

      <div v-if="showNav" class="modal-arrow right">
        <CustomButton
          text           = ""
          iconSize       = "var(--media-modal-button-icon-size)"
          width          = "var(--media-modal-button-size)"
          height         = "var(--media-modal-button-size)"
          iconColor      = "var(--media-modal-arrow-icon)"
          bgColor        = "var(--media-modal-button-bg)"
          hoverIconColor = "var(--media-modal-arrow-icon-hover)"
          hoverBgColor   = "var(--media-modal-button-bg-hover)"
          pressAnimation = "push"
          :iconSrc       = "img_right_arrow"
          @click         = "$emit('next')"
        />
      </div>

    </div>
  </div>
</template>

<script setup>
/**
  * @file media_modal.vue
  * @brief Media modal component for displaying enlarged images or videos with custom navigation buttons.
  * @displayName Media Modal
*/

import { ref, watch, onUnmounted } from 'vue'
import CustomButton from './custom_button.vue'

import img_left_arrow   from '@/assets/svg/triangle-left-12-filled.svg'
import img_right_arrow  from '@/assets/svg/triangle-right-12-filled.svg'
import img_close        from '@/assets/svg/close-svgrepo-com.svg'

const props = defineProps({
  /**
    * Controls whether the modal overlay is active and visible.
    * @public
    */
  isOpen: {
    type    : Boolean,
    required: false,
    default : false
  },
  /**
    * Object containing the type, source URL, and alternative description text of the media asset.
    * @public
    */
  mediaItem: {
    type    : Object,
    required: false,
    default : () => ({})
  },
  /**
    * Controls whether the left and right navigation arrows are visible.
    * @public
    */
  showNav: {
    type    : Boolean,
    default : true
  }
})

const emit = defineEmits([
  /**
    * Triggered when the user clicks the overlay background or the close button.
    * @public
    */
  'close', 
  /**
    * Triggered when the user clicks the right navigation arrow button.
    * @public
    */
  'next', 
  /**
    * Triggered when the user clicks the left navigation arrow button.
    * @public
    */
  'prev'
])

const videoRef = ref(null)

/**
  * Stops video playback, detaches media stream, and clears memory buffer.
  * @private
  */
const cleanupVideo = () => {
  if (videoRef.value) {
    videoRef.value.pause()
    videoRef.value.removeAttribute('src')
    videoRef.value.load()
  }
}

/**
  * Wrapper function to clean active video instance before firing close event.
  * @private
  */
const handleClose = () => {
  cleanupVideo()
  emit('close')
}

/**
  * Keydown handler for keyboard modal controls (Esc, Left, Right).
  * @param {KeyboardEvent} e
  * @private
  */
const handleKeyDown = (e) => {
  if (!props.isOpen) return
  if (e.key === 'Escape') handleClose()
  if (props.showNav && e.key === 'ArrowLeft') emit('prev')
  if (props.showNav && e.key === 'ArrowRight') emit('next')
}

// Watch modal status to manage active window event listeners and cleanup video on close
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    window.addEventListener('keydown', handleKeyDown)
  } else {
    cleanupVideo()
    window.removeEventListener('keydown', handleKeyDown)
  }
})

// Clean up video and listeners if modal unmounts while open
onUnmounted(() => {
  cleanupVideo()
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<style scoped>
.modal-overlay {
  position         : fixed;
  top              : 0;
  left             : 0;
  width            : 100vw;
  height           : 100vh;
  background       : var(--media-modal-overlay-bg);
  display          : flex;
  justify-content  : center;
  align-items      : center;
  z-index          : 1000;
  padding          : 20px;
  box-sizing       : border-box;
}

.modal-content {
  position         : relative;
  width            : 85vw;
  height           : 80vh;
  max-width        : 1200px;
  display          : flex;
  align-items      : center;
  justify-content  : center;
}

.media-wrapper {
  width            : 100%;
  height           : 100%;
  display          : flex;
  align-items      : center;
  justify-content  : center;
  border           : var(--media-modal-border);
  border-radius    : var(--media-modal-border-radius);
  box-sizing       : border-box;
  overflow         : hidden;
  background       : var(--media-modal-media-bg);
}

.modal-media {
  width            : 100%;
  height           : 100%;
  display          : block;
  object-fit       : contain;
}

.close-btn-wrapper {
  position         : absolute;
  top              : var(--media-modal-close-top);
  right            : var(--media-modal-close-right);
  z-index          : 10;
}

.modal-arrow {
  position         : absolute;
  top              : 50%;
  transform        : translateY(-50%);
  z-index          : 10;
}

.modal-arrow.left { 
  left             : var(--media-modal-arrow-offset); 
}

.modal-arrow.right { 
  right            : var(--media-modal-arrow-offset); 
}

@media (max-width: 768px) {
  .modal-content {
    width            : 92vw;
    height           : 70vh;
  }

  .modal-arrow.left {
    left             : 10px;
  }
  
  .modal-arrow.right {
    right            : 10px;
  }

  .close-btn-wrapper {
    top              : -45px;
    right            : 5px;
  }
}
</style>