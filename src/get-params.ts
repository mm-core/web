import { HTMLElement as NHTMLElement } from 'node-html-parser';

const FD_PARAMS_FLAG = 'data-feidao-props';

export default function get_params(node: HTMLElement | NHTMLElement) {
	const params_str = node.attributes[FD_PARAMS_FLAG];
	return params_str ? JSON.parse(`${params_str}`) : {};
}
