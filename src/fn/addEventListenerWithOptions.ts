let supportsPassive = false;
try {
	// getter として opts.passive を定義して、 addEventListener 内で呼ばれたことがわかるようにする
	const opts = Object.defineProperty({}, 'passive', {
		get () {
			// 内部で opts.passive が呼ばれたら対応ブラウザ
			// 用意しておいたフラグを有効にする
			supportsPassive = true;
		},
	});
	// 試しに適当なイベントを補足し、 opts.passive が呼ばれるか試す
	window.addEventListener('test', _ => _, opts);
} catch (e) {
	// void
}

export interface EventListenerOptions {
	passive?: boolean;
	once?: boolean;
	capture?: boolean;
}

/**
 *
 * @param target
 * @param type
 * @param listener
 * @param options
 */
// tslint:disable-next-line:no-any
export default function addEventListenerWithOptions<T extends Element | Window | Document, K extends keyof ElementEventMap> (target: T, type: K, listener: (this: T, e: ElementEventMap[K]) => any, options: EventListenerOptions) {
	let optionsOrCapture: EventListenerOptions | boolean = options;
	if (!supportsPassive) {
		optionsOrCapture = options.capture || false;
	}
	target.addEventListener(type, listener, optionsOrCapture as boolean); // ⚠️ type hack
}
