<template>
  <div class="credits-view">
    <div class="credits-header-wrapper">
      <h2 class="credits-main-title">{{ t('SITE_NAV_CREDITS') }}</h2>
      
      <CustomDropdown 
        v-model="currentAct" 
        :options="availableActs" 
      />
    </div>

    <CreditsSection :act="currentAct" />
  </div>
</template>

<script setup>
/**
  * @file        CreditsView.vue
  * @brief       Credits view component use Credits Section component to display credits for the selected act.
  * @displayName Credits View
*/

import { ref, computed, onMounted, onUnmounted} from 'vue'
import { useI18n } from '@/composables/useI18n'

import CreditsSection from '@/components/reusables/credits_all.vue'
import CustomDropdown from '@/components/reusables/custom_dropdown.vue'

const { t } = useI18n()

/**
  * Tracks the currently selected act identifier for the credits filter.
  * @private
  */
const currentAct = ref('all')

/**
  * Computes the list of available act options for the dropdown selector.
  * @private
  */
const availableActs = computed(() => [
  { id: 'all', label: t('SITE_CREDITS_ALL_LABEL') },
  { id: '1',   label: t('SITE_CREDITS_ACT_LABEL') + ' 1' },
  { id: '2',   label: t('SITE_CREDITS_ACT_LABEL') + ' 2' },
])

onMounted(() => {
  document.body.style.backgroundColor = 'var(--color-credits-background)'
})

onUnmounted(() => {
  document.body.style.backgroundColor = 'var(--color-default-background)'
})
</script>

<style scoped>
.credits-view {
  width             : 100%;
  max-width         : 100%;
  box-sizing        : border-box;
  display           : flex;
  flex-direction    : column;
  align-items       : center;
  background-color  : var(--color-credits-background);
  padding           : clamp(1rem, 3vw, 3rem);
  overflow-x        : hidden;
}

.credits-header-wrapper {
  width             : 100%;
  max-width         : 800px;
  text-align        : center;
  margin-bottom     : clamp(1rem, 3vw, 2rem);
  display           : flex;
  flex-direction    : column;
  align-items       : center;
  padding           : 0 1rem;
  box-sizing        : border-box;
}

.credits-main-title {
  color             : var(--color-default-text-color);
  font-family       : var(--font-h1);
  font-size         : clamp(1.25rem, 4vw, var(--font-h2-size));
  text-transform    : uppercase;
  margin            : 0 0 clamp(0.75rem, 2vw, 1.5rem) 0;
  padding-bottom    : 0.5rem;
  letter-spacing    : clamp(1px, 0.5vw, 2px);
  display           : inline-block;
  text-align        : center;
  word-break        : break-word;
  overflow-wrap     : break-word;
}

@media (max-width: 768px) {
  .credits-view {
    padding         : 0.75rem;
  }
  .credits-header-wrapper {
    width           : 100%;
    padding         : 0 0.5rem;
  }
}
</style>