import type { actionReturn } from './types';

export default function clickOutside(
	node: Node,
	{ enabled: initialEnabled, func }: { enabled: boolean; func: (node: Node) => unknown }
): actionReturn {
	const handleOutsideClick = (event: MouseEvent) => {
		if (node.contains(event.target as HTMLElement)) return;
		event.stopPropagation();
		func(node);
	};

	function update({ enabled }) {
		if (enabled) {
			window.addEventListener('click', handleOutsideClick, true);
		} else {
			window.removeEventListener('click', handleOutsideClick, true);
		}
	}

	update({ enabled: initialEnabled });
	return {
		update,
		destroy() {
			window.removeEventListener('click', handleOutsideClick, true);
		},
	};
}
