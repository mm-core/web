import { IEvents } from './interfaces';

export default function get_emit(events: IEvents, fire: (action: string, ...args: unknown[]) => Promise<unknown>) {
	return function emit(type: string, ...args: unknown[]) {
		const action = events[type];
		if (action) {
			return fire(action, ...args);
		} else if (/^[n]?a\d+/.test(type)) {
			return fire(type, ...args);
		}
		return Promise.resolve();
	};
}
