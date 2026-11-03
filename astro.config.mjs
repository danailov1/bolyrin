import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://bolyarin.bg',
  trailingSlash: 'always',
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/komponenti') && !page.includes('/poveritelnost')
    })
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-light'
    }
  }
});
