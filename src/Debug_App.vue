<template>
	<div class="app-container">
		<Test></Test>
	</div>
</template>

<script setup>
	import Test from '@/components/reusables/test_component.vue'
</script>

<style>
body {
	margin: 0;
	overflow-x: hidden;
}

.app-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	min-height: 100vh;
	box-sizing: border-box;
	overflow-x: hidden;
}
</style>