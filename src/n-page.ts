import { HTMLElement } from 'node-html-parser';
import init_ai from './n-ai';
import { IActions, ICommonParams, IEvents, IHeaders, IWebResult } from './interfaces';
import get_query from './get-query';

const FD_EVENTS_INIT = 'fd-events-init';

export default async function init(html: HTMLElement, url: string, msg: ICommonParams, headers: IHeaders, events: IEvents, actions: IActions, ...components: ((html: HTMLElement, url: string, msg: ICommonParams, headers: IHeaders, query: any) => Promise<unknown>[])[]) {
	const query = get_query(url);
	const ai = init_ai({ url, msg, ...headers, headers, params: query }, actions, events);
	await ai.emit(FD_EVENTS_INIT, query);
	const renders = components.map((component) => {
		return component(html, url, msg, headers, query);
	});
	await Promise.all(renders);
	return html.toString();
}
