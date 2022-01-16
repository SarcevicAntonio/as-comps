<script lang="ts">
	import { addToast } from '$lib';
	import Prism from 'prismjs';

	let msg = 'Just a toast';
	let type: 'info' | 'warn' = 'info';
	let delay = 5000;

	$: code = `addToast("${msg}"${type ? `, "${type}"` : delay ? `, undefined` : ''}${
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
				addToast(msg, type, delay);
			}}
			data-test="toast-create-btn"
		>
			Add a toast
		</button>
	</div>
	<pre class="language-js"><code class="language-js">{@html codeHtml}</code></pre>
	<div class="controls">
		<label>
			<span>Message</span>
			<input type="text" bind:value={msg} data-test="toast-msg-input" />
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
