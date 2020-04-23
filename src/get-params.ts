const PARAMS_FLAG = 'data-mm-props';

export default function get_params(node: HTMLElement) {
	const params_str = node.attributes[PARAMS_FLAG];
	return params_str ? JSON.parse(`${params_str}`) : {};
}
