<script>
	import Docs from './Docs.md';
	import comps from './_comps';
</script>

<article>
	<h1 tabindex="-1" id="intro">🧱 AS Comps</h1>
	<Docs />
</article>

{#each comps as item}
	<article>
		<h2 tabindex="-1" id={item.id}>
			{item.title}
		</h2>
		{#if item.comps}
			{#each item.comps as comp}
				<svelte:component this={comp} />
			{/each}
		{/if}
	</article>
{/each}
