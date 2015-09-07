import Timer = require('./Timer');
import ScrollOptions = require('../Interface/ScrollOptions');

/**
 * スクロールを管理するクラス
 *
 * @version 0.9.0
 * @since 0.0.8
 *
 */
class Scroll {

	static speed: number = 4;
	static interval: number = 20;
	static delayWhenURLHashTarget: number = 30;

	public targetX: number;
	public targetY: number;
	public prevX: number;
	public prevY: number;
	public isScroll: boolean;
	public timer: Timer = new Timer();
	public options: ScrollOptions;

	/**
	 * 対象の要素もしくは位置にスクロールを移動させる
	 *
	 * @version 0.9.0
	 * @since 0.0.8
	 * @param selector 対象の要素のセレクタ・HTMLオブジェクト・jQueryオブジェクトもしくはスクロール位置
	 * @param options オプション
	 * @return インスタンス自信
	 *
	 */
	public to (selector: string | HTMLElement | JQuery | number, options?: ScrollOptions): Scroll {
		
		this.options = options || {};
		let offset: number = this.options.offset || 0;

		if (this.options.wheelCancel) {
			// TODO: IE8 wheelイベント対応検討
			$(document).on('wheel', (): void => {
				if (this.isScroll) {
					this._finish();
					if ($.isFunction(this.options.onScrollCancel)) {
						this.options.onScrollCancel.call(this, new $.Event('scrollcancel'));
					}
				}
				return;
			});
		}

		// 第一引数が数値だった場合はその値のy軸へスクロール
		if (typeof selector === 'number') {
			offset += selector || 0;
			this.targetX = 0;
			this.targetY = offset;
		} else if (selector) {
			let $target: JQuery = $(selector);
			if (!$target.length) {
				return this;
			}
			let elem: HTMLElement = $target[0];
			// スクロール先座標をセットする
			let x: number = 0;
			let y: number = 0;
			// 親のオフセットを足していって自身の座標を確定
			while (elem) {
				x += elem.offsetLeft;
				y += elem.offsetTop;
				elem = <HTMLElement> elem.offsetParent;
			}
			let winWidth: number = document.documentElement.clientWidth;
			let winHeight: number = document.documentElement.clientHeight;
			let docWidth: number = document.documentElement.scrollWidth;
			let docHeight: number = document.documentElement.scrollHeight;
			let maxScrollX: number = Math.max(winWidth, docWidth);
			let maxScrollY: number = Math.max(winHeight, docHeight);
			this.targetX = Math.min(x, maxScrollX) + offset;
			this.targetY = Math.min(y, maxScrollY) + offset;
		} else {
			let $target: JQuery = $(window.location.hash);
			if ($target.length) {
				Timer.wait(Scroll.delayWhenURLHashTarget, (): void => {
					window.scrollTo(0, 0);
					this.to($target, {
						offset: offset
					});
					return;
				});
			}
			return this;
		}
		// スクロール停止中ならスクロール開始
		if (!this.isScroll) {
			this.isScroll = true;
			if ($.isFunction(this.options.onScrollStart)) {
				this.options.onScrollStart.call(this, new $.Event('scrollstart'));
			}
			this._progress();
		}
		return this;
	}

	/**
	 * スクロール
	 *
	 * @version 0.9.0
	 * @since 0.0.8
	 *
	 */
	private _progress (): void {
		let currentX: number = this._getX();
		let currentY: number = this._getY();
		let vx: number = (this.targetX - currentX) / Scroll.speed;
		let vy: number = (this.targetY - currentY) / Scroll.speed;
		if ((Math.abs(vx) < 1 && Math.abs(vy) < 1) || (this.prevX === currentX && this.prevY === currentY)) {
			// 目標座標付近に到達していたら終了
			window.scrollTo(this.targetX, this.targetY);
			this._finish();
			if ($.isFunction(this.options.onScrollEnd)) {
				this.options.onScrollEnd.call(this, new $.Event('scrollend'));
			}
		} else {
			let nextX: number = Math.floor(currentX + vx);
			let nextY: number = Math.floor(currentY + vy);
			// 繰り返し
			window.scrollTo(nextX, nextY);
			this.prevX = currentX;
			this.prevY = currentY;
			if ($.isFunction(this.options.onScrollProgress)) {
				this.options.onScrollProgress.call(this, new $.Event('scrollprogress'));
			}
			this.timer.wait(Scroll.interval, this._progress, this);
		}
	}

	/**
	 * x位置の取得
	 *
	 * @version 0.9.0
	 * @since 0.0.8
	 * @return x位置
	 *
	 */
	private _getX (): number {
		return (window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement.scrollLeft || document.body.scrollLeft);
	}

	/**
	 * y位置の取得
	 *
	 * @version 0.9.0
	 * @since 0.0.8
	 * @return y位置
	 *
	 */
	private _getY (): number {
		return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement.scrollTop || document.body.scrollTop);
	}

	/**
	 * スクロールの終了
	 *
	 * @version 0.9.0
	 * @since 0.0.8
	 *
	 */
	private _finish (): void {
		this.isScroll = false;
		this.prevX = null;
		this.prevY = null;
		this.timer.stop();
	}

}

export = Scroll;
