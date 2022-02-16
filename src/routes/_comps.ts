import DialogDemo from './_dialog/Demo.svelte';
import DialogDocs from './_dialog/Docs.md';
import NotificationDemo from './_notification/Demo.svelte';
import NotificationDocs from './_notification/Docs.md';
import TabDemo from './_tabgroup/Demo.svelte';
import TabDocs from './_tabgroup/Docs.md';

const comps = [
	{
		id: 'dialog',
		title: '🔲 Dialog',
		comps: [DialogDemo, DialogDocs],
	},
	{
		id: 'notification',
		title: '💬 Notification',
		comps: [NotificationDemo, NotificationDocs],
	},
	{
		id: 'tabs',
		title: '📑 TabGroup + Tab',
		comps: [TabDemo, TabDocs],
	},
];

export default comps;
