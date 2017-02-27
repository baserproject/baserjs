let _isDefined = false;
let _rqfId = 0;
const handlers = new Set<() => boolean>();

/**
 * for Passive Event Listener
 *
 * @see https://github.com/Microsoft/TypeScript/issues/9548#issuecomment-256793821
 */
interface WhatWGEventListenerArgs {
	capture?: boolean;
}
interface WhatWGAddEventListenerArgs extends WhatWGEventListenerArgs {
	passive?: boolean;
	once?: boolean;
}
type WhatWGAddEventListener = (
	type: string,
	listener: (event:Event) => void,
	options?: WhatWGAddEventListenerArgs
) => void;

export interface ScrollSpyHandler {
	(y: number, viewportHeight: number): boolean;
}

/**
 * DOM要素の抽象クラス
 *
 * @version 1.0.0
 * @since 0.0.1
 *
 */
export default class ScrollSpy<R> {

	public static return<R> (returnValue: R) {
		return new ScrollSpy(returnValue);
	}

	public static on (handler: ScrollSpyHandler) {
		return new ScrollSpy(undefined).on(handler);
	}

	private _returnValue: R;

	private constructor (returnValue: R) {
		this._returnValue = returnValue;
	}

	/**
	 * - scrollEvent -> requestAnimationFrame の定義は一箇所で、呼び出しも1回
	 * - リストに登録されたhandlerだけ実行される
	 * - resolveしたものはリストから除外して実行しない
	 */
	public on (handler: ScrollSpyHandler) {
		_def();
		return new Promise<R>((resolve, reject) => {
			const handlerWrapper = () => {
				const y = window.scrollY;
				const viewportHeight = window.innerHeight;
				if (handler(y, viewportHeight)) {
					resolve(this._returnValue);
					return true;
				}
				return false;
			};
			handlers.add(handlerWrapper);
		});
	}

}
function _def () {
	if (_isDefined) {
		return;
	}
	_isDefined = true;
	(window.addEventListener as WhatWGAddEventListener)('scroll', _onScroll, { passive: true });
}

function _onScroll (e: UIEvent) {
	cancelAnimationFrame(_rqfId);
	_rqfId = requestAnimationFrame(_onFrame);
}

function _onFrame () {
	handlers.forEach((handler) => {
		const resolved = handler();
		if (resolved) {
			handlers.delete(handler);
		}
	});
}
