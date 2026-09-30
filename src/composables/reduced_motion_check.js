/**
    * @file reduced_motion_check.js
    * @brief Composable for managing global motion preferences and video playback synchronization.
*/

import { ref } from 'vue'

/**
    * Retrieves the initial animation preference state from sessionStorage or defaults to true.
    * @returns {boolean} True if animations are enabled, false otherwise.
*/
const getInitialState = () => {
    if (typeof window !== 'undefined') {
        return sessionStorage.getItem('globalDisableAnimations') !== 'true'
    }
    return true
}

const animationsEnabled = ref(getInitialState())
const activeVideoId = ref(null)

export function useAnimations() {
    /**
        * Updates the global animation state, toggles body class, and persists setting in sessionStorage.
        * @param {boolean} value - True to enable animations/autoplay, false for reduced motion.
    */
    const setAnimationsEnabled = (value) => {
        animationsEnabled.value = value
        const disable = !value
        sessionStorage.setItem('globalDisableAnimations', disable ? 'true' : 'false')

        if (disable) {
            document.body.classList.add('reduce-motion')    
        } else {
            document.body.classList.remove('reduce-motion')
        }
    }

    /**
        * Sets the active video instance ID to synchronize single-video playback across components.
        * @param {number|string} id - The unique component instance ID.
    */
    const setActiveVideo = (id) => {
        activeVideoId.value = id
    }

    return {
        animationsEnabled,
        activeVideoId,
        setAnimationsEnabled,
        setActiveVideo
    }
}