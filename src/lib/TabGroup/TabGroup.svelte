<script context="module">
	export const key = Symbol();
</script>

<script lang="ts">
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { arrowKeyFocus } from '../Actions/focus';

	interface Tab {
		label: string;
		controlsId: string;
		labelledbyId: string;
	}

	let tabs: Tab[] = [];
	const activeTab = writable({});

	export let accordion = false;
	const accordionStore = writable(accordion);
	$: $accordionStore = accordion;

	export let triggerClass = '';
	const triggerClassStore = writable(triggerClass);
	$: $triggerClassStore = triggerClass;

	setContext(key, {
		addTab(tab: Tab) {
			if (!tabs.length) activeTab.set(tab);
			tabs = [...tabs, tab];
		},
		removeTab(tab: Tab) {
			tabs = tabs.filter((entry) => entry !== tab);
		},
		activeTab,
		accordionStore,
		triggerClassStore,
	});
</script>

{#if !accordion}
	<ul {...$$restProps} role="tablist" use:arrowKeyFocus>
		{#each tabs as tab}
			<li
				role="tab"
				id={tab.labelledbyId}
				aria-controls={tab.controlsId}
				aria-selected={$activeTab === tab}
			>
				<button
					on:click={() => {
						$activeTab = tab;
					}}
					class:active={$activeTab === tab}
					class={triggerClass}
				>
					{tab.label}
				</button>
			</li>
		{/each}
	</ul>
{/if}

<slot />

<style>
	ul {
		padding: 0;
		margin-top: 0;
		list-style: none;
		display: flex;
		align-items: center;
		gap: 0.5em;
		overflow-x: auto;
		/* hack: fix cutting shadows*/
		padding: 10em;
		margin: -10em;
	}
	li {
		flex-shrink: 0;
	}
	.active {
		text-decoration: underline;
	}
</style>
