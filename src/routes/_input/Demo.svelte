<script>
	import Codesample from '$internal/Codesample.svelte';
	import Input from '$lib/Form/Input.svelte';

	let label = 'Label';
	let placeholder = null;
	let type = 'text';
	let typeOptions = ['text', 'number'];
	let disabled = false;
	let clearable = false;
	let outlined = false;
</script>

<h3>Demo</h3>

<section class="toybox">
	<div class="demo">
		<Input {placeholder} {type} {disabled} {clearable} {outlined}>{label}</Input>
	</div>
	<div class="controls">
		<label>
			<span>label</span>
			<input type="text" bind:value={label} />
		</label>
		<label>
			<span>placeholder</span>
			<input type="text" bind:value={placeholder} />
		</label>
		<label>
			<span>type</span>
			<select bind:value={type}>
				{#each typeOptions as value}
					<option {value}>{value}</option>
				{/each}
			</select>
		</label>
		<label>
			<span>disabled</span>
			<input type="checkbox" bind:checked={disabled} />
		</label>
		<label>
			<span>clearable</span>
			<input type="checkbox" bind:checked={clearable} />
		</label>
		<label>
			<span>outlined</span>
			<input type="checkbox" bind:checked={outlined} />
		</label>
	</div>
	<Codesample
		code={`<Input${placeholder ? ` placeholder="${placeholder}"` : ''}${
			type !== 'text' ? ` type="${type}"` : ''
		}${disabled ? ' disabled' : ''}${clearable ? ' clearable' : ''}${
			outlined ? ' outlined' : ''
		}>${label}</Input>`}
	/>
</section>
