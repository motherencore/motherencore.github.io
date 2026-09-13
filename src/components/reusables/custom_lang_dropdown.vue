<template>
  <div class="lang-selector-container" ref="dropdownRef">
    <CustomButton
      class          = "lang-button"
      :text          = "currentLang.toUpperCase()"
      textMargin     = "5px 0px 0px 0px"
      iconSize       = "25px"
      width          = "auto"
      height         = "auto"
      bgColor        = "var(--color-lang-dropdown-trigger-bg)"
      hoverBgColor   = "var(--color-lang-dropdown-trigger-hover-bg)"
      pressAnimation = "push"
      iconColor      = "var(--color-lang-dropdown-arrow )"
      textColor      = "var(--color-lang-dropdown-trigger-text)"
      :iconSrc       = "img_triangle_down"
      border         = "var(--color-lang-dropdown-border)"
      iconPosition   = "right"
      @click         = "toggleDropdown"

    />

    <div v-if="isOpen" class="dropdown-options-list">
      <div 
        v-for="(label, code) in availableLanguages" 
        :key="code" 
        @click="selectLanguage(code)"
        class="dropdown-option"
        :class="{ active: currentLang === code }"
      >
        <span class="option-arrow"></span>
        {{ label }}
      </div>
    </div>
  </div>
</template>

<script setup>
/**
  * @file        custom_lang_dropdown.vue
  * @brief       A language selector dropdown component utilizing i18n composables, toggling language options, and handling click-outside dismissals.
  * @displayName Custom Language Dropdown
*/

import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from '@/composables/useI18n'
import CustomButton from '@/components/reusables/custom_button.vue'
import img_triangle_down from '@/assets/svg/triangle-down-filled.svg'

const { currentLang, setLanguage, availableLanguages } = useI18n()

/**
  * Tracks whether the language options menu is open.
  * @private
  */
const isOpen = ref(false)

/**
  * Reference to the root container DOM element for click-outside tracking.
  * @private
  */
const dropdownRef = ref(null)

/**
  * Toggles the visibility state of the language dropdown menu.
  * @private
  */
const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

/**
  * Selects a new language code and closes the dropdown.
  * @param {string} code The language code to switch to.
  * @private
  */
const selectLanguage = (code) => {
  setLanguage(code)
  isOpen.value = false
}

/**
  * Closes the dropdown menu if a click occurs outside the language selector container.
  * @param {MouseEvent} event The native click event.
  * @private
  */
const closeOnClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', closeOnClickOutside))
onUnmounted(() => document.removeEventListener('click', closeOnClickOutside))
</script>

<style scoped>
.lang-selector-container {
  font-family       : var(--font-navbar);
  font-size         : var(--font-navbar-size);
  color             : var(--color-default-text-color);
  display           : inline-flex;
  position          : relative;
  margin-bottom     : 10px;
}

.lang-button {
  color             : inherit;
  overflow          : hidden;
  padding           : 4px 8px;
  border-radius     : var(--default-border-radius);
  cursor            : pointer;
  font-family       : var(--font-navbar);
  font-size         : var(--font-navbar-size);
  display           : inline-flex;
  align-items       : center;
  gap               : 6px;
  text-transform    : uppercase;
  white-space       : nowrap;
}

.dropdown-options-list {
  position            : absolute;
  top                 : calc(100% + 6px);
  right               : 0;
  width               : max-content;
  min-width           : 100%;
  background-color    : var(--color-lang-dropdown-option-text);
  border              : var(--color-lang-dropdown-list-border);
  border-radius       : var(--default-border-radius);
  box-sizing          : border-box;
  overflow            : hidden;
}

.dropdown-option {
  background-color:    var(--color-lang-dropdown-list-bg);
  padding             : 0.6rem 1rem 0.6rem 2.4rem;
  color               : var(--color-lang-dropdown-option-text);
  cursor              : pointer;
  text-transform      : uppercase;
  position            : relative;
  transition          : background-color 0.15s ease;
  white-space         : nowrap;
  font-family         : var(--font-navbar);
  font-size           : var(--font-navbar-size);
}

.dropdown-option:hover {
  background-color    : var(--color-lang-dropdown-option-hover-bg);
  color               : var(--color-lang-dropdown-option-hover-text);
}

.dropdown-option .option-arrow {
  display             : none;
}

.dropdown-option:hover .option-arrow,
.dropdown-option.active .option-arrow {
  display             : block;
  position            : absolute;
  left                : 12px;
  top                 : 50%;
  transform           : translateY(-50%);
  width               : 14px;
  height              : 16px;
  
  -webkit-mask-image  : url('@/assets/svg/triangle-right-12-filled.svg');
  mask-image          : url('@/assets/svg/triangle-right-12-filled.svg');
  -webkit-mask-size   : contain;
  mask-size           : contain;
  -webkit-mask-repeat : no-repeat;
  mask-repeat         : no-repeat;
  
  animation           : choppy-horizontal 0.6s steps(3, end) infinite alternate;
}

.dropdown-option:hover .option-arrow {
  background-color    : var(--color-dropdown-arrow-hover);
}

.dropdown-option.active {
  background-color    : var(--color-lang-dropdown-option-active-bg);
  color               : var(--color-lang-dropdown-option-active-text);
}

.dropdown-option.active .option-arrow {
  background-color    : var(--color-lang-dropdown-active-arrow);
}

@keyframes choppy-horizontal {
  0% {
    transform: translateY(-50%) translateX(0px);
  }
  100% {
    transform: translateY(-50%) translateX(3px);
  }
}

@media (max-width: 900px) {
  .lang-selector-container {
    width           : 100%;
    justify-content : flex-end;
  }
  
  .dropdown-options-list {
    top             : 100%;
    right           : 0;
  }
}
</style>