<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import { fade, fly, scale } from 'svelte/transition';
	import type { Notification, NotificationPosition } from './notificationStore';
	import { removeNotification } from './notificationStore';

	export let notification: Notification;
	export let cancelIcon: typeof SvelteComponent;
	export let position: NotificationPosition;

	let dismissMyself = false;

	function dismiss() {
		dismissMyself = true;
		clearTimeout(notification.timeoutRef);
		removeNotification(notification.id);
	}

	const condTrans = (node, args) => (!dismissMyself ? fade(node, args) : scale(node, args));

	function handleMouseEnter() {
		clearTimeout(notification.timeoutRef);
	}

	function handleMouseLeave() {
		const timeoutRef = setTimeout(() => {
			removeNotification(notification.id);
		}, notification.removeAfter);
		notification.timeoutRef = timeoutRef;
	}
</script>

<div
	class={notification.type}
	in:fly={{ y: position.includes('top') ? 400 : -400, duration: 400 }}
	out:condTrans
	on:mouseenter={handleMouseEnter}
	on:mouseleave={handleMouseLeave}
>
	<span role="status" data-test="notification-msg">
		{@html notification.msg}
	</span>
	{#if notification.action}
		<button
			on:click={() => {
				notification.action[1]();
				dismiss();
			}}
		>
			{notification.action[0]}
		</button>
	{:else}
		<button on:click={dismiss} aria-label="Cancel Button">
			<svelte:component this={cancelIcon} type={notification.type} />
		</button>
	{/if}
</div>

<style>
	div {
		display: flex;
		width: max-content;
		justify-content: space-between;
		align-items: center;
		text-decoration: none;
		font-family: inherit;
		font-weight: 400;
		font-size: 1em;
		padding: var(--as-notification-padding, 1em);
		margin-top: 1em;
		max-width: calc(100vw - 2em);
		border: var(--border, 1px solid black);
		border-radius: var(--border-radius, 0.5em);
		color: var(--color, black);
		backdrop-filter: var(--backdrop-filter, none);
		-webkit-backdrop-filter: var(--backdrop-filter, none);
		box-shadow: var(
			--shadow,
			0 0.3px 1.4px rgba(0, 0, 0, 0.068),
			0 0.7px 3.5px rgba(0, 0, 0, 0.098),
			0 1.4px 7.1px rgba(0, 0, 0, 0.122),
			0 2.9px 14.6px rgba(0, 0, 0, 0.152),
			0 8px 40px rgba(0, 0, 0, 0.22)
		);
	}

	div button {
		display: flex;
		margin-left: 2em;
		border-radius: var(--btn-border-radius, 999999999px);
		padding: var(--btn-padding, 0.3em);
		font-size: var(--btn-font-size, 1em);
		border: var(--btn-border, 1px solid black);
		background: var(--btn-background, white);
		color: inherit;
		cursor: pointer;
	}

	.info {
		color: var(--info-color, var(--color, black));
		border-color: var(--info-border-color, #2786cb);
		background: var(--info-background, #abd2ef);
	}

	.warn {
		color: var(--warn-color, var(--color, black));
		border-color: var(--warn-border-color, #c92626);
		background: var(--warn-background, #efa9a9);
	}
</style>
