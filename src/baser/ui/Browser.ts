module baser {

	export module ui {

		type LinkElement = HTMLAnchorElement | HTMLAreaElement;

		var flexibleWindowObject: any = window;
				
		export interface BrowserUserAgent {
			iOS: boolean;
			android: boolean;
			iPad: boolean;
			iPhone: boolean;
			iPod: boolean;
			safari: boolean;
			chrome: boolean;
		}

		/**
		 * ブラウザの情報を管理するクラス
		 *
		 * @version 0.0.2
		 * @since 0.0.2
		 *
		 */
		export class Browser extends EventDispacher {

			/**
			 * ブラウザ
			 *
			 * @version 0.0.10
			 * @since 0.0.10
			 *
			 */
			static browser: Browser = new Browser();

			/**
			 * デバイス・OS・ブラウザの情報
			 *
			 * @version 0.4.0
			 * @since 0.0.1
			 *
			 */
			static spec: {
				isTouchable: boolean;
				ua: BrowserUserAgent;
			} = {
				isTouchable: flexibleWindowObject.ontouchstart !== undefined,
				ua: Browser.getUA()
			};
			
			/**
			 * ページ遷移する
			 *
			 * @version 0.7.0
			 * @since 0.1.0
			 *
			 */
			static jumpTo (path: string | Locational, isBlank: boolean = false): void {
				var href: string;
				if (typeof path === 'string') {
					href = path;
				} else {
					href = path.href;
				}
				if (!isBlank) {
					window.location.href = href;
				} else {
					window.open(href, null);
				}
			}

			/**
			 * ユーザーエージェント情報を取得する
			 *
			 * @version 0.4.0
			 * @since 0.0.1
			 *
			 */
			static getUA (): BrowserUserAgent {
				var ua: string = navigator.userAgent;
				var bua: BrowserUserAgent = {
					iOS: false,
					android: /android/i.test(ua),
					iPad: /ipad/i.test(ua),
					iPhone: /iphone/i.test(ua),
					iPod: /ipod/i.test(ua),
					safari: /safari/i.test(ua),
					chrome: /crios|chrome/i.test(ua)
				};
				bua.iOS = bua.iPad || bua.iPhone || bua.iPod || false;
				if (bua.chrome) {
					bua.safari = false;
				}
				return bua;
			}
			
			/**
			 * 現在のURLのパラメータをリンク先へ引き継がせる
			 *
			 * @version 0.7.0
			 * @since 0.7.0
			 *
			 */
			static inheritParams (targetParam: string): void {
				var $target: JQuery = $('a, area').filter('[href]');
				var thisLocation: Locational = new Locational(location);
				if (!(targetParam in thisLocation.params)) {
					return;
				}
				var query: string = targetParam;
				var value: string | string[] = thisLocation.params[targetParam];
				$target.each( (i: number, elem: Element): any => {
					var targetElem: LinkElement = <LinkElement> elem;
					var loc: Locational = new Locational(targetElem);
					if (thisLocation.host === loc.host) {
						loc.addParam(query, value);
						targetElem.href = loc.href;
					}
				});
			}

			public resizeEndInterval: number = 100;
			public scrollEndInterval: number = 100;
			public isResize: boolean = false;
			public isScroll: boolean = false;

			/**
			 * コンストラクタ
			 *
			 * @version 0.0.2
			 * @since 0.0.2
			 *
			 */
			constructor () {

				super();

				var $window: JQuery = $(window);

				// リサイズイベント
				var resizeEndTimer: number;
				$window.on('resize', (e: JQueryEventObject): void => {
					if (!this.isResize) {
						this.trigger('resizestart');
					}
					this.isResize = true;
					this.trigger('resize');
					window.clearTimeout(resizeEndTimer);
					resizeEndTimer = window.setTimeout( (): void => {
						this.isResize = false;
						this.trigger('resize');
						this.trigger('resizeend');
					}, this.resizeEndInterval);
				});

				// スクロールイベント
				var scrollEndTimer: number;
				$window.on('scroll', (e: JQueryEventObject): void => {
					if (!this.isScroll) {
						this.trigger('scrollstart');
					}
					this.isScroll = true;
					this.trigger('scroll');
					window.clearTimeout(scrollEndTimer);
					scrollEndTimer = window.setTimeout( (): void => {
						this.isScroll = false;
						this.trigger('scroll');
						this.trigger('scrollend');
					}, this.resizeEndInterval);
				});
			}

		}

	}

}
