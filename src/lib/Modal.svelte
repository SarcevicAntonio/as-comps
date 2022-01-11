<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import Cancel from './Cancel.svelte';

	export let open = false;
	export let includedTrigger = true;
	export let dismissable = true;
	export let triggerClass = '';
	export let triggerLabel = "Open Modal";

	function keydown(event: KeyboardEvent) {
		if (event.key === 'Escape') dismiss();
	}

	function dismiss() {
		if (dismissable) open = false;
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
	<div class="container">
		<div class="overlay" transition:fade on:click={dismiss} />
		<div class="modal" role="dialog" in:scale out:fade>
			{#if dismissable}
				<button class="close-btn" aria-label="Close Modal or Dialog" on:click={dismiss}>
					<Cancel />
				</button>
			{/if}
			<div class="modal-content">
				<slot />
				{#if $$slots.modalActions}
					<div class="modal-actions">
						<slot name="modalActions" />
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
	.modal {
		z-index: 1;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		max-height: calc(100vh - 4em);
		width: fit-content;
		max-width: calc(100vw - 4em);
		overflow: auto;
		background: var(--as-modal-background, white);
		padding: 1em;
		box-shadow: var(
			--as-modal-shadow,
			0 19px 38px rgba(0, 0, 0, 0.3),
			0 15px 12px rgba(0, 0, 0, 0.22)
		);
		border-radius: var(--as-modal-border-radius, 0.25em);
	}
	:global(.modal-content > *:first-child) {
		margin-top: 0;
	}
	:global(.modal-content > *:last-child, .modal-content > *:last-child, .modal-content
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
	.modal-actions {
		display: flex;
		justify-content: space-between;
		gap: 1em;
	}
	:global(.modal-actions > button) {
		flex-grow: 1;
	}
	.overlay {
		z-index: -1;
		position: fixed;
		inset: 0;
		background: var(--as-modal-backdrop-background, hsla(0, 0%, 0%, 0.8));
	}
</style>
