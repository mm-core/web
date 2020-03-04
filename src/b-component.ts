import on from '@mmstudio/on';
import init_ai from './b-ai';
import { IActions, IEvents, IFeidaoAiBrowserComponent } from './interfaces';
import get_params from './get-params';
import init_events from './b-init-component-events';
import ready from './b-ready';

const FD_EVENTS_INIT = 'fd-events-init';

export default async function init(no: string, events: IEvents, actions: IActions, url: string, query: any, data = {}) {
	await ready();
	const node_list = Array.from(window.document.querySelectorAll<HTMLElement>(no));
	if (!node_list || node_list.length === 0) {
		throw new Error(`Could not find node: ${no}`);
	}
	node_list.forEach((node) => {
		lazyload_picture(node);	// 延迟加载组件中html中的静态图片资源
		const params = Object.freeze({
			...query,
			...get_params(node)
		});
		const ai = (node as any).fd = init_ai({ ...data, local: {}, no, node, params, url }, actions, events, init_events) as IFeidaoAiBrowserComponent;
		ai.parse_event(node);
		ai.emit(FD_EVENTS_INIT);
	});
}

const FD_PICTURE_FLAG = 'data-feidao-src';
const OFFSET = 20;
const FEIDAO_VISIBLE = 'data-feidao-visible';
const FD_FORCE_VISIBLE = 'data-feidao-force-visible';

function in_viewport(node: Element) {
	const body = window.document.documentElement;
	const nbcr = node.getBoundingClientRect();
	return nbcr.bottom > 0 && nbcr.right > 0 && nbcr.left < body.clientWidth && nbcr.top < body.clientHeight + OFFSET;
}

function lazyload(node: Element) {
	return new Promise<Element>((resolve) => {
		const visible = node[FEIDAO_VISIBLE] || node.getAttribute(FD_FORCE_VISIBLE);
		if (in_viewport(node) || (visible === true) || (visible === 'true')) {
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
	const img_list = Array.from(node.querySelectorAll<HTMLImageElement>(`img[${FD_PICTURE_FLAG}]`));
	img_list.forEach((img) => {
		lazyload(img).then(() => {
			const pic_src = img.getAttribute(FD_PICTURE_FLAG);
			if (!pic_src) {
				return;
			}
			const image = new Image();
			image.onload = () => {
				img.src = pic_src;
				img.removeAttribute(FD_PICTURE_FLAG);
			};
			image.src = pic_src;
		});
	});
}
