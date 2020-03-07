export interface IEvents {
	[event: string]: string;
}

export interface IActions {
	[atom: string]: (...args: any[]) => Promise<unknown> | unknown;
}

export interface IHandle {
	destroy(this: IHandle): void;
}

export interface IAiBrowserComponent {
	readonly data: {
		readonly [attr: string]: any;
		readonly no: string;
		readonly node: HTMLElement;
		readonly params: { [key: string]: any };
		readonly url: string;
	};
	parse_event(node: HTMLElement | DocumentFragment): IHandle[];
	fire(action: string, ...args: any[]): Promise<any>;
	emit(event: string, ...args: any[]): Promise<any>;
}

export interface IAiBrowserPage {
	readonly data: {
		readonly [attr: string]: any;
		readonly params: { [key: string]: any };
		readonly url: string;
	};
	fire(action: string, ...args: any[]): Promise<any>;
	emit(event: string, ...args: any[]): Promise<any>;
}

export interface ICommonParams {
	body?: any;
	cookie: {
		[name: string]: string;
	};
	data: any;
	headers: {
		[key: string]: string;
	};
	params: any;
	query: any;
	remote_address: string;
	url: string;
	[key: string]: any;
}

import { IncomingHttpHeaders } from 'http';

export type IHeaders = IncomingHttpHeaders;

export interface IWebResult {
	data?: any;
	buff?: Buffer;
	cookie?: {
		[name: string]: string;
	};
	content_type?: string;
	headers?: {
		[key: string]: string;
	};
	attachment?: string;
	redirect?: string;
	status_code?: number;
}
