<template>
  <header class="header-container">
    <div class="header-inner">
      
      <router-link to="/" class="logo-container" @contextmenu="handleContextMenu">
        <img 
          :src="img_gameLogo" 
          alt="Logo placeholder" 
          class="logo"
          :draggable="allowDrag"
          @contextmenu="handleContextMenu"
        />
      </router-link>
      
      <NavigationComponent :activePage="activePage" />
      
    </div>
  </header>
</template>

<script setup>
/**
  * @file        app_header.vue
  * @brief       Application header component containing the logo and navigation component.
  *              Supports configurable logo dragging, text selection, and context menu options.
  * @displayName App Header
*/

import { computed } from 'vue'
import img_gameLogo from '@/assets/img/logos/Encore_Logo.png'
import NavigationComponent from './navigation_component.vue'

const props = defineProps({
  /** 
    * The currently active navigation page name.
    * @public
  */
  activePage: {
    type    : String,
    default : 'Home'
  },
  /**
    * Toggles image drag functionality on the header logo.
    * @public
  */
  allowDrag: {
    type    : Boolean,
    default : true
  },
  /**
    * Controls whether the right-click context menu ("Save image as...") is allowed on the logo.
    * @public
  */
  allowSaveAs: {
    type    : Boolean,
    default : false
  },
  /**
    * Disables text and element selection on the header logo.
    * @public
  */
  disableSelect: {
    type    : Boolean,
    default : true
  }
})

/**
  * Computed CSS user-select property value based on selection protection configuration.
  * @private
*/
const userSelectValue = computed(() => (props.disableSelect ? 'none' : 'auto'))

/**
  * Handles right-click events according to the `allowSaveAs` property configuration.
  * Stops propagation to guarantee element trees do not trigger native context menu.
  * @param {MouseEvent} event - Context menu event instance.
  * @private
*/
const handleContextMenu = (event) => {
  if (!props.allowSaveAs) {
    event.preventDefault()
    event.stopPropagation()
  }
}
</script>

<style scoped>
.header-container {
  width             : 100%;
  height            : 92px;
  display           : flex;
  justify-content   : flex-start;
  align-items       : center;
  flex-direction    : column;
}

.header-inner {
  width             : 100%;
  height            : 100%;
  display           : flex;
  justify-content   : space-between;
  align-items       : center;
  flex-direction    : row;
  padding-right     : 5vw;
  padding-left      : 5vw;
  background        : var(--color-primary);
  box-sizing        : border-box;
  position          : relative;
  z-index           : 20;
}

.logo-container {
  display           : flex;
  justify-content   : flex-start;
  align-items       : center;
  flex-direction    : row;
  gap               : 10px;
  -webkit-user-select : v-bind(userSelectValue);
  -moz-user-select    : v-bind(userSelectValue);
  -ms-user-select     : v-bind(userSelectValue);
  user-select         : v-bind(userSelectValue);
}

.logo {
  display             : block;
  max-height          : 50px;
  -webkit-user-select : v-bind(userSelectValue);
  -moz-user-select    : v-bind(userSelectValue);
  -ms-user-select     : v-bind(userSelectValue);
  user-select         : v-bind(userSelectValue);
}
</style>