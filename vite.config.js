import { fileURLToPath, URL } from 'node:url'
import path from 'node:path'
import fs from 'node:fs'

import { defineConfig } from 'vite'
import vue              from '@vitejs/plugin-vue'
import vueDevTools      from 'vite-plugin-vue-devtools'
import Sitemap          from 'vite-plugin-sitemap'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const routeMeta = {
  '/': {
    title: 'MOTHER Encore',
    description: 'A new game in the MOTHER series offering an alternative take on the original NES game!',
    canonical: 'https://motherencore.com/'
  },
  '/about': {
    title: 'About - MOTHER Encore',
    description: 'Learn more about MOTHER Encore.',
    canonical: 'https://motherencore.com/about'
  },
  '/faq': {
    title: 'FAQ - MOTHER Encore',
    description: 'Frequently asked questions regarding MOTHER Encore.',
    canonical: 'https://motherencore.com/faq'
  },
  '/download': {
    title: 'Download - MOTHER Encore',
    description: 'Download the latest version of MOTHER Encore.',
    canonical: 'https://motherencore.com/download'
  },
  '/credits': {
    title: 'Credits - MOTHER Encore',
    description: 'Meet the team behind MOTHER Encore.',
    canonical: 'https://motherencore.com/credits'
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
        const targetDir = route === '/' ? distDir : path.join(distDir, route.replace(/^\//, ''))

        if (!fs.existsSync(targetDir)) {
          fs.mkdirSync(targetDir, { recursive: true })
        }

        let routeHtml = template
          .replace(/<title>.*?<\/title>/gi, `<title>${meta.title}</title>`)
          .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/gi, `<meta name="description" content="${meta.description}" />`)
          .replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/gi, `<meta property="og:title" content="${meta.title}" />`)
          .replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/gi, `<meta property="og:description" content="${meta.description}" />`)
          .replace(/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/gi, `<meta name="twitter:title" content="${meta.title}" />`)
          .replace(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/gi, `<meta name="twitter:description" content="${meta.description}" />`)

        const canonicalTag = `<link rel="canonical" href="${meta.canonical}" />`
        if (routeHtml.includes('rel="canonical"')) {
          routeHtml = routeHtml.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/gi, canonicalTag)
        } else {
          routeHtml = routeHtml.replace('</head>', `    ${canonicalTag}\n</head>`)
        }

        const outputPath = path.join(targetDir, 'index.html')
        fs.writeFileSync(outputPath, routeHtml)
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
      hostname      : 'https://motherencore.com',
      dynamicRoutes : Object.keys(routeMeta),
      extensions    : [''], 
      exclude       : ['/404']
    }),
    postBuildRoutePages()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})