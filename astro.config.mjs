// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import keystatic from '@keystatic/astro';

// Keystatic's admin (/keystatic) needs a server, so it only runs with `npm run dev`.
// The production build stays fully static. To edit content on the live site later,
// switch keystatic.config.ts to GitHub storage and add a hosting adapter.
const isDev = process.argv.includes('dev');

export default defineConfig({
  site: 'https://aeronixmachinery.com',
  integrations: [
    sitemap({ filter: page => !page.includes('/keystatic') }),
    ...(isDev ? [react(), keystatic()] : [])
  ]
});
