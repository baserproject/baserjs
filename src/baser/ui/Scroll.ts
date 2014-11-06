module baser {

	export module ui {

		/**
		 * Scrollクラスのオプションのインターフェイス
		 *
		 * @version 0.0.8
		 * @since 0.0.8
		 *
		 */
		export interface ScrollOptions {
			offset?: number;
			keywords?: { [index: string]: any; }
			wheelCancel?: boolean;
			onScrollEnd?: Function;
			onScrollCancel?: Function;
			onScrollStart?: Function;
			onScrollProgress?: Function;
		}

		/**
		 * スクロールを管理するクラス
		 *
		 * @version 0.0.8
		 * @since 0.0.8
		 *
		 */
		export class Scroll {

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
			 * @version 0.0.8
			 * @since 0.0.8
			 * @param {string|HTMLElement|JQuery|number} 対象の要素のセレクタ・HTMLオブジェクト・jQueryオブジェクトもしくはスクロール位置
			 * @param {ScrollOptions} オプション
			 * @return {Scroll} 自信のスクロールオブジェクト
			 *
			 */
			public to (selector: string, options?: ScrollOptions): Scroll;
			public to (selector: HTMLElement, options?: ScrollOptions): Scroll;
			public to (selector: JQuery, options?: ScrollOptions): Scroll;
			public to (selector: number, options?: ScrollOptions): Scroll;
			public to (selector?: any, options?: ScrollOptions): Scroll {
				var ele: HTMLElement;
				var x: number;
				var y: number;
				var docWidth: number;
				var docHeight: number;
				var winWidth: number;
				var winHeight: number;
				var maxScrollX: number;
				var maxScrollY: number;
				var $target: JQuery;
				var offset: number = 0;

				this.options = options || {};
				offset += this.options.offset || 0;

				if (this.options.wheelCancel) {
					$(document).on('mousewheel', (): void => {
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
				if ($.isNumeric(selector)) {
					offset += (parseFloat(selector) || 0);
					this.targetX = 0;
					this.targetY = offset;
				} else if (selector) {
					$target = $(selector);
					if (!$target.length) {
						return this;
					}
					ele = $target[0];
					// スクロール先座標をセットする
					x = 0;
					y = 0;
					// 親のオフセットを足していって自身の座標を確定
					while (ele) {
						x += ele.offsetLeft;
						y += ele.offsetTop;
						ele = <HTMLElement> ele.offsetParent;
					}
					winWidth = document.documentElement.clientWidth;
					winHeight = document.documentElement.clientHeight;
					docWidth = document.documentElement.scrollWidth;
					docHeight = document.documentElement.scrollHeight;
					maxScrollX = Math.max(winWidth, docWidth);
					maxScrollY = Math.max(winHeight, docHeight);
					this.targetX = Math.min(x, maxScrollX) + offset;
					this.targetY = Math.min(y, maxScrollY) + offset;
				} else {
					$target = $(window.location.hash);
					if ($target.length) {
						Timer.wait(Scroll.delayWhenURLHashTarget, (): void => {
							window.scrollTo(0, 0);
							this.to($target, offset);
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
					this._scroll();
				}
				return this;
			}

			private _scroll (): void {
				var currentX: number = this._getX();
				var currentY: number = this._getY();
				var vx: number = (this.targetX - currentX) / Scroll.speed;
				var vy: number = (this.targetY - currentY) / Scroll.speed;
				var nextX: number = Math.floor(currentX + vx);
				var nextY: number = Math.floor(currentY + vy);
				if ((Math.abs(vx) < 1 && Math.abs(vy) < 1) || (this.prevX === currentX && this.prevY === currentY)) {
					// 目標座標付近に到達していたら終了
					window.scrollTo(this.targetX, this.targetY);
					this._finish();
					if ($.isFunction(this.options.onScrollEnd)) {
						this.options.onScrollEnd.call(this, new $.Event('scrollend'));
					}
				} else {
					// 繰り返し
					window.scrollTo(nextX, nextY);
					this.prevX = currentX;
					this.prevY = currentY;
					if ($.isFunction(this.options.onScrollProgress)) {
						this.options.onScrollProgress.call(this, new $.Event('scrollprogress'));
					}
					this.timer.wait(Scroll.interval, this._scroll, this);
				}
			}

			private _getX (): number {
				return (window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement.scrollLeft || document.body.scrollLeft);
			}

			private _getY (): number {
				return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement.scrollTop || document.body.scrollTop);
			}

			private _finish (): void {
				this.isScroll = false;
				this.prevX = null;
				this.prevY = null;
				this.timer.stop();
			}

		}

	}

}