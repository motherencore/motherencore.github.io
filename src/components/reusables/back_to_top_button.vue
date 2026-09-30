<template>
  <Transition appear :name="animationsEnabled ? 'fade-bounce' : ''">
    <CustomButton 
      v-show="isVisible"
      class="scroll-top-btn"
      :class="{ 'no-motion': !animationsEnabled }"
      :iconSrc="triangleIcon"
      width     ='var(--back-to-top-button-size)'
      height    ='var(--back-to-top-button-size)'
      iconSize='var(--back-to-top-button-icon-size)'
      iconColor='var(--back-to-top-button-icon-color)'
      hoverIconColor='var(--back-to-top-button-icon-color-hover)'
      @click="scrollToTop"
    />
  </Transition>
</template>

<script setup>
/**
  * @file        back_to_top_button.vue
  * @brief       A floating back-to-top button component with smooth/instant scrolling behavior.
  * @displayName Back To Top Button
*/

import { ref, onMounted, onUnmounted } from 'vue'
import CustomButton from '@/components/reusables/custom_button.vue'
import triangleIcon from '@/assets/svg/triangle-up-12-filled.svg'
import { useAnimations } from '@/composables/reduced_motion_check'

/**
  * Composable providing reduced motion animation settings.
  * @private
  */
const { animationsEnabled } = useAnimations()

/**
  * Controls button visibility based on vertical scroll offset.
  * @private
  */
const isVisible = ref(false)

/**
  * Handles window scroll events to toggle visibility.
  * @private
  */
const handleScroll = () => {
  const scrollY = window.scrollY || document.documentElement.scrollTop
  isVisible.value = scrollY > 300
}

/**
  * Scrolls the window back to the top instantly if motion is reduced, or smoothly otherwise.
  * @private
  */
const scrollToTop = () => {
  const scrollBehavior = animationsEnabled.value ? 'smooth' : 'auto'

  window.scrollTo({
    top: 0,
    behavior: scrollBehavior
  })
}

/**
  * Registers scroll and touch listeners on component mount.
  * @private
  */
onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('touchmove', handleScroll, { passive: true })
})

/**
  * Unregisters scroll and touch listeners on component unmount.
  * @private
  */
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('touchmove', handleScroll)
})
</script>

<style scoped>
.scroll-top-btn {
  position            : fixed;
  right               : 12px; 
  bottom              : 16px;
  width               : var(--back-to-top-button-size);
  height              : var(--back-to-top-button-size);
  background-color    : var(--back-to-top-button-bg-color);
  border              : var(--back-to-top-button-border);
  border-radius       : var(--back-to-top-button-border-radius);
  z-index             : 20; 
  transition          : background-color 0.15s ease, transform 0.15s ease;
}

.scroll-top-btn:hover {
  transform           : translateY(-4px);
}

.scroll-top-btn.no-motion:hover {
  transform           : none;
}

.scroll-top-btn:active {
  transform           : translateY(0px);
}
</style>