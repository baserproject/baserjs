/**
 * ユーティリティ配列クラス
 *
 * @version 0.9.0
 * @since 0.2.0
 *
 */
class UtilArray {

	/**
	 * 配列中の対象の要素が一番最初に存在するインデックス番号を返す
	 * 存在しない場合は -1 を返す
	 *
	 * IE8のためのpolyfill
	 * ※Array.prototype.indexOfを完全に再現しているわけではない
	 *
	 * @version 0.9.0
	 * @since 0.2.0
	 * @param array 対象の配列
	 * @param searchElement 検索対象
	 * @return 検索結果の番号
	 *
	 */
	public static indexOf<T> (array: any[], searchElement: T): number {
		if (Array.prototype.indexOf) {
			return array.indexOf(searchElement);
		}
		let i: number = 0;
		for (const item of array) {
			if (searchElement === item) {
				return i;
			}
			i++;
		}
		return -1;
	}

	/**
	 * 配列中の指定の番号の要素を削除して詰める
	 *
	 * @version 0.2.0
	 * @since 0.2.0
	 * @param array 対象の配列
	 * @param index 削除する番号
	 * @return 削除された配列
	 *
	 */
	public static remove (array: any[], index: number): any[] {
		array.splice(index, 1);
		return array;
	}

	/**
	 * 配列をランダムに入れ替えて返す
	 *
	 * Fisher-Yates法
	 *
	 * @version 0.10.0
	 * @since 0.10.0
	 * @param array 対象の配列
	 * @return ランダムに入れ替えられた配列
	 *
	 */
	public static shuffle<T> (array: T[]): T[] {
		const newArray: T[] = array.concat();
		const n: number = newArray.length;
		for (let i: number = (n - 1); i >= 0; i--) {
			const random: number = Math.floor(Math.random() * (i + 1));
			const tmp: T = newArray[i];
			newArray[i] = newArray[random];
			newArray[random] = tmp;
		}
		return newArray;
	}

}

export = UtilArray;
