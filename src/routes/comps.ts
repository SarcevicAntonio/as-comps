import { writable } from 'svelte/store';
import DialogDemo from './_dialog/Demo.svelte';
import DialogDocs from './_dialog/Docs.md';
import NotificationDemo from './_notification/Demo.svelte';
import NotificationDocs from './_notification/Docs.md';

export const intersecting_articles = writable({});

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
	// {
	// 	id: 'tabs',
	// 	title: '📑 TabGroup + Tab (pre-alpha)',
	// 	comps: [TabDemo, TabDocs],
	// },
	// {
	// 	id: 'input',
	// 	title: '🔡 Input (pre-alpha)',
	// 	comps: [InputDemo],
	// },
];

export default comps;
