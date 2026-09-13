<template>
  <div class="main-content">
    <Banner
      sessionKey                  ="replace_banner_for_map_renders"
      :alternativeImages          ="mapRenderImagesArray"
      alternativeScrollDirection  ="both"
      subtitle                    =""
      :showLogo                   ="false"
      :showCtaButton              ="false"
    />

    <div class="galery-container">
      <div class="button-wrapper">
        <CustomButton 
          :text        ="t('SITE_DOGTEN_OPTIONS_BUTTON')"
          bgColor     ="#222"
          hoverBgColor="#444"
          textColor   ="#fff"
          @click      ="isOptionsModalOpen = true"
        />
      </div>

      <OptionsModal 
        v-model   ="isOptionsModalOpen"
        :title     ="t('SITE_DOGTEN_OPTIONS_BUTTON')"
        :options  ="modalOptions"
        @change   ="handleModalChange"
      />

      <MediaGallery :items="sampleMediaItems" @select="openModal" />

      <MediaModal 
        :isOpen     ="isMediaModalOpen" 
        :mediaItem  ="sampleMediaItems[currentIndex]" 
        :showNav    ="sampleMediaItems.length > 1"
        @close      ="closeModal"
        @next       ="nextMedia"
        @prev       ="prevMedia"
      />
    </div>
  </div>
</template>

<script setup>
/**
  * @file        DogtenView.vue
  * @brief       Gallery view component displaying the worst of Encore
  * @displayName Dogten View
*/

import { ref, onMounted, computed} from 'vue'
import { useI18n } from '@/composables/useI18n'

import Banner          from '@/components/reusables/banner.vue'
import MediaGallery    from '@/components/reusables/mansory_gallery.vue'
import MediaModal      from '@/components/reusables/media_modal.vue'
import CustomButton    from '@/components/reusables/custom_button.vue'
import OptionsModal    from '@/components/reusables/options_modal.vue'

const { t } = useI18n()

/**
  * Glob loader for funny media assets.
  * @private
  */
const funnyModules = import.meta.glob('@/assets/img/funny/*.{png,jpg,jpeg,svg,webp,gif,mp4}', {
  eager: true,
  import: 'default'
})

/**
  * Glob loader for map render background images.
  * @private
  */
const mapRenderImagesGlob = import.meta.glob('@/assets/img/map_renders/*.{png,jpg,jpeg,svg,webp,gif}', { 
  eager: true, 
  import: 'default' 
})
const mapRenderImagesArray = Object.values(mapRenderImagesGlob)

/**
  * Static media order and metadata configurations.
  * @private
  */
const mediaOrderConfig = [
  {
    fileName: 'dogten.jpg',
    alt: '???',
    caption: 'Dogten',
    visible: true
  },
  {
    fileName: 'ninten_67.gif', 
    alt: 'Ninten doing 67',
    caption: '67',
    visible: true
  },
  {
    fileName: 'itoi.mp4',
    type: 'video',
    alt: 'Itoi video',
    caption: 'Shigesato Itoi',
    visible: true
  },
  {
    fileName: 'whatsapp pippi.mp4',
    type: 'video',
    alt: 'Whatsapp Pippi',
    caption: 'Pippi',
    visible: true
  },
  {
    fileName: 'squirrel.png',
    alt: 'Squirrel',
    caption: '',
    visible: true
  },
  {
    fileName: 'ninten_Dough.png',
    alt: 'Ninten Dough',
    caption: 'Dough',
    visible: true
  },
  {
    fileName: 'lloyd_suicide.png',
    alt: '???',
    caption: 'Every Encore Dev',
    visible: true
  },
  {
    fileName: 'found_atm_magicant.png',
    alt: '???',
    caption: 'Wheres it',
    visible: true
  },
  {
    fileName: 'oh_my_full_name.png',
    alt: '???',
    caption: 'Oh My Full Name',
    visible: true
  },
  {
    fileName: 'pippi.png',
    alt: '???',
    caption: '???',
    visible: true
  },
  {
    fileName: 'ferris_special_mixtape.png',
    alt: '???',
    caption: 'Special',
    visible: true
  },
  {
    fileName: 'Lloyd_I_have_a_crush_on_you.png',
    alt: '???',
    caption: 'Gay',
    visible: true
  }
]

/**
  * Computed list of options for the options modal.
  * @private
  */
const modalOptions = computed(() => [
  { key: "replace_banner_for_map_renders", label: t('SITE_DOGTEN_OPTIONS_OP1') },
  { key: "unlocked_special_tape"         , label: t('SITE_DOGTEN_OPTIONS_OP2') }
])

/**
  * Filtered and mapped collection of active media items.
  * @private
  */
const sampleMediaItems = ref(
  mediaOrderConfig
    .map(config => {

      const matchedPath = Object.keys(funnyModules).find(path => path.endsWith('/' + config.fileName))
      
      if (!matchedPath) return null 

      const src = funnyModules[matchedPath]
      const isVideo = config.fileName.endsWith('.mp4')

      return {
        type: config.type || (isVideo ? 'video' : 'image'),
        src: src,
        alt: config.alt || '???',
        caption: config.caption || '???',
        visible: config.visible !== undefined ? config.visible : true
      }
    })
    .filter(item => item !== null && item.visible)
)

/**
  * Tracks visibility states for modals and carousel active indices.
  * @private
  */
const isOptionsModalOpen = ref(false)
const isMediaModalOpen = ref(false)
const currentIndex = ref(0)

/**
  * Opens the media viewer modal for a specified media item.
  * @param {Object} item The selected media item object.
  * @private
  */
const openModal = (item) => {
  const index = sampleMediaItems.value.findIndex(m => m.src === item.src)
  if (index !== -1) {
    currentIndex.value = index
    isMediaModalOpen.value = true
  }
}

/**
  * Closes the media viewer modal.
  * @private
  */
const closeModal = () => {
  isMediaModalOpen.value = false
}

/**
  * Advances the media viewer to the next item.
  * @private
  */
const nextMedia = () => {
  currentIndex.value = (currentIndex.value + 1) % sampleMediaItems.value.length
}

/**
  * Moves the media viewer back to the previous item.
  * @private
  */
const prevMedia = () => {
  currentIndex.value = (currentIndex.value - 1 + sampleMediaItems.value.length) % sampleMediaItems.value.length
}

/**
  * Handles changes made within the options modal.
  * @param {Object} payload Event payload containing key and value updates.
  * @private
  */
const handleModalChange = ({ key, value }) => {
  if (key === 'unlocked_dogten') {
    sessionStorage.setItem('unlocked_dogten', value ? 'true' : 'false')
  }
  if (key === 'unlocked_special_tape') {
    const stringVal = value ? 'true' : 'false'
    sessionStorage.setItem('unlocked_special_tape', stringVal)
    window.dispatchEvent(new CustomEvent('special-tape-updated', { detail: { value } }))
  }
}

onMounted(() => {
  if (sessionStorage.getItem('unlocked_dogten') === null) {
    sessionStorage.setItem('unlocked_dogten', 'false')
  }
})
</script>

<style scoped>
.main-content {
  width             : 100%;
  max-width         : 100%;
  box-sizing        : border-box;
  overflow-x        : hidden;
}

.galery-container {
  width             : 100%;
  max-width         : 900px;
  margin            : 0 auto;
  padding           : clamp(20px, 4vw, 40px) clamp(12px, 3vw, 20px);
  display           : flex;
  flex-direction    : column;
  gap               : 12px;
  box-sizing        : border-box;
}

.button-wrapper {
  display               : flex;
  justify-content       : center;
  margin-bottom         : clamp(12px, 2.5vw, 20px);
  position              : relative;
  width                 : 100%;
}
</style>