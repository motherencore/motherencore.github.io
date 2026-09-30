<template>
  <div class="game-features-container">
    <h2 class="title">{{ props.title }}</h2>

    <div class="features-wrapper">
      <div 
        class="features-track"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      >
        <ul 
          v-for="(list, listIdx) in props.features" 
          :key="listIdx" 
          class="features-list"
        >
          <li
            v-for="(text, idx) in list"
            :key="idx"
            class="feature-item"
          >
            <span class="bullet"></span>
            <p>{{ text }}</p>
          </li>
        </ul>
      </div>
    </div>

    <div v-if="props.features.length > 1" class="carousel-nav">
      <CustomButton
        class          = "nav-btn"
        text           = ""
        iconSize       = "14px"
        width          = "45px"
        height         = "45px"
        iconColor      = "#ffffff"
        bgColor        = "#8c8c8c"
        hoverIconColor = "#ffffff"
        hoverBgColor   = "var(--color-primary)"
        pressAnimation = "push"
        :iconSrc       = "img_left_arrow"
        @click         = "prevSlide"
        aria-label     = "Previous slide"
      />

      <div class="indicators">
        <span
          v-for="(_, idx) in props.features"
          :key="idx"
          class="dot"
          :class="{ active: currentIndex === idx }"
          @click="goToSlide(idx)"
        ></span>
      </div>

      <CustomButton
        class          = "nav-btn"
        text           = ""
        iconSize       = "14px"
        width          = "45px"
        height         = "45px"
        iconColor      = "#ffffff"
        bgColor        = "#8c8c8c"
        hoverIconColor = "#ffffff"
        hoverBgColor   = "var(--color-primary)"
        pressAnimation = "push"
        :iconSrc       = "img_right_arrow"
        @click         = "nextSlide"
        aria-label     = "Next slide"
      />
    </div>
  </div>
</template>

<script setup>
/**
  * @file        list_text_carroulsel.vue
  * @brief       A text list carousel component featuring slides of feature lists, custom pagination indicators, and custom navigation buttons.
  * @displayName List Text Carousel
*/

import { ref } from 'vue'
import CustomButton from '@/components/reusables/custom_button.vue'

import img_left_arrow   from '@/assets/svg/triangle-left-12-filled.svg'
import img_right_arrow  from '@/assets/svg/triangle-right-12-filled.svg'

const props = defineProps({
  /** Title header text displayed above the carousel. 
    * @public
  */
  title: {
    type: String,
    default: 'GAME FEATURES'
  },
  /** Array of feature lists displayed across carousel slides. 
    * @public
  */
  features: {
    type: Array,
    required: true,
    default: () => []
  }
})

/**
  * Tracks the active slide index of the carousel.
  * @private
  */
const currentIndex = ref(0)

/**
  * Advances the carousel to the next slide.
  * @private
  */
const nextSlide = () => {
  if (props.features.length === 0) return
  currentIndex.value = (currentIndex.value + 1) % props.features.length
}

/**
  * Moves the carousel to the previous slide.
  * @private
  */
const prevSlide = () => {
  if (props.features.length === 0) return
  currentIndex.value = (currentIndex.value - 1 + props.features.length) % props.features.length
}

/**
  * Directly navigates the carousel to a specific slide index.
  * @param {number} index Target slide index.
  * @private
  */
const goToSlide = (index) => {
  currentIndex.value = index
}
</script>

<style scoped>
.game-features-container {
  color          : var(--color-text);
  padding        : 40px;
  width          : 100%;
  box-sizing     : border-box;
  display        : flex;
  flex-direction : column;
}

.title {
  color          : #ff3322;
  font-family    : var(--font-h2);
  font-size      : var(--font-h2-size);
  font-weight    : 900;
  letter-spacing : 1px;
  margin-bottom  : 30px;
}

.features-wrapper {
  overflow   : hidden;
  min-height : 280px;
  width      : 100%;
}

.features-track {
  display    : flex;
  width      : 100%;
  transition : transform 0.5s ease-in-out;
}

.features-list {
  list-style     : none;
  padding        : 0;
  margin         : 0;
  display        : flex;
  flex-direction : column;
  gap            : 20px;
  flex           : 0 0 100%;
}

.feature-item {
  display     : flex;
  align-items : flex-start;
  gap         : 15px;
  font-family : var(--font-p);
  font-size   : var(--font-p-size);
  line-height : 1.5;
}

.feature-item p {
  margin : 0;
}

.bullet {
  width            : 8px;
  height           : 8px;
  background-color : var(--color-black);
  border-radius    : 50%;
  margin-top       : 8px;
  flex-shrink      : 0;
}

.carousel-nav {
  display     : flex;
  align-items : center;
  gap         : 15px;
  margin-top  : 40px;
  width       : 100%;
}

.nav-btn {
  border-radius   : 8px !important;
}

.indicators {
  display     : flex;
  gap         : 10px;
  align-items : center;
}

.dot {
  width         : 12px;
  height        : 12px;
  border-radius : 50%;
  background    : #5a5a5a;
  cursor        : pointer;
  transition    : background 0.2s;
}

.dot.active {
  background : #ff9900;
}
</style>