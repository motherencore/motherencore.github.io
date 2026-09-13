<template>
  <div v-if="active" class="floating-notes">
    <span 
      v-for="(color, index) in noteColors" 
      :key="index" 
      :class="['note', `note-${index + 1}`]"
      :style="{ backgroundColor: color }"
    ></span>
  </div>
</template>

<script setup>
/**
  * @file        music_player_floating_notes.vue
  * @brief       Floating animated musical notes animation component with random colors, customizable speed, and float trajectory distance.
  * @displayName Music Player Floating Notes
*/

import { ref, computed, watch } from 'vue'

const props = defineProps({
  /**
    * Controls the visibility and active state of the floating notes animation.
    * @public
    */
  active: {
    type: Boolean,
    default: true
  },
  /**
    * Determines whether notes pick a random color from the provided palette array.
    * @public
    */
  isRandomColor: {
    type: Boolean,
    default: true
  },
  /**
    * Array of available color strings for the floating notes.
    * @public
    */
  colors: {
    type: Array,
    default: () => [
      'var(--color-place-holder-green)'
    ]
  },
  /**
    * Fallback color used when random coloring is disabled or the palette is empty.
    * @public
    */
  fallbackColor: {
    type: String,
    default: 'var(--color-place-holder-green)'
  },
  /**
    * Vertical float travel distance for the animation trajectory.
    * @public
    */
  distance: {
    type: [String, Number],
    default: '-50px'
  },
  /**
    * Duration or speed of the floating animation cycle.
    * @public
    */
  speed: {
    type: [String, Number],
    default: '2s'
  }
})

/**
  * Stores the current active colors assigned to the rendered notes.
  * @private
  */
const noteColors = ref([])

/**
  * Selects a random color from the color palette or falls back appropriately.
  * @private
  */
const getRandomColor = () => {
  if (!props.isRandomColor || !props.colors || props.colors.length === 0) {
    return props.fallbackColor
  }
  const randomIndex = Math.floor(Math.random() * props.colors.length)
  return props.colors[randomIndex]
}

/**
  * Refreshes the color array with newly randomized colors for each note.
  * @private
  */
const refreshColors = () => {
  noteColors.value = [getRandomColor(), getRandomColor(), getRandomColor()]
}

watch(
  [() => props.active, () => props.isRandomColor, () => props.colors],
  () => {
    refreshColors()
  },
  { immediate: true }
)

/** Formatted vertical float distance with unit support.
  * @private
  */
const computedDistance = computed(() => {
  return typeof props.distance === 'number' ? `${props.distance}px` : props.distance
})

/** Formatted animation speed duration with unit support.
  * @private
  */
const computedSpeed = computed(() => {
  return typeof props.speed === 'number' ? `${props.speed}s` : props.speed
})
</script>

<style scoped>
@keyframes floatNote {
  0% {
    opacity   : 0;
    transform : translateY(0) scale(0.5) rotate(-10deg);
  }
  30% {
    opacity   : 1;
  }
  100% {
    opacity   : 0;
    transform : translateY(v-bind(computedDistance)) translateX(12px) scale(1.1) rotate(15deg);
  }
}

.floating-notes {
  position       : absolute;
  top            : 0;
  left           : 0;
  width          : 100%;
  height         : 100%;
  pointer-events : none;
  z-index        : 5;
}

.note {
  position             : absolute;
  display              : inline-block;
  
  --note-size          : 28px;
  
  width                : var(--note-size);
  height               : var(--note-size);
  opacity              : 0;

  -webkit-mask-size    : contain;
  mask-size            : contain;
  -webkit-mask-repeat  : no-repeat;
  mask-repeat          : no-repeat;
  -webkit-mask-position: center;
  mask-position        : center;

  animation            : floatNote v-bind(computedSpeed) infinite cubic-bezier(0.25, 0.46, 0.45, 0.94);
  filter               : drop-shadow(0 1px 3px rgba(0, 0, 0, 0.4));
  pointer-events       : none;
}

.note-1 {
  left                 : 20%;
  animation-delay      : 0s;
  -webkit-mask-image   : url('@/assets/svg/beam-musical-note.svg');
  mask-image           : url('@/assets/svg/beam-musical-note.svg');
}

.note-2 {
  left                 : 50%;
  animation-delay      : calc(v-bind(computedSpeed) * 0.3);
  -webkit-mask-image   : url('@/assets/svg/crotchet-musical-note.svg');
  mask-image           : url('@/assets/svg/crotchet-musical-note.svg');
}

.note-3 {
  left                 : 75%;
  animation-delay      : calc(v-bind(computedSpeed) * 0.6);
  -webkit-mask-image   : url('@/assets/svg/quaver-musical-note.svg');
  mask-image           : url('@/assets/svg/quaver-musical-note.svg');
}

@media (max-width: 480px) {
  .note {
    --note-size: 18px;  
  }

  .note-1 { left: 1%; }
  .note-2 { left: 5%; }
  .note-3 { left: 10%; }
}
</style>