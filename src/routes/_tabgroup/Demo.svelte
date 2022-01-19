<script>
	import TabGroup from '$lib/TabGroup/TabGroup.svelte';
	import Tab from '$lib/TabGroup/Tab.svelte';
	import Codesample from '../_internal/Codesample.svelte';
</script>

<section class="toybox">
	<div class="demo">
		<div class="card" style="width: 600px;">
			<TabGroup triggerClass="btn">
				<Tab label="Tab One">
					<span data-test="tab-one-content">some random tab one content</span>
				</Tab>
				<Tab label="Second Tab">
					<span data-test="tab-two-content">other tab two content</span>
				</Tab>
				<Tab label="Tab, the Third">
					<span data-test="tab-three-content">
						Lorem ipsum dolor sit, amet consectetur adipisicing elit.
					</span>
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
		Lorem ipsum dolor sit, amet consectetur adipisicing elit.
	</Tab>
</TabGroup>
</div>`}
	/>
</section>
