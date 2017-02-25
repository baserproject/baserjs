let _definedEventHandler = false;

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

	public on (handler: ScrollSpyHandler) {
		return new Promise<R>((resolve, reject) => {
			window.addEventListener('scroll', () => {
				requestAnimationFrame(() => {
					const y = window.scrollY;
					const viewportHeight = window.innerHeight;
					if (handler(y, viewportHeight)) {
						resolve(this._returnValue);
					}
				});
			});
		});
	}

}

function _def () {
	if (_definedEventHandler) {
		return;
	}
	window.addEventListener('scroll', _onScroll);
	_definedEventHandler = true;
}

function _onScroll (e: UIEvent) {

}
