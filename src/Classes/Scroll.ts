import * as BezierEasing from 'bezier-easing';

import DispatchEvent from './DispatchEvent';
import EventDispatcher from './EventDispatcher';
import Progressive from './Progressive';
import Timer from './Timer';

import addEventListenerWithOptions from '../fn/addEventListenerWithOptions';

export interface ScrollOptions {
	offset?: number;
	wheelCancel?: boolean;
}

let singleton: Scroll | null = null;

/**
 * スクロールを管理するクラス
 *
 * @version 0.9.0
 * @since 0.0.8
 *
 */
export default class Scroll extends EventDispatcher {

	public static duration = 300;

	public static easing: BezierEasing.Easing = BezierEasing(0, 0, 0.58, 1); // tslint:disable-line:no-magic-numbers

	public static delayWhenURLHashTarget = 30;

	/**
	 * Default global offset
	 */
	public static offset = 0;

	public static to (selector?: string | Element | number, options: ScrollOptions = {}) {
		if (!singleton) {
			singleton = new Scroll();
		}
		return singleton.to(selector, options);
	}

	public offset: number;
	public isScroll: boolean;
	public options: ScrollOptions;

	private _dest: number;
	private _dist: number;
	private _start: number;
	private _progressive: Progressive;

	constructor () {
		super();
		this._progressive = new Progressive(this._progress.bind(this));
	}

	/**
	 * 対象の要素もしくは位置にスクロールを移動させる
	 *
	 * @version 1.0.0
	 * @since 0.0.8
	 * @param selector 対象の要素のセレクタ・DOMもしくはスクロール位置
	 * @param options オプション
	 * @return インスタンス自信
	 *
	 */
	public async to (selector?: string | Element | number, options: ScrollOptions = {}) {
		this.options = options;
		this.offset = this.options.offset || 0;

		if (this.options.wheelCancel !== false) {
			addEventListenerWithOptions(
				window,
				'wheel',
				() => {
					if (this.isScroll) {
						this._cancel();
					}
				},
				{
					passive: true,
					once: true,
				},
			);
		}

		if (selector == null) {
			return await this._toHash();
		}

		await this._to(selector);
	}

	private async _to (selector: string | Element | number) {
		const currentY = this.y;
		// 第一引数が数値だった場合はその値のy軸へスクロール
		if (typeof selector === 'number') {
			this.offset += selector || 0;
			this._dest = this.offset;
		} else if (selector) {
			const el = (selector instanceof Element) ? selector : document.querySelector(selector);
			if (el) {
				const rect = el.getBoundingClientRect();
				this._dest = rect.top + currentY + this.offset + Scroll.offset;
			} else {
				this._dest = this.offset + Scroll.offset;
			}
		}
		if (this._dest === currentY) {
			return;
		}
		this._start = currentY;
		this._dist = this._dest - currentY;
		return await this._scrollStart();
	}

	private async _toHash () {
		const target = document.querySelector(window.location.hash);
		if (target) {
			await Timer.delay(Scroll.delayWhenURLHashTarget)();
			window.scrollTo(0, 0);
			return await this._to(target);
		}
	}

	private async _scrollStart () {
		// スクロール停止中ならスクロール開始
		if (this.isScroll) {
			return Promise.resolve();
		}
		this.isScroll = true;
		this._progressive.stop();
		await this._progressive.start(Scroll.duration);
		this._finish();
	}

	/**
	 * スクロール
	 *
	 * @version 1.0.0
	 * @since 0.0.8
	 *
	 */
	private _progress (rate: number) {
		const progress = this._start + this._dist * Scroll.easing(rate);
		window.scrollTo(0, progress);
		this.trigger('scrollprogress', [{
			y: progress,
		}]);
	}

	/**
	 * y位置の取得
	 *
	 * @version 1.0.0
	 * @since 0.0.8
	 * @return y位置
	 *
	 */
	private get y () {
		return window.scrollY || window.pageYOffset;
	}

	/**
	 * スクロールの終了
	 *
	 * @version 1.0.0
	 * @since 0.0.8
	 *
	 */
	private _finish (): void {
		this.isScroll = false;
		this.trigger('scrollend', [{
			y: this.y,
		}]);
	}

	/**
	 * スクロールの終了
	 *
	 * @version 1.0.0
	 * @since 1.0.0
	 *
	 */
	private _cancel (): void {
		this.trigger('scrollcancel', [{
			y: this.y,
		}]);
		this._finish();
	}

}
