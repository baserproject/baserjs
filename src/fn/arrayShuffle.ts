/**
 * 配列をランダムに入れ替えて返す
 *
 * Fisher-Yates法
 *
 * @version 1.0.0
 * @since 0.10.0
 * @param array 対象の配列
 * @return ランダムに入れ替えられた配列
 *
 */
export default function arraySuffle<T> (array: T[]): T[] {
	const newArray: T[] = array.concat();
	const n = newArray.length;
	for (let i = n - 1; i >= 0; i--) {
		const random = Math.floor(Math.random() * (i + 1));
		const tmp = newArray[i];
		newArray[i] = newArray[random];
		newArray[random] = tmp;
	}
	return newArray;
}
