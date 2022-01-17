import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';

export interface Notification {
	id: string;
	msg: string;
	type: 'info' | 'warn';
	removeAfter: number;
	action?: [label: string, callback: (...args: unknown[]) => unknown];
}

export interface notificationOptions {
	type?: Notification['type'];
	removeAfter?: Notification['removeAfter'];
	action?: Notification['action'];
}

export const notifications: Writable<Notification[]> = writable([]);

/**
 *
 * @param msg Notification message, can be any HTML.
 * @param notificationOptions type, removeAfter, action
 * @returns id of Notification
 */
export function notification(
	msg: string,
	{ type = 'info', removeAfter = 5000, action = undefined } = {} as notificationOptions
): string {
	const id = uuidv4();

	if (!removeAfter) removeAfter = 5000;
	if (action) removeAfter = removeAfter * 2;

	notifications.update((all) => [
		{
			id,
			msg,
			type,
			removeAfter,
			action,
		},
		...all,
	]);

	setTimeout(() => {
		removeNotification(id);
	}, removeAfter);
	return id;
}

export function removeNotification(id: string): void {
	notifications.update((all) => all.filter((notification) => notification.id !== id));
}
