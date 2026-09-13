<template>
  <Transition name="fade-bounce" appear>
    <div v-if="modelValue" class="modal-backdrop" @click.self="closeModal">
      <div class="modal-panel">
        <div class="modal-header">
          <h3 class="modal-title">{{ title }}</h3>
          <div class="close-btn-wrapper">
            <CustomButton
              class          = "close-btn"
              text           = ""
              iconSize       = "20px"
              width          = "-36px"
              height         = "-36px"
              iconColor      = "var(--color-primary)"
              bgColor        = "var(--color-default-background)"
              hoverIconColor = "var(--color-default-background)"
              hoverBgColor   = "var(--color-primary)"
              pressAnimation = "scale"
              :iconSrc       = "closeIcon"
              @click         = "closeModal"
            />
          </div>
        </div>

        <div class="modal-body">
          <div v-for="option in options" :key="option.key" class="option-row">
            <span class="option-label">{{ option.label }}</span>
            <ToggleButtom
              :modelValue         ="sessionState[option.key]"
              @update:modelValue  ="(val) => toggleOption(option.key, val)"
              activeBgColor = "var(--color-secondary)"
              hoverBgColor = "var(--color-primary)"
            />
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
/**
  * @file        options_modal.vue
  * @brief       A modal dialog component that manages and persists toggleable options via sessionStorage with cross-tab sync support.
  * @displayName Options Modal
*/

import { reactive, computed, onMounted, onUnmounted } from 'vue'
import ToggleButtom from './toggle_button.vue'
import CustomButton from './custom_button.vue'

import closeIcon from '@/assets/svg/close-svgrepo-com.svg'

const props = defineProps({
  /**
    * Controls the visibility state of the modal externally via v-model.
    * @public
    */
  modelValue: {
    type    : Boolean,
    default : false
  },
  /**
    * Header title text displayed inside the modal window.
    * @public
    */
  title: {
    type    : String,
    default : 'Settings / Options'
  },
  /**
    * Array of option configuration objects containing keys and labels.
    * @public
    */
  options: {
    type    : Array,
    required: true,
  },
  /**
    * Width dimension configuration for the modal panel.
    * @public
    */
  width: {
    type    : [Number, String],
    default : 400
  },
  /**
    * Background color of the modal panel.
    * @public
    */
  bgColor: {
    type    : String,
    default : 'var(--color-custom-button-background)'
  },
  /**
    * Hover background color configuration (reserved for potential panel states).
    * @public
    */
  hoverBgColor: {
    type    : String,
    default : 'var(--color-custom-button-hover)'
  },
  /**
    * Active background color configuration (reserved for potential panel states).
    * @public
    */
  activeBgColor: {
    type    : String,
    default : 'var(--color-hover)'
  },
  /**
    * Text color applied inside the modal panel.
    * @public
    */
  textColor: {
    type    : String,
    default : 'var(--color-custom-button-text)'
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const sessionState = reactive({})

/**
  * Formats width value into pixel string if numeric.
  * @private
  */
const widthVal = computed(() => {
  const w = props.width
  return typeof w === 'number' ? `${w}px` : w
})

/**
  * Synchronizes reactive session state with current sessionStorage values.
  * @private
  */
const syncSessionState = () => {
  props.options.forEach(opt => {
    sessionState[opt.key] = sessionStorage.getItem(opt.key) === 'true'
  })
}

syncSessionState()

/** 
  * Updates option state, persists to sessionStorage, dispatches update events, and emits changes.
  * @private
*/
const toggleOption = (key, nextValue) => {
  sessionState[key] = nextValue
  sessionStorage.setItem(key, nextValue ? 'true' : 'false')

  window.dispatchEvent(new Event('session-storage-updated'))

  emit('change', { key, value: nextValue, allState: sessionState })
}

/**
  * Closes the modal by updating v-model state.
  * @private
  */
const closeModal = () => {
  emit('update:modelValue', false)
}

onMounted(() => {
  window.addEventListener('session-storage-updated', syncSessionState)
  window.addEventListener('storage', syncSessionState)
})

onUnmounted(() => {
  window.removeEventListener('session-storage-updated', syncSessionState)
  window.removeEventListener('storage', syncSessionState)
})
</script>

<style scoped>
.modal-backdrop {
  position                    : fixed;
  top                         : 0;
  left                        : 0;
  width                       : 100vw;
  height                      : 100vh;
  background                  : rgba(0, 0, 0, 0.5);
  display                     : flex;
  align-items                 : center;
  justify-content             : center;
  z-index                     : 99999;
  padding                     : 1rem;
  box-sizing                  : border-box;
}

.modal-panel {
  border                      : var(--default-border);
  border-radius               : var(--default-border-radius);
  display                     : flex;
  flex-direction              : column;
  box-sizing                  : border-box;
  overflow                    : hidden;
  max-height                  : calc(100vh - 2rem);

  width                       : v-bind(widthVal);
  max-width                   : calc(100vw - 2rem);
  background-color            : v-bind('props.bgColor');
  color                       : v-bind('props.textColor');
}

.modal-header {
  display                     : flex;
  align-items                 : center;
  justify-content             : space-between;
  padding                     : 1rem 1.5rem;
  border-bottom               : var(--default-border);
  flex-shrink                 : 0;
}

.modal-title {
  font-family                 : var(--font-button);
  margin                      : 0;
  font-size                   : 1.25rem;
  word-break                  : break-word;
}

.modal-body {
  padding                     : 1.5rem;
  display                     : flex;
  flex-direction              : column;
  gap                         : 1rem;
  overflow-y                  : auto;
  -webkit-overflow-scrolling  : touch;
 
}

.modal-header {
  position                    : relative; 
  display                     : flex;
  align-items                 : center;
  justify-content             : space-between;
  padding                     : 1rem 1.5rem;
  border-bottom               : 3px solid #000000;
  flex-shrink                 : 0;
}

.close-btn-wrapper {
  display                     : flex;
  align-items                 : center;
  justify-content             : center;
}

.option-row {
  display                     : flex;
  align-items                 : center;
  justify-content             : space-between;
  gap                         : 1rem;
}

.option-label {
  font-family                 : var(--font-button);
  font-size                   : var(--font-button-size);
  word-break                  : break-word;
}

.fade-bounce-enter-active {
  transition                  : opacity 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
                                transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.fade-bounce-leave-active {
  transition                  : opacity 0.2s ease, transform 0.2s ease;
}

.fade-bounce-enter-from,
.fade-bounce-leave-to {
  opacity                     : 0;
  transform                   : scale(0.9);
}

@media (max-width: 480px) {
  .modal-backdrop {
    padding                   : 0.5rem;
  }
  
  .modal-body {
    padding                   : 1rem;
  }

  .modal-header {
    padding                   : 0.75rem 1rem;
  }

  .option-row {
    gap                       : 0.5rem;
  }
}
</style>