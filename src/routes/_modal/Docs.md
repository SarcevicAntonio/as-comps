### Docs

To **display a modal**, import and place the `<Modal></Modal>` component inside a `.svelte` file. Place the modal content between the tags.

```html
<script>
	import { Modal } from 'as-comps';
</script>

<Modal>Hello Modal</Modal>
```

#### `includedTrigger` & `bind:open`

**By default, the modal comes with it's own trigger**, so you don't have to handle the opening logic with local state.

You can also provide your own trigger if you pass `includedTrigger={false}` to the component and bind the `open` prop to control the opening logic.

```html
<script>
	let modalOpen = false;
</script>

<button on:click="{() => modalOpen = !modalOpen}">toggle modal</button>

<Modal includedTrigger="{false}" bind:open="{modalOpen}">Hello Modal</Modal>
```

#### `triggerLabel` & `triggerClass`

If you want to override the default trigger label or class you can pass in the props `triggerLabel` and `triggerClass`.

```html
<Modal triggerLabel="my modal" triggerClass="btn">Hello Modal</Modal>
```

#### `let:toggle` & `slot="modalActions"`

When creating a confirm modal, you need to toggle the opening state at different places. For this, a `toggle()` function is provided via slot props. Simply add `let:toggle` to the `<Modal>` tag and call it when appropriate.

```html
<Modal let:toggle triggerLabel="Delete Entry">
	<h2>Are you sure you want to delete the entry?</h2>
	<p>This action can not be reversed.</p>
	<svelte:fragment slot="modalActions">
		<button on:click="{toggle}">No</button>
		<button
			on:click="{() => {
				deleteEntry();
				toggle();
			}}"
		>
			Yes
		</button>
	</svelte:fragment>
</Modal>
```

Above you can see the usage for `slot="modalActions"`. This can be used to display options / buttons of a modal dialog in a row.

#### `dismissable`

By default the modal is dismissable and will close on <kbd>ESC</kbd>, by clicking outside or by clicking the `x`-Mark button. If you pass in `dismissable={false}` the modal is non-dismissable and won't close unless you call `let:toggle` or change the value of `bind:open`.

```html
<Modal let:toggle dismissable="{false}">
	<h2>Non-Dismissable</h2>
	<svelte:fragment slot="modalActions">
		<button on:click="{toggle}">Close</button>
	</svelte:fragment>
</Modal>
```
