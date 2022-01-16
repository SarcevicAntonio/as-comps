import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

export interface Notification {
	id: string;
	msg: string;
	type: 'info' | 'warn';
	removeAfter: number;
}

export const notifications: Writable<Notification[]> = writable([]);

/**
 *
 * @param msg Notification message, can be any HTML.
 * @param type Notification type ('info' or 'warn')
 * @param removeAfter Time in milliseconds the notification will be displayed
 * @returns id of Notification
 */
export function notification(
	msg: string,
	type: Notification['type'] = 'info',
	removeAfter = 5000
): string {
	const id = new Date().valueOf() + msg;
	notifications.update((all) => [
		{
			id,
			msg,
			type,
			removeAfter,
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
