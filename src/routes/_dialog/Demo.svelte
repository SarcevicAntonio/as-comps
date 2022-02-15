<script>
	import { notification, Dialog } from '$lib';
	import Codesample from '../_internal/Codesample.svelte';

	function deleteEntry() {
		notification('Deleted entry', { type: 'warn' });
	}

	let mandatory = false;
	let triggerLabel = 'Delete Entry';
	$: dirTriggerLabel = triggerLabel || 'Open Dialog';
</script>

<h3>Demo</h3>

<section class="toybox">
	<div class="demo">
		<Dialog let:toggle {mandatory} triggerLabel={dirTriggerLabel} triggerClass="btn">
			<h2 data-test="dialog-content">Are you sure you want to delete the entry?</h2>
			<p>This action can not be reversed.</p>
			<svelte:fragment slot="dialogActions">
				<button class="btn" on:click={toggle} data-test="dialog-close">No</button>
				<button
					class="btn"
					on:click={() => {
						deleteEntry();
						toggle();
					}}
				>
					Yes
				</button>
			</svelte:fragment>
		</Dialog>
	</div>
	<div class="controls">
		<label>
			<span>mandatory</span>
			<select bind:value={mandatory} data-test="dialog-mandatory-select">
				<option value={true}>true</option>
				<option value={false}>false</option>
			</select>
		</label>
		<label>
			<span>Trigger Label</span>
			<input type="text" bind:value={triggerLabel} data-test="dialog-trigger-label" />
		</label>
	</div>
	<Codesample
		code={`<Dialog let:toggle${mandatory ? ' mandatory' : ''}${
			triggerLabel ? ` triggerLabel="${triggerLabel}"` : ''
		}>
	<h2>Are you sure you want to delete the entry?</h2>
	<p>This action can not be reversed.</p>
	<svelte:fragment slot="dialogActions">
		<button class="btn" on:click={toggle}>No</button>
		<button
			class="btn"
			on:click="{() => {
				deleteEntry();
				toggle();
			}}"
			>
			Yes
		</button>
	</svelte:fragment>
</Dialog>`}
	/>
</section>
