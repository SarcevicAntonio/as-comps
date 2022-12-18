<script lang="ts">
	import { onMount } from 'svelte';
	import Intro from './intro.md';
	import comps, { intersecting_articles } from './comps';

	const handle_intersection: IntersectionObserverCallback = (entries) => {
		entries.forEach((entry) => {
			const id = entry.target.getAttribute('id');
			if (entry.isIntersecting) {
				$intersecting_articles[id] = true;
			} else {
				$intersecting_articles[id] = false;
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
	<h1>
		🧱 AS Comps <a class="copy" href="#intro">#</a>
	</h1>
	<Intro />
</article>

{#each comps as item, i}
	<article tabindex="-1" id={item.id} bind:this={articles[i + 1]}>
		<h2>
			{item.title}
			<a class="copy" href="#{item.id}">#</a>
		</h2>
		{#if item.comps}
			{#each item.comps as comp}
				<svelte:component this={comp} />
			{/each}
		{/if}
	</article>
{/each}

<style>
	.copy {
		visibility: hidden;
		opacity: 0%;
		transition: opacity 0.25s ease-in-out;
	}

	h1:hover .copy,
	h2:hover .copy {
		visibility: visible;
		opacity: 100%;
	}
</style>
