<script lang="ts">
	import appendToBody from './actions/appendToBody';
	import { focusTrap } from './actions/focus';
	import { fade, scale } from 'svelte/transition';
	import Cancel from './Cancel.svelte';

	export let open = false;
	export let includedTrigger = true;
	export let mandatory = false;
	export let triggerClass = '';
	export let triggerLabel = 'Open Dialog';
	export let noCloseButton = false;

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
	<dialog open use:appendToBody use:focusTrap class="container">
		<section
			class="dialog"
			aria-labelledby="dialog-content"
			in:dialogIn={dialogInOptions}
			out:dialogOut={dialogOutOptions}
			{...$$restProps}
		>
			{#if !(mandatory || noCloseButton)}
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
		<div
			on:click={dismiss}
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
		background: var(--backdrop-background, hsl(0, 0%, 0%));
		opacity: 0.8;
	}
	.dialog {
		z-index: 1;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		height: var(--height, auto);
		max-height: var(--max-height, calc(100vh - 4em));
		width: var(--width, fit-content);
		max-width: var(--max-width, calc(100vw - 4em));
		overflow: auto;
		background: var(--background, white);
		color: var(--color, black);
		padding: 1em;
		box-shadow: var(--shadow, 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22));
		border-radius: var(--border-radius, 0.25em);
	}
	.close-btn {
		float: right;
		float: inline-end;
		aspect-ratio: 1/1;
		border-radius: 999999px;
		margin: 0;
		padding: var(--btn-padding, 0.3em);
		display: grid;
		place-items: center;
		font-size: var(--close-btn-font-size, 1em);
		background: var(--close-btn-background, var(--background, white));
		color: var(--close-btn-color, var(--color, black));
		border: var(--close-btn-border, 1px solid black);
	}
	.dialog-actions {
		display: flex;
		justify-content: space-between;
		gap: 1em;
	}
	:global(.dialog-actions > button) {
		flex-grow: 1;
	}
	dialog {
		all: unset;
	}
</style>
