export interface IEvents {
	[event: string]: string;
}

export interface IActions {
	[atom: string]: (...args: unknown[]) => Promise<unknown> | unknown;
}
