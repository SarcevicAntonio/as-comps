<script lang="ts">
	import { createEventDispatcher, onDestroy } from 'svelte';
	import { fade, scale } from 'svelte/transition';
	import appendToBody from './actions/appendToBody';
	import { focusTrap } from './actions/focus';
	import Cancel from './Cancel.svelte';
	const dispatch = createEventDispatcher();

	export let isOpen = false;
	export let includedTrigger = true;
	export let mandatory = false;
	export let triggerProps: any = { class: '' };
	export let triggerLabel = 'Open Dialog';
	export let noCloseButton = false;
    export let autofocus = true;

	export let transitionOptions = {};
	export let backdropIn = fade;
	export let backdropInOptions = transitionOptions;
	export let backdropOut = fade;
	export let backdropOutOptions = transitionOptions;
	export let dialogIn = scale;
	export let dialogInOptions = transitionOptions;
	export let dialogOut = fade;
	export let dialogOutOptions = transitionOptions;

	function dismiss() {
		if (mandatory) return;
		isOpen = false;
		dispatch('dismiss');
	}

	function open() {
		isOpen = true;
		dispatch('open');
	}

	function toggle() {
		isOpen = !isOpen;
		if (buttonRef) buttonRef.focus();
	}

	export let buttonRef: HTMLElement = undefined;

	onDestroy(() => {
		isOpen = false;
	});
</script>

<svelte:window
	on:keydown={(evt) => {
		if (isOpen && evt.key === 'Escape') dismiss();
	}}
/>

{#if includedTrigger}
	<button bind:this={buttonRef} {...triggerProps} on:click={open}>
		<slot name="trigger-label">{triggerLabel}</slot>
	</button>
{/if}

{#if isOpen}
	<dialog open use:appendToBody use:focusTrap={{autofocus}} class="container">
		<section
			class="dialog"
			aria-labelledby="dialog-content"
			in:dialogIn={dialogInOptions}
			out:dialogOut={dialogOutOptions}
			on:introstart
			on:outrostart
			on:introend
			on:outroend
			{...$$restProps}
		>
			{#if !(mandatory || noCloseButton)}
				<button class="close-btn" aria-label="Close Dialog or Dialog" on:click={dismiss}>
					<Cancel />
				</button>
			{/if}
			<slot {toggle} {dismiss} {open} />
			{#if $$slots['dialog-actions']}
				<div class="dialog-actions">
					<slot name="dialog-actions" />
				</div>
			{/if}
		</section>
		<div
			on:click={dismiss}
			on:keydown={() => {}}
			on:keyup={() => {}}
			on:keypress={() => {}}
			class="backdrop"
			in:backdropIn={backdropInOptions}
			out:backdropOut={backdropOutOptions}
		/>
	</dialog>
{/if}

<style lang="">
	.container {
		isolation: isolate;
		position: absolute;
	}
	.backdrop {
		z-index: -1;
		position: fixed;
		inset: 0;
		background: var(--as-dialog-backdrop-background, hsl(0, 0%, 0%));
		opacity: var(--as-dialog-backdrop-opacity, 0.8);
	}
	.dialog {
		z-index: 1;
		position: fixed;
		top: var(--as-dialog-top, 50%);
		right: var(--as-dialog-right, auto);
		bottom: var(--as-dialog-bottom, auto);
		left: var(--as-dialog-left, 50%);
		transform: var(--as-dialog-transform, translate(-50%, -50%));
		height: var(--as-dialog-height, auto);
		max-height: var(--as-dialog-max-height, calc(100vh - 4em));
		width: var(--as-dialog-width, fit-content);
		max-width: var(--as-dialog-max-width, calc(100vw - 4em));
		overflow: var(--as-dialog-overflow, auto);
		background: var(--as-dialog-background, white);
		padding: var(--as-dialog-padding, 1em);
		box-shadow: var(
			--as-dialog-shadow,
			0 19px 38px rgba(0, 0, 0, 0.3),
			0 15px 12px rgba(0, 0, 0, 0.22)
		);
		border-radius: var(--as-dialog-border-radius, 0.25em);
	}
	.close-btn {
		position: absolute;
		top: var(--as-dialog--close-btn-top, 1em);
		right: var(--as-dialog--close-btn-right, 1em);
		bottom: var(--as-dialog--close-btn-bottom, auto);
		left: var(--as-dialog--close-btn-left, auto);
		aspect-ratio: var(--as-dialog--close-btn-aspect-ratio, 1/1);
		border-radius: var(--as-dialog--close-btn-border-radius, 999999px);
		margin: var(--as-dialog--close-btn-margin, 0);
		padding: var(--as-dialog--close-btn-padding, 0.3em);
		display: var(--as-dialog--close-btn-display, grid);
		place-items: var(--as-dialog--close-btn-place-items, center);
		font-size: var(--as-dialog--close-btn-font-size, 1em);
		background: var(--as-dialog--close-btn-background, var(--as-dialog-background, white));
		color: var(--as-dialog--close-btn-color, var(--as-dialog-color, black));
		border: var(--as-dialog--close-btn-border, 1px solid black);
	}

	.dialog-actions {
		display: var(--as-dialog--actions-display, flex);
		justify-content: var(--as-dialog--actions-justify-content, space-between);
		gap: var(--as-dialog--actions-gap, 1em);
	}

	:global(.dialog-actions > button) {
		flex-grow: var(--as-dialog--actions--child-button-flex-grow, 1);
	}

	dialog {
		all: unset;
	}

	:global(html:has(dialog[open])) {
		overflow: hidden;
	}
</style>
