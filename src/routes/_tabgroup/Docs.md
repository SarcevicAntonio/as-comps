### Docs

To create a TabGroup wrap `<Tab/>` components with a `<TabGroup/>`.

```html
<TabGroup>
	<Tab label="Tab One">some random tab content</Tab>
	<Tab label="Second Tab">other tab content</Tab>
	<Tab label="Tab, the Third">
		Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum, natus?
	</Tab>
</TabGroup>
```

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
