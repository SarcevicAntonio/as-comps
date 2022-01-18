<script context="module">
	export const key = Symbol();
</script>

<script>
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	let tabs = [];
	const activeTab = writable('');
	export let triggerClass = '';

	setContext(key, {
		addTab(label) {
			if (!tabs.length) activeTab.set(label);
			tabs = [...tabs, label];
		},
		removeTab(label) {
			tabs = tabs.filter((entry) => entry !== label);
		},
		activeTab,
	});
</script>

<ul>
	{#each tabs as label}
		<li>
			<button
				on:click={() => {
					$activeTab = label;
				}}
				class:active={$activeTab === label}
				class={triggerClass}
			>
				{label}
			</button>
		</li>
	{/each}
</ul>

<slot />

<style>
	ul {
		padding: 0;
		margin-top: 0;
		list-style: none;
		display: flex;
		align-items: center;
		gap: 0.5em;
	}
	.active {
		text-decoration: underline;
	}
</style>
