<script>
	import { notification, Notifications } from '$lib';
	import { onMount } from 'svelte';
	import '../global.css';

	onMount(() => {
		makeCodeblocksCopyable();
	});

	function makeCodeblocksCopyable() {
		let blocks = document.querySelectorAll('pre');

		blocks.forEach((block) => {
			if (navigator.clipboard) {
				let button = document.createElement('button');
				button.innerText = 'copy';
				button.className = 'copy-btn';
				button.addEventListener('click', copyCode);
				block.prepend(button);
			}
		});

		async function copyCode(event) {
			notification('copied code to clipboard');
			const button = event.srcElement;
			const pre = button.parentElement;
			let code = pre.querySelector('code');
			let text = code.innerText;
			await navigator.clipboard.writeText(text);
		}
	}
</script>

<slot />

<Notifications />
