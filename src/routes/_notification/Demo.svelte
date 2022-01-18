<script lang="ts">
	import { notification } from '$lib';
	import Codesample from '../_internal/Codesample.svelte';

	let msg = 'a notification';
	let type: 'info' | 'warn' = undefined;
	let removeAfter = 0;
	let actionable = false;

	$: code = `notification("${msg}"${
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
	});`;

	function callback() {
		console.log('some action has taken place!');
	}
</script>

<h3 id="demo">Demo</h3>

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
	<Codesample {code} lang="js" />
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
	</div>
</section>
