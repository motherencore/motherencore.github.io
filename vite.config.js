import { fileURLToPath, URL } from 'node:url'
import path from 'node:path'
import fs from 'node:fs'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import Sitemap from 'vite-plugin-sitemap'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const routeMeta = {
  '/about': {
    title: 'About - MOTHER Encore',
    description: 'Learn more about MOTHER Encore.'
  },
  '/faq': {
    title: 'FAQ - MOTHER Encore',
    description: 'Frequently asked questions regarding MOTHER Encore.'
  },
  '/download': {
    title: 'Download - MOTHER Encore',
    description: 'Download the latest version of MOTHER Encore.'
  },
  '/credits': {
    title: 'Credits - MOTHER Encore',
    description: 'Meet the team behind MOTHER Encore.'
  }
}

function postBuildRoutePages() {
  return {
    name: 'post-build-route-pages',
    closeBundle() {
      const distDir = path.join(__dirname, 'dist')
      const templatePath = path.join(distDir, 'index.html')

      if (!fs.existsSync(templatePath)) return

      const template = fs.readFileSync(templatePath, 'utf-8')

      Object.entries(routeMeta).forEach(([route, meta]) => {
        const folderName = route.replace(/^\//, '')
        const routeDir = path.join(distDir, folderName)

        if (!fs.existsSync(routeDir)) {
          fs.mkdirSync(routeDir, { recursive: true })
        }

        let routeHtml = template
          .replace(/<title>.*?<\/title>/gi, `<title>${meta.title}</title>`)
          .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/gi, `<meta name="description" content="${meta.description}" />`)
          .replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/gi, `<meta property="og:title" content="${meta.title}" />`)
          .replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/gi, `<meta property="og:description" content="${meta.description}" />`)
          .replace(/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/gi, `<meta name="twitter:title" content="${meta.title}" />`)
          .replace(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/gi, `<meta name="twitter:description" content="${meta.description}" />`)

        fs.writeFileSync(path.join(routeDir, 'index.html'), routeHtml)
      })

      fs.copyFileSync(templatePath, path.join(distDir, '404.html'))
    }
  }
}

export default defineConfig({
  base: '/',
  assetsInclude: ['**/*.xlsx'],
  plugins: [
    vue(),
    vueDevTools(),
    Sitemap({
      hostname: 'https://yourcustomdomain.com',
      dynamicRoutes: [
        '/about',
        '/faq',
        '/download',
        '/credits'
      ]
    }),
    postBuildRoutePages()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})