/**
 * ユーティリティ算術クラス
 *
 * @version 0.9.0
 * @since 0.0.2
 *
 */
class UtilMath {

	/**
	 * 指定の範囲のランダムな数を返す
	 *
	 * @version 0.9.0
	 * @since 0.2.0
	 * @param base 基準の数
	 * @param dist 基準からこの数までの範囲の乱数になる
	 * @return 乱数
	 *
	 */
	public static random (base: number = 1, dist: number = 0): number {
		let random: number = Math.random();
		let from: number = Math.min(base, dist);
		let to: number = Math.max(base, dist);
		return random * (to - from) + from;
	}

	/**
	 * 配列内の数値の合計を算出する
	 *
	 * @version 0.9.0
	 * @since 0.2.0
	 * @param numberList 数の配列
	 * @return 合計値
	 *
	 */
	public static sum (numberList: number[]): number {
		let numbers: number[] = numberList.slice();
		let result: number = 0;
		while (numbers.length) {
			result += numbers.shift();
		}
		return result;
	}

	/**
	 * 均等に分割する
	 *
	 * @version 0.9.0
	 * @since 0.2.0
	 * @param n 分割される数
	 * @param devide 分割する数
	 * @return 分割された数値で構成された配列
	 *
	 */
	public static split (n: number, devide: number): number[] {
		let result: number[] = [];
		n = Math.floor(n);
		devide = Math.floor(devide);
		// 分割した数
		let splited: number = Math.floor(n / devide);
		if (0 < devide) {
			let i: number = devide;
			// 余り
			let rem: number = n % devide;
			// 余りの数だけ+1される
			let addtion: number = rem;
			while (i--) {
				if (0 < addtion || rem < 0 && 0 === addtion) {
					result.push(splited + 1);
				} else {
					result.push(splited);
				}
				addtion += rem < 0 ? 1 : -1;
			}
		}
		return result;
	}
}

export = UtilMath;
