### Docs

To **display a dialog**, import and place the `<Dialog></Dialog>` component inside a `.svelte` file. Slot the dialog content between the tags.

```html
<script>
	import { Dialog } from 'as-comps';
</script>

<dialog>Hello Dialog</dialog>
```

`{...$$restProps}` get spread to the underlying `<section>` element that shows the slot content.

#### `includedTrigger` & `bind:open`

**By default, the dialog comes with it's own trigger**, so you don't have to handle the opening logic with local state.

You can also provide your own trigger if you pass `includedTrigger={false}` to the component and bind the `open` prop to control the opening logic.

```html
<script>
	let dialogOpen = false;
</script>

<button on:click="{() => dialogOpen = !dialogOpen}">toggle dialog</button>

<dialog includedTrigger="{false}" bind:open="{dialogOpen}">Hello Dialog</dialog>
```

#### `triggerLabel` & `triggerClass`

If you want to override the default trigger label or class you can pass in the props `triggerLabel` and `triggerClass`.

```html
<dialog triggerLabel="my dialog" triggerClass="btn">Hello Dialog</dialog>
```

Or you can pass in a `slot="trigger-label"`

```html
<dialog>
	<svelte:fragment slot="trigger-label">my dialog</svelte:fragment>
	Hello Dialog
</dialog>
```

#### `let:toggle` & `slot="dialog-actions"`

When creating a confirm dialog, you need to toggle the opening state at different places. For this, a `toggle()` function is provided via slot props. Simply add `let:toggle` to the `<Dialog>` tag and call it when appropriate.

```html
<dialog let:toggle triggerLabel="Delete Entry">
	<h2>Are you sure you want to delete the entry?</h2>
	<p>This action can not be reversed.</p>
	<svelte:fragment slot="dialogActions">
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
</dialog>
```

Above you can see the usage for `slot="dialogActions"`. This can be used to display options / buttons of a dialog dialog in a row.

#### `mandatory`

By default the dialog is dismissable (not mandatory) and will close on <kbd>ESC</kbd>, by clicking outside or by clicking the `x`-Mark button. If you pass in the `mandatory` prop the dialog is non-dismissable and won't close unless you call `let:toggle` or change the value of `bind:open`.

```html
<dialog let:toggle mandatory>
	<h2>Non-Dismissable</h2>
	<svelte:fragment slot="dialogActions">
		<button on:click="{toggle}">Close</button>
	</svelte:fragment>
</dialog>
```
