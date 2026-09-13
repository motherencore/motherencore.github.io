<template>
  <a 
    :href         ="platformInfo.url" 
    target        ="_blank" 
    rel           ="noopener noreferrer" 
    class         ="social-link"
    :class        ="{ 'no-motion': !animationsEnabled }"
    :aria-label   ="computedTooltipText"
    @mouseenter   ="handleMouseEnter"
    @mouseleave   ="handleMouseLeave"
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
  * @file social_media_button.vue
  * @brief Reusable social media link button component featuring dynamic SVG icons and a hover tooltip.
*/

import { ref, computed, onUnmounted } from 'vue'
import ToolTip from '@/components/reusables/tooltip.vue'
import { useAnimations } from '@/composables/reduced_motion_check'

const { animationsEnabled } = useAnimations()

const props = defineProps({
  /** The social network platform identifier (e.g. 'twitter', 'discord'). */
  platform: {
    type: String,
    required: true
  },
  /** Custom text string override for the tooltip. */
  tooltipText: {
    type: String,
    default: null
  },
  /** Flag indicating whether the tooltip should display. */
  showTooltip: {
    type: Boolean,
    default: true
  },
  /** Position of the tooltip relative to the icon button. */
  toolTipPosition: {
    type: String,
    default: 'top'
  },
  /** Dimension size value for the icon button width and height. */
  size: {
    type: [Number, String],
    default: 48
  },
  /** Default CSS color string. */
  color: {
    type: String,
    default: 'var(--color-social-icons-color, inherit)'
  },
  /** Hover state CSS color string. */
  hoverColor: {
    type: String,
    default: 'var(--color-social-icons-hover-color, inherit)'
  }
})

/** Reference object bound to the interactive link element. */
const linkRef = ref(null)

/** Normalized platform string key. */
const key = props.platform.toLowerCase()

/** Registry collection mapping platform names to target URLs and display labels. */
const platforms = {
  twitter: { url: 'https://x.com/Mother_Encore', label: 'Twitter' },
  discord: { url: 'https://discord.gg/SS4wBGDDGm', label: 'Discord' },
  youtube: { url: 'https://www.youtube.com/watch?v=6YN_okRykjw&list=PLhtMNOPRVvaALJNwIWPeR3fMunIpoxt63&index=2', label: 'YouTube' },
  github:  { url: 'https://github.com/motherencore/MOTHER-Encore-Demo-Source-Code', label: 'GitHub' },
  bluesky: { url: 'https://bsky.app/profile/motherencore.bsky.social', label: 'Bluesky' },
  itchio:  { url: 'https://mother-encore.itch.io/mother-encore', label: 'Itch.io' }
}

/** Resolved platform dataset object fallback configuration. */
const platformInfo = platforms[key] || {
  url: '#',
  label: props.platform
}

/** Computed text string rendered inside the tooltip component. */
const computedTooltipText = computed(() => props.tooltipText || platformInfo.label)

/** Eager glob import map resolving SVG asset files. */
const socialIcons = import.meta.glob('/src/assets/svg/social_media_icons/*.svg', {
  eager: true,
  import: 'default',
})

/** Resolved CSS unit size string computed from props.size. */
const cssSize = computed(() => typeof props.size === 'number' ? `${props.size}px` : props.size)

/** Resolved SVG mask URL path computed from platform key. */
const cssMask = computed(() => {
  const fullPath = `/src/assets/svg/social_media_icons/${key}.svg`
  return `url("${socialIcons[fullPath] || ''}")`
})

/** Internal reactive visibility state toggle flag. */
const internalShow = ref(false)

/** Identifier reference for active asynchronous tooltip display timers. */
let   tooltipTimer = null

/** Computed flag validating if the component tooltip should be visible. */
const isTooltipVisible = computed(() => {
  if (props.showTooltip === false) return false
  return internalShow.value
})

/** Event handler triggered upon mouse entering the button container area. */
const handleMouseEnter = () => {
  if (tooltipTimer) clearTimeout(tooltipTimer)
  
  tooltipTimer = setTimeout(() => {
    internalShow.value = true
  }, 500)
}

/** Event handler triggered upon mouse leaving the button container area. */
const handleMouseLeave = () => {
  if (tooltipTimer) clearTimeout(tooltipTimer)
  internalShow.value = false
}

/** Lifecycle hook cleaning up active timers upon component destruction. */
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
}

.social-link:hover {
	transform        : translateY(-3px);
	color            : v-bind('props.hoverColor');
}

.social-link.no-motion:hover {
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