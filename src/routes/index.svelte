<script>
	import Cancel from '$lib/Cancel.svelte';

	import Docs from './Docs.md';
	import DialogDemo from './_dialog/Demo.svelte';
	import DialogDocs from './_dialog/Docs.md';
	import IconMenu from './_internal/IconMenu.svelte';
	import NotificationDemo from './_notification/Demo.svelte';
	import NotificationDocs from './_notification/Docs.md';
	import TabDemo from './_tabgroup/Demo.svelte';
	import TabDocs from './_tabgroup/Docs.md';

	const comps = [
		{
			id: 'notification',
			title: '💬 Notification',
			comps: [NotificationDemo, NotificationDocs],
		},
		{
			id: 'dialog',
			title: '🔲 Dialog',
			comps: [DialogDemo, DialogDocs],
		},
		{
			id: 'tabs',
			title: '📑 TabGroup + Tab',
			comps: [TabDemo, TabDocs],
		},
	];

	export let indexVisible = false;

	function toggleIndex() {
		indexVisible = !indexVisible;
	}
</script>

<article>
	<h1 tabindex="-1" id="intro">🧱 AS Comps</h1>
	<Docs />
</article>

{#if indexVisible}
	<ul class="index-menu">
		<li><a href="#intro">🧱 As Comps Intro</a></li>
		{#each comps as item}
			<li><a href="#{item.id}">{item.title}</a></li>
		{/each}
		<button class="btn" on:click={toggleIndex}>Close index</button>
	</ul>
{:else}
	<button class="btn index-menu" on:click={toggleIndex} aria-label="Open Index">
		<IconMenu />
	</button>
{/if}

{#each comps as item}
	<article>
		<h2 tabindex="-1" id={item.id}>{item.title}</h2>
		{#if item.comps}
			{#each item.comps as comp}
				<svelte:component this={comp} />
			{/each}
		{/if}
	</article>
{/each}

<footer>
	Made with ❤️ by
	<a href="https://www.sarcevic.dev/" target="_blank">Antonio Sarcevic</a>
</footer>

<style>
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

	button.index-menu {
		font-size: 2em;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	ul h2 {
		margin: 0;
	}
	@media only screen and (max-width: 1320px) {
		ul {
			position: static;
		}
		.btn {
			display: block;
		}
	}
</style>
