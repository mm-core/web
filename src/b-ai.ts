import { IHandle } from '@mmstudio/on';
import { IActions, IEvents } from './interfaces';
import get_emit from './b-get-emit';

export default function init(data: unknown, actions: IActions, events: IEvents, init_events?: (emit: (event: string, ...args: unknown[]) => Promise<unknown> | undefined) => (node: HTMLElement | DocumentFragment) => IHandle[]) {
	// 执行事件对应的js响应函数，或者规则编号对应的响应函数
	async function fire(action: string, ...args: unknown[]) {
		const fun = actions[action];
		return Promise.resolve(fun({ fire, emit, data, parse_event }, ...args));
	}
	const emit = get_emit(events, fire);
	Object.freeze(data);
	const parse_event = init_events && init_events(emit);
	return Object.freeze({ data, emit, fire, parse_event });
}
