<script>
	import Codesample from '$internal/Codesample.svelte';
	import { Tab, TabGroup } from '$lib';

	let accordion = false;
</script>

<section class="toybox">
	<div class="demo">
		<div class="card" style="width: 600px;">
			<TabGroup triggerClass="btn" {accordion}>
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
	<div class="controls">
		<label>
			<span>Accordion</span>
			<select bind:value={accordion}>
				<option value={false}>false (default)</option>
				<option value={true}>true</option>
			</select>
		</label>
	</div>
	<Codesample
		code={`<div class="card" style="width: 600px;">
<TabGroup ${accordion ? 'accordion ' : ''}triggerClass="btn">
	<Tab label="Tab One">some random tab content</Tab>
	<Tab label="Second Tab">other tab content</Tab>
	<Tab label="Tab, the Third">
		Lorem ipsum dolor sit, amet consectetur adipisicing elit.
	</Tab>
</TabGroup>
</div>`}
	/>
</section>
