<template>
  <div 
    class="playlist-container"
    :style="containerStyles"
  >
    <div class="playlist-header">
      <h3 class="playlist-title">{{ t('SITE_MUSIC_PLAYER_TRACK_LIST') }}</h3>
      <SocialMediaButton 
        platform        = "youtube" 
        color           = "#ffffff" 
        hoverColor      = "var(--music-player-color-accent)" 
        size            = "30px"
        :tooltipText   = "t('SITE_MUSIC_PLAYER_LINK')"
        toolTipPosition = "left"
      />
    </div>

    <div class="playlist-content">
      <div class="playlist-body-area">
        <div v-if="isLoadingTracks" class="loading-state">Loading...</div>
        <ul v-else class="track-list">
          <li 
            v-for        = "(track, index) in paginatedTracks" 
            :key         = "track.id"
            class        = "track-item"
            :class       = "{ active: currentTrackIndex === getGlobalIndex(index) }"
            @click       = "$emit('playTrack', index)"
          >
            <span class="track-number">{{ getGlobalIndex(index) + 1 }}</span>
            <span class="track-name">{{ track.title }}</span>
          </li>
        </ul>
      </div>

      <div 
        class  = "pagination-controls" 
        :class = "{ 'is-hidden': isLoadingTracks || totalPages <= 1 }"
      >
        <CustomButton
          :bgColor          = "playlistButtonBg"
          :hoverBgColor     = "playlistButtonHoverBg"
          :iconSrc          = "previous_icon"
          :iconColor        = "playlistButtonIconColor"
          :hoverIconColor   = "playlistButtonHoverIconColor"
          height            = "30px"  
          width             = "30px"    
          iconSize          = "20px"
          padding           = "0"
          :disabled         = "currentPage === 1"
          aria-label        = "Previous track page"
          @click            = "$emit('updatePage', currentPage - 1)"
        />
        <span class="page-info">{{ currentPage }} / {{ totalPages }}</span>
        <CustomButton
          :bgColor          = "playlistButtonBg"
          :hoverBgColor     = "playlistButtonHoverBg"
          :iconSrc          = "next_icon"
          :iconColor        = "playlistButtonIconColor"
          :hoverIconColor   = "playlistButtonHoverIconColor"
          height            = "30px"  
          width             = "30px"    
          iconSize          = "20px"
          padding           = "0"
          :disabled         = "currentPage === totalPages"
          aria-label        = "Next track page"
          @click            = "$emit('updatePage', currentPage + 1)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
/**
  * @file        music_player_playlist.vue
  * @brief       Music player playlist component displaying paginated track listings, current track states, loading indicators, and pagination navigation controls.
  * @displayName Music Player Playlist
*/

import { computed } from 'vue'
import { useI18n }  from '@/composables/useI18n'

import SocialMediaButton from '@/components/reusables/social_media_button.vue'
import CustomButton      from '@/components/reusables/custom_button.vue'

import previous_icon from '@/assets/svg/triangle-left-12-filled.svg'
import next_icon     from '@/assets/svg/triangle-right-12-filled.svg'

const props = defineProps({
  /**
    * Indicates whether the track list is currently in a loading state.
    * @public
    */
  isLoadingTracks: {
    type: Boolean,
    default: false
  },
  /**
    * Array of tracks to display for the current page view.
    * @public
    */
  paginatedTracks: {
    type: Array,
    default: () => []
  },
  /**
    * Index of the track that is currently playing globally.
    * @public
    */
  currentTrackIndex: {
    type: Number,
    default: -1
  },
  /**
    * The current active pagination page number.
    * @public
    */
  currentPage: {
    type: Number,
    default: 1
  },
  /**
    * Total number of available pages.
    * @public
    */
  totalPages: {
    type: Number,
    default: 1
  },
  /**
    * Helper function to calculate the global track index from a local page index.
    * @public
    */
  getGlobalIndex: {
    type: Function,
    required: true
  },
  /**
    * Number of items to display per page, controlling container height dynamically.
    * @public
    */
  pageSize: {
    type: Number,
    default: 7
  },
  /**
    * Background color of the main playlist container.
    * @public
    */
  bgColor: {
    type: String,
    default: 'var(--music-player-playlist-bg)'
  },
  /**
    * Border style/color used for container elements and track rows.
    * @public
    */
  borderColor: {
    type: String,
    default: 'var(--music-player-playlist-border)'
  },
  /**
    * Border radius for rounded container corners.
    * @public
    */
  borderRadius: {
    type: String,
    default: 'var(--music-player-playlist-border-radius)'
  },
  /**
    * Background color of the header section.
    * @public
    */
  headerBgColor: {
    type: String,
    default: 'var(--music-player-playlist-header-bg)'
  },
  /**
    * Text/title color inside the header section.
    * @public
    */
  headerTextColor: {
    type: String,
    default: 'var(--music-player-playlist-header-text)'
  },
  /**
    * Default background color for list tracks.
    * @public
    */
  itemBgColor: {
    type: String,
    default: 'var(--music-player-playlist-item-bg)'
  },
  /**
    * Background color for the currently playing track.
    * @public
    */
  itemActiveBgColor: {
    type: String,
    default: 'var(--music-player-playlist-item-active-bg)'
  },
  /**
    * Text color for the currently playing track.
    * @public
    */
  itemActiveTextColor: {
    type: String,
    default: 'var(--music-player-playlist-item-active-text)'
  },
  /**
    * General text color inside track items.
    * @public
    */
  textColor: {
    type: String,
    default: 'var(--music-player-playlist-text-color)'
  },
  /**
    * Color for track numbers in normal state.
    * @public
    */
  numberColor: {
    type: String,
    default: 'var(--music-player-playlist-number-color)'
  },
  /**
    * Color for track numbers when active.
    * @public
    */
  numberActiveColor: {
    type: String,
    default: 'var(--music-player-playlist-number-active-color)'
  },
  /**
    * Background color of the loading state box.
    * @public
    */
  loadingBgColor: {
    type: String,
    default: 'var(--music-player-playlist-loading-bg)'
  },
  /**
    * Text color of the loading state message.
    * @public
    */
  loadingTextColor: {
    type: String,
    default: 'var(--music-player-playlist-loading-text)'
  },
  /**
    * Text color for the page pagination counter info.
    * @public
    */
  pageInfoColor: {
    type: String,
    default: 'var(--music-player-playlist-page-info-color)'
  },
  /**
    * Background color of pagination buttons.
    * @public
    */
  playlistButtonBg: {
    type: String,
    default: 'var(--music-player-playlist-button-bg)'
  },
  /**
    * Hover background color of pagination buttons.
    * @public
    */
  playlistButtonHoverBg: {
    type: String,
    default: 'var(--music-player-playlist-button-hover-bg)'
  },
  /**
    * Icon color of pagination buttons.
    * @public
    */
  playlistButtonIconColor: {
    type: String,
    default: 'var(--music-player-playlist-button-icon-color)'
  },
  /**
    * Hover icon color of pagination buttons.
    * @public
    */
  playlistButtonHoverIconColor: {
    type: String,
    default: 'var(--music-player-playlist-button-hover-icon-color)'
  }
})

/**
  * Emitted track interaction and pagination page change events.
  * @public
  */
defineEmits(['playTrack', 'updatePage'])

/**
  * Internationalization translation hook instance.
  * @private
  */
const { t } = useI18n()

/**
  * Consolidated style object mapping props to CSS variables without style injector overhead.
  * @private
  */
const containerStyles = computed(() => ({
  '--page-size': props.pageSize,
  '--pl-bg': props.bgColor,
  '--pl-border': props.borderColor,
  '--pl-radius': props.borderRadius,
  '--pl-header-bg': props.headerBgColor,
  '--pl-header-text': props.headerTextColor,
  '--pl-item-bg': props.itemBgColor,
  '--pl-item-active-bg': props.itemActiveBgColor,
  '--pl-item-active-text': props.itemActiveTextColor,
  '--pl-text': props.textColor,
  '--pl-num': props.numberColor,
  '--pl-num-active': props.numberActiveColor,
  '--pl-loading-bg': props.loadingBgColor,
  '--pl-loading-text': props.loadingTextColor,
  '--pl-page-info': props.pageInfoColor
}))
</script>

<style scoped>
.playlist-container {
  display               : flex;
  flex-direction        : column;
  gap                   : 8px;
  background            : var(--pl-bg);
  border                : var(--pl-border);
  padding               : 10px;
  border-radius         : var(--pl-radius);
  box-sizing            : border-box;
  width                 : 100%;
  overflow              : visible;
}

.playlist-header {
  display               : flex;
  justify-content       : space-between;
  align-items           : center;
  background            : var(--pl-header-bg);
  border                : var(--pl-border);
  border-radius         : var(--pl-radius);
  padding               : 8px 12px;
  user-select           : none;

}

.playlist-title {
  font-family           : var(--music_player-font-p);
  font-size             : 0.8rem;
  margin                : 0;
  font-weight           : 700;
  color                 : var(--pl-header-text);
}

.playlist-content {
  display               : flex;
  flex-direction        : column;
  gap                   : 6px;
  height                : calc(var(--page-size, 7) * 36px + 45px);
  max-height            : 60vh;
  justify-content       : space-between;
  overflow              : visible;
  box-sizing            : border-box;
  transition            : height 0.3s ease;
}

.playlist-body-area {
  display               : flex;
  flex-direction        : column;
  flex                  : 1;
  overflow              : hidden;
}

.loading-state {
  display               : flex;
  justify-content       : center;
  align-items           : center;
  flex                  : 1;
  color                 : var(--pl-loading-text);
  font-size             : 0.8rem;
  background            : var(--pl-loading-bg);
  border-radius         : 6px;
  font-family           : monospace;
}

.track-list {
  list-style            : none;
  padding               : 0;
  padding-right         : 4px;
  margin                : 0;
  display               : flex;
  flex-direction        : column;
  gap                   : 4px;
  flex                  : 1;
  overflow-y            : auto;
  font                  : var(--music_player-font-p);
  font-size             : var(--music_player-font-p-size);
  padding-bottom        : 4px;
  
  scrollbar-width       : thin;
  scrollbar-color       : var(--music-player-color-accent) var(--music-player-color-bg-main);

  -webkit-overflow-scrolling: touch;
}

.track-list::-webkit-scrollbar {
  width                 : 6px;
  -webkit-appearance    : none;
}

.track-list::-webkit-scrollbar-track {
  background            : var(--music-player-color-bg-main);
  border-radius         : 3px;
}

.track-list::-webkit-scrollbar-thumb {
  background            : var(--music-player-color-accent);
  border-radius         : 3px;
}

.track-item {
  display               : flex;
  align-items           : center;
  gap                   : 8px;
  padding               : 6px 8px;
  background            : var(--pl-item-bg);
  border                : var(--pl-border);
  border-radius         : 6px;
  cursor                : pointer;
  box-sizing            : border-box;
  width                 : 100%;
  max-width             : 100%;
  color                 : var(--pl-text);
}

.track-item:active {
  transform             : translateY(2px);
}

.track-item.active {
  background            : var(--pl-item-active-bg);
  color                 : var(--pl-item-active-text);
}

.track-number {
  font                  : var(--music_player-font-p);
  font-size             : var(--music_player-font-track-names-size);
  flex-shrink           : 0;
}

.track-item.active .track-number {
  color                 : var(--pl-num-active);
}

.track-name {
  white-space           : nowrap;
  overflow              : hidden;
  text-overflow         : ellipsis;
  font-family           : var(--music_player-font-p);
  font-size             : var(--music_player-font-track-names-size);
  flex                  : 1;
  min-width             : 0;
}

.pagination-controls {
  display               : flex;
  justify-content       : space-between;
  align-items           : center;
  padding               : 4px 2px;
  height                : 36px;
  box-sizing            : border-box;
  transition            : opacity 0.2s ease;
  overflow              : visible;
  opacity               : 1;
  pointer-events        : auto;
}

.pagination-controls.is-hidden {
  opacity               : 0;
  pointer-events        : none;
}

.pagination-controls :deep(.custom-btn) {
  overflow              : visible !important;
}

.page-info {
  font-size             : 0.75rem;
  color                 : var(--pl-page-info);
  font-family           : monospace;
}
</style>