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
		export class Browser {

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
		}


	}

}
