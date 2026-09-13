<template>
  <div class="main-content">
    <div class="about-page-container">

      <ContentSection
      v-for="(section, index) in infoSections" 
      :key          ="index"
      :heading      ="section.title"
      :text         ="section.text" 
      :mediaSrc     ="section.image"
      :mediaType    ="section.content_type"
      :mediaPosition="index % 2 === 0 ? 'right' : 'left'"
      :imageOpenable="section.imageOpenable ?? false"
      :headingAlign ="section.headingAlign ?? 'left'"
      :textPadding  ="section.textPadding ?? (index % 2 === 0 ? '0 0 0 21px' : '0 21px 0 21px')"
      :mediaFit     ="section.mediaFit ?? 'cover'"
      :mediaBorder  ="section.mediaBorder ?? ''"
      :border       ="section.border ?? 'transparent'"
      :contentBg    ="section.contentBg"
      headerPosition="inside"
      mediaWidth    ="775px" 
      mediaHeight   ="450px"
      textAlign     ="left"
      />          
    </div>    


  </div>
</template>

<script setup>
/**
  * @file        AboutView.vue
  * @brief       About page view component displaying structured informational content sections with alternating media layouts.
  * @displayName About View
*/

import { computed } from 'vue'
import { useI18n }  from '@/composables/useI18n'

import ContentSection     from '@/components/reusables/content_section.vue'
import SocialMediaButton  from '@/components/reusables/social_media_button.vue'

import combatImage  from '@/assets/img/screenshots/sc4.png'
import fieldImage   from '@/assets/img/screenshots/sc1.png'
import storyImage   from '@/assets/img/screenshots/sc2.png'
import visualImage  from '@/assets/img/screenshots/sc3.png'
import musicImage   from '@/assets/img/screenshots/sc5.png'

import imgGodotLogo from '@/assets/img/logos/logo_large_monochrome_light.png'

const { t } = useI18n()

/**
  * Computes the list of information sections displayed sequentially across the about page.
  * @private
  */
const infoSections = computed(() => [
  {
    title       : t('SITE_ABOUT_OVERVIEW_TITLE'),
    text        : [t('SITE_ABOUT_OVERVIEW_P1'), t('SITE_ABOUT_OVERVIEW_P2')],
    content_type: "text",
    headingAlign: "center",
    textPadding  :"0 0 0 0"
  },
  {
    title       : t('SITE_ABOUT_COMBAT_TITLE'),
    text        : t('SITE_ABOUT_COMBAT_P1'),
    image       : combatImage,
    content_type: "image",
  },
  {
    title       : t('SITE_ABOUT_FIELD_SKILLS_TITLE'),
    text        : t('SITE_ABOUT_FIELD_SKILLS_P1'),
    image       : fieldImage,
    content_type: "image",
  },
  {
    title       : t('SITE_ABOUT_STORY_TITLE'),
    text        : t('SITE_ABOUT_STORY_P1'),
    image       : storyImage,
    content_type: "image",
  },
  {
    title       : t('SITE_ABOUT_VISUALS_TITLE'),
    text        : t('SITE_ABOUT_VISUALS_P1'),
    image       : visualImage,
    content_type: "image"
  },
  {
    title       : t('SITE_ABOUT_MUSIC_TITLE'),
    text        : t('SITE_ABOUT_MUSIC_P1'),
    image       : musicImage,
    content_type: "image"
  },    
  {
    title         : t('SITE_ABOUT_OPENSOURCE_TITLE'),
    text          : t('SITE_ABOUT_OPENSOURCE_P1'),
    image         : imgGodotLogo,
    content_type  : "image",
    mediaFit      : 'contain',
    mediaBorder   : 'none',
    border        : 'none',
    contentBg     : 'transparent',
  }
])
</script>

<style scoped>
.main-content {
  width             : 100%;
  max-width         : 100%;
  box-sizing        : border-box;
  overflow-x        : hidden;
  
  display           : flex;
  flex-direction    : column;
  align-items       : center;
}

.about-page-container {
  display           : flex;
  flex-direction    : column;
  align-items       : center;
  width             : 100%;
  max-width         : 1200px;
  gap               : clamp(1rem, 2.5vw, 1.5rem);
  box-sizing        : border-box;
}


@media screen and (max-width: 768px) {
  .main-content {
    padding         : 0.75rem 0.5rem;
  }
}
</style>