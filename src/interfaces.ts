export interface IEvents {
	[event: string]: string;
}

export interface IActions {
	[atom: string]: (...args: any[]) => Promise<unknown> | unknown;
}
