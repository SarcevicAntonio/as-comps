<script>
	import { getContext, onMount } from 'svelte';
	import { key } from './TabGroup.svelte';
	import { slide, fade } from 'svelte/transition';
	import { v4 as uudi } from 'uuid';

	let controlsId = uudi();
	let labelledbyId = uudi();

	export let label;

	let tab = { label, controlsId, labelledbyId };

	const { addTab, removeTab, activeTab, accordionStore, triggerClassStore } = getContext(key);

	onMount(() => {
		addTab(tab);
		return () => {
			removeTab(tab);
		};
	});

	let expanded = false;
</script>

<noscript>
	<section {...$$restProps}>
		<em>{label}</em>
		<br />
		<slot />
	</section>
</noscript>

{#if !$accordionStore}
	{#if $activeTab === tab}
		<section
			in:fade
			{...$$restProps}
			role="tabpanel"
			id={controlsId}
			aria-labelledby={labelledbyId}
		>
			<slot />
		</section>
	{/if}
{:else}
	<section {...$$restProps}>
		<div role="heading" id={labelledbyId}>
			<button
				on:click={() => {
					expanded = !expanded;
				}}
				aria-expanded={expanded}
				aria-controls={controlsId}
				class:active={expanded}
				class={$triggerClassStore}
			>
				{label}
			</button>
		</div>
		{#if expanded}
			<div transition:slide id={controlsId} aria-labelledby={labelledbyId} role="region">
				<slot />
			</div>
		{/if}
	</section>
{/if}

<style>
	section[role='tabpanel'] {
		margin-top: 1em;
	}
	div[role='heading'],
	div[role='region'] {
		margin-bottom: 1em;
	}
	button {
		width: 100%;
	}
	.active {
		text-decoration: underline;
	}
</style>
