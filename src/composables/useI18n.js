import { ref, computed } from 'vue'
import * as XLSX from 'xlsx'

import siteTextTranslationsExcell           from '@/assets/xlsx/translations.xlsx?url'
import creditsRolesLabelsTranslationsExcell from '@/assets/xlsx/credits_roles_labels.xlsx?url'

const excelUrls = [
  siteTextTranslationsExcell,
  creditsRolesLabelsTranslationsExcell
]

const translations  = ref({})
const currentLang   = ref('en')
const isLoaded      = ref(false)

const ignored_langs    = new Set(['es_ES','uk'])
const toggle_debug_log = true

const debugLog = (...args) => {
  if (toggle_debug_log) {
    console.log(...args)
  }
}

const detectBrowserLanguage = (supportedLanguages) => {
  if (typeof window === 'undefined' || !navigator) return 'en'

  const userLangs = navigator.languages || navigator.userLanguage
  debugLog('User langs:', userLangs)

  for (const [index, rawLang] of userLangs.entries()) {
    if (!rawLang) continue
    const lang = rawLang.replace('-', '_')
    debugLog('Lang ${index + 1}:', lang)

    const primaryCode = lang.split('_')[0]
    debugLog('Primary Code ${index + 1}:', primaryCode)

    if (supportedLanguages.includes(lang)) return lang

    const match = supportedLanguages.find(
      (supported) => supported === primaryCode || supported.startsWith(`${primaryCode}_`)
    )
    if (match) return match
  }

  return 'en'
}

export const setLanguage = (lang) => {
  debugLog(`[useI18n] Language changed to: ${lang}`)
  currentLang.value = lang
}

export function useI18n() {
  const loadTranslations = async () => {
    if (isLoaded.value) {
      debugLog('[useI18n] Translations already loaded, skipping...')
      return
    }

    try {
      const languageMap = {}

      for (const url of excelUrls) {
        debugLog('[useI18n] Starting fetch from URL:', url)
        const response = await fetch(url)
        
        if (!response.ok) {
          throw new Error(`Failed to fetch ${url}: ${response.statusText}`)
        }

        debugLog('[useI18n] Fetch successful. Converting to ArrayBuffer...')
        const arrayBuffer = await response.arrayBuffer()

        debugLog('[useI18n] Parsing Excel Sheets...')
        const Sheets = XLSX.read(arrayBuffer, { type: 'array' })
        
        debugLog(`[useI18n] Sheets parsed. Found ${Sheets.SheetNames.length} sheet(s):`, Sheets.SheetNames)

        Sheets.SheetNames.forEach(sheetName => {
          debugLog(`[useI18n] --- Processing Sheet: "${sheetName}" ---`)
          const worksheet = Sheets.Sheets[sheetName]
          const rows = XLSX.utils.sheet_to_json(worksheet, { defval: '' })
          
          let validKeyCount = 0

          rows.forEach((row) => {
            const keyField = Object.keys(row).find(k => k.toLowerCase() === 'key')
            const rawKey = keyField ? row[keyField] : null
            
            if (!rawKey) return

            const keyName = String(rawKey).trim()
            validKeyCount++

            for (const [colName, value] of Object.entries(row)) {
              const trimmedCol = colName.trim()
              
              if (trimmedCol.toLowerCase() === 'key' || !trimmedCol) continue
              if (ignored_langs.has(trimmedCol)){
                debugLog(`[useI18n] Discovered IGNORED language column: "${trimmedCol}"`)
                continue
              }
              const lang = trimmedCol
              const stringValue = value !== undefined && value !== null ? String(value).trim() : ''

              if (!languageMap[lang]) {
                debugLog(`[useI18n] Discovered new language column: "${lang}"`)
                languageMap[lang] = {}
              }

              languageMap[lang][keyName] = stringValue
            }
          })
          debugLog(`[useI18n] Successfully processed ${validKeyCount} keys from "${sheetName}".`)
        })
      }

      translations.value = languageMap
      isLoaded.value = true

      const loadedLangs = Object.keys(languageMap)
      if (loadedLangs.length > 0) {
        const matchedLang = detectBrowserLanguage(loadedLangs)
        setLanguage(matchedLang)
      }

      debugLog('--- TRANSLATIONS FULLY INITIALIZED ---')
      debugLog('Loaded Languages:', Object.keys(translations.value))
      debugLog('Full Translation Dictionary:', translations.value)
      debugLog('--------------------------------------')

    } catch (error) {
      console.error('[useI18n] Failed to process translation Excel files:', error)
    }
  }

  const t = (key) => {
    const lang = currentLang.value
    const langDict = translations.value[lang]
    
    if (langDict && langDict[key] !== undefined && langDict[key] !== '') {
      return langDict[key]
    }

    debugLog(`[useI18n] WARNING: Missing translation for key "${key}" in language "${lang}"`)
    return `MISSING_KEY:${key} in LANG:${lang}`
  }

  const availableLanguages = computed(() => {
    debugLog('[useI18n] Recalculating available languages...')
    const langs = {}
    Object.keys(translations.value).forEach((lang) => {
      langs[lang] = translations.value[lang]?.['SITE_THIS_LANGUAGE'] 
        ? translations.value[lang]['SITE_THIS_LANGUAGE'] 
        : lang
    })
    return langs
  })

  return {
    loadTranslations,
    t,
    setLanguage,
    currentLang,
    isLoaded,
    availableLanguages
  }
}