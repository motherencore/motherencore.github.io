import { createRouter, createWebHistory } from 'vue-router'

import HomeView     from "@/components/views/HomeView.vue"
import AboutView    from '@/components/views/AboutView.vue'
import FaqView      from '@/components/views/FaqView.vue'
import CreditsView  from '@/components/views/CreditsView.vue'
import DownloadView from '@/components/views/DownloadView.vue'
import DogtenView   from '@/components/views/DogtenView.vue'

import homeIco     from '@/assets/ico/favicon.ico'
import aboutIco    from '@/assets/ico/favicon.ico'
import faqIco      from '@/assets/ico/favicon.ico'
import downloadIco from '@/assets/ico/favicon.ico'
import creditsIco  from '@/assets/ico/favicon.ico'
import dogtenIco   from '@/assets/ico/favicon.ico'

const routes = [
  { 
    path: '/', 
    name: 'Home', 
    component: HomeView,
    meta: { favicon: homeIco }
  },
  { 
    path: '/about', 
    name: 'About', 
    component: AboutView,
    meta: { favicon: aboutIco }
  },
  { 
    path: '/faq', 
    name: 'Faq', 
    component: FaqView,
    meta: { favicon: faqIco }
  },
  { 
    path: '/download', 
    name: 'Download', 
    component: DownloadView,
    meta: { favicon: downloadIco }
  },
  { 
    path: '/credits', 
    name: 'Credits', 
    component: CreditsView,
    meta: { favicon: creditsIco }
  },
  { 
    path: '/dogten', 
    name: 'Dogten', 
    component: DogtenView,
    meta: { favicon: dogtenIco },
    beforeEnter: (to, from) => {
      const isAuthorized = sessionStorage.getItem('unlocked_dogten') === 'true'
      if (!isAuthorized) {
        return { name: 'Home', path: '/' }
      }
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0, left: 0, behavior: 'smooth' }
  }
})

router.afterEach((to) => {
  if (to.name === 'Dogten') {
    sessionStorage.removeItem('unlocked_dogten')
  }

  const faviconUrl = to.meta.favicon || homeIco
  let link = document.querySelector("link[rel~='icon']")

  if (!link) {
    link = document.createElement('link')
    link.rel = 'icon'
    document.head.appendChild(link)
  }

  link.href = faviconUrl
})

export default router