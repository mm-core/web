import { once } from '@mmstudio/on';

const readyStates = Object.create(null) as {
	loaded: boolean;
	complete: boolean;
	[key: string]: boolean;
};
readyStates.loaded = readyStates.complete = true;

let ready = readyStates[document.readyState];

let readyQueue: Array<(doc: Document) => void> = [];
let processing = false;

function processQueue(): void {
	if (processing) {
		return;
	}
	processing = true;

	for (let i = 0; i < readyQueue.length; i++) {
		readyQueue[i](document);
	}
	readyQueue = [];
	processing = false;
}

function ready_fun() {
	if (ready) {
		return;
	}
	ready = true;
	processQueue();
}

if (!ready) {
	if (document.readyState === 'complete' || (document.readyState !== 'loading' && !(document.documentElement as any).doScroll)) {
		// DOMContentLoaded has emited
		ready_fun();
	} else {
		once(document, 'DOMContentLoaded', () => {
			ready_fun();
		});
	}
}

export function dom_ready(callback: (...args: any[]) => void): void {
	readyQueue.push(callback);
	if (ready) {
		processQueue();
	}
}

export default function () {
	return new Promise<void>((resolve) => {
		dom_ready(() => {
			resolve();
		});
	});
}
