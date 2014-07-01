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

		}

	}


}
