<template>
	<div v-if="isVisible" class="jumpscare-container">
		<img :src="imageSrc" alt="Jumpscare Image" class="jumpscare-image" />
	</div>
</template>

<script setup>
/**
    * @file jumpescare.vue
    * @brief Flashes an image overlay periodically based on frequency and chance.
    * @displayName Jumpscare
*/

import { ref, watch, onMounted, onUnmounted }   from 'vue'
import { useAnimations }                        from '@/composables/reduced_motion_check'

const props = defineProps({
	/** 
	* Controls visibility binding state of the jumpscare overlay.
	* @public
	*/
	modelValue: {
		type    : Boolean,
		required: false
	},
	/** 
	* Image source URL to display during the jumpscare flash.
	* @public
	*/
	imageSrc: {
		type    : String,
		required: true
	},
	/** 
	* Duration in milliseconds the image stays visible on screen.
	* @public
	*/
	duration: {
		type    : Number,
		default : 1000
	},
	/** 
	* Probability percentage (0 to 100) that a jumpscare will trigger on each frequency check.
	* @public
	*/
	chance: {
		type    : Number,
		default : 50,
		validator: (value) => value >= 0 && value <= 100
	},
	/** 
    * Time interval in milliseconds between random check rolls (Default: 1000ms = 1 second).
    * @public
    */
	frequency: {
		type    : Number,
		default : 1000
	}
})

const emit = defineEmits(['update:modelValue'])

const { animationsEnabled } = useAnimations()

const isVisible = ref(props.modelValue)
let hideTimeoutId = null
let checkIntervalId = null

/**
    * Triggers the jumpscare image to show for the configured duration.
    * @private
*/
const triggerFlash = () => {
	const visitedDogten = sessionStorage.getItem('visited_dogten') === 'true'
	if (!animationsEnabled.value || !visitedDogten) return

	if (hideTimeoutId) clearTimeout(hideTimeoutId)
	
	isVisible.value = true
	emit('update:modelValue', true)

	hideTimeoutId = setTimeout(() => {
		isVisible.value = false
		emit('update:modelValue', false)
	}, props.duration)
}

watch(() => props.modelValue, (newValue) => {
	if (newValue && !isVisible.value) {
		triggerFlash()
	} else if (!newValue) {
		if (hideTimeoutId) clearTimeout(hideTimeoutId)
		isVisible.value = false
	}
})

onMounted(() => {
	if (props.frequency > 0) {
		checkIntervalId = setInterval(() => {
			const visitedDogten = sessionStorage.getItem('visited_dogten') === 'true'
			if (!animationsEnabled.value || !visitedDogten) return

			const roll = Math.random() * 100
			if (roll <= props.chance) {
				triggerFlash()
			}
		}, props.frequency)
	}
})

onUnmounted(() => {
	if (checkIntervalId) clearInterval(checkIntervalId)
	if (hideTimeoutId) clearTimeout(hideTimeoutId)
})
</script>

<style scoped>
.jumpscare-container {
	position            : fixed;
	top                 : 0;
	left                : 0;
	width               : 100vw;
	height              : 100vh;
	pointer-events      : none;
	display             : flex;
	justify-content     : center;
	align-items         : center;
	z-index             : 9999;
	background          : transparent;
}

.jumpscare-image {
	width               : 100vw;
	height              : 100vh;
	max-width           : 100vw;
	max-height          : 100vh;
	object-fit          : contain;
}
</style>