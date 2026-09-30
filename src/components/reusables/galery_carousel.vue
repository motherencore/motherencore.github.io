<template>
  <div class="gallery-container" tabindex="-1" @contextmenu="handleContextMenu">
    <h2 class="gallery-title">{{ t('SITE_HOME_GALLERY') }}</h2>

    <div class="carousel-main-row">
      <div 
        class         = "main-viewport" 
        tabindex      = "-1"
        @touchstart   = "handleTouchStart"
        @touchend     = "handleTouchEnd"
        @contextmenu  = "handleContextMenu"
      >
        <CustomButton
          class          = "nav-arrow left"
          text           = ""
          iconSize       = "var(--gallery-button-icon-size)"
          width          = "var(--gallery-button-size)"
          height         = "var(--gallery-button-size)"
          iconColor      = "var(--gallery-button-icon)"
          bgColor        = "var(--gallery-button-bg)"
          hoverIconColor = "var(--gallery-button-icon-hover)"
          hoverBgColor   = "var(--gallery-button-bg-hover)"
          pressAnimation = "none"
          :iconSrc       = "img_left_arrow"
          @click         = "prevSlide(true)"
        />

        <div 
          class       = "slides-track" 
          :style      = "{ transform: `translateX(-${currentIndex * 100}%)` }"
        >
          <div 
            v-for     = "(slide, index) in slides" 
            :key      = "slide.id" 
            class     = "slide-item"
            tabindex  = "-1"
          >
            <!-- @slot slide-image - Custom slot for rendering slide images -->
            <slot name="slide-image" :slide="slide" :index="index" :is-active="index === currentIndex">
              <img 
                :src        = "slide.isGif && index === currentIndex ? slide.img : (slide.staticFrame || slide.img)" 
                alt         = "Gallery Slide Image" 
                class       = "slide-img clickable" 
                :draggable = "allowDrag"
                @contextmenu= "handleContextMenu"
                @click      = "openModal(index)"
              />
            </slot>
          </div>
        </div>

        <CustomButton
          class          = "nav-arrow right"
          text           = ""
          iconSize       = "var(--gallery-button-icon-size)"
          width          = "var(--gallery-button-size)"
          height         = "var(--gallery-button-size)"
          iconColor      = "var(--gallery-button-icon)"
          bgColor        = "var(--gallery-button-bg)"
          hoverIconColor = "var(--gallery-button-icon-hover)"
          hoverBgColor   = "var(--gallery-button-bg-hover)"
          pressAnimation = "none"
          :iconSrc       = "img_right_arrow"
          @click         = "nextSlide(true)"
        />

        <div class="pagination-dots">
          <span 
            v-for     = "(slide, index) in slides" 
            :key      = "slide.id" 
            class     = "dot"
            :class    = "{ active: index === currentIndex }"
            @click    = "selectSlide(index)"
          ></span>
        </div>
      </div>
    </div>

    <div class="timer-bar-wrapper" v-if="!isModalOpen">
      <div 
        class         = "timer-bar" 
        :key          = "timerKey" 
        :style        = "{ animationDuration: `${props.intervalTime}ms` }"
      ></div>
    </div>

    <div class="thumbnails-container" @contextmenu="handleContextMenu">
      <CustomButton
        class          = "thumb-arrow left"
        text           = ""
        iconSize       = "var(--gallery-button-icon-size)"
        width          = "var(--gallery-button-size)"
        height         = "var(--gallery-button-size)"
        iconColor      = "var(--gallery-button-icon)"
        bgColor        = "var(--gallery-button-bg)"
        hoverIconColor = "var(--gallery-button-icon-hover)"
        hoverBgColor   = "var(--gallery-button-bg-hover)"
        pressAnimation = "none"
        :iconSrc       = "img_left_arrow"
        @click         = "scrollThumbnails('left')"
      />
      
      <div class="thumbnails-track-wrapper">
        <div 
          class="thumbnails-track" 
          ref="thumbnailsTrackRef"
          :style="{ scrollBehavior: animationsEnabled ? 'smooth' : 'auto' }"
        >
          <div 
            v-for     = "(slide, index) in slides" 
            :key      = "slide.id" 
            class     = "thumbnail-item"
            :class    = "{ 'thumb-active': index === currentIndex, 'no-motion': !animationsEnabled }"
            @click    = "selectSlide(index)"
          >
            <img 
              :src        = "slide.staticFrame || slide.thumb" 
              alt         = "Thumbnail Preview" 
              class       = "thumb-img" 
              :draggable = "allowDrag"
              @contextmenu= "handleContextMenu"
            />
            <div class="red-tint-overlay"></div>
          </div>
        </div>
      </div>

      <CustomButton
        class          = "thumb-arrow right"
        text           = ""
        iconSize       = "var(--gallery-button-icon-size)"
        width          = "var(--gallery-button-size)"
        height         = "var(--gallery-button-size)"
        iconColor      = "var(--gallery-button-icon)"
        bgColor        = "var(--gallery-button-bg)"
        hoverIconColor = "var(--gallery-button-icon-hover)"
        hoverBgColor   = "var(--gallery-button-bg-hover)"
        pressAnimation = "none"
        :iconSrc       = "img_right_arrow"
        @click         = "scrollThumbnails('right')"
      />
    </div>

    <MediaModal 
      :is-open        = "isModalOpen" 
      :media-item     = "currentModalMediaItem" 
      @close          = "closeModal" 
      @next           = "nextSlide(true)"
      @prev           = "prevSlide(true)"
      @contextmenu.prevent
    />
  </div>
</template>

<script setup>
/**
  * @file galery_carousel.vue
  * @brief Interactive image gallery component supporting automatic rotation, animated GIFs,
  *        touch gestures, static frame capturing, configurable dragging, and context menu options.
  * @displayName Gallery Carousel
*/

import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useI18n }       from '@/composables/useI18n'
import { useAnimations } from '@/composables/reduced_motion_check'

import MediaModal   from './media_modal.vue'
import CustomButton from './custom_button.vue'

import img_left_arrow  from '@/assets/svg/triangle-left-12-filled.svg'
import img_right_arrow from '@/assets/svg/triangle-right-12-filled.svg'

const { t } = useI18n()
const { animationsEnabled } = useAnimations()

const props = defineProps({
  /**
    * Time in milliseconds before advancing to the next slide automatically.
    * @public
  */
  intervalTime: {
    type: Number,
    default: 1000
  },
  /**
    * Key-value object dictionary of imported image/GIF source URLs.
    * @public
  */
  imageModules: {
    type: Object,
    required: true,
    default: () => ({})
  },
  /**
    * Toggles image drag functionality.
    * @public
  */
  allowDrag: {
    type: Boolean,
    default: true
  },
  /**
    * Controls whether the right-click context menu ("Save image as...") is allowed.
    * @public
  */
  allowSaveAs: {
    type: Boolean,
    default: false
  },
  /**
    * Disables text selection across gallery elements.
    * @public
  */
  disableSelect: {
    type: Boolean,
    default: true
  }
})

/**
  * Computed CSS user-select property value based on selection protection configuration.
  * @private
*/
const userSelectValue = computed(() => (props.disableSelect ? 'none' : 'auto'))

const slides = ref(
  Object.values(props.imageModules).map((url, index) => ({
    id: index + 1,
    img: url,
    thumb: url,
    isGif: url.toLowerCase().endsWith('.gif'),
    staticFrame: null
  }))
)

const currentIndex       = ref(0)
const isModalOpen        = ref(false)
const thumbnailsTrackRef = ref(null)
const timerKey           = ref(0)
let slideInterval        = null

const touchStartX = ref(0)
const touchEndX   = ref(0)

/**
  * Handles right-click events according to the `allowSaveAs` property configuration.
  * Stops propagation to guarantee child components do not trigger native defaults.
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
  * Captures initial touch horizontal coordinate on touch start.
  * @param {TouchEvent} e - Touch start event.
  * @private
*/
const handleTouchStart = (e) => {
  touchStartX.value = e.changedTouches[0].screenX
}

/**
  * Captures ending touch coordinate on touch end and triggers swipe evaluation.
  * @param {TouchEvent} e - Touch end event.
  * @private
*/
const handleTouchEnd = (e) => {
  touchEndX.value = e.changedTouches[0].screenX
  handleSwipe()
}

/**
  * Evaluates touch displacement against a threshold to determine swipe direction.
  * @private
*/
const handleSwipe = () => {
  const threshold = 40
  const diff = touchStartX.value - touchEndX.value

  if (diff > threshold) {
    nextSlide(true)
  } else if (-diff > threshold) {
    prevSlide(true)
  }
}

/**
  * Computed property providing active media details for the viewer modal.
  * @private
*/
const currentModalMediaItem = computed(() => {
  if (slides.value.length === 0) return { type: 'image', src: '' }
  return {
    type: 'image',
    src: slides.value[currentIndex.value].img,
    alt: `Gallery Image ${currentIndex.value + 1}`
  }
})

/**
  * Renders the first frame of an animated GIF onto an offscreen canvas to generate a static data URL.
  * @param {string} url - Target GIF asset URL.
  * @returns {Promise<string>} Static image frame data URL.
  * @private
*/
const captureFirstFrame = (url) => {
  return new Promise((resolve) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = url
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)
      resolve(canvas.toDataURL('image/png'))
    }
    img.onerror = () => resolve(url)
  })
}

/**
  * Restarts auto-advance rotation timer and resets the progress bar animation state.
  * @private
*/
const resetTimer = () => {
  if (slideInterval) clearInterval(slideInterval)
  timerKey.value++
  
  slideInterval = setInterval(() => {
    if (!isModalOpen.value && slides.value.length > 0) {
      nextSlide(false)
    }
  }, props.intervalTime)
}

/**
  * Advances carousel forward to the next slide index.
  * @param {boolean} [isUserAction=true] - Indicates whether action was manually triggered by user.
  * @private
*/
const nextSlide = (isUserAction = true) => {
  if (slides.value.length === 0) return
  currentIndex.value = (currentIndex.value + 1) % slides.value.length
  if (isUserAction) resetTimer()
}

/**
  * Navigates carousel backward to the previous slide index.
  * @param {boolean} [isUserAction=true] - Indicates whether action was manually triggered by user.
  * @private
*/
const prevSlide = (isUserAction = true) => {
  if (slides.value.length === 0) return
  currentIndex.value = (currentIndex.value - 1 + slides.value.length) % slides.value.length
  if (isUserAction) resetTimer()
}

/**
  * Selects a specific slide index directly.
  * @param {number} index - Target slide index.
  * @private
*/
const selectSlide = (index) => {
  if (currentIndex.value === index) {
    resetTimer()
  } else {
    currentIndex.value = index
  }
}

/**
  * Scrolls the thumbnail strip horizontally based on scroll direction.
  * @param {'left'|'right'} direction - Target horizontal scroll direction.
  * @private
*/
const scrollThumbnails = (direction) => {
  if (!thumbnailsTrackRef.value) return
  const track = thumbnailsTrackRef.value
  const amount = track.clientWidth
  const scrollAmount = direction === 'left' ? -amount : amount
  const scrollBehavior = animationsEnabled.value ? 'smooth' : 'auto'

  track.scrollBy({
    left: scrollAmount,
    behavior: scrollBehavior
  })
  resetTimer()
}

watch(currentIndex, (newIndex) => {
  resetTimer()
  if (!thumbnailsTrackRef.value) return
  const track = thumbnailsTrackRef.value
  const activeItem = track.children[newIndex]
  if (activeItem) {
    const trackRect = track.getBoundingClientRect()
    const itemRect = activeItem.getBoundingClientRect()
    if (itemRect.left < trackRect.left || itemRect.right > trackRect.right) {
      const scrollLeftTarget = activeItem.offsetLeft - (track.clientWidth / 2) + (activeItem.clientWidth / 2)
      const scrollBehavior = animationsEnabled.value ? 'smooth' : 'auto'
      track.scrollTo({
        left: scrollLeftTarget,
        behavior: scrollBehavior
      })
    }
  }
})

/**
  * Opens expanded image modal view and prevents document scrolling.
  * @param {number} index - Active slide index.
  * @private
*/
const openModal = (index) => {
  currentIndex.value = index
  isModalOpen.value = true
  document.body.style.overflow = 'hidden'
  resetTimer()
}

/**
  * Closes image modal view and restores document scrolling.
  * @private
*/
const closeModal = () => {
  isModalOpen.value = false
  document.body.style.overflow = ''
  resetTimer()
}

onMounted(async () => {
  resetTimer()
  for (let slide of slides.value) {
    if (slide.isGif) {
      slide.staticFrame = await captureFirstFrame(slide.img)
    }
  }
})

onUnmounted(() => {
  if (slideInterval) clearInterval(slideInterval)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.gallery-container {
  width          : 100%;
  display        : flex;
  flex-direction : column;
  align-items    : center;
  gap            : 15px;
  padding        : clamp(10px, 3vw, 20px) clamp(12px, 3vw, 20px);
  box-sizing     : border-box;
  margin         : 10px auto;
  overflow-x     : hidden;
}

.gallery-title {
  width         : 100%;
  margin        : 0 0 10px 0;
  text-align    : center;
  color         : var(--gallery-title-color);
  font-size     : var(--gallery-title-size);
  font-family   : var(--gallery-title-font);
  word-break    : break-word;
  overflow-wrap : break-word;
}

.carousel-main-row {
  width      : 100%;
  max-width  : 1240px;
  box-sizing : border-box;
  
}

.main-viewport {
  width         : 100%;
  aspect-ratio  : auto; 
  max-height    : none;  
  background    : var(--gallery-viewport-bg);
  overflow      : hidden;
  position      : relative;
  display       : flex;
  align-items   : center;
  border-radius : 14px;
  border        : var(--gallery-border);
  touch-action  : pan-y;
}

.slides-track {
  display    : flex;
  width      : 100%;
  height     : 100%;
  box-sizing : border-box;
  transition : transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
}

.slide-item {
  width       : 100%;     
  min-width   : 100%;
  max-width   : 100%;
  height      : 100%;
  flex-shrink : 0;
  box-sizing  : border-box; 
  overflow    : hidden;
}

.slide-img {
  width               : 100%;
  height              : auto;   
  max-height          : 80vh;  
  object-fit          : contain;
  display             : block;
  border-radius       : inherit;
  -webkit-user-select : v-bind(userSelectValue);
  -moz-user-select    : v-bind(userSelectValue);
  -ms-user-select     : v-bind(userSelectValue);
  user-select         : v-bind(userSelectValue);
}

.slide-img.clickable {
  cursor: zoom-in;
}

.timer-bar-wrapper {
  width         : 100%;
  max-width     : 1240px;
  height        : 4px;
  background    : var(--gallery-timer-bg);
  border-radius : 2px;
  overflow      : hidden;
  box-sizing    : border-box;
}

.timer-bar {
  height     : 100%;
  background : var(--gallery-accent-color);
  animation  : progress-anim linear infinite;
}

@keyframes progress-anim {
  0%   { width: 0%; }
  100% { width: 100%; }
}

.nav-arrow,
.thumb-arrow,
:deep(.nav-arrow),
:deep(.thumb-arrow) {
  transform: none !important;
  transition: background-color 0.2s, color 0.2s, opacity 0.2s !important;
}

.nav-arrow,
:deep(.nav-arrow) {
  position  : absolute !important;
  top       : 50% !important;
  margin-top: calc(var(--gallery-button-size, 32px) / -2) !important;
  z-index   : 1 !important;
}

.nav-arrow.left,
:deep(.nav-arrow.left)  { left  : 12px !important; }

.nav-arrow.right,
:deep(.nav-arrow.right) { right : 12px !important; }

.nav-arrow:active,
.thumb-arrow:active,
.nav-arrow:focus,
.thumb-arrow:focus,
:deep(.nav-arrow:active),
:deep(.thumb-arrow:active),
:deep(.nav-arrow:focus),
:deep(.thumb-arrow:focus),
:deep(button:active),
:deep(button:focus) {
  transform: none !important;
}

.pagination-dots {
  position  : absolute;
  bottom    : 12px;
  left      : 50%;
  transform : translateX(-50%);
  display   : flex;
  gap       : 6px;
}

.dot {
  width         : 8px;
  height        : 8px;
  border-radius : 50%;
  background    : var(--gallery-dot-bg);
  border        : var(--gallery-dot-border);
  cursor        : pointer;
  transition    : background 0.2s, transform 0.2s;
}

.dot.active {
  background : var(--gallery-accent-color);
  transform  : scale(1.25);
}

.thumbnails-container {
  width           : 100%;
  max-width       : 1240px;
  display         : flex;
  align-items     : center;
  justify-content : space-between;
  gap             : clamp(6px, 2vw, 12px);
  position        : relative;
  padding-top     : 5px;
  box-sizing      : border-box;
}

.thumbnails-track-wrapper {
  position  : relative;
  flex      : 1;
  overflow  : hidden;
  min-width : 0;
}

.thumbnails-track {
  display         : flex;
  gap             : 10px;
  width           : 100%;
  overflow-x      : auto;
  scrollbar-width : none;
  padding         : 4px 4px 6px 2px;
  box-sizing      : border-box;
}

.thumbnails-track::-webkit-scrollbar {
  display: none;
}

.thumbnail-item {
  position      : relative;
  flex          : 0 0 calc(20% - 8px);
  aspect-ratio  : 16 / 9;
  opacity       : 0.75;
  cursor        : pointer;
  transition    : opacity 0.2s, transform 0.2s;
  overflow      : hidden;
  box-sizing    : border-box;
  border-radius : 8px;
  border        : 2px solid var(--gallery-border-color);
  background    : var(--gallery-thumb-bg);
}

.red-tint-overlay {
  position         : absolute;
  inset            : 0;
  background-color : var(--gallery-thumb-tint-bg);
  pointer-events   : none;
  opacity          : 0;
  transition       : opacity 0.2s ease;
}

.thumbnail-item:hover {
  opacity   : 1;
  transform : translate(-1px, -1px);
}

.thumbnail-item.no-motion:hover {
  transform : none;
}

.thumbnail-item.thumb-active {
  opacity : 1;
  border  : 3px solid var(--gallery-accent-color);
}

.thumbnail-item.thumb-active .red-tint-overlay {
  opacity: 1;
}

.thumb-img {
  width               : 100%;
  height              : 100%;
  object-fit          : cover;
  display             : block;
  transition          : filter 0.2s ease;
  -webkit-user-select : v-bind(userSelectValue);
  -moz-user-select    : v-bind(userSelectValue);
  -ms-user-select     : v-bind(userSelectValue);
  user-select         : v-bind(userSelectValue);
}

.thumbnail-item.thumb-active .thumb-img {
  filter: grayscale(100%);
}

@media (max-width: 1024px) {
  .thumbnail-item {
    flex: 0 0 calc(25% - 8px);
  }
}

@media (max-width: 768px) {
  .gallery-container {
    padding : 0.5rem 12px; 
    gap     : 10px;
  }

  .nav-arrow.left,
  :deep(.nav-arrow.left)  { left  : 8px !important; }

  .nav-arrow.right,
  :deep(.nav-arrow.right) { right : 8px !important; }

  .thumbnail-item {
    flex: 0 0 calc(33.333% - 7px);
  }

  .gallery-container {
    padding : 0.5rem 1rem;
  }

  .nav-arrow.left,
  :deep(.nav-arrow.left)  { left  : 4px !important; }

  .nav-arrow.right,
  :deep(.nav-arrow.right) { right : 4px !important; }

  .dot {
    width  : 6px;
    height : 6px;
  }
  .thumb-arrow,
  :deep(.thumb-arrow) {
    display: none !important;
  }

  .thumbnails-track {
    scrollbar-width : auto;
    padding-bottom  : 8px;   
  }

  .thumbnails-track::-webkit-scrollbar {
    display : block;
    height  : 6px;
  }

  .thumbnails-track::-webkit-scrollbar-track {
    background    : var(--gallery-timer-bg);
    border-radius : 4px;
  }

  .thumbnails-track::-webkit-scrollbar-thumb {
    background    : var(--gallery-accent-color);
    border-radius : 4px;
  }
}
</style>