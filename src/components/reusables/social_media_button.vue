<template>
  <a 
    :href         ="platformInfo.url" 
    target        ="_blank" 
    rel           ="noopener noreferrer" 
    class         ="social-link"
    :class        ="{ 'no-motion': !animationsEnabled }"
    :aria-label   ="computedTooltipText"
    @mouseenter   ="handleShowTooltip"
    @mouseleave   ="handleHideTooltip"
    @focus        ="handleShowTooltip"
    @blur         ="handleHideTooltip"
    ref           ="linkRef"
  >
    <div class="social-icon"/>

    <ToolTip 
      :show       ="isTooltipVisible" 
      :target-ref ="linkRef" 
      :text       ="computedTooltipText"
      :position   ="toolTipPosition"
    />
  </a>
</template>

<script setup>
/**
  * @file        social_media_button.vue
  * @brief       Reusable social media link button component featuring dynamic SVG icons and a hover tooltip.
  * @displayName Social Media Button
*/

import { ref, computed, onUnmounted } from 'vue'
import ToolTip from '@/components/reusables/tooltip.vue'
import { useAnimations } from '@/composables/reduced_motion_check'

/**
  * Composable providing reduced motion animation settings.
  * @private
  */
const { animationsEnabled } = useAnimations()

const props = defineProps({
  /** 
    * The social network platform identifier (e.g. 'twitter', 'discord'). 
    * @public
    */
  platform: {
    type: String,
    required: true
  },
  /** 
    * Custom text string override for the tooltip. 
    * @public
    */
  tooltipText: {
    type: String,
    default: null
  },
  /** 
    * Flag indicating whether the tooltip should display. 
    * @public
    */
  showTooltip: {
    type: Boolean,
    default: true
  },
  /** 
    * Position of the tooltip relative to the icon button. 
    * @public
    */
  toolTipPosition: {
    type: String,
    default: 'top'
  },
  /** 
    * Dimension size value for the icon button width and height. 
    * @public
    */
  size: {
    type: [Number, String],
    default: 48
  },
  /** 
    * Default CSS color string. 
    * @public
    */
  color: {
    type: String,
    default: 'var(--color-social-icons-color, inherit)'
  },
  /** 
    * Hover state CSS color string. 
    * @public
    */
  hoverColor: {
    type: String,
    default: 'var(--color-social-icons-hover-color, inherit)'
  }
})

/** 
  * Reference object bound to the interactive link element. 
  * @private
  */
const linkRef = ref(null)

/** 
  * Normalized reactive platform key. 
  * @private
  */
const activeKey = computed(() => (props.platform || '').toLowerCase())

/** 
  * Registry collection mapping platform names to target URLs and display labels. 
  * @private
  */
const platforms = {
  twitter: { url: 'https://x.com/Mother_Encore', label: 'Twitter' },
  discord: { url: 'https://discord.gg/SS4wBGDDGm', label: 'Discord' },
  youtube: { url: 'https://www.youtube.com/watch?v=6YN_okRykjw&list=PLhtMNOPRVvaALJNwIWPeR3fMunIpoxt63&index=2', label: 'YouTube' },
  github:  { url: 'https://github.com/motherencore/MOTHER-Encore-Demo-Source-Code', label: 'GitHub' },
  bluesky: { url: 'https://bsky.app/profile/motherencore.bsky.social', label: 'Bluesky' },
  itchio:  { url: 'https://mother-encore.itch.io/mother-encore', label: 'Itch.io' }
}

/** 
  * Resolved platform dataset object fallback configuration. 
  * @private
  */
const platformInfo = computed(() => {
  return platforms[activeKey.value] || {
    url: '#',
    label: props.platform
  }
})

/** 
  * Computed text string rendered inside the tooltip component. 
  * @private
  */
const computedTooltipText = computed(() => props.tooltipText || platformInfo.value.label)

/** 
  * Eager glob import map resolving SVG asset files. 
  * @private
  */
const socialIcons = import.meta.glob('/src/assets/svg/social_media_icons/*.svg', {
  eager: true,
  import: 'default',
})

/** 
  * Resolved CSS unit size string computed from props.size. 
  * @private
  */
const cssSize = computed(() => typeof props.size === 'number' ? `${props.size}px` : props.size)

/** 
  * Resolved SVG mask URL path computed from platform key. 
  * @private
  */
const cssMask = computed(() => {
  const fullPath = `/src/assets/svg/social_media_icons/${activeKey.value}.svg`
  return `url("${socialIcons[fullPath] || ''}")`
})

/** 
  * Internal reactive visibility state toggle flag. 
  * @private
  */
const internalShow = ref(false)

/** 
  * Identifier reference for active asynchronous tooltip display timers. 
  * @private
  */
let tooltipTimer = null

/** 
  * Computed flag validating if the component tooltip should be visible. 
  * @private
  */
const isTooltipVisible = computed(() => {
  if (props.showTooltip === false) return false
  return internalShow.value
})

/** 
  * Event handler triggered upon mouse entering or focusing the button container area. 
  * @private
  */
const handleShowTooltip = () => {
  if (tooltipTimer) clearTimeout(tooltipTimer)
  
  tooltipTimer = setTimeout(() => {
    internalShow.value = true
  }, 500)
}

/** 
  * Event handler triggered upon mouse leaving or blurring the button container area. 
  * @private
  */
const handleHideTooltip = () => {
  if (tooltipTimer) clearTimeout(tooltipTimer)
  internalShow.value = false
}

/** 
  * Lifecycle hook cleaning up active timers upon component destruction. 
  * @private
  */
onUnmounted(() => {
  if (tooltipTimer) clearTimeout(tooltipTimer)
})
</script>

<style scoped>
.social-link {
	position         : relative;
	display          : inline-flex;
	align-items      : center;
	justify-content  : center;
	text-decoration  : none;
	transition       : transform 0.15s ease, color 0.3s ease;
	color            : v-bind('props.color');
  outline          : none;
}

.social-link:hover,
.social-link:focus-visible {
	transform        : translateY(-3px);
	color            : v-bind('props.hoverColor');
}

.social-link.no-motion:hover,
.social-link.no-motion:focus-visible {
	transform        : none;
}

.social-icon {
	width            : v-bind(cssSize);
	height           : v-bind(cssSize);
	background-color : currentColor;
	display          : block;
	
	-webkit-mask-image     : v-bind(cssMask);
	mask-image             : v-bind(cssMask);
	-webkit-mask-repeat    : no-repeat;
	mask-repeat            : no-repeat;
	-webkit-mask-position  : center;
	mask-position          : center;
	-webkit-mask-size      : contain;
	mask-size              : contain;
}
</style>