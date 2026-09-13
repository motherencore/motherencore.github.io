<template>
  <Transition appear :name="animationsEnabled ? 'fade-bounce' : ''">
    <button 
      class="custom-btn" 
      :class="[
        { 'icon-only': !text }, 
        { 'auto-adapt': autoAdaptSize },
        { 'no-motion': !animationsEnabled },
        `press-${pressAnimation}`
      ]"
      :disabled="disabled"
      @click="handleClick"
    >
      <div v-if="iconSrc" class="icon-wrapper">

        <div 
          v-if="hasValidColor"
          class="button-icon-masked"
        ></div>

        <img 
          v-else
          :src="processedIconSrc" 
          class="button-image" 
          alt="" 
        />
      </div>
      
      <span v-if="text" class="button-text">
        <!-- 
          @slot Override the default button text content is ignored if the text prop is empty.
        -->
        <slot name="overriden-text">{{ text }}</slot>
      </span>
    </button>
  </Transition>
</template>

<script setup>
/**
  * @file        custom_button.vue
  * @brief       Customizable button component supporting icons, dynamic coloring, Vue Router navigation, external links, and press animations.
  * @displayName Custom Button
*/

import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAnimations } from '@/composables/reduced_motion_check'

const { animationsEnabled } = useAnimations()

const props = defineProps({
  /** Disables interactions and reduces opacity when set to true. 
    * @public
  */
  disabled: {
    type    : Boolean,
    default : false
  },
  /** Automatically adapts the button size to wrap or fit text when it becomes long. 
    * @public
  */
  autoAdaptSize: {
    type    : Boolean,
    default : false
  },
  /** Label text displayed inside the button. 
    * @public
  */
  text: {
    type    : String,
    default : ''
  },
  /** Image URL or raw inline SVG string for the button icon. 
    * @public
  */
  iconSrc: {
    type    : String,
    default : '' 
  },
  /** 
    * Position of the icon relative to the text.
    * @values left, right, top, bottom 
    * @public
  */
  iconPosition: {
    type    : String,
    default : 'left',
    validator: (value) => ['left', 'right', 'top', 'bottom'].includes(value)
  },
  /** Custom margin/spacing applied specifically to the icon (e.g., '0 10px 0 0', '5px'). 
    * @public
  */
  iconMargin: {
    type    : [Number, String],
    default : null
  },
  /** Custom margin/spacing applied specifically to the text (e.g., '0 0 0 5px', '2px'). 
    * @public
  */
  textMargin: {
    type    : [Number, String],
    default : null
  },
  /** Width and height dimension for the icon container (e.g., `24`, `'2rem'`, `'var(--icon-size)'`). 
    * @public
  */
  iconSize: {
    type    : [Number, String],
    default : null
  },
  /** Fill color for CSS mask-based icons. 
    * @public
  */
  iconColor: {
    type    : String,
    default : "var(--color-custom-icon)"
  },
  /** Hover fill color for CSS mask-based icons. 
    * @public
  */
  hoverIconColor: {
    type    : String,
    default : "var(--color-custom-icon-hover)"
  },
  /** CSS border applied to the button layout. 
    * @public
  */
  border: {
    type    : String,
    default : 'var(--custom-button-border)'
  },
  /** Inner padding spacing for the button container. 
    * @public
  */
  padding: {
    type    : String,
    default : 'clamp(0.35rem, 1vw, 0.5rem)'
  },
  /** Custom width applied to the button layout. 
    * @public
  */
  width: {
    type    : [Number, String],
    default : 'fit-content'
  },
  /** Custom height applied to the button layout. 
    * @public
  */
  height: {
    type    : [Number, String],
    default : 'auto'
  },
  /** Font size applied to the text string inside the button. 
    * @public
  */
  fontSize: {
    type    : [Number, String],
    default : 'var(--custom-button-font-size)'
  },
  /** Background color of the button in default state. 
    * @public
  */
  bgColor: {
    type    : String,
    default : 'var(--color-custom-button-background)'
  },
  /** Background color when hovering over the button. 
    * @public
  */
  hoverBgColor: {
    type    : String,
    default : 'var(--color-custom-button-hover)'
  },
  /** Text color of the button in default state. 
    * @public
  */
  textColor: {
    type    : String,
    default : 'var(--color-custom-button-text)'
  },
  /** Text color when hovering over the button. 
    * @public
  */
  hoverTextColor: {
    type    : String,
    default : 'var(--color-custom-button-text-hover)'
  },
  /** Vue Router target location for internal SPA navigation. 
    * @public
  */
  to: {
    type    : [String, Object],
    default : null
  },
  /** External URL to navigate to via window location. 
    * @public
  */
  externalUrl: {
    type    : String,
    default : null
  },
  /** 
    * Active press animation transform style.
    * @values scale, lift, push, none 
    * @public
  */
  pressAnimation: {
    type    : String,
    default : 'push',
    validator: (value) => ['scale', 'lift', 'push', 'none'].includes(value)
  },
})

/**
  * Triggered when the button is clicked by the user.
  * 
  * @event click
  * @type {MouseEvent}
  * @property {MouseEvent} event - Native click event object
  */
const emit = defineEmits(['click'])
const router = useRouter()

/**
  * Formats raw inline SVG strings to data URIs or returns raw image paths.
  * @private
  */
const processedIconSrc = computed(() => {
  const IconBuilder = {
    isEmpty(src) {
      return !src
    },
    clean(src) {
      return src.trim()
    },
    isRawSvg(src) {
      return src.startsWith('<svg') || src.endsWith('</svg>')
    },
    toDataUri(src) {
      return `data:image/svg+xml;utf8,${encodeURIComponent(src)}`
    }
  }

  if (IconBuilder.isEmpty(props.iconSrc)) return ''

  const trimmed = IconBuilder.clean(props.iconSrc)

  return IconBuilder.isRawSvg(trimmed) ? IconBuilder.toDataUri(trimmed) : props.iconSrc
})

/**
  * Checks if valid dynamic icon colors exist for CSS mask rendering.
  * @private
  */
const hasValidColor = computed(() => {
  const ColorBuilder = {
    isValid(color) {
      return color && color.trim() !== ''
    }
  }

  return ColorBuilder.isValid(props.iconColor) || ColorBuilder.isValid(props.hoverIconColor)
})

/** Helper to format value (number to px string).
  * @private
  */
const formatValue = (val) => (typeof val === 'number' ? `${val}px` : val)

/** Computed flex direction mapping based on icon position.
  * @private
  */
const computedFlexDirection = computed(() => {
  if (props.iconPosition === 'right')  return 'row-reverse'
  if (props.iconPosition === 'top')    return 'column'
  if (props.iconPosition === 'bottom') return 'column-reverse'
  return 'row'
})

/** Computed width mapping based on autoAdaptSize and width prop.
  * @private
  */
const computedWidth = computed(() => props.autoAdaptSize ? 'fit-content' : formatValue(props.width))

/** Computed height mapping.
  * @private
*/
const computedHeight = computed(() => formatValue(props.height))

/** Computed icon size dimension mapping.
  * @private
*/
const cssIconSize = computed(() => props.iconSize ? formatValue(props.iconSize) : (Boolean(props.text) ? '1.2em' : '80%'))

/** Computed icon container width/height mapping.
  * @private
*/
const cssIconWidth = computed(() => props.iconSize ? formatValue(props.iconSize) : (Boolean(props.text) ? 'auto' : '80%'))

/** Computed icon margin mapping.
  * @private
*/
const cssIconMargin = computed(() => props.iconMargin ? formatValue(props.iconMargin) : null)

/** Computed text font size mapping.
  * @private
*/
const cssFontSize = computed(() => formatValue(props.fontSize))

/** Computed text margin mapping.
  * @private
*/
const cssTextMargin = computed(() => props.textMargin ? formatValue(props.textMargin) : null)

/** Computed CSS mask URL for SVG icons.
  * @private
*/
const cssMaskImage = computed(() => `url("${processedIconSrc.value}")`)

/**
  * Handles button click, emits event, and executes internal or external routing.
  * 
  * @param {MouseEvent} event Native click event trigger.
  * @public
*/
const handleClick = (event) => {
  const ClickActionBuilder = {
    isDisabled(disabled) {
      return disabled
    },

    executeNavigation(to, externalUrl) {
      if (to) {
        router.push(to)
      } 
      else if (externalUrl) {
        window.open(externalUrl, '_blank', 'noopener,noreferrer')
      }
    }
  }

  if (ClickActionBuilder.isDisabled(props.disabled)) return

  emit('click', event)

  ClickActionBuilder.executeNavigation(props.to, props.externalUrl)
}
</script>

<style scoped>
.custom-btn {
  display                      : inline-flex;
  align-items                  : center;
  justify-content              : center;
  gap                          : clamp(6px, 1.5vw, 10px); 
  max-width                    : 100%;
  text-align                   : center;
  box-sizing                   : border-box;

  background-color             : v-bind('props.bgColor');
  color                        : v-bind('props.textColor');
  border                       : v-bind('props.border');
  border-radius                : var(--custom-button-border-radius);
  cursor                       : pointer;
  
  padding                      : v-bind('props.padding');
  width                        : v-bind(computedWidth);
  height                       : v-bind(computedHeight);
  flex-direction               : v-bind(computedFlexDirection);

  transition                   : background-color 0.4s ease, 
                                 color 0.4s ease,
                                 transform 0.1s ease,
                                 opacity 0.3s ease;

  -webkit-tap-highlight-color  : transparent;
  overflow                     : hidden;
}

.custom-btn.auto-adapt {
  max-width                    : 100%;
  width                        : fit-content;
}

.custom-btn.press-scale:not(:disabled):active {
  transform                    : scale(0.95) !important;
}

.custom-btn.press-lift:not(:disabled):active {
  transform                    : translateY(-2px) !important;
}

.custom-btn.press-push:not(:disabled):active {
  transform                    : translateY(2px) !important;
}

.custom-btn.press-none:not(:disabled):active {
  transform                    : none !important;
}

.custom-btn.no-motion.press-scale:not(:disabled):active,
.custom-btn.no-motion.press-lift:not(:disabled):active,
.custom-btn.no-motion.press-push:not(:disabled):active {
  transform                    : none !important;
}

.custom-btn:not(:disabled):hover {
  background-color             : v-bind('props.hoverBgColor');
  color                        : v-bind('props.hoverTextColor');
}

.custom-btn:disabled {
  opacity                      : 0.5;
  cursor                       : not-allowed;
  pointer-events               : none;
}

.icon-wrapper {
  display                      : inline-flex;
  align-items                  : center;
  justify-content              : center;
  flex-shrink                  : 0;
  overflow                     : hidden;
  pointer-events               : none;

  width                        : v-bind(cssIconWidth);
  height                       : v-bind(cssIconSize);
  max-width                    : 100%;
  max-height                   : 100%;
  margin                       : v-bind(cssIconMargin);
}

.button-image {
  width                        : 100%;
  height                       : 100%;
  max-width                    : 100%;
  max-height                   : 100%;
  object-fit                   : contain;
  pointer-events               : none;
}

.button-icon-masked {
  width                        : 100%;
  height                       : 100%;
  background-color             : v-bind('props.iconColor');
  mask-image                   : v-bind(cssMaskImage);
  -webkit-mask-image           : v-bind(cssMaskImage);
  mask-repeat                  : no-repeat;
  -webkit-mask-repeat          : no-repeat;
  mask-position                : center;
  -webkit-mask-position        : center;
  mask-size                    : contain;
  -webkit-mask-size            : contain;
  transition                   : background-color 0.4s ease;
  pointer-events               : none;
}

.custom-btn:not(:disabled):hover .button-icon-masked {
  background-color             : v-bind('props.hoverIconColor');
}

.fade-bounce-enter-active {
  transition                   : opacity 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
                                 transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.fade-bounce-leave-active {
  transition                   : opacity 0.2s ease, transform 0.2s ease;
}

.fade-bounce-enter-from {
  opacity                      : 0;
  transform                    : scale(0.5) translateY(20px);
}

.fade-bounce-leave-to {
  opacity                      : 0;
  transform                    : scale(0.8) translateY(10px);
}

.button-text {
  font-family                  : var(--custom-button-font);
  white-space                  : normal; 
  word-wrap                    : break-word;
  text-align                   : center; 
  display                      : inline-block; 

  font-size                    : v-bind(cssFontSize);
  margin                       : v-bind(cssTextMargin);
}
</style>