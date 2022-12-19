<script>
	import IconMenu from '$internal/IconMenu.svelte';
	import { fly, slide } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { tick } from 'svelte';
	import comps, { intersecting_articles } from './comps';

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

<nav class="floating-index-menu dark-theme">
	{#if indexVisible}
		<ul
			transition:condTrans={{
				trans: slide,
			}}
			class="index-menu"
		>
			<li class:active={$intersecting_articles['intro']}>
				<a href="#intro">🧱 As Comps</a>
			</li>
			{#each comps as item}
				<li class:active={$intersecting_articles[item.id]}>
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
			<li class:active={$intersecting_articles['intro']}>
				<a href="#intro">🧱 As Comps</a>
			</li>
			{#each comps as item}
				<li class:active={$intersecting_articles[item.id]}>
					<a href="#{item.id}">
						{item.title}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</aside>

<style>
	.index-menu {
		background-color: var(--bg);
		border: 1px solid var(--hi);
		color: var(--fg);
		border-radius: 0.3em;
		box-shadow: var(--card-shadow);
		position: fixed;
		bottom: 0;
		left: 0;
		margin: 1rem;
		padding: 1rem;
		z-index: 1;
	}

	ul {
		padding: 0em;
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0.5em;
	}

	ul li a {
		font-size: 1.2em;
		font-weight: 600;
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
	}

	aside ul {
		padding-inline: 1em;
	}

	a {
		color: var(--fg);
	}

	a[href='#intro'] {
		font-size: 1.5em;
	}
</style>
