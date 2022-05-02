export default function appendToBody(node: HTMLElement): void {
	const possibleParentCssProps = node.parentElement.style.cssText;
	document.body.appendChild(node);
	if (possibleParentCssProps.startsWith('display: contents; --')) {
		node.style.cssText = possibleParentCssProps.substring(19, possibleParentCssProps.length - 1);
	}
}
