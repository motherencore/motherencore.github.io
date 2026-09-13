<template>
  <section class="cast-section">
    <h2 class="section-title">{{ t('SITE_HOME_CAST') }}</h2>

    <div v-if="viewType === 'tab'" class="tab-view-wrapper">
      <div class="tabs-container">
        <button 
          v-for="(character, index) in characters" 
          :key="character.name"
          class="tab-btn"
          :class="{ active: activeIndex === index }"
          @click="activeIndex = index"
        >
          <img :src="character.portrait || character.image" :alt="character.name" class="tab-thumb" />
        </button>
      </div>

      <div class="cast-display">
        <Transition 
          :name="computedTransition === 'fade' ? 'card-fade' : ''" 
          mode="out-in"
        >
          <CharacterCard 
            v-if="characters[activeIndex]"
            :key="activeIndex"
            :name="characters[activeIndex].name"
            :description="characters[activeIndex].description"
            :image="characters[activeIndex].image"
            :imageShape="characters[activeIndex].imageShape || 'circle'"
            :imageBgColor="characters[activeIndex].imageBgColor || 'transparent'"
            :isReversed="activeIndex % 2 !== 0" 
          />
        </Transition>
      </div>
    </div>

    <div v-else class="cast-grid">
      <CharacterCard 
        v-for="(character, index) in characters" 
        :key          ="character.name"
        :name         ="character.name"
        :description  ="character.description"
        :image        ="character.image"
        :imageShape   ="character.imageShape || 'circle'"
        :imageBgColor ="character.imageBgColor || 'transparent'"
        :isReversed   ="index % 2 !== 0" 
        :imageScale   ="character.imageScale   || undefined"
        :imagePadding ="character.imagePadding || undefined"
      />
    </div>
  </section>
</template>

<script setup>
/**
  * @file        cast_list.vue
  * @brief       Displays a showcase list or tabbed view of characters with portrait navigation and transition support.
  * @displayName Cast List
*/

import { ref, onMounted, computed } from 'vue'
import { useI18n }    from '@/composables/useI18n'
import CharacterCard  from './character_card.vue'

import imgNintenPortrait  from '@/assets/img/characters/ninten_head_sprite.png'
import imgNinten          from '@/assets/img/characters/ninten.png'

import imgLloydPortrait   from '@/assets/img/characters/lloyd_head_sprite.png'
import imgLloyd           from '@/assets/img/characters/lloyd.png'

import imgAnaPortrait     from '@/assets/img/characters/ana_head_sprite.png'
import imgAna             from '@/assets/img/characters/ana.png'

import imgTeddyPortrait   from '@/assets/img/characters/teddy_head_sprite.png'
import imgTeddy           from '@/assets/img/characters/teddy.png'

import svgTriangle from '@/assets/svg/triangle-right-12-filled.svg'

const props = defineProps({
  /** 
    * Layout display mode for characters.
    * @values list, tab
    * @public
  */
  viewType: { 
    type: String, 
    default: 'list', 
    validator: (val) => ['list', 'tab'].includes(val) 
  },
  /**
    * Animation transition type used when switching tabs.
    * @public
  */
  transitionType: { 
    type: String, 
    default: 'fade'
  }
});

const { t } = useI18n()
const activeIndex = ref(0)

/**
  * Computes the active transition effect name.
  * @private
*/
const computedTransition = computed(() => {
  const mode = props.transitionType;
  return mode === 'immediate' ? 'immediate' : 'fade';
});

/**
  * Formats the triangle SVG path for CSS mask usage.
  * @private
*/
const triangleUrl = computed(() => `url(${svgTriangle})`)

/**
  * Reactive collection of game characters with localized text and assets.
  * @private
*/
const characters = computed(() => [
  {
    name        : t('SITE_HOME_NINTEN_TITLE'),
    description : [t('SITE_HOME_NINTEN_1'), t('SITE_HOME_NINTEN_2')],
    portrait    : imgNintenPortrait,
    image       : imgNinten,
    imageShape  : 'circle',
    imageBgColor: 'var(--color-default-background)',
    imageScale  : "1.3",
  },
  {
    name        : t('SITE_HOME_LLOYD_TITLE'),
    description : [t('SITE_HOME_LLOYD_1'), t('SITE_HOME_LLOYD_2')],
    portrait    : imgLloydPortrait,
    image       : imgLloyd,
    imageShape  : 'circle',
    imageBgColor: 'var(--color-default-background)',
    imageScale  : "1.3",
    imagePadding: "0 0 90px 0",
  },
  {
    name        : t('SITE_HOME_ANA_TITLE'),
    description : [t('SITE_HOME_ANA_1'), t('SITE_HOME_ANA_2')],
    portrait    : imgAnaPortrait,
    image       : imgAna,
    imageShape  : 'circle',
    imageBgColor: 'var(--color-default-background)',
    imageScale  : "1.3",
    imagePadding: "0 0 100px 0",

  },
  {
    name        : t('SITE_HOME_TEDDY_TITLE'),
    description : [t('SITE_HOME_TEDDY_1'), t('SITE_HOME_TEDDY_2')],
    portrait    : imgTeddyPortrait,
    image       : imgTeddy,
    imageShape  : 'circle',
    imageBgColor: 'var(--color-default-background)',
    imageScale  : "1.6",
  }
]);

onMounted(() => {
  characters.value.forEach((character) => {
    const img = new Image()
    img.src = character.image
  })
})
</script>

<style scoped>
.cast-section {
  margin-top     : 40px;
  display        : flex;
  flex-direction : column;
  align-items    : center;
  width          : 100%;
  box-sizing     : border-box;

}

.section-title {
  width          : 100%;
  margin         : 0 0 20px 0;
  text-align     : center;
  color          : var(--color-h2);
  font-size      : var(--font-h2-size);
  font-family    : var(--font-h2);
}

.tab-view-wrapper {
  display        : flex;
  flex-direction : column;
  align-items    : center;
  width          : 100%;
  max-width      : 856px;
}

.tabs-container {
  display        : flex;
  gap            : 36px;
  justify-content: center;
  align-items    : center;
  padding        : 15px 40px;
  width          : 100%;
  box-sizing     : border-box;
  z-index        : 2;
  overflow       : visible;
}

.tab-btn {
  position       : relative;
  background     : var(--color-background);
  border         : 3px solid #000000;
  border-radius  : 16px;
  width          : 70px;
  height         : 70px;
  padding        : 6px;
  cursor         : pointer;
  display        : flex;
  align-items    : center;
  justify-content: center;
  box-sizing     : border-box;
  transition     : transform 0.1s ease;
  image-rendering: crisp-edges;
  image-rendering: pixelated;

  backface-visibility : hidden;
  transform-style     : preserve-3d;
  will-change         : transform;
}

.tab-btn:hover {
  transform      : scale(1.2);
}

.tab-btn.active {
  border         : 4px solid #b55fe6;
  padding        : 5px;
}

.tab-btn.active::before {
  content             : '';
  position            : absolute;
  left                : -34px; 
  top                 : calc(50% - 15px);
  width               : 30px; 
  height              : 30px;
  background-color    : var(--color-place-holder-green); 

  -webkit-mask-image  : v-bind(triangleUrl);
  mask-image          : v-bind(triangleUrl);
  -webkit-mask-size   : contain;
  mask-size           : contain;
  -webkit-mask-repeat : no-repeat;
  mask-repeat         : no-repeat;
  
  will-change         : transform;
  animation           : choppy-horizontal 0.6s steps(3, end) infinite alternate;
}

.tab-thumb {
  width          : 100%;
  height         : 100%;
  object-fit     : contain;
}

.cast-display {
  margin-top     : -6px;
  display        : flex;
  flex-direction : column;
  align-items    : center;
  width          : 100%;
  box-sizing     : border-box;
  z-index        : 1;
  min-height     : 380px; 
}

.cast-grid {
  padding        : 20px;
  display        : flex;
  flex-direction : column;
  gap            : 40px;
  align-items    : center;
  width          : 100%;
  box-sizing     : border-box;
}

.card-fade-enter-active,
.card-fade-leave-active {
  transition     : opacity 0.2s ease, transform 0.2s ease;
}

.card-fade-enter-from {
  opacity        : 0;
  transform      : translateY(5px);
}

.card-fade-leave-to {
  opacity        : 0;
  transform      : translateY(-5px);
}

@keyframes choppy-horizontal {
  0% {
    transform    : translateX(0);
  }
  100% {
    transform    : translateX(6px);
  }
}

@media (max-width: 768px) {
  .tab-btn.active::before {
    display      : none;
  }
  .tabs-container {
    gap          : 30px;
    padding      : 10px 15px;
  }
  .cast-display {
    min-height   : auto;
  }
  .cast-grid{
    gap          :  80px;
  }
}
</style>