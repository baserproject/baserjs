module baser {

	export module ui {

		var flexibleWindowObject: any = window;

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
			 * @version 0.0.1
			 * @since 0.0.1
			 *
			 */
			static spec: {
				isTouchable: boolean;
				ua: any;
			} = {
				isTouchable: flexibleWindowObject.ontouchstart !== undefined,
				ua: Browser.getUA()
			};

			/**
			 * ユーザーエージェント情報を取得する
			 *
			 * @version 0.0.2
			 * @since 0.0.1
			 *
			 */
			static getUA (): any {
				var ua: string = navigator.userAgent;
				var result = {
					iOS: <boolean> /ios/i.test(ua),
					iPad: <boolean> /ipad/i.test(ua),
					iPhone: <boolean> /iphone/i.test(ua),
					iPod: <boolean> /ipod/i.test(ua),
					android: <boolean> /android/i.test(ua)
				};
				return result;
			}

			public resizeEndInterval: number = 100;
			public scrollEndInterval: number = 100;
			public isResize: boolean = false;
			public isScroll: boolean = false;

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
