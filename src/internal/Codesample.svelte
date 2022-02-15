<script>
	import { notification } from '$lib';
	import Prism from 'prismjs';

	export let lang = 'html';
	export let code = '<h1>test</h1>';

	$: codeHtml = Prism.highlight(code, Prism.languages[lang], lang);

	async function copyCode() {
		await navigator.clipboard.writeText(code);
		notification('Copied your code sample to clipboard!');
	}
</script>

<div>
	<button class="copy-btn" on:click={copyCode}>copy</button>
</div>

<pre class="language-{lang}">
	<code class="language-{lang}">
		{@html codeHtml}
	</code>
</pre>

<style>
	div {
		position: relative;
	}
	button {
		position: absolute;
		top: 1em;
		right: 0.5em;
	}
</style>
