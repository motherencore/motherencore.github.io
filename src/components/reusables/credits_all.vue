<template>
  <div class="credits-all-wrapper">
    <CreditsSection 
      :credits="formattedCredits" 
      :linksMap="linksMap" 
    />
    <CreditsSection 
      :credits="specialCredits" 
      :linksMap="{}" 
      columns="1"
      textAlign="center"
    />
  </div>
</template>

<script setup>
/**
  * @file        credits_all.vue
  * @brief       The master credits container component that parses CSV files for roles and links, formatting localized credit lists for display.
  * @displayName All Credits View
*/

import { computed } from 'vue'
import { useI18n } from '@/composables/useI18n'

import CreditsSection from '@/components/reusables/credits_section.vue'

import rolesCSVText from '@/assets/csv/credits_roles.csv?raw'
import linksCSVText from '@/assets/csv/credits_links.csv?raw'

const { t } = useI18n()

const props = defineProps({
  /**
    * The act filter string ('all' or specific act number).
    * @public
  */
  act: {
    type: String,
    default: 'all'
  }
})

/**
  * Special static credits block for thanks, community, and contributor notices.
  * @private
  */
const specialCredits = computed(() => [
  {
    title: t('CREDITS_THANKS_VERY'),
    showTooltip: false,
    groups: [
      {
        names: [
          t('CREDITS_NAME_FAN_TRANSL'),
          t('CREDITS_NAME_COMMUNITY'),
          t('CREDITS_NAME_DISCORD'),
        ]
      }
    ]
  },
])

/**
  * Robust RFC-4180 safe CSV line splitter.
  * @param {string} line - CSV row string.
  * @private
  */
const splitCSVLine = (line) => {
  const result = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    if (char === '"' && line[i + 1] === '"') {
      current += '"'
      i++
    } else if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim())
      current = ''
    } else {
      current += char
    }
  }
  result.push(current.trim())
  return result
}

/**
  * Parses raw CSV text into structured JavaScript objects.
  * @private
  */
const parseCSV = (text) => {
  if (!text) return []
  
  const lines = text.split(/\r?\n/).filter(line => line.trim() !== '')
  if (lines.length === 0) return []

  const headers = splitCSVLine(lines[0])

  return lines.slice(1).map((row) => {
    const values = splitCSVLine(row)
    const obj = {}
    
    headers.forEach((header, idx) => {
      obj[header] = values[idx] ? values[idx] : ''
    })
    return obj
  })
}

/**
  * Generates a lookup dictionary mapping names to external links from the parsed links CSV.
  * @private
  */
const linksMap = computed(() => {
  const map = {}
  const rawLinks = parseCSV(linksCSVText)
  
  rawLinks.forEach(item => {
    const nameKey = item['Name'] || item['name'] || ''
    const linkVal = item['External Link'] || item['link'] || item['External_Link'] || ''
    
    if (nameKey) {
      map[nameKey.trim().toLowerCase()] = linkVal.trim()
    }
  })
  
  return map
})

/**
  * Formats the raw CSV role data and links into structured credit groups based on the active act filter.
  * @private
  */
const formattedCredits = computed(() => {
  const rawRoles = parseCSV(rolesCSVText)
  
  const groups = rawRoles.map((row) => {
    const roleKey = (row['Translation Key'] || '').trim()
    const englishFallback = (row['Role'] || '').trim()

    let rawNames = ''
    if (props.act === 'all') {
      rawNames = row['en'] || row['ALL ACTS'] || ''
    } else {
      rawNames = row[`ACT ${props.act}`] || ''
    }

    const namesList = rawNames ? rawNames.split(';').map(n => n.trim()) : []
    
    const processedNames = namesList.map(name => {
      const matchKey = name.toLowerCase()
      const foundLink = linksMap.value[matchKey] || null
      
      return {
        name: name,
        link: foundLink
      }
    })

    let translatedSubtitle = roleKey ? t(roleKey) : ''
    if (translatedSubtitle === roleKey && englishFallback) {
      translatedSubtitle = englishFallback
    }

    return {
      subtitle: translatedSubtitle,
      names: processedNames
    }
  }).filter(group => group.names.length > 0)

  return [
    {
      title: '',
      groups: groups
    }
  ]
})
</script>

<style scoped>
.credits-all-wrapper {
  width          : 100%;
  display        : flex;
  flex-direction : column;
  align-items    : center;
}
</style>