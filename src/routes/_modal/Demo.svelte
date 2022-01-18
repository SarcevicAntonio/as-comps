<script>
	import { notification, Modal } from '$lib';
	import Codesample from '../_internal/Codesample.svelte';

	function deleteEntry() {
		notification('Deleted entry', { type: 'warn' });
	}

	let mandatory = false;
	let triggerLabel = 'Delete Entry';
	$: dirTriggerLabel = triggerLabel || 'Open Modal';

	$: code = `<Modal let:toggle${mandatory ? ' mandatory' : ''}${
		triggerLabel ? ` triggerLabel="${triggerLabel}"` : ''
	}>
	<h2>Are you sure you want to delete the entry?</h2>
	<p>This action can not be reversed.</p>
	<svelte:fragment slot="modalActions">
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
</Modal>
`;
</script>

<h3 id="demo">Demo</h3>

<section class="toybox">
	<div class="demo">
		<Modal let:toggle {mandatory} triggerLabel={dirTriggerLabel} triggerClass="btn">
			<h2 data-test="modal-content">Are you sure you want to delete the entry?</h2>
			<p>This action can not be reversed.</p>
			<svelte:fragment slot="modalActions">
				<button class="btn" on:click={toggle} data-test="modal-close">No</button>
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
		</Modal>
	</div>
	<Codesample {code} />
	<div class="controls">
		<label>
			<span>mandatory</span>
			<select bind:value={mandatory} data-test="modal-mandatory-select">
				<option value={true}>true</option>
				<option value={false}>false</option>
			</select>
		</label>
		<label>
			<span>Trigger Label</span>
			<input type="text" bind:value={triggerLabel} data-test="modal-trigger-label" />
		</label>
	</div>
</section>
