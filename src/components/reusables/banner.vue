<template>
  <transition :name="animationsEnabled ? 'banner-fade' : ''" :appear="animationsEnabled">
    <section class="hero-banner">
      <div class="hero-image-wrapper">
        
        <template v-if="enableParallax && animationsEnabled && parallaxLayers.length > 0 && !isScrollableActive">
          <div 
            v-for="(layer, index) in parallaxLayers" 
            :key  ="index"
            class ="hero-bg-layer"
            :style="{ backgroundImage: `url(${layer.src})` }"
          ></div>
        </template>

        <template v-else>
          <transition 
            :name="animationsEnabled ? 'hero-bg-scroll' : ''" 
            :appear="animationsEnabled"
          >
            <transition :name="animationsEnabled ? 'bg-fade' : ''">
              <div 
                class       ="hero-bg-image"
                :key        ="`${activeImageSrc}-${isSessionActive}`"
                :style      ="{ backgroundImage: `url(${activeImageSrc})` }"
                :class      ="(isScrollableActive === true || isScrollableActive === 'true') && activeScrollDirection !== 'none' ? `scroll-${activeScrollDirection}` : ''"
                :aria-label ="imageAlt"
                role="img"
              ></div>
            </transition>
          </transition>
        </template>

        <div class="hero-overlay"></div>
        <transition :name="animationsEnabled ? 'slide-from-left' : ''" :appear="animationsEnabled">
          <img 
            v-if="!isSessionActive"
            :src        ="charactersImage" 
            alt         ="Ninten and Lloyd" 
            class       ="hero-bottom-right-image"
            :draggable  ="false"
            @contextmenu="handleContextMenu"
          />
        </transition>
      </div>

      <div class="hero-content center">
        <slot name="content">
          <transition :name="animationsEnabled ? 'slide-down' : ''" :appear="animationsEnabled">
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
          </transition>

          <transition :name="animationsEnabled ? 'slide-down-delay' : ''" :appear="animationsEnabled">
            <div class="hero-subtitle-container" v-if="subtitle && subtitle.trim() !== ''">
              <p class="hero-subtitle">{{ formattedSubtitle }}</p>
            </div>
          </transition>

          <div class="cta-buttons-wrapper">
            <template v-for="(btn, index) in resolvedButtons" :key="index">
              <transition :name="animationsEnabled ? (index === 0 ? 'pop-in' : 'pop-in-delayed') : ''" :appear="animationsEnabled">
                <CustomButton
                  class             = "cta_button"
                  :class            = "{ 'has-external-url': btn.externalUrl }"
                  v-if              = "showCtaButton"
                  :text             = "btn.text" 
                  :to               = "btn.to" 
                  :externalUrl      = "btn.externalUrl"
                  @click            = "$emit(btn.emit || 'cta-click', btn)" 
                  :icon-src         = "btn.iconSrc"
                  :icon-size        = "btn.iconSrc ? (btn.iconSize || '32px') : undefined"
                  :border           = "btn.border || 'var(--color-banner-button-border)'"
                  :bgColor          = "btn.bgColor || 'var(--color-banner-button-bg)'"
                  :hover-bg-color   = "btn.hoverBgColor || 'var(--color-banner-button-hover-bg)'"
                  :icon-color       = "btn.iconColor || 'var(--color-banner-button-icon)'"
                  :hover-icon-color = "btn.iconColor || 'var(--color-banner-button-icon)'"
                  :text-color       = "btn.textColor || 'var(--color-banner-button-text)'"
                  :hover-text-color = "btn.hoverTextColor || 'var(--color-banner-button-text)'"
                  icon-position     = "left"
                  icon-margin       = "0 -5px 0 0"
                  text-margin       = "2px 8px 0 0"
                  :fontSize         = "btn.fontSize || 'var(--font-h2-size)'"
                  :style            = "{ 
                    width           : btn.width       || '200px', 
                    fontWeight      : btn.fontWeight  || 'normal',
                  }"
                  :autoAdaptSize    = true
                />
              </transition>
            </template>
          </div>
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
  </transition>
</template>

<script setup>
/**
  * @file banner.vue
  * @brief Hero banner component featuring background image, logo display, dynamically rendered call-to-action buttons via array props, and a secret directional scrolling animation defined via session variable.
  * @displayName Hero Banner
*/

import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useI18n }  from '@/composables/useI18n'
import { useAnimations } from '@/composables/reduced_motion_check'

import CustomButton from '@/components/reusables/custom_button.vue'

import img_gameLogo       from '@/assets/img/logos/Encore_Logo.png'
import img_defaultBanner  from '@/assets/img/banner/web_site_banner_day_sky.png'
import charactersImage    from '@/assets/img/banner/ninten_and_lloyd.png'

import layer1_sky           from '@/assets/img/banner/banner_layer_1.png'
import layer2_mtItoi        from '@/assets/img/banner/banner_layer_2.png'
import layer3_mtItoiClouds  from '@/assets/img/banner/banner_layer_3.png'
import layer4_hill          from '@/assets/img/banner/banner_layer_4.png'
import layer5_foreground    from '@/assets/img/banner/banner_layer_5.png'

import dowload_icon       from '@/assets/svg/download.svg'

const { t } = useI18n()
const { animationsEnabled } = useAnimations()

const logoSrc = img_gameLogo

const VIGNETTE_STYLES = {
  style_1: 'radial-gradient(circle    , rgba(0,0,0,0.2) 0% , rgba(0,0,0,0.6 ) 100%)',
  style_2: 'linear-gradient(to bottom , rgba(0,0,0,0.1) 0% , rgba(0,0,0,0.8 ) 100%)',
  style_3: 'radial-gradient(circle    , rgba(0,0,0,0  ) 40%, rgba(0,0,0,0.85) 100%)',
  style_4: 'linear-gradient(90deg     , rgba(0,0,0,0.7) 0% , rgba(0,0,0,0.1 ) 50%   , rgba(0,0,0,0.7) 100%)'
}

const resolvedButtons = computed(() => {
  if (props.buttons && props.buttons.length > 0) {
    return props.buttons
  }
  return [
    {
      text          : t('SITE_NAV_DOWNLOAD'),
      to            : '/download',
      iconSrc       : dowload_icon,
      emit          : 'cta-click',
      bgColor       : 'var(--color-primary)',
      iconColor     : 'var(--color-secondary)', 
      textColor     : 'var(--color-default-text-color)',
      hoverTextColor: 'var(--color-default-text-color)',
      hoverBgColor  : 'var(--color-primary-darker)',
      fontWeight    : 'bold'
    },
    {
      text          : t('SITE_BANNER_DEVLOG_NEWS'),
      externalUrl   : 'https://mother-encore.itch.io/mother-encore/devlog',
      emit          : 'news-click',
      fontSize      : 'var(--font-pp-size)',
      bgColor       : 'var(--color-black)',
      hoverBgColor  : 'var(--color-black)',
      textColor     : 'var(--color-default-text-color)',
      hoverTextColor: 'var(--color-secondary)',      
    }
  ]
})

const props = defineProps({
  /** Controls whether multi-layer parallax imagery is enabled.
    * @public
  */
  enableParallax: {
    type    : Boolean,
    required: false,
    default : true
  },
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
    * List of alternative background images for scroll mode.
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
  /** Controls whether the call-to-action button elements are visible.
    * @public
  */
  showCtaButton: {
    type    : Boolean,
    required: false,
    default : true
  },
  /** Array of button configuration objects for dynamic rendering.
    * @public
  */
  buttons: {
    type    : Array,
    required: false,
    default : () => []
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
  },
  /** 
    * Array of custom background layers for multi-layer parallax scrolling.
    * @public
  */
  parallaxLayers: {
    type    : Array,
    required: false,
    default : () => [
      { src: layer1_sky           , speed: 0.0,  scale: 1.0 }, 
      { src: layer2_mtItoi        , speed: 0.08, scale: 1.0 }, 
      { src: layer3_mtItoiClouds  , speed: 0.15, scale: 1.0 }, 
      { src: layer4_hill          , speed: 0.30, scale: 1.0 }, 
      { src: layer5_foreground    , speed: 0.55, scale: 1.0 },
    ]
  },
})

const scrollY = ref(0)

/**
  * Computed subtitle sow it adress the single ponctuation problem in some languages
  * @private
*/
const formattedSubtitle = computed(() => {
  if (!props.subtitle) return ''
  return props.subtitle.replace(/\s+(!)/g, '\u00A0$1')
})

/**
  * Handles window scroll updates for page-level parallax translations.
  * @private
*/
const handleScroll = () => {
  if (!animationsEnabled.value) return
  scrollY.value = window.scrollY
}

/**
  * Selects a random alternative background image from the configured array.
  * @private
*/
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

watch(isSessionActive, (newVal) => {
  if (newVal && props.alternativeImages.length > 0) {
    randomAlternativeImage.value = getRandomAlternative()
  }
})

/**
  * Computed CSS user-select property value based on selection protection configuration.
  * @private
*/
const userSelectValue = computed(() => (props.disableSelect ? 'none' : 'auto'))

/**
  * Handles right-click events according to the `allowSaveAs` property configuration.
  * @param {MouseEvent} event - Context menu event instance.
  * @private
*/
const handleContextMenu = (event) => {
  if (!props.allowSaveAs) {
    event.preventDefault()
    event.stopPropagation()
  }
}

/**
  * Checks and updates the active session state based on session storage value changes.
  * @private
*/
const checkSessionState = () => {
  if (!props.sessionKey) return
  const latestValue = sessionStorage.getItem(props.sessionKey) === 'true'
  if (latestValue !== isSessionActive.value) {
    isSessionActive.value = latestValue
    timerKey.value++
  }
}

/**
  * Event listener handler for window storage updates across windows/tabs.
  * @param {StorageEvent} event - Storage event instance.
  * @private
*/
const handleStorageChange = (event) => {
  if (!props.sessionKey) return
  if (!event || event.key === props.sessionKey) {
    checkSessionState()
  }
}

let bgCycleIntervalId = null
let sessionPollIntervalId = null

onMounted(() => {
  if (props.sessionKey) {
    checkSessionState()
    window.addEventListener('storage', handleStorageChange)
    
    sessionPollIntervalId = setInterval(checkSessionState, 500)
  }

  window.addEventListener('scroll', handleScroll, { passive: true })

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
  if (props.sessionKey) {
    window.removeEventListener('storage', handleStorageChange)
  }
  window.removeEventListener('scroll', handleScroll)
  if (bgCycleIntervalId) clearInterval(bgCycleIntervalId)
  if (sessionPollIntervalId) clearInterval(sessionPollIntervalId)
})

/**
  * Computed property that resolves the current background image URL.
  * @private
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

/**
  * Computed property to determine if the background scroll animation is active.
  * @private
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

/**
  * Computed property that resolves the current active scroll direction style.
  * @private
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

/**
  * Computed property to map the vignetteStyle prop key to a style string, or fallback to raw CSS.
  * @private
*/
const resolvedVignette = computed(() => {
  return VIGNETTE_STYLES[props.vignetteStyle] || props.vignetteStyle
})

/**
  * Resolved vignette background style computed from resolvedVignette.
  * @private
*/
const cssVignetteBackground = computed(() => resolvedVignette.value)

defineEmits(['cta-click', 'news-click'])
</script>

<style scoped>
  :root{
    --music_player-font-h1                       : var(--font-h1);
    --music_player-font-p                        : var(--font-p);
    --music_player-font-p-size                   : 25px;
    --music_player-font-track-names-size         : 15px;
  }
  .hero-bg-layer {
    position                  : absolute;
    top                       : 0;
    left                      : 0;
    width                     : 100%;
    height                    : 100%;
    background-size           : cover;
    background-position       : center center;
    background-repeat         : no-repeat;
    will-change               : transform;
    animation-timing-function : linear;
    animation-timeline        : scroll(root);
  }

  .hero-bg-layer:nth-child(1) {
    transform: scale(1.0);
  }

  .hero-bg-layer:nth-child(2) {
    animation-name: parallax-layer-2;
  }
  @keyframes parallax-layer-2 {
    from { transform: scale(1.02) translateY(0px); }
    to   { transform: scale(1.02) translateY(80px); }
  }

  .hero-bg-layer:nth-child(3) {
    animation-name: parallax-layer-3;
  }
  @keyframes parallax-layer-3 {
    from { transform: scale(1.02) translateY(0px); }
    to   { transform: scale(1.05) translateY(80px); }
  }

  .hero-bg-layer:nth-child(4) {
    animation-name: parallax-layer-4;
  }
  @keyframes parallax-layer-4 {
    from { transform: scale(1.08) translateY(0px); }
    to   { transform: scale(1.08) translateY(130px); }
  }

  .hero-bg-layer:nth-child(5) {
    animation-name: parallax-layer-5;
  }
  @keyframes parallax-layer-5 {
    from { transform: scale(1.15) translateY(0px); }
    to   { transform: scale(1.15) translateY(-80px); }
  }

  .hero-bg-layer:nth-child(1),
  .hero-bg-layer:nth-child(2) {
    z-index: 2;
  }

  .hero-bg-layer:nth-child(3),
  .hero-bg-layer:nth-child(4){
    z-index       : 6; 
    pointer-events: none; 
  }

  .hero-bg-layer:nth-child(5) {
    z-index       : 8; 
    pointer-events: none; 
  }

  .hero-bg-scroll-enter-active .hero-bg-image {
    transition      : transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1s ease-out;
    transition-delay: 0.1s;
  }
  .hero-bg-scroll-enter-from .hero-bg-image {
    opacity         : 0;
    transform       : translateY(100%) scale(1.02);
  }

  .banner-fade-enter-active {
    transition: opacity 0.8s ease-out;
  }
  .banner-fade-enter-from {
    opacity: 0;
  }

  .slide-from-left-enter-active {
    transition      : transform 2.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease-out;
    transition-delay: 0.2s;
  }
  .slide-from-left-enter-from {
    opacity: 0;
    transform: translateX(-100vw);
  }
  .slide-from-left-enter-to {
    transform: translateX(0);
  }

  .slide-down-enter-active {
    transition      : transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease-out;
    transition-delay: 0.3s;
  }
  .slide-down-enter-from {
    opacity: 0;
    transform: translateY(-40px);
  }

  .slide-down-delay-enter-active {
    transition      : transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease-out;
    transition-delay: 0.45s;
  }
  .slide-down-delay-enter-from {
    opacity: 0;
    transform: translateY(-20px);
  }

  .pop-in-enter-active {
    transition      : transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.6s ease-out;
    transition-delay: 0.6s;
  }
  .pop-in-enter-from {
    opacity: 0;
    transform: scale(0.8) translateY(20px);
  }

  .pop-in-delayed-enter-active {
    transition      : transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.6s ease-out;
    transition-delay: 0.75s;
  }
  .pop-in-delayed-enter-from {
    opacity: 0;
    transform: scale(0.8) translateY(20px);
  }

  .cta-buttons-wrapper {
    display         : flex;
    flex-direction  : column;
    align-items     : center;
    gap             : 0.75rem;
    width           : 100%;
    z-index         : 2;
  }

  .hero-banner {
    position        : relative;
    width           : 100%;
    height          : clamp(450px, 55vh, 650px);
    display         : flex;
    align-items     : center;
    justify-content : center;
    overflow        : clip; 
    box-sizing      : border-box;
  }

  .hero-image-wrapper {
    position            : absolute;
    top                 : 0;
    left                : 0;
    width               : 100%;
    height              : 100%;
    z-index             : 1;
    pointer-events      : none;
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
    transform           : scale(1.02);
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

  .cta_button.has-external-url:hover :deep(.button-text) {
    text-decoration: underline;
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
    z-index             : 6;
    background          : v-bind(cssVignetteBackground);
    pointer-events      : none;
  }

  .hero-bottom-right-image {
    position            : absolute;
    bottom              : 0px;
    right               : 0px;
    z-index             : 8;
    height              : clamp(340px, 48vh, 520px);
    width               : auto;
    object-fit          : contain;
    pointer-events      : none;
    -webkit-user-select : v-bind(userSelectValue);
    -moz-user-select    : v-bind(userSelectValue);
    -ms-user-select     : v-bind(userSelectValue);
    user-select         : v-bind(userSelectValue);
    
    will-change         : transform;
  }

  .hero-content {
    position            : relative;
    z-index             : 4;
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
    left                : auto !important;
    right               : auto !important;

    will-change               : transform;
    animation-timing-function : linear;
    animation-timeline        : scroll(root);
    animation-name            : hero-content-parallax;
    animation-range           : 0px 500px;
    animation-fill-mode       : both;

  }
  @keyframes hero-content-parallax {
    from {
      transform: translateY(0px);
    }
    to {
      transform: translateY(30px); 
    }
  }

  .hero-logo-wrapper {
    margin-bottom       : 10px ;
    position            : relative;
    z-index             : 3;
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

  .hero-subtitle-container {
    background          : var(--color-default-background);
    border              : var(--default-border);
    border-radius       : var(--default-border-radius);
    padding             : 2.5rem 2rem; 
    margin-bottom       : -1rem; 
    max-width           : 100%;
    width               : fit-content;
    box-shadow          : 0 8px 20px rgba(0, 0, 0, 0.25);
    box-sizing          : border-box;
    display             : flex;
    align-items         : center;
    justify-content     : center;
    position            : relative;
    z-index             : 2;
  }
  .hero-subtitle {
    text-align          : center !important;
    margin              : 0 !important; 
    max-width           : 100%;
    width               : 100%;
    opacity             : 1;
    box-sizing          : border-box;
    display             : block !important;
    word-break          : auto-phrase;
    overflow-wrap       : break-word;
    font-family         : var(--font-h2)     !important;
    font-size           : clamp(1rem, 1.5vw, 1.25rem) !important;
    font-weight         : bold;
    color               : var(--color-black);
    
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

  :global(body.reduce-motion) *,
  :global(body.reduce-motion) *::before,
  :global(body.reduce-motion) *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }

  @media (max-width: 768px) {
    .hero-banner {
      min-height        : 500px;
      padding           : 1rem 0;
    }

    .hero-content {
      padding           : 1rem 1rem;
      height            : 100%;
      justify-content   : space-between;
      align-items       : center;
    }

    .hero-logo-wrapper {
      display           : none;
    }
    .hero-subtitle-container{
      padding   : 0.3rem 0rem; 
      word-break: auto-phrase;

    }
    
    .hero-subtitle {
      font-family       : var(--font-mobile-h2) !important;
      font-size         : var(--font-mobile-h2-size) !important;
      padding           : 0 1rem;
      margin-top        : 2.5rem;
      margin-bottom     : 0 !important; 
      order             : 1;
    }

    .cta-buttons-wrapper {
      margin-top        : 3rem;
      order             : 2;
    }

    .hero-bottom-right-image {
      height            : clamp(340px, 48vh, 520px);
      bottom            : 0px;
      left              : 50%;
      right             : auto;
      transform         : translateX(-50%);
      animation-name    : none; 
    }

    .slide-from-left-enter-from {
      opacity           : 0;
      transform         : translateX(-100vw);
    }

    .slide-from-left-enter-to {
      transform         : translateX(-50%);
    }

    .slide-from-left-enter-active {
      transition        : transform 1.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease-out;
      transition-delay  : 0.1s;
    }
  }
</style>