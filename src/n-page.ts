import { HTMLElement } from 'node-html-parser';
import init_ai from './n-ai';
import { IActions, IEvents } from './interfaces';
import get_query from './get-query';

const EVENTS_INIT = 'mm-events-init';

export default async function init(html: HTMLElement, url: string, msg: unknown, headers: object, events: IEvents, actions: IActions, ...components: ((html: HTMLElement, url: string, msg: unknown, headers: object, query: any) => Promise<unknown>[])[]) {
	const query = get_query(url);
	const ai = init_ai({ url, msg, ...headers, headers, params: query }, actions, events);
	await ai.emit(EVENTS_INIT, query);
	const renders = components.map((component) => {
		return component(html, url, msg, headers, query);
	});
	await Promise.all(renders);
	return html.toString();
}
