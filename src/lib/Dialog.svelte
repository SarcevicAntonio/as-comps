<script lang="ts">
	import { appendToBody, focusTrap } from '$lib';
	import { fade, scale } from 'svelte/transition';
	import Cancel from './Cancel.svelte';

	export let open = false;
	export let includedTrigger = true;
	export let mandatory = false;
	export let triggerClass = '';
	export let triggerLabel = 'Open Dialog';

	function dismiss() {
		if (!mandatory) open = false;
	}

	function toggle() {
		open = !open;
	}
</script>

<svelte:window
	on:keydown={(evt) => {
		evt.key === 'Escape' ? dismiss() : null;
	}}
/>

{#if includedTrigger}
	<button
		class={triggerClass}
		on:click={() => {
			open = !open;
		}}
	>
		<slot name="trigger-label">{triggerLabel}</slot>
	</button>
{/if}

{#if open}
	<dialog open on:click={dismiss} use:focusTrap use:appendToBody transition:fade class="container">
		<section class="dialog" aria-labelledby="dialog-content" in:scale out:fade {...$$restProps}>
			{#if !mandatory}
				<button class="close-btn" aria-label="Close Dialog or Dialog" on:click={dismiss}>
					<Cancel />
				</button>
			{/if}
			<slot {toggle} />
			{#if $$slots['dialog-actions']}
				<div class="dialog-actions">
					<slot name="dialog-actions" />
				</div>
			{/if}
		</section>
	</dialog>
{/if}

<style lang="">
	.container {
		isolation: isolate;
		position: absolute;
	}
	.container::after {
		content: '';
		z-index: -1;
		position: fixed;
		inset: 0;
		background: var(--as-dialog-backdrop-background, hsl(0, 0%, 0%));
		opacity: 0.8;
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
</style>
