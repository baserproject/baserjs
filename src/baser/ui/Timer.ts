module baser {

	export module ui {

		/**
		 * 時間管理クラス
		 *
		 * @version 0.0.2
		 * @since 0.0.1
		 *
		 */
		export class Timer {

			/**
			 * コアとなるDateオブジェクト
			 *
			 * @since 0.0.1
			 *
			 */
			public datetime: Date;

			/**
			 * コンストラクタ
			 *
			 * @version 0.0.1
			 * @since 0.0.1
			 *
			 */
			constructor () {
				this.datetime = new Date();
			}

			/**
			 * 暗黙の型変換時の振る舞い
			 *
			 * @version 0.0.1
			 * @since 0.0.1
			 *
			 */
			public valueOf (): number {
				return this.datetime.valueOf();
			}

			/**
			 * 時間を現在に更新する
			 *
			 * @version 0.0.1
			 * @since 0.0.1
			 *
			 */
			public now (): number {
				this.datetime = new Date();
				return this.valueOf();
			}

		}

	}

}
