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
		border: var(--as-notification-border, 1px solid black);
		border-radius: var(--as-notification-border-radius, 0.5em);
		color: var(--as-notification-color, black);
		backdrop-filter: var(--as-notification-backdrop-filter, none);
		-webkit-backdrop-filter: var(--as-notification-backdrop-filter, none);
		box-shadow: var(
			--as-notification-shadow,
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
		border-radius: var(--as-notification-btn-border-radius, 999999999px);
		padding: var(--as-notification-btn-padding, 0.45em);
		border: var(--as-notification-btn-border, 1px solid black);
		background: var(--as-notification-btn-background, white);
		cursor: pointer;
	}

	.info {
		color: var(--as-notification-info-color, var(--as-notification-color, black));
		border-color: var(--as-notification-info-border-color, #2786cb);
		background: var(--as-notification-info-background, #abd2ef);
	}

	.warn {
		color: var(--as-notification-warn-color, var(--as-notification-color, black));
		border-color: var(--as-notification-warn-border-color, #c92626);
		background: var(--as-notification-warn-background, #efa9a9);
	}
</style>
