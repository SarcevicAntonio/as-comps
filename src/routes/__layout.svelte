<script>
	import { Notifications } from '$lib';
	import '../global.css';
	import { notificationPosition } from './_notification/Demo.svelte';
</script>

<slot />

<Notifications position={$notificationPosition} />
