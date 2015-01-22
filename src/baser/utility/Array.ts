module baser {

	export module utility {

		/**
		 * ユーティリティ配列クラス
		 *
		 * @version 0.2.0
		 * @since 0.2.0
		 *
		 */
		export class Array {

			/**
			 * 配列中の対象の要素が一番最初に存在するインデックス番号を返す
			 *
			 * @version 0.2.0
			 * @since 0.2.0
			 *
			 */
			static indexOf<T> (array: any[], element: T): number {
				var i: number = 0;
				var l: number = array.length;
				for (; i < l; i++) {
					if (element === array[i]) {
						return i;
					}
				}
				return -1;
			}

			/**
			 * 配列中の対象のインデックスを削除する
			 *
			 * @version 0.2.0
			 * @since 0.2.0
			 *
			 */
			static remove (array: any[], index: number): any[] {
				array.splice(index, 1);
				return array;
			}

		}

	}


}
