<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import Cancel from './Cancel.svelte';

	export let open = false;
	export let includedTrigger = true;
	export let mandatory = false;
	export let triggerClass = '';
	export let triggerLabel = 'Open Dialog';

	function keydown(event: KeyboardEvent) {
		if (event.key === 'Escape') dismiss();
	}

	function dismiss() {
		if (!mandatory) open = false;
	}

	function toggle() {
		open = !open;
	}

	export function bodyPortal(node: HTMLElement) {
		document.querySelector('body').appendChild(node);
	}
</script>

<svelte:body on:keydown={keydown} />

{#if includedTrigger}
	<button
		class={triggerClass}
		on:click={() => {
			open = !open;
		}}
	>
		<slot name="triggerLabel">{triggerLabel}</slot>
	</button>
{/if}

{#if open}
	<div class="container" use:bodyPortal>
		<div class="overlay" transition:fade on:click={dismiss} />
		<div class="dialog" role="dialog" aria-labelledby="dialog-content" in:scale out:fade>
			{#if !mandatory}
				<button class="close-btn" aria-label="Close Dialog or Dialog" on:click={dismiss}>
					<Cancel />
				</button>
			{/if}
			<div id="dialog-content">
				<slot {toggle} />
				{#if $$slots.dialogActions}
					<div class="dialog-actions">
						<slot name="dialogActions" />
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}

<style lang="">
	.container {
		isolation: isolate;
		position: absolute;
	}
	.dialog {
		z-index: 1;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		max-height: calc(100vh - 4em);
		width: fit-content;
		max-width: calc(100vw - 4em);
		overflow: auto;
		background: var(--as-dialog-background, white);
		padding: 1em;
		box-shadow: var(
			--as-dialog-shadow,
			0 19px 38px rgba(0, 0, 0, 0.3),
			0 15px 12px rgba(0, 0, 0, 0.22)
		);
		border-radius: var(--as-dialog-border-radius, 0.25em);
	}
	:global(#dialog-content > *:first-child) {
		margin-top: 0;
	}
	:global(#dialog-content > *:last-child, #dialog-content > *:last-child, #dialog-content
			> *:last-child
			*) {
		margin-bottom: 0;
	}
	.close-btn {
		float: right;
		float: inline-end;
		aspect-ratio: 1/1;
		border-radius: 999999px;
		margin: 0;
	}
	.dialog-actions {
		display: flex;
		justify-content: space-between;
		gap: 1em;
	}
	:global(.dialog-actions > button) {
		flex-grow: 1;
	}
	.overlay {
		z-index: -1;
		position: fixed;
		inset: 0;
		background: var(--as-dialog-backdrop-background, hsla(0, 0%, 0%, 0.8));
	}
</style>
