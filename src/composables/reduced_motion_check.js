import { ref } from 'vue'


const getInitialState = () => {
    if (typeof window !== 'undefined') {
    return sessionStorage.getItem('globalDisableAnimations') !== 'true'
    }
    return true
}

const animationsEnabled = ref(getInitialState())

export function useAnimations() {
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

    return {
        animationsEnabled,
        setAnimationsEnabled
    }
}