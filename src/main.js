import { createApp } from 'vue'
import { createHead } from '@unhead/vue/client'
import App      from './App.vue'
import DebugApp from './Debug_App.vue'
import router   from './router/router.js'

const head = createHead()

createApp(App)
	.use(router)
	.use(head)
	.mount('#app')