import type { actionReturn } from './types';

const focusableSelectors = ['a', 'button', 'input', 'textarea', 'select', 'details', '[tabindex]'];

function getFocusable(element: HTMLElement) {
	return Array.from(element.querySelectorAll<HTMLElement>(focusableSelectors.join(', '))).filter(
		(element) => !(element.hasAttribute('disabled') || element.tabIndex === -1)
	);
}

export function focusTrap(element: HTMLElement): actionReturn {
	let focusable = getFocusable(element);
	focusable[0].focus();

	function handleKeydown(event: KeyboardEvent) {
		focusable = getFocusable(element);
		if (event.key === 'Tab') {
			const currentFocusIndex = focusable.indexOf(document.activeElement as HTMLElement);
			event.preventDefault();

			if (event.shiftKey) {
				currentFocusIndex !== 0
					? focusable[currentFocusIndex - 1].focus()
					: focusable[focusable.length - 1].focus();
			} else {
				currentFocusIndex !== focusable.length - 1
					? focusable[currentFocusIndex + 1].focus()
					: focusable[0].focus();
			}
		}
	}

	element.addEventListener('keydown', handleKeydown);

	return {
		destroy() {
			element.removeEventListener('keydown', handleKeydown);
		},
	};
}

export function arrowKeyFocus(
	element: HTMLElement,
	orientation = 'horizontal'
): { destroy(): void } {
	let moveKeys = ['ArrowLeft', 'ArrowRight'];
	if (orientation === 'vertical') moveKeys = ['ArrowDown', 'ArrowUp'];

	function handleKeydown(event: KeyboardEvent) {
		const focusable = getFocusable(element);
		if (moveKeys.includes(event.key)) {
			const currentFocusIndex = focusable.indexOf(document.activeElement as HTMLElement);
			event.preventDefault();
			if (event.key === moveKeys[0]) {
				currentFocusIndex !== 0
					? focusable[currentFocusIndex - 1].focus()
					: focusable[focusable.length - 1].focus();
			} else if (event.key) {
				currentFocusIndex !== focusable.length - 1
					? focusable[currentFocusIndex + 1].focus()
					: focusable[0].focus();
			}
		} else if (event.key === 'End') {
			event.preventDefault();
			focusable[focusable.length - 1].focus();
		} else if (event.key === 'Home') {
			event.preventDefault();
			focusable[0].focus();
		}
	}

	function handleFocusin() {
		element.addEventListener('keydown', handleKeydown);
	}

	function handleFocusout() {
		element.removeEventListener('keydown', handleKeydown);
	}

	element.addEventListener('focusin', handleFocusin);

	element.addEventListener('focusout', handleFocusout);

	return {
		destroy() {
			element.removeEventListener('focusin', handleFocusin);
			element.removeEventListener('focusout', handleFocusout);
		},
	};
}
