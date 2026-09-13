<template>
  <div 
    ref="rootRef" 
    class="foldable-item" 
    :class="{ 'is-open': internalOpen }"
  >
    <button 
      type="button" 
      class="foldable-header" 
      @click="toggleFold"
    >
      <span class="foldable-title">
        {{ title }}
      </span>
      <span class="icon-wrapper">
        <span 
          class="arrow-wrapper" 
          :class="{ open: internalOpen }"
        >
          <span class="arrow-icon arrow-outline"></span>
          <span class="arrow-icon"></span>
        </span>
      </span>
    </button>

    <div class="foldable-collapse">
      <div class="foldable-body-wrapper">
        <div class="foldable-body">
          <ContentSection
            :text                 ="content"
            :header-position      ="headerPosition"
            :heading-color        ="headingColor"
            :heading-align        ="headingAlign"
            :text-color           ="textColor"
            :content-bg           ="contentBg"
            :border-radius        ="borderRadius"
            :border               ="border"
            :header-border        ="headerBorder"
            :text-border          ="textBorder"
            :media-border         ="mediaBorder"
            :media-border-radius  ="mediaBorderRadius"
            :text-align           ="textAlign"
            :section-padding      ="sectionPadding"
            :text-padding         ="textPadding"
            :media-src            ="mediaSrc"
            :media-alt            ="mediaAlt"
            :media-caption        ="mediaCaption"
            :media-width          ="mediaWidth"
            :media-height         ="mediaHeight"
            :media-type           ="mediaType"
            :media-position       ="mediaPosition"
            :layout               ="layout"
            :image-openable       ="imageOpenable"
          >
            <template #media>
              <!-- @slot media - Custom media content slot -->
              <slot name="media"></slot>
            </template>
          </ContentSection>
          <!-- @slot Slot for main inner body content -->
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
  * @file        foldable_section.vue
  * @brief       An accordion/foldable section component wrapping a content section with smooth collapse transition and auto-scroll capabilities.
  * @displayName Foldable Section
*/

import { ref, watch, nextTick } from 'vue'
import ContentSection from '@/components/reusables/content_section.vue'

const props = defineProps({
  /** Header title text displayed on the toggle button. 
    * @public
  */
  title: {
    type: String,
    required: true
  },
  /** Controls the open or closed state of the foldable item externally via v-model. 
    * @public
  */
  modelValue: {
    type: Boolean,
    default: undefined
  },
  /** Automatically scrolls the view to center this component when expanded. 
    * @public
  */
  autoScroll: {
    type: Boolean,
    default: true
  },
  /** Background color of the header element. 
    * @public
  */
  headerBg: {
    type: String,
    default: 'var(--foldable-header-bg)'
  },
  /** Text color of the header title. 
    * @public
  */
  titleColor: {
    type: String,
    default: 'var(--foldable-title-color)'
  },
  /** Background color of the main body wrapper. 
    * @public
  */
  bodyBg: {
    type: String,
    default: 'var(--foldable-body-bg)'
  },
  /** Background color of the icon container wrapper. 
    * @public
  */
  arrowBgColor: {
    type: String,
    default: 'var(--foldable-icon-bg)'
  },
  /** Main fill color of the indicator arrow icon. 
    * @public
  */
  arrowColor: {
    type: String,
    default: 'var(--foldable-icon-color)'
  },
  /** Outline shadow or border color of the indicator arrow icon. 
    * @public
  */
  outlineColor: {
    type: String,
    default: 'var(--foldable-icon-outline)'
  },

  // ContentSection Stuff =============================================================================================================
  /** Text content passed down to the inner ContentSection component. 
    * @public
  */
  content: {
    type: [String, Array],
    default: () => []
  },
  /** Position of the header relative to the content block. 
    * @public
  */
  headerPosition: {
    type: String,
    default: 'top'
  },
  /** Color of the inner heading element. 
    * @public
  */
  headingColor: {
    type: String,
    default: ''
  },
  /** Alignment of the inner heading text. 
    * @public
  */
  headingAlign: {
    type: String,
    default: 'center'
  },
  /** Text color applied inside the content block. 
    * @public
  */
  textColor: {
    type: String,
    default: 'var(--foldable-text-color)'
  },
  /** Background color of the inner content block. 
    * @public
  */
  contentBg: {
    type: String,
    default: '#202020'
  },
  /** Border radius applied to the inner content section. 
    * @public
  */
  borderRadius: {
    type: String,
    default: '8px'
  },
  /** Outer border styling for the inner section. 
    * @public
  */
  border: {
    type: String,
    default: '3px solid #7a6c86'
  },
  /** Header border styling. 
    * @public
  */
  headerBorder: {
    type: String,
    default: 'transparent'
  },
  /** Text section border styling. 
    * @public
  */
  textBorder: {
    type: String,
    default: 'none'
  },
  /** Media block border styling. 
    * @public
  */
  mediaBorder: {
    type: String,
    default: ''
  },
  /** Media block border radius styling. 
    * @public
  */
  mediaBorderRadius: {
    type: String,
    default: ''
  },
  /** Text alignment inside the content block. 
    * @public
  */
  textAlign: {
    type: String,
    default: 'left'
  },
  /** Padding spacing for the content section container. 
    * @public
  */
  sectionPadding: {
    type: String,
    default: '16px 20px'
  },
  /** Padding spacing specifically for the text container. 
    * @public
  */
  textPadding: {
    type: String,
    default: '0px'
  },
  /** Media asset source URL. 
    * @public
  */
  mediaSrc: {
    type: String,
    default: ''
  },
  /** Alternative descriptive text for media elements. 
    * @public
  */
  mediaAlt: {
    type: String,
    default: ''
  },
  /** Caption text displayed alongside media elements. 
    * @public
  */
  mediaCaption: {
    type: String,
    default: ''
  },
  /** Width dimension configuration for media elements. 
    * @public
  */
  mediaWidth: {
    type: String,
    default: '535px'
  },
  /** Height dimension configuration for media elements. 
    * @public
  */
  mediaHeight: {
    type: String,
    default: 'auto'
  },
  /** Type classification of the media element. 
    * @public
  */
  mediaType: {
    type: String,
    default: 'text'
  },
  /** Alignment/position layout of media relative to text. 
    * @public
  */
  mediaPosition: {
    type: String,
    default: 'right'
  },
  /** General arrangement layout mode. 
    * @public
  */
  layout: {
    type: String,
    default: 'horizontal'
  },
  /** Determines if inner images can be opened/zoomed. 
    * @public
  */
  imageOpenable: {
    type: Boolean,
    default: true
  },
})

const emit = defineEmits(['update:modelValue', 'toggle'])

const rootRef = ref(null)
const internalOpen = ref(false)

/**
  * Scrolls the window smoothly to center this component into view.
  * @private
*/
const scrollToSelf = () => {
  if (props.autoScroll && rootRef.value) {
    nextTick(() => {
      rootRef.value.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
    })
  }
}

watch(() => props.modelValue, (newVal) => {
  if (newVal !== undefined) {
    const wasOpen = internalOpen.value
    internalOpen.value = newVal
    if (!wasOpen && newVal) {
      scrollToSelf()
    }
  }
}, { immediate: true })

/**
  * Toggles the open/closed state of the foldable item and handles events.
  * @private
*/
const toggleFold = () => {
  internalOpen.value = !internalOpen.value
  emit('update:modelValue', internalOpen.value)
  emit('toggle', internalOpen.value)

  if (internalOpen.value) {
    scrollToSelf()
  }
}
</script>

<style scoped>
.foldable-item {
  width               : 100%;
  border-radius       : 8px;
  box-sizing          : border-box;
  background-color    : v-bind('props.bodyBg');
  border              : var(--foldable-body-border);
}

.foldable-header {
  width               : 100%;
  display             : flex;
  justify-content     : space-between;
  align-items         : center;
  border              : none;
  padding             : 20px 24px;
  cursor              : pointer;
  text-align          : left;
  box-sizing          : border-box;
  background-color    : v-bind('props.headerBg');
  border-radius       : inherit;
}

.foldable-title {
  color               : v-bind('props.titleColor');
  font-family         : var(--font-h2);
  font-size           : var(--font-h2-size);
  font-weight         : 500;
}

.icon-wrapper {
  display             : flex;
  align-items         : center;
  justify-content     : center;
  width               : 40px;
  height              : 40px;
  border-radius       : 50%;
  background-color    : v-bind('props.arrowBgColor');
  flex-shrink         : 0;
  position            : relative;
}

.arrow-wrapper {
  position            : relative;
  width               : 20px;
  height              : 22px;
  pointer-events      : none;
  z-index             : 2;
  transition          : transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.arrow-wrapper.open {
  transform           : rotate(90deg) translateX(-30%);
}

.arrow-icon {
  position            : absolute;
  left                : 0;
  top                 : 50%;
  width               : 30px;
  height              : 30px;
  transform           : translateY(-50%);
  z-index             : 2;
  background-color    : v-bind('props.arrowColor');
  
  -webkit-mask-image  : url('@/assets/svg/triangle-right-12-filled.svg');
  mask-image          : url('@/assets/svg/triangle-right-12-filled.svg');
  -webkit-mask-size   : contain;
  mask-size           : contain;
  -webkit-mask-repeat : no-repeat;
  mask-repeat         : no-repeat;
}

.arrow-outline {
  width               : 30px;
  height              : 30px;
  left                : 0;
  top                 : 50%;
  transform           : translateY(-50%) scale(1.3);
  z-index             : 1;
  background-color    : v-bind('props.outlineColor');
}

.foldable-collapse {
  display             : grid;
  grid-template-rows  : 0fr;
  transition          : grid-template-rows 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  width               : 100%;
  box-sizing          : border-box;
}

.is-open .foldable-collapse {
  grid-template-rows  : 1fr;
}

.foldable-body-wrapper {
  overflow            : hidden;
  width               : 100%;
  box-sizing          : border-box;
}

.foldable-body {
  width               : 100%;
  padding             : 0 24px 24px 24px;
  box-sizing          : border-box;
  display             : flex;
  flex-direction      : column;
  gap                 : 12px;
}
</style>