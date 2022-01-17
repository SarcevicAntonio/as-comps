<script context="module">
	export const key = Symbol();
</script>

<script>
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	let tabs = [];
	const activeTab = writable('');

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
			>
				{label}
			</button>
		</li>
	{/each}
</ul>

<slot />

<style>
	.active {
		text-decoration: underline;
	}
</style>
