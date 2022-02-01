<script context="module" lang="ts">
	export type NotificationPosition =
		| 'top-left'
		| 'top'
		| 'top-right'
		| 'bottom-left'
		| 'bottom'
		| 'bottom-right';
</script>

<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import { flip } from 'svelte/animate';
	import Cancel from '../Cancel.svelte';
	import Notification from './Notification.svelte';
	import { notifications } from './notificationStore';

	export let notificationComponent = Notification;
	export let cancelIcon: typeof SvelteComponent = Cancel;
	export let position: NotificationPosition = 'bottom';
</script>

{#if $notifications.length}
	<ul class="as-notification-{position}">
		{#each $notifications as notification (notification.id)}
			<li animate:flip>
				<svelte:component this={notificationComponent} {notification} {cancelIcon} {position} />
			</li>
		{/each}
	</ul>
{/if}

<style>
	ul {
		list-style: none;

		display: flex;
		flex-direction: column;
		align-items: center;

		position: fixed;

		margin: 0;
		padding: 0;
	}
	:global(.as-notification-top) {
		top: var(--as-notification-padding, 1em);
		right: 50%;
		transform: translate(50%, 0%);
	}
	:global(.as-notification-top-left) {
		top: var(--as-notification-padding, 1em);
		left: var(--as-notification-padding, 1em);
	}
	:global(.as-notification-top-right) {
		top: var(--as-notification-padding, 1em);
		right: var(--as-notification-padding, 1em);
	}
	:global(.as-notification-bottom) {
		bottom: var(--as-notification-padding, 1em);
		right: 50%;
		transform: translate(50%, 0%);
	}
	:global(.as-notification-bottom-left) {
		bottom: var(--as-notification-padding, 1em);
		left: var(--as-notification-padding, 1em);
	}
	:global(.as-notification-bottom-right) {
		bottom: var(--as-notification-padding, 1em);
		right: var(--as-notification-padding, 1em);
	}
</style>
