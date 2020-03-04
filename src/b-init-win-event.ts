import on from '@mmstudio/on';
import { IEvents } from './interfaces';

export default function init_events(events: IEvents, emit: (event: string, ...args: any[]) => Promise<any>) {
	return Object.keys(events).map((event) => {
		return on(window, event, (e) => {
			emit(event, e);
		}, true);
	});
	// const handles = [] as Handle[];
	// for (const event in events) {
	// 	if (event === FD_EVENTS_INIT) {
	// 		continue;
	// 	}
	// 	if (is_win_event(event)) {
	// 		const handle = on(window, event, (e) => {
	// 			return emit(event, e);
	// 		}, true);
	// 		handles.push(handle);
	// 	} else {
	// 		throw new Error(`not supported event [${event}]`);
	// 	}
	// }
	// return handles;
}
