<template>
	<div class="label-switcher">

		<p class="status-label">{{ labelText }}</p>


	</div>
</template>

<script setup>
import { ref } from 'vue'

const labelText = ref('Click a button to change this text')
</script>

<style scoped>
.label-switcher {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;
	font-family: sans-serif;
	margin: 2rem;
}

.status-label {
	font-size: 1.25rem;
	font-weight: bold;
	color: #2c3e50;
}

.button-group {
	display: flex;
	gap: 0.5rem;
}

button {
	padding: 0.5rem 1rem;
	font-size: 1rem;
	cursor: pointer;
	border: 1px solid #42b883;
	border-radius: 4px;
	background-color: #42b883;
	color: white;
	transition: background-color 0.2s;
}

button:hover {
	background-color: #33a06f;
}
</style>