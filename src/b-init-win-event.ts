import on from '@mmstudio/on';
import { IEvents } from './interfaces';

export default function init_events(events: IEvents, emit: (event: string, ...args: unknown[]) => Promise<unknown>) {
	return Object.keys(events).map((event) => {
		return on(window, event, (e) => {
			emit(event, e);
		}, true);
	});
}
