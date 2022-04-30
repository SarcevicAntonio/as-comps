<script>
	import Codesample from '$internal/Codesample.svelte';
	import { Dialog, notification } from '$lib';
	import { fly, slide } from 'svelte/transition';

	function deleteEntry() {
		notification('Deleted entry', { type: 'warn' });
	}

	let mandatory = false;
	let noCloseButton = false;
	let triggerLabel = 'Delete Entry';
	$: dirTriggerLabel = triggerLabel || 'Open Dialog';
</script>

<h3>Demo</h3>

<section class="toybox">
	<div class="demo">
		<Dialog
			let:toggle
			{mandatory}
			{noCloseButton}
			triggerLabel={dirTriggerLabel}
			triggerClass="btn"
		>
			<h2 data-test="dialog-content">Are you sure you want to delete the entry?</h2>
			<p>This action can not be reversed.</p>
			<svelte:fragment slot="dialog-actions">
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
			<span>noCloseButton</span>
			<select bind:value={noCloseButton} data-test="dialog-noCloseButton-select">
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
			noCloseButton ? ' noCloseButton' : ''
		}${triggerLabel ? ` triggerLabel="${triggerLabel}"` : ''}>
	<h2>Are you sure you want to delete the entry?</h2>
	<p>This action can not be reversed.</p>
	<svelte:fragment slot="dialog-actions">
		<button on:click={toggle}>No</button>
		<button
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

<h3>Styled Dialog</h3>

<section class="toybox">
	<div class="demo">
		<Dialog
			dialogIn={fly}
			dialogInOptions={{ x: 500 }}
			--border-radius="0"
			--width="100vw"
			--max-width="calc(100vw - 2em)"
			--height="100vh"
			--max-height="calc(100vh - 2em)"
			triggerClass="btn"
		/>
	</div>

	<Codesample
		code={`<Dialog
	dialogIn={fly}
	dialogInOptions={{ x: 500 }}
	--border-radius="0"
	--width="100vw"
	--max-width="calc(100vw - 2em)"
	--height="100vh"
	--max-height="calc(100vh - 2em)"
/>`}
	/>
</section>
