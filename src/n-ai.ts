import { IActions, IEvents } from './interfaces';
import get_emit from './get-emit';

export default function init(data: unknown, actions: IActions, events: IEvents) {
	// 执行事件对应的js响应函数
	function fire(action: string, ...args: unknown[]) {
		const fun = actions[action];
		if (fun) {
			const mm_data = { fire, data } as unknown;
			return Promise.resolve(fun(mm_data, ...args));
		}
		return Promise.resolve();
	}

	const emit = get_emit(events, fire);

	return { emit, fire, data };
}
