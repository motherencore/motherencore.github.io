<template>
  <div class="faq-container">
    
    <h1 class="heading">{{ t('SITE_FAQ_TITLE') }}</h1>

    <FoldableSection 
      v-for="(section, index) in infoSections" 
      :key            ="index"
      :title          ="section.title"
      :heading        ="section.title"
      :content        ="section.text"
      :media-type     ="section.content_type"
      :media-src      ="section.image || ''"
      :media-alt      ="section.mediaAlt || section.title"
      :image-openable ="section.imageOpenable !== false"
      :show-header    ="false"
      layout          ="horizontal"
      media-position="right"
    />
  </div>
</template>

<script setup>
/**
  * @file        FaqView.vue
  * @brief       The FAQ view component displaying a list of localized collapsible/foldable questions and answers.
  * @displayName FAQ View
*/

import { computed } from 'vue'
import { useI18n }   from '@/composables/useI18n'
import FoldableSection  from '@/components/reusables/foldable_section.vue'

const { currentLang, t } = useI18n()

/** Glob import for funny IDK images (retained for layout compatibility). * @private */
const idkImages = import.meta.glob('/src/assets/img/funny/idk_*.jpeg', {
  eager: true,
  import: 'default'
})

/** Computes the list of FAQ info sections containing titles and localized text content. * @private */
const infoSections = computed(() => [
  {
    title         : t('SITE_FAQ_Q1'),
    text          : t('SITE_FAQ_A1'),
    content_type  : "text"
  },
  {
    title         : t('SITE_FAQ_Q2'),
    text          : [t('SITE_FAQ_A2_1'), t('SITE_FAQ_A2_2')],
    content_type  : "text"
  },
  {
    title         : t('SITE_FAQ_Q3'),
    text          : t('SITE_FAQ_A3'),
    content_type  : "text"
  },
  {
    title         : t('SITE_FAQ_Q4'),
    text          : [t('SITE_FAQ_A4_1'), t('SITE_FAQ_A4_2')],
    content_type  : "text"
  },
  {
    title         : t('SITE_FAQ_Q5'),
    text          : t('SITE_FAQ_A5'),
    content_type  : "text"
  },
  {
    title         : t('SITE_FAQ_Q6'),
    text          : t('SITE_FAQ_A6'),
    content_type  : "text"
  },
  {
    title         : t('SITE_FAQ_Q7'),
    text          : t('SITE_FAQ_A7'),
    content_type  : "text",
  },
  {
    title         : t('SITE_FAQ_Q8'),
    text          : t('SITE_FAQ_A8'),
    content_type  : "text"
  },
  {
    title         : t('SITE_FAQ_Q9'),
    text          : t('SITE_FAQ_A9'),
    content_type  : "text"
  },
  {
    title         : t('SITE_FAQ_Q10'),
    text          : t('SITE_FAQ_A10'),
    content_type  : "text"
  },
  {
    title         : t('SITE_FAQ_Q11'),
    text          : t('SITE_FAQ_A11'),
    content_type  : "text"
  },
  {
    title         : t('SITE_FAQ_Q12'),
    text          : t('SITE_FAQ_A12'),
    content_type  : "text"
  },
  {
    title         : t('SITE_FAQ_Q13'),
    text          : t('SITE_FAQ_A13'),
    content_type  : "text"
  },
  {
    title         : t('SITE_FAQ_Q14'),
    text          : t('SITE_FAQ_A14'),
    content_type  : "text"
  },
  {
    title         : t('SITE_FAQ_Q15'),
    text          : t('SITE_FAQ_A15'),
    content_type  : "text"
  },  
]) 
</script>

<style scoped>
.heading {
  align-self            : stretch;
  font-size             : var(--font-h1-size);
  font-family           : var(--font-h1);
  color                 : var(--color-primary);
  text-align            : center;
  font-weight           : 500;
  margin                : 0 0 clamp(10px, 2vw, 15px) 0;
  word-break            : break-word;
  overflow-wrap         : break-word;
}

.faq-container {
  width                 : 100%;
  max-width             : 900px;
  margin                : 0 auto;
  padding               : clamp(20px, 4vw, 40px) clamp(12px, 3vw, 20px);
  display               : flex;
  flex-direction        : column;
  gap                   : 12px;
  box-sizing            : border-box;
  overflow-x            : hidden;
}
</style>