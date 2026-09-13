<template>
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

const toggle_debug_log = true 

/**
  * Logs debug messages to the console if debugging is toggle_debug_log is true.
  * @private
  */
const debugLog = (...args) => {
  if (toggle_debug_log) {
    console.log(...args)
  }
}

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
  * Parses raw CSV text into structured JavaScript objects.
  * @private
  */
const parseCSV = (text) => {
  debugLog('[parseCSV] Started parsing text of length:', text?.length)
  if (!text) return []
  
  const lines = text.split(/\r?\n/).filter(line => line.trim() !== '')
  debugLog('[parseCSV] Total lines found:', lines.length)
  
  if (lines.length === 0) return []

  const headers = lines[0].split(',').map(h => h.trim())
  debugLog('[parseCSV] Headers extracted:', headers)

  const parsedData = lines.slice(1).map((row, index) => {
    const values = row.split(',')
    const obj = {}
    
    headers.forEach((header, idx) => {
      obj[header] = values[idx] ? values[idx].trim() : ''
    })
    return obj
  })
  
  debugLog('[parseCSV] Finished parsing into objects:', parsedData)
  return parsedData
}

/**
  * Generates a lookup dictionary mapping names to external links from the parsed links CSV.
  * @private
  */
const linksMap = computed(() => {
  debugLog('[linksMap] Generating dictionary from links CSV...')
  const map = {}
  const rawLinks = parseCSV(linksCSVText)
  
  rawLinks.forEach(item => {
    const nameKey = item['Name'] || item['name'] || ''
    const linkVal = item['External Link'] || item['link'] || item['External_Link'] || ''
    
    if (nameKey) {
      map[nameKey.trim().toLowerCase()] = linkVal.trim()
    }
  })
  
  debugLog('[linksMap] Final dictionary generated:', map)
  return map
})

/**
  * Formats the raw CSV role data and links into structured credit groups based on the active act filter.
  * @private
  */
const formattedCredits = computed(() => {
  debugLog(`[formattedCredits] Building credits for ACT: ${props.act}`)
  const rawRoles = parseCSV(rolesCSVText)
  
  const groups = rawRoles.map((row, index) => {
    debugLog(`[formattedCredits] Processing row ${index}...`, row)
    
    const roleKey = row['Translation Key'].trim()
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
      if (foundLink) debugLog(`[formattedCredits] Found link for ${name}: ${foundLink}`)
      
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

  debugLog('[formattedCredits] Final generated groups:', groups)

  return [
    {
      title: '',
      groups: groups
    }
  ]
})
</script>