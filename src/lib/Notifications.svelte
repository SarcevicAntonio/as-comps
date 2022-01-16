<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import { flip } from 'svelte/animate';
	import Cancel from './Cancel.svelte';
	import Notification from './Notification.svelte';
	import { notifications } from './notificationStore';

	export let notificationComponent = Notification;
	export let cancelIcon: typeof SvelteComponent = Cancel;
</script>

{#if $notifications.length}
	<ul>
		{#each $notifications as notification (notification.id)}
			<li animate:flip>
				<svelte:component this={notificationComponent} {notification} {cancelIcon} />
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
		bottom: var(--as-notification-bottom, 1em);
		right: 50%;
		transform: translate(50%, 0%);

		margin: 0;
		padding: 0;
	}
</style>
