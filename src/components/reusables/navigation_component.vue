<template>
  <div class="nav-wrapper">
    <CustomButton
      class          = "hamburger-btn"
      text           = ""
      iconSize       = "30px"
      width          = "50px"
      height         = "50px"
      bgColor        = "transparent"
      iconColor      = "var(--color-default-text-color)"
      hoverIconColor = "#ffffff"
      border         = "none"
      pressAnimation = "none"
      :iconSrc       = "isMenuOpen ? img_hamburguer_icon_open : img_hamburguer_icon_closed"
      :class         = "{ 'icon-open': isMenuOpen }"
      @click         = "toggleMenu"
      aria-label     = "Toggle Menu"
    />

    <nav class="nav-container" :class="{ 'nav-active': isMenuOpen }">
      <router-link to="/" class="nav-link" @click="handleNavClick">
        {{ t('SITE_NAV_HOME') }}
      </router-link>
      
      <router-link to="/about" class="nav-link" @click="handleNavClick">
        {{ t('SITE_NAV_ABOUT') }}
      </router-link>

      <router-link to="/faq" class="nav-link" @click="handleNavClick">
        {{ t('SITE_NAV_FAQ') }}
      </router-link>

      <router-link to="/credits" class="nav-link" @click="handleNavClick">
        {{ t('SITE_NAV_CREDITS') }}
      </router-link>
      
      <router-link to="/download" class="nav-link" @click="handleNavClick">
        {{ t('SITE_NAV_DOWNLOAD') }}
      </router-link>

      

      <CustomLanguageDropdown v-if="showLanguageDropdown" />
    </nav>
  </div>
</template>

<script setup>
/**
  * @file        navigation_component.vue
  * @brief       The primary site navigation bar component containing route links, custom button hamburger menu with smooth rotation animations, and an optional language dropdown selector.
  * @displayName Navigation Component
*/

import { ref }                from 'vue'
import { useI18n }            from '@/composables/useI18n'
import { useAnimations }      from '@/composables/reduced_motion_check'

import CustomLanguageDropdown from '@/components/reusables/custom_lang_dropdown.vue'
import CustomButton           from '@/components/reusables/custom_button.vue'

import img_hamburguer_icon_closed from '@/assets/svg/hamburger-button.svg'
import img_hamburguer_icon_open   from '@/assets/svg/triangle-down-filled.svg'

defineProps({
  /**
    * Controls whether the language selection dropdown is visible in the navigation bar.
    * @public
    */
  showLanguageDropdown: {
    type    : Boolean,
    default : true
  }
})

/**
  * Tracks whether the mobile hamburger menu is open.
  * @private
  */
const isMenuOpen = ref(false)

/**
  * Toggles the mobile menu open/closed state.
  * @private
  */
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const { t } = useI18n()
const { animationsEnabled } = useAnimations()

/**
  * Scrolls the page to the top immediately or smoothly depending on the reduced motion preference.
  * @private
  */
const handleNavClick = () => {
  isMenuOpen.value = false
  const scrollBehavior = animationsEnabled.value ? 'smooth' : 'auto'

  window.scrollTo({
    top: 0,
    behavior: scrollBehavior
  })
}
</script>

<style scoped>
.nav-wrapper {
  display           : flex;
  align-items       : center;
}

.nav-container {
  display           : flex;
  justify-content   : center;
  align-items       : center;
  flex-direction    : row;
  gap               : 40px;
}

.nav-link {
  color             : var(--color-default-text-color);
  font-size         : var(--font-navbar-size);
  font-family       : var(--font-navbar);
  line-height       : 28px;
  cursor            : pointer;
  opacity           : 0.7;
  position          : relative; 
  padding-left      : 25px;
  transition        : color 0.2s ease, opacity 0.2s ease;
  text-decoration   : none;
}

.nav-link:hover {
  opacity           : 1;
  color             : #ffffff;
}

.nav-link:hover::before {
  content             : '';
  position            : absolute;
  left                : 0;
  top                 : 45%;
  transform           : translateY(-50%);
  width               : 18px; 
  height              : 20px; 
  background-color    : #ffffff; 
  -webkit-mask-image  : url('@/assets/svg/triangle-right-12-filled.svg');
  mask-image          : url('@/assets/svg/triangle-right-12-filled.svg');
  -webkit-mask-size   : contain;
  mask-size           : contain;
  -webkit-mask-repeat : no-repeat;
  mask-repeat         : no-repeat;
  animation         : choppy-horizontal 0.6s steps(3, end) infinite alternate;
}

.nav-link.router-link-exact-active {
  opacity           : 1;
  font-weight       : bold;
  color             : var(--color-secondary);
}

.nav-link.router-link-exact-active::before {
  content             : '';
  position            : absolute;
  left                : 0;
  top                 : 45%;
  transform           : translateY(-50%);
  width               : 18px; 
  height              : 20px; 
  background-color    : var(--color-secondary); 
  -webkit-mask-image  : url('@/assets/svg/triangle-right-12-filled.svg');
  mask-image          : url('@/assets/svg/triangle-right-12-filled.svg');
  -webkit-mask-size   : contain;
  mask-size           : contain;
  -webkit-mask-repeat : no-repeat;
  mask-repeat         : no-repeat;
  animation         : choppy-horizontal 0.6s steps(3, end) infinite alternate;
}

.hamburger-btn {
  display           : none !important;
}

.hamburger-btn :deep(img),
.hamburger-btn :deep(svg) {
  animation         : rotate-icon 0.35s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes rotate-icon {
  0% {
    transform       : rotate(-180deg) scale(0.6);
    opacity         : 0;
  }
  100% {
    transform       : rotate(0deg) scale(1);
    opacity         : 1;
  }
}

@keyframes choppy-horizontal {
  0% {
    transform: translateY(-50%) translateX(0px);
  }
  100% {
    transform: translateY(-50%) translateX(9px);
  }
}

@media (max-width: 1100px) {
  .hamburger-btn {
    display         : flex !important;
  }

  .nav-container {
    position        : absolute;
    top             : 92px;
    left            : 0;
    width           : 100%;
    max-width       : 100vw;        
    box-sizing      : border-box;   
    background      : var(--color-primary);
    flex-direction  : column;
    align-items     : flex-end;     
    gap             : 25px;
    padding         : 0 clamp(20px, 8vw, 40px); 
    max-height      : 0;
    opacity         : 0;
    visibility      : hidden;
    overflow        : hidden;
    transition      : all 0.3s ease-in-out;
  }

  .nav-container.nav-active {
    max-height      : 500px; 
    padding         : 30px clamp(20px, 8vw, 40px);    
    opacity         : 1;
    visibility      : visible;
    overflow        : visible;
  }
}
</style>