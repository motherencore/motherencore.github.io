<template>
  <div class="dropdown-container" ref="dropdownRef">
    <div 
      class="dropdown-trigger" 
      tabindex="0"
      role="combobox"
      :aria-expanded="isOpen"
      aria-haspopup="listbox"
      @click="isOpen = !isOpen"
      @keydown.space.prevent="isOpen = !isOpen"
      @keydown.enter.prevent="isOpen = !isOpen"
    >
      <div class="arrow-wrapper" :class="{ open: isOpen }">
        <span class="arrow-icon"></span>
      </div>
      <span class="selected-label">{{ selectedLabel }}</span>
    </div>

    <div 
      v-if="isOpen" 
      class="dropdown-options-list"
      role="listbox"
    >
      <div 
        v-for="option in options" 
        :key="option.id"
        class="dropdown-option"
        :class="{ active: modelValue === option.id }"
        role="option"
        :aria-selected="modelValue === option.id"
        tabindex="0"
        @click="selectOption(option.id)"
        @keydown.enter.prevent="selectOption(option.id)"
        @keydown.space.prevent="selectOption(option.id)"
      >
        <span class="option-arrow"></span>
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<script setup>
/**
  * @file        custom_dropdown.vue
  * @brief       A customizable dropdown component supporting v-model selection, click-outside closing behavior, and animated arrow icons.
  * @displayName Custom Dropdown
*/

import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  /** Current selected value bound via v-model. 
    * @public
  */
  modelValue: {
    type: [String, Number],
    required: true
  },
  /** List of selectable options containing id and label properties. 
    * @public
  */
  options: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

/**
  * Tracks whether the dropdown option list is expanded.
  * @private
  */
const isOpen = ref(false)

/**
  * Reference to the root dropdown container DOM element.
  * @private
  */
const dropdownRef = ref(null)

/**
  * Computes the display label for the currently selected option.
  * @private
  */
const selectedLabel = computed(() => {
  const current = props.options.find(opt => opt.id === props.modelValue)
  return current ? current.label : ''
})

/**
  * Handles selection of an option and closes the dropdown.
  * @param {string|number} id The unique identifier of the selected option.
  * @private
  */
const selectOption = (id) => {
  emit('update:modelValue', id)
  isOpen.value = false
}

/**
  * Closes the dropdown if a click event occurs outside of the component.
  * @param {MouseEvent} e The native click event.
  * @private
  */
const closeDropdown = (e) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
    isOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', closeDropdown))
onUnmounted(() => document.removeEventListener('click', closeDropdown))
</script>

<style scoped>
.dropdown-container {
  width             : max-content;
  min-width         : 120px;
  max-width         : 100%;
  position          : relative;
  font-family       : var(--font-dropdown);
  font-size         : var(--font-dropdown-size);
  font-weight       : bold;
  box-sizing        : border-box;
}

.dropdown-trigger {
  width             : 100%;
  box-sizing        : border-box;
  font-weight       : bold;
  padding           : 0.6rem 1rem 0.6rem 2.4rem;
  border            : var(--color-dropdown-border);
  border-radius     : 6px;
  background-color  : var(--color-dropdown-trigger-bg);
  color             : var(--color-dropdown-trigger-text);
  cursor            : pointer;
  text-transform    : uppercase;
  transition        : all 0.15s ease-in-out;
  position          : relative;
  display           : flex;
  align-items       : center;
  white-space       : nowrap;
  overflow          : hidden;
  outline           : none;
}

.selected-label {
  overflow          : hidden;
  text-overflow     : ellipsis;
  white-space       : nowrap;
}

.arrow-wrapper {
  position            : absolute;
  left                : 12px;
  top                 : 50%;
  width               : 14px;
  height              : 16px;
  transform           : translateY(-50%);
  pointer-events      : none;
  z-index             : 2;
  transition          : transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.arrow-wrapper.open {
  transform           : translateY(-50%) rotate(90deg);
}

.arrow-icon {
  position            : absolute;
  left                : 0;
  top                 : 50%;
  width               : 14px;
  height              : 16px;
  background-color    : var(--color-dropdown-arrow);
  transform           : translateY(-50%);
  
  -webkit-mask-image  : url('@/assets/svg/triangle-right-12-filled.svg');
  mask-image          : url('@/assets/svg/triangle-right-12-filled.svg');
  -webkit-mask-size   : contain;
  mask-size           : contain;
  -webkit-mask-repeat : no-repeat;
  mask-repeat         : no-repeat;
  
  animation           : choppy-horizontal 0.6s steps(3, end) infinite alternate;
}

.dropdown-trigger:hover,
.dropdown-trigger:focus-visible {
  background-color  : var(--color-dropdown-trigger-hover-bg);
  color             : var(--color-dropdown-trigger-hover-text);
  transform         : translateY(-2px);
}

.dropdown-trigger:hover .arrow-icon,
.dropdown-trigger:focus-visible .arrow-icon {
  background-color  : var(--color-dropdown-arrow-hover);
}

.dropdown-options-list {
  position            : absolute;
  top                 : calc(100% + 6px);
  left                : 0;
  width               : max-content;
  min-width           : 100%;
  max-width           : 90vw;
  background-color    : var(--color-dropdown-list-bg);
  border              : var(--color-dropdown-list-border);
  border-radius       : 6px;
  z-index             : 99;
  overflow-y          : auto;
  max-height          : 250px;
  box-sizing          : border-box;
}

.dropdown-option {
  padding             : 0.6rem 1rem 0.6rem 2.4rem;
  color               : var(--color-dropdown-option-text);
  cursor              : pointer;
  text-transform      : uppercase;
  position            : relative;
  transition          : background-color 0.15s ease;
  white-space         : nowrap;
  outline             : none;
}

.dropdown-option:hover,
.dropdown-option:focus-visible {
  background-color    : var(--color-dropdown-option-hover-bg);
  color               : var(--color-dropdown-option-hover-text);
}

.dropdown-option:hover .option-arrow,
.dropdown-option:focus-visible .option-arrow {
  background-color    : var(--color-dropdown-arrow-hover);
}

.dropdown-option .option-arrow {
  display             : none;
}

.dropdown-option.active {
  background-color    : var(--color-dropdown-option-active-bg);
  color               : var(--color-dropdown-option-active-text);
}

.dropdown-option.active .option-arrow {
  display             : block;
  position            : absolute;
  left                : 12px;
  top                 : 50%;
  transform           : translateY(-50%);
  width               : 14px;
  height              : 16px;
  background-color    : var(--color-dropdown-active-arrow);
  
  -webkit-mask-image  : url('@/assets/svg/triangle-right-12-filled.svg');
  mask-image          : url('@/assets/svg/triangle-right-12-filled.svg');
  -webkit-mask-size   : contain;
  mask-size           : contain;
  -webkit-mask-repeat : no-repeat;
  mask-repeat         : no-repeat;
  
  animation           : choppy-horizontal 0.6s steps(3, end) infinite alternate;
}

@media (max-width: 480px) {
  .dropdown-container {
    width             : 100%;
  }
  
  .dropdown-options-list {
    width             : 100%;
    max-width         : 100%;
  }
}

@keyframes choppy-horizontal {
  0% {
    transform: translateY(-50%) translateX(0px);
  }
  100% {
    transform: translateY(-50%) translateX(3px);
  }
}
</style>