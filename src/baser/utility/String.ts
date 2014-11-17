module baser {

	export module utility {

		/**
		 * ユーティリティ文字列クラス
		 *
		 * @version 0.0.2
		 * @since 0.0.2
		 *
		 */
		export class String {

			/**
			 * ユニークIDを発行する
			 *
			 * @version 0.0.1
			 * @since 0.0.1
			 *
			 */
			static UID (seed?: number): string {
				var random: number = Math.floor(Math.random() * 1e8);

				if (!seed) {
					seed = new Date().valueOf();
				}

				var uniqueNumber: number = random + seed;

				var uid: string = 'uid-' + uniqueNumber.toString(24);

				return uid;

			}

			/**
			 * ハイフン チェインケース化
			 *
			 * @version 0.1.0
			 * @since 0.1.0
			 *
			 */
			static hyphenDelimited (str: string): string {

				var words: string[] = str.replace(/[A-Z]/g, ($1: string): string => {
					return ' ' + $1.toLowerCase();
				}).split(/[^a-z0-9]+/ig);

				var result: string[] = [];

				var i: number = 0;
				var l: number = words.length;
				for (; i < l; i++) {
					if (words[i]) {
						result.push(words[i].toLowerCase());
					}
				}

				return result.join('-');

			}

			/**
			 * スネークケース化
			 *
			 * @version 0.1.0
			 * @since 0.1.0
			 *
			 */
			static snakeCase (str: string): string {

				return String.hyphenDelimited(str).replace(/-/g, '_');

			}

			/**
			 * キャメルケース化
			 *
			 * @version 0.1.0
			 * @since 0.1.0
			 *
			 */
			static camelCase (str: string, upperCase: boolean = false): string {

				var hdStr: string = String.hyphenDelimited(str);

				if (upperCase && /^[a-z]/.test(hdStr)) {
					hdStr = '-' + hdStr;
				}

				return hdStr.replace(/-([a-z])/g, ($1: string, $2: string): string => {
					return $2.toUpperCase();
				});

			}

		}

	}


}
