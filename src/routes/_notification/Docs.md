### Docs

To **show the notifications**, import and place the `<Notifications />` component
inside your `src/routes/__layout.svelte` for SvelteKit
or `src/pages/_layout.svelte` for Routify, like this:

```html
<script>
	import { Notifications } from 'as-comps';
</script>

<slot />

<Notifications />
```

This is used to display the notifications, so it needs to be rendered wherever you want your notifications
visible.

`{...$$restProps}` get spread to the underlying `<ul>` element that shows the notifications.

#### Notification position

By default, the notifications will be displayed on the top right, i.e. `"top-right"`. You can also place it to either `"top-left"` `"top"`, `"bottom-left"`, `"bottom"`, or `"bottom-right"` by setting the `position` prop on the `<Notifications />` component.

```html
<Notifications position="top-right" />
```

#### `notification(msg, {type, removeAfter, action})`

To create or **add a notification** import the `notification` function from
`'as-comps'` and call it with a message or any HTML.

The second parameter is a notificationOption object where the the properties `type`, `removeAfter` or `action` can be set:

- `type` controls the type of notification: 'info' (default) or 'warn'
- `removeAfter` controls how long a notification stays on screen in ms, defaulting to 5000
- `action` can be used to attach an action to the component. Pass in an array consisting of two entries: at index 0 a `label` for the notification action button and at index 1 a `callback` function that gets called when the action button is pressed. Setting an Action increases the default `removeAfter` time by two.

```js
import { notification } from 'as-comps';

notification('hello notification');

notification('<b>yaay!</b> you did it!');

notification('a warning notification', { type: 'warn' });

notification('This notification will display for about 11,574 days.', { removeAfter: 9001 });

notification('You did something undoable.', { action: ['undo', undoCallback] });
```

<!--
#### Customizing with CSS Custom Properties

The default notification item component can be replaced, but is also highly configurable using
CSS Custom Properties. Overwrite the defaults, either by setting CSS Custom Properties in a global
scope like this:

```css
:root {
	--as-notification-border-radius: 0; /* gives notifications square shape */
}
```

Or you can use <a href="https://svelte.dev/docs#style_props" target="_blank">--style-props sugar</a>:

```html
<Notifications --as-notification-border-radius="999px" />
gives notifications pill shape
```

##### Full list of CSS Custom Properties with defaults

<details>
  <summary>
    Toggle full list
  </summary>

<pre class="language-css">
  <code class="language-css">
/* Notifications Wrapper */
--as-notification-bottom: 1em; /* Distance from bottom of screen */

/* Notification */
--as-notification-padding: 1em;
--as-notification-border: 1px solid black;
--as-notification-border-radius: 0.5em;
--as-notification-color: black;
--as-notification-backdrop-filter: none;
--as-notification-shadow:  0 0.3px 1.4px rgba(0, 0, 0, 0.068),
                    0 0.7px 3.5px rgba(0, 0, 0, 0.098),
                    0 1.4px 7.1px rgba(0, 0, 0, 0.122),
                    0 2.9px 14.6px rgba(0, 0, 0, 0.152),
                    0 8px 40px rgba(0, 0, 0, 0.22);

/* Inline Notification Cancel Button */
--as-notification-btn-border-radius: 999999999px;
--as-notification-btn-padding: 0.45em;
--as-notification-btn-border: 1px solid black;
-as-notification-btn-background: white;

/* Type: 'info'*/
--as-notification-info-color: var(--as-notification-color, black);
--as-notification-info-border-color: #2786cb;
--as-notification-info-background: #abd2ef;

/* Type: 'warn'*/
--as-notification-warn-color: var(--as-notification-color, black);
--as-notification-warn-border-color: #c92626;
--as-notification-warn-background: #efa9a9;
  </code>
</pre>
</details>

Check out some [theme ideas at the end of the page](#themes)!

#### Customizing by replacing default components

The default notification item and cancel icon components can be replaced.
Pass in your custom components to the `<Notifications />` component.

```html
<Notifications {notificationComponent} {cancelIcon} />
```

To create custom notification item or cancel icon components, refer to the original components' source
code:

- <a href="https://github.com/SarcevicAntonio/as-notification/blob/main/src/lib/Notification.svelte" target="_blank">
    Sourcecode for notification item component
  </a>
- <a href="https://github.com/SarcevicAntonio/as-notification/blob/main/src/lib/Cancel.svelte" target="_blank">
      Sourcecode for cancel icon component
    </a>

-->
