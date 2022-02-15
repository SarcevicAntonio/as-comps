<script context="module" lang="ts">
	export const notificationPosition: Writable<NotificationPosition> = writable('top-right');
</script>

<script lang="ts">
	import Codesample from '$internal/Codesample.svelte';
	import type { NotificationPosition } from '$lib';
	import { notification } from '$lib';
	import { Writable, writable } from 'svelte/store';
	let msg = 'a notification';
	let type: 'info' | 'warn' = undefined;
	let removeAfter = undefined;
	let actionable = false;

	function callback() {
		console.log('some action has taken place!');
	}
</script>

<h3>Demo</h3>

<section class="toybox">
	<div class="demo">
		<button
			class="btn"
			on:click={() => {
				notification(msg, {
					type,
					removeAfter,
					action: actionable ? ['action label', callback] : undefined,
				});
			}}
			data-test="notification-create-btn"
		>
			Add a notification
		</button>
	</div>
	<div class="controls">
		<label>
			<span>Message</span>
			<input type="text" bind:value={msg} data-test="notification-msg-input" />
		</label>
		<label>
			<span>Type</span>
			<select bind:value={type}>
				<option value={undefined}>undefined (default)</option>
				<option value="info">info</option>
				<option value="warn">warn</option>
			</select>
		</label>
		<label>
			<span>Remove after</span>
			<input type="number" step="250" bind:value={removeAfter} />
		</label>
		<label>
			<span>Actionable</span>
			<select bind:value={actionable}>
				<option value={false}>false</option>
				<option value={true}>true</option>
			</select>
		</label>
		<label>
			<span>Position</span>
			<select bind:value={$notificationPosition}>
				<option value="top-left">top-left</option>
				<option value="top">top</option>
				<option value="top-right">top-right</option>
				<option value="bottom-left">bottom-left</option>
				<option value="bottom">bottom (default)</option>
				<option value="bottom-right">bottom-right</option>
			</select>
		</label>
	</div>
	<Codesample
		code={`notification("${msg}"${
			type || removeAfter || actionable
				? `, {${
						type
							? `
		type: "${type}",`
							: ''
				  }${
						removeAfter
							? `
		removeAfter: ${removeAfter},`
							: ``
				  }${
						actionable
							? `
		action: ['action label', callback]`
							: ``
				  }
	}`
				: ''
		});${
			$notificationPosition !== 'bottom'
				? `
// <Notifications position="${$notificationPosition}" />`
				: ''
		}`}
		lang="js"
	/>
</section>
