import init_ai from './b-ai';
import { IActions, IEvents } from './interfaces';
import get_query from './get-query';
import init_events from './b-init-win-event';

const EVENTS_INIT = 'mm-events-init';

export default async function init(events: IEvents, actions: IActions, ...components: ((url: string, query: object) => unknown)[]) {
	const url = location.href;
	const query = get_query(url);
	const ai = (window as unknown as { mm: unknown; }).mm = init_ai({ url, params: Object.freeze(query) }, actions, events);
	init_events(events, ai.emit);
	await ai.emit(EVENTS_INIT);
	components.forEach((component) => {
		component(url, query);
	});
}
