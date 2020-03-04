import { IActions, IEvents } from './interfaces';
import get_emit from './get-emit';

export default function init(data: any, actions: IActions, events: IEvents) {
	// 执行事件对应的js响应函数
	function fire(action: string, ...args: any[]) {
		const fun = actions[action];
		if (fun) {
			const feidao_data = { fire, data } as any;
			return Promise.resolve(fun(feidao_data, ...args));
		}
		return Promise.resolve();
	}

	const emit = get_emit(events, fire);

	return { emit, fire, data };
}
