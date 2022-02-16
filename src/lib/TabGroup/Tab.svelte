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
	<strong>{label}</strong>
</noscript>

<section style="display: {!$activeTab || $activeTab === label ? 'block' : 'none'}" {...$$restProps}>
	<slot />
</section>
