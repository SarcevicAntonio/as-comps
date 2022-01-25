<script>
	import { getContext, onMount } from 'svelte';
	import { key } from './TabGroup.svelte';

	export let label;

	const { addTab, removeTab, activeTab } = getContext(key);

	onMount(() => {
		addTab(label);
		return () => {
			removeTab(label);
		};
	});
</script>

<noscript>
	{label}
</noscript>

<div style="display: {!$activeTab || $activeTab === label ? 'block' : 'none'}">
	<slot />
</div>
