<template>
  <a 
    :href         ="isClickable ? resolvedUrl : undefined"
    :target       ="isClickable ? '_blank' : undefined"
    :rel          ="isClickable ? 'noopener noreferrer' : undefined"
    :tabindex     ="isClickable ? undefined : -1"
    :aria-disabled="!isClickable"
    class         ="platform-link"
    :class="{ 
      'is-clickable': isClickable,
      'not-clickable': !isClickable
    }"
    :aria-label   ="platformInfo.label"
    @click        ="handleClick"
  >
    <div class="platform-icon" />
  </a>
</template>

<script setup>
/**
  * @file        so_buttons.vue
  * @brief       An operating system platform link/icon button component supporting custom masking, sizing, and clickability states.
  * @displayName Platform Button
*/

import { computed } from 'vue'

const props = defineProps({
  /**
    * Target operating system platform identifier (e.g. windows, linux, mac).
    * @public
    */
  platform: {
    type: String,
    required: true
  },
  /**
    * Dimension size for the platform icon.
    * @public
    */
  size: {
    type: [Number, String],
    default: 48
  },
  /**
    * Default fill color for the icon.
    * @public
    */
  color: {
    type: String,
    default: 'var(--color-operational-system-icons-color)'
  },
  /**
    * Hover state fill color for the icon.
    * @public
    */
  hoverColor: {
    type: String,
    default: 'var(--color-operational-system-icons-hover-color)'
  },
  /**
    * Custom override URL for the platform link.
    * @public
    */
  url: {
    type: String,
    default: ''
  },
  /**
    * Controls whether the button behaves as an interactive link.
    * @public
    */
  clickable: {
    type: [Boolean, String],
    default: true
  }
})

/**
  * Determines if the platform link is active/clickable.
  * @private
  */
const isClickable = computed(() => {
  if (typeof props.clickable === 'string') {
    return props.clickable.toLowerCase() !== 'false'
  }
  return Boolean(props.clickable)
})

const platformInput = props.platform.toLowerCase()
const key = (platformInput === 'macos' || platformInput === 'mac') ? 'mac' : platformInput


const platforms = {
  windows: {
    url: 'https://mother-encore.itch.io/mother-encore#download',
    label: 'Windows'
  },
  linux: {
    url: 'https://mother-encore.itch.io/mother-encore#download',
    label: 'Linux'
  },
  mac: {
    url: 'https://mother-encore.itch.io/mother-encore#download',
    label: 'macOS'
  },
}

const platformInfo = platforms[key] || {
  url: '#',
  label: props.platform
}

/**
  * Resolves final target URL based on props and defaults.
  * @private
  */
const resolvedUrl = computed(() => props.url || platformInfo.url)

const soIcons = import.meta.glob('/src/assets/svg/so_icons/*.svg', {
  eager: true,
  import: 'default',
})

/**
  * Formats size value into pixel string if numeric.
  * @private
  */
const iconSize = computed(() => (typeof props.size === 'number' ? `${props.size}px` : props.size))

/**
  * Computes the SVG icon URL for CSS masking.
  * @private
  */
const iconMask = computed(() => {
  const fullPath = `/src/assets/svg/so_icons/${key}.svg`
  const iconUrl = soIcons[fullPath] || ''
  return `url("${iconUrl}")`
})

/**
  * Prevents default navigation behavior if the button is marked unclickable.
  * @private
  */
const handleClick = (e) => {
  if (!isClickable.value) {
    e.preventDefault()
    e.stopPropagation()
    e.stopImmediatePropagation()
  }
}
</script>

<style scoped>
.platform-link {
  display                      : inline-flex;
  align-items                  : center;
  justify-content              : center;
  text-decoration              : none;
  color                        : v-bind('props.color');
  transition                   : color 0.3s ease;
}

.platform-link.not-clickable {
  pointer-events               : none !important;
  cursor                       : default !important;
  user-select                  : none !important;
}

.platform-link.is-clickable {
  cursor                       : pointer;
  transition                   : transform 0.2s ease, opacity 0.2s ease, color 0.3s ease;
}

.platform-link.is-clickable:hover {
  transform                    : translateY(-3px);
  opacity                      : 0.85;
  color                        : v-bind('props.hoverColor');
}

.platform-icon {
  width                        : v-bind(iconSize);
  height                       : v-bind(iconSize);
  background-color             : currentColor;
  display                      : block;
  
  -webkit-mask-image           : v-bind(iconMask);
  mask-image                   : v-bind(iconMask);
  -webkit-mask-repeat          : no-repeat;
  mask-repeat                  : no-repeat;
  -webkit-mask-position        : center;
  mask-position                : center;
  -webkit-mask-size            : contain;
  mask-size                    : contain;
}
</style>