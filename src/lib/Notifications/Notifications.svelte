<script lang="ts">
	import { appendToBody } from '$lib';
	import type { SvelteComponent } from 'svelte';
	import { flip } from 'svelte/animate';
	import Cancel from '../Cancel.svelte';
	import Notification from './Notification.svelte';
	import type { NotificationPosition } from './notificationStore';
	import { notifications } from './notificationStore';

	export let notificationComponent = Notification;
	export let cancelIcon: typeof SvelteComponent = Cancel;
	export let position: NotificationPosition = 'top-right';
</script>

{#if $notifications.length}
	<ul class="as-notification-{position}" use:appendToBody>
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
		position: fixed;

		margin: 0;
		padding: 0;
	}
	:global(.as-notification-top-left) {
		top: var(--as-notification-padding, 1em);
		left: var(--as-notification-padding, 1em);
		align-items: start;
	}
	:global(.as-notification-top) {
		top: var(--as-notification-padding, 1em);
		right: 50%;
		transform: translate(50%, 0%);
		align-items: center;
	}
	:global(.as-notification-top-right) {
		top: var(--as-notification-padding, 1em);
		right: var(--as-notification-padding, 1em);
		align-items: end;
	}
	:global(.as-notification-bottom-left) {
		bottom: var(--as-notification-padding, 1em);
		left: var(--as-notification-padding, 1em);
		align-items: start;
	}
	:global(.as-notification-bottom) {
		bottom: var(--as-notification-padding, 1em);
		right: 50%;
		transform: translate(50%, 0%);
		align-items: center;
	}
	:global(.as-notification-bottom-right) {
		bottom: var(--as-notification-padding, 1em);
		right: var(--as-notification-padding, 1em);
		align-items: end;
	}
</style>
