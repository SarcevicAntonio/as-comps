<script>
	import { addToast, Modal } from '$lib';
	import Prism from 'prismjs';

	function deleteEntry() {
		addToast('Deleted entry', 'warn');
	}

	let dismissable = true;
	let triggerLabel = 'Delete Entry';

	$: code = `<Modal let:toggle${dismissable ? '' : ' dismissable={false}'}${
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
</Modal>`;

	$: codeHtml = Prism.highlight(code, Prism.languages.html, 'html');
</script>

<h3 id="demo">Demo</h3>

<section class="toybox">
	<div class="demo">
		<Modal let:toggle {dismissable} {triggerLabel} triggerClass="btn">
			<h2 data-test="modal-content">Are you sure you want to delete the entry?</h2>
			<p>This action can not be reversed.</p>
			<svelte:fragment slot="modalActions">
				<button class="btn" on:click={toggle}>No</button>
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
	<pre class="language-html"><code class="language-html">{@html codeHtml}</code></pre>
	<div class="controls">
		<label>
			<span>Dismissable</span>
			<select bind:value={dismissable} data-test="modal-dismissable-select">
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
