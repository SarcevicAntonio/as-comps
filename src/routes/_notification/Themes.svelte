<script lang="ts">
	import { Notifications } from '$lib/index';
	let themeIndex = 0;
	let themes = [
		`/* default theme */
/* click the button above to check out some theme ideas */`,
		`/* Glassmorphism */
/* inspired by Glass UI Glassmorphism generator (https://ui.glass/generator/) */
--as-notification-border: 1px solid rgba(209, 213, 219, 0.3);
--as-notification-backdrop-filter: blur(8px);
--as-notification-shadow:
  0px 1.4px 2.2px rgba(0, 0, 0, 0.028),
  0px 4.7px 7.4px rgba(0, 0, 0, 0.042),
  0px 21px 33px rgba(0, 0, 0, 0.07);
--as-notification-btn-border: none;
--as-notification-info-border-color: rgba(209, 213, 219, 0.3);
--as-notification-info-background: rgba(255, 255, 255, 0.7);
--as-notification-warn-border-color: hsl(0, 68%, 47%, 30%);
--as-notification-warn-background: hsla(0, 69%, 80%, 0.7);
  `,
		`/* compact */
--as-notification-padding: 0.25em 0.5em;
`,
		`/* Material */
/* from https://material-components.github.io/material-components-web-catalog/#/component/snackbar */
--as-notification-padding: 14px 16px;
--as-notification-border: none;
--as-notification-border-radius: 4px;
--as-notification-shadow: 0 3px 5px -1px rgb(0 0 0 / 20%), 0 6px 10px 0 rgb(0 0 0 / 14%), 0 1px 18px 0 rgb(0 0 0 / 12%);
--as-notification-btn-border: none;
--as-notification-btn-background: transparent;
--as-notification-info-background: #333;
--as-notification-info-color: hsla(0,0%,100%,.87);
--as-notification-warn-background: hsl(0deg 40% 20%);
--as-notification-warn-color: hsla(0,0%,100%,.87);
`,
		`/* Flat */
--as-notification-border: none;
--as-notification-shadow: 4px 4px 0px rgba(0, 0, 0, 0.07);
--as-notification-border-radius: 0px;
--as-notification-info-background: #F8EFBA;
--as-notification-warn-background: #F97F51;
`,
		`/* Neumorphism */
/* inspired by Neumorphism.io generator (https://neumorphism.io/) */
--as-notification-border: none;
--as-notification-border-radius: 50px;
--as-notification-box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff;
--as-notification-btn-border: none;
--as-notification-btn-background: transparent;
--as-notification-info-background: linear-gradient(145deg, #cacaca, #f0f0f0);
--as-notification-warn-background: linear-gradient(145deg, #d79898, #ffb5b5);
`,
		`/* Terminal */
--as-notification-color: lime;
--as-notification-shadow: none;
--as-notification-btn-border: 1px solid lime;
--as-notification-btn-background: transparent;
--as-notification-info-background: black;
--as-notification-info-border-color: lime;
--as-notification-warn-background: #561010;
--as-notification-warn-border-color: lime;
`,
	];
</script>

<h2 id="themes">Pre-Build Css Props Theme Ideas 🎨</h2>

<button
	class="btn"
	on:click={() => {
		themeIndex = themes[themeIndex + 1] ? themeIndex + 1 : 0;
	}}
>
	Next Theme Idea
</button>

<pre class="language-css">
  <code class="language-css">
{themes[themeIndex]}
  </code>
</pre>

<div style={'display:contents;' + themes[themeIndex]}>
	<Notifications />
</div>

<style>
	pre {
		height: 250px;
		overflow-y: scroll;
	}
</style>
