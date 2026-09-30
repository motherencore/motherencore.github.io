<template>
  <footer class="footer-outer">
    <div class="footer-container">
      <div class="footer-content">
        
        <div class="footer-top-row">
          <router-link to="/" class="logo-container" @contextmenu="handleContextMenu">
            <img 
              :src="img_gameLogo" 
              alt="Logo placeholder" 
              class="logo" 
              :draggable="allowDrag"
              @contextmenu="handleContextMenu"
            />
          </router-link>

          <NavigationComponent :showLanguageDropdown="false" />

          <div class="footer-socials">
            <SocialMediaButton 
              platform   ="twitter" 
              color      ="#ffffff" 
              hoverColor ="#1da1f2"
              :size       = 35
            />
            <SocialMediaButton 
              platform   ="discord" 
              color      ="#ffffff" 
              hoverColor ="#5865f2" 
              :size       = 35
            />
            <SocialMediaButton 
              platform   ="bluesky" 
              color      ="#ffffff" 
              hoverColor ="#0085ff" 
              :size       = 35
            />
            <SocialMediaButton 
              platform   ="github" 
              color      ="#ffffff" 
              hoverColor ="#000000" 
              :size       = 35
            />
            <SocialMediaButton 
              platform   ="itchio" 
              color      ="#ffffff" 
              hoverColor ="var(--color-secondary)" 
              :size       = 35
            />
          </div>
        </div>

      </div>

      <div class="footer-bottom-section">
        <div class="footer-divider"></div>
        <p class="footer-disclaimer">
          {{ t('SITE_FOOTER_DISCLAIMER_1') }}
        </p>
        <p class="footer-disclaimer" v-html="t('SITE_FOOTER_DISCLAIMER_2')">
        </p>
        <p class="footer-framework">
          {{ t('SITE_FOOTER_FRAMEWORK') }}
          <a href="https://vuejs.org" target="_blank" rel="noopener noreferrer">Vue</a>
        </p>
      </div>

    </div>
  </footer>
</template>

<script setup>
/**
  * @file         app_footer.vue
  * @brief        Application footer component featuring a brand logo, navigation links, 
  *               social media buttons, disclaimer texts, and configurable logo protection settings.
  * @displayName  AppFooter
*/

import { computed } from 'vue'
import { useI18n } from '@/composables/useI18n'

import img_gameLogo from '@/assets/img/logos/Encore_Logo.png'

import NavigationComponent  from '@/components/reusables/navigation_component.vue'
import SocialMediaButton    from '@/components/reusables/social_media_button.vue'

const props = defineProps({
  /**
    * Toggles image drag functionality on the footer logo.
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
    * Disables text and element selection on the footer logo.
    * @public
  */
  disableSelect: {
    type    : Boolean,
    default : true
  }
})

/**
  * Internationalization translation function instance.
  * @private
*/
const { t } = useI18n()

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
.logo-container {
  display             : flex;
  justify-content     : flex-start;
  align-items         : center;
  flex-direction      : row;
  gap                 : 10px;
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

.footer-outer {
  width             : 100%;
  max-width         : 1440px;
  display           : flex;
  justify-content   : flex-end;
  align-items       : center;
  flex-direction    : column;
  gap               : 10px;
  padding           : 0 100px;
  box-sizing        : border-box;
}

.footer-container {
  width                   : 100%;
  display                 : flex;
  justify-content         : flex-start;
  align-items             : flex-start;
  flex-direction          : column;
  gap                     : 50px;
  padding                 : 55px 60px 50px 60px;
  background              : var(--color-footer-bg);
  border-top-left-radius  : 45px;
  border-top-right-radius : 45px;
  box-sizing              : border-box;
  overflow                : hidden;
}

.footer-content {
  width             : 100%;
  display           : flex;
  justify-content   : flex-start;
  align-items       : flex-start;
  flex-direction    : column;
  gap               : 66px;
}

.footer-top-row {
  width             : 100%;
  display           : flex;
  justify-content   : center;
  align-items       : center;
  flex-direction    : row;
  gap               : 42px;
  flex-wrap         : wrap;
}

.footer-socials {
  display           : flex;
  justify-content   : flex-start;
  align-items       : center;
  flex-direction    : row;
  gap               : 20px;
  flex-wrap         : wrap;
}

.footer-bottom-section {
  width             : 100%;
  display           : flex;
  justify-content   : flex-start;
  align-items       : center;
  flex-direction    : column;
  gap               : 10px;
}

.footer-divider {
  width             : 100%;
  height            : 0px;
  border-bottom     : 1px solid var(--color-footer-divider);
}

.footer-disclaimer {
  width             : 100%;
  color             : var(--color-footer-text);
  font-size         : var(--font-p-size);
  font-family       : var(--font-p);
  line-height       : 28px;
  margin            : 0;
  opacity           : 0.9;
  text-align        : center;
}

.footer-outer :deep(.hamburger-btn) {
  display: none !important;
}

.footer-disclaimer :deep(a) {
  color                 : var(--color-footer-hyperlink);              
  text-decoration       : underline;     
  text-underline-offset : 3px;    
  font-weight           : 600;
  transition            : opacity 0.2s ease;
}

.footer-framework {
  width             : 100%;
  color             : var(--color-footer-text);
  font-family       : var(--font-p);
  font-size         : var(--font-p-size);
  justify-content   : stretch;
  text-align        : center;
}

.footer-framework a {
  color             : var(--color-footer-vue-link); 
  text-decoration   : none;
  transition        : color 0.3s ease;
}

.footer-framework a:hover {
  color             : var(--color-footer-link-hover);
}

@media (max-width: 1024px) {
  .footer-outer {
    padding: 0 20px;
  }

  .footer-container {
    padding: 40px 30px;
    align-items: center;
  }

  .footer-content {
    align-items: center;
  }

  .footer-top-row {
    flex-direction: column;
    align-items   : center;
    justify-content: center;
    gap           : 30px;
  }

  .footer-socials {
    justify-content: center;
  }
}

@media (max-width: 600px) {
  .footer-outer {
    padding: 0 10px;
  }

  .footer-container {
    padding: 30px 15px;
    gap: 30px;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
  }

  .footer-top-row {
    gap: 24px;
  }

  .logo-container {
    justify-content: center;
  }

  .footer-socials {
    justify-content: center;
    gap: 15px;
  }

  .footer-disclaimer,
  .footer-framework {
    text-align: center;
    font-size: calc(var(--font-p-size) * 0.9);
  }
}
</style>