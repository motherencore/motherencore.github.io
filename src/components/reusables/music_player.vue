<template>
  <div class="music-player-container" :class="{ 'special-tape-palette': isSpecialStyle }">
    <div 
      class     = "music-player-wrapper" 
      :class    = "{ 
        'is-open'       : isOpen, 
        'is-ready'      : isReady, 
        'compact-mode'  : isPlayerHidden 
      }"
      :style    = "{ 
        bottom     : playerBottom + 'px',
        left       : (isCentered || footerBehavior === 'center') ? '50%' : '16px',
        right      : 'auto',
        transform  : (isCentered || footerBehavior === 'center') ? 'translateX(-50%)' : 'none',
        opacity    : isHidden ? 0 : undefined,
        visibility : isHidden ? 'hidden' : 'visible'
      }"
    >
      <div class="hidden-player">
        <div id="youtube-player"></div>
      </div>

      <Transition name="compact-pop" @leave="onCompactLeave">
        <div v-if="isPlayerHidden" class="compact-button-wrapper">
          <CustomButton 
            class            = "compact-button"
            width            = "var(--music_player-compact-button-size)"
            height           = "var(--music_player-compact-button-size)"
            iconSize         = "var(--music_player-compact-button-icon-size)"
            bgColor          = "var(--music_player-compact-button-color-bg)"
            hoverBgColor     = "var(--music_player-compact-button-color-bg-hover)"
            iconColor        = "var(--music_player-compact-button-color-icon)"
            hoverIconColor   = "var(--music_player-compact-button-color-icon-hover)"
            :iconSrc         = "musicNoteSvg"
            @click           = "isPlayerHidden = false; isPlayerHiddenAction = false"
          />

          <FloatingNotes 
            speed            = "1.2s"
            distance         = "-60px"            
            :active          = "isPlaying" 
            :colors          = "['#00cec9', '#fd79a8', '#ffeaa7']"
          />
        </div>
      </Transition>

      <Transition name="slide-out-left" @after-leave="isPlayerHidden = true">
        <div v-if="!isPlayerHiddenAction" class="player-outer-layout" :class="[`player-orientation-${orientation}`]">
          <div class="player-card">
            <div class="player-control-bar">
              <div class="control-bar-buttons">
                <CustomButton 
                  class            = "secondary-action-btn"
                  aria-label       = "Minimize Player"
                  width            = "auto"
                  height           = "auto"
                  padding          = "2px 8px"
                  bgColor          = "transparent"
                  hoverBgColor     = "transparent"
                  border           = "none"
                  :iconSrc         = "triangleLeftSvg"
                  iconSize         = "22px"
                  :iconColor       = "currentIconColor"
                  :hoverIconColor  = "currentHoverIconColor"
                  @click           = "isPlayerHiddenAction = true; isOpen = false"
                />

                <CustomButton 
                  class            = "expand-toggle-btn" 
                  :aria-label      = "isOpen ? 'Collapse Player' : 'Expand Player'"
                  width            = "auto"
                  height           = "auto"
                  padding          = "2px 8px"
                  bgColor          = "transparent"
                  hoverBgColor     = "transparent"
                  border           = "none"
                  :iconSrc         = "triangleUpSvg"
                  iconSize         = "22px"
                  :iconColor       = "currentIconColor"
                  :hoverIconColor  = "currentHoverIconColor"
                  :style           = "{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s ease' }"
                  @click           = "isOpen = !isOpen" 
                />
              </div>

              <PlayerControls 
                :playlistId         = "playlistId"
                :isPlaying          = "isPlaying" 
                :isRecording        = "isRecording"
                :prevIconColor      = "currentIconColor"
                :prevHoverIconColor = "currentHoverIconColor"
                :playIconColor      = "currentIconColor"
                :playHoverIconColor = "currentHoverIconColor"
                :stopIconColor      = "currentIconColor"
                :stopHoverIconColor = "currentHoverIconColor"
                :nextIconColor      = "currentIconColor"
                :nextHoverIconColor = "currentHoverIconColor"
                :recIconColor       = "currentIconColor"
                :recHoverIconColor  = "currentHoverIconColor"
                @prev               = "changeTrack(-1)"
                @togglePlay         = "togglePlay"
                @stop               = "stopPlayer"
                @next               = "changeTrack(1)"
                @record             = "handleRecClick"
              />
            </div>

            <div class="player-collapsible-content">
              <WalkmanDevice 
                class                 = "mobile-hidden-walkman"
                :isPlaying            = "isPlaying"
                :hasSpecialTapeAccess = "hasSpecialTapeAccess"
                :showImageTape        = "showImageTape"
                :currentTrackIndex    = "currentTrackIndex"
                :currentTime          = "currentTime"
                :duration             = "duration"
                :specialTapeImg       = "ferris_special_tape"
                :formatTime           = "formatTime"
                @toggleTapeStyle      = "toggleTapeStyle"
                @seek                 = "onSeek"
              />

              <PlaylistView 
                :isLoadingTracks    = "isLoadingTracks"
                :paginatedTracks    = "paginatedTracks"
                :currentTrackIndex  = "currentTrackIndex"
                :currentPage        = "currentPage"
                :totalPages         = "totalPages"
                :getGlobalIndex     = "(i) => (currentPage - 1) * pageSize + i"
                @playTrack          = "playTrack"
                @updatePage         = "(val) => currentPage = val"
              />
            </div>
          </div>

          <VolumeControl 
            :volumeLayout       = "volumeLayout"
            :volume             = "volume"
            :isMuted            = "isMuted"
            :orientation        = "orientation"
            @wheelVolume        = "onWheelVolume"
            @volumeChange       = "onVolumeChange"
            @toggleMute         = "toggleMute"
          />
        </div>
      </Transition>
    </div>

    <ToasterNotification 
      type      = "info"
      position  = "top-left"
      :duration = "4000"
      v-model   = "showToast"
      :message  = "toastMessage"
      :icon     = "toastIcon"
      @close    = "toastIcon = defaultToastIcon"
    />
  </div>
</template>

<script setup>
/**
  * @file        music_player_2.vue
  * @brief       Main music player component handling YouTube playback, state management, layouts, and subcomponent coordination.
  * @displayName Music Player 2
*/

import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useI18n }    from '@/composables/useI18n'
import { useRouter }  from 'vue-router'

import ToasterNotification  from '@/components/reusables/notification_toaster.vue'
import CustomButton         from '@/components/reusables/custom_button.vue'
import PlayerControls       from '@/components/reusables/music_player_controls.vue'
import WalkmanDevice        from '@/components/reusables/music_player_walkman.vue'
import PlaylistView         from '@/components/reusables/music_player_playlist.vue'
import VolumeControl        from '@/components/reusables/music_player_volume_control.vue'
import FloatingNotes        from '@/components/reusables/music_player_floating_notes.vue'

import musicNoteSvg         from '@/assets/svg/music-note-4-svgrepo-com.svg'
import triangleLeftSvg      from '@/assets/svg/triangle-left-12-filled.svg'
import triangleUpSvg        from '@/assets/svg/triangle-up-12-filled.svg'
import nintenBoppinIcon     from '@/assets/img/characters/Ninten_Boppin.gif'
import ninten67Icon         from '@/assets/img/funny/Ninten_67.gif'
import ferris_special_tape  from '@/assets/img/funny/ferris_special_mixtape.png'

const router = useRouter()
const { t } = useI18n()

const props = defineProps({
  /**
    * The YouTube playlist ID or full playlist URL.
    * @public
    */
  playlistId: { 
    type     : String, 
    required : true 
  },
  /**
    * The number of tracks to display per page in the playlist view.
    * @public
    */
  pageSize: { 
    type    : Number, 
    default : 7 
  },
  /**
    * Determines how the player reacts when overlapping the page footer.
    * @public
    */
  footerBehavior: { 
    type    : String, 
    default : 'center' 
  },
  /**
    * The layout style used for the volume control component.
    * @public
    */
  volumeLayout: { 
    type    : String, 
    default : 'wheel' 
  },
  /**
    * Defines the behavior style when the player is minimized.
    * @public
    */
  minimizedBehavior: { 
    type    : String, 
    default : 'default' 
  },
  /**
    * Sets the outer layout orientation of the player.
    * @public
    */
  orientation: { 
    type    : String, 
    default : 'horizontal' 
  }
})

const isOpen                 = ref(false)
const isPlayerHidden         = ref(true)
const isPlayerHiddenAction   = ref(true)
const isPlaying              = ref(false)
const isRecording            = ref(false)
const recClickCount          = ref(0)
const currentTrackIndex      = ref(0)
const currentTime            = ref(0)
const duration               = ref(0)
const volume                 = ref(20)
const isMuted                = ref(false)
const tracks                 = ref([])
const currentPage            = ref(1)
const isLoadingTracks        = ref(true)
const showImageTape          = ref(false)
const isSpecialStyle         = ref(false)
const hasSpecialTapeAccess   = ref(sessionStorage.getItem('unlocked_special_tape') === 'true')

const playerBottom           = ref(16)
const isCentered             = ref(false)
const isHidden               = ref(false)
const isReady                = ref(false)

const showToast              = ref(false)
const toastMessage           = ref('')
const defaultToastIcon       = ref(nintenBoppinIcon)
const toastIcon              = ref(nintenBoppinIcon)

let player                   = null
let progressInterval         = null
let lastVolume               = 80

const totalPages             = computed(() => tracks.value.length ? Math.ceil(tracks.value.length / props.pageSize) : 1)
const paginatedTracks        = computed(() => tracks.value.slice((currentPage.value - 1) * props.pageSize, currentPage.value * props.pageSize))

const currentIconColor       = computed(() => 'var(--music-player-color-bg-secondary)')
const currentHoverIconColor  = computed(() => 'var(--music-player-color-bg-secondary)')

/**
  * Formats track duration seconds into a human-readable mm:ss string.
  * @private
  * @param {number} secs - The track duration or current time in seconds.
  * @returns {string} The formatted time string (e.g., '3:45').
  */
const formatTime = (secs) => {
  const TimeBuilder = {
    isInvalid(s) { return isNaN(s) || s <= 0 },
    build(s) {
      const m = Math.floor(s / 60)
      const r = Math.floor(s % 60)
      return `${m}:${r < 10 ? '0' : ''}${r}`
    }
  }
  return TimeBuilder.isInvalid(secs) ? '0:00' : TimeBuilder.build(secs)
}

/**
  * Extracts a clean YouTube playlist identifier or URL string.
  * @private
  * @param {string} val - The raw playlist identifier or URL prop value.
  * @returns {string} The isolated playlist ID string.
  */
const extractPlaylistId = (val) => {
  const IdBuilder = {
    isEmpty(v) { return !v },
    isPlain(v) { return !v.includes('http') },
    clean(v) { return v.trim() },
    fromUrl(v) {
      try { return new URL(v).searchParams.get('list') || v } catch { return v }
    }
  }
  if (IdBuilder.isEmpty(val)) return ''
  if (IdBuilder.isPlain(val)) return IdBuilder.clean(val)
  return IdBuilder.fromUrl(val)
}

/**
  * Calculates footer overlap and updates player positioning dynamically on scroll.
  * @private
  */
const updateFooterPosition = () => {
  const FooterBuilder = {
    getElement() { return document.querySelector('.footer-container') },
    getOverlap(el) { return window.innerHeight - el.getBoundingClientRect().top }
  }

  const footer = FooterBuilder.getElement()
  if (!footer) {
    playerBottom.value = 30
    isReady.value = true
    return
  }

  const overlap = FooterBuilder.getOverlap(footer)
  isCentered.value = false
  isHidden.value = false
  playerBottom.value = 16

  if (overlap > 0) {
    if (props.footerBehavior === 'hide') isHidden.value = true
    else if (props.footerBehavior === 'center') isCentered.value = true
    playerBottom.value = overlap + 16
  }
  isReady.value = true
}

/**
  * Injects the YouTube iframe API script into the document IF missing.
  * @private
  */
const initPlayer = () => {
  if (!window.YT) {
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    document.getElementsByTagName('script')[0].parentNode.insertBefore(tag, document.getElementsByTagName('script')[0])
    window.onYouTubeIframeAPIReady = createPlayer
  } else {
    createPlayer()
  }
}

/**
  * Instantiates the YouTube player object and registers event handlers.
  * @private
  */
const createPlayer = () => {
  player = new window.YT.Player('youtube-player', {
    height     : '200', 
    width      : '200',
    playerVars : { autoplay: 0, controls: 0, enablejsapi: 1, origin: window.location.origin },
    events     : {
      onReady: (e) => {
        if (props.playlistId) {
          e.target.setVolume(volume.value)
          e.target.cuePlaylist({ list: extractPlaylistId(props.playlistId), listType: 'playlist' })
          setTimeout(syncState, 800)
        }
      },
      onStateChange: (e) => {
        if (e.data === window.YT.PlayerState.PLAYING) {
          isPlaying.value = true
          startInterval()
          syncState()
          toastMessage.value = `${t('SITE_MUSIC_PLAYER_TOASTER_NOTIF')}: ${tracks.value[currentTrackIndex.value]?.title || 'Track'}`
          showToast.value = true
        } else if (e.data === window.YT.PlayerState.PAUSED || e.data === window.YT.PlayerState.ENDED) {
          showToast.value = false
          isPlaying.value = false
          stopInterval()
          if (e.data === window.YT.PlayerState.ENDED) changeTrack(1)
        }
      }
    }
  })
}

/**
  * Syncs the player state and asynchronously fetches track metadata titles in batches.
  * @private
  */
const syncState = async () => {
  if (!player?.getPlaylist) return
  const ids = player.getPlaylist()
  if (ids?.length && tracks.value.length !== ids.length) {
    tracks.value = ids.map((id, idx) => ({ id, title: `Track ${idx + 1}` }))
    isLoadingTracks.value = true
    const batchSize = 2
    for (let i = 0; i < ids.length; i += batchSize) {
      const batch = ids.slice(i, i + batchSize)
      await Promise.all(
        batch.map(async (id, batchIdx) => {
          const actualIdx = i + batchIdx
          let titleFound = false

          for (let attempt = 0; attempt < 2 && !titleFound; attempt++) {
            try {
              const res = await fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${id}&format=json`)
              const data = await res.json()
              if (data?.title) {
                tracks.value[actualIdx].title = data.title
                titleFound = true
              }
            } catch {}
            if (!titleFound) {
              await new Promise(r => setTimeout(r, 200))
            }
          }

          if (!titleFound) {
            try {
              const res = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`)
              const data = await res.json()
              if (data?.title) {
                tracks.value[actualIdx].title = data.title
              }
            } catch {}
          }
        })
      )
      
      if (i + batchSize < ids.length) {
        await new Promise((resolve) => setTimeout(resolve, 300))
      }
    }
    isLoadingTracks.value = false
  }
  const index = player.getPlaylistIndex()
  if (index >= 0) {
    currentTrackIndex.value = index
    currentPage.value = Math.floor(index / props.pageSize) + 1
  }
  duration.value = player.getDuration() || 0
}

/**
  * Starts an interval timer to update playback progress tracking.
  * @private
  */
const startInterval = () => {
  stopInterval()
  progressInterval = setInterval(() => {
    if (player?.getCurrentTime && isPlaying.value) {
      currentTime.value = player.getCurrentTime()
      duration.value = player.getDuration() || duration.value
    }
  }, 200)
}

/**
  * Clears the active progress tracking interval timer.
  * @private
  */
const stopInterval = () => clearInterval(progressInterval)

/**
  * Toggles playback state between playing and paused.
  * @private
  */
const togglePlay = () => {
  if (!player) return
  player.getPlayerState() === window.YT.PlayerState.PLAYING ? player.pauseVideo() : player.playVideo()
}

/**
  * Stops playback completely and resets current seek positions.
  * @private
  */
const stopPlayer = () => {
  if (!player) return
  player.stopVideo?.() || (player.pauseVideo(), player.seekTo?.(0, true))
  isPlaying.value = false
  currentTime.value = 0
  stopInterval()
}

/**
  * Changes to the next or previous track in the playlist index.
  * @private
  * @param {number} direction - Positive value for next track, negative for previous.
  */
const changeTrack = (direction) => {
  if (!player) return
  direction > 0 ? player.nextVideo?.() : player.previousVideo?.()
  setTimeout(syncState, 400)
}

/**
  * Jumps to and plays a specific track index within the playlist.
  * @private
  * @param {number} index - The target track index.
  */
const playTrack = (index) => {
  const globalIdx = (currentPage.value - 1) * props.pageSize + index
  currentTrackIndex.value = globalIdx
  player?.playVideoAt?.(globalIdx)
  setTimeout(syncState, 400)
}

/**
  * Seeks playback to a specific timestamp based on input events.
  * @private
  * @param {Event} e - The input change event containing target values.
  */
const onSeek = (e) => {
  currentTime.value = parseFloat(e.target.value)
  player?.seekTo?.(currentTime.value, true)
}

/**
  * Updates the audio player volume level from slider inputs.
  * @private
  * @param {Event} e - The input change event containing volume values.
  */
const onVolumeChange = (e) => {
  volume.value = parseFloat(e.target.value)
  if (isMuted.value) { isMuted.value = false; player?.unMute?.() }
  player?.setVolume?.(volume.value)
}

/**
  * Adjusts volume levels incrementally using mouse scroll wheel delta values.
  * @private
  * @param {WheelEvent} e - The mouse wheel scroll event.
  */
const onWheelVolume = (e) => {
  const VolumeBuilder = {
    calculate(cur, delta) {
      const step = delta < 0 ? 5 : -5
      return Math.max(0, Math.min(100, cur + step))
    }
  }
  volume.value = VolumeBuilder.calculate(volume.value, e.deltaY)
  if (isMuted.value) { isMuted.value = false; player?.unMute?.() }
  player?.setVolume?.(volume.value)
}

/**
  * Toggles audio muting state and retains previous active volume levels.
  * @private
  */
const toggleMute = () => {
  if (!player) return
  if (isMuted.value) {
    isMuted.value = false
    volume.value = lastVolume
    player.unMute?.()
    player.setVolume?.(volume.value)
  } else {
    isMuted.value = true
    lastVolume = volume.value
    volume.value = 0
    player.mute?.()
    player.setVolume?.(0)
  }
}

/**
  * Toggles tape image display state and special style palette.
  * @private
  */
const toggleTapeStyle = () => {
  showImageTape.value = !showImageTape.value
  isSpecialStyle.value = !isSpecialStyle.value
}

/**
  * Handles recording button interactions and triggers secret easter eggs upon threshold hits.
  * @private
  */
const handleRecClick = () => {
  isRecording.value = !isRecording.value
  //67 NUMBER OF CLICKS HERE !!!!!!!!!!
  if (++recClickCount.value >= 67) {
    recClickCount.value = 0
    toastMessage.value  = '67'
    showToast.value     = true
    toastIcon.value     = ninten67Icon
    sessionStorage.setItem('unlocked_dogten', 'true')
    setTimeout(() => router.push('/dogten'), 1500)
  }
}

/**
  * Handles real-time updates when the special tape option changes.
  * @private
  */
const handleSpecialTapeUpdate = (e) => {
  hasSpecialTapeAccess.value = e.detail.value
  if (!e.detail.value) {
    isSpecialStyle.value = false
    showImageTape.value = false
  }
}

onMounted(() => {
  initPlayer()
  window.addEventListener('scroll', updateFooterPosition, { passive: true })
  window.addEventListener('special-tape-updated', handleSpecialTapeUpdate)
  setTimeout(updateFooterPosition, 50)
})

onUnmounted(() => {
  stopInterval()
  window.removeEventListener('scroll', updateFooterPosition)
  window.removeEventListener('special-tape-updated', handleSpecialTapeUpdate)
})
/**
  * Resets inline element transition styles when closing the compact player button.
  * @private
  * @param {HTMLElement} el - The DOM element leaving view.
  */
const onCompactLeave = (el) => {
  el.style.opacity    = '0'
  el.style.visibility = 'hidden'
  el.style.transition = 'none'
}
</script>

<style scoped>
@keyframes playerEntrance {
  0%   { opacity: 0; transform: translateY(60px) scale(0.92); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}

@keyframes floatNote {
  0%   { opacity: 0; transform: translateY(0) scale(0.5) rotate(-10deg); }
  30%  { opacity: 1; }
  100% { opacity: 0; transform: translateY(var(--note-float-distance, -50px)) translateX(12px) scale(1.1) rotate(15deg); }
}

.music-player-container {
  box-sizing  : border-box;
  max-width   : 100vw;
  overflow-x  : hidden;
}

.music-player-wrapper {
  position    : fixed;
  max-width   : calc(100vw - 24px);
  z-index     : 21;
  display     : flex;
  flex-direction: column;
  width       : auto;
  box-sizing  : border-box;
  pointer-events: none;
  opacity     : 0;
  visibility  : hidden;
  transition  : left 0.2s ease-out, right 0.2s ease-out, opacity 0.2s ease-out, visibility 0.2s ease-out;
}

.music-player-wrapper.is-ready {
  visibility  : visible;
  animation   : playerEntrance 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.compact-pop-enter-active { 
  transition  : all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); 
}

.compact-pop-enter-from, 
.compact-pop-leave-to { 
  opacity     : 0; 
  transform   : scale(0.4) translateY(20px); 
}

.slide-out-left-enter-active { 
  transition  : all 0.35s cubic-bezier(0.16, 1, 0.3, 1); 
}

.slide-out-left-leave-active { 
  transition  : all 0.35s cubic-bezier(0.4, 0, 0.2, 1); 
}

.slide-out-left-enter-from { 
  opacity     : 0; 
  transform   : translateX(-50px); 
}

.slide-out-left-leave-to { 
  opacity     : 0; 
  transform   : translateX(-120%); 
}

.compact-button-wrapper { 
  pointer-events: auto; 
  width       : fit-content;
  align-self  : flex-start; 
}

.compact-button { 
  margin-bottom : 0; 
}

.player-outer-layout {
  pointer-events: auto;
  display     : flex;
  align-items : flex-start;
  gap         : 12px;
  width       : 100%;
  box-sizing  : border-box;
  overflow    : visible;
}

.player-outer-layout.player-orientation-vertical { 
  flex-direction: row; 
  align-items : flex-start; 
}

.player-outer-layout.player-orientation-vertical-flipped { 
  flex-direction: row-reverse; 
  align-items : flex-start; 
}

.player-outer-layout.player-orientation-horizontal,
.player-outer-layout.player-orientation-horizontal-flipped {
  width       : 100%;
  flex-direction: column;
  align-items : stretch;
  gap         : 8px;
  box-sizing  : border-box;
}

.player-outer-layout.player-orientation-horizontal-flipped .player-card { 
  flex-direction: column-reverse; 
}

.player-card {
  display     : flex;
  flex-direction: column;
  background  : var(--music-player-color-bg-main);
  border      : var(--music-player-border);
  border-radius: var(--music-player-border-radius);
  overflow    : hidden;
  width       : 360px;
  max-width   : 100%;
  box-sizing  : border-box;
  max-height  : calc(100vh - 80px);
  transition  : max-height 0.55s cubic-bezier(0.16, 1, 0.3, 1);
}

.music-player-wrapper.is-open .player-card { 
  max-height  : calc(100vh - 80px); 
}

.player-control-bar {
  display     : flex;
  flex-direction: column;
  align-items : center;
  background  : var(--music-player-color-bg-main);
  padding     : 6px 8px 10px 8px;
  gap         : 4px;
  z-index     : 2;
  box-sizing  : border-box;
  flex-shrink : 0;
  overflow    : hidden;
}

.control-bar-buttons {
  display     : grid;
  grid-template-columns: 1fr auto 1fr;
  align-items : center;
  width       : 100%;
  padding     : -4px 4px;
}

.secondary-action-btn { 
  justify-self: start; 
}

.expand-toggle-btn { 
  justify-self: center; 
}

.player-collapsible-content {
  display     : flex;
  flex-direction: column;
  gap         : 12px;
  opacity     : 0;
  overflow-y  : auto;
  overflow-x  : hidden;
  max-height  : 0;
  padding     : 0 12px;
  pointer-events: none;
  box-sizing  : border-box;
  width       : 100%;
  transition  : opacity 0.3s ease, padding 0.4s ease, max-height 0.55s cubic-bezier(0.16, 1, 0.3, 1);
}

.music-player-wrapper.is-open .player-collapsible-content {
  opacity     : 1;
  max-height  : calc(100vh - 180px);
  padding     : 0 12px 12px 12px;
  pointer-events: auto;
}

.hidden-player {
  position    : absolute;
  width       : 1px;
  height      : 1px;
  overflow    : hidden;
  left        : -9999px;
  opacity     : 0;
  pointer-events: none;
}

.special-tape-palette {
  --music-player-color-bg-main:          var(--special-music-player-color-bg-main);
  --music-player-color-bg-secondary:     var(--special-music-player-color-bg-secondary);
  --music-player-color-bg-dark:          var(--special-music-player-color-bg-dark);
  --music-player-color-surface:          var(--special-music-player-color-surface);
  --music-player-border:                 var(--special-music-player-border);
  --music-player-border-radius:          var(--special-music-player-border-radius);
  --music-player-color-accent:           var(--special-music-player-color-accent);
  --music-player-color-accent-light:     var(--special-music-player-color-accent-light);
  --music-player-color-primary:          var(--special-music-player-color-primary);
  --music-player-color-playbt-playing:   var(--special-music-player-color-playbt-playing);
  --music-player-color-playbt-paused:    var(--special-music-player-color-playbt-paused);
  
  --music-player-playlist-bg:                    var(--special-music-player-playlist-bg);
  --music-player-playlist-header-bg:             var(--special-music-player-playlist-header-bg);
  --music-player-playlist-header-text:           var(--special-music-player-playlist-header-text);
  --music-player-playlist-item-bg:               var(--special-music-player-playlist-item-bg);
  --music-player-playlist-item-active-bg:        var(--special-music-player-playlist-item-active-bg);
  --music-player-playlist-item-active-text:      var(--special-music-player-playlist-item-active-text);
  --music-player-playlist-text-color:            var(--special-music-player-playlist-text-color);
  --music-player-playlist-number-color:          var(--special-music-player-playlist-number-color);
  --music-player-playlist-number-active-color:   var(--special-music-player-playlist-number-active-color);

  --music-player-volume-controls-bg:        var(--special-music-player-volume-controls-bg);
  --music-player-volume-controls-slider:    var(--special-music-player-volume-controls-slider);
  --music-player-volume-controls-container: var(--special-music-player-volume-controls-container);
  --music-player-volume-controls-track:     var(--special-music-player-volume-controls-track);
}
@media (max-width: 480px) {
  .music-player-wrapper {
    left      : 12px !important;
    right     : 12px !important;
    max-width : calc(100vw - 24px) !important;
    transform : none !important;
  }

  .player-outer-layout {
    flex-direction: column !important;
    align-items : stretch !important;
  }

  .player-card {
    width     : 100% !important;
    max-height: calc(100vh - 60px);
  }

  .music-player-wrapper.is-open .player-card {
    max-height: calc(100vh - 60px);
  }
  
  .music-player-wrapper.is-open .player-collapsible-content {
    max-height: calc(100vh - 140px);
  }

  .player-control-bar {
    padding   : 4px 6px 8px 6px;
  }

  .mobile-hidden-walkman {
    display   : none !important;
  }
}
</style>