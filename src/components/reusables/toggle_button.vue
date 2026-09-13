<template>
  <Transition name="fade-bounce" appear>
    <label 
      class="custom-switch" 
      :class="{ 'is-active': modelValue }"
      @click="handleClick"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <input 
        type="checkbox" 
        class="switch-input"
        :checked="modelValue" 
        readonly
      />
      
      <span class="slider">
        <span class="handle">
          <span 
            v-if="processedIcon && iconColor" 
            class="switch-icon-masked" 
          ></span>
          <img 
            v-else-if="processedIcon" 
            :src="processedIcon" 
            class="switch-icon" 
            alt="" 
          />
        </span>
      </span>
    </label>
  </Transition>
</template>

<script setup>
/**
  * @file        toggle_button.vue
  * @brief       A customizable switch toggle component supporting active/inactive icons, masked colorization, and custom dimensions.
  * @displayName Toggle Button
*/

import { computed, ref } from 'vue'

const props = defineProps({
  /**
    * Binds the switch checked state externally via v-model.
    * @public
    */
  modelValue: {
    type    : Boolean,
    default : false
  },
  /**
    * Default source URL or SVG string for the icon.
    * @public
    */
  iconSrc: {
    type    : String,
    default : '' 
  },
  /**
    * Icon source used specifically when the toggle is active.
    * @public
    */
  activeIconSrc: {
    type    : String,
    default : ''
  },
  /**
    * Icon source used specifically when the toggle is inactive.
    * @public
    */
  inactiveIconSrc: {
    type    : String,
    default : ''
  },
  /**
    * Width and height dimension for the icon.
    * @public
    */
  iconSize: {
    type    : [Number, String],
    default : 24 
  },
  /**
    * Fill color for CSS mask-based switch icons.
    * @public
    */
  iconColor: {
    type    : String,
    default : '#ffffff'
  },
  /**
    * Background color of the internal draggable/sliding handle.
    * @public
    */
  handleBgColor: {
    type    : String,
    default : 'var(--color-black)'
  },
  /**
    * Width dimension applied to the slider track.
    * @public
    */
  width: {
    type    : [Number, String],
    default : 80
  },
  /**
    * Height dimension applied to the slider track.
    * @public
    */
  height: {
    type    : [Number, String],
    default : 44
  },
  /**
    * Background color of the slider in default inactive state.
    * @public
    */
  bgColor: {
    type    : String,
    default : 'var(--color-custom-button-background)'
  },
  /**
    * Background color of the slider when hovered.
    * @public
    */
  hoverBgColor: {
    type    : String,
    default : 'var(--color-custom-button-hover)'
  },
  /**
    * Background color of the slider when active.
    * @public
    */
  activeBgColor: {
    type    : String,
    default : 'var(--color-hover)'
  }
})

const emit = defineEmits(['update:modelValue', 'change'])
const isHovered = ref(false)

/**
  * Helper to format value (number to px string).
  * @private
  */
const formatValue = (val) => (typeof val === 'number' ? `${val}px` : val)

/**
  * Computed width style for the slider track.
  * @private
  */
const cssWidth = computed(() => formatValue(props.width))

/**
  * Computed height style for the slider track.
  * @private
  */
const cssHeight = computed(() => formatValue(props.height))

/**
  * Computed dynamic background color for the slider depending on state.
  * @private
  */
const cssSliderBg = computed(() => {
  if (props.modelValue) return props.activeBgColor
  if (isHovered.value) return props.hoverBgColor
  return props.bgColor
})

/**
  * Computed size for the handle based on slider height.
  * @private
  */
const handleSizeValue = computed(() => {
  const h = typeof props.height === 'number' ? props.height : parseInt(props.height) || 44
  return h - 8
})

/**
  * Computed width/height style for the handle element.
  * @private
  */
const cssHandleSize = computed(() => `${handleSizeValue.value}px`)

/**
  * Computed translation distance for the active state based on width, handle size, borders, and margins.
  * @private
  */
const activeTranslateX = computed(() => {
  const w = typeof props.width === 'number' ? props.width : parseInt(props.width) || 80
  const h = handleSizeValue.value
  return w - h - 8
})

/**
  * Formatted translation distance string for CSS binding.
  * @private
  */
const cssTranslateX = computed(() => `${activeTranslateX.value}px`)

/**
  * Computed size style for the icon element.
  * @private
  */
const cssIconSize = computed(() => formatValue(props.iconSize))

/**
  * Computed raw icon string depending on active/inactive states.
  * @private
  */
const rawIcon = computed(() => {
  if (props.modelValue) {
    return props.inactiveIconSrc || props.iconSrc || props.activeIconSrc || ''
  }
  return props.activeIconSrc || props.iconSrc || props.inactiveIconSrc || ''
})

/**
  * Processes raw SVG strings into data URIs or passes through image paths.
  * @private
  */
const processedIcon = computed(() => {
  const icon = rawIcon.value
  if (!icon) return ''
  
  if (typeof icon === 'string' && (icon.trim().startsWith('<svg') || icon.trim().endsWith('</svg>'))) {
    return `data:image/svg+xml;utf8,${encodeURIComponent(icon.trim())}`
  }
  return icon
})

/**
  * Computed CSS mask URL for SVG icons.
  * @private
  */
const cssMaskImage = computed(() => `url("${processedIcon.value}")`)

/** 
  * Handles the click action to toggle states and emit events.
  * @private
*/
const handleClick = (event) => {
  event.preventDefault()
  const nextValue = !props.modelValue
  emit('update:modelValue', nextValue)
  emit('change', nextValue)
}
</script>

<style scoped>
.custom-switch {
  display                     : inline-flex;
  align-items                 : center;
  cursor                      : pointer;
  box-sizing                  : border-box;

  -webkit-tap-highlight-color : transparent;
  -webkit-backface-visibility : hidden;
  backface-visibility         : hidden;
  -webkit-transform-style     : preserve-3d;
  transform-style             : preserve-3d;
}

.switch-input {
  display                     : none;
}

.slider {
  position                    : relative;
  display                     : inline-flex;
  align-items                 : center;
  box-sizing                  : border-box;
  border                      : 3px solid #000000;
  border-radius               : var(--default-border-radius);

  width                       : v-bind(cssWidth);
  height                      : v-bind(cssHeight);
  background-color            : v-bind(cssSliderBg);

  transition                  : background-color 0.4s ease, 
                                color 0.4s ease;
}
 
.handle {
  position                    : absolute;
  left                        : 2px;
  border-radius               : 50%;
  display                     : flex;
  align-items                 : center;
  justify-content             : center;
  box-sizing                  : border-box;
  
  width                       : v-bind(cssHandleSize);
  height                      : v-bind(cssHandleSize);
  background-color            : v-bind('props.handleBgColor');

  transition                  : transform 0.4s cubic-bezier(0.1, 1, 0.2, 1), 
                                background-color 0.4s ease;
}

.custom-switch.is-active .slider,
label.custom-switch.is-active span.slider {
  background-color            : v-bind('props.activeBgColor') !important;
}

.custom-switch.is-active .handle {
  transform                   : translateX(v-bind(cssTranslateX));
}

.custom-switch:active .handle {
  transform                   : scale(0.9);
}

.custom-switch.is-active:active .handle {
  transform                   : translateX(v-bind(cssTranslateX)) scale(0.9);
}

.switch-icon {
  width                       : v-bind(cssIconSize);
  height                      : v-bind(cssIconSize);
  object-fit                  : contain;
  pointer-events              : none;
}

.switch-icon-masked {
  display                     : inline-block;
  width                       : v-bind(cssIconSize);
  height                      : v-bind(cssIconSize);
  background-color            : v-bind('props.iconColor');
  mask-image                  : v-bind(cssMaskImage);
  -webkit-mask-image          : v-bind(cssMaskImage);
  mask-repeat                 : no-repeat;
  -webkit-mask-repeat         : no-repeat;
  mask-position               : center;
  -webkit-mask-position       : center;
  mask-size                   : contain;
  -webkit-mask-size           : contain;
  pointer-events              : none;
  transition                  : background-color 0.4s ease;
}

.fade-bounce-enter-active {
  transition                  : opacity 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
                                transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.fade-bounce-leave-active {
  transition                  : opacity 0.2s ease, transform 0.2s ease;
}

.fade-bounce-enter-from {
  opacity                     : 0;
  transform                   : scale(0.5) translateY(20px);
}

.fade-bounce-leave-to {
  opacity                     : 0;
  transform                   : scale(0.8) translateY(10px);
}
</style>