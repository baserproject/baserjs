module baser.ui {

	/**
	 * 要素の寸法(幅・高さ)を管理するクラス
	 *
	 * @version 0.0.9
	 * @since 0.0.9
	 *
	 */
	export class Dimension {

		/**
		 * 幅
		 *
		 * @version 0.0.9
		 * @since 0.0.9
		 *
		 */
		private _width: number;

		/**
		 * 高さ
		 *
		 * @version 0.0.9
		 * @since 0.0.9
		 *
		 */
		private _height: number;

		/**
		 * 管理する要素
		 *
		 * @version 0.0.9
		 * @since 0.0.9
		 *
		 */
		public el: Element;

		/**
		 * コンストラクタ
		 *
		 * @version 0.0.9
		 * @since 0.0.9
		 *
		 */
		constructor (el?: Element) {
			if (el) {
				this.el = el;
			}
		}

	}

}
