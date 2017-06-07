import DispatchEvent from './DispatchEvent';
import EventDispatcher from './EventDispatcher';
import Timer from './Timer';

import addEventListenerWithOptions from '../fn/addEventListenerWithOptions';

export interface ScrollOptions {
	offset?: number;
	wheelCancel?: boolean;
}

/**
 * スクロールを管理するクラス
 *
 * @version 0.9.0
 * @since 0.0.8
 *
 */
export default class Scroll extends EventDispatcher {

	/**
	 * 速度 単位: `px/frame`
	 */
	public static speed = 40;
	public static delayWhenURLHashTarget = 30;

	/**
	 * Default global offset
	 */
	public static offset = 0;

	public static to (selector?: string | Element | number, options: ScrollOptions = {}) {
		return new Scroll().to(selector, options);
	}

	public targetY: number;
	public prevY: number | null;
	public offset: number;
	public isScroll: boolean;
	public options: ScrollOptions;

	private _rafId: number;

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
		// 第一引数が数値だった場合はその値のy軸へスクロール
		if (typeof selector === 'number') {
			this.offset += selector || 0;
			this.targetY = this.offset;
		} else if (selector) {
			const el = (selector instanceof Element) ? selector : document.querySelector(selector);
			if (el) {
				const rect = el.getBoundingClientRect();
				this.targetY = rect.top + this.y + this.offset + Scroll.offset;
			} else {
				this.targetY = this.offset + Scroll.offset;
			}
		}
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

	private _scrollStart () {
		return new Promise<DispatchEvent>((resolve) => {
			// スクロール停止中ならスクロール開始
			if (!this.isScroll) {
				this.isScroll = true;
				this._progress();
				this.on('scrollend', resolve);
			} else {
				resolve();
			}
		});
	}

	/**
	 * スクロール
	 *
	 * @version 1.0.0
	 * @since 0.0.8
	 *
	 */
	private _progress () {
		const currentY = this.y;
		const vy = (this.targetY - currentY) / Scroll.speed;
		const nextY = currentY + vy;

		const dest = Math.abs(nextY - this.targetY);

		console.log(dest);

		if (dest === 0) {
			// 目標座標付近に到達していたら終了
			window.scrollTo(0, this.targetY);
			this._finish();
			return;
		}

		window.scrollTo(0, nextY);
		this.prevY = currentY;

		this.trigger('scrollprogress', [{
			y: this.y,
		}]);

		// 繰り返し
		this._rafId = requestAnimationFrame(() => this._progress());
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
		cancelAnimationFrame(this._rafId);
		this.isScroll = false;
		this.prevY = null;
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
