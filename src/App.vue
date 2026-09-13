<template>
  <div v-if="!isLoaded" class="loading-screen">
    <p>Loading...</p>
  </div>

  <div v-else class="app-container">
    <AppHeader />

    <div class="animation-toggle-bar">
      <span class="toggle-label">{{t('SITE_REDUCED_MOTION')}}</span>
      <ToggleButton 
        :modelValue="!animationsEnabled" 
        @change="handleAnimationToggle"
        :width  = "40"
        :height = "20"
        activeBgColor = "var(--color-secondary)"
        hoverBgColor = "var(--color-primary)"
      />
    </div>

    <div class="content-wrapper">
      <router-view v-slot="{ Component }">
        <Transition :name="animationsEnabled ? 'page-fade' : ''" mode="out-in">
          <component :is="Component" />
        </Transition>
      </router-view>
    </div>

    <BackToTop 
      footerBehavior="stay" 
    />

    <MusicPlayer 
      v-if="!route.meta.hideMusicPlayer"
      playlistId        ="PLhtMNOPRVvaALJNwIWPeR3fMunIpoxt63" 
      footerBehavior    ="stay" 
      volumeLayout      ="bar"
      minimizedBehavior = "compact"
    />

    <div ref="footerRef" class="footer-container">
      <AppFooter />
    </div>
  </div>
</template>
<script setup>
  /**
    * @file        App.vue
    * @brief       Main application root component
  */
  import { onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { useI18n } from '@/composables/useI18n'
  import { useAnimations } from '@/composables/reduced_motion_check'

  import AppHeader      from '@/components/reusables/app_header.vue'
  import AppFooter      from '@/components/reusables/app_footer.vue'
  import BackToTop      from '@/components/reusables/back_to_top_button.vue'
  import MusicPlayer    from '@/components/reusables/music_player.vue'
  import ToggleButton   from '@/components/reusables/toggle_button.vue'
  
  const route = useRoute()
  const { loadTranslations, isLoaded } = useI18n()
  const { animationsEnabled, setAnimationsEnabled } = useAnimations()

  onMounted(() => {
    loadTranslations()
    if (!animationsEnabled.value && typeof document !== 'undefined') {
      document.body.classList.add('reduce-motion')
    }
  })

  const handleAnimationToggle = (value) => {
    setAnimationsEnabled(!value)
  }

  const { t } = useI18n()

</script>

<style>
body.reduce-motion *,
body.reduce-motion *::before,
body.reduce-motion *::after {
  animation-duration: 0.001ms !important;
  animation-iteration-count: 1 !important;
  transition-duration: 0.001ms !important;
}

@font-face {
  font-family: "Motherish";
  src: url('/src/assets/fonts/Motherish/Motherish-Regular.otf');
}
:root {
  --color-primary             : #E50012;
  --color-secondary           : #fdd268;
  --color-tertiary            : #b425e1;
  --color-black               : #000000;
  --color-white               : #FFFFFF;
  --color-place-holder-green  : #25D366;
  --color-default-text-color  : var(--color-white);

  --color-h1                  : var(--color-primary);
  --color-h2                  : var(--color-primary);
  --color-hyperlinks          : var(--color-secondary);

  --default-border            : 3px solid #000000;
  --default-border-radius     : 10px;
  --color-default-background  : var(--color-white);

  --font-default              : 'Motherish', sans-serif;

  --font-navbar               : var(--font-default);
  --font-h1                   : var(--font-default);
  --font-h2                   : var(--font-default);
  --font-h3                   : var(--font-default);
  --font-h4                   : var(--font-default);
  --font-body                 : var(--font-default);
  --font-button               : var(--font-default);
  --font-p                    : var(--font-default);
  --font-dropdown             : var(--font-default);
  --font-credits-title        : var(--font-default);
  --font-credits-role         : var(--font-default);
  --font-credits-name         : var(--font-default);

  --font-navbar-size          : 25px;
  --font-h1-size              : 60px;
  --font-h2-size              : 32px;
  --font-h3-size              : 28px;
  --font-h4-size              : 24px;
  --font-p-size               : 20px;
  --font-body-size            : 16px;

  --font-dropdown-size        : 20px;
  --font-reduce-motion-size   : 15px;

  --font-credits-title-size   : 24px;
  --font-credits-role-size    : 20px;
  --font-credits-name-size    : 16px;

  --font-mobile-navbar        : var(--font-default);
  --font-mobile-h1            : var(--font-default);
  --font-mobile-h2            : var(--font-default);
  --font-mobile-h3            : var(--font-default);
  --font-mobile-h4            : var(--font-default);
  --font-mobile-body          : var(--font-default);
  --font-mobile-button        : var(--font-default);
  --font-mobile-p             : var(--font-default);
  
  --font-mobile-navbar-size   : 60px;
  --font-mobile-h1-size       : 60px;
  --font-mobile-h2-size       : 25px;
  --font-mobile-h3-size       : 20px;
  --font-mobile-h4-size       : 18px;
  --font-mobile-body-size     : 16px;
  --font-mobile-button-size   : 16px;
  --font-mobile-p-size        : 16px;

  --color-footer-bg                   : var(--color-primary);
  --color-footer-text                 : var(--color-default-text-color);
  --color-footer-divider              : var(--color-default-background);
  --color-footer-link                 : var(--color-default-text-color);
  --color-footer-link-hover           : var(--color-hover);
  --color-footer-hyperlink            : var(--color-hyperlinks);
  --color-footer-vue-link             : #42b883;

  --color-custom-button-background    : var(--color-default-background);
  --color-custom-button-hover         : var(--color-primary);
  
  --color-custom-button-text          : var(--color-black);
  --color-custom-button-text-hover    : var(--color-default-text-color);

  --color-custom-icon                 : var(--color-black);
  --color-custom-icon-hover           : var(--color-custom-button-background);

  --custom-button-border              : var(--default-border);
  --custom-button-border-radius       : var(--default-border-radius);

  --custom-button-font                : var(--font-default);
  --custom-button-font-size           : 16px;

  --color-itchio-button-icon             : var(--color-black);
  --color-itchio-button-bg               : var(--color-default-background);
  
  --color-itchio-button-icon-hover       : var(--color-white);
  --color-itchio-button-bg-hover         : var(--color-primary);

  --back-to-top-button-bg-color              : var(--color-default-background);
  --back-to-top-button-icon-color            : var(--color-primary);
  --back-to-top-button-bg-color-hover        : var(--color-primary);
  --back-to-top-button-icon-color-hover      : var(--color-default-background);
  --back-to-top-button-border                : var(--default-border);
  --back-to-top-button-border-radius         : var(--default-border-radius);
  --back-to-top-button-size                  : 56px;
  --back-to-top-button-icon-size             : 95%;

  --character-card-title-color      : var(--color-default-text-color);
  --character-card-title-font       : var(--font-h3, var(--font-h1));
  --character-card-title-size       : 60px;
  --character-card-title-size-mobile: var(--font-mobile-h3-size);
  --character-card-title-weight     : 600;

  --character-card-body-color       : var(--color-default-text-color);
  --character-card-body-font        : var(--font-p, var(--font-body-family));
  --character-card-body-size        : 24px;
  --character-card-body-weight      : 500;
  --character-card-body-line-height : 1.5;

  --character-card-separator-color  : var(--color-default-background);
  --character-card-separator-height : 4px;
  
  --gallery-title-color         : var(--color-h2);
  --gallery-title-size          : var(--font-h2-size);
  --gallery-title-font          : var(--font-h2);

  --gallery-viewport-bg         : var(--color-black);
  --gallery-border              : var(--default-border);
  --gallery-timer-bg            : rgba(112, 3, 3, 0.144);
  --gallery-accent-color        : var(--color-primary);
  --gallery-dot-bg              : var(--color-default-background);
  --gallery-dot-border          : none;
  --gallery-thumb-bg            : var(--color-default-background);
  --gallery-thumb-tint-bg       : rgba(255, 71, 87, 0.3);

  --gallery-button-icon         : var(--color-primary);
  --gallery-button-bg           : var(--color-default-background);
  --gallery-button-icon-hover   : var(--color-default-background);
  --gallery-button-bg-hover     : var(--color-primary);
  
  --gallery-button-icon-size    : 95%;
  --gallery-button-size         : 50px;

  --music-player-color-bg-main                 : #272526;
  --music-player-color-bg-secondary            : var(--color-default-background);
  --music-player-color-bg-dark                 : #000000;
  --music-player-color-surface                 : #361c21;

  --music-player-border                        : var(--default-border);
  --music-player-border-radius                 : var(--default-border-radius);
    
  --music-player-color-accent                  : #ef4444;
  --music-player-color-accent-light            : #fca5a5;
  
  --music-player-color-primary                 : var(--color-primary);
  
  --music-player-color-playbt-playing          : var(--color-primary);
  
  --music-player-color-playbt-paused           : #ef4444;
  
  --music-player-color-placeholder-green       : var(--color-placeholder-green);

  --music_player-compact-button-color-bg        : var(--color-default-background);
  --music_player-compact-button-color-bg-hover  : var(--color-primary);
  --music_player-compact-button-color-icon      : var(--music_player-compact-button-color-bg-hover);
  --music_player-compact-button-color-icon-hover: var(--music_player-compact-button-color-bg);
  --music_player-compact-button-size            : 56px;
  --music_player-compact-button-icon-size       : 95%;

  --music_player-font-h1                       : var(--font-h1);
  --music_player-font-p                        : var(--font-p);
  --music_player-font-p-size                   : var(--font-p-size);
  --music_player-font-track-names-size         : 15px;

  --music-player-volume-controls-bg         : #1a1a1a;
  --music-player-volume-controls-border     : var(--default-border);
  --music-player-volume-controls-slider     : var(--music-player-color-accent);
  --music-player-volume-controls-text       : var(--color-default-text-color);
  --music-player-volume-controls-container  : var(--music-player-color-surface);
  --music-player-volume-controls-track      : var(--color-black);
  --music-player-volume-controls-highlight  : var(--color-white);

  --music-player-volume-controls-mute-bg                      : var(--music-player-volume-controls-bg);
  --music-player-volume-controls-mute-hover-bg                : var(--color-primary);
  --music-player-volume-controls-mute-icon-color              : var(--color-white);
  --music-player-volume-controls-mute-hover-icon-color        : var(--music-player-volume-controls-mute-bg);

  --music-player-volume-controls-mute-active-bg               : var(--music-player-color-accent);
  --music-player-volume-controls-mute-active-hover-bg         : var(--color-secondary);
  --music-player-volume-controls-mute-active-icon-color       : var(--color-white);
  --music-player-volume-controls-mute-active-hover-icon-color : var(--color-black);

  --music-player-playlist-bg                        : var(--music-player-color-primary);
  --music-player-playlist-border                    : var(--music-player-border);
  --music-player-playlist-border-radius             : var(--music-player-border-radius);
  --music-player-playlist-header-bg                 : var(--music-player-color-bg-main);
  --music-player-playlist-header-text               : var(--music-player-color-bg-secondary);
  --music-player-playlist-item-bg                   : var(--music-player-color-bg-secondary);
  --music-player-playlist-item-active-bg            : var(--music-player-color-accent);
  --music-player-playlist-item-active-text          : var(--color-default-text-color);
  --music-player-playlist-text-color                : var(--color-black);
  --music-player-playlist-number-color              : var(--music-player-color-primary);
  --music-player-playlist-number-active-color       : var(--music-player-color-accent-light);
  --music-player-playlist-loading-bg                : var(--music-player-color-bg-secondary);
  --music-player-playlist-loading-text              : var(--music-player-color-bg-main);
  --music-player-playlist-page-info-color           : var(--music-player-color-accent-light);

  --music-player-playlist-button-bg                 : var(--music-player-color-bg-secondary);
  --music-player-playlist-button-hover-bg           : var(--music-player-color-accent);
  --music-player-playlist-button-icon-color         : var(--music-player-color-bg-dark);
  --music-player-playlist-button-hover-icon-color   : var(--color-default-text-color);

  --music-player-walkman-button-bg                      : var(--color-primary);
  --music-player-walkman-button-hover-bg                : var(--color-tertiary);
  --music-player-walkman-button-icon-color              : var(--color-white);
  --music-player-walkman-button-hover-icon-color        : var(--music-player-volume-controls-mute-bg);

  --music-player-walkman-button-active-bg               : var(--color-tertiary);
  --music-player-walkman-button-active-hover-bg         : var(--color-primary);
  --music-player-walkman-button-active-icon-color       : var(--color-white);
  --music-player-walkman-button-active-hover-icon-color : var(--color-black);
  
  --music-player-walkman-bg-color                       : var(--music-player-color-primary);
  --music-player-walkman-border                         : var(--music-player-border);
  --music-player-walkman-border-radius                  : var(--music-player-border-radius);
  --music-player-walkman-chassis-bg                     : var(--music-player-color-bg-main);
  --music-player-walkman-brand-color                    : var(--music-player-color-accent-light);
  --music-player-walkman-door-bg                        : var(--music-player-color-surface);
  --music-player-walkman-shell-bg                       : var(--music-player-color-bg-secondary);
  --music-player-walkman-label-color                    : var(--music-player-color-placeholder-green);
  --music-player-walkman-window-bg                      : var(--music-player-color-bg-dark);
  --music-player-walkman-reel-color                     : var(--music-player-color-accent-light);
  --music-player-walkman-reel-hub-bg                    : var(--music-player-color-bg-main);
  --music-player-walkman-lcd-bg                         : var(--music-player-color-bg-dark);
  --music-player-walkman-lcd-color                      : var(--music-player-color-accent);


  --special-music-player-color-bg-main                 : #331a4b;
  --special-music-player-color-bg-secondary            : #ffffff;
  --special-music-player-color-bg-dark                 : #0d0614;
  --special-music-player-color-surface                 : #792664;

  --special-music-player-border                        : var(--default-border);
  --special-music-player-border-radius                 : var(--default-border-radius);
    
  --special-music-player-color-accent                  : #e26cd7;
  --special-music-player-color-accent-light            : #f0abfc;
  
  --special-music-player-color-primary                 : #7e22ce;
  
  --special-music-player-color-playbt-playing          : #9333ea;
  --special-music-player-color-playbt-paused           : #d946ef;
  
  --special-music-player-color-placeholder-green       : var(--color-placeholder-green);

  --special-music_player-compact-button-color-bg        : #2c163b;
  --special-music_player-compact-button-color-bg-hover  : #9333ea;
  --special-music_player-compact-button-color-icon      : var(--special-music_player-compact-button-color-bg-hover);
  --special-music_player-compact-button-color-icon-hover: var(--special-music_player-compact-button-color-bg);
  --special-music_player-compact-button-size            : 56px;
  --special-music_player-compact-button-icon-size       : 95%;

  --special-music_player-font-h1                       : var(--font-h1);
  --special-music_player-font-p                        : var(--font-p);
  --special-music_player-font-p-size                   : var(--font-p-size);
  --special-music_player-font-track-names-size         : 15px;

  --special-music-player-volume-controls-bg         : #140a1f;
  --special-music-player-volume-controls-border     : var(--default-border);
  --special-music-player-volume-controls-slider     : var(--special-music-player-color-accent);
  --special-music-player-volume-controls-text       : var(--color-default-text-color);
  --special-music-player-volume-controls-container  : var(--special-music-player-color-surface);
  --special-music-player-volume-controls-track      : #0d0614;
  --special-music-player-volume-controls-highlight  : var(--color-white);

  --special-music-player-volume-controls-mute-bg                      : var(--special-music-player-volume-controls-bg);
  --special-music-player-volume-controls-mute-hover-bg                : #9333ea;
  --special-music-player-volume-controls-mute-icon-color              : var(--color-white);
  --special-music-player-volume-controls-mute-hover-icon-color        : var(--special-music-player-volume-controls-mute-bg);

  --special-music-player-volume-controls-mute-active-bg               : var(--special-music-player-color-accent);
  --special-music-player-volume-controls-mute-active-hover-bg         : #f0abfc;
  --special-music-player-volume-controls-mute-active-icon-color       : var(--color-white);
  --special-music-player-volume-controls-mute-active-hover-icon-color : #0d0614;

  --special-music-player-playlist-bg                        : var(--special-music-player-color-primary);
  --special-music-player-playlist-border                    : var(--special-music-player-border);
  --special-music-player-playlist-border-radius             : var(--special-music-player-border-radius);
  --special-music-player-playlist-header-bg                 : var(--special-music-player-color-bg-main);
  --special-music-player-playlist-header-text               : var(--special-music-player-color-bg-secondary);
  --special-music-player-playlist-item-bg                   : var(--special-music-player-color-bg-secondary);
  --special-music-player-playlist-item-active-bg            : var(--special-music-player-color-accent);
  --special-music-player-playlist-item-active-text          : var(--color-default-text-color);
  --special-music-player-playlist-text-color                : var(--special-music-player-color-bg-main);
  --special-music-player-playlist-number-color              : var(--special-music-player-color-accent-light);
  --special-music-player-playlist-number-active-color       : var(--color-white);
  --special-music-player-playlist-loading-bg                : var(--special-music-player-color-bg-secondary);
  --special-music-player-playlist-loading-text              : var(--special-music-player-color-bg-main);
  --special-music-player-playlist-page-info-color           : var(--special-music-player-color-accent-light);

  --special-music-player-playlist-button-bg                 : var(--special-music-player-color-bg-secondary);
  --special-music-player-playlist-button-hover-bg           : var(--special-music-player-color-accent);
  --special-music-player-playlist-button-icon-color         : var(--color-white);
  --special-music-player-playlist-button-hover-icon-color   : var(--color-default-text-color);

  --special-music-player-walkman-button-bg                      : #7e22ce;
  --special-music-player-walkman-button-hover-bg                : #a855f7;
  --special-music-player-walkman-button-icon-color              : var(--color-white);
  --special-music-player-walkman-button-hover-icon-color        : #140a1f;

  --special-music-player-walkman-button-active-bg               : #a855f7;
  --special-music-player-walkman-button-active-hover-bg         : #7e22ce;
  --special-music-player-walkman-button-active-icon-color       : var(--color-white);
  --special-music-player-walkman-button-active-hover-icon-color : #0d0614;

  --special-music-player-walkman-bg-color               : var(--special-music-player-color-primary);
  --special-music-player-walkman-border                 : var(--special-music-player-border);
  --special-music-player-walkman-border-radius          : var(--special-music-player-border-radius);
  --special-music-player-walkman-chassis-bg             : var(--special-music-player-color-bg-main);
  --special-music-player-walkman-brand-color            : var(--special-music-player-color-accent-light);
  --special-music-player-walkman-door-bg                : var(--special-music-player-color-surface);
  --special-music-player-walkman-shell-bg               : var(--special-music-player-color-bg-secondary);
  --special-music-player-walkman-label-color            : var(--special-music-player-color-placeholder-green);
  --special-music-player-walkman-window-bg              : var(--special-music-player-color-bg-dark);
  --special-music-player-walkman-reel-color             : var(--special-music-player-color-accent-light);
  --special-music-player-walkman-reel-hub-bg            : var(--special-music-player-color-bg-main);
  --special-music-player-walkman-lcd-bg                 : var(--special-music-player-color-bg-dark);
  --special-music-player-walkman-lcd-color              : var(--special-music-player-color-accent);

  --toaster-bg-main           : var(--color-white);
  --toaster-border-color      : #000000;
  --toaster-font-size         : 0.85rem;
  --toaster-icon-color        : #ff6b6b;
  --toaster-text-color        : #000000;
  --toaster-progress-bg       : rgba(0, 0, 0, 0.1);
  --toaster-accent            : #ff6b6b;
  --toaster-success-bg        : #e8f8f5;
  --toaster-success-border    : #27ae60;
  --toaster-warning-bg        : #fef9e7;
  --toaster-warning-border    : #f39c12;
  --toaster-error-bg          : #f5b7b1;
  --toaster-error-border      : #c0392b;

  --color-credits-background  : #000000;
  --color-credits-title       : #e67e22; 
  --color-credits-role        : #e67e22;
  --color-credits-name        : var(--color-white);

  --color-operational-system-icons-color       : #E50012;
  --color-operational-system-icons-hover-color : #E50012;

  --color-requiriments-key-background           : #E50012;
  --color-requiriments-value-background         : var(--color-white);
  --color-requiriments-key-text                 : var(--color-white);
  --color-requiriments-value-text               : #000000;
  --color-requiriments-container-border         : 3px solid #000000;
  --color-requiriments-key-border-bottom        : 3px solid #000000;
  --color-requiriments-value-border-bottom      : 3px solid #E50012;
  --color-requiriments-mobile-row-border-bottom : 3px solid #E50012;

  --color-dropdown-border             : 3px solid currentColor;
  --color-dropdown-trigger-bg         : #ff9900;
  --color-dropdown-trigger-text       : #000000;
  --color-dropdown-trigger-hover-bg   : #E50012;
  --color-dropdown-trigger-hover-text : var(--color-white);
  --color-dropdown-arrow              : #000000;
  --color-dropdown-arrow-hover        : var(--color-white);
  --color-dropdown-list-bg            : #ff9900;
  --color-dropdown-list-border        : 2px solid #000000;
  --color-dropdown-option-text        : #000000;
  --color-dropdown-option-hover-bg    : #E50012;
  --color-dropdown-option-hover-text  : var(--color-white);
  --color-dropdown-option-active-bg   : #E50012;
  --color-dropdown-option-active-text : var(--color-white);
  --color-dropdown-active-arrow       : var(--color-white);

  --color-lang-dropdown-border             : 3px solid currentColor;
  --color-lang-dropdown-trigger-text       : var(--color-default-text-color);
  --color-lang-dropdown-trigger-bg         : #000000;
  --color-lang-dropdown-trigger-hover-bg   : var(--color-tertiary);
  --color-lang-dropdown-arrow              : var(--color-white);
  --color-lang-dropdown-arrow-hover        : var(--color-white);
  --color-lang-dropdown-list-bg            : #000000;
  --color-lang-dropdown-list-border        : 3px solid var(--color-white);
  --color-lang-dropdown-option-text        : var(--color-white);
  --color-lang-dropdown-option-hover-bg    : var(--color-tertiary);
  --color-lang-dropdown-option-hover-text  : var(--color-white);
  --color-lang-dropdown-option-active-bg   : var(--color-tertiary);
  --color-lang-dropdown-option-active-text : var(--color-white);
  --color-lang-dropdown-active-arrow       : var(--color-white);  
  
  --foldable-header-bg     : transparent;
  --foldable-title-color   : #202020;
  --foldable-body-bg       : var(--color-white);
  --foldable-text-color    : var(--color-white);
  --foldable-icon-color    : var(--color-white);
  --foldable-icon-outline  : #202020;
  --foldable-icon-bg       : transparent;
  --foldable-body-border   : 3px solid #202020;

  --content-section-font-h2      : var(--font-default);
  --content-section-font-h2-size : var(--font-h2-size);
  --content-section-color-h2     : var(--color-primary);
  --content-section-font-p       : var(--font-default);
  --content-section-font-p-size  : var(--font-p-size);
  --content-section-color-p      : var(--color-black);
  --content-section-media-border : var(--default-border);
  --content-section-media-radius : var(--default-border-radius);

  --media-modal-overlay-bg       : rgba(68, 9, 9, 0.534);
  --media-modal-border           : var(--default-border);
  --media-modal-border-radius    : var(--default-border-radius);
  --media-modal-media-bg         : var(--color-black);
  --media-modal-button-size      : 40px;
  --media-modal-button-bg        : var(--color-default-background);
  --media-modal-button-bg-hover  : var(--color-primary);
  --media-modal-button-icon-size : 95%;
  --media-modal-close-top        : -50px;
  --media-modal-close-right      : 0;
  --media-modal-arrow-icon       : var(--color-primary);
  --media-modal-arrow-icon-hover : var(--media-modal-button-bg);
  --media-modal-arrow-offset     : -60px;

  --color-banner-button-border             : var(--default-border);
  --color-banner-button-bg                 : var(--color-default-background);
  --color-banner-button-hover-bg           : var(--color-primary);
  --color-banner-button-icon               : var(--color-black);
  --color-banner-button-text               : var(--color-black); 
}

body {
  margin                : 0;
  background            : var(--color-default-background) ;
  overflow-x            : hidden;
}

.loading-screen {
  display               : flex;
  justify-content       : center;
  align-items           : center;
  height                : 100vh;
  background-color      : #111;
  color                 : #fff;
  font-size             : 24px;
}

.app-container {
  display               : flex;
  flex-direction        : column;
  align-items           : center;
  min-height            : 100vh;
  box-sizing            : border-box;
  overflow-x            : hidden;
}

.content-wrapper {
  position              : relative;
  flex                  : 1;
  display               : flex;
  flex-direction        : column;
  align-items           : center;
  width                 : 100%;
  margin-bottom         : 140px;
}

.animation-toggle-bar {
  width                 : 100%;
  display               : flex;
  flex-direction        : row;     
  justify-content       : center;  
  align-items           : center;  
  gap                   : 15px;    
  background            : var(--color-black);
  padding               : 10px 20px;
  box-sizing            : border-box;
  border-bottom         : var(--default-border);
}
.toggle-label {
  padding-top           : 5px;
  font-family           : var(--font-default);
  font-size             : var(--font-reduce-motion-size);
  color                 : var(--color-default-background);
}

.footer-container {
  width                 : 100%;
  display               : flex;
  flex-direction        : column;
  align-items           : center;
  margin-top            : auto;
}

.main-content {
  width                 : 100%;
  max-width             : 1240px;
  display               : flex;
  flex-direction        : column;  
  
}

.section-title {
  color                 : var(--color-black);
  font-size             : 60px;
  font-family           : var(--font-navbar);
  text-align            : center;
  margin                : 40px 0 20px;
}

.page-fade-enter-active,
.page-fade-leave-active {
  transition            : opacity 0.3s ease, transform 0.3s ease;
}

.page-fade-enter-from {
  opacity               : 0;
  transform             : translateY(10px);
}

.page-fade-leave-to {
  opacity               : 0;
  transform             : translateY(-10px);
}
</style>