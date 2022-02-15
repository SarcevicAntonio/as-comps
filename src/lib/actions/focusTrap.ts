const focusableSelectors = ['a', 'button', 'input', 'textarea', 'select', 'details', '[tabindex]'];

export default function focusTrap(element: HTMLElement): void {
	const focusable = Array.from(
		element.querySelectorAll<HTMLElement>(focusableSelectors.join(', '))
	).filter((element) => !(element.hasAttribute('disabled') || element.tabIndex === -1));

	focusable[0].focus();

	element.addEventListener('keydown', (event) => {
		if (event.key === 'Tab') {
			const currentElementIndex = focusable.indexOf(document.activeElement as HTMLElement);
			event.preventDefault();

			if (event.shiftKey) {
				currentElementIndex === 0
					? focusable[focusable.length - 1].focus()
					: focusable[currentElementIndex - 1].focus();
			} else {
				currentElementIndex === focusable.length - 1
					? focusable[0].focus()
					: focusable[currentElementIndex + 1].focus();
			}
		}
	});
}
