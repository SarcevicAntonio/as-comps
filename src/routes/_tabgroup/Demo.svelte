<script>
	import TabGroup from '$lib/TabGroup/TabGroup.svelte';
	import Tab from '$lib/TabGroup/Tab.svelte';
	import Codesample from '../_internal/Codesample.svelte';
</script>

<section class="toybox">
	<div class="demo">
		<div class="card" style="width: 600px;">
			<TabGroup triggerClass="btn">
				<Tab label="Tab One">some random tab content</Tab>
				<Tab label="Second Tab">other tab content</Tab>
				<Tab label="Tab, the Third">
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum, natus?
				</Tab>
			</TabGroup>
		</div>
	</div>
	<Codesample
		code={`<div class="card" style="width: 600px;">
<TabGroup triggerClass="btn">
	<Tab label="Tab One">some random tab content</Tab>
	<Tab label="Second Tab">other tab content</Tab>
	<Tab label="Tab, the Third">
		Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum, natus?
	</Tab>
</TabGroup>
</div>`}
	/>
</section>
