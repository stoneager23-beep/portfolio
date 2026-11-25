import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { projects } from './src/data/projects.js'

// Canonical origin (the apex domain redirects here). Keep in sync with index.html.
const SITE_URL = 'https://www.husnainweb.online/'

/**
 * Injects a schema.org ItemList of the projects into index.html, generated from
 * src/data/projects.js, so search engines see the projects without running JS.
 */
function projectsJsonLd() {
    const absolute = (path) => (/^https?:\/\//.test(path) ? path : new URL(path, SITE_URL).href)

    return {
        name: 'projects-json-ld',
        transformIndexHtml() {
            const data = {
                '@context': 'https://schema.org',
                '@type': 'ItemList',
                name: 'Projects by Husnain Faisal',
                itemListElement: projects.map((project, index) => ({
                    '@type': 'ListItem',
                    position: index + 1,
                    item: {
                        '@type': 'CreativeWork',
                        name: project.title,
                        description: project.description,
                        ...(project.liveUrl && { url: project.liveUrl }),
                        image: absolute(project.screenshot),
                        genre: project.category,
                        keywords: project.tags.join(', '),
                        creator: { '@id': `${SITE_URL}#person` },
                    },
                })),
            }

            return [
                {
                    tag: 'script',
                    attrs: { type: 'application/ld+json' },
                    // escape "<" so a string can never close the script tag
                    children: JSON.stringify(data).replace(/</g, '\\u003c'),
                    injectTo: 'head',
                },
            ]
        },
    }
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), projectsJsonLd()],
    base: './',
})
