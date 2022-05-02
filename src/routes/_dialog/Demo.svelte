<script>
	import Codesample from '$internal/Codesample.svelte';
	import { Dialog, notification } from '$lib';
	import { fly } from 'svelte/transition';

	function deleteEntry() {
		notification('Deleted entry', { type: 'warn' });
	}

	let mandatory = false;
	let noCloseButton = false;
	let triggerLabel = 'Delete Entry';
	$: dirTriggerLabel = triggerLabel || 'Open Dialog';

	let dialogOpen = false;
	let buttonRef;
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
			triggerClass="btn"
			triggerLabel="Dialog as Side Pane"
			dialogIn={fly}
			dialogInOptions={{ x: 500 }}
			--as-dialog-left="auto"
			--as-dialog-right="0"
			--as-dialog-transform="translateY(-50%)"
			--as-dialog-border-radius="0"
			--as-dialog-width="calc(100% - 2em)"
			--as-dialog-max-width="800px"
			--as-dialog-height="100%"
			--as-dialog-max-height="calc(100% - 2em)"
		>
			<h1>This is a side pane</h1>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus rem non sunt! Id
				necessitatibus veritatis debitis est tempora iure esse. Nisi, dicta alias nobis velit libero
				deleniti corporis nihil? Eum.
			</p>
		</Dialog>
	</div>
	<Codesample
		code={`<Dialog
	triggerClass="btn"
	triggerLabel="Dialog as Side Pane"
	dialogIn={fly}
	dialogInOptions={{ x: 500 }}
	--as-dialog-left="auto"
	--as-dialog-right="0"
	--as-dialog-transform="translateY(-50%)"
	--as-dialog-border-radius="0"
	--as-dialog-width="calc(100% - 2em)"
	--as-dialog-max-width="800px"
	--as-dialog-height="100%"
	--as-dialog-max-height="calc(100% - 2em)"
	>
	<h1>This is a side pane</h1>
	<p>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus rem non sunt! Id
		necessitatibus veritatis debitis est tempora iure esse. Nisi, dicta alias nobis velit libero
		deleniti corporis nihil? Eum.
	</p>
</Dialog>`}
	/>
</section>

<h3>Custom Trigger</h3>

<section class="toybox">
	<div class="demo">
		<button bind:this={buttonRef} on:click={() => (dialogOpen = !dialogOpen)}>toggle dialog</button>
		<Dialog includedTrigger={false} {buttonRef} bind:open={dialogOpen}>
			<h1>Hello Dialog</h1>
		</Dialog>
	</div>
	<Codesample
		code={`<button bind:this={buttonRef} on:click="{() => (dialogOpen = !dialogOpen)}">toggle dialog</button>
<Dialog includedTrigger={false} {buttonRef} bind:open={dialogOpen}>Hello Dialog</Dialog>`}
	/>
</section>
