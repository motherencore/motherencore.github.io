<template>
  <div 
    class="content-section-wrapper"
    :style="{ 
      padding         : sectionPadding, 
      backgroundColor : contentBg, 
      borderRadius    : borderRadius,
      border          : border,
    }"
    @contextmenu="handleContextMenu"
  >
    <h2 
      v-if="shouldShowHeader && headerPosition === 'top'" 
      class="content-section-heading content-section-top-heading" 
      :style="{ 
        color       : headingColor, 
        textAlign   : headingAlign,
        border      : headerBorder 
      }"
      v-html="heading"
    ></h2>

    <div 
      class="content-section" 
      :class="[layout, mediaPosition, { 'text-only': mediaType === 'text', 'image-centered': textParagraphs.length === 0 }]"
    >
      <div 
        v-if="textParagraphs.length || (shouldShowHeader && headerPosition === 'inside')" 
        class="content-section-text-container"
        :style="{ 
          padding : textPadding,
          border  : textBorder
        }"
      >
        <h2 
          v-if="shouldShowHeader && headerPosition === 'inside'" 
          class="content-section-heading content-section-inside-heading" 
          :style="{ 
            color     : headingColor, 
            textAlign : headingAlign,
            border    : headerBorder 
          }"
          v-html="heading"
        ></h2>

        <p 
          v-for="(paragraph, index) in textParagraphs" 
          :key="index" 
          class="content-section-body-text" 
          :style="{ color: textColor, textAlign: textAlign }"
          v-html="paragraph"
        ></p>
        <div 
          v-if="$slots.actions" 
          class="content-section-actions"
          :style="{ 
            alignSelf: actionsAlign === 'right' ? 'flex-end' : (actionsAlign === 'center' ? 'center' : 'flex-start'), 
            marginTop: '50px'
          }"
        >
          <!-- 
            @slot Slot for custom action buttons or interactive elements displayed underneath the body text.
          -->
          <slot name="actions"></slot>
        </div>
      </div>

      <div 
        v-if="mediaType !== 'text'" 
        class="content-section-media-wrapper"
        :style="{ '--media-width': mediaWidth }"
        @contextmenu="handleContextMenu"
      >
        <div 
          class="content-section-media-container" 
          :class="{ 
            'content-section-clickable-media': mediaType === 'image' && mediaSrc && !hasError && imageOpenable
          }"
          :style="{ 
            height: mediaHeight !== 'auto' ? mediaHeight : 'auto'
          }"
          @click="openImageModal"
        >
          <div 
            class="content-section-media-inner"
            :style="{ 
              border: mediaBorder,
              borderRadius: mediaBorderRadius
            }"
          >
            <!-- 
              @slot Slot to override standard media render logic (image, video player, iframe) with custom elements.
            -->
            <slot name="media">
              <iframe 
                v-if="mediaType === 'video' && mediaSrc && isEmbeddedVideo"
                :src        ="mediaSrc" 
                :title      ="mediaAlt || heading"
                class       ="content-section-video-iframe"
                :style      ="{ height: mediaHeight !== 'auto' ? mediaHeight : '322px' }"
                frameborder ="0"
                allow       ="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>

              <div 
                v-else-if="mediaType === 'video' && mediaSrc" 
                class="content-section-video-wrapper"
              >
                <video
                  ref="videoRef"
                  :src="mediaSrc"
                  :autoplay="animationsEnabled && props.videoTriggerMode !== 'button'"
                  loop
                  muted
                  playsinline
                  class="content-section-video-element"
                  :style="{ height: mediaHeight !== 'auto' ? mediaHeight : 'auto' }"
                  @mouseenter="handleMouseEnter"
                  @mouseleave="handleMouseLeave"
                  @click="handleVideoClick"
                  @play="onPlay"
                  @pause="isPlaying = false"
                ></video>

                <CustomButton
                  v-if="shouldShowPlayButton"
                  class          ="content-section-video-control-btn"
                  :class         ="{ 'show-control-btn': isControlBtnVisible }"
                  :icon-src       ="playSvg"
                  iconColor       ="var(--color-primary)"
                  hoverIconColor  ="var(--back-to-top-button-icon-color-hover)"
                  bg-color        ="var(--color-default-background)"
                  hover-bg-color  ="var(--color-primary)"
                  width           ="48px"
                  height          ="48px"
                  padding         ="0"
                  icon-size       ="24px"
                  press-animation="none"
                  border          ="none"
                  @click.stop="toggleVideoPlay"
                />
              </div>

              <div 
                v-else-if="mediaType === 'image' && mediaSrc" 
                class="content-section-image-wrapper"
                @mouseenter="handleImageMouseEnter"
                @mouseleave="handleImageMouseLeave"
              >
                <img 
                  :src      ="(!animationsEnabled && staticMediaSrc && !isGifPlaying) ? staticMediaSrc : mediaSrc" 
                  :alt      ="mediaAlt || heading"
                  class     ="content-section-media-img"
                  :draggable="allowDrag"
                  :style    ="{ 
                    color     : textColor, 
                    height    : mediaHeight !== 'auto' ? mediaHeight : 'auto',
                    maxHeight : mediaHeight !== 'auto' ? mediaHeight : 'none',
                    objectFit : mediaHeight !== 'auto' ? mediaFit : 'contain'
                  }"
                  @click      ="handleImageClick"
                  @error      ="hasError = true"
                  @contextmenu="handleContextMenu"
                />

                <CustomButton
                  v-if="shouldShowGifButton"
                  class          ="content-section-video-control-btn content-section-gif-control-btn"
                  :class         ="{ 'show-control-btn': isControlBtnVisible }"
                  :icon-src       ="playSvg"
                  iconColor       ="var(--color-primary)"
                  hoverIconColor  ="var(--back-to-top-button-icon-color-hover)"
                  bg-color        ="var(--color-default-background)"
                  hover-bg-color  ="var(--color-primary)"
                  width           ="48px"
                  height          ="48px"
                  padding         ="0"
                  icon-size       ="24px"
                  press-animation="none"
                  border          ="none"
                  @click.stop     ="isGifPlaying = true"
                />
              </div>
            </slot>
          </div>
        </div>
        <span v-if="mediaCaption" class="content-section-media-caption" :style="{ color: textColor }">
          {{ mediaCaption }}
        </span>
      </div>
    </div>
  </div>

  <MediaModal 
    :is-open="isModalOpen" 
    :media-item="{ type: mediaType, src: mediaSrc, alt: mediaAlt || heading }" 
    :show-nav="false"
    @close="closeImageModal" 
    @contextmenu.prevent
  />
</template>

<script setup>
/**
  * @file content_section.vue
  * @brief Content section component supporting headings, dynamic body text paragraphs, embedded media, 
  *        flexible layouts, configurable dragging, context menu options, and accessibility-driven video autoplay.
  * @displayName Content Section
*/

import { ref, computed, watch, onMounted, onUnmounted, getCurrentInstance } from 'vue'

import MediaModal from './media_modal.vue'
import CustomButton from './custom_button.vue'

import playSvg from '@/assets/svg/player-play.svg'

import { useAnimations } from '@/composables/reduced_motion_check'

const props = defineProps({
  /**
    * Section heading text content.
    * @public
    */
  heading: {
    type    : String,
    default : ''
  },
  /**
    * Body text string or an array of text paragraphs.
    * @public
    */
  text: {
    type    : [String, Array],
    default : () => []
  },
  /**
    * Position of the heading relative to the section content (top, inside).
    * @values top, inside
    * @public
    */
  headerPosition: {
    type    : String,
    default : 'top',
    validator: (value) => ['top', 'inside'].includes(value)
  },
  /**
    * Custom text color for the heading.
    * @public
    */
  headingColor: {
    type    : String,
    default : ''
  },
  /**
    * Text alignment for the heading (left, center, right, justify).
    * @values left, center, right, justify
    * @public
    */
  headingAlign: {
    type    : String,
    default : 'center',
    validator: (value) => ['left', 'center', 'right', 'justify'].includes(value)
  },
  /**
    * Text color applied to text container block.
    * @public
    */
  textColor: {
    type    : String,
    default : ''
  },
  /**
    * Background color for the main section wrapper container.
    * @public
    */
  contentBg: {
    type    : String,
    default : 'transparent'
  },
  /**
    * Border radius styling for the section container.
    * @public
    */
  borderRadius: {
    type    : String,
    default : '0px'
  },
  /**
    * Border styling applied to the main section wrapper.
    * @public
    */
  border: {
    type    : String,
    default : 'transparent'
  },
  /**
    * Border styling applied to the section header.
    * @public
    */
  headerBorder: {
    type    : String,
    default : 'transparent'
  },
  /**
    * Border styling applied to the text container block.
    * @public
    */
  textBorder: {
    type    : String,
    default : 'none'
  },
  /**
    * Border styling applied around the inner media wrapper.
    * @public
    */
  mediaBorder: {
    type    : String,
    default : ''
  },
  /**
    * Border radius styling applied to the inner media wrapper.
    * @public
    */
  mediaBorderRadius: {
    type    : String,
    default : ''
  },
  /**
    * Text alignment for paragraphs (left, center, right, justify).
    * @values left, center, right, justify
    * @public
    */
  textAlign: {
    type    : String,
    default : 'center',
    validator: (value) => ['left', 'center', 'right', 'justify'].includes(value)
  },
  /**
    * Inner padding spacing applied to the section container wrapper.
    * @public
    */
  sectionPadding: {
    type    : String,
    default : '0px'
  },
  /**
    * Inner padding spacing applied to the text content container block.
    * @public
    */
  textPadding: {
    type    : String,
    default : '0px'
  },
  /**
    * Source URL or local file path for the media asset (image, video iframe, or local video file).
    * @public
    */
  mediaSrc: {
    type    : String,
    default : ''
  },
  /**
    * Alternative description text for the media asset.
    * @public
    */
  mediaAlt: {
    type    : String,
    default : ''
  },
  /**
    * Caption text displayed underneath the media wrapper.
    * @public
    */
  mediaCaption: {
    type    : String,
    default : ''
  },
  /**
    * Custom CSS width for the media wrapper element.
    * @public
    */
  mediaWidth: {
    type    : String,
    default : '535px'
  },
  /**
    * Custom CSS height for the media display container.
    * @public
    */
  mediaHeight: {
    type    : String,
    default : 'auto'
  },
  /**
    * Type of media asset to display (image, video, text).
    * @values image, video, text
    * @public
    */
  mediaType: {
    type    : String,
    default : 'image',
    validator: (value) => ['image', 'video', 'text'].includes(value)
  },
  /**
    * Alignment orientation of media relative to text (left, right).
    * @values left, right
    * @public
    */
  mediaPosition: {
    type    : String,
    default : 'right',
    validator: (value) => ['left', 'right'].includes(value)
  },
  /**
    * Main structural flow layout configuration (horizontal, vertical).
    * @values horizontal, vertical
    * @public
    */
  layout: {
    type    : String,
    default : 'horizontal',
    validator: (value) => ['horizontal', 'vertical'].includes(value)
  },
  /**
    * Controls whether images expand into a modal view on click.
    * @public
  */
  imageOpenable: {
    type    : Boolean,
    default : true
  },
  /**
    * CSS object-fit rule for media images (cover, contain, fill, scale-down).
    * @values cover, contain, fill, scale-down
    * @public
    */
  mediaFit: {
    type    : String,
    default : 'contain',
    validator: (value) => ['cover', 'contain', 'fill', 'scale-down'].includes(value)
  },
  /**
    * Toggles image drag functionality.
    * @public
  */
  allowDrag: {
    type    : Boolean,
    default : true
  },
  /**
    * Controls whether the right-click context menu ("Save image as...") is allowed.
    * @public
  */
  allowSaveAs: {
    type    : Boolean,
    default : false
  },
  /**
    * Disables text selection across elements.
    * @public
  */
  disableSelect: {
    type    : Boolean,
    default : false
  },
  /**
  * Alignment for actions slot content (left, center, right).
  * @values left, center, right
  * @public
  */
  actionsAlign: {
    type    : String,
    default : 'left',
    validator: (value) => ['left', 'center', 'right'].includes(value)
  },
  /**
    * Controls how video stops when unhovered in reduced motion mode ('pause' or 'rewind').
    * @values pause, rewind
    * @public
    */
  videoPauseMode: {
    type     : String,
    default  : 'pause',
    validator: (value) => ['pause', 'rewind'].includes(value)
  },
  /**
  * Controls whether video or GIF playback is triggered via hover or an overlay button trigger across desktop and mobile modes.
  * @values hover, button
  * @public
  */
  videoTriggerMode: {
    type     : String,
    default  : 'button',
    validator: (value) => ['hover', 'button'].includes(value)
  },
  /**
  * Source URL for static fallback image for GIFs when reduced motion is enabled.
  * @public
  */
  staticMediaSrc: {
    type    : String,
    default : ''
  }
})

const instance = getCurrentInstance()
const instanceId = instance ? instance.uid : Math.random()

const { animationsEnabled, activeVideoId, setActiveVideo } = useAnimations()

const videoRef = ref(null)
const isModalOpen = ref(false)
const hasError    = ref(false)
const isPlaying   = ref(false)
const isGifPlaying = ref(false)

const userSelectValue = computed(() => (props.disableSelect ? 'none' : 'auto'))

/**
  * Determines whether button trigger mode behavior is currently active based on explicit prop config or reduced motion accessibility preferences.
  * @private
*/
const isButtonTriggerActive = computed(() => {
  return props.videoTriggerMode === 'button' || !animationsEnabled.value
})

/**
  * Evaluates whether the play control button should display for videos.
  * @private
*/
const shouldShowPlayButton = computed(() => {
  return isButtonTriggerActive.value && !isPlaying.value
})

/**
  * Evaluates whether the play control button should display for GIF assets.
  * @private
*/
const shouldShowGifButton = computed(() => {
  return isButtonTriggerActive.value && props.staticMediaSrc && !isGifPlaying.value
})

/**
  * Toggles visible styling class on control buttons across viewports.
  * @private
*/
const isControlBtnVisible = computed(() => {
  return isButtonTriggerActive.value
})

/**
  * Programmatically synchronizes HTML5 video playback according to motion preferences and trigger configurations.
  * @private
*/
const syncVideoPlayback = () => {
  if (props.mediaType !== 'video' || !videoRef.value || isEmbeddedVideo.value) return

  const shouldAutoplay = animationsEnabled.value

  if (shouldAutoplay) {
    videoRef.value.play().then(() => {
      isPlaying.value = true
    }).catch(() => {
      isPlaying.value = false
    })
  } else {
    videoRef.value.pause()
    isPlaying.value = false
  }
}

/**
  * Handles play events to pause non-active videos during reduced motion mode.
  * @private
*/
const onPlay = () => {
  isPlaying.value = true
  if (!animationsEnabled.value) {
    setActiveVideo(instanceId)
  }
}

/**
  * Reactively pauses the current video instance when a different video becomes active in reduced motion mode.
  * @private
*/
watch(activeVideoId, (newActiveId) => {
  if (!animationsEnabled.value && newActiveId !== instanceId && videoRef.value && !videoRef.value.paused) {
    videoRef.value.pause()
    isPlaying.value = false
  }
})

/**
  * Plays video element when hovered if hover mode is configured and motion/animations are disabled.
  * @private
*/
const handleMouseEnter = () => {
  if (props.videoTriggerMode === 'hover' && !animationsEnabled.value && videoRef.value) {
    videoRef.value.play().catch(() => {})
  }
}

/**
  * Handles video leave state based on `videoPauseMode` prop when hover mode is configured and motion/animations are disabled.
  * @private
*/
const handleMouseLeave = () => {
  if (props.videoTriggerMode === 'hover' && !animationsEnabled.value && videoRef.value) {
    videoRef.value.pause()
    if (props.videoPauseMode === 'rewind') {
      videoRef.value.currentTime = 0
    }
  }
}

/**
  * Toggles static image to animated GIF source when mouse hovers over static media asset under hover mode.
  * @private
*/
const handleImageMouseEnter = () => {
  if (props.videoTriggerMode === 'hover' && !animationsEnabled.value && props.staticMediaSrc) {
    isGifPlaying.value = true
  }
}

/**
  * Restores static fallback media source when mouse leaves media asset under hover mode.
  * @private
*/
const handleImageMouseLeave = () => {
  if (props.videoTriggerMode === 'hover' && !animationsEnabled.value && props.staticMediaSrc) {
    isGifPlaying.value = false
  }
}

/**
  * Controls click behavior for GIF elements or triggers standard modal expansion.
  * @param {MouseEvent} event - Event instance triggered by image click.
  * @private
*/
const handleImageClick = (event) => {
  if (isButtonTriggerActive.value && props.staticMediaSrc) {
    isGifPlaying.value = !isGifPlaying.value
    event.stopPropagation()
    return
  }

  openImageModal()
}

/**
  * Toggles video playback manually when triggered via control overlay.
  * @private
*/
const toggleVideoPlay = () => {
  if (!videoRef.value) return
  if (videoRef.value.paused) {
    videoRef.value.play().then(() => {
      isPlaying.value = true
    }).catch(() => {})
  } else {
    videoRef.value.pause()
    isPlaying.value = false
  }
}

/**
  * Toggles video playback when clicked under button trigger mode or reduced motion preferences.
  * @private
*/
const handleVideoClick = () => {
  if (isButtonTriggerActive.value) {
    toggleVideoPlay()
  }
}

/**
  * Evaluates whether the media source points to an external iframe embed provider.
  * @private
*/
const isEmbeddedVideo = computed(() => {
  if (!props.mediaSrc) return false
  return props.mediaSrc.includes('youtube') || 
         props.mediaSrc.includes('youtu.be') || 
         props.mediaSrc.includes('vimeo') || 
         props.mediaSrc.includes('embed')
})

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

/**
  * Filters and formats raw input text into a valid array of paragraph string blocks.
  * @private
*/
const textParagraphs = computed(() => {
  if (Array.isArray(props.text)) {
    return props.text.filter(p => Boolean(p))
  }
  return props.text ? [props.text] : []
})

/**
  * Evaluates whether the header title should render based on availability of text and heading properties.
  * @private
*/
const shouldShowHeader = computed(() => {
  return Boolean(props.heading) && textParagraphs.value.length > 0
})

watch(() => props.mediaSrc, () => {
  hasError.value = false
})

/**
  * Reactively synchronizes video playback state with changes in reduced motion preferences, video trigger mode, and media sources.
  * @private
*/
watch([animationsEnabled, () => props.videoTriggerMode, () => props.mediaSrc], () => {
  syncVideoPlayback()
})

onMounted(() => {
  syncVideoPlayback()
})

/**
  * Intercepts clicks to trigger and display the image expansion modal when valid.
  * @private
*/
const openImageModal = () => {
  if (props.mediaType === 'image' && props.mediaSrc && props.imageOpenable && !hasError.value) {
    isModalOpen.value = true
    document.body.style.overflow = 'hidden'
  }
}

/**
  * Closes the image modal view.
  * @private
*/
const closeImageModal = () => {
  isModalOpen.value = false
  document.body.style.overflow = ''
}

onUnmounted(() => {
  if (isModalOpen.value) {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
.content-section-wrapper {
  width                 : calc(100% - 4px);
  display               : flex;
  flex-direction        : column;
  align-items           : center;
  box-sizing            : border-box;
  margin                : 30px 4px 4px 0;
  position              : relative;
  z-index               : 1;
  -webkit-user-select   : v-bind(userSelectValue);
  -moz-user-select      : v-bind(userSelectValue);
  -ms-user-select       : v-bind(userSelectValue);
  user-select           : v-bind(userSelectValue);
}

.content-section-heading {
  width                 : 100%;
  font-family           : var(--content-section-font-h2);
  font-size             : var(--content-section-font-h2-size);
  color                 : var(--content-section-color-h2);
  margin                : 0;
  box-sizing            : border-box;
}

.content-section-heading.content-section-top-heading {
  margin-bottom         : 16px;
}

.content-section-heading.content-section-inside-heading {
  margin-bottom         : 12px;
}

.content-section {
  display               : flex;
  align-items           : center;
  justify-content       : flex-start;
  gap                   : 20px;
  width                 : 100%;
  box-sizing            : border-box;
}

.content-section.image-centered {
  justify-content       : center;
}

.content-section.horizontal {
  flex-direction        : row;
}

.content-section.vertical {
  flex-direction        : column;
}

.content-section.horizontal.right {
  flex-direction        : row;
}

.content-section.horizontal.left {
  flex-direction        : row-reverse;
}

.content-section.vertical.right {
  flex-direction        : column;
}

.content-section.vertical.left {
  flex-direction        : column-reverse;
}

.content-section.text-only {
  flex-direction        : column;
}

.content-section.text-only .content-section-text-container {
  width                 : 100%;
  max-width             : 100%;
}

.content-section-text-container {
  width                 : 675px;
  max-width             : 100%;
  display               : flex;
  justify-content       : flex-start;
  align-items           : flex-start;
  flex-direction        : column;
  gap                   : 8px;
  box-sizing            : border-box;
}

.content-section-body-text {
  align-self            : stretch;
  font-family           : var(--content-section-font-p);
  font-size             : var(--content-section-font-p-size);
  color                 : var(--content-section-color-p);
  margin                : 0;
  line-height           : 1.4;
}

.content-section-media-wrapper {
  width                 : var(--media-width, 535px);
  display               : flex;
  flex-direction        : column;
  align-items           : center;
  max-width             : 100%;
  flex-shrink           : 0;
}

.content-section-media-caption {
  font-family           : var(--content-section-font-p);
  font-size             : 14px;
  text-align            : center;
  margin-top            : 6px;
}

.content-section-media-container {
  width                 : 100%;
  max-width             : 100%;
  display               : block;
  position              : relative;
}

.content-section-media-inner {
  width                 : 100%;
  overflow              : hidden;
  border                : var(--content-section-media-border);
  border-radius         : var(--content-section-media-radius);
  background-color      : v-bind(contentBg);
  display               : block;
  position              : relative;
}

.content-section-clickable-media {
  cursor                : pointer;
}

.content-section-media-img,
.content-section-video-iframe {
  -webkit-user-select : v-bind(userSelectValue);
  -moz-user-select    : v-bind(userSelectValue);
  -ms-user-select     : v-bind(userSelectValue);
  user-select         : v-bind(userSelectValue);
  pointer-events      : auto;
}

.content-section-media-img {
  width                 : 100%;
  max-width             : 100%;
  height                : auto !important;
  display               : block;
  object-fit            : contain;
}

.content-section-video-iframe {
  width                 : 100%;
  aspect-ratio          : 16 / 9;
  height                : auto !important;
  border                : none;
  display               : block;
}

.content-section-image-wrapper,
.content-section-video-wrapper {
  position              : relative;
  width                 : 100%;
  height                : 100%;
  display               : flex;
  align-items           : center;
  justify-content       : center;
}

.content-section-video-element {
  -webkit-user-select : v-bind(userSelectValue);
  -moz-user-select    : v-bind(userSelectValue);
  -ms-user-select     : v-bind(userSelectValue);
  user-select         : v-bind(userSelectValue);
  pointer-events      : auto;
  width               : 100%;
  max-width           : 100%;
  height              : auto;
  display             : block;
  object-fit          : cover;
  cursor              : pointer;
}

.content-section-video-element::-webkit-media-controls {
  display             : none !important;
  -webkit-appearance  : none;
}

.content-section-video-element::-webkit-media-controls-enclosure {
  display             : none !important;
}

.content-section-video-element::-webkit-media-controls-panel {
  display             : none !important;
}

.content-section-video-element::-js-controls {
  display             : none !important;
}

.content-section-video-control-btn {
  display             : none !important;
  position            : absolute;
  border-radius       : 50% !important;
  z-index             : 2;
  transform           : none !important;
  cursor              : pointer;
}

.content-section-video-control-btn.show-control-btn {
  display             : inline-flex !important;
}

@media (max-width: 1220px) {
  .content-section-wrapper {
    width               : calc(100% - 12px);
    margin              : 12px 12px 12px 0;
    padding             : 12px 14px !important; 
  }

  .content-section {
    flex-direction      : column !important; 
    justify-content     : flex-start !important;
    align-items         : stretch !important;
    gap                 : 20px !important;
  }

  .content-section-text-container {
    width               : 100% !important;
    align-items         : flex-start !important;
  }

  .content-section-heading {
    font-size           : 28px; 
  }

  .content-section-heading.content-section-top-heading {
    margin-bottom       : 8px;
  }

  .content-section-media-wrapper {
    width               : 100% !important;
  }

  .content-section-media-container,
  .content-section-media-inner {
    height              : auto !important;
  }

  .content-section-media-img,
  .content-section-video-element {
    height              : auto !important;
    max-height          : none !important;
    object-fit          : contain !important;
  }
}

@media (max-width: 768px) {
  .content-section-wrapper {
    width               : calc(100% - 12px);
    margin              : 8px 12px 8px 0;
    padding             : 10px 10px !important;
  }

  .content-section-heading {
    font-size           : 24px;
  }

  .content-section-body-text {
    font-size           : 15px;
  }
}

@media (max-width: 480px) {
  .content-section-heading {
    font-size           : 20px;
  }
  
  .content-section {
    gap                 : 16px !important;
  }
}
</style>