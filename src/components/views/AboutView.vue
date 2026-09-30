<template>
  <div class="main-content">
    <div class="about-page-container">

      <ContentSection
        v-for="(section, index) in infoSections_1" 
        :key            ="index"
        :heading        ="section.title"
        :text           ="section.text" 
        :mediaSrc       ="section.image"
        :mediaType      ="section.content_type"
        :mediaPosition  ="index % 2 === 0 ? 'right' : 'left'"
        :imageOpenable  ="section.imageOpenable ?? false"
        :headingAlign   ="section.headingAlign ?? 'left'"
        :textPadding    ="section.textPadding ?? (index % 2 === 0 ? '0 0 0 21px' : '0 21px 0 21px')"
        :mediaFit       ="section.mediaFit ?? 'cover'"
        :mediaBorder    ="section.mediaBorder ?? ''"
        :border         ="section.border ?? 'transparent'"
        :contentBg      ="section.contentBg"
        :layout         ="section.layout"
        :actionsAlign   ="section.actionsAlign"
        :staticMediaSrc ="section.staticMediaSrc"

        headerPosition="inside"
        mediaWidth    ="775px" 
        mediaHeight   ="450px"
        textAlign     ="left"
      >
        <template v-if="section.title === t('SITE_ABOUT_MUSIC_TITLE')" #actions>
          <CustomButton 
            class         ="compact-button-styled"
            width         ="var(--music_player-compact-button-size)"
            height        ="var(--music_player-compact-button-size)"
            iconSize      ="var(--music_player-compact-button-icon-size)"
            bgColor       ="var(--music_player-compact-button-color-bg)"
            hoverBgColor  ="var(--music_player-compact-button-color-bg-hover)"
            iconColor     ="var(--music_player-compact-button-color-icon)"
            hoverIconColor="var(--music_player-compact-button-color-icon-hover)"
            :iconSrc      ="musicNoteSvg"
            @click        ="openMusicPlayer"
          />
        </template>
      </ContentSection>
      

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

import ContentSection from '@/components/reusables/content_section.vue'
import CustomButton   from '@/components/reusables/custom_button.vue'

import musicNoteSvg from '@/assets/svg/music-note-4-svgrepo-com.svg'

import combatMedia        from '@/assets/mp4/showreels/Combat.mp4'
import fieldMedia         from '@/assets/mp4/showreels/Field Skills & Dungeons.mp4'
import storyMedia         from '@/assets/mp4/showreels/Story.mp4' 
import visualMedia        from '@/assets/mp4/showreels/Panning.mp4'
import musicMedia         from '@/assets/mp4/showreels/Music.mp4'

import godotImage   from '@/assets/img/logos/logo_large_monochrome_light.png'
const { t } = useI18n()

/**
  * Computes the list of information sections displayed sequentially across the about page.
  * @private
*/
const infoSections_1 = computed(() => [
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
    image       : combatMedia,
    content_type: "video",
  },
  {
    title       : t('SITE_ABOUT_FIELD_SKILLS_TITLE'),
    text        : t('SITE_ABOUT_FIELD_SKILLS_P1'),
    image       : fieldMedia,
    content_type: "video",
  },
  {
    title       : t('SITE_ABOUT_STORY_TITLE'),
    text        : t('SITE_ABOUT_STORY_P1'),
    image       : storyMedia,
    content_type: "video",
  },
  {
    title       : t('SITE_ABOUT_VISUALS_TITLE'),
    text        : t('SITE_ABOUT_VISUALS_P1'),
    image       : visualMedia,
    content_type: "video"
  },
    {
    title           : t('SITE_ABOUT_MUSIC_TITLE'),
    text            : t('SITE_ABOUT_MUSIC_P1'),
    content_type    : "video",
    image           : musicMedia,
    actionsAlign    : "center",

  },    
  {
    title         : t('SITE_ABOUT_OPENSOURCE_TITLE'),
    text          : t('SITE_ABOUT_OPENSOURCE_P1'),
    content_type  : "image",
    image         : godotImage,
    mediaFit      : 'contain',
    mediaBorder   : 'none',
    border        : 'none',
    contentBg     : 'transparent',

  }
])

/**
  * Open/Close the music player when clicked
  * @private
*/
const openMusicPlayer = () => {
  const compactBtn = document.querySelector('.compact-button')
  if (compactBtn) {
    compactBtn.click()
  }
}
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


.music_and_open_source_adhoc > * {
  flex      : 1;
  min-width : 0;
}

@media screen and (max-width: 768px) {
  .main-content {
    padding         : 0.75rem 0.5rem;
  }
  .music_and_open_source_adhoc {
    flex-direction: column;
  }

}
</style>