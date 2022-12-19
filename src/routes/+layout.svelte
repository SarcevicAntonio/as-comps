<script>
	import { Notifications } from '$lib';
	import '../global.css';
	import Nav from './Nav.svelte';
	import { notificationPosition } from './_notification/Demo.svelte';
</script>

<Nav />

<div class="main-container">
	<main><slot /></main>

	<footer>
		Made with ❤️ by
		<a href="https://www.sarcevic.dev/" target="_blank" rel="noreferrer">
			Antonio Sarcevic
		</a>
	</footer>
</div>

<Notifications position={$notificationPosition} />

<style>
	main,
	footer {
		margin-inline: auto;
		max-width: 75ch;
	}

	@media only screen and (min-width: 1200px) {
		.main-container {
			margin-left: var(--sidebar-width);
			margin-right: 4em;
		}
		.main-container > * {
			margin-left: 8em;
		}
	}
</style>
