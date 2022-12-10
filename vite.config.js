import { sveltekit } from '@sveltejs/kit/vite';
import { fileURLToPath, URL } from 'url';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	resolve: {
		alias: {
			$internal: fileURLToPath(new URL('./src/internal', import.meta.url)),
		},
	},
};

export default config;
