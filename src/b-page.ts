import init_ai from './b-ai';
import { IActions, IEvents } from './interfaces';
import get_query from './b-get-query';
import init_events from './b-init-win-event';

const FD_EVENTS_INIT = 'fd-events-init';

export default async function init(events: IEvents, actions: IActions, ...components: ((url: string, query: any) => any)[]) {
	const url = location.href;
	const query = get_query(url) as any;
	const ai = (window as any).fd = init_ai({ url, params: Object.freeze(query) }, actions, events);
	init_events(events, ai.emit);
	await ai.emit(FD_EVENTS_INIT);
	components.forEach((component) => {
		component(url, query);
	});
}
