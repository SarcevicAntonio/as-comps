<script>
	import Docs from './Docs.md';
	import DialogDemo from './_dialog/Demo.svelte';
	import DialogDocs from './_dialog/Docs.md';
	import NotificationDemo from './_notification/Demo.svelte';
	import NotificationDocs from './_notification/Docs.md';
	import TabDemo from './_tabgroup/Demo.svelte';

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
			title: '📑 Tabs & TabGroup',
			comps: [TabDemo],
		},
	];
</script>

<article>
	<h1 id="intro">🧱 AS Comps</h1>
	<Docs />
</article>

<ul>
	<h2 tabindex="-1">Index</h2>
	<li><a href="#intro">🧱 As Comps Intro</a></li>
	{#each comps as item}
		<li><a href="#{item.id}">{item.title}</a></li>
	{/each}
</ul>

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

<style>
	ul {
		padding: 1em;
		list-style: none;
		background-color: white;
		border: 1px solid lightgray;
		border-radius: 0.3em;
		box-shadow: var(--card-shadow);
	}
	ul h2 {
		margin: 0;
	}
	@media only screen and (min-width: 1320px) {
		ul {
			position: fixed;
			top: 0;
			left: 0;
			margin: 1em;
		}
	}
</style>
