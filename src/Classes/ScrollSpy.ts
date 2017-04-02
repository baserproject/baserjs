import BaserElement from './BaserElement';

export interface ScrollSpyHandler {
	(y: number, viewportHeight: number): boolean;
}

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
	listener: (event: Event) => void,
	options?: WhatWGAddEventListenerArgs,
) => void;

let _scrollHandlerIsDefined = false;
let _rqfId = 0;
const ratio = 0.5;
const scrollHandlers = new Set<() => boolean>();
const scrollSpyReturns = new WeakMap<Element, () => void>();
let observer: IntersectionObserver | null = null;

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

	public static by<E extends Element> (bEl: BaserElement<E>) {
		return new ScrollSpy(undefined).by(bEl);
	}

	private _returnValue: R;

	private constructor (returnValue: R) {
		this._returnValue = returnValue;
	}

	public by<E extends Element> (bEl: BaserElement<E>) {
		_define();
		return new Promise<R>((resolve, reject) => {
			if (observer) {
				const resolver = () => resolve(this._returnValue);
				scrollSpyReturns.set(bEl.el, resolver);
				observer.observe(bEl.el);
			} else {
				/**
				 * - scrollEvent -> requestAnimationFrame
				 *   の定義は一箇所で、呼び出しも1回
				 * - リストに登録されたhandlerだけ実行される
				 * - resolveしたものはリストから除外して実行しない
				 */
				const handlerWrapper = () => {
					const windowHeight = window.innerHeight;
					const boundingRect = bEl.el.getBoundingClientRect();
					const intersectionTouchTop = boundingRect.top - windowHeight;
					const intersectionPoint = intersectionTouchTop + boundingRect.height * ratio;
					if (intersectionPoint < 0) {
						resolve(this._returnValue);
						return true;
					}
					return false;
				};
				scrollHandlers.add(handlerWrapper);
			}
		});
	}

}
function _define () {
	if ('IntersectionObserver' in window && !observer) {
		const threshold = [ratio];
		observer = new IntersectionObserver(
			(entries) => {
				for (const entry of Array.from(entries)) {
					if (observer) {
						observer.unobserve(entry.target);
					}
					const resolver = scrollSpyReturns.get(entry.target);
					if (resolver) {
						scrollSpyReturns.delete(entry.target);
						resolver();
					}
				}
			},
			{ threshold },
		);
	} else {
		if (_scrollHandlerIsDefined) {
			return;
		}
		_scrollHandlerIsDefined = true;
		(window.addEventListener as WhatWGAddEventListener)('scroll', _onScroll, { passive: true });
	}
}

function _onScroll (e: UIEvent) {
	cancelAnimationFrame(_rqfId);
	_rqfId = requestAnimationFrame(_onFrame);
}

function _onFrame () {
	scrollHandlers.forEach((handler) => {
		const resolved = handler();
		if (resolved) {
			scrollHandlers.delete(handler);
		}
	});
}
