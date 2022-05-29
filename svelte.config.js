import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';
import preprocess from 'svelte-preprocess';
import staticAdapter from '@sveltejs/adapter-static';
import { fileURLToPath, URL } from 'url';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', ...mdsvexConfig.extensions],

	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			typescript: true,
			postcss: true,
		}),
		mdsvex(mdsvexConfig),
	],

	kit: {
		adapter: staticAdapter(),
		prerender: {
			default: true,
		},
		vite: {
			resolve: {
				alias: {
					$internal: fileURLToPath(new URL('./src/internal', import.meta.url)),
				},
			},
		},
	},
};

export default config;
