import on from '@mmstudio/on';
import init_ai from './b-ai';
import { IActions, IEvents } from './interfaces';
import get_params from './b-get-params';
import init_events from './b-init-component-events';
import ready from './b-ready';

const EVENTS_INIT = 'mm-events-init';

interface IHandle {
	destroy(this: IHandle): void;
}

interface IAiBrowserComponent {
	parse_event(node: HTMLElement | DocumentFragment): IHandle[];
	emit(event: string, ...args: unknown[]): Promise<unknown>;
}

export default async function init(no: string, events: IEvents, actions: IActions, url: string, query: object, data = {}) {
	await ready();
	const node_list = Array.from(window.document.querySelectorAll<HTMLElement>(no));
	if (!node_list || node_list.length === 0) {
		throw new Error(`Could not find node: ${no}`);
	}
	node_list.forEach(async (node) => {
		await lazyload(node);
		const params = Object.freeze({
			...query,
			...get_params(node)
		});
		const ai = (node as unknown as { mm: unknown; }).mm = init_ai({ ...data, local: {}, no, node, params, url }, actions, events, init_events) as IAiBrowserComponent;
		ai.parse_event(node);
		await ai.emit(EVENTS_INIT);
		lazyload_picture(node);	// 延迟加载组件中html中的静态图片资源
	});
}

const PICTURE_FLAG = 'data-mm-src';
const OFFSET = 20;

function in_viewport(node: Element) {
	const body = window.document.documentElement;
	const nbcr = node.getBoundingClientRect();
	return nbcr.bottom > 0 && nbcr.right > 0 && nbcr.left < body.clientWidth && nbcr.top < body.clientHeight + OFFSET;
}

function lazyload(node: Element) {
	return new Promise<Element>((resolve) => {
		if (in_viewport(node)) {
			resolve(node);
			return;
		}
		const handle = on(window, ['scroll', 'resize'], () => {
			if (in_viewport(node)) {
				if (handle) {
					handle.destroy();
				}
				resolve(node);
			}
		});
	});
}

function lazyload_picture(node: Element) {
	const img_list = Array.from(node.querySelectorAll<HTMLImageElement>(`img[${PICTURE_FLAG}]`));
	img_list.forEach(async (img) => {
		await lazyload(img);
		const pic_src = img.getAttribute(PICTURE_FLAG);
		if (!pic_src) {
			return;
		}
		const image = new Image();
		image.onload = () => {
			img.src = pic_src;
			img.removeAttribute(PICTURE_FLAG);
		};
		image.src = pic_src;
	});
}
