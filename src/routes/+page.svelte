<script lang="ts">
	import { onMount } from 'svelte';
	import Intro from './intro.md';
	import comps, { current_article } from './comps';

	const handle_intersection: IntersectionObserverCallback = (entries) => {
		entries.forEach((entry) => {
			const id = entry.target.getAttribute('id');
			if (entry.isIntersecting) {
				$current_article[id] = true;
			} else {
				$current_article[id] = false;
			}
		});
	};

	onMount(() => {
		const observer = new IntersectionObserver(handle_intersection);

		articles.forEach((article) => {
			observer.observe(article);
		});
	});

	const articles = [];
</script>

<article tabindex="-1" id="intro" bind:this={articles[0]}>
	<h1>🧱 AS Comps</h1>
	<Intro />
</article>

{#each comps as item, i}
	<article tabindex="-1" id={item.id} bind:this={articles[i + 1]}>
		<h2>
			{item.title}
		</h2>
		{#if item.comps}
			{#each item.comps as comp}
				<svelte:component this={comp} />
			{/each}
		{/if}
	</article>
{/each}
