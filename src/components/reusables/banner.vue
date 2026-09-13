<template>
  <section class="hero-banner">
    <div class="hero-image-wrapper">
      <transition name="bg-fade">
        <div 
          class       ="hero-bg-image"
          :key        ="activeImageSrc"
          :style      ="{ backgroundImage: `url(${activeImageSrc})` }"
          :class      ="(isScrollableActive === true || isScrollableActive === 'true') && activeScrollDirection !== 'none' ? `scroll-${activeScrollDirection}` : ''"
          :aria-label ="imageAlt"
          role="img"
        ></div>
      </transition>
      <div class="hero-overlay"></div>
    </div>

    <div class="hero-content center">
      <!-- @slot media - Custom content slot -->
      <slot name="content">
        <div 
          class="hero-logo-wrapper" 
          v-if="showLogo"
          @contextmenu="handleContextMenu"
        >
          <img 
            :src="logoSrc" 
            alt="Game Logo" 
            class="hero-logo-image" 
            :draggable="allowDrag"
            @contextmenu="handleContextMenu"
          />
        </div>

        <p class="hero-subtitle" v-if="subtitle && subtitle.trim() !== ''">{{ subtitle }}</p>
        
        <CustomButton 
          v-if="showCtaButton"
          :text         ="ctaText || t('SITE_NAV_DOWNLOAD')" 
          :to           ="ctaLink" 
          @click        ="$emit('cta-click')" 
          :icon-src     ="dowload_icon"
          border        ="var(--color-banner-button-border )"
          bgColor       ="var(--color-banner-button-bg)"
          hover-bg-color="var(--color-banner-button-hover-bg)"
          icon-color    ="var(--color-banner-button-icon)"
          text-color    ="var(--color-banner-button-text)"
          icon-size     ="40px"
          icon-position ="left"
          icon-margin   ="0   -5px 0 0"
          text-margin   ="4px 10px 0 0"
          fontSize      ="var(--font-h2-size)" 
          width         ="200px"
          height        ="60px"
          :autoAdaptSize = true
        />
      </slot>
    </div>

    <div class="timer-bar-wrapper" v-if="props.alternativeImages.length > 1 && isScrollableActive">
      <div 
        class="timer-bar" 
        :key="timerKey" 
        :style="{ animationDuration: `${props.imageChangeInterval}ms` }"
      ></div>
    </div>
  </section>
</template>

<script setup>
/**
  * @file banner.vue
  * @brief Hero banner component featuring background image, logo display, call to action button and a secret directional scrolling animation defined via session variable.
  * @displayName Hero Banner
*/

import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n }  from '@/composables/useI18n'

import CustomButton from '@/components/reusables/custom_button.vue'

import img_gameLogo       from '@/assets/img/logos/Encore_Logo.png'
import img_defaultBanner  from '@/assets/img/art/banner_test.png'

import dowload_icon       from '@/assets/svg/download.svg'

const { t } = useI18n()

const logoSrc = img_gameLogo

/**
  * Vignet preset styles for the banner
  * @private
*/
const VIGNETTE_STYLES = {
  style_1: 'radial-gradient(circle    , rgba(0,0,0,0.2) 0% , rgba(0,0,0,0.6 ) 100%)',
  style_2: 'linear-gradient(to bottom , rgba(0,0,0,0.1) 0% , rgba(0,0,0,0.8 ) 100%)',
  style_3: 'radial-gradient(circle    , rgba(0,0,0,0  ) 40%, rgba(0,0,0,0.85) 100%)',
  style_4: 'linear-gradient(90deg     , rgba(0,0,0,0.7) 0% , rgba(0,0,0,0.1 ) 50%   , rgba(0,0,0,0.7) 100%)'
}

const props = defineProps({
  /** Default background image source URL. 
    * @public
  */
  imageSrc: {
    type    : String,
    required: false,
    default : ''
  },
  /** Accessibility description text for the background image. 
    * @public
  */
  imageAlt: {
    type    : String,
    required: false,
    default : 'Hero banner background'
  },
  /** Subtitle tha appears below logo.
    * @public
  */
  subtitle: {
    type    : String,
    required: false,
    default : '[Default Banner Text]'
  },
  /** Determine if scrolling background animations are enabled.
    * @public
  */
  isScrollable: {
    type    : [Boolean, String],
    required: false,
    default : false
  },
  /** 
    * Direction trajectory for background scrolling animation.
    * @public
    * @values none, horizontal, vertical, both
  */
  scrollDirection: {
    type    : String,
    required: false,
    default : 'horizontal',
    validator: (value) => ['none', 'horizontal', 'vertical', 'both'].includes(value)
  },
  /** Browser session storage lookup key for conditional alternative asset displays. 
    * @public
  */
  sessionKey: {
    type    : String,
    required: false,
    default : ''
  },
  /** 
    * List of alternative background images for active session rotation.
    * @public
    * @default []
  */
  alternativeImages: {
    type    : Array,
    required: false,
    default : () => []
  },
  /** Scroll animation direction when an alternative session state is active. 
    * @public
  */
  alternativeScrollDirection: {
    type    : String,
    required: false,
    default : 'both'
  },
  /** Time interval in milliseconds between background image transitions.
    * @public
  */
  imageChangeInterval: {
    type    : Number,
    required: false,
    default : 12500
  },
  /** Controls whether the brand logo image container is visible. 
    * @public
  */
  showLogo: {
    type    : Boolean,
    required: false,
    default : true
  },
  /** Controls whether the call-to-action button element is visible.
    * @public
  */
  showCtaButton: {
    type    : Boolean,
    required: false,
    default : true
  },
  /** Custom text label override string for the call-to-action button. 
    * @public
  */
  ctaText: {
    type    : String,
    required: false,
    default : ''
  },
  /** Target routing link destination path for the call-to-action button.
    * @public
  */
  
  ctaLink: {
    type    : String,
    required: false,
    default : '/download'
  },
  /** 
    * Predefined vignette style key or custom CSS background value.
    * @public
    * @values style_1, style_2, style_3, style_4
  */
  vignetteStyle: {
    type    : String,
    required: false,
    default : 'style_1'
  },
  /**
    * Toggles image drag functionality on the banner logo.
    * @public
  */
  allowDrag: {
    type    : Boolean,
    default : true
  },
  /**
    * Controls whether the right-click context menu ("Save image as...") is allowed on the logo.
    * @public
  */
  allowSaveAs: {
    type    : Boolean,
    default : false
  },
  /**
    * Disables text and element selection on the banner logo.
    * @public
  */
  disableSelect: {
    type    : Boolean,
    default : true
  }
})

/** Selects a random alternative background image from the configured array. */
const getRandomAlternative = () => {
  const AlternativeBuilder = {
    hasImages(images) {
      return images.length > 0
    },
    getRandomIndex(length) {
      return Math.floor(Math.random() * length)
    }
  }

  if (AlternativeBuilder.hasImages(props.alternativeImages)) {
    const randomIndex = AlternativeBuilder.getRandomIndex(props.alternativeImages.length)
    return props.alternativeImages[randomIndex]
  }
  return undefined
}

const isSessionActive = ref(
  props.sessionKey ? sessionStorage.getItem(props.sessionKey) === 'true' : false
)

const randomAlternativeImage = ref(getRandomAlternative())
const timerKey = ref(0)

/**
  * Computed CSS user-select property value based on selection protection configuration.
  * @private
  */
const userSelectValue = computed(() => (props.disableSelect ? 'none' : 'auto'))

/**
  * Handles right-click events according to the `allowSaveAs` property configuration.
  * Stops propagation to guarantee element trees do not trigger native context menu.
  * @param {MouseEvent} event - Context menu event instance.
  * @private
*/
const handleContextMenu = (event) => {
  if (!props.allowSaveAs) {
    event.preventDefault()
    event.stopPropagation()
  }
}

/** Checks and updates the active session state based on session storage value changes.
  *  @private
*/
const checkSessionState = () => {
  const SessionBuilder = {
    isValidKey(key) {
      return Boolean(key)
    },
    getStorageValue(key) {
      return sessionStorage.getItem(key) === 'true'
    }
  }

  if (!SessionBuilder.isValidKey(props.sessionKey)) return
  const latestValue = SessionBuilder.getStorageValue(props.sessionKey)
  if (latestValue !== isSessionActive.value) {
    isSessionActive.value = latestValue
    if (latestValue && props.alternativeImages.length > 0) {
      randomAlternativeImage.value = getRandomAlternative()
      timerKey.value++
    }
  }
}

let intervalId = null
let bgCycleIntervalId = null

onMounted(() => {
  if (props.sessionKey) {
    intervalId = setInterval(checkSessionState, 500)
  }

  if (props.alternativeImages.length > 1) {
    bgCycleIntervalId = setInterval(() => {
      if (isScrollableActive.value) {
        let nextImage = getRandomAlternative()
        
        while (nextImage === randomAlternativeImage.value) {
          nextImage = getRandomAlternative()
        }
        
        randomAlternativeImage.value = nextImage
        timerKey.value++
      }
    }, props.imageChangeInterval)
  }
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
  if (bgCycleIntervalId) clearInterval(bgCycleIntervalId)
})

/** Computed property that resolves the current background image URL.
  *  @private
*/
const activeImageSrc = computed(() => {
  const ImageSrcBuilder = {
    buildSource(isActive, altImage, defaultImg, fallbackDefault) {
      if (isActive && altImage) {
        return altImage
      }
      return defaultImg || fallbackDefault
    }
  }

  return ImageSrcBuilder.buildSource(
    isSessionActive.value,
    randomAlternativeImage.value,
    props.imageSrc,
    img_defaultBanner
  )
})

/** Computed property to determine if the background scroll animation is active.
  *  @private
*/
const isScrollableActive = computed(() => {
  const ScrollableBuilder = {
    resolveState(isActive, defaultScrollable) {
      if (isActive) {
        return true
      }
      return defaultScrollable
    }
  }

  return ScrollableBuilder.resolveState(isSessionActive.value, props.isScrollable)
})

/** Computed property that resolves the current active scroll direction style.
  *  @private
*/
const activeScrollDirection = computed(() => {
  const DirectionBuilder = {
    resolveDirection(isActive, altDirection, defaultDirection) {
      if (isActive) {
        return altDirection
      }
      return defaultDirection
    }
  }

  return DirectionBuilder.resolveDirection(
    isSessionActive.value,
    props.alternativeScrollDirection,
    props.scrollDirection
  )
})

/** Computed property to map the vignetteStyle prop key to a style string, or fallback to raw CSS. 
  *  @private
*/
const resolvedVignette = computed(() => {
  return VIGNETTE_STYLES[props.vignetteStyle] || props.vignetteStyle
})

/** Resolved vignette background style computed from resolvedVignette.
  *  @private
*/
const cssVignetteBackground = computed(() => resolvedVignette.value)

defineEmits(['cta-click'])
</script>

<style scoped>

.hero-banner {
  position        : relative;
  width           : 100%;
  height          : clamp(450px, 55vh, 650px);
  display         : flex;
  align-items     : center;
  justify-content : center;
  overflow        : hidden; 
  box-sizing      : border-box;
}

.hero-image-wrapper {
  position            : absolute;
  top                 : 0;
  left                : 0;
  width               : 100%;
  height              : 100%;
  z-index             : 1;
  transform           : scale(1.02);
}

.hero-bg-image {
  position            : absolute;
  top                 : 0;
  left                : 0;
  width               : 100%;
  height              : 100%;
  background-size     : cover;
  background-position : center center;
  background-repeat   : no-repeat;
}

.bg-fade-enter-active,
.bg-fade-leave-active {
  transition          : opacity 1s ease-in-out;
  position            : absolute;
  width               : 100%;
  height              : 100%;
}

.bg-fade-enter-from,
.bg-fade-leave-to {
  opacity             : 0;
}

.scroll-horizontal {
  background-size     : auto 100%;
  background-position : 0 center;
  background-repeat   : repeat-x; 
  animation           : scroll-horizontal 30s linear infinite;
}

.scroll-vertical {
  background-size     : 100% auto;
  background-position : center 0;
  background-repeat   : repeat-y; 
  animation           : scroll-vertical 30s linear infinite;
}

.scroll-both {
  background-size     : auto;
  background-position : 0 0;
  background-repeat   : repeat; 
  animation           : scroll-both 30s linear infinite;
}

@keyframes scroll-horizontal {
  0% {
    background-position: 0 center;
  }
  100% {
    background-position: -2000px center; 
  }
}

@keyframes scroll-vertical {
  0% {
    background-position: center 0;
  }
  100% {
    background-position: center -2000px; 
  }
}

@keyframes scroll-both {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -2000px -2000px; 
  }
}

.hero-overlay {
  position            : absolute;
  top                 : 0;
  left                : 0;
  width               : 100%;
  height              : 100%;
  z-index             : 2;
  background          : v-bind(cssVignetteBackground);
  pointer-events      : none;
}

.hero-content {
  position            : relative;
  z-index             : 3;
  width               : 100%;
  max-width           : 1200px;
  margin              : 0 auto;
  padding             : 0 2rem;
  display             : flex;
  flex-direction      : column;
  align-items         : center;
  justify-content     : center;
  text-align          : center;
  box-sizing          : border-box;
  transform           : none !important;
  left                : auto !important;
  right               : auto !important;
}

.hero-logo-wrapper {
  margin-bottom       : 1.5rem;
  display             : flex;
  justify-content     : center;
  width               : 100%;
  -webkit-user-select : v-bind(userSelectValue);
  -moz-user-select    : v-bind(userSelectValue);
  -ms-user-select     : v-bind(userSelectValue);
  user-select         : v-bind(userSelectValue);
}

.hero-logo-image {
  max-width           : 450px;
  width               : 100%;
  height              : auto;
  object-fit          : contain;
  filter              : drop-shadow(0px 10px 15px rgba(0, 0, 0, 0.6));
  -webkit-user-select : v-bind(userSelectValue);
  -moz-user-select    : v-bind(userSelectValue);
  -ms-user-select     : v-bind(userSelectValue);
  user-select         : v-bind(userSelectValue);
}

.hero-subtitle {
  text-align          : center !important;
  margin-left         : auto !important;
  margin-right        : auto !important;
  max-width           : min(100%, 800px);
  width               : 100%;
  margin-bottom       : 2rem;
  opacity             : 0.95;
  box-sizing          : border-box;
  display             : block !important;
  word-break          : normal;
  overflow-wrap       : break-word;
  font-family         : var(--font-h2)     !important;
  font-size           : var(--font-h2-size)!important;
  font-weight         : bold;
  color               : var(--color-default-text-color);
  text-shadow         : 0 2px 8px rgba(0, 0, 0, 0.8);
}

.timer-bar-wrapper {
  position            : absolute;
  bottom              : 0;
  left                : 0;
  width               : 100%;
  height              : 6px;
  background          : rgba(0, 0, 0, 0.5);
  z-index             : 1;
}

.timer-bar {
  height              : 100%;
  background          : var(--color-primary, #E50012);
  animation           : progress-anim linear infinite;
}

@keyframes progress-anim {
  0% { width: 0%; }
  100% { width: 100%; }
}

@media (max-width: 768px) {
  .hero-banner {
    height            : 400px;
  }

  .hero-content {
    padding           : 0 1rem;
  }

  .hero-logo-image {
    max-width         : 280px;
  }
  
  .hero-subtitle {
    font-family       : var(--font-mobile-h2) !important;
    font-size         : clamp(1.1rem, 4.5vw, var(--font-mobile-h2-size)) !important;
    padding           : 0 0.5rem;
  }
}
</style>