### Docs

To create a TabGroup wrap `<Tab/>` components with a `<TabGroup/>`.
The content of the tabs will still be rendered when JavaScript is disabled making it indexable and SSR compatible.

```html
<TabGroup>
	<Tab label="Tab One">some random tab content</Tab>
	<Tab label="Second Tab">other tab content</Tab>
	<Tab label="Tab, the Third">
		Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum, natus?
	</Tab>
</TabGroup>
```

`{...$$restProps}` for `<TabGroup>` get spread to the underlying `<ul>` element that shows the different tab buttons.

`{...$$restProps}` for `<Tab>` get spread to the underlying `<section>` element that displays the tab content.

#### `triggerClass`

You can pass in a CSS class to customize the look of the trigger buttons.

```html
<TabGroup triggerClass="btn">
	<Tab label="Tab One">some random tab content</Tab>
	<Tab label="Second Tab">other tab content</Tab>
	<Tab label="Tab, the Third">
		Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum, natus?
	</Tab>
</TabGroup>
```
