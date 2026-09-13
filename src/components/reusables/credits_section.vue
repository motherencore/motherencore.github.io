<template>
  <div class="credits-container">
    <div class="credits-body">
      <div v-for="(section, sIndex) in credits" :key="sIndex" class="credits-section-block">
        <h2 v-if="section.title" class="credits-main-title">
          {{ section.title }}
        </h2>
        
        <div 
          v-for="(group, index) in section.groups" 
          :key="index" 
          class="credits-group"
        >
          <h3 v-if="group.subtitle" class="credits-role">
            {{ group.subtitle }}
          </h3>
          <ul class="credits-names-list">
            <li 
              v-for="(person, nameIndex) in group.names" 
              :key="nameIndex" 
              class="credits-name"
              @mouseenter="activeTooltipIndex = `${sIndex}-${index}-${nameIndex}`"
              @mouseleave="activeTooltipIndex = null"
            >
              <a 
                v-if="getPersonLink(person)" 
                :href="getPersonLink(person)" 
                target="_blank" 
                rel="noopener" 
                class="credit-link"
              >
                {{ resolveName(person) }}
              </a>
              
              <span 
                v-else 
                :style="{ cursor: isTooltipAllowed(section, group, person) ? 'not-allowed' : 'default' }"
                class="credit-text-fallback"
              >
                {{ resolveName(person) }}
              </span>

              <ToolTip 
                v-if="isTooltipAllowed(section, group, person)"
                :show="activeTooltipIndex === `${sIndex}-${index}-${nameIndex}`"
                :text="getPersonLink(person) || 'No link available'"
                position="top"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
  * @file        credits_section.vue
  * @brief       A customizable credits section component featuring grouped roles, names, grid layout columns, dynamic links, and tooltip.
  * @displayName Credits Section
*/

import { ref, computed } from 'vue'
import ToolTip from '@/components/reusables/tooltip.vue'

const props = defineProps({
  /**
    * Array of credit sections containing titles and grouped role lists.
    * @public
  */
  credits: {
    type: Array,
    required: true,
  },
  /**
    * Mapping dictionary of names and external links.
    * @public
  */
  linksMap: {
    type: Object,
    default: () => ({})
  },
  /**
    * Text color for main section titles.
    * @public
  */
  titleColor: {
    type: String,
    default: 'var(--color-credits-title)'
  },
  /**
    * Text color for group roles/subtitles.
    * @public
  */
  subtitleColor: {
    type: String,
    default: 'var(--color-credits-role)'
  },
  /**
    * Text color for individual names.
    * @public
  */
  textColor: {
    type: String,
    default: 'var(--color-credits-name)'
  },
  /**
    * Number of grid columns for the names list.
    * @public
  */
  columns: {
    type: [Number, String],
    default: 2
  },
  /**
    * Text alignment orientation ('left', 'center', 'right').
    * @values left, center, right
    * @public
  */
  textAlign: {
    type: String,
    default: 'left'
  },
})

const activeTooltipIndex = ref(null)

/**
  * Computes grid justification based on text alignment configuration.
  * @private
*/
const computedAlign = computed(() => {
  if (props.textAlign === 'center') return 'center'
  if (props.textAlign === 'right') return 'end'
  return 'start'
})

/**
  * Extracts string name from string or object person entries.
  * @private
*/
const resolveName = (person) => {
  if (typeof person === 'object' && person !== null) {
    return person.name
  }
  return person
}

/**
  * Resolves link mapping for a person string.
  * @private
*/
const resolveLink = (person) => {
  const nameStr = resolveName(person)
  if (!nameStr) return null
  const targetKey = nameStr.trim().toLowerCase()
  
  const foundKey = Object.keys(props.linksMap).find(
    k => k.trim().toLowerCase() === targetKey
  )
  return foundKey ? props.linksMap[foundKey] : null
}

/**
  * Gets specific link or fallback resolved link for a person.
  * @private
*/
const getPersonLink = (person) => {
  if (typeof person === 'object' && person !== null && person.link) {
    return person.link
  }
  return resolveLink(person)
}

/**
  * Determines if tooltips are permitted based on config hierarchy.
  * @private
*/
const isTooltipAllowed = (section, group, person) => {
  if (section.showTooltip === false) return false
  if (group.showTooltip === false) return false
  if (typeof person === 'object' && person !== null && person.showTooltip === false) {
    return false
  }
  return true
}
</script>

<style scoped>
.credits-container {
  width             : 100%;
  max-width         : 1240px;
  margin-bottom     : 50px;
  padding           : 10px;
  box-sizing        : border-box;
  display           : flex;
  flex-direction    : column;
  align-items       : center;
}

.credits-body {
  width             : 100%;
  max-width         : 600px;
  display           : flex;
  flex-direction    : column;
  align-self        : center;
  gap               : 2.5rem;
}

.credits-section-block {
  width             : 100%;
  display           : flex;
  flex-direction    : column;
  align-items       : center;
  gap               : 2.5rem;
}

.credits-main-title {
  text-decoration   : none;
  font-size         : var(--font-credits-title-size);
  font-family       : var(--font-credits-title);
  font-weight       : bold;
  letter-spacing    : 2px;
  margin            : 0;
  text-transform    : uppercase;
  padding-bottom    : 4px;
  color             : v-bind('props.titleColor');
}

.credits-group {
  width             : 100%;
  display           : flex;
  flex-direction    : column;
  align-items       : flex-start;
}

.credits-role {
  margin            : 0 0 0.5rem 0;
  font-family       : var(--font-h3);
  font-size         : var(--font-h4-size);
  text-transform    : uppercase;
  letter-spacing    : 1px;
  color             : v-bind('props.subtitleColor');
}

.credits-names-list {
  width             : 100%;
  margin            : 0;
  padding           : 0;
  list-style        : none;
  display           : grid;
  grid-template-columns: repeat(v-bind(columns), 1fr);
  gap               : 0.25rem 2rem;
  justify-items     : v-bind(computedAlign);
}

.credits-name {
  margin            : 0;
  font-family       : var(--font-body), sans-serif;
  font-size         : var(--font-p-size);
  overflow          : visible;
  text-align        : v-bind(textAlign);
  display           : inline-flex;
  position          : relative;
  width             : fit-content;
  max-width         : 100%;
  justify-self      : v-bind(computedAlign);
}

.credit-link {
  text-decoration   : none;
  transition        : color 0.2s;
  display           : inline-block;
  pointer-events    : auto;
  cursor            : pointer;
  color             : v-bind('props.textColor');
}

.credit-link:hover {
  color             : var(--color-secondary) !important;
  text-decoration   : underline;
}

.credit-text-fallback {
  display           : inline-block;
  color             : v-bind('props.textColor');
}

@media (max-width: 768px) {
  .credits-role {
    font-size       : var(--font-mobile-h4-size);
  }
  .credits-name {
    font-size       : var(--font-mobile-p-size);
  }
}

@media (max-width: 480px) {
  .credits-names-list {
    grid-template-columns: 1fr;
  }
}
</style>