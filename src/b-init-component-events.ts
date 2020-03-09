import on, { IHandle } from '@mmstudio/on';

const reg = /\s*([^\s:]*)\s*:\s*([^:\s]*)\s*/;
const ACTIONS_FLAG = 'data-mm-actions';

export default function init_events(emit: (event: string, ...args: unknown[]) => Promise<unknown> | undefined) {
	return (node: HTMLElement | DocumentFragment) => {
		const ns = Array.from(node.querySelectorAll<HTMLElement>(`[${ACTIONS_FLAG}]`));
		if (!(node instanceof DocumentFragment)) {
			ns.push(node);
		}
		return ns.reduce((handles, n) => {
			const attr = n.getAttribute(ACTIONS_FLAG);
			if (attr) {
				const events = attr.split(',');
				events.forEach((e) => {
					const m = reg.exec(e);
					if (m && m.length === 3) {
						const evt = m[1];
						const event = m[2];
						const handle = on(n, evt, (ev: Event) => {
							emit(event, ev);
						});
						handles.push(handle);
					}
				});
			}
			return handles;
		}, [] as IHandle[]);
	};
}
