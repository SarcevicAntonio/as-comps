<script lang="ts">
	import { notification } from '$lib';
	import Prism from 'prismjs';

	let msg = 'Just a notification';
	let type: 'info' | 'warn' = 'info';
	let delay = 5000;

	$: code = `notification("${msg}"${type ? `, "${type}"` : delay ? `, undefined` : ''}${
		delay ? `, ${delay}` : ''
	});`;

	$: codeHtml = Prism.highlight(code, Prism.languages.javascript, 'javascript');
</script>

<h3 id="demo">Demo</h3>

<section class="toybox">
	<div class="demo">
		<button
			class="btn"
			on:click={() => {
				notification(msg, type, delay);
			}}
			data-test="notification-create-btn"
		>
			Add a notification
		</button>
	</div>
	<pre class="language-js"><code class="language-js">{@html codeHtml}</code></pre>
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
			<input type="number" bind:value={delay} />
		</label>
	</div>
</section>
