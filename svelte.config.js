import { svelte } from '@sveltejs/vite-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static'; // For prerendering

export default {
  kit: {
    // Configure the adapter for prerendering
    adapter: adapter({
      // Configuration options for prerendering
      pages: 'build',
      assets: 'build',
      fallback: null
    }),

    prerender: {
      // Enable prerendering for all pages
      default: true,
      // Additional prerendering options
    },

    vite: {
      plugins: [
        svelte({
          preprocess: sveltePreprocess(), // Allows using preprocessors like SCSS, TypeScript
          // Additional plugin options
        })
      ],
      // Additional Vite configurations, e.g., for performance optimization or environment variables
    }
  }
};
