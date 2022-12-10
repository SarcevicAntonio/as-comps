<script>
	import IconMenu from '$internal/IconMenu.svelte';
	import { Notifications } from '$lib';
	import { onMount, tick } from 'svelte';
	import { fly, slide } from 'svelte/transition';
	import '../global.css';
	import '../theme.css';
	import comps from './_comps';
	import { notificationPosition } from './_notification/Demo.svelte';

	export let indexVisible = true;

	function toggleIndex() {
		indexVisible = !indexVisible;
	}

	let initial = true;

	onMount(async () => {
		if (window.innerWidth <= 1800) {
			indexVisible = false;
			await tick();
		}
		initial = false;
	});

	// needed for ssr
	const condTrans = (node, args) => (initial ? null : args.trans(node, args));
	// todo: use css for floating index-menu instead if that somehow works
</script>

<nav class="floating-index-menu">
	{#if indexVisible}
		<ul
			transition:condTrans={{
				trans: slide,
			}}
			class="index-menu"
		>
			<li>
				<a href="#intro">🧱 Intro</a>
			</li>
			{#each comps as item}
				<li>
					<a href="#{item.id}">
						{item.title}
					</a>
				</li>
			{/each}
			<button class="btn" on:click={toggleIndex}>Close index</button>
		</ul>
	{:else}
		<button
			transition:condTrans={{
				trans: fly,
				x: -250,
			}}
			class="btn index-menu"
			on:click={toggleIndex}
			aria-label="Open Index"
		>
			<IconMenu />
		</button>
	{/if}
</nav>

<aside class="dark-theme">
	<nav>
		<ul
			transition:condTrans={{
				trans: slide,
			}}
		>
			<li>
				<a href="#intro">🧱 Intro</a>
			</li>
			{#each comps as item}
				<li>
					<a href="#{item.id}">
						{item.title}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</aside>

<div class="main-container">
	<main><slot /></main>

	<footer>
		Made with ❤️ by
		<a href="https://www.sarcevic.dev/" target="_blank" rel="noreferrer">Antonio Sarcevic</a>
	</footer>
</div>

<Notifications position={$notificationPosition} />

<style>
	main {
		margin-inline: auto;
		max-width: 75ch;
	}
	.index-menu {
		background-color: white;
		border: 1px solid lightgray;
		border-radius: 0.3em;
		box-shadow: var(--card-shadow);
		position: fixed;
		bottom: 0;
		left: 0;
		margin: 1rem;
		padding: 1rem;
	}
	ul {
		padding: 0em;
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0.5em;
	}
	ul li a {
		text-decoration: none;
		font-size: 1.2em;
		font-weight: 600;
	}
	ul li a:hover,
	ul li a:focus {
		text-decoration: underline;
	}
	button.index-menu {
		font-size: 2em;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	@media only screen and (max-width: 1320px) {
		ul {
			position: static;
		}
		.btn {
			display: block;
		}
	}

	:root {
		--sidebar-width: 23vw;
	}
	aside {
		position: fixed;
		top: 0;
		height: 100%;
		left: 0;
		display: none;
		width: var(--sidebar-width);
		padding-right: 4em;
		align-items: center;
		justify-content: end;
		box-shadow: var(--card-shadow);
		background-color: var(--code-bg);
		background: linear-gradient(120deg, var(--bg) 0%, var(--bgg) 100%);
		border-right: 1px solid var(--hi);
	}

	@media only screen and (min-width: 1200px) {
		.floating-index-menu {
			display: none;
		}
		aside {
			display: flex;
		}
		.main-container {
			margin-left: var(--sidebar-width);
			margin-right: 4em;
		}
		.main-container > * {
			margin-left: 8em;
		}
	}

	aside ul {
		padding-inline: 1em;
	}

	aside a {
		color: var(--fg);
	}
</style>
